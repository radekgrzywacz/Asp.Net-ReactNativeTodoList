namespace API.ExceptionsHandling.Exceptions;

public sealed class UserEmailNotFoundException : NotFoundException
{
    public UserEmailNotFoundException(string userEmail) : base($"The user with email: {userEmail} does not exists")
    {
        
    }
}