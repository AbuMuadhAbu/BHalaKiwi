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
    public interface IUsersRepository
    {
        IList GetUserProfile(int UserID);
        IList GetImage(int UserID);
        IList UploadUserImage(int UserID,string UserImage,string ImagePath);
        IList ChangePassword(string OldPassword, string Password,int UserID);
        IList SaveUserDetails(DataTable dtUserProfileDetails,int UserID);
        IList SaveIndividualUserDetails(DataTable dtUserProfileDetails,int UserID);
        
    }
    public class UsersRepository: IUsersRepository
    {
        private SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["KiwiConnectionString"].ToString());
        public IList GetUserProfile(int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetUserProfile", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList UploadUserImage(int UserID, string UserImage, string ImagePath)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            param.Add("@pUserImage", UserImage);
            param.Add("@pImagePath", ImagePath);
            var multi = con.Query<dynamic>("spKiwi_UploadUserImage", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        
        public IList GetImage(int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetImage", param, commandType: CommandType.StoredProcedure);
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
        public IList SaveUserDetails(DataTable dtUserProfileDetails, int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            param.Add("@pUserDetails", dtUserProfileDetails.AsTableValuedParameter());
            var multi = con.Query<dynamic>("spKiwi_SaveUserDetails", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList SaveIndividualUserDetails(DataTable dtUserProfileDetails, int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            param.Add("@pUserDetails", dtUserProfileDetails.AsTableValuedParameter());
            var multi = con.Query<dynamic>("spKiwi_SaveIndividualUserDetails", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
    }
}