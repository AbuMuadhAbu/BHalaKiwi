using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace halaKIWI
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region Common CSS
            bundles.Add(new StyleBundle("~/content/css/bootstrap/bootstrapcss").Include(
                "~/Content/css/bootstrap/bootstrap.min.css",
                "~/Content/css/bootstrap/font-awesome.css",
                "~/Content/css/bootstrap/bootstrap-multiselect.css",
                "~/Content/css/bootstrap/datepicker.css",
                "~/Content/css/toastr/toastr.css"));

            bundles.Add(new StyleBundle("~/content/css/layoutcss").Include(
                //"~/Content/css/Tour/introjs.css",
                //"~/Content/css/reset.css",
                "~/Content/css/style.css",
                "~/Content/css/jquery.dataTables.min.css"));

            bundles.Add(new StyleBundle("~/Content/css/kendoui/kendocss").Include(
             "~/Content/css/kendoui/kendo.common.min.css",
             "~/Content/css/kendoui/kendo.default.min.css",
             "~/Content/css/kendoui/kendo.common-material.min.css",
             "~/Content/css/kendoui/kendo.material.min.css",
             "~/Content/css/kendoui/kendo.material.mobile.min.css",
             "~/Content/css/kendoui/kendo.dataviz.default.min.css",
             "~/Content/css/KendochartCSS/kendo.dataviz.min.css"));
            #endregion

            #region Common JS

            bundles.Add(new ScriptBundle("~/content/js/layoutjs").Include(
                "~/Content/js/toastr/toastr.js",
                "~/Content/js/jquery/jquery-migrate.js",
                "~/Content/js/jquery/jquery-ui.js",
                "~/Content/js/bootstrap/bootstrap.min.js",
                "~/Content/js/bootstrap/bootstrap-multiselect.js",
                "~/Content/js/bootstrap/bootstrap-typeahead.js",
                "~/Content/js/bootstrap/bootstrap-datepicker.js",
                "~/Content/js/jquery/scriptbreaker-multiple-accordion-1.js",
                "~/Content/js/jquery/bootbox.min.js",
                "~/Content/js/jquery/jquery.shortcut.js",
                 "~/Content/js/jquery/jquery.placeholder.js",
                "~/Content/js/Tour/intro.js",
                 "~/Content/js/kendoui/kendo.web.min.js",
                 "~/Content/js/kendoui/kendo.culture.en-GB.min.js"
                ));
            bundles.Add(new ScriptBundle("~/Content/js/validatejs").Include(
                  "~/Content/js/jquery/validation/jquery.validate.min.js"
                ));
            bundles.Add(new ScriptBundle("~/content/js/Commonjs").Include(
               "~/Content/js/common.js",
               "~/Content/js/jquery.dataTables.min.js",
               "~/Content/js/jquery/jquery.blockUI.js"
               ));

            bundles.Add(new ScriptBundle("~/content/js/jquery/slimscroll/slimscrolljs").Include(
                "~/Content/js/jquery/slimscroll/jquery.slimscroll.js"));


            bundles.Add(new ScriptBundle("~/content/js/jquery/sortable/sortablejs").Include(
                "~/Content/js/jquery/sortable/sortable.js",
                "~/Content/js/jquery/sortable/sortable-animate.js"));

            bundles.Add(new ScriptBundle("~/Content/js/kendoui/kendojs").Include(
                 "~/Content/js/KendochartJs/jszip.min.js",
                 "~/Content/js/KendochartJs/kendo.all.min.js",
                 "~/Content/js/KendochartJs/kendo.pdf.min.js"));



            bundles.Add(new ScriptBundle("~/Content/js/jquery/datatablejs").Include(
             "~/Content/js/jquery/jquery.dataTables.js",
             "~/Content/js/bootstrap/dataTable-bootstrap.js",
             "~/Content/js/jquery/ZeroClipboard.js",
             "~/Content/js/jquery/TableTools.js",
              "~/Content/js/bootstrap/DataTableCurrency.js"));

            #endregion

            bundles.Add(new ScriptBundle("~/KiwiScripts/Outletjs").Include(
               "~/KiwiScripts/Outlet/Outlet/Init.js",
               "~/KiwiScripts/Outlet/Outlet/Handlers.js",

               "~/KiwiScripts/Outlet/Outlet/Functions.js"
               ));
            bundles.Add(new ScriptBundle("~/KiwiScripts/Loginjs").Include(
               "~/KiwiScripts/Logins/Login/Init.js",
               "~/KiwiScripts/Logins/Login/Handlers.js",
               "~/KiwiScripts/Logins/Login/Functions.js"
               ));
            bundles.Add(new ScriptBundle("~/KiwiScripts/Registrationjs").Include(

               "~/KiwiScripts/Logins/Registration/Functions.js",
               "~/KiwiScripts/Logins/Registration/Handlers.js",
               "~/KiwiScripts/Logins/Registration/Init.js"
               ));

            bundles.Add(new ScriptBundle("~/KiwiScripts/UserProfilejs").Include(
               "~/KiwiScripts/Users/UserProfile/Init.js",
               "~/KiwiScripts/Users/UserProfile/Handlers.js",
               "~/KiwiScripts/Users/UserProfile/Functions.js"
               ));
            bundles.Add(new ScriptBundle("~/KiwiScripts/ChangePasswordjs").Include(
               "~/KiwiScripts/Users/ChangePassword/Init.js",
               "~/KiwiScripts/Users/ChangePassword/Handlers.js",
               "~/KiwiScripts/Users/ChangePassword/Functions.js"
               ));
            bundles.Add(new ScriptBundle("~/KiwiScripts/ManageGalleryjs").Include(
               "~/KiwiScripts/Gallery/ManageGallery/Init.js",
               "~/KiwiScripts/Gallery/ManageGallery/Handlers.js",
               "~/KiwiScripts/Gallery/ManageGallery/Functions.js"
               ));

            bundles.Add(new ScriptBundle("~/KiwiScripts/GManageGalleryjs").Include(
               "~/KiwiScripts/GGallery/ManageGallery/Init.js",
               "~/KiwiScripts/GGallery/ManageGallery/Handlers.js",
               "~/KiwiScripts/GGallery/ManageGallery/Functions.js"
               ));

            bundles.Add(new ScriptBundle("~/KiwiScripts/ManageOfferjs").Include(
                "~/KiwiScripts/Offer/ManageOffer/Init.js",
                "~/KiwiScripts/Offer/ManageOffer/Handlers.js",
                "~/KiwiScripts/Offer/ManageOffer/Functions.js"
                ));

            bundles.Add(new ScriptBundle("~/KiwiScripts/AdminRestaurantjs").Include(
                "~/KiwiScripts/Admin/Restaurant/Init.js",
                "~/KiwiScripts/Admin/Restaurant/Handlers.js",
                "~/KiwiScripts/Admin/Restaurant/Functions.js"
                ));

            bundles.Add(new ScriptBundle("~/KiwiScripts/AdminInactiveRestaurantjs").Include(
                "~/KiwiScripts/Admin/RestaurantInactive/Init.js",
                "~/KiwiScripts/Admin/RestaurantInactive/Handlers.js",
                "~/KiwiScripts/Admin/RestaurantInactive/Functions.js"
                ));
            bundles.Add(new ScriptBundle("~/KiwiScripts/AdminDashboardjs").Include(
                "~/KiwiScripts/Admin/Dashboard/Init.js",
                "~/KiwiScripts/Admin/Dashboard/Handlers.js",
                "~/KiwiScripts/Admin/Dashboard/Functions.js"
                ));


            bundles.Add(new ScriptBundle("~/KiwiScripts/AdminOutletjs").Include(
                "~/KiwiScripts/Admin/Admin/Init.js",
                "~/KiwiScripts/Admin/Admin/Handlers.js",
                "~/KiwiScripts/Admin/Admin/Functions.js"
                ));
            bundles.Add(new ScriptBundle("~/KiwiScripts/AdminGeneralUserjs").Include(
                "~/KiwiScripts/Admin/GeneralUser/Init.js",
                "~/KiwiScripts/Admin/GeneralUser/Handlers.js",
                "~/KiwiScripts/Admin/GeneralUser/Functions.js"
                ));
            bundles.Add(new ScriptBundle("~/KiwiScripts/AdminSummaryjs").Include(
                "~/KiwiScripts/Admin/Summary/Init.js",
                "~/KiwiScripts/Admin/Summary/Handlers.js",
                "~/KiwiScripts/Admin/Summary/Functions.js"
                ));
            bundles.Add(new ScriptBundle("~/KiwiScripts/AdminCusinejs").Include(
                "~/KiwiScripts/Admin/Cusine/Init.js",
                "~/KiwiScripts/Admin/Cusine/Handlers.js",
                "~/KiwiScripts/Admin/Cusine/Functions.js"
                ));
        }
    }
}