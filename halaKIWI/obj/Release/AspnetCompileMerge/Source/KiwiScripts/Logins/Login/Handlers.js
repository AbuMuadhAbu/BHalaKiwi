$(document).ready(function () {
    $("#btnSearch").on('click', function () {
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

    $("#btnRegister").click(function () {

        var form = $("#registration");
        form.validate();
        if (form.valid()) {
            Callback("Registration", "BusinessRegister", fnBusinessRegisterSuccess, fail
     , "Name", $("#txtName").val()
     , "EmailID", $("#txtEmailID").val()
     , "Password", $("#txtPassword").val()
     , "PhoneNo1", $("#txtPhoneNo1").val()
     , "Designation", $("#txtDesignation").val()
     , "CompanyName", $("#txtCompanyName").val(),
     //, "CusineType", $("#txtCusineType").val(),
     //, "Address", $("#txtAddress").val()
     //, "Latitude", $(".gllpLatitude").val()
     //, "Longitude", $(".gllpLongitude").val(),
     "Image", ""
     );
        }
    })



    $("#btnGetPassword").click(function () {


        var form = $("#frmForgotPassword");
        form.validate();
        if (form.valid()) {
            Callback("Registration", "GetForgotPassword", fnGetForgotPasswordsuccess, fail, "EmailID", $("#txtforgotEmailID").val());
        }
    })


    //$("#btnLogin").click(function () {
    //    $(this).closest('form').submit();
    //    //Callback("Logins", "GetUserList", GetUserListSuccess, fail, "UserName", $("#txtEmailID").val(), "Password", $("#txtPassword").val());
    //});
});