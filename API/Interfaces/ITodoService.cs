using API.DTOs;

namespace API.Interfaces;

public interface ITodoService
{
    Task<IEnumerable<TodoToDisplayDto>> GetTodos(string userId, bool trackChanges);
}