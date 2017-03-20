using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace halaKIWI
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
              name: "privacy",
              url: "privacy",
              defaults: new { controller = "Policy", action = "Policy", id = UrlParameter.Optional }
          );
            routes.MapRoute(
              name: "terms",
              url: "terms",
              defaults: new { controller = "Policy", action = "Terms", id = UrlParameter.Optional }
          );
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Landing", action = "Landing", id = UrlParameter.Optional }
            );
        }
    }
}
