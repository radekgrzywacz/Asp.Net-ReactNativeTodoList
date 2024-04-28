namespace API.Interfaces;

public interface IServiceManager
{
    IAppUserService AppUserService { get; }
    ITodoService TodoService { get; }
    IAuthenticationService AuthenticationService {get;}
}