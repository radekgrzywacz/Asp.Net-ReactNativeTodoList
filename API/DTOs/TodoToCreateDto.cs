using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class TodoToCreateDto
{
    [Required(ErrorMessage = "Todo title is required")]
    [MinLength(3, ErrorMessage = "Minimum lenght of the title is 3 characters")]
    public string Title { get; set; }
    [Required(ErrorMessage = "Due date is required")]
    public DateOnly DueDate { get; set; }
    public string AppUserId { get; set; }
}