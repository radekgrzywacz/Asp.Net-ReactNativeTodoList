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

    // public Task SendEmailAsync(string email, string subject, string message)
    // {
    //     var mail = _emailConfiguration.AppEmail;
    //     var pw = _emailConfiguration.AppEmailPassword;
    //
    //     var client = new SmtpClient("smtp.gmail.com", 587)
    //     {
    //         EnableSsl = true,
    //         Credentials = new NetworkCredential(mail, pw)
    //     };
    //
    //     return client.SendMailAsync(
    //         new MailMessage(
    //             from: mail,
    //             to: email,
    //             subject,
    //             message
    //         ));
    // }

    public async Task<bool> SendEmailAsync(string to, string toName, string from, string fromName, string subject, string body, bool isBodyHtml)
    {
        var mail = _emailConfiguration.AppEmail;
        var pw = _emailConfiguration.AppEmailPassword;
        try
        {
            MailAddress fromAddr = new MailAddress(from, fromName, System.Text.Encoding.UTF8);
            MailAddress toAddr = new MailAddress(to, toName, System.Text.Encoding.UTF8);
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new System.Net.NetworkCredential(mail, pw)
            };

            using (MailMessage message = new MailMessage(fromAddr, toAddr)
                   {
                       Subject = subject,
                       Body = body,
                       IsBodyHtml = isBodyHtml,
                       BodyEncoding = System.Text.Encoding.UTF8,
                   })
            {
                await smtp.SendMailAsync(message);
            }

            return true;
        }
        catch
        {
            return false;
        }
    }

}