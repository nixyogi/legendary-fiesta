function CONFIG_PAGE_INIT() {
    MAC_CONFIG_DATA = {}
    $("#MAC_FILTER_CONFIG_ROW").remove();
    Page_data_obj_init(MAC_CONFIG_DATA, OneForAll("getASPdata/rteMacFilterStatus", 5, 0, 0, 0))
    var config_page = {
        "length": 1,
        1: [
            ["MAC_FILTER_CONFIG_ROW", "arrLang[lang]['LANG_MAC_FILTERING']", "2"],
            ["form", "MAC_FILTER_CONFIG_FORM", "action=\"/boaform/getASPdata/formRteMacFilter\" method=\"POST\"", "1"],
            ["tips", "h6", "class='tips_font'", "arrLang[lang]['LANG_WHITE_LIST_COMMENT']"],
            ["switch", "MAC_ENABLE", "arrLang[lang]['LANG_MAC_FILTER_ENABLE']", "EnableMac"],
            ["menu", "Filter_Mode", "arrLang[lang]['LANG_FILTER_MODE']", "macFilterMode", [
                ["0", "arrLang[lang]['LANG_BLACK_LIST']"],
                ["1", "arrLang[lang]['LANG_WHITE_LIST']"],
            ]],
            ["append", "<br>"],
            ["submit", "MAC_config_submit"]
        ]
    }
    MAC_CONFIG_PM = Auto_Page_generate(config_page);
    set_obj_data_to_html(MAC_CONFIG_DATA);
    if (MAC_CONFIG_DATA.EnableMac == "0") {
        MAC_CONFIG_PM.macFilterMode.val("0");
    }
    $("#MAC_FILTER_CONFIG_ROW").on("click", function () {
        if (MAC_CONFIG_PM.EnableMac.val() == "0") {
            MAC_CONFIG_PM.macFilterMode.body(0);
        } else {
            MAC_CONFIG_PM.macFilterMode.body(1);
        }
    })
    $("#MAC_FILTER_CONFIG_ROW").click();
}

function MAC_TBL_INIT() {
    MAC_TBL_DATA = {}
    $("#MAC_TBL_ROW").remove();
    Page_data_obj_init(MAC_TBL_DATA, OneForAll("getASPdata/rteMacFilterList", 5, 0, 0, 0))
    var MAC_tbl_page = {
        "length": 1,
        1: [
            ["MAC_TBL_ROW", "arrLang[lang]['LANG_FILTER_RULE_LIST']"],
            ["form", "MAC_TBL_Form", "action=\"/boaform/getASPdata/formRteMacFilter\" method='POST'", "1", MAC_TBL_INIT],
            ["tips", "h6", "class='tips_font'", "arrLang[lang]['LANG_THE_MAXIMUM_NUMBER_OF_ENTRIES_ARE_16']"],
            ["tips", "h6", "class='tips_font'", "arrLang[lang]['LANG_MAC_FILTER_ADD_TIPS']"],
            ["btn-group", "Mac_type_choose_to_show", "arrLang[lang]['LANG_FILTER_MODE']", "mac_type", [
                ["0", "arrLang[lang]['LANG_BLACK_LIST']"],
                ["1", "arrLang[lang]['LANG_WHITE_LIST']"],
            ]],
            ["append", "<br>"],
            ["append", "<div class=\"table-responsive\">\
            <table class=\"table table-bordered table-striped\">\
            <thead>\
                <tr>\
                    <th>" + "MAC " + arrLang[lang]['LANG_ADDRESS'] + "</th>\
                </tr>\
            </thead>\
            <tbody id=\"MAC_LIST\"></tbody>\
        </table>\
        </div>"],
            ["hidden", "Mac_Addr", ""],
            ["hidden", "action", "rm"],
            ["append", "<div>\
            <div style=\"display: inline;\"><button type=\"button\" id=\"MAC_Add\" action=\"addRoute\" class=\"btn btn-primary btn-round\">" + arrLang[lang]["LANG_ADD"] + "</button></div>\
            <div style=\"display: inline;\"><button type=\"button\" id=\"MAC_DEL\" class=\"btn btn-danger btn-round\">" + arrLang[lang]["LANG_DELETE_SELECTED"] + "</button></div>\
        </div>"],
        ]
    }
    MAC_TBL_PM = Auto_Page_generate(MAC_tbl_page);
    MAC_TBL_PM.mac_type.val(MAC_CONFIG_PM.macFilterMode.val());
    for (var key in MAC_TBL_DATA) {
        if (key.indexOf("index") != -1)
            MAC_TBL_DATA[key] = nest_obj_init(MAC_TBL_DATA[key]);
    }
    var index = 0;
    if (MAC_TBL_DATA["list_num"] != "0") {
        for (var key in MAC_TBL_DATA) {
            if (key.indexOf("index") != -1) {
                if (MAC_TBL_DATA[key]["mac_type"] == MAC_TBL_PM.mac_type.val()) {
                    $("#MAC_LIST").append("<tr class=\"justhover\"><td></td></tr>");
                    $("#MAC_LIST").find("tr").eq(index).children("td").text(MAC_TBL_DATA[key]["Mac_Addr"]);
                    index++;
                }
            }
        }
    }
    $("#MAC_LIST").find(".justhover").on("click", function () {
        var flag = $(this).hasClass("td_select");
        $("#MAC_LIST").find(".justhover").removeClass("td_select");
        if (flag) {
            $(this).addClass("td_select");
        }
        $("input[name='Mac_Addr']").val("");
        $(this).toggleClass("td_select");
        if ($(this).hasClass("td_select")) {
            $("input[name='Mac_Addr']").val($(this).children("td").text());
        }
    })
    $("#MAC_DEL").on("click", function () {
        if ($("input[name='Mac_Addr']").val().length == 0) {
            swal_check_warning("input[name='Mac_Addr']", arrLang[lang]['LANG_PLEASE_SELECT_AN_ENTRY_TO_DELETE']);
            return;
        }
        $.ajaxSettings.async = true;
        $("#waiting_animation").show();
        $("#MAC_TBL_Form").submit();
    })
    $("#MAC_Add").on("click", function () {
        flow_window_show();
    })
    $(".Filter_Mode").off("click", synbtn);
    $(".Filter_Mode").on("click", synbtn)
    MAC_TBL_PM.mac_type.op("all").on("click", function () {
        setTimeout(function () {
            MAC_CONFIG_PM.macFilterMode.val(MAC_TBL_PM.mac_type.val());
            MAC_TBL_INIT();
        }, 50);
    })
    FMask_init();
}

function synbtn() {
    if (MAC_CONFIG_PM.macFilterMode.val() == "1") {
        MAC_TBL_PM.mac_type.val("1");
        MAC_TBL_INIT();
    } else {
        MAC_TBL_PM.mac_type.val("0");
        MAC_TBL_INIT();
    }
}

function flow_window_show() {
    var flow_Page = {
        id: "MAC_flow_page",
        name: "MAC " + arrLang[lang]["LANG_ADD"],
        width: "500px",
        height: "300px",
    }
    var flow_auto_page = {
        "length": 1,
        1: [
            ["MAC_flow_page", 0],
            ["form", "MAC_Flow_TBL_Form", "action=\"/boaform/getASPdata/formRteMacFilter\" method='POST'", "1", after_flow_success],
            ["hidden", "action", "ad"],
            ["text", "MAC_INPUT", "MAC", "Mac_Addr", "17", "placeholder=\"MAC e.g:00-11-22-33-44-55\""],
            ["hidden", "mac_type", MAC_TBL_PM.mac_type.val()],
            ["append", "<br>"],
            ["submit", "Flow_Page_submit", MAC_check]
        ]
    }
    flow_table_generate(flow_Page);
    Auto_Page_generate(flow_auto_page);
    FMask_init();
}

function after_flow_success() {
    MAC_TBL_INIT();
    $(".layui-layer-close2").click();
}

function MAC_check() {
    var MAC = $("#MAC_flow_page").find("input[name='Mac_Addr']").val();
    if (MAC.length == 0) {
        swal_check_warning("input[name='Mac_Addr']", arrLang[lang]["LANG_INVALID_MAC_ADDR_SHOULD_NOT_EMPTY"]);
        return false;
    }
    if (!sji_checkmac(MAC)) {
        swal_check_warning("input[name='Mac_Addr']", "MAC " + arrLang[lang]['LANG_IS_INVALID']);
        return false;
    }
    if (check_mac_exist(MAC)) {
        swal_check_warning("input[name='Mac_Addr']", arrLang[lang]['LANG_RULE_ALREADY_EXISTS']);
        return false;
    }
    if (MAC_TBL_DATA.list_num == "16") {
        swal_check_warning("input[name='Mac_Addr']", arrLang[lang]['LANG_THE_MAXIMUM_NUMBER_OF_ENTRIES_ARE_16'])
        return false;
    }
    return true;
}

function check_mac_exist(mac_input) {
    console.log("mac_input : " + mac_input);
    for (var key in MAC_TBL_DATA) {
        if (key.indexOf("index") != -1) {
            if (MAC_TBL_DATA[key].mac_type == MAC_TBL_PM.mac_type.val()) {
                console.log("MAC_TBL_DATA[key].Mac_Addr : " + MAC_TBL_DATA[key].Mac_Addr);
                if (MAC_TBL_DATA[key].Mac_Addr == mac_input)
                    return true;
            }
        }
    }
    return false;
}

var MAC_TBL_PM;
var MAC_CONFIG_PM;
var MAC_CONFIG_DATA = {}
var MAC_TBL_DATA = {}
$(document).ready(function () {
    CONFIG_PAGE_INIT();
    MAC_TBL_INIT();
})
