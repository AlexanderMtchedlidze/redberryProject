$(document).ready(function () {
    $('#startDate').datepicker({
        format: "dd/mm/yyyy",
        autoclose: true
    }).on('changeDate', function (selectedDate) {
        var formattedDate = selectedDate.date.getDate() + "/" + (selectedDate.date.getMonth() + 1) + "/" + selectedDate.date.getFullYear();
        localStorage.setItem("startDate", formattedDate);
        localStorage.setItem("startDateValidation", true);
    });

    $('#endDate').datepicker({
        format: "dd/mm/yyyy",
        autoclose: true
    }).on('changeDate', function (selectedDate) {
        var formattedDate = selectedDate.date.getDate() + "/" + (selectedDate.date.getMonth() + 1) + "/" + selectedDate.date.getFullYear();
        localStorage.setItem("endDate", formattedDate);
        localStorage.setItem("endDateValidation", true);
    });
});