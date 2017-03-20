using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI.WebControls;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Configuration;

namespace halaKIWI.Repository
{
    public class CustomAuthorize : AuthorizeAttribute
    {
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            //if (WebConfigurationManager.AppSettings["IsLocal"].ToString() == "No")
            //{
            filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Error", action = "AccessDenied" }));
            //}
        }
    }
}