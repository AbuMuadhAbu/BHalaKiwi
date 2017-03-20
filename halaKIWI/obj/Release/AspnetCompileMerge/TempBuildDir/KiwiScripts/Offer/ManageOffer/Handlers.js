$(document).ready(function () {
    $("#btnNext").click(function () {

        $("#ddlDelivery").val();
        $('#entryoffer-panel').hide();
        //$("#ddlOutlet").
        $('#selectimage-panel').show();
        $('ul#status-bar').addClass('imageactive');
    });

    $("#btnUpdateOffer").click(function () {

        var form = $("#frupdateOffer");
        form.validate();
        if (form.valid()) {

            var offerModel = {
                OfferName: $("#txtVOfferName").val(),
                OfferCost: $("#txtVOfferCost").val(),
                StartDate: $("#txtVStartDate").val(),
                EndDate: $("#txtVEndDate").val(),
                OfferDescription: $("#txtVOfferDescription").val(),
                IsDelivery: $("#ddlVDelivery").val(),
                OfferID: glbOfferID
            };
            stringifyCallback(
               "Offer",
                  "UpdateOffers",
              UpdateOffersSuccess,
               fail,
               "offerModel", JSON.stringify(offerModel)
               );
        }
    });

    $("#btnEndOffer").click(function () {
        Callback("Offer", "DisableOfferList", DisableOffersSuccess, fail, "OfferID", glbOfferID);
    });

    $("#ddlOutletFilter").change(function () {
        Callback("Offer", "GetOfferList", fnGetOfferListSuccess, fail, "Outlet", $("#ddlOutletFilter").val(), "OfferStatus", $("#ddlOfferStatus").val())
    })
    $("#ddlOfferStatus").change(function () {
        Callback("Offer", "GetOfferList", fnGetOfferListSuccess, fail, "Outlet", $("#ddlOutletFilter").val(), "OfferStatus", $("#ddlOfferStatus").val())
    })
    $("#rdOutlet, #rdBroadcast").change(function () {
        $.each(broadcast, function (key, value) {

            $('#ddlOutlet option[value=' + value.UserID + ']').attr("selected", "selected");
            $('#ddlOutlet').multiselect('refresh');
        });
        if ($("#rdOutlet").is(":checked")) {
            $('#ddlOutlet').multiselect('enable');

        }
        else if ($("#rdBroadcast").is(":checked")) {
            $('#ddlOutlet').multiselect('disable');
        }
    });
    $("#btnSave").click(function () {
        if (SelectedImage == 0) {
            toastr.error("Please Select the offer Image");
        }
        else {
            var selectedData = [];

            $.each($('#ddlOutlet').val(), function (i, v) {
                selectedData.push({ OutLetID: v });
            });
            var offerModel = {
                OfferName: $("#txtOfferName").val(),
                OrderAvailable: $("#txtOrderAvailable").val(),
                OfferCost: $("#txtOfferCost").val(),
                StartDate: $("#txtStartDate").val(),
                EndDate: $("#txtEndDate").val(),
                OfferDescription: $("#txtOfferDescription").val(),
                IsDelivery: $("#ddlDelivery").val(),
                GalleryID: SelectedImage[0],
                OutLetIDs: selectedData
            };
            stringifyCallback(
               "Offer",
                  "SaveOffers",
              SaveOffersSuccess,
               fail,
               "offerModel", JSON.stringify(offerModel)
               );
        }

    })
    var form = $("#frmmgOffer");
    form.validate();
    $("#btnNextSave").click(function () {
        if ($('#ddlOutlet').val() == null) {
            $("#txtOutletError").show();
        }
        else if ($('#txtEndDate').val() == "") {
            $("#txtEndDateerror").show();
        }
        else {
            $("#txtOutletError").hide();
            $("#txtEndDateerror").hide();
            if (form.valid()) {
                $('#entryoffer-panel').hide();
                //$("#ddlOutlet").
                $('#selectimage-panel').show();
                $('ul#status-bar').addClass('imageactive');
            }
        }

    });
})