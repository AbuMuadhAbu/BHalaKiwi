$(document).ready(function () {
    
    var form = $("#frmmgCusine");
    form.validate();

    $("#btnSave").click(function () {
        if (form.valid()) {
            Callback("Admin", "SaveCusine", fnSaveCusineSuccess, fail, "Cusine", $("#txtCusine").val(), "CusineID", glbCusineID);
        }
    });


});