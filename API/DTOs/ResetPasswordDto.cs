namespace API.DTOs;

public class ResetPasswordDto
{
    public string UserEmail { get; set; }
    public string ResetToken { get; set; }
    public string Password { get; set; }
}