namespace API.Entities;

public class Todo
{
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; }
    public int Id { get; set; }
    public string Title { get; set; }
    public DateOnly DueDate { get; set; }
    public int isDone { get; set; }
}