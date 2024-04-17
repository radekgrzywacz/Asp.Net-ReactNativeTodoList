using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class AppUser : IdentityUser<int>
{
    public List<string> Todos { get; set; }
    public ICollection<AppUserRole> UserRoles { get; set; }
}