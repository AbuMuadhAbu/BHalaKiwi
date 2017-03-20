
function fnUpdateOutletSuccess(msg) {
    if (msg[0].SuccessMessage == 2) {
        toastr.warning(msg[0].Alert);
    }
    else if (msg[0].SuccessMessage == -1) {
        toastr.error(msg[0].Alert);
    }
    else if (msg[0].SuccessMessage == 1) {
        toastr.success(msg[0].Alert);
        $('#Update-outlet-popup').modal('hide')
        Callback("Outlet", "GetOutletList", fnGetOutletListSuccess, fail)
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
        $('#create-outlet-popup').modal('hide')
        Callback("Outlet", "GetOutletList", fnGetOutletListSuccess, fail)
    }
}

function fnGetCusineSuccess(data) {
    $("#txtCusineType").kendoDropDownList({
        optionLabel: "Select Cusine...",
        dataTextField: "Cusine",
        dataValueField: "CusineID",
        dataSource: data,
        index: 0
    });
    $("#txtUpdateCusineType").kendoDropDownList({
        optionLabel: "Select Cusine...",
        dataTextField: "Cusine",
        dataValueField: "CusineID",
        dataSource: data,
        index: 0
    });

}

function fnGetOutletListSuccess(data) {
    Callback("Outlet", "GetCusine", fnGetCusineSuccess, fail)
    var columns = [];
    var colind = 0;
    if (!data || !data.length) {
        $('#tableid').html($("<div class=\"col-sx-12 col-sm-6 col-md-6 col-lg-6 client-img table-div\"><center><h2>No outlets found.</h2></center></div>"));
        return;
    }
    $.each(data[0], function (i, val) {
        if (colind == 0 || colind == 4) {//UserID, Branch Area
        }
        else if (colind == 1) { //Outlet Name
            columns.push(
                {
                    "title": "" + i,
                    "data": "" + i,
                    "render": function (data, type, row) {
                        return "<span class=\"moblie-align\"><a class=\"edit-text\" href=\"#Update-outlet-popup\">" + row[i] + "</a></span>";
                    },
                    "createdCell": function (row, data, index) {
                        row.setAttribute('data-th', i);
                    }
                });
        } else if (colind == 2 || colind == 3) {//Offer available, Offer Utilized
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
        } else if (colind == 5) {//Address status
            columns.push(
                {
                    "title": "" + i,
                    "data": "" + i,
                    "render": function (data, type, row) {
                        return "<span class=\"moblie-align\"><a href=\"" + (data ? "#googlemap-popup" : "#set-address-popup") + "\" class=\"edit-text\" data-toggle=\"modal\" data-latlong=\"" + data + "\">" + (data ? "View location" : "Set Location") + "</a></span>";
                    },
                    "createdCell": function (row, data, index) {
                        row.setAttribute('data-th', i);
                    }
                });
        } else if (colind == 6) {//MobileNo
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
        } else if (colind == 7) {//EmailID
            columns.push(
                {
                    "title": "" + i,
                    "data": "" + i,
                    "render": function (data, type, row) {
                        return "<span class=\"moblie-align\"><div class=\"email-td\">" + row[i] + "</div></span>";

                    },
                    "createdCell": function (row, data, index) {
                        row.setAttribute('data-th', i);
                    }
                });
        } else {
            columns.push({ "title": "" + i, "data": "" + i });
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
    $('#tableid thead th:eq(1)').addClass('text-center');
    $('#tableid thead th:eq(2)').addClass('text-center');

    $('.edit-text[href=#Update-outlet-popup]').click(function () {
        updateuserid = $(this).parents('tr').data("userid");
        Callback("Outlet", "GetUpdateOutletList", fnGetUpdateOutletListSuccess, fail, "UserID", updateuserid)
    });

    $('#tableid a[href=#googlemap-popup]').click(function () {
        var userid = $(this).parents('tr').data("userid")
        Callback("Outlet", "GetOutletLocation", fnGetOutletLocationSuccess, fail, "UserID", userid);
    });

    $('#tableid a[href=#set-address-popup]').click(function () {
        $('#set-address-popup #hdnUser').val($(this).parents('tr').data("userid"));
    });

    $('#tableid a[href=#googlemap-popup]').click(function () {
        var latlong = $(this).data("latlong").split('|')
        $(".gllpLatitude").val(latlong[0]);
        $(".gllpLongitude").val(latlong[1]);
        $(document).gMapsLatLonPicker().init($(".gllpLatlonPicker"));
    });


}



function fnGetUpdateOutletListSuccess(data) {
    $("#txtUpdateOutletName").val(data[0].Name);
    $("#txtUpdateEmailID").val(data[0].EmailID);
    $("#txtUpdatePhoneNo1").val(data[0].PhoneNo);
    $("#txtUpdateBranchArea").val(data[0].brancharea);
    $('#Update-outlet-popup').modal('show');

    var ddl = $('#txtUpdateCusineType').data('kendoDropDownList');

    ddl.select(function (dataItem) {
        return dataItem.CusineID.toString() === data[0].CusineType;
    });
}

function fnGetOutletLocationSuccess(data) {
    //    $(".gllpLatlonPicker").gMapsLatLonPicker().init($(this));
    $(document).gMapsLatLonPicker().init($(".gllpLatlonPicker"));

}

function fnSetOutletLocationSuccess(msg) {
    if (msg[0].SuccessMessage == 2) {
        toastr.warning(msg[0].Alert);
    }
    else if (msg[0].SuccessMessage == -1) {
        toastr.error(msg[0].Alert);
    }
    else if (msg[0].SuccessMessage == 1) {
        toastr.success(msg[0].Alert);
        $('#set-address-popup').modal('hide')
        Callback("Outlet", "GetOutletList", fnGetOutletListSuccess, fail)
    }
}

/*************************************************************************/
/////   geolocation //////
/*************************************************************************/
var apiGeolocationSuccess = function (position) {
    //alert("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
    $(".gllpLatitude").val(position.coords.latitude);
    $(".gllpLongitude").val(position.coords.longitude);
    $(document).gMapsLatLonPicker().init($(".gllpLatlonPicker"));
};

var tryAPIGeolocation = function () {
    jQuery.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDgfow_5PB42wbOXOxNQv1YFBy_YL-h0LQ", function (success) {
        apiGeolocationSuccess({ coords: { latitude: success.location.lat, longitude: success.location.lng } });
    })
  .fail(function (err) {
      //alert("API Geolocation error! \n\n" + err);
      toastr.error("API Geolocation error! \n\n" + err);
  });
};

var browserGeolocationSuccess = function (position) {
    //alert("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
    $(".gllpLatitude").val(position.coords.latitude);
    $(".gllpLongitude").val(position.coords.longitude);
    $(document).gMapsLatLonPicker().init($(".gllpLatlonPicker"));
};

var browserGeolocationFail = function (error) {
    switch (error.code) {
        case error.TIMEOUT:
            toastr.error("Browser geolocation error !\n\nTimeout.");
            break;
        case error.PERMISSION_DENIED:
            if (error.message.indexOf("Only secure origins are allowed") == 0) {
                tryAPIGeolocation();
            }
            break;
        case error.POSITION_UNAVAILABLE:
            toastr.error("Browser geolocation error !\n\nPosition unavailable.");
            break;
    }
};

var tryGeolocation = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            browserGeolocationSuccess,
          browserGeolocationFail,
          { maximumAge: 50000, timeout: 20000, enableHighAccuracy: true });
    }
};

/*************************************************************************/
