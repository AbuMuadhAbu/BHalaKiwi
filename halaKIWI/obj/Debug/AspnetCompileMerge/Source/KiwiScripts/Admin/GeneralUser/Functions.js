
function fnGetAdminGetGeneralUserSuccess(data) {
    var columns = [];
    var colind = 0;
    if (!data || !data.length) {
        $('#tableid').html($("<div class=\"col-sx-12 col-sm-6 col-md-6 col-lg-6 client-img table-div\"><center><h2>No General user found.</h2></center></div>"));
        return;
    }

    $.each(data[0], function (i, val) {
        if (colind == 0) {//UserID, Branch Area
        }
        else if (colind == 3 || colind == 4) //Name
        {
            columns.push(
               {
                   "title": "" + i,
                   "data": "" + i,
                   "render": function (data, type, row) {
                       return "<span class=\"moblie-align\">" + row[i] + "</span>";
                   },
                   "createdCell": function (row, data, index) {
                       $(row).attr('data-th', i).addClass("text-center");
                   }
               });
        }
        else {
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
            row.setAttribute('data-userid', data.UserID);
        },
        "searchable": true,
        "bProcessing": true,
        "bPaginate": true,
        "pagingType": "full_numbers"
    });

    $("#tableid").removeClass("dataTable");
    $('#tableid thead th:eq(2)').addClass('text-center');
    $('#tableid thead th:eq(3)').addClass('text-center');

}
