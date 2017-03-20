$(document).ready(function () {
    $("#btnBack").click(function () {
        $("#dvOutlet").hide();
        $("#dvOutlets").hide();
        $("#dvRestaurant").show();
    })

    tryGeolocation();
    $("#ddlOutletFilter").change(function () {
        Callback("Admin", "GetOfferList", fnGetOfferListSuccess, fail, "UserID", newuserid, "Outlet", $("#ddlOutletFilter").val(), "OfferStatus", $("#ddlOfferStatus").val())
    })
    $("#ddlOfferStatus").change(function () {
        Callback("Admin", "GetOfferList", fnGetOfferListSuccess, fail, "UserID", newuserid, "Outlet", $("#ddlOutletFilter").val(), "OfferStatus", $("#ddlOfferStatus").val())
    })


    $("#btnLocationUpdate").on("click", function () {
        var userid = $("#set-address-popup #hdnUser").val();
        //if (location.valid()) {
        Callback("Outlet", "SetOutletLocation", fnSetOutletLocationSuccess, fail
            , "UserID", userid
            , "Latitude", $(".gllpLatitude").val()
            , "Longitude", $(".gllpLongitude").val()
        );
        //}
    });

    $("#create-outlet-popup input[type=radio]").on("click", function (e) {
        if ($(this).attr("id") == 'rdGPS') {
            tryGeolocation();
        } else if ($(this).attr("id") == 'rdMap') {
            tryGeolocation();
            $('#googlemap-popup').modal('show');
        }
        //else if ($(this).attr("id") == 'rdNotRequired') {
        //    $(".gllpLatitude").val(0);
        //    $(".gllpLongitude").val(0);
        //    $(document).gMapsLatLonPicker().init($(".gllpLatlonPicker"));
        //}
    });

    $("#set-address-popup input[type=radio]").on("click", function (e) {
        if ($(this).attr("id") == 'rdGPS') {
            tryGeolocation();
        } else if ($(this).attr("id") == 'rdMap') {
            tryGeolocation();
            $('#googlemap-popup').modal('show');
        }
        //else if ($(this).attr("id") == 'rdNotRequired') {
        //    $(".gllpLatitude").val(0);
        //    $(".gllpLongitude").val(0);
        //    $(document).gMapsLatLonPicker().init($(".gllpLatlonPicker"));
        //}
    });


});



