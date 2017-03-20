$(document).ready(function () {
    $("#txtAddress").on('change', function () {
        $(".gllpSearchField").val($("#txtAddress").val().trim());
        $(".gllpSearchButton").click();
    });
    function success(position) {
        $(".gllpLatitude").val(position.coords.longitude);
        $(".gllpLongitude").val(position.coords.latitude);
    }
    $("#btnRegistration").on('click', function () {
        //$("#dvRegistration").modal("show");
        $('#dvRegistration').modal({ backdrop: 'static', keyboard: false });
    });
    function fail() {
        // Could not obtain location
    }

    if (navigator.geolocation) {
        // Call getCurrentPosition with success and failure callbacks
        navigator.geolocation.getCurrentPosition(success, fail);
    }
    else {
        alert("Sorry, your browser does not support geolocation services.");
    }
    var form = $("#registration");
    form.validate();
    var updateform = $("#frmupdateOutlet");
    updateform.validate();

    $("#btnSave").click(function () {
        //alert($('input[name=gps]:checked').val());
        if (form.valid()) {
            Callback("Outlet", "SaveOutlet", fnOutletSuccess, fail
     , "OutletName", $("#txtOutletName").val()
     , "EmailID", $("#txtEmailID").val()
     , "Password", $("#txtPassword").val()
     , "PhoneNo1", $("#txtPhoneNo1").val()
     , "CusineType", $("#txtCusineType").val()
     , "BranchArea", $("#txtBranchArea").val()
     );
        }
    })


    $("#btnUpdate").click(function () {
        //alert($('input[name=gps]:checked').val());
        if (updateform.valid()) {
            Callback("Outlet", "UpdateOutlet", fnUpdateOutletSuccess, fail
     , "OutletName", $("#txtUpdateOutletName").val()
     , "EmailID", $("#txtUpdateEmailID").val()
     , "Password", $("#txtUpdatePassword").val()
     , "PhoneNo1", $("#txtUpdatePhoneNo1").val()
     , "CusineType", $("#txtUpdateCusineType").val()
     , "BranchArea", $("#txtUpdateBranchArea").val()
     , "UserID", updateuserid
     );
        }
    })

    //$("#btnLogin").click(function () {
    //    $(this).closest('form').submit();
    //    //Callback("Logins", "GetUserList", GetUserListSuccess, fail, "UserName", $("#txtEmailID").val(), "Password", $("#txtPassword").val());
    //});
});