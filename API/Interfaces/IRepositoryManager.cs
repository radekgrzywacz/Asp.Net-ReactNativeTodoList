namespace API.Interfaces;

public interface IRepositoryManager
{
    IAppUserRepository AppUser { get;  }
    ITodoRepository Todo { get;  }
    Task SaveAsync();
}