using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUserForRegistrationDto, AppUser>();
        CreateMap<AppUser, AppUserDto>();
        CreateMap<Todo, TodoToDisplayDto>();
        CreateMap<TodoToCreateDto, Todo>();
        CreateMap<TodoForUpdateDto, Todo>();
        CreateMap<TodoForUpdateDto, Todo>().ReverseMap();
    }
}