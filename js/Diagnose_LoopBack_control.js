var loop_back_page = {
    "length": 2,
    1: [
        ["loop_back_config_row", "arrLang[lang][\"LANG_LOOPBACK_TEST\"]", "2"],
        ["form", "loop_back_config_form", "action=\"/boaform/getASPdata/formLBD\" method=\"POST\"", "1"],
        ["switch", "B_enable", "arrLang[lang][\"LANG_ENABLE_LOOPBACK_DETECTION\"]", "enable"],
        ["text", "B_exist_period", "arrLang[lang][\"LANG_DETECTION_FRAME_INTERVAL\"]", "exist_period", "5"],
        ["text", "B_cancel_period", "arrLang[lang][\"LANG_RECOVER_FRAME_INTERVAL\"]", "cancel_period", "15"],
        ["text", "B_ether_type", "arrLang[lang][\"LANG_ETHERTYPE\"]", "ether_type", "4"],
        ["text", "B_vlans", "arrLang[lang][\"LANG_VLAN_ID_TITLE\"]", "vlans", "300"],
        ["submit", "loop_back_config_submit", loop_back_config_check]
    ],
    2: [
        ["loop_back_detect_table", "arrLang[lang]['LANG_PORT_LOOPBACK_DETECT_STATE']"],
        ["append", "<div class=\"table-responsive\">\
        <table class=\"table table-bordered table-striped\">\
        <thead>\
            <tr>\
                <th>" + arrLang[lang]["LANG_PORT"] + "</th>\
                <th>" + arrLang[lang]["LANG_STATUS"] + "</th>\
            </tr>\
        </thead>\
        <tbody id=\"loop_back_status\"></tbody>\
    </table>\
    </div>"],
    ]

}

function loop_back_config_check() {
    if ($("input[name='enable']").val() == "0")
        return true;
    if (!sji_checkdigitrange($("input[name='exist_period']").val(), 1, 60)) {
        MyAlert(arrLang[lang]["LANG_LOOPBACK_DETECTE_ERR_1"]);
        $("input[name='exist_period']").focus();
        return false;
    }
    if (!sji_checkdigitrange($("input[name='cancel_period']").val(), 10, 1800)) {
        MyAlert(arrLang[lang]["LANG_LOOPBACK_DETECTE_ERR_2"]);
        $("input[name='cancel_period']").focus();
        return false;
    }
    if (!sji_checkhex($("input[name='ether_type']").val(), 1, 4)) {
        MyAlert(arrLang[lang]["LANG_LOOPBACK_DETECTE_ERR_3"]);
        $("input[name='ether_type']").focus();
        return false;
    }
    if ($("input[name='vlans']").val().length <= 0) {
        MyAlert(arrLang[lang]["LANG_LOOPBACK_DETECTE_ERR_4"]);
        $("input[name='vlans']").focus();
        return false;
    }
    return true;
}

function text_tips_init() {
    $("#B_exist_period").prop("placeholder", "1~60");
    $("#B_cancel_period").prop("placeholder", "10~1800");
    $("#B_ether_type").prop("placeholder", "e.g: FFFA");
    $("#B_vlans").prop("placeholder", "e.g: 0,45,33");
}

function status_table_init() {
    $("#loop_back_status").empty();
    for (var key in loop_back_page_data) {
        if (key.indexOf("status") != -1) {
            var key_word;
            var key_value = loop_back_page_data[key];
            if (key_value == 0)
                key_word = arrLang[lang]["LANG_NO_LOOPBACK"];
            else if (key_value == 1)
                key_word = arrLang[lang]["LANG_LOOPBACK_DETECTE_RESULT_1"];
            else if (key_value == 2)
                key_word = arrLang[lang]["LANG_LOOPBACK_DETECTE_RESULT_2"];
            else
                key_word = arrLang[lang]["LANG_ERROR"];
            var LAN_NAME = parseInt(key.substring(key.indexOf("status") + 6)) + 1;
            LAN_NAME = "LAN" + LAN_NAME;
            $("#loop_back_status").append(
                "<tr>\
                    <td>" + LAN_NAME + "</td>\
                    <td>" + key_word + "</td>\
                </tr>"
            )
        }
    }
}

function Global_click_monitoring() {
    (function (s) {
        $(".container-fluid").on("click", function () {
            if ($("input[name='enable']").val() == "0") {
                $("#B_exist_period_Table,#B_cancel_period_Table,#B_ether_type_Table,#B_vlans_Table").parent("div").slideUp();
            } else {
                $("#B_exist_period_Table,#B_cancel_period_Table,#B_ether_type_Table,#B_vlans_Table").parent("div").slideDown();
            }
        })
        $(".container-fluid").click();
    })(jQuery);

}

var loop_back_page_data = {}

$(document).ready(function () {
    Auto_Page_generate(loop_back_page);
    text_tips_init();
    Add_Head_Tips("#loop_back_config_row", "VLAN ID " + arrLang[lang]["LANG_LOOPBACK_TEST_PAGE"]);
    Page_data_obj_init(loop_back_page_data, OneForAll("getASPdata/initLBDPage", 5, 0, 0, 0));
    set_obj_data_to_html(loop_back_page_data);
    status_table_init();
    Global_click_monitoring();
})
