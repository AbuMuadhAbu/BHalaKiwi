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


    //$("#googlemap-popup input[type=reset]").on("click", function (e) {
    //    tryGeolocation();
    //});

    ////resets geo position on cancel
    //$('#googlemap-popup').on('hide.bs.modal', function () {
    //    PlaceGeoPosition();
    //});
});





/*
var apiGeolocationSuccess = function(position) {
	alert("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
};

var tryAPIGeolocation = function() {
	jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function(success) {
		apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
  })
  .fail(function(err) {
    alert("API Geolocation error! \n\n"+err);
  });
};

var browserGeolocationSuccess = function(position) {
	alert("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
};

var browserGeolocationFail = function(error) {
  switch (error.code) {
    case error.TIMEOUT:
      alert("Browser geolocation error !\n\nTimeout.");
      break;
    case error.PERMISSION_DENIED:
      if(error.message.indexOf("Only secure origins are allowed") == 0) {
        tryAPIGeolocation();
      }
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Browser geolocation error !\n\nPosition unavailable.");
      break;
  }
};

var tryGeolocation = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
    	browserGeolocationSuccess,
      browserGeolocationFail,
      {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true});
  }
};

tryGeolocation();*/