function fnGetGalleryDetailsSuccess(data) {
 
    var dataSource = new kendo.data.DataSource({
        data: data,
        pageSize: 15
    });

    $("#pager").kendoPager({
        dataSource: dataSource
    });

    $("#listView").kendoListView({
        dataSource: dataSource,
        selectable: true,
        change: onChange,
        template: kendo.template($("#template").html())
    });

    $("#listView").removeClass('k-widget');
    function onChange() {
        var data = dataSource.view(),
            selected = $.map(this.select(), function (item) {
                return data[$(item).index()];
            });
        SelectedImage = selected;
        $("#txtImageTitle").val(selected[0].ImageTitle);
        $("#txtOfferDescription").val(selected[0].OfferDescription);

        $("#btnUpdate").show();
        $("#btnSave").hide();
        $('#uploadimage-popup').modal('show');

    }


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