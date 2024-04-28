using API.Interfaces;

namespace API.Data;

public class RepositoryManager : IRepositoryManager
{
    private readonly DataContext _context;
    private readonly Lazy<IAppUserRepository> _appUserRepository;
    private readonly Lazy<ITodoRepository> _todoRepository;

    public RepositoryManager(DataContext context)
    {
        _context = context;
        _appUserRepository = new Lazy<IAppUserRepository>(() => new AppUserRepository(context));
        _todoRepository = new Lazy<ITodoRepository>(() => new TodoRepository(context));
    }

    public IAppUserRepository AppUser => _appUserRepository.Value;
    public ITodoRepository Todo => _todoRepository.Value;

    public async Task SaveAsync() => await _context.SaveChangesAsync();
}