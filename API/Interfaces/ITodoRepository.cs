using API.Entities;

namespace API.Interfaces;

public interface ITodoRepository
{

    Task<Todo> GetTodoAsync(string userId, int todoId, bool trackChanges);
    Task<IEnumerable<Todo>> GetTodosAsync(string userId, bool trackChanges);
    void CreateTodo(Todo todo);
    
}