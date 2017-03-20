using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace halaKIWI.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Signin Name is required")]
        [Display(Name = "Signin Name")]
        public string SigninName { get; set; }
        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        public string ErrorMsg { get; set; }
        public bool RememberMe { get; set; }
    }

    public class User
    {
        public int UserId { get; set; }
        public int RoleID { get; set; }
        public string ScreenName { get; set; }
        public string UserName { get; set; }
        public string CompanyName { get; set; }
        public string Password { get; set; }
        public string Roles { get; set; }
    }

    //public class User
    //{
    //    public int UserId { get; set; }
    //    public string UserName { get; set; }
    //    public string Password { get; set; }
    //    public string UserEmailAddress { get; set; }

    //    public virtual ICollection<Role> UserRoles { get; set; }
    //}

    public class Role
    {
        public short RoleId { get; set; }
        public string RoleName { get; set; }
        public string RoleDescription { get; set; }
    }

    public class UserRole
    {
        public int UserRoleId { get; set; }
        public int UserId { get; set; }
        public short RoleId { get; set; }

        public virtual Role Role { get; set; }
    }
}