
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
        setTimeout(function () {
            location.reload();
        }, 2);
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
        Callback("Registration", "OutletEmailTrigger", fnRestaurantEmailTriggerSuccess, fail, "OutletName", $("#txtOutletName").val(), "Password", $("#txtPassword").val(), "EmailID", $("#txtEmailID").val());
        $('#create-outlet-popup').modal('hide')
        setTimeout(function () {
            location.reload();
        }, 2);
    }
}

function fnRestaurantEmailTriggerSuccess(data) {

}
function fnGetCusineSuccess(data) {
    $.each(data, function (key, value) {
        $("#txtCusineType").append($("<option></option>").val(value.CusineID).html(value.Cusine));
    });
    $('#txtCusineType').multiselect({
        onChange: function (option, checked) {
            // Get selected options.
            var selectedOptions = $('#txtCusineType option:selected');

            if (selectedOptions.length >= 4) {
                // Disable all other checkboxes.
                var nonSelectedOptions = $('#txtCusineType option').filter(function () {
                    return !$(this).is(':selected');
                });

                nonSelectedOptions.each(function () {
                    var input = $('input[value="' + $(this).val() + '"]');
                    input.prop('disabled', true);
                    input.parent('li').addClass('disabled');
                });
            }
            else {
                // Enable all checkboxes.
                $('#txtCusineType option').each(function () {
                    var input = $('input[value="' + $(this).val() + '"]');
                    input.prop('disabled', false);
                    input.parent('li').addClass('disabled');
                });
            }
        }
    });

    $.each(data, function (key, value) {
        $("#txtUpdateCusineType").append($("<option></option>").val(value.CusineID).html(value.Cusine));
    });
    $('#txtUpdateCusineType').multiselect({
        onChange: function (option, checked) {
            // Get selected options.
            var selectedOptions = $('#txtUpdateCusineType option:selected');

            if (selectedOptions.length >= 4) {
                // Disable all other checkboxes.
                var nonSelectedOptions = $('#txtUpdateCusineType option').filter(function () {
                    return !$(this).is(':selected');
                });

                nonSelectedOptions.each(function () {
                    var input = $('input[value="' + $(this).val() + '"]');
                    input.prop('disabled', true);
                    input.parent('li').addClass('disabled');
                });
            }
            else {
                // Enable all checkboxes.
                $('#txtUpdateCusineType option').each(function () {
                    var input = $('input[value="' + $(this).val() + '"]');
                    input.prop('disabled', false);
                    input.parent('li').addClass('disabled');
                });
            }
        }
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
    var a;
    $.each(data[0], function (i, val) {

        if (colind == 0) {//UserID, Branch Area
            a = i;
        }
        else if (colind == 4) { }
        else if (colind == 1) { //Outlet Name
            columns.push(
                {
                    "title": "" + i,
                    "data": "" + i,
                    "width": "20%",
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
                    "width": "5%",
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
                    "width": "12%",
                    "render": function (data, type, row) {
                        return "<span class=\"moblie-align\"><a href=\"" + (data ? "#googlemap-popup" : "#") + "\" class=\"edit-text\" data-toggle=\"modal\" data-latlong=\"" + data + "\">" + (data ? "View location" : "Set Location") + "</a></span>";
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
                    "width": "15%",
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
                    "width": "auto",
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
    columns.push(
    {
        "title": "View/Edit",
        "data": "" + a,
        "width": "10%",
        "render": function (data, type, row) {
            return "<span class=\"moblie-align\"><a class=\"edit-text\" href=\"#Update-outlet-popup\">Edit</a></span>";
        },
        "createdCell": function (row, data, index) {
            row.setAttribute('data-th', a);
        }
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

        "bAutoWidth": false,
        "bSearchable": true,
        "bProcessing": true,
        "bPaginate": true,
        "pagingType": "full_numbers"
    });

    $("#tableid").removeClass("dataTable");
    $('#tableid thead th:eq(1)').addClass('text-center');
    $('#tableid thead th:eq(2)').addClass('text-center');

    //$("#tableid").on("click", ".edit-text", function () {
    //    updateuserid = $(this).parents('tr').data("userid");
    //    Callback("Outlet", "GetUpdateOutletList", fnGetUpdateOutletListSuccess, fail, "UserID", updateuserid)
    //});
    
    $("#tableid").on("click", "a[href=#Update-outlet-popup]", function () {
        updateuserid = $(this).parents('tr').data("userid");
        Callback("Outlet", "GetUpdateOutletList", fnGetUpdateOutletListSuccess, fail, "UserID", updateuserid)
    });

    //$('.edit-text[href=#Update-outlet-popup]').click(function () {
    //    updateuserid = $(this).parents('tr').data("userid");
    //    Callback("Outlet", "GetUpdateOutletList", fnGetUpdateOutletListSuccess, fail, "UserID", updateuserid)
    //});


    $('#tableid a[href=#set-address-popup]').click(function () {
        //$('#set-address-popup #hdnUser').val($(this).parents('tr').data("userid"));
    });
    $("#tableid").on("click", "a[href=#googlemap-popup]", function () {
        $("#btnSaveLocation").show();
        updateuserid = $(this).parents('tr').data("userid");
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
    $("#txtUpdatePassword").val(data[0].UserPassword);
    $("#txtUpdateConfirmPassword").val(data[0].UserPassword);
    $('#Update-outlet-popup').modal('show');
    var arraycusine = data[0].CusineType.split(',');
    $("#txtUpdateCusineType").val(arraycusine);

    $("#txtUpdateCusineType").multiselect("refresh");
    var selectedOptions = $('#txtUpdateCusineType option:selected');

    if (selectedOptions.length >= 4) {
        // Disable all other checkboxes.
        var nonSelectedOptions = $('#txtUpdateCusineType option').filter(function () {
            return !$(this).is(':selected');
        });

        nonSelectedOptions.each(function () {
            var input = $('input[value="' + $(this).val() + '"]');
            input.prop('disabled', true);
            input.parent('li').addClass('disabled');
        });
    }
    else {
        // Enable all checkboxes.
        $('#txtCusineType option').each(function () {
            var input = $('input[value="' + $(this).val() + '"]');
            input.prop('disabled', false);
            input.parent('li').addClass('disabled');
        });
    }
    //var ddl = $('#txtUpdateCusineType').data('kendoDropDownList');

    //ddl.select(function (dataItem) {
    //    return dataItem.CusineID.toString() === data[0].CusineType;
    //});
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
    setTimeout(function () {
        location.reload();
    }, 2);
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
