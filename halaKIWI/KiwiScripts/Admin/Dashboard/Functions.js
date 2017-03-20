
function fnGetAdminDashboardSuccess(data) {
    console.log(data);

    function createChart() {
        $("#dvchart").kendoChart({
            title: {
                text: "Active and InActive Users & Offers"
            },
            legend: {
                position: "bottom"
            },
            seriesDefaults: {
                type: "column"
                
            },
            dataSource: {
                data: data.result1,
            },
            seriesColors: ["#cd1533", "#d43851", "#dc5c71", "#e47f8f", "#eba1ad",
                           "#009bd7", "#26aadd", "#4db9e3", "#73c8e9", "#99d7ef"],
            series:  [{ name: "Active", field: "Active", color: "#b4d848" }, { name: "InActive", field: "InActive", color: "#4897d8" }],
            categoryAxis: {
                field: "RoleName",
                majorGridLines: {
                    visible: false
                }
            },
            valueAxis: {
                line: {
                    visible: false
                },
                labels: {
                    template: "#=value#"
                }
            },
            tooltip: {
                visible: true
            }
        });
    }

    $(document).ready(createChart);
    $(document).bind("kendo:skinChange", createChart);


    function createChart1() {
        $("#dvRestaurant").kendoChart({
            title: {
                text: "Top 5 Restaurant Offers Live and Completed"
            },
            legend: {
                position: "bottom"
            },
            seriesDefaults: {
                type: "column"

            },
            dataSource: {
                data: data.result3,
            },
            seriesColors: ["#cd1533", "#d43851", "#dc5c71", "#e47f8f", "#eba1ad",
                           "#009bd7", "#26aadd", "#4db9e3", "#73c8e9", "#99d7ef"],
            series: [{ name: "TotalLiveOffers", field: "TotalLiveOffers", color: "#b4d848" }, { name: "TotalCompletedOffers", field: "TotalCompletedOffers", color: "#4897d8" }],
            categoryAxis: {
                field: "RestaurantName",
                majorGridLines: {
                    visible: false
                }
            },
            valueAxis: {
                line: {
                    visible: false
                },
                labels: {
                    template: "#=value#"
                }
            },
            tooltip: {
                visible: true
            }
        });
    }

    $(document).ready(createChart1);
    $(document).bind("kendo:skinChange", createChart1);



    function createChart2() {
        $("#dvBranch").kendoChart({
            title: {
                text: "Top 5 BranchArea Offers Live and Completed"
            },
            legend: {
                position: "bottom"
            },
            seriesDefaults: {
                type: "column"

            },
            dataSource: {
                data: data.result2,
            },
            seriesColors: ["#cd1533", "#d43851", "#dc5c71", "#e47f8f", "#eba1ad",
                           "#009bd7", "#26aadd", "#4db9e3", "#73c8e9", "#99d7ef"],
            series: [{ name: "TotalLiveOffers", field: "TotalLiveOffers", color: "#b4d848" }, { name: "TotalCompletedOffers", field: "TotalCompletedOffers", color: "#4897d8" }],
            categoryAxis: {
                field: "BranchArea",
                majorGridLines: {
                    visible: false
                }
            },
            valueAxis: {
                line: {
                    visible: false
                },
                labels: {
                    template: "#=value#"
                }
            },
            tooltip: {
                visible: true
            }
        });
    }

    $(document).ready(createChart2);
    $(document).bind("kendo:skinChange", createChart2);






    function createChart3() {
        $("#dvMobile").kendoChart({
            title: {
                text: "Top 5 Mobile Users Offers Claimed"
            },
            legend: {
                position: "bottom"
            },
            seriesDefaults: {
                type: "column"

            },
            dataSource: {
                data: data.result4,
            },
            seriesColors: ["#cd1533", "#d43851", "#dc5c71", "#e47f8f", "#eba1ad",
                           "#009bd7", "#26aadd", "#4db9e3", "#73c8e9", "#99d7ef"],
            series: [{ name: "TotalOffersClaimed", field: "TotalOffersClaimed", color: "#b4d848" }],
            categoryAxis: {
                field: "Name",
                majorGridLines: {
                    visible: false
                }
            },
            valueAxis: {
                line: {
                    visible: false
                },
                labels: {
                    template: "#=value#"
                }
            },
            tooltip: {
                visible: true
            }
        });
    }

    $(document).ready(createChart3);
    $(document).bind("kendo:skinChange", createChart3);
}