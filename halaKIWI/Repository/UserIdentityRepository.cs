using halaKIWI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace halaKIWI.Repository
{
    public interface IUserIdentityRepository
    {
        int UserID { get; set; }
        //string UserType { get; set; }
        //string UserName { get; set; }
    }

    public class UserIdentityRepository : IUserIdentityRepository
    {
        public int UserID
        {
            get
            {
                if (HttpContext.Current.Session["UserID"] != null)
                {
                    return Convert.ToInt32(HttpContext.Current.Session["UserID"]);
                }
                else
                {
                    return 0;
                }
            }
            set
            {
                HttpContext.Current.Session["UserID"] = value;
            }
        }

        public string UserType
        {
            get
            {
                if (HttpContext.Current.Session["UserType"] != null)
                {
                    return Convert.ToString(HttpContext.Current.Session["UserType"]);
                }
                else
                {
                    return "";
                }
            }
            set
            {
                HttpContext.Current.Session["UserType"] = value;
            }
        }
        public string UserName
        {
            get
            {
                if (HttpContext.Current.Session["UserName"] != null)
                {
                    return Convert.ToString(HttpContext.Current.Session["UserName"]);
                }
                else
                {
                    return "";
                }
            }
            set
            {
                HttpContext.Current.Session["UserName"] = value;
            }
        }

    }
}