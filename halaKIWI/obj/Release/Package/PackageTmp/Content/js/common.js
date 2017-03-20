
var ajaxUrl = "/";
var baseUrl = "/";
$(function () {

    $(".login-panel").height($(window).height() - 220);
    $(".login-box").height($(window).height() - 290);

    $('#mobilemenu').click(function () {
        $('.mobile_menus').slideToggle('slow');
    });


    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    $('#theme-blue').click(function () {
        $('link[href="' + baseUrl + 'Content/css/th-green.css"],link[href="' + baseUrl + 'Content/css/th-blue-green.css"],link[href="' + baseUrl + 'Content/css/th-red.css"]').attr('href', baseUrl + 'Content/css/th-blue.css');

    });

    $('#theme-green').click(function () {
        $('link[href="' + baseUrl + 'Content/css/th-blue.css"],link[href="' + baseUrl + 'Content/css/th-blue-green.css"],link[href="' + baseUrl + 'Content/css/th-red.css"]').attr('href', baseUrl + 'Content/css/th-green.css');
    });

    $('#theme-bgreen').click(function () {
        $('link[href="' + baseUrl + 'Content/css/th-green.css"],link[href="' + baseUrl + 'Content/css/th-blue.css"],link[href="' + baseUrl + 'Content/css/th-red.css"]').attr('href', baseUrl + 'Content/css/th-blue-green.css');
    });

    $('#theme-red').click(function () {
        $('link[href="' + baseUrl + 'Content/css/th-green.css"],link[href="' + baseUrl + 'Content/css/th-blue.css"],link[href="' + baseUrl + 'Content/css/th-blue-green.css"]').attr('href', baseUrl + 'Content/css/th-red.css');
    });


    // Sign in name expand collapse
    $('.user-txt').hover(function () {
        $(this).delay(200).animate({
            width: '200px'
        }, 500);
    }, function () {
        $(this).dequeue().animate({
            width: '69px'
        }, 500);
    });

    // Left Nav Accordion

    $(".menu-toggle,.accordion-heading").click(function () {
        $(".left-nav, ul.arm-nav-list li").animate({ "width": "200px" }, "fast");
        $(".arm-container").animate({ "margin-left": "200px" }, "fast");
        $(".left-nav .accordion-group a span").fadeIn('slow');
        $("ul.arm-nav-list li a").fadeIn('slow');
        $(".menu-toggle").fadeOut();
        $(".arm-nav-list").addClass('topnav');
        $(".menu-toggle-hide").fadeIn();
        $(".arm-nav-list").removeClass('hide-list');
        $(".accordion-inner").show();
        // $('#divt').focus();
        $('.left-nav-txt').addClass('join-txt');
        $('#side_accordion .accordion-toggle').addClass('active');

        $(".rht-tab-panel").css({ "position": "relative", "left": "0px" });

    });


    $(".menu-toggle-hide").click(function () {
        $(".left-nav, ul.arm-nav-list li").animate({ "width": "48px" }, "fast");
        $(".arm-container").animate({ "margin-left": "48px" }, "fast");
        $(".left-nav .accordion-group a span.left-nav-txt").hide();
        $(".menu-toggle-hide").hide();
        $(".arm-nav-list").removeClass('topnav');
        $(".menu-toggle").fadeIn();
        $(".arm-nav-list").addClass('hide-list');
        $(".accordion-inner").hide();
        $(".rht-tab-panel").css({ "position": "absolute" });
        $('.left-nav-txt').removeClass('join-txt');
        $('#side_accordion .accordion-toggle').removeClass('active');

    });

    $('.accordion').on('show', function (e) {
        $(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('active');
    });

    $('.accordion').on('hide', function (e) {
        $(this).find('.accordion-toggle').not($(e.target)).removeClass('active');
    });

    var $window = $(window);
    var wrapHeight = $(this).height() - 5;
    var contHeight = $(this).height() - 35;
    contHeight = contHeight + 'px';
    wrapHeight = wrapHeight + 'px';
    //$("#maincontainer").css("height", wrapHeight);
    $(".left-nav, .arm-container").css("height", contHeight);
    $(".content-wrapper").css("height", wrapHeight);

    var $window = $(window).on('resize', function () {
        var wrapHeight = $(this).height() - 5;
        var contHeight = $(this).height() - 35;
        contHeight = contHeight + 'px';
        wrapHeight = wrapHeight + 'px';
        //$("#maincontainer").css("height", wrapHeight);
        $(".left-nav, .arm-container").css("height", contHeight);
        $(".content-wrapper").css("height", wrapHeight);
    });

});



//Callback Methods.......
function CallWebMethod(ajaxUrl, onSuccess, onFail) {
    var args = '';
    var l = arguments.length;
    if (l > 4) {
        for (var i = 4; i < l - 1; i += 2) {
            if (args.length != 0) args += ',';

            if (arguments[i + 1].toString().indexOf('[') == 0) {
                args += '"' + arguments[i] + '":' + arguments[i + 1] + '';
            }
            else {
                args += '"' + arguments[i] + '":"' + arguments[i + 1] + '"';
            }
        }
    }
    $.ajax(
            {
                type: 'POST',
                url: ajaxUrl,
                cache: false,
                data: '{' + args + '}',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: onSuccess,
                fail: onFail
            });
}

function Callback(methodPage, methodName, onSuccess, onFail) {
    var args = '';
    var l = arguments.length;
    if (l > 4) {
        for (var i = 4; i < l - 1; i += 2) {
            if (args.length != 0) args += ',';

            if (arguments[i + 1].toString().indexOf('[') == 0) {
                args += '"' + arguments[i] + '":' + arguments[i + 1] + '';
            }
            else {
                args += '"' + arguments[i] + '":"' + arguments[i + 1] + '"';
            }
        }
    }
    $.ajax(
            {
                type: 'POST',
                url: baseUrl + methodPage + '/' + methodName,
                cache: false,
                data: '{' + args + '}',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: onSuccess,
                fail: onFail
            });
}

function stringifyCallback(methodPage, methodName, onSuccess, onFail) {

    var args = '';
    var l = arguments.length;
    if (l > 4) {
        for (var i = 4; i < l - 1; i += 2) {
            if (args.length != 0) args += ',';
            args += '"' + arguments[i] + '":' + arguments[i + 1] + '';
        }
    }
    $.ajax(
            {
                type: 'POST',
                url: baseUrl + methodPage + '/' + methodName,
                cache: false,
                data: '{' + args + '}',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: onSuccess,
                fail: onFail
            });
}


function CallControllerMethod(methodName, onSuccess, onFail) {
    var args = '';
    var l = arguments.length;
    if (l > 2) {
        for (var i = 3; i < l - 1; i += 2) {
            if (args.length != 0) args += ',';

            if (arguments[i + 1].toString().indexOf('[') == 0) {
                args += '"' + arguments[i] + '":' + arguments[i + 1] + '';
            }
            else {
                args += '"' + arguments[i] + '":"' + arguments[i + 1] + '"';
            }
        }
    }
    $.ajax(
            {
                type: 'POST',
                url: baseUrl + 'Dispositions/' + methodName,
                cache: false,
                data: '{' + args + '}',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: onSuccess,
                fail: onFail
            });
}

function stringifyCallbackWithHtmldataType(methodPage, methodName, onSuccess, onFail) {
    var args = '';
    var l = arguments.length;
    if (l > 4) {
        for (var i = 4; i < l - 1; i += 2) {
            if (args.length != 0) args += ',';
            args += '"' + arguments[i] + '":' + arguments[i + 1] + '';
        }
    }
    $.ajax(
            {
                type: 'POST',
                url: baseUrl + methodPage + '/' + methodName,
                cache: false,
                data: '{' + args + '}',
                contentType: 'application/json; charset=utf-8',
                dataType: 'html',
                success: onSuccess,
                fail: onFail
            });
}
String.prototype.htmlEncode = function () {
    var _entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };

    return String(this).replace(/[&<>"'\/]/g, function (s) {
        return _entityMap[s];
    });

}


$(document).on({
    ajaxStart: function () {
        $("#bdyload").addClass("loading");
    },
    ajaxStop: function () {
        $("#bdyload").removeClass("loading");
    }
});

var txtdate;
function ExcludeWeekEnd(value, checkbox, showdate, controller, method) {
    count = parseInt(value);
    txtdate = showdate;
    if (value > 0) {
        if ($(checkbox).prop('checked') == true) {

            stringifyCallback(
                controller,
                method,
                ExcludeWeekEndSuccess,
                fail,
                "Count",
                count
            );
        }
    }
}

function ExcludeWeekEndSuccess(data) {
    $(txtdate).val('')
    var date = new Date(parseInt(data.substr(6)));
    if (Object.prototype.toString.call(date) !== '[object Date]') {
        toastr.warning(data);
        return;
    }
    //var day = date.getDate();
    //var month = date.getMonth() + 1;
    //var year = date.getFullYear();
    $(txtdate).datepicker("setDate", date);
    //$(txtdate).datepicker("setDate", new Date(month + "/" + day + "/" + year));
    //$(txtdate).val(month + "/" + day + "/" + year);
}

function fail(errorMsg, status) {
    toastr.error("Error Message : " + errorMsg + " Error code : " + status);
}

function fn_Failure(errorMsg, status) {
    toastr.error("Error Message : " + errorMsg + " Error code : " + status);
}



function IncludeWeekEnd(value, checkbox, showdate, controll, method) {
    var count = parseInt(value);
    if (value > 0) {
        var todaydate = new Date();
        var date = new Date(todaydate.setDate(todaydate.getDate() + parseInt(count)));
        //var day = test.getDate();
        //var month = test.getMonth() + 1;
        //var year = test.getFullYear();
        $(showdate).datepicker("setDate", date);
        //$(showdate).val(month + "/" + day + "/" + year);
    }
}

function ExcludeHolidayList() {
    Callback(
         "Agents",
         "ExcludeHolidayList",
       ExcludeHolidayListSuccess,
         fail
         );
}

function ExcludeHolidayListSuccess(data) {
    $('#divmyModalExcludeHoliday').append('<h4><p>Weekends(Saturday and Sunday) will be excluded, along with the holidays listed below.</p></h4>')
    $('#divmyModalExcludeHoliday').append('<table id="dtmyModalExcludeHoliday" class="table"><tr"><th>Date</th><th>Day</th><th>Description</th></tr></table>');
    if (data != "") {
        for (var i = 0; i < data.length; i++) {
            $('#dtmyModalExcludeHoliday').append('<tr><td>' + data[i].Holiday + '</td><td>' + data[i].Day + '</td><td>' + data[i].HolidayDescription + '</td></tr>')
        }
    }
    else {
        $('#dtmyModalExcludeHoliday').append('<tr><td colspan="3" style="text-align:center"> No record found </td></tr>');
    }
}
function fnGetImageSuccess(data) {
    $(".imgCompany").attr("src", data[0].Image);
}

Callback("Users", "GetImage", fnGetImageSuccess, fail);

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}