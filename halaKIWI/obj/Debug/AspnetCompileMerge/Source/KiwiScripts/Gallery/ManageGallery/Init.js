var basic;
var $w;
var $h;
var SelectedImage;
$(document).ready(function () {
    $("#usrSubMenu").hide();
    $("#usrChangePassword").removeClass("active");
    $("#mgOffer").removeClass("active");
    $("#mgGallery").removeClass("active");
    $("#mgOutlet").removeClass("active");
    $("#usrProfile").removeClass("active");
    $("#mgOffer").removeClass("active");
    $("#mgGallery").addClass("active");
    $("#btnUpdate").hide();


    //$("#frmmgGallery").validate({
    //    rules: {
    //        imagetitle: {
    //            required: true,
    //            minlength: 5
    //        },
    //        offerdescripton: {
    //            required: true,
    //            minlength: 5
    //        }
    //    },
    //    highlight: function (element) {
    //        element = $(element);
    //        if (element.parent().hasClass("k-widget")) {
    //            element.parent().addClass('input-validation-error');
    //        } else {
    //            element.addClass('input-validation-error')
    //        }
    //        $(element).closest('.form-group').addClass('has-error');
    //    },
    //    unhighlight: function (element) {
    //        element = $(element);
    //        if (element.parent().hasClass("k-widget")) {
    //            element.parent().removeClass('input-validation-error');
    //        } else {
    //            element.removeClass('input-validation-error')
    //        }
    //        $(element).closest('.form-group').removeClass('has-error');
    //    },
    //    errorElement: 'span',
    //    errorClass: 'help-block',
    //    errorPlacement: function (error, element) {
    //        if (element.parent('.input-group').length) {
    //            error.insertAfter(element.parent());
    //        } else {
    //            error.insertAfter(element);
    //        }
    //    }
    //});

    //$("#txtImageTitle").rules("add", { required: true, messages: { required: "Please Enter Image Title" } });
    //$("#txtOfferDescription").rules("add", { required: true, messages: { required: "Please Enter Offer Description" } });

    Callback("Gallery", "GetGalleryDetails", fnGetGalleryDetailsSuccess, fail)
});