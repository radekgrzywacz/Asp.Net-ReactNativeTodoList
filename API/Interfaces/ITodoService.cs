using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface ITodoService
{
    Task<IEnumerable<TodoToDisplayDto>> GetTodosAsync(string userId, bool trackChanges);
    Task<TodoToDisplayDto> CreateTodo(TodoToCreateDto todo);
}