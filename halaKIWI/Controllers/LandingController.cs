using halaKIWI.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using halaKIWI.Repository;
using System.Collections;
using Newtonsoft.Json;

namespace halaKIWI.Controllers
{
    [SessionTimeOutFilter]
    public class LandingController : Controller
    {
        private readonly ILoginsRepository _loginsRepository;
        public LandingController(ILoginsRepository loginsRepository)
        {
            this._loginsRepository = loginsRepository;
        }

        public ActionResult Home()
        {
            return View();
        }

        // GET: Landing
        public ActionResult Landing()
        {
            //if (Session["RoleID"].ToString() == "1")
            //{
            //    return Redirect("/Kiwi/Admin/Restaurant");
            //}
            //else
            //{
            //    return Redirect("/Kiwi/Users/UserProfile");
            //}
            if (Session["RoleID"].ToString() == "1")
            {
                return Redirect("/Kiwi/Admin/Restaurant");
            }
            else
            {
                return Redirect("/Kiwi/Offer/ManageOffer");
            }
        }
        public string SaveUserRegister(string EmailID)
        {
            IList lstresult = _loginsRepository.SaveUserRegisterLanding(EmailID);
            return JsonConvert.SerializeObject(lstresult);
        }
    }
}