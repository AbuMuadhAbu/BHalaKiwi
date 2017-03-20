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
    public interface IAdminRepository
    {
        IList AdminGetActiveRestaurant(int UserID);
        IList AdminGetInActiveRestaurant(int UserID);
        IList AdminGetGeneralUser(int UserID);
        IList GetActiveRestaurant(int UserID);
        IList GetRejectRestaurant(int UserID);
        IList SaveCusine(string Cusine,string CusineID);
        IList GetRemovecusine(string cusineid);
        IList GetCusine();
        IList GetInActiveRestaurant(int UserID);
        Dashboard GetAdminDashboard();
        Dashboard GetAdminSummary();
    }

    public class AdminRepository : IAdminRepository
    {
        private SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["KiwiConnectionString"].ToString());
        public IList AdminGetActiveRestaurant(int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_AdminGetActiveRestaurant", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public Dashboard GetAdminDashboard()
        {
            Dashboard obj = new Dashboard();
            DynamicParameters param = new DynamicParameters();
            using (var multi = con.QueryMultiple("spKiwi_GetAdminDashboard", param, commandType: CommandType.StoredProcedure))
            {
                obj.result1 = multi.Read<dynamic>().ToList();
                obj.result2 = multi.Read<dynamic>().ToList();
                obj.result3 = multi.Read<dynamic>().ToList();
                obj.result4 = multi.Read<dynamic>().ToList();
            }
            return obj;
        }
        public IList GetActiveRestaurant(int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_UpdateRestaurantActive", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetRejectRestaurant(int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_UpdateRestaurantReject", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList SaveCusine(string Cusine,string CusineID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pCusineID", CusineID);
            param.Add("@pCusine", Cusine);
            var multi = con.Query<dynamic>("spKiwi_SaveCusine", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetRemovecusine(string cusineid)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pCusineID", cusineid);
            var multi = con.Query<dynamic>("spKiwi_DeleteCusine", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }

        public IList GetCusine()
        {
            DynamicParameters param = new DynamicParameters();
            var multi = con.Query<dynamic>("spKiwi_GetCusines", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetInActiveRestaurant(int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetInActiveRestaurant", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList AdminGetInActiveRestaurant(int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_AdminGetInActiveRestaurant", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList AdminGetGeneralUser(int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_AdminGetGeneralUser", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }

        public Dashboard GetAdminSummary()
        {
            Dashboard obj = new Dashboard();
            DynamicParameters param = new DynamicParameters();
            using (var multi = con.QueryMultiple("spKiwi_GetDashboardSummary", param, commandType: CommandType.StoredProcedure))
            {
                obj.result1 = multi.Read<dynamic>().ToList();
                obj.result2 = multi.Read<dynamic>().ToList();
                obj.result3 = multi.Read<dynamic>().ToList();
                obj.result4 = multi.Read<dynamic>().ToList();
            }
            return obj;
            //DynamicParameters param = new DynamicParameters();
            //var multi = con.Query<dynamic>("spKiwi_GetTopAvailedOffers", param, commandType: CommandType.StoredProcedure);
            //return multi.ToList();
        }
    }
}

