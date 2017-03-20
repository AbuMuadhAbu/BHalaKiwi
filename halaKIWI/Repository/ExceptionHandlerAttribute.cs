using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace halaKIWI.Repository
{
    [SessionTimeOutFilter]
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    public class ExceptionHandlerAttribute : HandleErrorAttribute
    {
        public override void OnException(ExceptionContext filterContext)
        {
            if (filterContext.ExceptionHandled)
            {
                return;
            }
            else
            {
                int statusCode = 0;
                statusCode = (int)HttpStatusCode.InternalServerError;
                if (filterContext.Exception is UnauthorizedAccessException)
                {
                    statusCode = (int)HttpStatusCode.Forbidden;
                }
                string action = filterContext.RouteData.Values["action"].ToString();
                string controller = filterContext.RouteData.Values["controller"].ToString();
                Type controllerType = filterContext.Controller.GetType();
                var method = controllerType.GetMethod(action);
                var returnType = method.ReturnType;
                string path = "C:/Software/IntranetErrors/Kiwi_" + DateTime.Today.ToString("ddMMMyy") + ".txt";
                if (!File.Exists(path))
                {
                    File.Create(path).Close();
                }
                using (StreamWriter w = File.AppendText(path))
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
                    w.WriteLine("Error Time: {0}", getIndianStandardTime().ToString(CultureInfo.InvariantCulture));
                    string err = "Error in: " + System.Web.HttpContext.Current.Request.Url.ToString() +
                                    ". \r\nError Code: " + statusCode +
                                    ". \r\nError Message: " + filterContext.Exception.Message;
                    w.WriteLine(err);
                    w.WriteLine("__________________________");
                    w.Flush();
                    w.Close();
                }
                if (returnType.Equals(typeof(JsonResult)) || returnType.Equals(typeof(string)))
                {
                    filterContext.Result = new JsonResult()
                    {
                        Data = new
                        {
                            error = true,
                            message = filterContext.Exception.Message,
                            statusCode = statusCode
                        }
                    };
                    filterContext.ExceptionHandled = true;
                }
                else
                {
                    filterContext.ExceptionHandled = false;
                }
            }
        }

        public static DateTime getIndianStandardTime()
        {
            TimeZoneInfo IND_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, IND_ZONE);
        }
    }
}