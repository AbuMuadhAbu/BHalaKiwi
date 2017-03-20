
var dtaTable = null;
function fnGetInActiveRestaurantSuccess(data) {
    var columns = [];
    var colind = 0;

    $(".table-div").html("<table id=\"tableid\"></table>");
    if (!data || !data.length) {
        $('#tableid').html($("<div class=\"col-sx-12 col-sm-6 col-md-6 col-lg-6 client-img table-div\"><center><h2>No Activation Restaurant found.</h2></center></div>"));
        return;
    }
    $.each(data[0], function (i, val) {
        if (colind == 0) {//UserID, Branch Area
        }
        else {
            if (colind == 1) //Outlet Name
            {
                columns.push(
                   {
                       "title": "Approve/Reject",
                       "data": "" + i,
                       "render": function (data, type, row) {
                           return "<span class=\"moblie-align fa fa-check-square clsActive\"></span><span class=\"moblie-align fa fa-times clsReject\"></span>";
                       },
                       "createdCell": function (row, data, index) {
                           row.setAttribute('data-th', i);
                       }
                   });
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
        }
        colind = colind + 1;
    });

    if (dtaTable) {
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
    $("#tableid").on("click", ".clsActive", function () {
        //alert($(this).parents('tr').data("userid"));
        newuserid=$(this).parents('tr').data("userid");
        var comments = "Are you sure to activate the user";
        bootbox.dialog(comments.replace(", %%", "."), [{
            "label": "Ok",
            "class": "btn-primary",
            "callback": function () {
                Callback("Admin", "GetActiveRestaurant", fnGetActiveRestaurantSuccess, fail, "UserID", newuserid)
            }
        }, {
            "label": "Cancel",
            "class": "btn-danger",
            "callback": function () {
            }
        }]);
     
    });
    $("#tableid").on("click", ".clsReject", function () {
        //alert($(this).parents('tr').data("userid"));
        newuserid = $(this).parents('tr').data("userid");
        var comments = "Are you sure to Reject the user";
        bootbox.dialog(comments.replace(", %%", "."), [{
            "label": "Ok",
            "class": "btn-primary",
            "callback": function () {
                Callback("Admin", "GetRejectRestaurant", fnGetRejectRestaurantSuccess, fail, "UserID", newuserid)
            }
        }, {
            "label": "Cancel",
            "class": "btn-danger",
            "callback": function () {
            }
        }]);
      
    });

}
function fnGetActiveRestaurantSuccess(data) {
    toastr.success('Updated Successfully');

    Callback("Admin", "AdminGetInActiveRestaurant", fnGetInActiveRestaurantSuccess, fail)
    Callback("Registration", "AdminRestaurantActiveEmailTrigger", fnRestaurantEmailTriggerSuccess, fail, "EmailID", data[0].EmailID, "CompanyName", data[0].CompanyName);
}

function fnGetRejectRestaurantSuccess(data) {
    toastr.success('Updated Successfully');
    Callback("Admin", "AdminGetInActiveRestaurant", fnGetInActiveRestaurantSuccess, fail)
}
function fnRestaurantEmailTriggerSuccess(data) {

}