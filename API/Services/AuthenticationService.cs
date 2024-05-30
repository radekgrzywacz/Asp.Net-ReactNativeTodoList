using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using API.Entities;
using API.Entities.ConfigurationModels;
using API.ExceptionsHandling.Exceptions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
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
    private readonly JwtConfiguration _jwtConfiguration;

    private AppUser _user;

    public AuthenticationService(ILoggerManager logger, IMapper mapper, UserManager<AppUser> userManager,
        IOptions<JwtConfiguration> config, IEmailSender emailSender)
    {
        _logger = logger;
        _mapper = mapper;
        _userManager = userManager;
        _config = config;
        _emailSender = emailSender;
        _jwtConfiguration = _config.Value;
    }

    public async Task<IdentityResult> RegisterUser(AppUserForRegistrationDto userForRegistration)
    {
        var user = _mapper.Map<AppUser>(userForRegistration);

        var result = await _userManager.CreateAsync(user, userForRegistration.Password);

        return result;
    }

    public async Task<bool> ValidateUser(AppUserForAuthenticationDto userForAuth)
    {
        _user = await _userManager.FindByNameAsync(userForAuth.UserName);

        var result = (_user != null && await _userManager.CheckPasswordAsync(_user, userForAuth.Password));
        if (!result)
        {
            _logger.LogWarn($"{nameof(ValidateUser)} : Authentication failed. Wrong username or password");
        }

        return result;
    }

    public async Task<TokenDto> CreateToken(bool populateExp)
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

    public async Task<TokenDto> RefreshToken(TokenDto tokenDto)
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

        return await CreateToken(populateExp: false);
    }

    //public async Task ResetPasswordAsync() TODO:

    public async Task SendEmailWithResetTokenAsync(EmailForResetDto email)
    {
        var user = await _userManager.FindByEmailAsync(email.Email);
        if (user == null)
        {
            throw new UserEmailNotFoundException(email.Email);
        }

        var resetToken = GenerateResetToken();

        var subject = "The Ultimate Todo App password reset";
        var message =
            $"Hi {user.UserName}! <br>To reset your password, please, use this token in your mobile app: <b>{resetToken}</b>." +
            $"<br>If you did not request password reset, please ignore this message. ";

        //await _emailSender.SendEmailAsync(email.Email, subject, message);
        var result =  _emailSender.SendEmail(user.Email, user.UserName, "grzywaczra@gmail.com",
            "The Ultimate Todo App", subject, message, true);
    }

    private string GenerateResetToken()
    {
        var randomNumber = new byte[5];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
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
            expires: DateTime.Now.AddSeconds(Convert.ToDouble(_jwtConfiguration.Expires)),
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