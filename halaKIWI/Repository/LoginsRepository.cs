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
using halaKIWI.Models;

namespace halaKIWI.Repository
{
    public interface ILoginsRepository
    {
        IList GetUserList();
        IList GetUserList(string Name, string EmailID, string Age, string Password, byte[] UserPic);
        IList SaveUserRegisterLanding(string EmailID);
        IList GetForgotPassword(string EmailID);
        IList<User> GetLoginDetails(string SigninName, string Password);
        IList BusinessRegister(string Name, string EmailID, string Password, string PhoneNo1, string Designation, string CompanyName, string UserPic);
    }
    public class LoginsRepository : ILoginsRepository
    {
        private SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["KiwiConnectionString"].ToString());
        public IList GetForgotPassword(string EmailID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pEmailID", EmailID);
            var multi = con.Query<dynamic>("spKiwi_GetForgotPassword", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList SaveUserRegisterLanding(string EmailID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pEmailID", EmailID);

            var multi = con.Query<dynamic>("spKiwi_SaveUserRegisterLanding", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
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
        public IList<User> GetLoginDetails(string SigninName, string Password)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pEmailID", SigninName);
            param.Add("@pPassword", Password);
            return con.Query<User>("spKiwi_GetWebLoginDetails", param, commandType: CommandType.StoredProcedure).ToList();

        }
        public IList BusinessRegister(string Name, string EmailID, string Password, string PhoneNo1, string Designation, string CompanyName, string UserPic)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pName", Name);
            param.Add("@pEmailID", EmailID);
            param.Add("@pPhoneNo1", PhoneNo1);
            param.Add("@pUserPassword", Password);
            param.Add("@pDesignation", Designation);
            param.Add("@pCompanyName", CompanyName);
            param.Add("@pImage", UserPic);
            var multi = con.Query<dynamic>("spKiwi_BusinessUserRegister", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetUserList()
        {
            DynamicParameters param = new DynamicParameters();
            //param.Add("@pProcessAuditStructureId", ProcessAuditStructureId);
            //param.Add("@pEmployeeIDs", dtProductionAgents.AsTableValuedParameter("[dbo].[udtEmployeeIDs]"));
            //param.Add("@pQCdEmployeeIDs", dtQCAgents.AsTableValuedParameter("[dbo].[udtEmployeeIDs]"));
            //param.Add("@pWorkedDateFrom", FromDate);
            //param.Add("@pWorkedDateTo", ToDate);
            //param.Add("@pMode", Mode);
            //param.Add("@pErrorMode", ErrorMode);
            //param.Add("@pCount", RandomCount);
            //param.Add("@pAuditorID", AuditorID);
            //param.Add("@pLocation", Locations);
            var multi = con.Query<dynamic>("spKiwi_GetUserList", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
    }
}