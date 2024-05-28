using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/authentication")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IServiceManager _service;
    private readonly IEmailSender _emailSender;

    public AuthenticationController(IServiceManager service, IEmailSender emailSender)
    {
        _service = service;
        _emailSender = emailSender;
    }

    [HttpPost]
    public async Task<IActionResult> RegisterUser([FromBody] AppUserForRegistrationDto appUserForRegistration)
    {
        var result = await _service.AuthenticationService.RegisterUser(appUserForRegistration);

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
        if (!await _service.AuthenticationService.ValidateUser(userForAuth)) return Unauthorized();

        var tokenDto = await _service.AuthenticationService.CreateToken(populateExp: true);

        return Ok(tokenDto);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] TokenDto tokenDto)
    {
        var tokenToReturnDto = await _service.AuthenticationService.RefreshToken(tokenDto);

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

    [HttpGet("sendEmail")]
    public async Task<IActionResult> SendEmail()
    {
        var receiver = "grzywaczra@gmail.com";
        var subject = "Test";
        var message = "Hello world";

        await _emailSender.SendEmailAsync(receiver, subject, message);
        return Ok();
    }
}