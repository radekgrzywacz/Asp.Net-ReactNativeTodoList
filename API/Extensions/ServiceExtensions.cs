using API.Data;
using API.Interfaces;
using API.Logging;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });
        
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });
        
        services.Configure<IISOptions>(options =>
        {
            
        });

        services.AddAutoMapper(typeof(Program));
        
        services.AddSingleton<ILoggerManager, LoggerManager>();

        services.AddScoped<IRepositoryManager, RepositoryManager>();

        services.AddScoped<IServiceManager, ServiceManager>();

        return services;
    }
}