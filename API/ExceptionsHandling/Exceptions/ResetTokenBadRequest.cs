namespace API.ExceptionsHandling.Exceptions;

public class ResetTokenBadRequest : BadRequestException
{
    public ResetTokenBadRequest() : base("Invalid client request. Provided reset token is invalid.")
    {
    }
}