using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Extensions;

public static class IdentityServiceExtensions
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services)
    {
        services.AddIdentity<AppUser, IdentityRole>(o =>
        {
            o.User.RequireUniqueEmail = true;
        });

        return services;
    }
}