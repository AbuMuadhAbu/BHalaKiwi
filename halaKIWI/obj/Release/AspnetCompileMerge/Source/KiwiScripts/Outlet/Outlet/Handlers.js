$(document).ready(function () {
    //commented not used
    //$("#txtAddress").on('change', function () {
    //    $(".gllpSearchField").val($("#txtAddress").val().trim());
    //    $(".gllpSearchButton").click();
    //});

    $("#btnRegistration").on('click', function () {
        //$("#dvRegistration").modal("show");
        $('#dvRegistration').modal({ backdrop: 'static', keyboard: false });
    });


    tryGeolocation();

    var form = $("#registration");
    form.validate();
    var updateform = $("#frmupdateOutlet");
    updateform.validate();
    $("#btnSave").click(function () {
        if (form.valid()) {
            Callback("Outlet", "SaveOutlet", fnOutletSuccess, fail
                , "OutletName", $("#txtOutletName").val()
                , "EmailID", $("#txtEmailID").val()
                , "Password", $("#txtPassword").val()
                , "PhoneNo1", $("#txtPhoneNo1").val()
                , "CusineType", $("#txtCusineType").val()
                , "BranchArea", $("#txtBranchArea").val()
                , "Latitude", $('#create-outlet-popup #rdNotRequired').is(':checked') ? 0 : $(".gllpLatitude").val()
                , "Longitude", $('#create-outlet-popup #rdNotRequired').is(':checked') ? 0 : $(".gllpLongitude").val()
            );
        }

    })


    $("#btnUpdate").click(function () {
        if (updateform.valid()) {
            Callback("Outlet", "UpdateOutlet", fnUpdateOutletSuccess, fail
                , "OutletName", $("#txtUpdateOutletName").val()
                , "EmailID", $("#txtUpdateEmailID").val()
                , "Password", $("#txtUpdatePassword").val()
                , "PhoneNo1", $("#txtUpdatePhoneNo1").val()
                , "CusineType", $("#txtUpdateCusineType").val()
                , "BranchArea", $("#txtUpdateBranchArea").val()
                , "Latitude", $(".gllpLatitude").val() || 0
                , "Longitude", $(".gllpLongitude").val() || 0
                , "UserID", updateuserid
            );
        }
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
    $("#btnSaveLocation").on("click", function () {
        Callback("Outlet", "SetOutletLocation", fnSetOutletLocationSuccess, fail
            , "UserID", updateuserid
            , "Latitude", $(".gllpLatitude").val()
            , "Longitude", $(".gllpLongitude").val()
        );
    });

    $("#create-outlet-popup input[type=radio]").on("click", function (e) {
        if ($(this).attr("id") == 'rdGPS') {
            tryGeolocation();
        } else if ($(this).attr("id") == 'rdMap') {
            updateuserid = 0;
            if (!$(".gllpLatitude").val() || !$(".gllpLongitude").val()) {
                tryGeolocation();
            }
            $("#btnSaveLocation").hide();
            $('#googlemap-popup').modal('show');
        }
        //else if ($(this).attr("id") == 'rdNotRequired') {
        //    $(".gllpLatitude").val(0);
        //    $(".gllpLongitude").val(0);
        //    $(document).gMapsLatLonPicker().init($(".gllpLatlonPicker"));
        //}
    });

    $('#googlemap-popup .modal-content').resizable({
        //alsoResize: ".modal-dialog",		
        minHeight: 300,
        minWidth: 300
    });


    $("#googlemap-popup input[type=reset]").on("click", function (e) {
        tryGeolocation();
    });

    $("#set-address-popup input[type=radio]").on("click", function (e) {
        if ($(this).attr("id") == 'rdGPS') {
            tryGeolocation();
        } else if ($(this).attr("id") == 'rdMap') {
            if (!$(".gllpLatitude").val() || !$(".gllpLongitude").val()) {
                tryGeolocation();
            }
            $('#googlemap-popup').modal('show');
        }
        //else if ($(this).attr("id") == 'rdNotRequired') {
        //    $(".gllpLatitude").val(0);
        //    $(".gllpLongitude").val(0);
        //    $(document).gMapsLatLonPicker().init($(".gllpLatlonPicker"));
        //}
    });


    //$("#googlemap-popup input[type=reset]").on("click", function (e) {
    //    tryGeolocation();
    //});

    ////resets geo position on cancel
    //$('#googlemap-popup').on('hide.bs.modal', function () {
    //    PlaceGeoPosition();
    //});
});




