using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IAppUserService
{
    Task<AppUserDto> GetAppUser(string id, bool trackChanges);
}