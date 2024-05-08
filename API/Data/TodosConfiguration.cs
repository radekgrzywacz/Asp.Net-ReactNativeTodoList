using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data;

public class TodosConfiguration : IEntityTypeConfiguration<Todo>
{
    public void Configure(EntityTypeBuilder<Todo> builder)
    {
        builder.HasData(
            new Todo
            {
                Id = 1,
                Title = "Complete project",
                DueDate = new DateOnly(2024, 05, 10),
                AppUserId = "608c3c92-e757-48d9-9a5e-1446a283e194",
                IsDone = 0
            },
            new Todo
            {
                Id = 2,
                Title = "Prepare presentation",
                DueDate = new DateOnly(2024, 05, 15),
                AppUserId = "608c3c92-e757-48d9-9a5e-1446a283e194",
                IsDone = 0
            },
            new Todo
            {
                Id = 3,
                Title = "Attend meeting",
                DueDate = new DateOnly(2024, 05, 20),
                AppUserId = "608c3c92-e757-48d9-9a5e-1446a283e194",
                IsDone = 0
            },
            new Todo
            {
                Id = 4,
                Title = "Review code",
                DueDate = new DateOnly(2024, 05, 12),
                AppUserId = "608c3c92-e757-48d9-9a5e-1446a283e194",
                IsDone = 1
            },
            new Todo
            {
                Id = 5,
                Title = "Test application",
                DueDate = new DateOnly(2024, 05, 17),
                AppUserId = "608c3c92-e757-48d9-9a5e-1446a283e194",
                IsDone = 1
            },
            new Todo
            {
                Id = 6,
                Title = "Visit grandma",
                DueDate = new DateOnly(2024, 05, 1),
                AppUserId = "608c3c92-e757-48d9-9a5e-1446a283e194",
                IsDone = 0
            },
            new Todo
            {
                Id = 7,
                Title = "Complete app",
                DueDate = new DateOnly(2024, 05, 3),
                AppUserId = "608c3c92-e757-48d9-9a5e-1446a283e194",
                IsDone = 1
            }
        );
    }
}