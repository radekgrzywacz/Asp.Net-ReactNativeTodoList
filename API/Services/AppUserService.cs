using API.DTOs;
using API.Interfaces;
using AutoMapper;

namespace API.Services;

internal sealed class AppUserService : IAppUserService
{
    private readonly IRepositoryManager _repositoryManager;
    private readonly ILoggerManager _loggerManager;
    private readonly IMapper _mapper;

    public AppUserService(IRepositoryManager repositoryManager, ILoggerManager loggerManager, IMapper mapper)
    {
        _repositoryManager = repositoryManager;
        _loggerManager = loggerManager;
        _mapper = mapper;
    }

    public async Task<AppUserDto> GetAppUser(string id, bool trackChanges)
    {
        var user = await _repositoryManager.AppUser.GetAppUser(id, trackChanges);

        var userDto = _mapper.Map<AppUserDto>(user);
        return userDto;
    }
}