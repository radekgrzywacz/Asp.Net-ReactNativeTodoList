using API.Interfaces;

namespace API.Services;

public sealed class ServiceManager : IServiceManager
{
    private readonly Lazy<ITodoService> _todoService;
    private readonly Lazy<IAppUserService> _appUserService;

    public ServiceManager(IRepositoryManager repositoryManager, ILoggerManager logger)
    {
        _todoService = new Lazy<ITodoService>(() => new TodoService(repositoryManager, logger));
        _appUserService = new Lazy<IAppUserService>(() => new AppUserService(repositoryManager, logger));
    }

    public IAppUserService AppUserService => _appUserService.Value;
    public ITodoService TodoService => _todoService.Value;
}