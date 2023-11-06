var Diagnose_Net_Page = {
    "length": 6,
    1: [
        ["Diagnose_Net_row", "arrLang[lang]['LANG_NETWORK_DIAGNOSTICS']"],
        ["append", "<div id='first_place'></div>"],
        ["append", "<div id='second_place'></div>"],
        ["append", "<div id='third_place'></div>"],
        ["append", "<div id='tr069_place'></div>"],
    ],
    2: [
        ["first_place", 0],
        ["form", "Diagnose_Net_form", "action=\"/boaform/getASPdata/formPing\" method=\"POST\"", "1", , Diagnose_getting_reault],
        ["text", "B_target_addr", "arrLang[lang][\"LANG_DESTINATION_ADDRESS\"]", "target_addr", "60"],
        ["menu", "B_waninf", "arrLang[lang][\"LANG_WAN_INTERFACE\"]", "waninf", interface_menu_init()],
        ["append", "<div style=\"line-height:20px;\">&nbsp</div>"],
        ["submit", "go_ping_submit", Diagnose_action, "arrLang[lang]['LANG_PING_TEST']"],
        ["append", "<div style=\"line-height:20px;\">&nbsp</div>"],
        ["submit", "go_tracert_submit", Diagnose_action, "arrLang[lang]['LANG_TRACERT_TEST']"],
    ],
    3: [
        ["second_place", 0],
        ["form", "go_ping_form", "action=\"/boaform/getASPdata/dumpPingInfo\" method=\"POST\"", "1", , get_ping_result],
    ],
    4: [
        ["third_place", 0],
        ["form", "go_tracert_form", "action=\"/boaform/getASPdata/dumpTraceInfo\" method=\"POST\"", "1", , get_tracert_result],
    ],
    5: [
        ["Upload_status_tr069_row", "arrLang[lang]['LANG_TR069_INFORM']"],
        ["form", "Upload_status_tr069_form", "action=\"/boaform/getASPdata/formTr069Diagnose\" method=\"post\"", "1", , upload_status_process],
        ["submit", "Upload_status_tr069_submit", start_upload_status, "arrLang[lang]['LANG_TR069_INFORM']"],
    ],
    6: [
        ["tr069_place", 0],
        ["form", "tr069_place_form", "action=\"/boaform/getASPdata/get_tr069_upload_status\" method=\"POST\"", "1", , upload_status_process],
    ]
};

function upload_status_process(data) {
    if (data == "LANG_INFORMING") {
        $("#result_place2").empty();
        $("#result_place2").append(arrLang[lang][data]);
        $("#result_place2").addClass("animated fadeInUp");
        $("#result_place2").show();
        setTimeout(function () {
            $("#result_place2").removeClass("fadeInUp");
            $("#result_place2").addClass("fadeOutUp");
            setTimeout(function () {
                $("#result_place2").hide();
                $("#result_place2").removeClass("fadeOutUp");
                if ($("#result_place2").length != 0)
                    $("#tr069_place_form").submit();
            }, 500);
        }, 1500);
    } else {
        $("#result_place2").empty();
        $("#result_place2").append(arrLang[lang][data]);
        $("#result_place2").addClass("animated fadeInUp");
        $("#result_place2").show();
    }
}

function start_upload_status() {
    var flow_Page = {
        id: "upload_status_show",
        name: arrLang[lang]["LANG_RESULT"],
        width: "300px",
        height: "300px",
    }
    flow_table_generate(flow_Page);
    var flow_Page_waiting = {
        "length": 1,
        1: [
            ["upload_status_show", 0],
            ["append", "<div id='result_place2' style='display:none;text-align: center;'></div>"],
        ]
    }
    Auto_Page_generate(flow_Page_waiting);
    setTimeout(function () {
        $("#waiting_animation").hide()
    }, 10);
    return true;
}

function interface_menu_init() {
    var data = OneForAll("getASPdata/get_ALL_rt_interface_name", 5, 0, 0, 0);
    var tmp_menu_obj = {};
    var menu = [
		["1", "None"]
	  ];
    if (data.indexOf("=") == -1) {
        return menu;
    }
    Page_data_obj_init(tmp_menu_obj, data);
    for (var key in tmp_menu_obj) {
        menu.push([tmp_menu_obj[key], tmp_menu_obj[key]]);
    }
    return menu;
}

function Diagnose_action(tar) {
    var action = tar.prop("id");
    if (action == "go_ping_submit") {
        $("#Diagnose_Net_form").prop("action", "/boaform/getASPdata/formPing");
    } else if (action == "go_tracert_submit") {
        $("#Diagnose_Net_form").prop("action", "/boaform/getASPdata/formTracert");
    } else {
        MyAlert(arrLang[lang]["LANG_ERROR"]);
        return false;
    }

    return true;
}

function get_tracert_result(data) {
    $("#result_place").empty();
    if (data == "LANG_PLEASE_WAIT") {
        if ($("#ping_result_show").length != 0) {
            setTimeout(function () {
                $("#go_tracert_form").submit();
            }, 500);
        }
    } else if (data.indexOf("ERR") != -1) {
        MyAlert(arrLang[lang]["LANG_PING_TEST_FAILED"]);
        $(".layui-layer-close2").click();
    } else {
        var reg = new RegExp('\n', "g");
        data = data.replace(reg, "<br>");
        data = data.replace("!H", "!H<br>");
        $("#flow_waitingn").hide();
        $("#result_place").append(data);
        $("#result_place").addClass("animated fadeInUp");
        $("#result_place").show();
    }
}

function get_ping_result(data) {
    $("#result_place").empty();
    if (data == "LANG_PLEASE_WAIT") {
        if ($("#ping_result_show").length != 0) {
            setTimeout(function () {
                $("#go_ping_form").submit();
            }, 500);
        }
    } else if (data.indexOf("FAILED") != -1) {
        MyAlert(arrLang[lang]["LANG_PING_TEST_FAILED"]);
        $(".layui-layer-close2").click();
    } else {
        var reg = new RegExp('\n', "g");
        data = data.replace(reg, "<br>");


        $("#flow_waitingn").hide();
        $("#result_place").append(data);
        $("#result_place").addClass("animated fadeInUp");
        $("#result_place").show();
    }
}

function Diagnose_getting_reault(data) {
    if (data == "GO_PING") {
        $("#go_ping_form").submit();
    } else if (data == "GO_TRACERT") {
        $("#go_tracert_form").submit();
    } else {
        MyAlert(arrLang[lang][data]);
        return;
    }
    var flow_Page = {
        id: "ping_result_show",
        name: arrLang[lang]["LANG_RESULT"],
        width: "500px",
        height: "400px",
    }
    flow_table_generate(flow_Page);
    var flow_Page_waiting = {
        "length": 1,
        1: [
            ["ping_result_show", 0],
            ["append", "<div id=\"flow_waitingn\">\
                <div class=\"sk-spinner sk-spinner-cube-grid\">\
                    <div class=\"sk-cube\"></div>\
                    <div class=\"sk-cube\"></div>\
                    <div class=\"sk-cube\"></div>\
                    <div class=\"sk-cube\"></div>\
                    <div class=\"sk-cube\"></div>\
                    <div class=\"sk-cube\"></div>\
                    <div class=\"sk-cube\"></div>\
                    <div class=\"sk-cube\"></div>\
                    <div class=\"sk-cube\"></div>\
            </div>\
        </div>"],
            ["append", "<div id='result_place' style='display:none;text-align: center;'></div>"],
        ]
    }
    Auto_Page_generate(flow_Page_waiting);
    setTimeout(function () {
        $("#waiting_animation").hide()
    }, 10);
}

$(document).ready(function () {
    Auto_Page_generate(Diagnose_Net_Page);
    $(".B_waninf").click();
})
