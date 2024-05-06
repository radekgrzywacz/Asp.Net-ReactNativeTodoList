namespace API.ExceptionsHandling.Exceptions;

public sealed class UserNotFoundException : NotFoundException
{
    public UserNotFoundException(string userId) : base($"The user with id: {userId} does not exists")
    {
        
    }
    
}