function fnGetCusineSuccess(data) {
    var columns = [];
    var colind = 0;
    if (!data || !data.length) {
        $('#tableid').html($("<div class=\"col-sx-12 col-sm-6 col-md-6 col-lg-6 client-img table-div\"><center><h2>No Cusine found.</h2></center></div>"));
        return;
    }
    $.each(data[0], function (i, val) {
        if (colind == 0) {//UserID, Branch Area
        }
        else {
            if (colind == 1) {
                columns.push(
                   {
                       "title": "Edit",
                       "data": "" + i,
                       "render": function (data, type, row) {
                           return "<span class=\"moblie-align fa fa-times clsReject\"></span><span class=\"moblie-align fa fa-pencil-square-o clsEdit\"></span>";
                       },
                       "createdCell": function (row, data, index) {
                           row.setAttribute('data-th', i);
                       }
                   });
            }
            columns.push(
                   {
                       "title": "" + i,
                       "data": "" + i,
                       "render": function (data, type, row) {
                           return "<span class=\"moblie-align\">" + row[i] + "</span>";
                       },
                       "createdCell": function (row, data, index) {
                           row.setAttribute('data-th', i);
                       }
                   });
        }

        colind = colind + 1;
    });

    if (typeof (dtaTable) != "undefined") {
        dtaTable.fnDestroy();
    }
    $("#tableid").empty();
    dtaTable = $('#tableid').dataTable({
        "data": data,
        "columns": columns,
        "createdRow": function (row, data, index) {
            row.setAttribute('data-cusineid', data.CusineID);
            row.setAttribute('data-cusine', data.Cusine);
        },
        "searchable": true,
        "bProcessing": true,
        "bPaginate": true,
        "pagingType": "full_numbers"
    });

    $("#tableid").removeClass("dataTable");
    //$('#tableid thead th:eq(1)').addClass('text-center');
    $('#tableid thead th:eq(4)').addClass('text-center');

    $("#tableid").on("click", ".clsEdit", function () {
        glbCusineID = $(this).parents('tr').data("cusineid");
        $("#txtCusine").val($(this).parents('tr').data("cusine"))
    });
    $("#tableid").on("click", ".clsReject", function () {
        //alert($(this).parents('tr').data("userid"));
        cusineid = $(this).parents('tr').data("cusineid");
        var comments = "Are you sure to Remove Cusine";
        bootbox.dialog(comments.replace(", %%", "."), [{
            "label": "Ok",
            "class": "btn-primary",
            "callback": function () {
                Callback("Admin", "GetRemovecusine", fnGetRemovecusineSuccess, fail, "cusineid", cusineid)
                bootbox.hideAll();
            }
        }, {
            "label": "Cancel",
            "class": "btn-danger",
            "callback": function () {
                bootbox.hideAll();
            }
        }]);

    });

    glbCusineID = 0;
    $("#txtCusine").val('');
}
function fnGetRemovecusineSuccess(data) {
    Callback("Admin", "GetCusine", fnGetCusineSuccess, fail)
}
function fnSaveCusineSuccess(data) {
    if (data[0].success == 2) {
        toastr.warning(data[0].successmessage);
    }
    else if (data[0].success == 1) {
        toastr.success(data[0].successmessage);
        Callback("Admin", "GetCusine", fnGetCusineSuccess, fail)
    }
}