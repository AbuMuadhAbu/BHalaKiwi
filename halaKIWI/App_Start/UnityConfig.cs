using System.Web.Mvc;
using Microsoft.Practices.Unity;
using Unity.Mvc5;
using halaKIWI.Repository;

namespace halaKIWI
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<IUsersRepository, UsersRepository>();
            container.RegisterType<IRegisterRepository, RegisterRepository>();
            container.RegisterType<IOutletoldRepository, OutletoldRepository>();
            container.RegisterType<IOutletRepository, OutletRepository>();
            container.RegisterType<IUserIdentityRepository, UserIdentityRepository>();
            container.RegisterType<ILoginsRepository, LoginsRepository>();
            container.RegisterType<IGalleryRepository, GalleryRepository>();
            container.RegisterType<IOfferRepository, OfferRepository>();
            container.RegisterType<IAdminRepository, AdminRepository>();
            container.RegisterType<IMailTriggerRepository, MailTriggerRepository>();
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }
    }
}