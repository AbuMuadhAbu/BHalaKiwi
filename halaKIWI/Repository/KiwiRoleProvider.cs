using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace halaKIWI.Repository
{
    public class KiwiRoleProvider : RoleProvider
    {
        private RoleProviderRepository roleRepository;
        private string _RoleID;

        public KiwiRoleProvider()
        {
            this.roleRepository = new RoleProviderRepository();

        }


        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override string ApplicationName
        {
            get
            {
                return _RoleID;
            }
            set
            {
                value = _RoleID;
            }
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }

        public override string[] GetRolesForUser(string username)
        {
            if (username != "")
            {
                return this.roleRepository.GetEmployeeScreens(username);
            }
            else
            {
                return new[] { "" };
            }
            //throw new NotImplementedException();
        }

        //public override string[] GetRolesForUser(string username)
        //{
        //    //if (username != "")
        //    //{
        //    //    return this._userIdentityRepository.GetUserScreens(username);
        //    //}
        //    //else
        //    //{
        //    //    return new[] { "" };
        //    //}
        //    //if (username == "rajesh.pn")
        //    //{
        //    //    List<string> screen = new List<string>();
        //    //    screen.Add("CreateQueue");
        //    //    screen.Add("EditQueue");
        //    //    return screen.ToArray();
        //    //}
        //    //else
        //    //{
        //    //    return new[] { "" };
        //    //}
        //}

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool IsUserInRole(string username, string roleName)
        {
            throw new NotImplementedException();
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }
    }
}