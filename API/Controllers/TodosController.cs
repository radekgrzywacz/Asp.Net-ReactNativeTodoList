using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/users/{userId}/todos")]
[ApiController]
[Authorize]
public class TodosController : ControllerBase
{
    private readonly IServiceManager _service;

    public TodosController(IServiceManager service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetTodosForUser(string userId)
    {
        var todos = await _service.TodoService.GetTodos(userId, trackChanges: false);

        return Ok(todos);
    }
}