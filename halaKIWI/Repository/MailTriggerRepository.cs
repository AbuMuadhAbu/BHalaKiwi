using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;

namespace halaKIWI.Repository
{
    public interface IMailTriggerRepository
    {
        string RestaurantEmailTrigger(string Restaurant, string emailid);
        string AdminRestaurantActiveEmailTrigger(string Restaurant, string emailid);
        string OutletEmailTrigger(string CompanyName, string OutletName, string Password, string EmailID);
    }
    public class MailTriggerRepository : IMailTriggerRepository
    {
        string host = System.Configuration.ConfigurationManager.AppSettings["LHost"].ToString();
        int port = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["LPort"].ToString());
        string str2 = System.Configuration.ConfigurationManager.AppSettings["LToMailId"].ToString();
        string address = System.Configuration.ConfigurationManager.AppSettings["LMailId"].ToString();
        string userName = System.Configuration.ConfigurationManager.AppSettings["LMailId"].ToString();
        string str5 = System.Configuration.ConfigurationManager.AppSettings["LMailPassword"].ToString();
        string str = System.Configuration.ConfigurationManager.AppSettings["MailLogo"].ToString();
        private string Msg = string.Empty;
        public string RestaurantEmailTrigger(string Restaurant, string emailid)
        {
            try
            {

                SmtpClient client = new SmtpClient(host, port);
                client.Credentials = new NetworkCredential(userName, str5);
                MailMessage message = new MailMessage
                {
                    From = new MailAddress(address)
                };
                message.To.Add(new MailAddress(emailid));
                message.Subject = "Thanks for Registering in Kiwi";
                message.Priority = MailPriority.Normal;
                message.IsBodyHtml = true;


                StringBuilder builder = new StringBuilder();
                builder.Append("");

                builder.Append("<table width=\"680\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"border:#064669 1px solid;font:normal 12px Arial; color:#000;\">");
                builder.Append("<tr>");
                builder.Append("<td style=\"padding:15px 0 15px 20px;background:#FFFFFF;\"><p align=\"left\" style=\"width:200px; float:left; margin:0px; padding:0px 2px 2px;\"><img src=" + str + "></p></td>");
                builder.Append("</tr>");
                builder.Append("<tr>");
                builder.Append("<td colspan=\"2\" height=\"15\" bgcolor=\"#043550\" align=\"center\" style=\"padding:5px 10px 5px 7px;\"></td>");
                builder.Append("</tr>");
                builder.Append("<tr>");
                builder.Append("<td colspan=\"2\" style=\"padding:15px 0px 5px 10px;font:normal 12px Arial;color:#000;\"><b>Dear " + Restaurant + ",</b></td>");
                builder.Append("</tr>");
                builder.Append("<tr>");
                builder.Append("<td colspan=\"2\" style=\"padding:5px 0px 0px 10px;font:normal 12px Arial;color:#000;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                builder.Append("The following are the new login details of Kiwi application we need to verify that you are the legitimate owner of the<br />");
                builder.Append(" business(After all we don’t want others posting on behalf of your restaurant).<br /><br />");
                builder.Append("Please reply to this email with attached copies of<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                builder.Append("1. Emirates ID of the owner OR the manager<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                builder.Append("2. A business license or a Restaurant registration document<br /><br />");
                builder.Append("We will activate your account within 24 hours of you submitting these documents.");
                builder.Append("</td>");
                builder.Append("</tr>");
                builder.Append("<tr>");
                builder.Append("<td colspan=\"2\" style=\"padding:28px 0px 20px 10px;font:normal 12px Arial;color:#000;\">Thanks & Kind Regards,<br /><br /> Zeyd AbduRahman; Co-Founder <br /></td>");
                builder.Append("</tr>");
                builder.Append("</table>");
                message.Body = builder.ToString();
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
            catch (Exception ex)
            {
                string path = "C:/Software/IntranetErrors/Kiwi_" + DateTime.Today.ToString("ddMMMyy") + ".txt";
                if (!System.IO.File.Exists(path))
                {
                    System.IO.File.Create(path).Close();
                }
                using (StreamWriter w = System.IO.File.AppendText(path))
                {
                    w.WriteLine("\r\nLog Entry : ");
                    //if (HttpContext.Current.Session["UserID"] != null)
                    //{
                    //    w.WriteLine("\r\nUser EmployeeID  : {0}", HttpContext.Current.Session["EmployeeID"].ToString());
                    //}
                    //if (HttpContext.Current.Session["ClientSubClientID"] != null)
                    //{
                    //    w.WriteLine("\r\nClientSubClientID  : {0}", HttpContext.Current.Session["ClientSubClientID"].ToString());
                    //}
                    //if (HttpContext.Current.Session["ProcessAuditStructureId"] != null)
                    //{
                    //    w.WriteLine("\r\nStructureID  : {0}", HttpContext.Current.Session["ProcessAuditStructureId"].ToString());
                    //}
                    string err = "Error in: " + System.Web.HttpContext.Current.Request.Url.ToString() +
                                    ". \r\nError Message: " + ex.Message.ToString();
                    w.WriteLine(err);
                    w.WriteLine("__________________________");
                    w.Flush();
                    w.Close();
                }
                return null;
            }
        }
        public string AdminRestaurantActiveEmailTrigger(string Restaurant, string emailid)
        {
            try
            {

                SmtpClient client = new SmtpClient(host, port);
                client.Credentials = new NetworkCredential(userName, str5);
                MailMessage message = new MailMessage
                {
                    From = new MailAddress(address)
                };
                message.To.Add(new MailAddress(emailid));
                message.Subject = "Thanks for Registering in Kiwi. Activated from Admin";
                message.Priority = MailPriority.Normal;
                message.IsBodyHtml = true;


                StringBuilder builder = new StringBuilder();
                builder.Append("");

                builder.Append("<table width=\"680\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"border:#064669 1px solid;font:normal 12px Arial; color:#000;\">");
                builder.Append("<tr>");
                builder.Append("<td style=\"padding:15px 0 15px 20px;background:#FFFFFF;\"><p align=\"left\" style=\"width:200px; float:left; margin:0px; padding:0px 2px 2px;\"><img src=" + str + "></p></td>");
                builder.Append("</tr>");
                builder.Append("<tr>");
                builder.Append("<td colspan=\"2\" height=\"15\" bgcolor=\"#043550\" align=\"center\" style=\"padding:5px 10px 5px 7px;\"></td>");
                builder.Append("</tr>");
                builder.Append("<tr>");
                builder.Append("<td colspan=\"2\" style=\"padding:15px 0px 5px 10px;font:normal 12px Arial;color:#000;\"><b>Dear " + Restaurant + ",</b></td>");
                builder.Append("</tr>");
                builder.Append("<tr>");
                builder.Append("<td colspan=\"2\" style=\"padding:5px 0px 0px 10px;font:normal 12px Arial;color:#000;\">");
                builder.Append("My name is Zeyd AbduRahman, a co-founder at KIWI and I would like to thank you for signing up with us as a restaurant <br />");
                builder.Append("beta tester. I would like to brief you on a couple of points pertaining to the beta phase of our app’s launch.<br /><br />");
                builder.Append("1. During this phase, we are focusing our marketing activity only around the American University of Sharjah.");
                builder.Append(" Therefore we hope you understand that, for now, using this app for restaurants outside of the vicinity of AUS will give you poor customer acquisition.<br />");
                builder.Append("2. As we commence with our marketing activities our user-base should grow with time. Please be patient with our product.<br />");
                builder.Append("3. Although you are free to run your regular promotions and offers on the app, we recommend that you also create new offers especially for KIWI.<br />");
                builder.Append("4. All throughout the beta phase we will be continuously updating and improving our web dashboard and app.");
                builder.Append(" Be prepared to see things improve and changed from time to time. If any feature does not work or if you have any feedback please contact me at zeyd@halakiwi.com or call me: +971 50 9224172<br />");
                builder.Append("5. During the beta-phase which will last a minimum of 2 months, the app will be completely FREE for you to use.");
                builder.Append(" The beta phase may last longer. After the beta phase is over we will shift to a paid model. However, you ");
                builder.Append("will have complete ability to opt-out then if you wish. At NO POINT during the BETA phase will we collect any of your BANKING DETAILS or similar information.<br />");
                builder.Append("6. By signing-up to our app you agree to our <a href='http://www.halakiwi.com/kiwi/terms'>TERMS & CONDITIONS</a> and <a href='http://www.halakiwi.com/kiwi/privacy'>PRIVACY POLICY</a>.<br /><br />");
                builder.Append("We will activate your account within 24 hours of you submitting these documents.");
                builder.Append("</td>");
                builder.Append("</tr>");
                builder.Append("<tr>");
                builder.Append("<td colspan=\"2\" style=\"padding:28px 0px 20px 10px;font:normal 12px Arial;color:#000;\">Excited to have you on board,<br /><br /> Zeyd AbduRahman; Co-Founder <br /></td>");
                builder.Append("</tr>");
                builder.Append("</table>");
                message.Body = builder.ToString();
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

        public string OutletEmailTrigger(string CompanyName, string OutletName, string Password, string EmailID)
        {
            try
            {

                SmtpClient client = new SmtpClient(host, port);
                client.Credentials = new NetworkCredential(userName, str5);
                MailMessage message = new MailMessage
                {
                    From = new MailAddress(address)
                };
                message.To.Add(new MailAddress(EmailID));
                message.Subject = "Outlet";
                message.Priority = MailPriority.Normal;
                message.IsBodyHtml = true;


                StringBuilder builder = new StringBuilder();
                builder.Append("");

                builder.Append("<table width=\"680\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"border:#064669 1px solid;font:normal 12px Arial; color:#000;\">");
                builder.Append("<tr>");
                builder.Append("<td style=\"padding:15px 0 15px 20px;background:#FFFFFF;\"><p align=\"left\" style=\"width:200px; float:left; margin:0px; padding:0px 2px 2px;\"><img src=" + str + "></p></td>");
                builder.Append("</tr>");
                builder.Append("<tr>");
                builder.Append("<td colspan=\"2\" height=\"15\" bgcolor=\"#043550\" align=\"center\" style=\"padding:5px 10px 5px 7px;\"></td>");
                builder.Append("</tr>");
                builder.Append("<tr>");
                builder.Append("<td colspan=\"2\" style=\"padding:15px 0px 5px 10px;font:normal 12px Arial;color:#000;\"><b>Dear " + OutletName + ",</b></td>");
                builder.Append("</tr>");
                builder.Append("<tr>");
                builder.Append("<td colspan=\"2\" style=\"padding:5px 0px 0px 10px;font:normal 12px Arial;color:#000;\">");
                builder.Append("Your Login credentials for the KIWI website dashboard has been created by your admin at " + CompanyName + " restaurant.<br /><br />");
                builder.Append("Please visit www.halakiwi.com/kiwi and use the following username and password to sign-in:<br /><br />");
                builder.Append("Username: "+EmailID+"<br />");
                builder.Append("Password: " + Password + "<br /><br />");
                builder.Append("After you log-in please visit the change password section of the page to change your password. Your admin will arrange for any training that you require to use our dashboard.<br /><br />");
                builder.Append("For questions, comments or feedback please contact us at contact@halakiwi.com.<br /><br />");
                builder.Append("If you do not work at XXXX restaurant or otherwise think that you are an unintended recipient of this email, please discard it immediately and contact us at contact@halakiwi.com.");
                builder.Append("</td>");
                builder.Append("</tr>");
                builder.Append("<tr>");
                builder.Append("<td colspan=\"2\" style=\"padding:28px 0px 20px 10px;font:normal 12px Arial;color:#000;\">Have a great day,<br /><br /> The KIWI team <br /></td>");
                builder.Append("</tr>");
                builder.Append("</table>");
                message.Body = builder.ToString();
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
    }
}