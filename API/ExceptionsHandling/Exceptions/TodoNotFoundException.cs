namespace API.ExceptionsHandling.Exceptions;

public class TodoNotFoundException : NotFoundException
{
    public TodoNotFoundException(int todoId) : base($"Todo with id: {todoId} doesn't exist in database.")
    {
        
    }
}