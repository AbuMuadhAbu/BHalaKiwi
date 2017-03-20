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

namespace halaKIWI.Repository
{
    public interface IRegisterRepository
    {
        IList GetUserList(string Name, string EmailID, string Age, string Password, byte[] UserPic);
        IList RegisterSocialMedia(string Name, string EmailID, string SocialType);
        IList GetLoginDetails(string EmailID, string Password);
        IList GetOfferList(string Lattitude, string Longitude);
        IList StoreLocationRange(string UserID, string Range);
        IList GetUserProfile(string UserID);
    }
    public class RegisterRepository : IRegisterRepository
    {
        private SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["KiwiConnectionString"].ToString());
        public IList GetUserList(string Name, string EmailID, string Age, string Password, byte[] UserPic)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pName", Name);
            param.Add("@pEmailID", EmailID);
            param.Add("@pAge", Age);
            param.Add("@pPassword", Password);
            param.Add("@pUserPic", UserPic);

            var multi = con.Query<dynamic>("spKiwi_InsertGeneralUserAPI", param, commandType: CommandType.StoredProcedure);
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

        public IList GetOfferList(string Lattitude, string Longitude)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pLattitude", Lattitude);
            param.Add("@pLongitude", Longitude);
            var multi = con.Query<dynamic>("spKiwi_GetOffers", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetUserProfile(string UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetUserProfile", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
    }
}