using API.DTOs;
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

    public async Task<IEnumerable<TodoToDisplayDto>> GetTodos(string userId, bool trackChanges)
    {
        var user = await _repositoryManager.AppUser.GetAppUser(userId, trackChanges);
        if (user == null)
        {
            throw new UserNotFoundException(userId);
        }

        var todosFromDb = await _repositoryManager.Todo.GetTodos(userId, trackChanges);

        var todosDto = _mapper.Map<IEnumerable<TodoToDisplayDto>>(todosFromDb);

        return todosDto;
    }
}