using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;

namespace halaKIWI.Repository
{
    public class MailTrigger
    {

        private string CC = string.Empty;
        private string Msg = string.Empty;

        public string SendMailforchangepassword(string emailid, string subject, string username, string password)
        {
            try
            {
                string host = System.Configuration.ConfigurationManager.AppSettings["LHost"].ToString();
                int port = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["LPort"].ToString());
                string str2 = System.Configuration.ConfigurationManager.AppSettings["LToMailId"].ToString();
                string address = System.Configuration.ConfigurationManager.AppSettings["LMailId"].ToString();
                SmtpClient client = new SmtpClient(host, port);
                string userName = System.Configuration.ConfigurationManager.AppSettings["LMailId"].ToString();
                string str5 = System.Configuration.ConfigurationManager.AppSettings["LMailPassword"].ToString();
                client.Credentials = new NetworkCredential(userName, str5);
                MailMessage message = new MailMessage
                {
                    From = new MailAddress(address)
                };
                message.To.Add(new MailAddress(emailid));
                message.Subject = subject;
                message.Priority = MailPriority.Normal;
                message.IsBodyHtml = true;
                message.Body = this.getbody(subject, username, password, emailid).ToString();
                SmtpClient client2 = new SmtpClient
                {
                    Host = host,
                    EnableSsl = true
                };
                NetworkCredential credential = new NetworkCredential(userName, str5);
                client2.UseDefaultCredentials = true;
                client2.Credentials = credential;
                client2.EnableSsl = true;
                client2.Port = port;
                client2.Send(message);
                this.Msg = "true";
                return this.Msg;
            }
            catch
            {
                return null;
            }
        }

        public StringBuilder getbody(string subject, string username, string password, string emailid)
        {
            StringBuilder builder = new StringBuilder();
            builder.Append("");
            string str = ConfigurationManager.AppSettings["MailLogo"].ToString();
            builder.Append("<table width=\"680\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"border:#064669 1px solid;font:normal 12px Arial; color:#000;\">");
            builder.Append("<tr>");
            builder.Append("<td style=\"padding:15px 0 15px 20px;background:#FFFFFF;\"><p align=\"left\" style=\"width:200px; float:left; margin:0px; padding:0px 2px 2px;\"><img src=" + str + "></p></td>");
            builder.Append("</tr>");
            builder.Append("<tr>");
            builder.Append("<td colspan=\"2\" height=\"15\" bgcolor=\"#043550\" align=\"center\" style=\"padding:5px 10px 5px 7px;\"></td>");
            builder.Append("</tr>");
            builder.Append("<tr>");
            builder.Append("<td colspan=\"2\" style=\"padding:15px 0px 5px 10px;font:normal 12px Arial;color:#000;\"><b>Dear " + username + ",</b></td>");
            builder.Append("</tr>");
            builder.Append("<tr>");
            builder.Append("<td colspan=\"2\" style=\"padding:5px 0px 0px 20px;font:normal 12px Arial;color:#000;\">");
            builder.Append("The following are the new login details of Kiwi <br /><br />");
            builder.Append("<b>Username<b style=\"padding:0px 8px 0px 8px;\">:</b>" + emailid + "<br />");
            builder.Append(" Password<b style=\"padding:0px 8px 0px 9px;\">:</b>" + password + "<br /></td>");
            builder.Append("</tr>");
            builder.Append("<tr><td colspan=\"2\" Style=\"height:40px\" style=\"padding: 0px 19px;\" ><a  style=\"padding: 0px 19px;\" href='" + ConfigurationManager.AppSettings["login"].ToString() + "'>Click here to login</a></td></tr>");
            builder.Append("<tr>");
            builder.Append("<td colspan=\"2\" style=\"padding:28px 0px 20px 10px;font:normal 12px Arial;color:#000;\">Regards,<br/> " + ConfigurationManager.AppSettings["MailRegards"].ToString() + " <br /></td>");
            builder.Append("</tr>");
            builder.Append("</table>");
            return builder;
        }
    }
}