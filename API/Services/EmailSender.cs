using System.Net;
using System.Net.Mail;
using API.Data;
using API.Interfaces;

namespace API.Services;

public class EmailSender : IEmailSender
{
    private readonly EmailConfiguration _emailConfiguration;

    public EmailSender(EmailConfiguration emailConfiguration)
    {
        _emailConfiguration = emailConfiguration;
    }
    public Task SendEmailAsync(string email, string subject, string message)
    {
        var mail = _emailConfiguration.AppEmail;
        var pw = _emailConfiguration.AppEmailPassword;

        var client = new SmtpClient("smtp.gmail.com", 587)
        {
            EnableSsl = true,
            Credentials = new NetworkCredential(mail, pw)
        };

        return client.SendMailAsync(
            new MailMessage(
                from: mail,
                to: email,
                subject,
                message
            ));
    }
}