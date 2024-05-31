namespace API.Data;

public class EmailConfiguration
{
    public string AppEmail { get; set; }
    public string AppEmailPassword { get; set; }
    public int ResetTokenExpires { get; set; }
}