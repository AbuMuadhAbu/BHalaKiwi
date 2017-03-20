function fnGetGalleryDetailsSuccess(data) {
 
    var dataSource = new kendo.data.DataSource({
        data: data,
        pageSize: 6
    });

    $("#pager").kendoPager({
        dataSource: dataSource
    });

    $("#listView").kendoListView({
        dataSource: dataSource,
        template: kendo.template($("#template").html())
    });

    $("#listView").removeClass('k-widget');


}

function fn_SaveUserDetailsSuccess(msg) {
    if (msg[0].Success == 2) {
        toastr.warning(msg[0].SuccessMessage);
    }
    else if (msg[0].Success == 1) {
        $("#txtImageTitle").val("");
        $("#txtOfferDescription").val("");
        
        $('#uploadimage-popup').modal('hide')

        toastr.success(msg[0].SuccessMessage);
    }
    $(".gllpImage").val('');
    Callback("Gallery", "GetGalleryDetails", fnGetGalleryDetailsSuccess, fail)
}