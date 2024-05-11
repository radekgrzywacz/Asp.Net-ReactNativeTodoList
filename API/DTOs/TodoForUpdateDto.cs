using System.Runtime.InteropServices.JavaScript;

namespace API.DTOs;

public class TodoForUpdateDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int IsDone { get; set; }
    public DateOnly DueDate { get; set; }
}