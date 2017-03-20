using halaKIWI.Models;
using halaKIWI.Repository;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace halaKIWI.Controllers
{
    [SessionTimeOutFilter]
    [ExceptionHandler]
    public class OfferController : Controller
    {

        private readonly IOfferRepository _offerRepository;
        private readonly IUserIdentityRepository _userIdentityRepository;
        // GET: Offer
        public OfferController(IOfferRepository offerRepository, IUserIdentityRepository userIdentityRepository)
        {
            this._offerRepository = offerRepository;
            this._userIdentityRepository = userIdentityRepository;
        }        // GET: Offer
        public ActionResult ManageOffer()
        {
            return View();
        }
        public string GetGalleryDetails()
        {
            IList lstresult = _offerRepository.GetGalleryDetails(_userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }
        public string GetOutlets()
        {
            IList lstresult = _offerRepository.GetOutlets(_userIdentityRepository.UserID);

            var returnObject = new object();

            returnObject = new
            {
                Result = lstresult,
                RoleID = Session["RoleID"].ToString()
            };
            return JsonConvert.SerializeObject(returnObject);
        }
        public string GetOfferList(string Outlet,string OfferStatus)
        {
            IList lstresult = _offerRepository.GetOfferList(_userIdentityRepository.UserID, Outlet, OfferStatus);
            return JsonConvert.SerializeObject(lstresult);
        }
        public string GetOfferDetail(string OfferID)
        {
            IList lstresult = _offerRepository.GetOfferDetail(OfferID);
            return JsonConvert.SerializeObject(lstresult);
        }

        [HttpPost]
        public string SaveOffers(OfferModel offerModel)
        {
            DataTable dtOutLetIDs = ToDataTable(offerModel.OutLetIDs);
            IList lstresult = _offerRepository.SaveOffers(dtOutLetIDs, offerModel, _userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }
        [HttpPost]
        public string UpdateOffers(UpdateOfferModel offerModel)
        {
            IList lstresult = _offerRepository.UpdateOffers(offerModel.OfferID, offerModel.OfferName, offerModel.StartDate, offerModel.EndDate, offerModel.OfferCost, offerModel.OfferDescription,offerModel.IsDelivery, _userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }
        [HttpPost]
        public string DisableOfferList(string OfferID)
        {
            IList lstresult = _offerRepository.DisableOfferList(OfferID);
            return JsonConvert.SerializeObject(lstresult);
        }
        

        public DataTable ToDataTable<T>(IList<T> data)
        {
            PropertyDescriptorCollection properties =
               TypeDescriptor.GetProperties(typeof(T));
            DataTable table = new DataTable();
            foreach (PropertyDescriptor prop in properties)
                table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
            foreach (T item in data)
            {
                DataRow row = table.NewRow();
                foreach (PropertyDescriptor prop in properties)
                    row[prop.Name] = prop.GetValue(item) ?? DBNull.Value;
                table.Rows.Add(row);
            }
            return table;

        }
    }
}