
function fnUpdateOutletSuccess(msg) {
    if (msg[0].SuccessMessage == 2) {
        toastr.warning(msg[0].Alert);
    }
    else if (msg[0].SuccessMessage == -1) {
        toastr.error(msg[0].Alert);
    }
    else if (msg[0].SuccessMessage == 1) {
        toastr.success(msg[0].Alert);
    }
}
function fnOutletSuccess(msg) {
    if (msg[0].SuccessMessage == 2) {
        toastr.warning(msg[0].Alert);
    }
    else if (msg[0].SuccessMessage == -1) {
        toastr.error(msg[0].Alert);
    }
    else if (msg[0].SuccessMessage == 1) {
        toastr.success(msg[0].Alert);
    }
}
function fnGetOutletListSuccess(data) {
    var columns = [];
    var colind = 0;
    $.each(data[0], function (i, val) {
        if (colind == 1) {
            columns.push({ "title": "" + i, "class": "edit-text", "data": "" + i });
        }
        else {
            columns.push({ "title": "" + i, "data": "" + i });
        }
        colind = colind + 1;
    });

    $("#tableid").empty();
    //$("#tableid").append('<table id="displayTable" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
    //$("#tableDiv").find("table thead tr").append(tableHeaders);  

    //$('#tableid').dataTable(data);
    //var dObject = {

    //}
    //var dataObject = {
    //    columns: [{
    //        title: "Offer Name"
    //    }, {
    //        title: "Availed Offer Count"
    //    }, {
    //        title: "Outlet Name"
    //    }, {
    //        title: "From"
    //    }, {
    //        title: "To"
    //    }, {
    //        title: "Offer Cost"
    //    }, {
    //        title: "Offer Status"
    //    }],
    //    data: [
    //      ["Buy 1 Get 1", "10", "River Side", "12/07/2016 12:00AM", "13/07/2016 11:00AM", "120 AED", "live-off"],
    //      ["Buy 1 Get 1", "20", "River Side", "11/05/2016 12:00AM", "13/07/2016 11:00AM", "120 AED", "completed-off"],
    //      ["Buy 1 Get 1", "11", "River Side", "10/07/2016 12:00AM", "13/07/2016 11:00AM", "120 AED", "goto-off"],
    //      ["Buy 1 Get 1", "20", "River Side", "09/07/2016 12:00AM", "13/07/2016 11:00AM", "120 AED", "live-off"],
    //      ["Buy 1 Get 1", "12", "River Side", "11/07/2016 12:00AM", "13/07/2016 11:00AM", "120 AED", "completed-off"],
    //      ["Buy 1 Get 1", "20", "River Side", "12/07/2016 12:00AM", "13/07/2016 11:00AM", "120 AED", "goto-off"],
    //      ["Buy 1 Get 1", "15", "River Side", "12/07/2016 12:00AM", "13/07/2016 11:00AM", "120 AED", "live-off"]
    //    ]
    //};
    //var columns = [];
    var userid = '';
    $('#tableid').dataTable({
        "data": data,
        "columns": columns,
        "columnDefs": [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
                //   "defaultContent": "<span class='off-status completed-off' title='Completed Offers'>a</span>"
            }, {
                "targets": '_all',
                "createdCell": function (td) {
                    if (td.cellIndex == -1) {
                        userid = td.textContent;
                    }
                    td.setAttribute('userid', userid);
                }
            }],

        /*"columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": "<span class='off-status completed-off' title='Completed Offers'>"+data+"</span>"
        }],*/

        "searchable": true,
        "bProcessing": true,
        "bPaginate": false
    });
    var table = $('#tableid').DataTable();

    $('.edit-text').click(function () {
        updateuserid = $(this).attr("userid");
        Callback("Outlet", "GetUpdateOutletList", fnGetUpdateOutletListSuccess, fail, "UserID", updateuserid)
    });
}

function fnGetUpdateOutletListSuccess(data) {
    $("#txtUpdateOutletName").val(data[0].Name);
    $("#txtUpdateEmailID").val(data[0].EmailID);
    $("#txtUpdatePhoneNo1").val(data[0].PhoneNo);
    $("#txtUpdateCusineType").val(data[0].CusineType);
    $("#txtUpdateBranchArea").val(data[0].brancharea);
    $('#Update-outlet-popup').modal('show');
}