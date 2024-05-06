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
                Description = "Finish all the tasks for the project.",
                AppUserId = "608c3c92-e757-48d9-9a5e-1446a283e194",
                IsDone = 0
            },
            new Todo
            {
                Id = 2,
                Title = "Prepare presentation",
                DueDate = new DateOnly(2024, 05, 15),
                Description = "Create slides and practice the presentation.",
                AppUserId = "608c3c92-e757-48d9-9a5e-1446a283e194",
                IsDone = 0
            },
            new Todo
            {
                Id = 3,
                Title = "Attend meeting",
                DueDate = new DateOnly(2024, 05, 20),
                Description = "Participate in the weekly team meeting.",
                AppUserId = "608c3c92-e757-48d9-9a5e-1446a283e194",
                IsDone = 0
            },
            new Todo
            {
                Id = 4,
                Title = "Review code",
                DueDate = new DateOnly(2024, 05, 12),
                Description = "Review and provide feedback on the code changes.",
                AppUserId = "608c3c92-e757-48d9-9a5e-1446a283e194",
                IsDone = 1
            },
            new Todo
            {
                Id = 5,
                Title = "Test application",
                DueDate = new DateOnly(2024, 05, 17),
                Description = "Perform thorough testing of the application functionality.",
                AppUserId = "608c3c92-e757-48d9-9a5e-1446a283e194",
                IsDone = 1
            }
        );
    }
}