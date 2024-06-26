using API.Data;
using API.Entities;
using API.Entities.ConfigurationModels;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace API.Services;

public sealed class ServiceManager : IServiceManager
{
    private readonly Lazy<ITodoService> _todoService;
    private readonly Lazy<IAppUserService> _appUserService;
    private readonly Lazy<IAuthenticationService> _authenticationService;

    public ServiceManager(IRepositoryManager repositoryManager, ILoggerManager logger, IMapper mapper,
        UserManager<AppUser> userManager, IOptions<JwtConfiguration> configuration, IEmailSender emailSender,
        EmailConfiguration emailConfiguration)
    {
        _todoService = new Lazy<ITodoService>(() => new TodoService(repositoryManager, logger, mapper, userManager));
        _appUserService = new Lazy<IAppUserService>(() => new AppUserService(repositoryManager, logger, mapper));
        _authenticationService =
            new Lazy<IAuthenticationService>(
                () => new AuthenticationService(logger, mapper, userManager, configuration, emailSender,
                    emailConfiguration));
    }

    public IAppUserService AppUserService => _appUserService.Value;
    public ITodoService TodoService => _todoService.Value;
    public IAuthenticationService AuthenticationService => _authenticationService.Value;
}