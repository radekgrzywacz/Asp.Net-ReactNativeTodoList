namespace API.DTOs;

public class UserForResettingPasswordDto
{
    public string Email { get; set; }
    public string ResetToken { get; set; }
}