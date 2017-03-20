var valuesall = [];
var Outletddl;
var SelectedImage = 0;
var broadcast;
var glbOfferID;
$(document).ready(function () {
    $("#txtOutletError").hide();
    $("#txtEndDateerror").hide();
    $("#usrSubMenu").hide();
    $("#usrChangePassword").removeClass("active");
    $("#mgOffer").removeClass("active");
    $("#mgGallery").removeClass("active");
    $("#mgOutlet").removeClass("active");
    $("#usrProfile").removeClass("active");
    $("#mgGallery").removeClass("active");
    $("#mgOffer").addClass("active");

    function startChange() {
        var startDate = start.value(),
        endDate = end.value();

        if (startDate) {
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate());
            end.min(startDate);
        } else if (endDate) {
            start.max(new Date(endDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }

    function endChange() {
        var endDate = end.value(),
        startDate = start.value();

        if (endDate) {
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate());
            start.max(endDate);
        } else if (startDate) {
            end.min(new Date(startDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }
    function getRoundedDatetime(precision) {
        var coeff = 1000 * 60 * precision;
        var date = new Date();
        var rounded = new Date(Math.round(date.getTime() / coeff) * coeff);

        return rounded;
    }


    var start = $("#txtStartDate").kendoDateTimePicker({
        change: startChange,
        interval: 5,
        min: getRoundedDatetime(5)
    }).data("kendoDateTimePicker");

    var end = $("#txtEndDate").kendoDateTimePicker({
        change: endChange,
        interval: 5,
        min: getRoundedDatetime(5)
    }).data("kendoDateTimePicker");

    start.max(end.value());
    end.min(start.value());
    $("#txtStartDate").data("kendoDateTimePicker").value(kendo.toString(new Date(), "MM/dd/yyyy") + " 12:00 AM");
    //$("#txtEndDate").data("kendoDateTkimePicker").value(kendo.toString(new Date(), "MM/dd/yyyy") + " 12:00 AM");
    startChange();
    endChange();
    $('#txtStartDate').attr('disabled', 'disabled');
    $('#txtEndDate').attr('disabled', 'disabled');
    $('#choose-outlet').on('click', function () {
        $('#broadcast-panel').hide();
        $('#outlet-panel').show();

    });
    $('#broadcast').on('click', function () {
        $('#outlet-panel').hide();
        $('#broadcast-panel').show();
    });
    $('#backto-offerdetails').on('click', function () {
        $('ul#status-bar').removeClass('imageactive');
        $('#selectimage-panel').hide();
        $('#entryoffer-panel').show();

    });

    $("#frmmgOffer").validate({
        rules: {
            Outlet: {
                required: true
            },
            OfferName: {
                required: true
            },
            StartDate: {
                required: true
            },
            EndDate: {
                required: true
            }
        },
        highlight: function (element) {
            element = $(element);
            if (element.parent().hasClass("k-widget")) {
                element.parent().addClass('input-validation-error');
            } else {
                element.addClass('input-validation-error')
            }
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            element = $(element);
            if (element.parent().hasClass("k-widget")) {
                element.parent().removeClass('input-validation-error');
            } else {
                element.removeClass('input-validation-error')
            }
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $("#txtOfferName").rules("add", { required: true, messages: { required: "Please Enter Offer Name" } });
    $("#txtStartDate").rules("add", { required: true, messages: { required: "Please Select Start Date" } });
    $("#txtEndDate").rules("add", { required: true, messages: { required: "Please Select End Date" } });

    $("#frupdateOffer").validate({
        rules: {
            upOfferName: {
                required: true
            }
        },
        highlight: function (element) {
            element = $(element);
            if (element.parent().hasClass("k-widget")) {
                element.parent().addClass('input-validation-error');
            } else {
                element.addClass('input-validation-error')
            }
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            element = $(element);
            if (element.parent().hasClass("k-widget")) {
                element.parent().removeClass('input-validation-error');
            } else {
                element.removeClass('input-validation-error')
            }
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $("#txtVOfferName").rules("add", { required: true, messages: { required: "Please Enter Offer Name" } });

    Callback("Offer", "GetOutlets", fnGetOutletsSuccess, fail)
});