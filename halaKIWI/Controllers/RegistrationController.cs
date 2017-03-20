using halaKIWI.Repository;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace halaKIWI.Controllers
{
    public class RegistrationController : Controller
    {
        private readonly ILoginsRepository _loginsRepository;
        private readonly IMailTriggerRepository _mailTriggerRepository;
        public RegistrationController(ILoginsRepository loginsRepository, IMailTriggerRepository mailTriggerRepository)
        {
            this._loginsRepository = loginsRepository;
            this._mailTriggerRepository = mailTriggerRepository;
        }

        // GET: Registration
        public ActionResult Index()
        {
            return View();
        }
        public string GetUserList()
        {
            HttpPostedFileBase file = Request.Files[0];
            BinaryReader b = new BinaryReader(file.InputStream);
            byte[] binData = b.ReadBytes(file.ContentLength);
            return JsonConvert.SerializeObject(binData);
        }
        public string BusinessRegister(string Name, string EmailID, string Password, string PhoneNo1, string Designation, string CompanyName, string Image)
        {
            IList lstresult = this._loginsRepository.BusinessRegister(Name, EmailID, Password, PhoneNo1, Designation, CompanyName, Image);
            return JsonConvert.SerializeObject(lstresult);
        }
        
        public string GetForgotPassword(string EmailID)
        {
            IList lstresult = _loginsRepository.GetForgotPassword(EmailID);
            return JsonConvert.SerializeObject(lstresult);
        }
        public string RestaurantEmailTrigger(string EmailID,string CompanyName)
        {
            string msg = this._mailTriggerRepository.RestaurantEmailTrigger(CompanyName, EmailID);
            return JsonConvert.SerializeObject(msg);
        }
        public string AdminRestaurantActiveEmailTrigger(string EmailID, string CompanyName)
        {
            string msg = this._mailTriggerRepository.AdminRestaurantActiveEmailTrigger(CompanyName, EmailID);
            return JsonConvert.SerializeObject(msg);
        }
        public string OutletEmailTrigger(string OutletName,string Password, string EmailID)
        {
            string msg = this._mailTriggerRepository.OutletEmailTrigger(Session["CompanyName"].ToString(),OutletName, Password, EmailID);
            return JsonConvert.SerializeObject(msg);
        }
        
    }
}