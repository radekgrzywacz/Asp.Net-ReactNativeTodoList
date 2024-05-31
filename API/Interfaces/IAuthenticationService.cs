using API.DTOs;
using Microsoft.AspNetCore.Identity;

namespace API.Interfaces;

public interface IAuthenticationService
{
    Task<IdentityResult> RegisterUserAsync(AppUserForRegistrationDto userForRegistration);
    Task<bool> ValidateUserAsync(AppUserForAuthenticationDto userForAuth);
    Task<TokenDto> CreateTokenAsync(bool populateExp);
    Task<TokenDto> RefreshTokenAsync(TokenDto tokenDto);
    Task<bool> SendEmailWithResetTokenAsync(EmailForResetDto email);
    Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordInfo);
}