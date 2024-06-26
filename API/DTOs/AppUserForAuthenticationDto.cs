using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class AppUserForAuthenticationDto
{
    [Required(ErrorMessage = "Username is required")]
    public string UserName { get; init; }
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; init; }

}