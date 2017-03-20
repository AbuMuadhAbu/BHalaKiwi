$(document).ready(function () {

    $("#usrSubMenu").show();
    $("#mgOffer").removeClass("active");
    $("#mgGallery").removeClass("active");
    $("#mgOutlet").removeClass("active");
    $("#usrProfile").addClass("active");
    $("#usrCompanyDetails").removeClass("active");
    $("#usrChangePassword").addClass("active");
    
    $.validator.setDefaults({ ignore: [] });

    $("#frmChangePassword").validate({
        rules: {
            oldpassword: {
                required: true,
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

    $("#txtOldPassword").rules("add", { required: true, messages: { required: "Please Enter Old Password" } });
    $("#txtPassword").rules("add", { required: true, messages: { required: "Please Enter Password" } });
    $("#txtConfirmPassword").rules("add", { required: true, messages: { required: "Please Enter Confirm Password" } });

    //Callback("Users", "GetUserProfile", fnGetUserProfileSuccess, fail)
});