using API.Entities;

namespace API.Interfaces;

public interface ITodoRepository
{
    Task<IEnumerable<Todo>> GetTodos(string userId, bool trackChanges);
}