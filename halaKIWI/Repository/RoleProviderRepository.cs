using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
    public class RoleProviderRepository
    {
        private SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["KiwiConnectionString"].ToString());
        public string[] GetEmployeeScreens(string UserName)
        {
            List<string> userScreens = new List<string>();
            DynamicParameters param = new DynamicParameters();
            param.Add("@pRoleID", HttpContext.Current.Session["RoleID"].ToString());
            List<User> objuser = con.Query<User>("spKiwi_GetRoleScreens", param, commandType: CommandType.StoredProcedure).ToList();
            for (int i = 0; i < objuser.Count; i++)
            {
                userScreens.Add(objuser[i].ScreenName.ToString());
            }
            return userScreens.ToArray();
        }
    }
}