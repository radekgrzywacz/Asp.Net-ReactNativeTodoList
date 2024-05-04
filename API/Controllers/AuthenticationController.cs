using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
    
    
}