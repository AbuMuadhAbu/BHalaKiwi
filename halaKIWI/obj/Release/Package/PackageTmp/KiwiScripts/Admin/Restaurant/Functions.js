function fnGetsuccessActiveRestaurantSuccess(data) {
    toastr.success('Updated Successfully');
    Callback("Admin", "AdminGetActiveRestaurant", fnGetActiveRestaurantSuccess, fail)

}
function fnGetActiveRestaurantSuccess(data) {
    var columns = [];
    var colind = 0;
    if (!data || !data.length) {
        $('#tableid').html($("<div class=\"col-sx-12 col-sm-6 col-md-6 col-lg-6 client-img table-div\"><center><h2>No Restaurant found.</h2></center></div>"));
        return;
    }
    $.each(data[0], function (i, val) {
        if (colind == 0) {//UserID, Branch Area
        }
        else if (colind == 1 || colind == 2 || colind == 3 || colind == 4) //Outlet Name
        {
            if (colind == 1) {
                columns.push(
                   {
                       "title": "Remove Restaurant",
                       "data": "" + i,
                       "render": function (data, type, row) {
                           return "<span class=\"fa fa-times clsReject\"></span>";
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
        else {
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
    //$('#tableid thead th:eq(1)').addClass('text-center');
    $('#tableid thead th:eq(4)').addClass('text-center');

    $("#tableid").on("click", ".moblie-align", function () {
        newuserid = $(this).parents('tr').data("userid");
        Callback("Admin", "GetOutlets", fnGetOutletsSuccess, fail, "UserID", $(this).parents('tr').data("userid"))
        Callback("Admin", "GetOutletList", fnGetOutletListSuccess, fail, "UserID", $(this).parents('tr').data("userid"))
        $("#dvRestaurant").hide();
        //$('a#btnBack').html("<i class='fa fa-caret-left' aria-hidden='true'>asd</i>");
        $('a#rhead').html("&nbsp;" + $(this).parents('tr').find("td[data-th='Restaurant Name']").addClass("sr-only").html());
        $("#dvOutlet").show();
        $("#dvOutlets").show();
    });
    $("#tableid").on("click", ".clsReject", function () {
        //alert($(this).parents('tr').data("userid"));
        newuserid = $(this).parents('tr').data("userid");
        var comments = "Are you sure to Remove the Restaurant";
        

        bootbox.dialog(comments.replace(", %%", "."), [{
            "label": "Ok",
            "class": "btn-primary",
            "callback": function () {
                Callback("Admin", "GetInActiveRestaurant", fnGetsuccessActiveRestaurantSuccess, fail, "UserID", newuserid)
            }
        }, {
            "label": "Cancel",
            "class": "btn-danger",
            "callback": function () {
            }
        }]);

    });

}

function fnGetOutletsSuccess(data) {
    $("#ddlOutletFilter").append($("<option></option>").val(0).html("Select All"));
    $.each(data.Result, function (key, value) {
        $("#ddlOutletFilter").append($("<option></option>").val(value.UserID).html(value.OutletName));
    });
    Callback("Admin", "GetOfferList", fnGetOfferListSuccess, fail, "UserID", newuserid, "Outlet", $("#ddlOutletFilter").val(), "OfferStatus", $("#ddlOfferStatus").val())
}

function fnGetOfferListSuccess(data) {

    $("#ByOffer .table-div").html("<table id=\"Offertableid\"></table>");
    if (!data || !data.length) {
        $('#Offertableid').html($("<div class=\"col-sx-12 col-sm-6 col-md-6 col-lg-6 client-img table-div\"><center><h2>No Offers found.</h2></center></div>"));
        return;
    }
    var columns = [];
    $.each(data[0], function (i, val) {
        if (i != "OfferID") {
            if (i == "Offer Status") {
                columns.push(
                {
                    "title": "" + i,
                    "data": "" + i,
                    "render": function (data, type, row) {
                        return "<span class='off-status " + data + "' title='" + data + "'>" + row[i] + "</span>";
                    },
                    "createdCell": function (row, data, index) {
                        row.setAttribute('data-th', i);
                    }
                });
            }
            else if (i == "AVAILED OFFER COUNT" || i == "Offer Cost") {
                columns.push(
                    {
                        "title": "" + i,
                        "data": "" + i,
                        "render": function (data, type, row) {
                            return "<span class=\"moblie-align\" data-offerid=" + row.OfferID + ">" + row[i] + "</span>";
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
                            return "<span class=\"moblie-align\" data-offerid=" + row.OfferID + ">" + row[i] + "</span>";
                        },
                        "createdCell": function (row, data, index) {
                            row.setAttribute('data-th', i);
                        }
                    });
            }
        }
    });
    if (typeof (dtaTableOffertableid) != "undefined") {
        dtaTableOffertableid.fnDestroy();
    }
    $("#Offertableid").empty();
    //var userid = '';
    dtaTableOffertableid = $('#Offertableid').dataTable({
        "data": data,
        "columns": columns,
        "createdRow": function (row, data, index) {
            row.setAttribute('data-offerid', data.OfferID);
        },
        "searchable": true,
        "pagingType": "full_numbers"
    });

    $("#Offertableid").removeClass("dataTable");
    //$('#Outlettableid thead th:eq(1)').addClass('text-center');
    $('#Offertableid thead th:eq(1)').addClass('text-center');
    //$('#Offertableid thead th:eq(3)').addClass('text-center');
    //$('#Offertableid thead th:eq(4)').addClass('text-center');
    $('#Offertableid thead th:eq(5)').addClass('text-center');

    $("#Offertableid").on("click", ".moblie-align", function () {
        if (typeof ($(this).data("offerid")) !== "undefined") {

            Callback("Offer", "GetOfferDetail", fnGetOfferDetailSuccess, fail, "OfferID", $(this).data("offerid"))
        }
    });


    $("#Offertableid").removeClass("dataTable");
    $("#Offertableid").css("width", "100%");
}

function fnGetOfferDetailSuccess(data) {
    if (data.length > 0) {
        $('#dvViewOffer').modal('show');
        $("#imgOfferDetail").attr("src", data[0].ImagePath);
        $("#txtVOfferName").val(data[0].OfferName);
        $("#txtVStartDate").val(data[0].StartDate);
        $("#txtVEndDate").val(data[0].EndDate);
        $("#txtVOrdersAvailable").val(data[0].OrderAvailable);
        $("#txtVOfferCost").val(data[0].OfferCost);
        $("#txtVOfferDescription").val(data[0].OfferLongDescription);
    }
}


function fnGetOutletListSuccess(data) {
    var columns = [];
    var colind = 0;

    $("#ByOutlet .table-div").html("<table id=\"Outlettableid\"></table>");
    if (!data || !data.length) {
        $('#Outlettableid').html($("<div class=\"col-sx-12 col-sm-6 col-md-6 col-lg-6 client-img table-div\"><center><h2>No Outlets found.</h2></center></div>"));
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
                        return "<span class=\"moblie-align\">" + row[i] + "</span>";
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

    if (typeof (dtaOutlettableid) != "undefined") {
        dtaOutlettableid.fnDestroy();
    }
    $("#Outlettableid").empty();
    dtaOutlettableid = $('#Outlettableid').dataTable({
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

    $("#Outlettableid").removeClass("dataTable");
    //$('#Outlettableid thead th:eq(1)').addClass('text-center');
    $('#Outlettableid thead th:eq(1)').addClass('text-center');
    $('#Outlettableid thead th:eq(2)').addClass('text-center');

    $('.edit-text[href=#Update-outlet-popup]').click(function () {
        updateuserid = $(this).parents('tr').data("userid");
    });

    $('#Outlettableid a[href=#googlemap-popup]').click(function () {
        var userid = $(this).parents('tr').data("userid")
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
