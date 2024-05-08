using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Todo
{
    public int Id { get; set; }
    [Required(ErrorMessage = "Todo title is required")]
    [MinLength(3, ErrorMessage = "Minimum lenght of the title is 3 characters")]
    public string Title { get; set; }
    [Required(ErrorMessage = "Due date is required")]
    public DateOnly DueDate { get; set; }
    public string AppUserId { get; set; }
    public int IsDone { get; set; }
    
}