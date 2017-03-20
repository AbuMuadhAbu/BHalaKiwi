jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "currency-pre": function (a) {
        a = (a === "-") ? 0 : a.replace(/[^\d\-\.]/g, "");
        return parseFloat(a);
    },

    "currency-asc": function (a, b) {
        return a - b;
    },

    "currency-desc": function (a, b) {
        return b - a;
    }
});


jQuery.fn.dataTableExt.oSort['numeric-comma-asc'] = function (a, b) {
    var x = (a == "-") ? 0 : a.replace(/,/g, "");
    var y = (b == "-") ? 0 : b.replace(/,/g, "");
    x = parseFloat(x);
    y = parseFloat(y);
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
};

jQuery.fn.dataTableExt.oSort['numeric-comma-desc'] = function (a, b) {
    var x = (a == "-") ? 0 : a.replace(/,/g, "");
    var y = (b == "-") ? 0 : b.replace(/,/g, "");
    x = parseFloat(x);
    y = parseFloat(y);
    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
};