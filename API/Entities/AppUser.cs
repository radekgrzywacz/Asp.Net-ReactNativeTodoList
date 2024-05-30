using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class AppUser : IdentityUser
{
    public List<Todo> Todos { get; set; }
    public string RefreshToken { get; set; }
    public DateTime RefreshTokenExpiryTime { get; set; }
    public string ResetPasswordToken { get; set; }
    public DateTime ResetPasswordTokenExpiryTime { get; set; }
}