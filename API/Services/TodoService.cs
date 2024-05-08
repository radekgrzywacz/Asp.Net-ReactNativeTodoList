using API.DTOs;
using API.Entities;
using API.ExceptionsHandling.Exceptions;
using API.Interfaces;
using AutoMapper;

namespace API.Services;

public class TodoService : ITodoService
{
    private readonly IRepositoryManager _repositoryManager;
    private readonly ILoggerManager _loggerManager;
    private readonly IMapper _mapper;

    public TodoService(IRepositoryManager repositoryManager, ILoggerManager loggerManager, IMapper mapper)
    {
        _repositoryManager = repositoryManager;
        _loggerManager = loggerManager;
        _mapper = mapper;
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

    public async Task<TodoToDisplayDto> CreateTodo(TodoToCreateDto todo)
    {
        var todoEntity = _mapper.Map<Todo>(todo);
        
        _repositoryManager.Todo.CreateTodo(todoEntity);
        await _repositoryManager.SaveAsync();

        var todoToReturn = _mapper.Map<TodoToDisplayDto>(todoEntity);
        
        return todoToReturn;
    }
}