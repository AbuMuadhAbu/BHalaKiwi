$(document).ready(function () {
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
            $(".gllpImage").val(data[0].image);
            document.getElementById("ItemPreview").src = "data:image/png;base64," + data[0].image;
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

    $(".gllpLatitude").val("38.01689374449758");
    $(".gllpLongitude").val("-95.99993930000005");
    setTimeout(function () {
        $(".gllpLatlonPicker").each(function () {
            $(document).gMapsLatLonPicker().init($(this));
        });
    }, 1000);
    $.validator.setDefaults({ ignore: [] });

    $('#frmLogin').validate({
        rules: {
            Password: {
                required: true
            },
            EmailID: {
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

});