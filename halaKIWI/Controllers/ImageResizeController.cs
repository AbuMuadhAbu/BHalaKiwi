using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace halaKIWI.Controllers
{
    public class ImageResizeController : Controller
    {
        // GET: ImageResize
        public ActionResult Image()
        {
            return View();
        }
        public string SaveImageResize(string Ia)
        {
            string a = Base64ToImage(Ia.Substring(22, Ia.Length - 22));
            return "";
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
                return "";
            }
        }
    }
}