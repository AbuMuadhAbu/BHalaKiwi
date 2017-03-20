$(document).ready(function () {

    var form = $("#frmChangePassword");
    form.validate();

    $("#btnSave").click(function () {

        if (form.valid()) {
            Callback("Users", "SaveChangePassword", fnChangePasswordSuccess, fail
     , "OldPassword", $("#txtOldPassword").val()
     , "Password", $("#txtPassword").val()
     );
        }

    });
})