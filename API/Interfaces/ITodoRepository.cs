using API.Entities;

namespace API.Interfaces;

public interface ITodoRepository
{
    void AddTodo(Todo todo);
    void DeleteTodo(Todo todo);
    Task<Todo> GetTodo(int id);
    Task<List<Todo>> GetUsersTodos(int id);
    Task<Todo> ChangeTodosStatus(int id);
}