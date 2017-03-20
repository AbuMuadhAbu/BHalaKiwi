using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Collections;

namespace halaKIWI.Repository
{
    public interface IGalleryRepository
    {
        IList GetGalleryDetails(int UserID);
        IList GetGalleryRemoveDetails(string GalleryID,int UserID);
        IList SaveGalleryDetails(string ImageTitle, string OfferDescription, string Image, string ImagePath, int UserID);
        IList UpdateGalleryDetails(string GalleryID, string ImageTitle, string OfferDescription, string Image, string ImagePath, int UserID);
    }
    public class GalleryRepository : IGalleryRepository
    {
        private SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["KiwiConnectionString"].ToString());
        public IList GetGalleryDetails(int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetGalleryDetails", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetGalleryRemoveDetails(string GalleryID, int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            param.Add("@pGalleryID", GalleryID);
            var multi = con.Query<dynamic>("spKiwi_GetGalleryRemoveDetails", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList SaveGalleryDetails(string ImageTitle, string OfferDescription, string Image, string ImagePath, int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pImageTitle", ImageTitle);
            param.Add("@pOfferDescription", OfferDescription);
            param.Add("@pImage", Image);
            param.Add("@pUserID", UserID);
            param.Add("@pImagePath", ImagePath);
            var multi = con.Query<dynamic>("spKiwi_SaveGalleryDetails", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList UpdateGalleryDetails(string GalleryID,string ImageTitle, string OfferDescription, string Image, string ImagePath, int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pImageTitle", ImageTitle);
            param.Add("@pOfferDescription", OfferDescription);
            param.Add("@pImage", Image);
            param.Add("@pUserID", UserID);
            param.Add("@pImagePath", ImagePath);
            param.Add("@pGalleryID", GalleryID);
            var multi = con.Query<dynamic>("spKiwi_UpdateGalleryDetails", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
    }
}