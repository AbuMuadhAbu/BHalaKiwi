using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace halaKIWI.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        [Authorize(Roles = "moderate")]
        public ActionResult Index1()
        {
            return View();
        }

        [Authorize(Roles = "admin")]
        public ActionResult Index2()
        {
            return View();
        }


    }
}