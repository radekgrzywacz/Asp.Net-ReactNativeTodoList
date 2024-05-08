using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class TodoRepository : RepositoryBase<Todo>, ITodoRepository
{
    private readonly DataContext _context;

    public TodoRepository(DataContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Todo>> GetTodosAsync(string userId, bool trackChanges)
    {
        var todos = await _context.Todos.Where(t => t.AppUserId == userId)
            .OrderBy(t => t.DueDate)
            .ToListAsync();

        return todos;
    }

    public void CreateTodo(Todo todo) => Create(todo);
}