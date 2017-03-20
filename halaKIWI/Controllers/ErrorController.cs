using halaKIWI.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace halaKIWI.Controllers
{
    [SessionTimeOutFilter]
    public class ErrorController : Controller
    {
        // GET: Error
        public ActionResult AccessDenied()
        {
            return View();
        }

        public ActionResult FileNotFound()
        {
            return View();
        }
    }
}