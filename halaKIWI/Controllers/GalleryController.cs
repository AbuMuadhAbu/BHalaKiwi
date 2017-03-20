using halaKIWI.Models;
using halaKIWI.Repository;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace halaKIWI.Controllers
{
    [SessionTimeOutFilter]
    public class GalleryController : Controller
    {

        private readonly IGalleryRepository _galleryRepository;
        private readonly IUserIdentityRepository _userIdentityRepository;
        // GET: Offer
        public GalleryController(IGalleryRepository galleryRepository, IUserIdentityRepository userIdentityRepository)
        {
            this._galleryRepository = galleryRepository;
            this._userIdentityRepository = userIdentityRepository;
        }
        [CustomAuthorize(Roles = "ImageGallery")]
        public ActionResult ManageGallery()
        {
            return View();
        }
        [CustomAuthorize(Roles = "ImageGallery")]
        public ActionResult GManageGallery()
        {
            return View();
        }
        [HttpPost]
        public string CropUploadImage()
        {
            IList lstresult;
            if (Request["image_name"].Length > 6)
            {
                string ImageUrl = Base64ToImage(Request["image_name"].Substring(22, Request["image_name"].Length - 22));
                if (Request["SaveType"] == "Save")
                {
                    lstresult = _galleryRepository.SaveGalleryDetails(Request["ImageTitle"], Request["OfferDescription"], ImageUrl, ImageUrl, _userIdentityRepository.UserID);
                }
                else
                {
                    lstresult = _galleryRepository.UpdateGalleryDetails(Request["GalleryID"], Request["ImageTitle"], Request["OfferDescription"], ImageUrl, ImageUrl, _userIdentityRepository.UserID);
                }
                return JsonConvert.SerializeObject(lstresult);
            }
            else
            {
                return "";
            }
        }

        public string Base64ToImage(string base64String)
        {
            // Convert base 64 string to byte[]
            byte[] imageBytes = Convert.FromBase64String(base64String);
            // Convert byte[] to Image
            Random rand = new Random();
            int guid = rand.Next();
            string phyiscalPath = Server.MapPath("/Upload/Gallery/" + guid.ToString() + ".jpg");

            using (Image image = System.Drawing.Image.FromStream(new MemoryStream(imageBytes)))
            {
                image.Save(phyiscalPath, System.Drawing.Imaging.ImageFormat.Jpeg);  // Or Png
                return "/Upload/Gallery/" + guid.ToString() + ".jpg";
            }
        }

        [HttpPost]
        public string Upload()
        {
            if (Request.Files.Count > 0)
            {
                HttpPostedFileBase file = Request.Files[0];
                BinaryReader b = new BinaryReader(file.InputStream);
                byte[] binData = b.ReadBytes(file.ContentLength);

                Random rand = new Random();
                int guid = rand.Next();
                string ext = Path.GetExtension(file.FileName);
                string phyiscalPath = Server.MapPath("/Upload/Gallery/" + guid.ToString() + ext.ToString());
                file.SaveAs(phyiscalPath);
                return JsonConvert.SerializeObject("/Upload/Gallery/" + guid.ToString() + ext.ToString());
            }
            else
            {
                return "";
            }
        }
        public string GetGalleryDetails()
        {
            IList lstresult = _galleryRepository.GetGalleryDetails(_userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }
        public string GetGalleryRemoveDetails(string GalleryID)
        {
            IList lstresult = _galleryRepository.GetGalleryRemoveDetails(GalleryID, _userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }

        public string SaveGalleryDetails(GalleryDetails GalleryDetails)
        {
            IList lstresult = _galleryRepository.SaveGalleryDetails(GalleryDetails.ImageTitle, GalleryDetails.OfferDescription, GalleryDetails.Image, TempData["Gallery"].ToString(), _userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }

    }
}