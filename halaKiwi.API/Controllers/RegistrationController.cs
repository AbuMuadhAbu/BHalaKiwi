using halaKiwi.API.Models;
using halaKiwi.API.Repository;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace halaKiwi.API.Controllers
{

    [RoutePrefix("HalaKiwi")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RegistrationController : ApiController
    {

        private readonly IRegisterRepository _RegisterRepository;

        public RegistrationController(IRegisterRepository RegisterRepository)
        {
            this._RegisterRepository = RegisterRepository;
        }
        [Route("Register")]
        [HttpPost]
        public IList GetRegister(RegistrationModel Register)
        {
            IList UserID = _RegisterRepository.GetUserList(Register.Name, Register.EmailID, Register.Age, Register.Password, Register.UserPic);
            return UserID;
        }
        [Route("Login/{EmailID}/{Password}")]
        [HttpGet]
        public IList GetLogin(string EmailID, string Password)
        {
            IList UserID = _RegisterRepository.GetLoginDetails(EmailID, Password);
            return UserID;
        }
        [Route("ChangePassword/{OldPassword}/{Password}/{UserID}")]
        [HttpGet]
        public IList GetChangePassword(string OldPassword, string Password, int UserID)
        {
            IList User = _RegisterRepository.ChangePassword(OldPassword, Password, UserID);
            return User;
        }
        [Route("UserProfile/{UserID}")]
        [HttpGet]
        public IList GetUserProfile(string UserID)
        {
            IList UserDetail = _RegisterRepository.GetUserProfile(UserID);
            return UserDetail;
        }

        [Route("RegisterSocialMedia/{Name}/{EmailID}/{SocialType}")]
        [HttpGet]
        public IList GetRegisterSocialMedia(string Name, string EmailID, string SocialType)
        {
            IList RegisterSocialMedia = _RegisterRepository.RegisterSocialMedia(Name, EmailID, SocialType);
            return RegisterSocialMedia;
        }

        [Route("OfferList/{Lattitude}/{Longitude}/{UserID}")]
        [HttpGet]
        public IList GetOfferList(string Lattitude, string Longitude, string UserID)
        {
            IList OfferList = _RegisterRepository.GetOfferList(Lattitude, Longitude, UserID);
            return OfferList;
        }


        [Route("FilterOfferList/{Lattitude}/{Longitude}/{UserID}/{FilterType}")]
        [HttpGet]
        public IList GetFilterOfferList(string Lattitude, string Longitude, string UserID,string FilterType)
        {
            IList OfferList = _RegisterRepository.GetFilterOfferList(Lattitude, Longitude, UserID, FilterType);
            return OfferList;
        }

        [Route("SaveUserLocation/{Lattitude}/{Longitude}/{UserID}")]
        [HttpGet]
        public IList GetSaveUserLocation(string Lattitude, string Longitude, string UserID)
        {
            IList OfferList = _RegisterRepository.GetSaveUserLocation(Lattitude, Longitude, UserID);
            return OfferList;
        }
        [Route("StoreLocationRange/{UserID}/{Range}")]
        [HttpGet]
        public IList StoreLocationRange(string UserID, string Range)
        {
            IList OfferList = _RegisterRepository.StoreLocationRange(UserID, Range);
            return OfferList;
        }
        [Route("Cusine/{UserID}")]
        [HttpGet]
        public IList GetCusine(string UserID)
        {
            IList Cusine = _RegisterRepository.GetCusine(UserID);
            return Cusine;
        }
        [Route("UpdateUserCusine/{UserID}/{CusineID}/{IsActive}")]
        [HttpGet]
        public IList GetUpdateUserCusine(string UserID,string CusineID,string IsActive)
        {
            IList UserDetail = _RegisterRepository.GetUpdateUserCusine(UserID, CusineID, IsActive);
            return UserDetail;
        }

        [Route("WhistListOffer/{UserID}/{OfferID}")]
        [HttpGet]
        public IList GetSaveOfferWhistlist(string UserID, string OfferID)
        {
            IList UserDetail = _RegisterRepository.GetSaveOfferWhistlist(UserID, OfferID);
            return UserDetail;
        }

        [Route("UnSelectWhistListOffer/{UserID}/{OfferID}/{WhishListStatus}")]
        [HttpGet]
        public IList GetUnSelectWhistlist(string UserID, string OfferID,string WhishListStatus)
        {
            IList UserDetail = _RegisterRepository.GetUnSelectWhistlist(UserID, OfferID, WhishListStatus);
            return UserDetail;
        }

        [Route("ClaimOffer/{UserID}/{OfferID}")]
        [HttpGet]
        public IList GetSaveOfferClaim(string UserID, string OfferID)
        {
            IList UserDetail = _RegisterRepository.GetSaveOfferClaim(UserID, OfferID);
            return UserDetail;
        }

        [Route("WhistListOffer/{UserID}")]
        [HttpGet]
        public IList GetOfferWhistlist(string UserID)
        {
            IList UserDetail = _RegisterRepository.GetOfferWhistlist(UserID);
            return UserDetail;
        }

        [Route("ClaimOffer/{UserID}")]
        [HttpGet]
        public IList GetOfferClaim(string UserID)
        {
            IList UserDetail = _RegisterRepository.GetOfferClaim(UserID);
            return UserDetail;
        }

        [Route("ForgotPassword/{EmailID}")]
        [HttpGet]
        public IList GetForgotPassword(string EmailID)
        {
            IList UserDetail = _RegisterRepository.GetForgotPassword(EmailID);
            return UserDetail;
        }

        [Route("UserGPSRange/{UserID}")]
        [HttpGet]
        public IList GetUserGPSRange(string UserID)
        {
            IList UserDetail = _RegisterRepository.GetUserGPSRange(UserID);
            return UserDetail;
        }
        [Route("OfferListDetail/{OfferID}/{UserID}")]
        [HttpGet]
        public IList GetOfferListDetails(string OfferID, string UserID)
        {
            IList UserDetail = _RegisterRepository.GetOfferListDetails(OfferID, UserID);
            return UserDetail;
        }
        [Route("OfferDetail/{Lattitude}/{Longitude}/{OfferID}/{UserID}")]
        [HttpGet]
        public IList GetOfferDetails(string Lattitude,string Longitude,string OfferID, string UserID)
        {
            IList UserDetail = _RegisterRepository.GetOfferDetails(Lattitude,Longitude,OfferID, UserID);
            return UserDetail;
        }
    }
}
