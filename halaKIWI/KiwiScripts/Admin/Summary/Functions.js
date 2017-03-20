var dtaTable;
function fnGetAdminSummarySuccess(data) {
    console.log(data);

    //Top 5 Offers based on avail count
    fnTopAvailableOffers('tableresult1', data.result1);

    //Top 5 location with Highest Count of offers
    fnTopOffersLocations('tableresult2', data.result2);

    //Top 5 Restaurant with Highest Count of offers
    fnTopOfferRestaurants('tableresult3', data.result3);

    //Top 5 Offers based on avail count
    fnTopUsersCount('tableresult4', data.result4);
    //Total Restaurant Users
    //Total Mobile App users
}

function fnTopAvailableOffers(table,data) {
    var table = "#" + table;

    if (!data || !data.length) {
        $(table).html($("<div class=\"col-sx-12 col-sm-6 col-md-6 col-lg-6 client-img table-div\"><center><h2>No data found.</h2></center></div>"));
        return;
    }
    var columns = [], colind = 0;
    $.each(data[0], function (i, val) {
        if (colind == 0 || colind == 1 || colind == 2 || colind == 3 || colind == 4) { //Outlet Name
            columns.push(
                {
                    "title": "" + i,
                    "data": "" + i,
                    "render": function (data, type, row) {
                        return "<span class=\"moblie-align\">" + row[i] + "</span>";
                    },
                    "createdCell": function (row, data, index) {
                        $(row).attr('data-th', i);
                    }
                });
        } else {
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
        colind++;
    });

    if (dtaTable) {
        dtaTable.fnDestroy();
    }
    $(table).empty();
    dtaTable = $(table).dataTable({
        "data": data,
        "columns": columns,
        "createdRow": function (row, data, index) {
            row.setAttribute('data-userid', data.UserID);
        },
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false
    });

    $(table).removeClass("dataTable");
    $(table).find('thead th:eq(5)').addClass('text-center');

}

function fnTopOffersLocations(table, data) {
    console.log(data);
    var table = "#" + table;

    if (!data || !data.length) {
        $(table).html($("<div class=\"col-sx-12 col-sm-6 col-md-6 col-lg-6 client-img table-div\"><center><h2>No data found.</h2></center></div>"));
        return;
    }
    var columns = [], colind = 0;
    $.each(data[0], function (i, val) {
        if (colind == 0) { //Outlet Name
            columns.push(
                {
                    "title": "" + i,
                    "data": "" + i,
                    "render": function (data, type, row) {
                        return "<span class=\"moblie-align\">" + row[i] + "</span>";
                    },
                    "createdCell": function (row, data, index) {
                        $(row).attr('data-th', i);
                    }
                });
        } else {
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
        colind++;
    });

    if (dtaTable) {
        dtaTable.fnDestroy();
    }
    $(table).empty();
    dtaTable = $(table).dataTable({
        "data": data,
        "columns": columns,
        "createdRow": function (row, data, index) {
            row.setAttribute('data-userid', data.UserID);
        },
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false
    });

    $(table).removeClass("dataTable");
    $(table).find('thead th:eq(1)').addClass('text-center');
    $(table).find('thead th:eq(2)').addClass('text-center');
    $(table).find('thead th:eq(3)').addClass('text-center');
}

function fnTopOfferRestaurants(table, data) {
    console.log(data);
    var table = "#" + table;

    if (!data || !data.length) {
        $(table).html($("<div class=\"col-sx-12 col-sm-6 col-md-6 col-lg-6 client-img table-div\"><center><h2>No data found.</h2></center></div>"));
        return;
    }
    var columns = [], colind = 0;
    $.each(data[0], function (i, val) {
        if (colind == 0) { //Outlet Name
            columns.push(
                {
                    "title": "" + i,
                    "data": "" + i,
                    "render": function (data, type, row) {
                        return "<span class=\"moblie-align\">" + row[i] + "</span>";
                    },
                    "createdCell": function (row, data, index) {
                        $(row).attr('data-th', i);
                    }
                });
        } else {
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
        colind++;
    });

    if (dtaTable) {
        dtaTable.fnDestroy();
    }
    $(table).empty();
    dtaTable = $(table).dataTable({
        "data": data,
        "columns": columns,
        "createdRow": function (row, data, index) {
            row.setAttribute('data-userid', data.UserID);
        },
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false
    });

    $(table).removeClass("dataTable");
    $(table).find('thead th:eq(1)').addClass('text-center');
    $(table).find('thead th:eq(2)').addClass('text-center');
}

function fnTopUsersCount(table, data) {
    console.log(data);
    var table = "#" + table;

    if (!data || !data.length) {
        $(table).html($("<div class=\"col-sx-12 col-sm-6 col-md-6 col-lg-6 client-img table-div\"><center><h2>No data found.</h2></center></div>"));
        return;
    }
    var columns = [], colind = 0;
    $.each(data[0], function (i, val) {
        //if (colind == 0) { //Outlet Name
            columns.push(
                {
                    "title": "" + i,
                    "data": "" + i,
                    "render": function (data, type, row) {
                        return "<span class=\"moblie-align\">" + row[i] + "</span>";
                    },
                    "createdCell": function (row, data, index) {
                        $(row).attr('data-th', i).addClass('text-center');;
                    }
                });
    });

    if (dtaTable) {
        dtaTable.fnDestroy();
    }
    $(table).empty();
    dtaTable = $(table).dataTable({
        "data": data,
        "columns": columns,
        "createdRow": function (row, data, index) {
            row.setAttribute('data-userid', data.UserID);
        },
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false
    });

    $(table).removeClass("dataTable");
    $(table).find('thead th:eq(0)').addClass('text-center');
    $(table).find('thead th:eq(1)').addClass('text-center');
}