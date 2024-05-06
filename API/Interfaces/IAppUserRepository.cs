using API.Entities;

namespace API.Interfaces;

public interface IAppUserRepository
{
    Task<AppUser> GetAppUser(string appUserId, bool trackChanges);
}