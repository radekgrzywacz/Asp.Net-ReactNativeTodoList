using API.DTOs;
using API.Entities;
using API.ExceptionsHandling.Exceptions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace API.Services;

public class TodoService : ITodoService
{
    private readonly IRepositoryManager _repositoryManager;
    private readonly ILoggerManager _loggerManager;
    private readonly IMapper _mapper;
    private readonly UserManager<AppUser> _userManager;

    public TodoService(IRepositoryManager repositoryManager, ILoggerManager loggerManager, IMapper mapper, UserManager<AppUser> userManager)
    {
        _repositoryManager = repositoryManager;
        _loggerManager = loggerManager;
        _mapper = mapper;
        _userManager = userManager;
    }

    public async Task<IEnumerable<TodoToDisplayDto>> GetTodosAsync(string userId, bool trackChanges)
    {
        var user = await _repositoryManager.AppUser.GetAppUser(userId, trackChanges);
        if (user == null)
        {
            throw new UserNotFoundException(userId);
        }

        var todosFromDb = await _repositoryManager.Todo.GetTodosAsync(userId, trackChanges);

        var todosDto = _mapper.Map<IEnumerable<TodoToDisplayDto>>(todosFromDb);

        return todosDto;
    }

    public async Task<TodoToDisplayDto> GetTodoAsync(string userId, int todoId, bool trackChanges)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) throw new UserNotFoundException(userId);

        var todoDb = await _repositoryManager.Todo.GetTodoAsync(userId, todoId, trackChanges);
        if (todoDb == null) throw new TodoNotFoundException(todoId);

        var todo = _mapper.Map<TodoToDisplayDto>(todoDb);

        return todo;
    }

    public async Task<TodoToDisplayDto> CreateTodoAsync(TodoToCreateDto todo)
    {
        var todoEntity = _mapper.Map<Todo>(todo);
        
        _repositoryManager.Todo.CreateTodo(todoEntity);
        await _repositoryManager.SaveAsync();

        var todoToReturn = _mapper.Map<TodoToDisplayDto>(todoEntity);
        
        return todoToReturn;
    }

    public async Task<(TodoForUpdateDto todoToPatch, Todo todoEntity)> GetTodoForPatchAsync(string userId, int todoId, bool todoTrackChanges,
        bool userTrackChanges)
    {
        var user = await _repositoryManager.AppUser.GetAppUser(userId, userTrackChanges);
        if (user == null) throw new UserNotFoundException(userId);

        var todoEntity = await _repositoryManager.Todo.GetTodoAsync(userId, todoId, todoTrackChanges);
        if (todoEntity == null) throw new TodoNotFoundException(todoId);

        var todoToPatch = _mapper.Map<TodoForUpdateDto>(todoEntity);

        return (todoToPatch, todoEntity);
    }

    public void SaveChangesForPatch(TodoForUpdateDto todoToPatch, Todo todoEntity)
    {
        _mapper.Map(todoToPatch, todoEntity);
        _repositoryManager.SaveAsync();
    }
}