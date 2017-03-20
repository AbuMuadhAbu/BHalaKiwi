function fnChangePasswordSuccess(msg) {
    if (msg[0].Success == 2) {
        toastr.warning(msg[0].SuccessMessage);
    }
    else if (msg[0].Success == 1) {
        toastr.success(msg[0].SuccessMessage);
        $("#txtOldPassword").val("");
        $("#txtPassword").val("");
        $("#txtConfirmPassword").val("");
    }
}
