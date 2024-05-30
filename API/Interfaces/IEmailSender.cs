namespace API.Interfaces;

public interface IEmailSender
{
    Task SendEmailAsync(string email, string subject, string message);

    bool SendEmail(string to, string toName, string from, string fromName, string subject,
        string body, bool isBodyHtml);
}