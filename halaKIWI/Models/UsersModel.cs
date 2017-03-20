using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace halaKIWI.Models
{
    public class UsersModel
    {
    }
    public class Dashboard
    {
        public dynamic result1 { get; set; }
        public dynamic result2 { get; set; }
        public dynamic result3 { get; set; }
        public dynamic result4 { get; set; }
        public dynamic result5 { get; set; }
    }

    public class UpdateOfferModel
    {
        public string OfferName { get; set; }
        public string OfferCost { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string OfferDescription { get; set; }
        public int IsDelivery { get; set; }
        public int OfferID { get; set; }
    }

    public class OfferModel
    {
        public string OfferName { get; set; }
        public string OrderAvailable { get; set; }
        public string OfferCost { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string OfferDescription { get; set; }
        public int IsDelivery { get; set; }
        public int GalleryID { get; set; }
        public List<OutLetIDs> OutLetIDs { get; set; }
    }
    public class OutLetIDs
    {
        public string OutLetID { get; set; }

    }
    public class UsersProfile
    {
        public string CompanyName { get; set; }
        public string EmailID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Designation { get; set; }
        public string CompanyPhoneNo { get; set; }
        public string CompanyAddress1 { get; set; }
        public string CompanyAddress2 { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string CompanyDescription { get; set; }
    }

    public class IndividualUsersProfile
    {
        public string CompanyName { get; set; }
        public string EmailID { get; set; }
        public string CusineType { get; set; }
        public string CompanyPhoneNo { get; set; }
    }
    public class GalleryDetails
    {
        public string ImageTitle { get; set; }
        public string OfferDescription { get; set; }
        public string Image { get; set; }
    }
}