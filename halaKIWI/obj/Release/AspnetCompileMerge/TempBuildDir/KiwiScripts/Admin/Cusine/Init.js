var glbCusineID = 0;
$(document).ready(function () {

    $.validator.setDefaults({ ignore: [] });

    $("#frmmgCusine").validate({
        rules: {
            Cusine: {
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

    $("#txtCusine").rules("add", { required: true, messages: { required: "Please Enter Cusine" } });

    Callback("Admin", "GetCusine", fnGetCusineSuccess, fail)
});