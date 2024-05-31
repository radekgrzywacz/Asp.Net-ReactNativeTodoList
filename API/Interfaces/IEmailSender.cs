namespace API.Interfaces;

public interface IEmailSender
{
    //Task SendEmailAsync(string email, string subject, string message);

    Task<bool> SendEmailAsync(string to, string toName, string from, string fromName, string subject,
        string body, bool isBodyHtml);
}