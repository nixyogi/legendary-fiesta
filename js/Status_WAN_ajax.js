$(document.ready).ready(function () {

    var target = "";
    var result;
    var res_split;
    var res_db_split;
    var res_id;
    var res_text;
    $(".ajaxData_Text").each(function (index, element) {
        if ($(this).css("display") != "none") {
            target = target + $(this).prop("id") + "&";
        }
    });


    target = "/boaform/getinfo/" + target;
    $.ajaxSettings.async = false;
    $.get(target, function (data, status) {
        result = data;
    });
    if (result) {
        res_split = result.split("&");
        for (var i = 0; i < res_split.length; i++) {
            res_db_split = res_split[i].split("=");
            res_id = "#" + res_db_split[0];
            res_text = res_db_split[1];

            $(res_id).text(res_text);
        }
    }
});
