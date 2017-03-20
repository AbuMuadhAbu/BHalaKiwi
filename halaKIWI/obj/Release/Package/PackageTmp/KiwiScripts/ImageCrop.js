
$(document).ready(function () {

    function SaveImageResizeSuccess(data) {

    }
    function popupResult(result) {
        var html;
        if (result.html) {
            html = result.html;
        }
        if (result.src) {
            $("#resullt").append('<img src="' + result.src + '" />');
        }
        Callback("ImageResize", "SaveImageResize", SaveImageResizeSuccess, fail, "Ia", result.src);
    }
    $w = $('.basic-width');
    $h = $('.basic-height');
        basic = $('#demo-basic').croppie({
            viewport: {
                width: 100,
                height: 100
            },
            boundary: {
                width: 300,
                height: 300
            }
        });
    basic.croppie('bind', {
        url: '/Upload/Gallery/1041968291.jpg',
        points: [77, 469, 280, 739]
    });

    $('.basic-result').on('click', function () {
        var w = parseInt($w.val(), 10),
            h = parseInt($h.val(), 10), s
        size = 'viewport';
        if (w || h) {
            size = { width: w, height: h };
        }
        basic.croppie('result', {
            type: 'canvas',
            size: size
        }).then(function (resp) {
            popupResult({
                src: resp
            });
        });
    });
})
