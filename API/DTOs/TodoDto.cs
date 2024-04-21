namespace API.DTOs;

public class TodoDto
{ 
    public int Id { get; set; }
    public string Title { get; set; }
    public DateOnly DueDate { get; set; }
    public int isDone { get; set; }
}