using API.Entities;
using API.Interfaces;

namespace API.Data;

public class TodoRepository : RepositoryBase<Todo>, ITodoRepository
{
    private readonly DataContext _context;

    public TodoRepository(DataContext context) : base(context)
    {
        _context = context;
    }
}