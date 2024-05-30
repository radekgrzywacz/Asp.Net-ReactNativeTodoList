using API.DTOs;
using Microsoft.AspNetCore.Identity;

namespace API.Interfaces;

public interface IAuthenticationService
{
    Task<IdentityResult> RegisterUser(AppUserForRegistrationDto userForRegistration);
    Task<bool> ValidateUser(AppUserForAuthenticationDto userForAuth);
    Task<TokenDto> CreateToken(bool populateExp);
    Task<TokenDto> RefreshToken(TokenDto tokenDto);
    Task SendEmailWithResetTokenAsync(EmailForResetDto email);
}