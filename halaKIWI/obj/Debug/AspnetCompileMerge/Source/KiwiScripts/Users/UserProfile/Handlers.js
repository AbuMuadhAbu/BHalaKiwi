$(document).ready(function () {
    $("#btnEdit").click(function () {
        $("#savesection").show();
        $(".disabled").attr('disabled', false);
    })
    $("#btnIndEdit").click(function () {
        $("#hideIndsavesection").show();
        $('#txtCusineType').multiselect('enable');
        $(".disabled").attr('disabled', false);
        $("#txtRestaurantName").attr('disabled', true);
        $("#txtOutletName").attr('disabled', true);
    })

    $("#btnClear").click(function () {
        $("#savesection").hide();
        $(".disabled").attr('disabled', true);
        Callback("Outlet", "GetCusine", fnGetCusineSuccess, fail)
    })
    $("#btnIndClear").click(function () {
        $("#hideIndsavesection").hide();
        $(".disabled").attr('disabled', true);
        $('#txtCusineType').multiselect('disable');
        Callback("Outlet", "GetCusine", fnGetCusineSuccess, fail)
    })
    $("#imageUploadForm").change(function () {
        var formData = new FormData();
        var totalFiles = document.getElementById("imageUploadForm").files.length;
        for (var i = 0; i < totalFiles; i++) {
            var file = document.getElementById("imageUploadForm").files[i];
            formData.append("imageUploadForm", file);
        }
        $.ajax({
            type: "POST",
            url: '/kiwi/Users/UploadImage',
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (response) {
                //$('#uploadimage-popup').modal('hide')

                $w = $('.basic-width');
                $h = $('.basic-height');
                basic = $('#demo-basic').croppie({
                    viewport: {
                        width: 100,
                        height: 100
                    },
                    boundary: {
                        width: 300,
                        height: 300
                    }
                });
                basic.croppie('bind', {
                    url: response
                });
                },
            error: function (error) {
                alert("errror");
            }
        });
    });
    $("#btnSaveUserProfile").click(function () {
        var w = parseInt($w.val(), 10),
            h = parseInt($h.val(), 10), s
        size = 'viewport';
        if (w || h) {
            size = { width: w, height: h };
        }
        basic.croppie('result', {
            type: 'canvas',
            size: size
        }).then(function (resp) {
            Callback("Users", "GetUploadImage", fnGetUploadImageSuccess, fail, "Image", resp);
        });
        
    });
    $("#btnSave").click(function () {

        //var UserProfileDetails = {
        //    EmployeeCode: $("#txtEmployeeCode").val(),
        //    Idea: $("#txtIdea").val(),
        //    LocationName: "Testlocation",
        //    IPConfig: "TestIP",
        //    DeviceType: "TestDevicename"
        //}
        var form = $("#frmmgUsrProfile");
        form.validate();
        if (form.valid()) {
            var UserProfileDetails = new Object();
            UserProfileDetails.CompanyName = $("#txtCompanyName").val();
            UserProfileDetails.EmailID = $("#txtEmailID").val();
            UserProfileDetails.FirstName = $("#txtFirstName").val();
            UserProfileDetails.LastName = $("#txtLastName").val();
            UserProfileDetails.Designation = $("#txtDesignation").val();
            UserProfileDetails.CompanyPhoneNo = $("#txtCompanyPhoneNo").val();
            UserProfileDetails.CompanyAddress1 = $("#txtAddress1").val();
            UserProfileDetails.CompanyAddress2 = $("#txtAddress2").val();
            UserProfileDetails.City = $("#txtCity").val();
            UserProfileDetails.ZipCode = $("#txtZipCode").val();
            UserProfileDetails.CompanyDescription = $("#txtCompnayDescription").val();

            stringifyCallback("Users", "SaveUserDetails", fn_SaveUserDetailsSuccess, fn_Failure, "UserProfileDetails",
                      JSON.stringify(UserProfileDetails));
            $(".disabled").attr('disabled', true);
            $("#savesection").hide();
        }
    });

    $("#btnIndividualSave").click(function () {

        var form = $("#frmmgUsrIndividualProfile");
        form.validate();
        if (form.valid()) {
            var IndividualUsersProfile = new Object();
            IndividualUsersProfile.CompanyName = $("#txtOutletName").val();
            IndividualUsersProfile.EmailID = $("#txtIndividualEmailID").val();
            IndividualUsersProfile.CusineType = $("#txtCusineType").val().join(",");
            IndividualUsersProfile.CompanyPhoneNo = $("#txtIndividualPhoneNo").val();

            stringifyCallback("Users", "SaveIndividualUserDetails", fn_SaveUserDetailsSuccess, fn_Failure, "UserProfileDetails",
                      JSON.stringify(IndividualUsersProfile));
            $(".disabled").attr('disabled', true);
            $('#txtCusineType').multiselect('disable');
            $("#hideIndsavesection").hide();
        }
    });
})