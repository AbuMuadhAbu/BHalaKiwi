using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Net.Mail;
using System.Net;

namespace halaKiwi.API.Repository
{
    public interface IRegisterRepository
    {
        IList GetUserList(string Name, string EmailID, string Age, string Password, string UserPic);
        IList RegisterSocialMedia(string Name, string EmailID, string SocialType);
        IList GetLoginDetails(string EmailID, string Password);
        IList GetOfferList(string Lattitude, string Longitude, string UserID);
        IList GetFilterOfferList(string Lattitude, string Longitude, string UserID, string FilterType);
        IList GetSaveUserLocation(string Lattitude, string Longitude, string UserID);
        IList GetOfferListDetails(string OfferID, string UserID);
        IList GetOfferDetails(string Lattitude, string Longitude, string OfferID, string UserID);
        IList StoreLocationRange(string UserID, string Range);
        IList GetCusine(string UserID);
        IList GetUserProfile(string UserID);
        IList GetUpdateUserCusine(string UserID, string CusineID, string IsActive);
        IList GetSaveOfferWhistlist(string UserID, string OfferID);
        IList GetUnSelectWhistlist(string UserID, string OfferID, string WhishListStatus);
        IList GetSaveOfferClaim(string UserID, string OfferID);
        IList GetOfferWhistlist(string UserID);
        IList GetOfferClaim(string UserID);
        IList GetUserGPSRange(string UserID);
        IList GetForgotPassword(string EmailID);
        IList ChangePassword(string OldPassword, string Password, int UserID);
    }
    public class RegisterRepository : IRegisterRepository
    {
        private SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["KiwiConnectionString"].ToString());
        string host = System.Configuration.ConfigurationManager.AppSettings["LHost"].ToString();
        int port = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["LPort"].ToString());
        string str2 = System.Configuration.ConfigurationManager.AppSettings["LToMailId"].ToString();
        string address = System.Configuration.ConfigurationManager.AppSettings["LMailId"].ToString();
        string userName = System.Configuration.ConfigurationManager.AppSettings["LMailId"].ToString();
        string str5 = System.Configuration.ConfigurationManager.AppSettings["LMailPassword"].ToString();
        string str = System.Configuration.ConfigurationManager.AppSettings["MailLogo"].ToString();
        private string Msg = string.Empty;
        public IList GetUserList(string Name, string EmailID, string Age, string Password, string UserPic)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pName", Name);
            param.Add("@pEmailID", EmailID);
            param.Add("@pAge", Age);
            param.Add("@pPassword", Password);
            param.Add("@pUserPic", UserPic);

            var multi = con.Query<dynamic>("spKiwi_InsertGeneralUserAPI", param, commandType: CommandType.StoredProcedure);
            if (multi.ToList()[0].UserID > 0)
            {
                SmtpClient client = new SmtpClient(host, port);
                client.Credentials = new NetworkCredential(userName, str5);
                MailMessage message = new MailMessage
                {
                    From = new MailAddress(address)
                };
                message.To.Add(new MailAddress(EmailID));
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
                builder.Append("<td colspan=\"2\" style=\"padding:15px 0px 5px 10px;font:normal 12px Arial;color:#000;\"><b>Dear " + Name + ",</b></td>");
                builder.Append("</tr>");
                builder.Append("<tr>");
                builder.Append("<td colspan=\"2\" style=\"padding:5px 0px 0px 10px;font:normal 12px Arial;color:#000;\">");
                builder.Append("Thank you for downloading KIWI and welcome to our budding new community.<br /><br />");
                builder.Append("Currently KIWI is in its beta phase. This means that the app may contain a few bugs and not look as brilliantly as we envision but it should still help you get great restaurant offers, deals and discounts.<br /><br />");
                builder.Append("We are working to incorporate an exciting range of new features to the app. You can find out more about these upcoming features on our website www.halakiwi.com. We also encourage you to follow us on our social media (@halakiwi on twitter, Instagram and Facebook ).<br /><br />");
                builder.Append("You are the first group of people to use our app. Therefore, we really want to involve you in the process of making KIWI great. This is why we welcome any feedback, questions and even criticisms from you. We would love to talk to you on any of our social media platforms or you may email us at contact@halakiwi.com.<br /><br />");
                builder.Append("As AUS graduates, AUS is our starting point so you’ll only see offers from restaurants around University City for now. In the coming months we will sign-up restaurants from Knowledge Village, Academic City and then the rest of Dubai-Sharjah.<br /><br />");
                builder.Append("We’re really excited for you to be joining us on this journey!<br />");
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
            }
            return multi.ToList();
        }

        public IList ChangePassword(string OldPassword, string Password, int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            param.Add("@pOldPassword", OldPassword);
            param.Add("@pPassword", Password);
            var multi = con.Query<dynamic>("spKiwi_UserChangePassword", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetCusine(string UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetCusine", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList RegisterSocialMedia(string Name, string EmailID, string SocialType)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pName", Name);
            param.Add("@pEmailID", EmailID);
            param.Add("@pSocialType", SocialType);

            var multi = con.Query<dynamic>("spKiwi_InsertGeneralUserSocialMediaAPI", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetLoginDetails(string EmailID, string Password)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pEmailID", EmailID);
            param.Add("@pPassword", Password);
            var multi = con.Query<dynamic>("spKiwi_GetLoginDetails", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList StoreLocationRange(string UserID, string Range)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            param.Add("@pRange", Range);
            var multi = con.Query<dynamic>("spKiwi_StoreLocationRanges", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }

        public IList GetOfferList(string Lattitude, string Longitude, string UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pLattitude", Lattitude);
            param.Add("@pLongitude", Longitude);
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetOffers", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }

        public IList GetFilterOfferList(string Lattitude, string Longitude, string UserID, string FilterType)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pLattitude", Lattitude);
            param.Add("@pLongitude", Longitude);
            param.Add("@pUserID", UserID);
            param.Add("@pFilterType", FilterType);
            var multi = con.Query<dynamic>("spKiwi_GetFilterOfferList", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetSaveUserLocation(string Lattitude, string Longitude, string UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pLattitude", Lattitude);
            param.Add("@pLongitude", Longitude);
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_SaveUserLocation", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetOfferListDetails(string OfferID, string UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pOfferID", OfferID);
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetOfferListDetails", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetOfferDetails(string Lattitude, string Longitude, string OfferID, string UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pLattitude", Lattitude);
            param.Add("@pLongitude", Longitude);
            param.Add("@pOfferID", OfferID);
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetOfferDetails_API", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetUserProfile(string UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetUserProfile", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetUpdateUserCusine(string UserID, string CusineID, string IsActive)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            param.Add("@pCusineID", CusineID);
            param.Add("@pIsActive", IsActive);

            var multi = con.Query<dynamic>("spKiwi_UpdateUserCusine", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetSaveOfferWhistlist(string UserID, string OfferID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            param.Add("@pOfferID", OfferID);
            var multi = con.Query<dynamic>("spKiwi_SaveOfferWhistlist", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetUnSelectWhistlist(string UserID, string OfferID, string WhishListStatus)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            param.Add("@pOfferID", OfferID);
            param.Add("@pWhishListStatus", WhishListStatus);
            var multi = con.Query<dynamic>("spKiwi_UnSelectWhistlist", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetSaveOfferClaim(string UserID, string OfferID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            param.Add("@pOfferID", OfferID);
            var multi = con.Query<dynamic>("spKiwi_SaveOfferClaim", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetOfferWhistlist(string UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetOfferWhistlist", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetOfferClaim(string UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetOfferClaimList", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetUserGPSRange(string UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetUserGPSRange", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }

        public IList GetForgotPassword(string EmailID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pEmailID", EmailID);
            var multi = con.Query<dynamic>("spKiwi_GetForgotPassword", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }

    }
}