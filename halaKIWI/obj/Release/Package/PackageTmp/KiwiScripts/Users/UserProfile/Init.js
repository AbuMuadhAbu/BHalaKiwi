var basic;
var $w;
var $h;
$(document).ready(function () {
    $("#usrSubMenu").show();
    $("#usrChangePassword").removeClass("active");
    $("#mgOffer").removeClass("active");
    $("#mgGallery").removeClass("active");
    $("#mgOutlet").removeClass("active");
    $("#usrCompanyDetails").addClass("active");
    $("#usrChangePassword").removeClass("active");
    $("#usrProfile").addClass("active");
    $("#savesection").hide();

    $("#hideIndsavesection").hide();
    Callback("Users", "GetImage", fnGetUploadImageSuccess, fail);

    Callback("Outlet", "GetCusine", fnGetCusineSuccess, fail)
    if ($("#txtRole").val() == 2) {
        $("#frmmgUsrProfile").validate({
            rules: {
                outlCompanyName: {
                    required: true
                },
                outlEmailID: {
                    required: true,
                    email: true,
                    minlength: 5
                },
                outlFirstName: {
                    required: true
                },
                outlLastName: {
                    required: true
                },
                outlPhone: {
                    required: true,
                    minlength: 9
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

        $("#txtCompanyName").rules("add", { required: true, messages: { required: "Please Enter Company Name" } });
        $("#txtEmailID").rules("add", { required: true, messages: { required: "Please Enter EmailID" } });
        $("#txtFirstName").rules("add", { required: true, messages: { required: "Please Enter First Name" } });
        $("#txtLastName").rules("add", { required: true, messages: { required: "Please Enter Last Name" } });
        $("#txtCompanyPhoneNo").rules("add", { required: true, messages: { required: "Please Enter Phone No" } });
    }
    else {

        $("#frmmgUsrIndividualProfile").validate({
            rules: {
                indOutletName: {
                    required: true
                },
                indEmailID: {
                    required: true,
                    email: true,
                    minlength: 5
                },
                indRestaurantName: {
                    required: true
                },
                indCusineType: {
                    required: true
                },
                indPhoneNo: {
                    required: true,
                    minlength: 9
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

        $("#txtOutletName").rules("add", { required: true, messages: { required: "Please Enter Outlet Name" } });
        $("#txtIndividualEmailID").rules("add", { required: true, messages: { required: "Please Enter EmailID" } });
        $("#txtRestaurantName").rules("add", { required: true, messages: { required: "Please Enter Restaurant Name" } });
        $("#txtCusineType").rules("add", { required: true, messages: { required: "Please Select Cusine Type" } });
        $("#txtIndividualPhoneNo").rules("add", { required: true, messages: { required: "Please Enter Phone No" } });
    }
});