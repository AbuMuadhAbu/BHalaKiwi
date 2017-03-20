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
    public class LoginsController : Controller
    {
        private readonly IUserIdentityRepository _userIdentityRepository;
        private readonly ILoginsRepository _loginRepository;
        
        public LoginsController(IUserIdentityRepository userIdentityRepository, ILoginsRepository loginsRepository)
        {
            this._userIdentityRepository = userIdentityRepository;
            this._loginRepository = loginsRepository;
        }

        // GET: Logins
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Login()
        {
            try
            {
                //MailTrigger objn = new MailTrigger();
                //objn.SendMailforchangepassword("dinucome@gmail.com", "tessstttsubject", "Dineshkumar", "Dineshpassword");
                LoginModel objLogin = new LoginModel();
                bool isAuth = System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
                objLogin.RememberMe = true;
                if (base.Request.Cookies["KiwiUserName"] != null)
                {
                    objLogin.SigninName = base.Request.Cookies["KiwiUserName"].Value.ToString();
                }
                else
                {
                    objLogin.SigninName = "";
                }
                if (base.Request.Cookies["KiwiPassword"] != null)
                {
                    objLogin.Password = base.Request.Cookies["KiwiPassword"].Value.ToString();
                    ViewBag.Password = base.Request.Cookies["KiwiPassword"].Value.ToString();
                }
                else
                {
                    objLogin.Password = "";
                }
                return View(objLogin);
            }
            catch (Exception ex)
            {
                return View();
            }
        }

        //[HttpPost]
        //public ActionResult Login(LoginModel model, string returnUrl)
        //{
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            if (MembershipService.ValidateUser(model.SigninName, model.Password))
        //            {
        //                SetupFormsAuthTicket(model.SigninName, model.RememberMe);
        //                // -- Snip --
        //                return RedirectToAction("Index", "Home");
        //            }
        //            ModelState.AddModelError("",
        //              "The user name or password provided is incorrect.");
        //        }
        //        return View(model);
        //    }
        //    catch (Exception ex)
        //    {
        //        return View();
        //    }
        //}

        [HttpPost]
        public ActionResult Login(string SigninName, string Password, string RememberMe)
        {
            try
            {
                LoginModel objLogin = new LoginModel();
                //string IPAddress = GetIPAddress();
                string BrowserName = Request.Browser.Browser + " " + Request.Browser.Version;
                // Retrieve the user's groups
                // string groups = adAuth.GetGroups();
                // Create the authetication ticket

                IList<User> user = this._loginRepository.GetLoginDetails(SigninName, Password);
                //Models.User user = new Models.User { UserId = 1, UserName = "praveen", Password = "asd", Roles = "admin,moderate" };

                if (user[0].UserId == 0)
                {
                    ViewBag.ErrorMsg = "Authentication failed, check username and password.";
                    objLogin.ErrorMsg = "Invalid user access";
                    return View(objLogin);
                }
                var userData = user[0].UserId.ToString(CultureInfo.InvariantCulture);
                var authTicket = new FormsAuthenticationTicket(1, //version
                                    SigninName, // user name
                                    DateTime.Now,             //creation
                                    DateTime.Now.AddMinutes(30), //Expiration
                                    false, //Persistent
                                    userData);

                var encTicket = FormsAuthentication.Encrypt(authTicket);
                Response.Cookies.Add(new HttpCookie(FormsAuthentication.FormsCookieName, encTicket));

                //FormsAuthenticationTicket authTicket =
                //    new FormsAuthenticationTicket(1, // version
                //                                  SigninName,
                //                                  DateTime.Now,
                //                                  DateTime.Now.AddMinutes(60),
                //                                  false, "");
                // Now encrypt the ticket.
                string encryptedTicket =
                  FormsAuthentication.Encrypt(authTicket);
                // Create a cookie and add the encrypted ticket to the
                // cookie as data.
                HttpCookie authCookie =
                             new HttpCookie(FormsAuthentication.FormsCookieName,
                                            encryptedTicket);
                // Add the cookie to the outgoing cookies collection.
                Response.Cookies.Add(authCookie);
                //FormsAuthentication.Authenticate(SigninName, Password);

                bool isAuth = System.Web.HttpContext.Current.User.Identity.IsAuthenticated;

                FormsAuthentication.RedirectFromLoginPage(SigninName, false);



                Session["UserID"] = user[0].UserId;
                Session["UserName"] = user[0].UserName;
                Session["CompanyName"] = user[0].CompanyName;
                Session["RoleID"] = user[0].RoleID;

                if (RememberMe == "true")
                {
                    base.Response.Cookies["KiwiUserName"].Value = SigninName.ToString();
                    base.Response.Cookies["KiwiPassword"].Value = Password.ToString();
                    base.Response.Cookies["KiwiUserName"].Expires = DateTime.Now.AddDays(15.0);
                    base.Response.Cookies["KiwiPassword"].Expires = DateTime.Now.AddDays(15.0);
                }
                else
                {
                    base.Response.Cookies["KiwiUserName"].Expires = DateTime.Now.AddDays(-1.0);
                    base.Response.Cookies["KiwiPassword"].Expires = DateTime.Now.AddDays(-1.0);
                }




                objLogin.RememberMe = true;
                if (base.Request.Cookies["KiwiUserName"] != null)
                {
                    objLogin.SigninName = base.Request.Cookies["KiwiUserName"].Value.ToString();
                }
                else
                {
                    objLogin.SigninName = "";
                }
                if (base.Request.Cookies["KiwiPassword"] != null)
                {
                    objLogin.Password = base.Request.Cookies["KiwiPassword"].Value.ToString();
                    ViewBag.Password = base.Request.Cookies["KiwiPassword"].Value.ToString();
                }
                else
                {
                    objLogin.Password = "";
                }
                return View(objLogin);
            }
            catch (Exception msg)
            {
                return View(msg);
            }
        }
        
        public ActionResult SignOut()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            return Redirect(FormsAuthentication.LoginUrl);
        }
        public string SaveUserRegister(string EmailID)
        {
            IList lstresult = _loginRepository.SaveUserRegisterLanding(EmailID);
            return JsonConvert.SerializeObject(lstresult);
        }
    }
}