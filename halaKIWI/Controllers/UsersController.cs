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
using System.Drawing;
using System.Drawing.Imaging;

namespace halaKIWI.Controllers
{
    [SessionTimeOutFilter]
    public class UsersController : Controller
    {
        public Guid RandomID { get; set; }
        private readonly IUsersRepository _usersRepository;
        private readonly IUserIdentityRepository _userIdentityRepository;
        // GET: Users
        public UsersController(IUsersRepository usersRepository, IUserIdentityRepository userIdentityRepository)
        {
            this._usersRepository = usersRepository;
            this._userIdentityRepository = userIdentityRepository;
        }
        [CustomAuthorize(Roles = "UserProfile")]
        public ActionResult UserProfile()
        {
            return View();
        }
        public ActionResult ChangePassword()
        {
            return View();
        }

        public string GetUserProfile()
        {
            IList lstresult = _usersRepository.GetUserProfile(_userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }
        private ImageCodecInfo GetImageCoeInfo(string mimeType)
        {
            ImageCodecInfo[] codes = ImageCodecInfo.GetImageEncoders();
            for (int i = 0; i < codes.Length; i++)
            {
                if (codes[i].MimeType == mimeType)
                {
                    return codes[i];
                }
            }
            return null;
        }
        [HttpPost]
        public string UploadImage()
        {

            if (Request.Files.Count > 0)
            {
                ImageCompress imgCompress = ImageCompress.GetImageCompressObject;
                HttpPostedFileBase file = Request.Files[0];
                Random rand = new Random();
                string ext = Path.GetExtension(file.FileName);
                int guid = rand.Next();
                string phyiscalPath = Server.MapPath("/Upload/Profiles/" + guid.ToString() + ext.ToString());
                file.SaveAs(phyiscalPath);
                //imgCompress.GetImage = new System.Drawing.Bitmap(file.InputStream);
                //imgCompress.Height = 60;
                //imgCompress.Width = 128;
                //imgCompress.Save(guid.ToString() + ext.ToString(), Server.MapPath("/Upload/Profiles/"));

                //BinaryReader b = new BinaryReader(file.InputStream);
                //Random rand = new Random();
                //int guid = rand.Next();
                //string ext = Path.GetExtension(file.FileName);
                //string phyiscalPath = Server.MapPath("/Upload/Profiles/" + guid.ToString() + ext.ToString());
                //Width = (Width == 0) ? GetImagenew.Width : Width;
                //Height = (Height == 0) ? GetImagenew.Height : Height;
                //Bitmap newBitmap = new Bitmap(Width, Height, PixelFormat.Format24bppRgb);
                //newBitmap = bitmap;
                //newBitmap.SetResolution(80, 80);
                //img = newBitmap.GetThumbnailImage(Width, Height, null, IntPtr.Zero);
                //EncoderParameter qualityParam =
                //   new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 60);
                //////Seting the format to save
                //ImageCodecInfo imageCodec = GetImageCoeInfo("image/jpeg");
                //////Used to contain the poarameters of the quality
                //EncoderParameters parameters = new EncoderParameters(1);
                //parameters.Param[0] = qualityParam;
                //////Used to save the image to a  given path
                //img.Save(phyiscalPath, imageCodec, parameters);
                ////file.SaveAs(phyiscalPath);

                //byte[] binData = b.ReadBytes(file.ContentLength);
                return JsonConvert.SerializeObject("/Upload/Profiles/" + guid.ToString() + ext.ToString());
            }
            else { return ""; }

        }

        public string GetUploadImage(string Image)
        {
            if (Image.Length > 6)
            {
                string ImageUrl = Base64ToImage(Image.Substring(22, Image.Length - 22));
                IList lstresult = _usersRepository.UploadUserImage(_userIdentityRepository.UserID, ImageUrl, ImageUrl);
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
            string phyiscalPath = Server.MapPath("/Upload/Profiles/" + guid.ToString() + ".jpg");

            using (Image image = System.Drawing.Image.FromStream(new MemoryStream(imageBytes)))
            {
                image.Save(phyiscalPath, System.Drawing.Imaging.ImageFormat.Jpeg);  // Or Png
                return "/Upload/Profiles/" + guid.ToString() + ".jpg";
            }
        }
        public string GetImage()
        {
            IList lstresult = _usersRepository.GetImage(_userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }
        public string SaveChangePassword(string OldPassword, string Password)
        {
            IList lstresult = _usersRepository.ChangePassword(OldPassword, Password, _userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }

        public string SaveUserDetails(UsersProfile UserProfileDetails)
        {
            DataTable dtUserProfileDetails = ToDataTable(UserProfileDetails);
            IList lstresult = _usersRepository.SaveUserDetails(dtUserProfileDetails, _userIdentityRepository.UserID);
            Session["UserName"] = UserProfileDetails.FirstName;
            Session["CompanyName"] = UserProfileDetails.CompanyName;
            return JsonConvert.SerializeObject(lstresult);
        }
        public string SaveIndividualUserDetails(IndividualUsersProfile UserProfileDetails)
        {
            DataTable dtUserProfileDetails = ToDataTable(UserProfileDetails);
            IList lstresult = _usersRepository.SaveIndividualUserDetails(dtUserProfileDetails, _userIdentityRepository.UserID);
            return JsonConvert.SerializeObject(lstresult);
        }

        public static DataTable ToDataTable(object o)
        {
            DataTable dt = new DataTable("OutputData");

            DataRow dr = dt.NewRow();
            dt.Rows.Add(dr);

            o.GetType().GetProperties().ToList().ForEach(f =>
            {
                f.GetValue(o, null);
                dt.Columns.Add(f.Name, f.PropertyType);
                dt.Rows[0][f.Name] = f.GetValue(o, null);
            });

            return dt;
        }
    }
}