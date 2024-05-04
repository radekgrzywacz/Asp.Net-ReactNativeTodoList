using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/todos")]
[ApiController]
[Authorize]
public class TodosController : ControllerBase
{
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
}