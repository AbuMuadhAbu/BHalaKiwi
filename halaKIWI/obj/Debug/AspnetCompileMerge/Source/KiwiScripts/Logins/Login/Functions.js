function GetUserListSuccess(msg) {
    $('#FetchHomeRedirect').attr('target', '');
    $('#FetchHomeRedirect').submit();

    //$("#dvUserList").empty();
    //var grid = $("#dvUserList").kendoGrid({
    //    toolbar: ["excel"],
    //    excel: {
    //        fileName: "Kendo UI Grid Export.xlsx",
    //        allPages: true
    //    },
    //    dataSource: { data: msg, pageSize: 10 },
    //    sortable: true,
    //    filterable: {
    //        mode: "row"
    //    },
    //    pageable: true,
    //    scrollable: true,
    //    columns: GetHeaders(msg),
    //}).data("kendoGrid");
    //$("#dvUserList").show();
    //toastr.success('Saved Successfully');
}

function GetHeaders(objColumnName) {
    var cols = new Array();
    var pColumns = objColumnName[0];
    $.each(pColumns, function (index, value) {
        cols.push({ field: index, title: index, width: 250, filterable: { cell: { operator: "contains", showOperators: false } } });
    });
    return cols;
}


function fnBusinessRegisterSuccess(msg) {
    if (msg[0].SuccessMessage == 2) {
        toastr.warning(msg[0].Alert);
    }
    else if (msg[0].SuccessMessage == -1) {
        toastr.error(msg[0].Alert);
    }
    else if (msg[0].SuccessMessage == 1) {
        toastr.success(msg[0].Alert);
        $("#txtName").val("");
        $("#txtEmailID").val("");
        $("#txtPassword").val("");
        $("#txtPhoneNo1").val("");
        $("#txtDesignation").val("");
        $("#txtCompanyName").val("");
        $("#txtConfirmPassword").val("");

        $('#dvRegisterSuccess').modal('show');
        $('#signup-popup').modal('hide');
    }
}

function fnGetForgotPasswordsuccess(msg) {
    if (msg[0].success == 2) {
        $("#txtforgotPassword").val("");
        toastr.warning(msg[0].UserPassword);
    }
    else if (msg[0].success == 1) {
        $("#txtforgotPassword").val(msg[0].UserPassword);
        toastr.success('Please find the password');
    }
}