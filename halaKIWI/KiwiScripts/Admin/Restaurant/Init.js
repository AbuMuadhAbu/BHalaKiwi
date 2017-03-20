var newuserid;
$(document).ready(function () {
    $("#dvOutlet").hide();
    $("#dvOutlets").hide();
    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });
    Callback("Admin", "AdminGetActiveRestaurant", fnGetActiveRestaurantSuccess, fail)
});