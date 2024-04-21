using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class TodoRepository : ITodoRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public TodoRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void AddTodo(Todo todo)
    {
        _context.Todos.Add(todo);
    }

    public void DeleteTodo(Todo todo)
    {
        _context.Todos.Remove(todo);
    }

    public async Task<Todo> GetTodo(int id)
    {
        var todo = await  _context.Todos.FindAsync(id);
        return todo;
    }

    public async Task<List<Todo>> GetUsersTodos(int id)
    {
        var todosGrouped = await _context.Todos
            .Where(u => u.AppUserId == id)
            .OrderByDescending(t => t.DueDate)
            .ToListAsync();

        return todosGrouped;
    }

    public Task<Todo> ChangeTodosStatus(int id)
    {
        throw new NotImplementedException();
    }
}