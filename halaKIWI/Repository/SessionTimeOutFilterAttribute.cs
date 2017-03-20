using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace halaKIWI.Repository
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    public class SessionTimeOutFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var context = filterContext.HttpContext;

            //context.Session["UserID"] = "1";
            //context.Session["UserType"] = "Business";
            //context.Session["UserName"] = "DineshKumar";
            //// If the browser session or authentication session has expired...
            //if (context.Session["EmployeeID"] == null || !context.Request.IsAuthenticated)
            if (context.Session["UserID"] == null|| context.Session["RoleID"] == null)
            {
                if (context.Request.IsAjaxRequest())
                {
                    // For AJAX requests, we're overriding the returned JSON result with a simple string,
                    // indicating to the calling JavaScript code that a redirect should be performed.
                    filterContext.Result = new JsonResult { Data = "Error: Session timed out, relogin." };
                }
                else
                {
                    filterContext.Result = new RedirectResult("~/logins/login");
                }
            }

            base.OnActionExecuting(filterContext);
        }


    }
}