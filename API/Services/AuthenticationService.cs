using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.ConfigurationModels;
using API.ExceptionsHandling.Exceptions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly ILoggerManager _logger;
    private readonly IMapper _mapper;
    private readonly UserManager<AppUser> _userManager;
    private readonly IOptions<JwtConfiguration> _config;
    private readonly IEmailSender _emailSender;
    private readonly EmailConfiguration _emailConfiguration;
    private readonly JwtConfiguration _jwtConfiguration;

    private AppUser _user;

    public AuthenticationService(ILoggerManager logger, IMapper mapper, UserManager<AppUser> userManager,
        IOptions<JwtConfiguration> config, IEmailSender emailSender, EmailConfiguration emailConfiguration)
    {
        _logger = logger;
        _mapper = mapper;
        _userManager = userManager;
        _config = config;
        _emailSender = emailSender;
        _emailConfiguration = emailConfiguration;
        _jwtConfiguration = _config.Value;
    }

    public async Task<IdentityResult> RegisterUserAsync(AppUserForRegistrationDto userForRegistration)
    {
        var user = _mapper.Map<AppUser>(userForRegistration);

        var result = await _userManager.CreateAsync(user, userForRegistration.Password);

        return result;
    }

    public async Task<bool> ValidateUserAsync(AppUserForAuthenticationDto userForAuth)
    {
        _user = await _userManager.FindByNameAsync(userForAuth.UserName);

        var result = (_user != null && await _userManager.CheckPasswordAsync(_user, userForAuth.Password));
        if (!result)
        {
            _logger.LogWarn($"{nameof(ValidateUserAsync)} : Authentication failed. Wrong username or password");
        }

        return result;
    }

    public async Task<TokenDto> CreateTokenAsync(bool populateExp)
    {
        var signingCredentials = GetSigningCredentials();
        var claims = GetClaims();
        var tokenOptions = GenerateTokenOptions(signingCredentials, claims);

        var refreshToken = GenerateRefreshToken();

        _user.RefreshToken = refreshToken;

        if (populateExp) _user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);

        await _userManager.UpdateAsync(_user);

        var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

        return new TokenDto(accessToken, refreshToken);
    }

    public async Task<TokenDto> RefreshTokenAsync(TokenDto tokenDto)
    {
        var principal = GetPrincipalFromExpiredToken(tokenDto.AccessToken);

        var userId = _userManager.GetUserId(principal);
        if (userId == null)
        {
            throw new UserNotFoundException(null);
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null || user.RefreshToken != tokenDto.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
        {
            throw new RefreshTokenBadRequest();
        }

        _user = user;

        return await CreateTokenAsync(populateExp: false);
    }

    public async Task<IdentityResult> ResetPasswordAsync(ResetPasswordDto resetPasswordInfo)
    {
        var user = await _userManager.FindByEmailAsync(resetPasswordInfo.UserEmail);
        if (user == null)
        {
            throw new UserEmailNotFoundException(resetPasswordInfo.UserEmail);
        }

        if (user.ResetPasswordToken != resetPasswordInfo.ResetToken ||
            user.ResetPasswordTokenExpiryTime <= DateTime.Now)
        {
            throw new ResetTokenBadRequest();
        }

        var passwordToken = await _userManager.GeneratePasswordResetTokenAsync(user);
        var result = await _userManager.ResetPasswordAsync(user, passwordToken, resetPasswordInfo.Password);

        if (result.Succeeded)
        {
            user.ResetPasswordTokenExpiryTime = DateTime.Now;
            await _userManager.UpdateAsync(user);
        }

        return result;

    }

    public async Task<bool> SendEmailWithResetTokenAsync(EmailForResetDto email)
    {
        var user = await _userManager.FindByEmailAsync(email.Email);
        if (user == null)
        {
            throw new UserEmailNotFoundException(email.Email);
        }

        var resetToken = GenerateResetToken();


        if (resetToken != null)
        {
            user.ResetPasswordToken = resetToken;
            user.ResetPasswordTokenExpiryTime =
                DateTime.Now.AddMinutes(Convert.ToDouble(_emailConfiguration.ResetTokenExpires));
            await _userManager.UpdateAsync(user);
        }


        var subject = "The Ultimate Todo App password reset";
        var message =
            $"Hi {user.UserName}! <br>To reset your password, please, use this token in your mobile app: <b>{resetToken}</b>." +
            $"<br>If you did not request password reset, please ignore this message. <br><br> Remember, that this token is valid " +
            $"only for 30 minutes. After that you will have to get a new one";

        //await _emailSender.SendEmailAsync(email.Email, subject, message);
        var result = await _emailSender.SendEmailAsync(user.Email, user.UserName, "grzywaczra@gmail.com",
            "The Ultimate Todo App", subject, message, true);

        return result;
    }

    private string GenerateResetToken()
    {
        const int length = 5;
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var random = new Random();
        char[] result = new char[length];
        for (int i = 0; i < length; i++)
        {
            result[i] = chars[random.Next(chars.Length)];
        }

        return new string(result);
    }

    private SigningCredentials GetSigningCredentials()
    {
        var key = Encoding.UTF8.GetBytes(_jwtConfiguration.TokenKey);
        var secret = new SymmetricSecurityKey(key);

        return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
    }

    private List<Claim> GetClaims()
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, _user.Id)
        };

        return claims;
    }

    private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
    {
        var tokenOptions = new JwtSecurityToken
        (
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(_jwtConfiguration.Expires)),
            signingCredentials: signingCredentials
        );

        return tokenOptions;
    }

    private string GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }

    private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateIssuer = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfiguration.TokenKey)),
            ValidateLifetime = false
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        SecurityToken securityToken;
        var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);

        var jwtSecurityToken = securityToken as JwtSecurityToken;
        if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                StringComparison.InvariantCultureIgnoreCase))
        {
            throw new SecurityTokenException("Invalid token");
        }

        return principal;
    }
}