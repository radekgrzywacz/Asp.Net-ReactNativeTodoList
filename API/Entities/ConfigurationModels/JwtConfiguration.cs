namespace API.Entities.ConfigurationModels;

public class JwtConfiguration
{
    public string Section { get; set; } = "JwtSettings";

    public int Expires { get; set; }
    public string TokenKey { get; set; }
}