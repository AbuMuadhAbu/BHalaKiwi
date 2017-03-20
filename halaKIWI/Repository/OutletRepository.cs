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
    public interface IOutletRepository
    {
        IList GetOutletList(int UserID);
        IList GetUpdateOutletList(string UserID);
        IList GetCusine();
        IList SaveOutlet(string OutletName, string EmailID, string Password, string PhoneNo1, string CusineType, string BranchArea, decimal Latitude, decimal Longitude, int UserID);
        IList UpdateOutlet(string OutletName, string EmailID, string Password, string PhoneNo1, string CusineType, string BranchArea, decimal Latitude, decimal Longitude, string UserID);
        IList GetOutletLocation(int UserID);
        IList SetOutletLocation(decimal Latitude, decimal Longitude, int UserID);
    }

    public class OutletRepository : IOutletRepository
    {
        private SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["KiwiConnectionString"].ToString());
        public IList GetOutletList(int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetOutletList", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetCusine()
        {
            DynamicParameters param = new DynamicParameters();
            var multi = con.Query<dynamic>("spKiwi_GetCusines", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetUpdateOutletList(string UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetUpdateOutletList", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList SaveOutlet(string OutletName, string EmailID, string Password, string PhoneNo1, string CusineType, string BranchArea, decimal Latitude, decimal Longitude, int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pName", OutletName);
            param.Add("@pEmailID", EmailID);
            param.Add("@pPhoneNo1", PhoneNo1);
            param.Add("@pUserPassword", Password);
            param.Add("@pCusineType", CusineType);
            param.Add("@pBranchArea", BranchArea);
            param.Add("@pLattitude", Latitude);
            param.Add("@pLongitude", Longitude);
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_SaveOutlet", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList UpdateOutlet(string OutletName, string EmailID, string Password, string PhoneNo1, string CusineType, string BranchArea, decimal Latitude, decimal Longitude, string UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pName", OutletName);
            param.Add("@pEmailID", EmailID);
            param.Add("@pPhoneNo1", PhoneNo1);
            param.Add("@pUserPassword", Password);
            param.Add("@pCusineType", CusineType);
            param.Add("@pBranchArea", BranchArea);
            param.Add("@pLattitude", Latitude);
            param.Add("@pLongitude", Longitude);
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_UpdateOutlet", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }

        public IList GetOutletLocation(int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetOutletLocation", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList SetOutletLocation(decimal Latitude, decimal Longitude, int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pLattitude", Latitude);
            param.Add("@pLongitude", Longitude);
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_SetOutletLocation", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
    }    
}