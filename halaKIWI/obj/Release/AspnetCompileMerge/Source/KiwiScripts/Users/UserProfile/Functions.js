function fnGetUserProfileSuccess(data) {
    //$(".imgCompany").attr("src", "data:image/png;base64," + data[0].Image);
    $("#txtCompanyName").val(data[0].CompanyName);
    $("#txtOutletName").val(data[0].CompanyName);
    $("#txtEmailID").val(data[0].EmailID);
    $("#txtIndividualEmailID").val(data[0].EmailID);
    $("#txtFirstName").val(data[0].FirstName);
    $("#txtLastName").val(data[0].LastName);
    $("#txtDesignation").val(data[0].Designation);
    $("#txtCompanyPhoneNo").val(data[0].CompanyPhoneNo);
    $("#txtIndividualPhoneNo").val(data[0].CompanyPhoneNo);
    $("#txtRestaurantName").val(data[0].RestaurantName);
    if ($("#txtRole").val() != 2) {
        var arraycusine = data[0].CusineType.split(',');
        $("#txtCusineType").val(arraycusine);
        $("#txtCusineType").multiselect("refresh");
        $('#txtCusineType').multiselect('disable');
    }
  
    $("#txtAddress1").val(data[0].CompanyAddress1);
    $("#txtAddress2").val(data[0].CompanyAddress2);
    $("#txtCity").val(data[0].City);
    $("#txtZipCode").val(data[0].ZipCode);
    $("#txtCompnayDescription").val(data[0].CompanyDescription);
    $(".disabled").attr('disabled', true);

    $(".gllpLatitude").val(data[0].Lattitude);
    $(".gllpLongitude").val(data[0].Longitude);

    if (data[0].Lattitude != 0) {
        setTimeout(function () {
            $(".gllpLatlonPicker").each(function () {
                $(document).gMapsLatLonPicker().init($(this));
            });
        }, 1000);
    }

}

function fn_SaveUserDetailsSuccess(data) {
    toastr.success('Saved Successfully');
}
function fnGetUploadImageSuccess(data) {
    $("#demo-basic").empty();
    $('#uploadimage-popup').modal('hide')
    $(".imgCompany").attr("src", data[0].Image);
    if (data[0].Image == "/Upload/Profiles/1465079314.png") {
        $('#hrefEdit').text("Upload");
    }
    else {
        $('#hrefEdit').text("Change Logo");
    }
}


function fnGetCusineSuccess(data) {
    Callback("Users", "GetUserProfile", fnGetUserProfileSuccess, fail)
    $.each(data, function (key, value) {
        $("#txtCusineType").append($("<option></option>").val(value.CusineID).html(value.Cusine));
    });
    $('#txtCusineType').multiselect({
        onChange: function (option, checked) {
            // Get selected options.
            var selectedOptions = $('#txtCusineType option:selected');

            if (selectedOptions.length >= 4) {
                // Disable all other checkboxes.
                var nonSelectedOptions = $('#txtCusineType option').filter(function () {
                    return !$(this).is(':selected');
                });

                nonSelectedOptions.each(function () {
                    var input = $('input[value="' + $(this).val() + '"]');
                    input.prop('disabled', true);
                    input.parent('li').addClass('disabled');
                });
            }
            else {
                // Enable all checkboxes.
                $('#txtCusineType option').each(function () {
                    var input = $('input[value="' + $(this).val() + '"]');
                    input.prop('disabled', false);
                    input.parent('li').addClass('disabled');
                });
            }
        }
    });

}
