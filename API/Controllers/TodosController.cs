using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class TodosController : BaseApiController
{
    private readonly ITodoRepository _todoRepository;
    private readonly IMapper _mapper;
    private readonly DataContext _context;

    public TodosController(ITodoRepository todoRepository, IMapper mapper, DataContext context)
    {
        _todoRepository = todoRepository;
        _mapper = mapper;
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTodo(TodoDto todoDto)
    {
        var todo = _mapper.Map<Todo>(todoDto);

        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();

        return Ok(todo); // Return the created todo
    }
}