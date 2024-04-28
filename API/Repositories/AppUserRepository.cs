using API.Entities;
using API.Interfaces;

namespace API.Data;

public class AppUserRepository : RepositoryBase<AppUser> , IAppUserRepository
{
    private readonly DataContext _context;

    public AppUserRepository(DataContext context) : base(context)
    {
        _context = context;
    }
}