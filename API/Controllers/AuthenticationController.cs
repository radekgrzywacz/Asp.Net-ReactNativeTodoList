using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/authentication")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IServiceManager _service;

    public AuthenticationController(IServiceManager service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> RegisterUser([FromBody] AppUserForRegistrationDto appUserForRegistration)
    {
        var result = await _service.AuthenticationService.RegisterUserAsync(appUserForRegistration);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.TryAddModelError(error.Code, error.Description);
            }

            return BadRequest(ModelState);
        }

        return StatusCode(201);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Authenticate([FromBody] AppUserForAuthenticationDto userForAuth)
    {
        if (!await _service.AuthenticationService.ValidateUserAsync(userForAuth)) return Unauthorized();

        var tokenDto = await _service.AuthenticationService.CreateTokenAsync(populateExp: true);

        return Ok(tokenDto);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] TokenDto tokenDto)
    {
        var tokenToReturnDto = await _service.AuthenticationService.RefreshTokenAsync(tokenDto);

        return Ok(tokenToReturnDto);
    }

    [HttpGet]
    public IActionResult Test2()
    {
        var response = "hello world";
        return Ok(response);
    }

    [HttpGet("test")]
    public IActionResult Test()
    {
        var response = new { Message = "Hello world" };
        return Ok(response);
    }

    [HttpPost("email")]
    public async Task<IActionResult> SendEmail([FromBody] EmailForResetDto email)
    {
        bool emailSent = await _service.AuthenticationService.SendEmailWithResetTokenAsync(email);

        if (emailSent) return Ok();

        return BadRequest("There was an issue sending an email");
    }

    [HttpPost("reset")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
    {
        var result = await _service.AuthenticationService.ResetPasswordAsync(resetPasswordDto);

        if (result) return Ok();

        return BadRequest("Something went wrong with resetting your password");
    }
}