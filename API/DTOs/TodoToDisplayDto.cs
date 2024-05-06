namespace API.DTOs;

public class TodoToDisplayDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public DateOnly DueDate { get; set; }
    //public string Description { get; set; }
    public int IsDone { get; set; }
}