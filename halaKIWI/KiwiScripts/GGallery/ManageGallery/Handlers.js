$(document).ready(function () {

    jQuery('#photoimg').on('change', function () {
        jQuery("#preview-avatar-profile").html('');
        jQuery("#preview-avatar-profile").html('Uploading....');
        jQuery("#cropimage").ajaxForm(
        {
            target: '#preview-avatar-profile',
            success: function () {
                jQuery('img#photo').imgAreaSelect({
                    aspectRatio: '1:1',
                    onSelectEnd: getSizes,
                });
                jQuery('#image_name').val(jQuery('#photo').attr('file-name'));
                function SelectCropArea(c) {
                    $('#hdn-x1-axis').val(parseInt(c.x));
                    $('#hdn-y1-axis').val(parseInt(c.y));
                    $('#hdn-x2-axis').val(parseInt(c.w));
                    $('#hdn-y2-axis%>').val(parseInt(c.h));
                }
                $('#preview-avatar-profile').Jcrop({
                    onSelect: SelectCropArea
                });
            }

        }).submit();

    });
    jQuery('#btn-crop').on('click', function (e) {
        e.preventDefault();
        params = {
            targetUrl: 'profile.php?action=save',
            action: 'save',
            x_axis: jQuery('#hdn-x1-axis').val(),
            y_axis: jQuery('#hdn-y1-axis').val(),
            x2_axis: jQuery('#hdn-x2-axis').val(),
            y2_axis: jQuery('#hdn-y2-axis').val()
        };

        saveCropImage(params);
    });



    function getSizes(img, obj) {
        var x_axis = obj.x1;
        var x2_axis = obj.x2;
        var y_axis = obj.y1;
        var y2_axis = obj.y2;
        var thumb_width = obj.width;
        var thumb_height = obj.height;
        if (thumb_width > 0) {

            jQuery('#hdn-x1-axis').val(x_axis);
            jQuery('#hdn-y1-axis').val(y_axis);
            jQuery('#hdn-x2-axis').val(x2_axis);
            jQuery('#hdn-y2-axis').val(y2_axis);
            jQuery('#hdn-thumb-width').val(thumb_width);
            jQuery('#hdn-thumb-height').val(thumb_height);

        }
        else
            alert("Please select portion..!");
    }

    function saveCropImage(params) {
        jQuery.ajax({
            url: params['targetUrl'],
            cache: false,
            dataType: "html",
            data: {
                action: params['action'],
                id: jQuery('#hdn-profile-id').val(),
                t: 'ajax',
                w1: params['thumb_width'],
                x1: params['x_axis'],
                h1: params['thumb_height'],
                y1: params['y_axis'],
                x2: params['x2_axis'],
                y2: params['y2_axis'],
                image_name: jQuery('#image_name').val(),
                ImageTitle: $("#txtImageTitle").val(),
                OfferDescription: $("#txtOfferDescription").val()
            },
            type: 'Post',
            // async:false,
            success: function (msg) {

                if ($.parseJSON(msg)[0].Success == 2) {
                    toastr.warning(msg[0].SuccessMessage);
                }
                else if ($.parseJSON(msg)[0].Success == 1) {
                    $("#txtImageTitle").val("");
                    $("#txtOfferDescription").val("");

                    $('#uploadimage-popup').modal('hide')

                    toastr.success($.parseJSON(msg)[0].SuccessMessage);
                }
                $("#preview-avatar-profile").empty();
                $('#uploadimage-popup').modal('hide')
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('status Code:' + xhr.status + 'Error Message :' + thrownError);
            }
        });
    }


    $("#imageUploadForm").change(function () {
        var formData = new FormData();
        var totalFiles = document.getElementById("imageUploadForm").files.length;
        for (var i = 0; i < totalFiles; i++) {
            var file = document.getElementById("imageUploadForm").files[i];
            formData.append("imageUploadForm", file);
        }
        $.ajax({
            type: "POST",
            url: '/Gallery/Upload',
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (response) {
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
        params = {
            targetUrl: '/gallery/CropUploadImage',
            action: 'save',
            x_axis: jQuery('#hdn-x1-axis').val(),
            y_axis: jQuery('#hdn-y1-axis').val(),
            x2_axis: jQuery('#hdn-x2-axis').val(),
            y2_axis: jQuery('#hdn-y2-axis').val(),
            thumb_width: jQuery('#hdn-thumb-width').val(),
            thumb_height: jQuery('#hdn-thumb-height').val()
        };
        if (jQuery('#image_name').val() == "") {
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

            saveCropImage(params);
        }//if (form.valid()) {
        //    if ($(".gllpImage").val() !== '') { 
        //        var GalleryDetails = new Object();
        //        GalleryDetails.ImageTitle = $("#txtImageTitle").val();
        //        GalleryDetails.OfferDescription = $("#txtOfferDescription").val();
        //        GalleryDetails.Image = $(".gllpImage").val();

        //        stringifyCallback("Gallery", "SaveGalleryDetails", fn_SaveUserDetailsSuccess, fn_Failure, "GalleryDetails",
        //                      JSON.stringify(GalleryDetails));
        //    }
        //    else {
        //        toastr.error('Please Select Image');
        //    }
        //}
    });
    //$("#btnSave").click(function () {

    //    //var UserProfileDetails = {
    //    //    EmployeeCode: $("#txtEmployeeCode").val(),
    //    //    Idea: $("#txtIdea").val(),
    //    //    LocationName: "Testlocation",
    //    //    IPConfig: "TestIP",
    //    //    DeviceType: "TestDevicename"
    //    //}

    //    var UserProfileDetails = new Object();
    //    UserProfileDetails.CompanyName = $("#txtCompanyName").val();
    //    UserProfileDetails.EmailID = $("#txtEmailID").val();
    //    UserProfileDetails.FirstName = $("#txtFirstName").val();
    //    UserProfileDetails.LastName = $("#txtLastName").val();
    //    UserProfileDetails.Designation = $("#txtDesignation").val();
    //    UserProfileDetails.CompanyPhoneNo = $("#txtCompanyPhoneNo").val();
    //    UserProfileDetails.CompanyAddress1 = $("#txtAddress1").val();
    //    UserProfileDetails.CompanyAddress2 = $("#txtAddress2").val();
    //    UserProfileDetails.City = $("#txtCity").val();
    //    UserProfileDetails.ZipCode = $("#txtZipCode").val();
    //    UserProfileDetails.CompanyDescription = $("#txtCompnayDescription").val();

    //    stringifyCallback("Users", "SaveUserDetails", fn_SaveUserDetailsSuccess, fn_Failure, "UserProfileDetails",
    //              JSON.stringify(UserProfileDetails));
    //});
})