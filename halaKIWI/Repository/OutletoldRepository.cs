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
    public interface IOutletoldRepository
    {
        IList GetOutletList(int UserID);
        IList GetUpdateOutletList(string UserID);
        IList SaveOutlet(string OutletName, string EmailID, string Password, string PhoneNo1, string CusineType, string BranchArea, int UserID);
        IList UpdateOutlet(string OutletName, string EmailID, string Password, string PhoneNo1, string CusineType, string BranchArea, string UserID);

    }
    public class OutletoldRepository : IOutletoldRepository
    {
        private SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["KiwiConnectionString"].ToString());
        public IList GetOutletList(int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetOutletList", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetUpdateOutletList(string UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetUpdateOutletList", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList SaveOutlet(string OutletName, string EmailID, string Password, string PhoneNo1, string CusineType, string BranchArea, int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pName", OutletName);
            param.Add("@pEmailID", EmailID);
            param.Add("@pPhoneNo1", PhoneNo1);
            param.Add("@pUserPassword", Password);
            param.Add("@pCusineType", CusineType);
            param.Add("@pBranchArea", BranchArea);
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_SaveOutlet", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList UpdateOutlet(string OutletName, string EmailID, string Password, string PhoneNo1, string CusineType, string BranchArea, string UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pName", OutletName);
            param.Add("@pEmailID", EmailID);
            param.Add("@pPhoneNo1", PhoneNo1);
            param.Add("@pUserPassword", Password);
            param.Add("@pCusineType", CusineType);
            param.Add("@pBranchArea", BranchArea);
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_UpdateOutlet", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
    }
}