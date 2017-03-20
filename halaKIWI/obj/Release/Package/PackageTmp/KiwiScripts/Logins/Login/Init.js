$(document).ready(function () {

    $(".gllpLatitude").val("38.01689374449758");
    $(".gllpLongitude").val("-95.99993930000005");
    $('#drag-and-drop-zone').dmUploader({
        url: '/Registration/GetUserList',
        dataType: 'json',
        allowedTypes: 'image/*',
        /*extFilter: 'jpg;png;gif',*/
        onInit: function () {
        },
        onBeforeUpload: function (id) {
            if (id > 0) {
            }
        },
        onNewFile: function (id, file) {
        },
        onComplete: function () {
        },
        onUploadProgress: function (id, percent) {


        },
        onUploadSuccess: function (id, data) {
            $(".gllpImage").val(data);
            document.getElementById("ItemPreview").src = "data:image/png;base64," + data;
        },
        onUploadError: function (id, message) {
        },
        onFileTypeError: function (file) {
        },
        onFileSizeError: function (file) {
        },
        /*onFileExtError: function(file){
          $.danidemo.addLog('#demo-debug', 'error', 'File \'' + file.name + '\' has a Not Allowed Extension');
        },*/
        onFallbackMode: function (message) {
            $.danidemo.addLog('#demo-debug', 'info', 'Browser not supported(do something else here!): ' + message);
        }
    });
    $.validator.setDefaults({ ignore: [] });


    //$("#frmLogin").validate({
    //    rules: {
    //        UserLogin: {
    //            required: true,
    //            minlength: 5
    //        },
    //        passwordLogin: {
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

    //$("#txtUserLogin").rules("add", { required: true, messages: { required: "Please Enter Signinname" } });
    //$("#txtPasswordLogin").rules("add", { required: true, messages: { required: "Please Enter Password" } });


    setTimeout(function () {
        $(".gllpLatlonPicker").each(function () {
            $(document).gMapsLatLonPicker().init($(this));
        });
    }, 1000);

    $("#registration").validate({
        rules: {
            name: {
                required: true  },
            email: {
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
            phoneno: {
                required: true,
                minlength: 9
            },
            companyname: {
                required: true
            },
            designation: {
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

    $("#txtName").rules("add", { required: true, messages: { required: "Please Enter Name" } });
    $("#txtEmailID").rules("add", { required: true, messages: { required: "Please Enter EmailID" } });
    $("#txtPhoneNo1").rules("add", { required: true, messages: { required: "Please Enter Phone No" } });
    $("#txtCompanyName").rules("add", { required: true, messages: { required: "Please Enter Company Name" } });
    $("#txtDesignation").rules("add", { required: true, messages: { required: "Please Enter Designation" } });
    $("#txtPassword").rules("add", { required: true, messages: { required: "Please Enter Password" } });
    $("#txtConfirmPassword").rules("add", { required: true, messages: { required: "Please Enter Confirm Password" } });

    $("#frmForgotPassword").validate({
        rules: {
            EmailID: {
                required: true,
                email: true,
                minlength: 5
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
    $("#txtforgotEmailID").rules("add", { required: true, messages: { required: "Please Enter EmailID" } });

});