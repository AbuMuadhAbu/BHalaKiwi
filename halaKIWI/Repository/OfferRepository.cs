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
using halaKIWI.Models;

namespace halaKIWI.Repository
{
    public interface IOfferRepository
    {
        IList GetGalleryDetails(int UserID);
        IList GetOutlets(int UserID);
        IList GetOfferList(int UserID, string Outlet, string OfferStatus);
        IList GetOfferDetail(string OfferID);
        IList DisableOfferList(string OfferID);
        
        IList SaveOffers(DataTable dtOutLetIDs, OfferModel offerModel, int UserID);
        IList UpdateOffers(Int32 OfferID, string OfferName,string StartDate,string EndDate,string OfferCost,string OfferDescription,int IsDelivery, int UserID);
    }
    public class OfferRepository : IOfferRepository
    {
        private SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["KiwiConnectionString"].ToString());
        public IList SaveOffers(DataTable dtOutLetIDs, OfferModel offerModel, int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pOfferName", offerModel.OfferName);
            param.Add("@pOrderAvailable", offerModel.OrderAvailable);
            param.Add("@pOfferCost", offerModel.OfferCost);
            param.Add("@pStartDate", offerModel.StartDate);
            param.Add("@pEndDate", offerModel.EndDate);
            param.Add("@pOfferDescription", offerModel.OfferDescription);
            param.Add("@pIsDelivery", offerModel.IsDelivery);
            param.Add("@pGalleryID", offerModel.GalleryID);
            param.Add("@pUserID", UserID);
            param.Add("@pUserDetails", dtOutLetIDs.AsTableValuedParameter());
            var multi = con.Query<dynamic>("spKiwi_SaveOffers", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList UpdateOffers(Int32 OfferID, string OfferName, string StartDate, string EndDate, string OfferCost, string OfferDescription,int IsDelivery, int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pOfferName", OfferName);
            param.Add("@pOfferCost", OfferCost);
            param.Add("@pStartDate", StartDate);
            param.Add("@pEndDate", EndDate);
            param.Add("@pOfferDescription", OfferDescription);
            param.Add("@pIsDelivery", IsDelivery);
            param.Add("@pOfferID", OfferID);
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_UpdateOffers", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetOutlets(int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetOutlets", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetOfferList(int UserID, string Outlet, string OfferStatus)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            param.Add("@pOutletID", Outlet);
            param.Add("@pOfferStatus", OfferStatus);
            var multi = con.Query<dynamic>("spKiwi_GetOfferList", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList GetOfferDetail(string OfferID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pOfferID", OfferID);
            var multi = con.Query<dynamic>("spKiwi_GetOfferDetail", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
        public IList DisableOfferList(string OfferID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pOfferID", OfferID);
            var multi = con.Query<dynamic>("spKiwi_DisableOfferList", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }   

        public IList GetGalleryDetails(int UserID)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@pUserID", UserID);
            var multi = con.Query<dynamic>("spKiwi_GetGalleryDetails", param, commandType: CommandType.StoredProcedure);
            return multi.ToList();
        }
    }
}