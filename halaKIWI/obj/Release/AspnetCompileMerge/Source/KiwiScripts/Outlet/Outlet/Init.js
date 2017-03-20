var updateuserid = 0;
var dtaTable;
//var map;
//function initMap() {
//    console.log('initMap')
//    map = new google.maps.Map($('.gllpMap'), {
//        center: { lat: -34.397, lng: 150.644 },
//        zoom: 8
//    });
//}

$(document).ready(function () {
    $("#usrProfile").removeClass("active");
    $("#usrChangePassword").removeClass("active");
    $("#mgOffer").removeClass("active");
    $("#mgGallery").removeClass("active");

    $("#mgOutlet").addClass("active");
    $("#usrSubMenu").hide();
    Callback("Outlet", "GetOutletList", fnGetOutletListSuccess, fail)

    //function geocodePosition() {
    //    console.log("geocodePosition() starting");
    //}

    //function watchGeocodePosition() {
    //    console.log("watchGeocodePosition() starting");
    //}

    //function onError(error) {
    //    console.log("error " + error.code);
    //}
    //function log(msg) {
    //    console.log(msg);
    //}

    //log("detectLocation() starting");
    //if (navigator.geolocation) {
    //    console.log("navigator.geolocation is supported");
    //    navigator.geolocation.getCurrentPosition(geocodePosition, onError, { timeout: 3000 });
    //    navigator.geolocation.watchPosition(watchGeocodePosition);
    //}
    //else {
    //    console.log("navigator.geolocation not supported");
    //}
    //setTimeout(function () {
    //    $(document).gMapsLatLonPicker().init($(".gllpLatlonPicker"));
    //}, 2000);

    $.validator.setDefaults({ ignore: [] });

    $("#registration").validate({
        rules: {
            OutletName: {
                required: true
            },
            EmailID: {
                required: true,
                email: true,
                minlength: 5
            },
            password: {
                required: true,
                minlength: 5
            },
            password_confirm: {
                required: true,
                minlength: 5,
                equalTo: "#txtPassword"
            },
            PhoneNo: {
                required: true,
                minlength: 9
            },
            CusineType: {
                required: true
            },
            BranchArea: {
                required: true
            },
            gps: {
                required: true
            }
        },
        //messages: {
        //    OutletName: {
        //        minlength: "Enter at least {0} characters"
        //    }
        //},
        highlight: function (element) {
            element = $(element);
            if (element.parent().hasClass("k-widget")) {
                element.parent().addClass('input-validation-error');
            } else {
                element.addClass('input-validation-error')
            }
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            element = $(element);
            if (element.parent().hasClass("k-widget")) {
                element.parent().removeClass('input-validation-error');
            } else {
                element.removeClass('input-validation-error')
            }
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $("#txtOutletName").rules("add", { required: true, messages: { required: "Please Enter Outlet Name" } });
    $("#txtEmailID").rules("add", { required: true, messages: { required: "Please Enter EmailID" } });
    $("#txtPhoneNo1").rules("add", { required: true, messages: { required: "Please Enter Phone No" } });
    $("#txtCusineType").rules("add", { required: true, messages: { required: "Please Select Cusine" } });
    $("#txtBranchArea").rules("add", { required: true, messages: { required: "Please Enter Branch Area" } });
    $("#txtPassword").rules("add", { required: true, messages: { required: "Please Enter Password" } });
    $("#txtConfirmPassword").rules("add", { required: true, messages: { required: "Please Enter Confirm Password" } });
    $("#frmupdateOutlet").validate({
        rules: {
            updateOutletName: {
                required: true
            },
            updateEmailID: {
                required: true,
                email: true,
                minlength: 5
            },
            updatepassword: {
                required: true,
                minlength: 5
            },
            updatepassword_confirm: {
                required: true,
                minlength: 5,
                equalTo: "#txtUpdatePassword"
            },
            updatePhoneNo: {
                required: true,
                minlength: 9
            },
            updateCusineType: {
                required: true
            },
            updateBranchArea: {
                required: true
            }
        },
        highlight: function (element) {
            element = $(element);
            if (element.parent().hasClass("k-widget")) {
                element.parent().addClass('input-validation-error');
            } else {
                element.addClass('input-validation-error')
            }
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            element = $(element);
            if (element.parent().hasClass("k-widget")) {
                element.parent().removeClass('input-validation-error');
            } else {
                element.removeClass('input-validation-error')
            }
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $("#txtUpdateOutletName").rules("add", { required: true, messages: { required: "Please Enter Outlet Name" } });
    $("#txtUpdateEmailID").rules("add", { required: true, messages: { required: "Please Enter EmailID" } });
    $("#txtUpdatePhoneNo1").rules("add", { required: true, messages: { required: "Please Enter Phone No" } });
    $("#txtUpdateCusineType").rules("add", { required: true, messages: { required: "Please Select Cusine" } });
    $("#txtUpdateBranchArea").rules("add", { required: true, messages: { required: "Please Enter Branch Area" } });
    $("#txtUpdatePassword").rules("add", { required: true, messages: { required: "Please Enter Password" } });
    $("#txtUpdateConfirmPassword").rules("add", { required: true, messages: { required: "Please Enter Confirm Password" } });

});