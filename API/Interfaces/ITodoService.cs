using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface ITodoService
{
    Task<IEnumerable<TodoToDisplayDto>> GetTodosAsync(string userId, bool trackChanges);

    Task<TodoToDisplayDto> GetTodoAsync(string userId, int todoId, bool trackChanges);
    Task<TodoToDisplayDto> CreateTodoAsync(TodoToCreateDto todo);

    Task DeleteTodoAsync(string userId, int todoId, bool trackChanges);

    Task<(TodoForUpdateDto todoToPatch, Todo todoEntity)> GetTodoForPatchAsync(string userId, int todoId, bool todoTrackChanges,
        bool userTrackChanges);

    void SaveChangesForPatch(TodoForUpdateDto todoToPatch, Todo todoEntity);


}