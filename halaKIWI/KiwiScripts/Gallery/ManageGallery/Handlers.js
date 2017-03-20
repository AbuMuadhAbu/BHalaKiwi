$(document).ready(function () {
    function saveCropImage(params) {
        jQuery.ajax({
            url: params['targetUrl'],
            cache: false,
            dataType: "html",
            data: {
                action: params['action'],
                t: 'ajax',
                image_name: params['image_name'],
                ImageTitle: $("#txtImageTitle").val(),
                OfferDescription: $("#txtOfferDescription").val(),
                GalleryID: params['GalleryID'],
                SaveType: params['type']
            },
            type: 'Post',
            // async:false,
            success: function (msg) {
                $("#demo-basic").empty();
                if ($.parseJSON(msg)[0].Success == 2) {
                    toastr.warning(msg[0].SuccessMessage);
                }
                else if ($.parseJSON(msg)[0].Success == 1) {
                    $("#txtImageTitle").val("");
                    $("#txtOfferDescription").val("");
                    $('#uploadimage-popup').modal('hide')
                    toastr.success($.parseJSON(msg)[0].SuccessMessage);
                }
                $("#demo-basic").empty();
                $('#uploadimage-popup').modal('hide')
                Callback("Gallery", "GetGalleryDetails", fnGetGalleryDetailsSuccess, fail);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('status Code:' + xhr.status + 'Error Message :' + thrownError);
            }
        });
    }



    $("#imageUploadForm").change(function () {
        $("#demo-basic").empty();
        var formData = new FormData();
        var totalFiles = document.getElementById("imageUploadForm").files.length;
        for (var i = 0; i < totalFiles; i++) {
            var file = document.getElementById("imageUploadForm").files[i];
            formData.append("imageUploadForm", file);
        }
        $.ajax({
            type: "POST",
            url: '/kiwi/gallery/Upload',
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (response) {
                $('#demo-basic').empty();
                $w = $('.basic-width');
                $h = $('.basic-height');
                basic = $('#demo-basic').croppie({
                    viewport: {
                        width: 400,
                        height: 200
                    },
                    boundary: {
                        width: 400,
                        height: 200
                    }
                });
                basic.croppie('bind', {
                    url: response
                });

                $(".gllpImage").val(response);
            },
            error: function (error) {
                alert("errror");
            }
        });
    });
    var form = $("#frmmgGallery");
    form.validate();

    $("#btnSave").click(function () {

        if ($('.gllpImage').val() == "") {
            toastr.error("Please Select the Image");
            return;
        }
        else if ($("#txtImageTitle").val() == "") {
            toastr.error("Please Enter Image Title");
            return;
        }
        else if ($("#txtOfferDescription").val() == "") {
            toastr.error("Please Enter Offer Description");
            return;
        }
        else {

            var w = parseInt($w.val(), 10),
                h = parseInt($h.val(), 10),
            size = 'viewport';
            if (w || h) {
                size = { width: w, height: h };
            }
            basic.croppie('result', {
                type: 'canvas',
                size: size
            }).then(function (resp) {
                params = {
                    targetUrl: '/kiwi/gallery/CropUploadImage',
                    action: 'save',
                    type: "Save",
                    GalleryID: 0,
                    image_name: resp
                };
                saveCropImage(params);
            });
        }
    });

    $("#btnUpdate").click(function () {

        if ($('.gllpImage') == "") {
            toastr.error("Please Select the Image");
            return;
        }
        else if ($("#txtImageTitle").val() == "") {
            toastr.error("Please Enter Image Title");
            return;
        }
        else if ($("#txtOfferDescription").val() == "") {
            toastr.error("Please Enter Offer Description");
            return;
        }
        else {

            var w = parseInt($w.val(), 10),
                h = parseInt($h.val(), 10),
            size = 'viewport';
            if (w || h) {
                size = { width: w, height: h };
            }
            basic.croppie('result', {
                type: 'canvas',
                size: size
            }).then(function (resp) {
                params = {
                    targetUrl: '/kiwi/gallery/CropUploadImage',
                    action: 'save',
                    type: "Update",
                    GalleryID: SelectedImage[0].GalleryID,
                    image_name: resp
                };
                saveCropImage(params);
            });
        }
    });
    $(".clsremove").click(function () {
        Callback("Gallery", "GetGalleryRemoveDetails", fnGetGalleryDetailsSuccess, fail, "GalleryID", SelectedImage[0].GalleryID)
        $(".clsremove").hide();
    })
    $(".create-icon").click(function () {
        $(".clsremove").hide();
        $("#txtImageTitle").val("");
        $("#txtOfferDescription").val("");
        $("#demo-basic").empty();
        $("#imageUploadForm").val('');
    })
    
})