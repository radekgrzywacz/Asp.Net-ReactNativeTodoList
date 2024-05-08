using API.Entities;

namespace API.Interfaces;

public interface ITodoRepository
{
    Task<IEnumerable<Todo>> GetTodosAsync(string userId, bool trackChanges);
    void CreateTodo(Todo todo);
}