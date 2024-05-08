namespace API.DTOs;

public class TodoToCreateDto
{
    public string AppUserId { get; set; }
    public string Title { get; set; }
    public DateOnly DueDate { get; set; }
}