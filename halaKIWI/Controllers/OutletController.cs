using halaKIWI.Models;
using halaKIWI.Repository;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Device.Location;


namespace halaKIWI.Controllers
{
    [SessionTimeOutFilter]
    public class OutletController : Controller
    {
        private readonly IOutletRepository _outletRepository;
        private readonly IUserIdentityRepository _userIdentityRepository;
        // GET: Outlet
        public OutletController(IOutletRepository outletRepository, IUserIdentityRepository userIdentityRepository)
        {
            this._outletRepository = outletRepository;
            this._userIdentityRepository = userIdentityRepository;
        }

        [CustomAuthorize(Roles = "ManageOutlet")]
        public ActionResult Outlet()
        {
            return View();
        }
        public string SaveOutlet(string OutletName, string EmailID, string Password, string PhoneNo1, string CusineType, string BranchArea, decimal Latitude, decimal Longitude)
        {
            IList lstresult = _outletRepository.SaveOutlet(OutletName, EmailID, Password, PhoneNo1, CusineType, BranchArea, Latitude, Longitude, _userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }
        public string GetCusine()
        {
            IList lstresult = _outletRepository.GetCusine();
            return JsonConvert.SerializeObject(lstresult);
        }
        public string UpdateOutlet(string OutletName, string EmailID, string Password, string PhoneNo1, string CusineType, string BranchArea, decimal Latitude, decimal Longitude, string UserID)
        {
            IList lstresult = _outletRepository.UpdateOutlet(OutletName, EmailID, Password, PhoneNo1, CusineType, BranchArea, Latitude, Longitude, UserID);
            return JsonConvert.SerializeObject(lstresult);
        }

        public string GetJson(DataTable dt)
        {
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row = null;

            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName.Trim(), dr[col]);
                }
                rows.Add(row);
            }

            serializer.MaxJsonLength = int.MaxValue;
            return serializer.Serialize(rows);
        }
        public string GetOutletList()
        {
            IList lstresult = _outletRepository.GetOutletList(_userIdentityRepository.UserID);

 
            GeoCoordinate coord =new GeoCoordinate();
            double a =coord.Latitude;
            //if (!watcher.Position.Location.IsUnknown)
            //{
            //    double lat = coord.Latitude; //latitude
            //    double long = coord.Longitude;  //logitude
            //}
            return JsonConvert.SerializeObject(lstresult);
        }
        public string GetUpdateOutletList(string UserID)
        {
            IList lstresult = _outletRepository.GetUpdateOutletList(UserID);


            GeoCoordinate coord = new GeoCoordinate();
            double a = coord.Latitude;
            //if (!watcher.Position.Location.IsUnknown)
            //{
            //    double lat = coord.Latitude; //latitude
            //    double long = coord.Longitude;  //logitude
            //}
            return JsonConvert.SerializeObject(lstresult);
        }

        public string GetOutletLocation(int UserID)
        {
            IList lstresult = _outletRepository.GetOutletLocation(UserID);
            return JsonConvert.SerializeObject(lstresult);
        }
        public string SetOutletLocation(int UserID, decimal Latitude, decimal Longitude)
        {
            IList lstresult = _outletRepository.SetOutletLocation(Latitude, Longitude, UserID);
            return JsonConvert.SerializeObject(lstresult);
        }

    }
}