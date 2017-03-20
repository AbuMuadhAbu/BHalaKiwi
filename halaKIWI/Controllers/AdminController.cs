using halaKIWI.Models;
using halaKIWI.Repository;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace halaKIWI.Controllers
{
    [SessionTimeOutFilter]

    public class AdminController : Controller
    {
        // GET: Admin
        private readonly IOfferRepository _offerRepository;
        private readonly IAdminRepository _adminRepository;
        private readonly IOutletRepository _outletRepository;
        private readonly IUserIdentityRepository _userIdentityRepository;
        public AdminController(IOfferRepository offerRepository, IOutletRepository outletRepository, IAdminRepository adminRepository, IUserIdentityRepository userIdentityRepository)
        {
            this._offerRepository = offerRepository;
            this._outletRepository = outletRepository;
            this._adminRepository = adminRepository;
            this._userIdentityRepository = userIdentityRepository;
        }
        [CustomAuthorize(Roles = "AdminRestaurant")]
        public ActionResult Restaurant()
        {
            return View();
        }
        public ActionResult GeneralUser()
        {
            return View();
        }
        public ActionResult InactiveRestaurant()
        {
            return View();
        }
        public ActionResult Dashboard()
        {
            return View();
        }
        public ActionResult Summary()
        {
            return View();
        }
        public ActionResult Cusine()
        {
            return View();
        }
        
        public string GetRejectRestaurant(string UserID)
        {
            IList lstresult = _adminRepository.GetRejectRestaurant(Convert.ToInt32(UserID));
            return JsonConvert.SerializeObject(lstresult);
        }
        public string SaveCusine(string Cusine,string CusineID)
        {
            IList lstresult = _adminRepository.SaveCusine(Cusine, CusineID);
            return JsonConvert.SerializeObject(lstresult);
        }
        public string GetRemovecusine(string cusineid)
        {
            IList lstresult = _adminRepository.GetRemovecusine(cusineid);
            return JsonConvert.SerializeObject(lstresult);
        }
        

        public string GetCusine()
        {
            IList lstresult = _adminRepository.GetCusine();
            return JsonConvert.SerializeObject(lstresult);
        }
        
        public string GetInActiveRestaurant(string UserID)
        {
            IList lstresult = _adminRepository.GetInActiveRestaurant(Convert.ToInt32(UserID));
            return JsonConvert.SerializeObject(lstresult);
        }
        
        public string GetOutletList(string UserID)
        {
            IList lstresult = _outletRepository.GetOutletList(Convert.ToInt32(UserID));
            return JsonConvert.SerializeObject(lstresult);
        }
        public string GetOutlets(string UserID)
        {
            IList lstresult = _offerRepository.GetOutlets(Convert.ToInt32(UserID));

            var returnObject = new object();

            returnObject = new
            {
                Result = lstresult,
                RoleID = Session["RoleID"].ToString()
            };
            return JsonConvert.SerializeObject(returnObject);
        }
        public string GetOfferList(string UserID,string Outlet, string OfferStatus)
        {
            IList lstresult = _offerRepository.GetOfferList(Convert.ToInt32(UserID), Outlet, OfferStatus);
            return JsonConvert.SerializeObject(lstresult);
        }

        public string AdminGetActiveRestaurant()
        {
            IList lstresult = _adminRepository.AdminGetActiveRestaurant(_userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }
        public string AdminGetInActiveRestaurant()
        {
            IList lstresult = _adminRepository.AdminGetInActiveRestaurant(_userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }
        public string AdminGetGeneralUser()
        {
            IList lstresult = _adminRepository.AdminGetGeneralUser(_userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }
        public string GetActiveRestaurant(string UserID)
        {
            IList lstresult = _adminRepository.GetActiveRestaurant(Convert.ToInt32(UserID));
            return JsonConvert.SerializeObject(lstresult);
        }
        public string GetAdminDashboard()
        {
            Dashboard lstresult = _adminRepository.GetAdminDashboard();
            return JsonConvert.SerializeObject(lstresult);
        }
        public string GetAdminSummary()
        {
            var lstresult = _adminRepository.GetAdminSummary();
            return JsonConvert.SerializeObject(lstresult);
        }

    }
}