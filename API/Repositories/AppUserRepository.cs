using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppUserRepository : RepositoryBase<AppUser> , IAppUserRepository
{
    private readonly DataContext _context;

    public AppUserRepository(DataContext context) : base(context)
    {
        _context = context;
    }

    public async Task<AppUser> GetAppUser(string appUserId, bool trackChanges) =>
        await FindByCondition(u => u.Id.Equals(appUserId), trackChanges).SingleOrDefaultAsync();
    
}