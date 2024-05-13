using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
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

    [HttpGet("{todoId}")]
    public async Task<IActionResult> GetTodoForUser(string userId, int todoId)
    {
        var todo = await _service.TodoService.GetTodoAsync(userId, todoId, trackChanges: false);

        return Ok(todo);
    }

    [HttpDelete("{todoId}")]
    public async Task<IActionResult> DeleteTodoForUser(string userId, int todoId)
    {
        await _service.TodoService.DeleteTodoAsync(userId, todoId, trackChanges: false);

        return NoContent();
    }

    [HttpPost]
    public async Task<IActionResult> CreateTodo([FromBody] TodoToCreateDto todo)
    {
        if (todo == null) return BadRequest("CompanyForCreationDto object is null");

        var createdTodo = await _service.TodoService.CreateTodoAsync(todo);

        return Ok(createdTodo);
    }

    [HttpPatch("{todoId}")]
    public async Task<IActionResult> PartiallyUpdateTodo(string userId, int todoId,
        [FromBody] JsonPatchDocument<TodoForUpdateDto> patchDoc)
    {
        if (patchDoc == null) return BadRequest("patchDoc object sent from client is null");

        var result =
            await _service.TodoService.GetTodoForPatchAsync(userId, todoId, userTrackChanges: false,
                todoTrackChanges: true);
        
        patchDoc.ApplyTo(result.todoToPatch);
        
        _service.TodoService.SaveChangesForPatch(result.todoToPatch, result.todoEntity);

        return NoContent();
    }
}