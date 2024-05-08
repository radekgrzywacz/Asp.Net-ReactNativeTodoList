using API.DTOs;
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
        var todos = await _service.TodoService.GetTodosAsync(userId, trackChanges: false);

        return Ok(todos);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTodo([FromBody] TodoToCreateDto todo)
    {
        if (todo == null) return BadRequest("CompanyForCreationDto object is null");

        var createdTodo = await _service.TodoService.CreateTodo(todo);

        return Ok(createdTodo);
    }
}