using System.Collections.Immutable;
using System.Text;
using API.Data;
using API.Entities;
using API.Entities.ConfigurationModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions;

public static class IdentityServiceExtensions
{

    public static void AddJwtConfiguration(this IServiceCollection services, IConfiguration configuration) =>
        services.Configure<JwtConfiguration>(configuration.GetSection("JwtSettings"));
    
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddIdentity<AppUser, IdentityRole>(o => { o.User.RequireUniqueEmail = true; })
            .AddEntityFrameworkStores<DataContext>()
            .AddDefaultTokenProviders();

        services.ConfigureJwt(config);
        services.AddJwtConfiguration(config);

        return services;
    }

    public static void ConfigureJwt(this IServiceCollection services, IConfiguration config)
    {
        var jwtConfiguration = new JwtConfiguration();
        config.Bind(jwtConfiguration.Section, jwtConfiguration);
        
        services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero,
                    // ValidIssuer = jwtSettings["validIssuer"],
                    // ValidAudience = jwtSettings["validAudience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfiguration.TokenKey))
                };
            });
    }
}