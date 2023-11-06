var method_name_map = {
    "port_status": "PORT_DIAG",
    "wan_status": "WAN_CONNECT_DIAG",
    "sys_status": "SYS_STATUS_DIAG",
    "pon_status": "PON_DIAG",
    "wan_params": "WAN_PARAMS_DIAG",
    "dns_status": "INTERNET_CONNECT_DIAG",
    "dhcp_config": "LAN_CONFIG_DIAG",
    "pppoe_status": "PPPoE_DIAG",
    "route_status": "ROUTE_DIAG",
    "dhcp_status": "DHCP_DIAG",
}
var page_map = {};
var page_map_tcpdump = {};
var vs_diag_msg = "";

function download_pcap_init() {
    $("#tcpdump_tools").remove();
    var data = {};
    Page_data_obj_init(data, getData("/boaform/getASPdata/tcpdump_status"));

    function menu_init() {
        var option = [
            ["0", "Any"],
        ];
        for (var key in data) {
            if (key.indexOf("VID") != -1) {
                option.push([data[key], key]);
            }
        }
        return option;
    }

    var page = {
        "length": 1,
        1: [
            ["tcpdump_tools", arrLang[lang]["LANG_CAPTURE_PACKETS_ON_WAN"], 2],
            ["tips", "h6", "class='tips_font'", "arrLang[lang]['CAPUTURE_INSTRUCTION1']"],
            ["tips", "h6", "class='tips_font'", "arrLang[lang]['CAPUTURE_INSTRUCTION2']"],
            ["tips", "h6", "class='tips_font'", "arrLang[lang]['CAPUTURE_INSTRUCTION3']"],
            ["form", "tcpdump_form", "action=\"/boaform/getASPdata/tcpdump_process\" method=\"post\"", "1", refresh_page, fail_process],
            ["btn-group", "tcpdump_mode", arrLang[lang]["LANG_CAPTURE_MODE"], "tcpdump_mode", [
                [0, arrLang[lang]["LANG_COUNT"]],
                [1, arrLang[lang]["LANG_ROTATE"]],
            ]],
            ["menu", "interface_choose", arrLang[lang]["LANG_INTERFACE"], "tcpdump_ifIndex", menu_init()],
            ["hidden", "tcpdump_action", "0"],
            ["submit", "B_tcpdump_submit", check_option, "", "btn-info"],
            ["append", "<div class='empty_0' style='height:20px;display:none;'></div>"],
            ["button", "tcpdump_start", arrLang[lang]["LANG_START"]],
            ["button", "tcpdump_stop", arrLang[lang]["LANG_END"], "btn-danger"],
            ["append", "<div class='empty_2' style='height:20px;display:none;'></div>"],
            ["button", "tcpdump_download", arrLang[lang]["LANG_DOWNLOAD_CAPTURE_FILE"], "btn-info"],
        ]
    }

    page_map_tcpdump = Auto_Page_generate(page);

    $("#B_tcpdump_submit_Table").hide();
    $("#tcpdump_start").hide();
    $("#tcpdump_stop").hide();
    $("#tcpdump_download").hide();
    if (data.status == 0) {
        $(".empty_0").show();
        $("#tcpdump_start").show();
    } else if (data.status == 1) {
        $(".empty_0").show();
        $("#tcpdump_stop").show();
    } else if (data.status == 2) {
        $(".empty_0").show();
        $(".empty_2").show();
        $("#tcpdump_start").show();
        $("#tcpdump_download").show();
    }
    set_obj_data_to_html(data);

    $("#tcpdump_start").on("click", function () {
        page_map_tcpdump.tcpdump_action.val("1");
        $("#B_tcpdump_submit").click();
    })

    $("#tcpdump_stop").on("click", function () {
        page_map_tcpdump.tcpdump_action.val("0");
        $("#B_tcpdump_submit").click();
    })

    $("#tcpdump_download").on("click", function () {
        if (data.status != 2)
            return;
        page_map_tcpdump.tcpdump_ifIndex.val(data.tcpdump_ifIndex);
        get_bin_file("/boaform/getASPdata/tcpdump_download", page_map_tcpdump.tcpdump_ifIndex.val("-name") + "_capture.tar");
    })

    function check_option() {
        return true;
    }

    function refresh_page() {
        download_pcap_init();
        conflict_prevent();
    }

    function fail_process(msg) {
        MyAlert(msg);
    }

    FMask_init();
}

function wlan_cap_init() {
    var is_download_avaliable = 0;
    function return_true() { return true; }
    function fresh_action() {
        var data = {};
        Page_data_obj_init(data, getData("/boaform/getASPdata/wlan_capture_status"));
        if (data.status == -1) {
            $("#wlan_cap").hide();
            return;
        }
        $(".empty_3").hide();
        $(".empty_4").hide();
        $("#wlan_cap_start").hide();
        $("#wlan_cap_stop").hide();
        $("#wlan_cap_download").hide();
        is_download_avaliable = 0;
        if (data.status == 0) {
            $(".empty_3").show();
            $("#wlan_cap_start").show();
        } else if (data.status == 1) {
            $(".empty_3").show();
            $("#wlan_cap_stop").show();
        } else if (data.status == 2) {
            $(".empty_3").show();
            $(".empty_4").show();
            $("#wlan_cap_start").show();
            $("#wlan_cap_download").show();
            is_download_avaliable = 1;
        } else {
            $("#wlan_cap").hide();
        }
    }

    var page = {
        "length": 1,
        1: [
            ["wlan_cap", arrLang[lang]["LANG_WLAN_FRAME_CAP"], 2],
            ["form", "wlan_mframe_cap_form", "action=\"/boaform/getASPdata/wlan_capture_form\" method=\"post\"", "1", fresh_action],
            ["menu", "wlan_capture_type", arrLang[lang]["LANG_CAP_TYPE"], "w_capture_type", [
                [0, arrLang[lang]["LANG_MANAGE_FRAME"]],
            ]],
            ["hidden", "wlan_capture_action", "0"],
            ["submit", "B_wlan_cap", return_true, "", "btn-info"],
            ["append", "<div class='empty_3' style='height:20px;display:none;'></div>"],
            ["button", "wlan_cap_start", arrLang[lang]["LANG_START"]],
            ["button", "wlan_cap_stop", arrLang[lang]["LANG_END"], "btn-danger"],
            ["append", "<div class='empty_4' style='height:20px;display:none;'></div>"],
            ["button", "wlan_cap_download", arrLang[lang]["LANG_DOWNLOAD_CAPTURE_FILE"], "btn-info"],
        ]
    }

    var PM_CAP = Auto_Page_generate(page);
    PM_CAP.w_capture_type.val("0");
    $("#wlan_capture_type_Link").addClass("disabled");
    $("#B_wlan_cap").hide();
    $("#wlan_cap_start").hide();
    $("#wlan_cap_stop").hide();
    $("#wlan_cap_download").hide();
    fresh_action();

    $("#wlan_cap_start").on("click", function () {
        PM_CAP.wlan_capture_action.val("1");
        $("#B_wlan_cap").click();
    });

    $("#wlan_cap_stop").on("click", function () {
        PM_CAP.wlan_capture_action.val("0");
        FMask_init();
        $("#B_wlan_cap").click();
    });

    $("#wlan_cap_download").on("click", function () {
        if (!is_download_avaliable)
            return;
        get_bin_file("/boaform/getASPdata/wlan_cap_download", "wlan.cap");
    });

    FMask_init();
}

function diag_page_init() {
    var page = {
        "length": 1,
        1: [
            ["diagPageRow", "arrLang[lang]['LANG_SELF_DIAGNOSE']", 2],
            ["form", "selfDiagForm", "action=\"/boaform/getASPdata/self_diagnose\" method=\"post\"", "1", , str_result_process],
            ["hidden", "method", ""],
            ["hidden", "action", ""],
            ["hidden", "result", ""],
            ["hidden", "diag_type", ""],
            ["append", "<div id='diag_space'></div>"],
            ["append", "<div class = 'div_space' style='height:20px; display:none;'></div>"],
            ["submit", "selfDiagStart", start_click_action, "arrLang[lang]['LANG_DIAGNOSTICS'], ,arrLang[lang]['LANG_START']", "btn-primary"],
            ["append", "<div class = 'div_space' style='height:20px; display:none;'></div>"], //Add by fyy 20210806
            ["button", "saveLog_btn", arrLang[lang]['LANG_DOWNLOAD_LOG'], "btn-info"], //Add by fyy 20210809
            ["append", "<div id = 'fix_space' style='height:20px; display:none;'></div>"], //Add by fyy 20210806
            ["button", "fix_btn", arrLang[lang]['EXECUTE_REPAIR'], "btn-success"], //Add by fyy 20210809
        ]
    }
    page_map = Auto_Page_generate(page);

    $("#saveLog_btn_Table").hide(); //Add by fyy 20210809
    $("#saveLog_btn").on("click", function () { //Add by fyy 20210809
        get_bin_file("/boaform/getASPdata/diag_log_download", "diag_log.tar"); //Modified by hyj for bugs#4350
    });

    $("#fix_space").hide();
    $("#fix_btn_Table").hide();
    $("#fix_btn").on("click", function () {
        $(".div_space").hide();
        $("#saveLog_btn_Table").hide();
        $("#selfDiagStart_Table").hide();
        $("#fix_space").hide();
        $("#fix_btn_Table").hide();
        page_map.diag_type.val("fix");
        $("#selfDiagForm").submit();
        $("#waiting_animation").fadeOut("fast");
    });
    FMask_init();
}

function result_tips_word_find() {
    var key_word = page_map.method.val() + "-" + page_map.action.val() + "-" + page_map.result.val();
    var key_word_map = {
        "port_status-2-1": "LANG_CHECK_PORT_CONNECT",
    }
    if (key_word_map[key_word] == undefined)
        return "";
    return arrLang[lang][key_word_map[key_word]];
}

function str_result_process(data) {
    var data_list = {};
    data = data.replace(/\?/g, "<br>");
    data = data.replace(/\t/g, "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp");
    data = data.replace(/ /g, "&nbsp");
    Page_data_obj_init(data_list, data);
    switch (page_map.diag_type.val()) {
        case "diag":
            if (page_map.method.val().length != 0) {
                if (data_list.vs_diag_msg != undefined) {
                    vs_diag_msg = data_list.vs_diag_msg;
                    vs_diag_msg = highlight_key_word(vs_diag_msg);
                    diag_action.result();
                }
                if (data_list.method == "end") {
                    $(".div_space").show(); //Add by fyy 20210809
                    $("#saveLog_btn_Table").slideDown(); //Add by fyy 20210809
                    $("#selfDiagStart_Table").slideDown();
                    diag_action.fix_check();
                    break;
                }
            }
            set_obj_data_to_html(data_list);
            diag_action.load();
            break;
        case "fix":
            if (page_map.method.val().length != 0) {
                if (data_list.vs_diag_msg != undefined) {
                    vs_diag_msg = data_list.vs_diag_msg;
                    vs_diag_msg = highlight_key_word(vs_diag_msg);
                    diag_action.result();
                }
                if (data_list.method == "end") {
                    $(".div_space").show();
                    $("#saveLog_btn_Table").slideDown();
                    $("#selfDiagStart_Table").slideDown();
                    break;
                }
            }
            set_obj_data_to_html(data_list);
            diag_action.load();
            break;
        case "fix_check":
            if (data_list.fix_check == 1) {
                $("#fix_space").show();
                $("#fix_btn_Table").show();
            }
            break;
    }
    conflict_prevent();
    return;
}

function start_click_action() {
    $(".div_space").hide(); //Add by fyy 20210809
    $("#saveLog_btn_Table").hide(); //Add by fyy 20210809
    $("#fix_space").hide();
    $("#fix_btn_Table").hide();
    vs_diag_msg = "";
    $("#diag_space").empty();
    $("#selfDiagStart_Table").hide();
    $("#waiting_animation").fadeOut("fast");
    page_map.method.val("");
    page_map.diag_type.val("diag");
    if ((page_map.action.val() != "2" && page_map.action.val() != "3") && page_map.method.val().length != 0)
        return false;
    return true;
}

function highlight_key_word(str) {
    str = str.replace(/\[error[&nbsp]*\]/g, "[<span style='font-family: consolas;color:rgb(231, 74, 59)'>error&nbsp&nbsp</span>]");
    str = str.replace(/\[warn[&nbsp]*\]/g, "[<span style='font-family: consolas;color:rgb(255, 214, 111)'>warn&nbsp&nbsp&nbsp</span>]");
    str = str.replace(/\[success[&nbsp]*\]/g, "[<span style='font-family: consolas;color:rgb(40, 167, 69)'>success</span>]");
    str = str.replace(/\[normal[&nbsp]*\]/g, "[<span style='font-family: consolas;color:rgb(40, 167, 69)'>normal&nbsp</span>]");
    return str;
}

function set_icon_status() {
    var id = page_map.method.val() + page_map.diag_type.val();
    if (vs_diag_msg.indexOf(">error") != -1) {
        icon_status.error($("#" + id + "-icon"));
        return;
    }
    if (vs_diag_msg.indexOf(">warn") != -1) {
        icon_status.warn($("#" + id + "-icon"));
        return;
    }
    if (vs_diag_msg.indexOf(">normal") != -1) {
        icon_status.normal($("#" + id + "-icon"));
        return;
    }
    if (vs_diag_msg.indexOf(">success") != -1) {
        icon_status.normal($("#" + id + "-icon"));
        return;
    }
    icon_status.hold($("#" + id + "-icon"));
    return;
}

function result_fold() {
    var id = page_map.method.val() + page_map.diag_type.val();
    const tar = $("#" + id);
    const result = $("#" + id + "-result");
    tar.on("click", function () {
        if (result.css("display") == "none")
            result.slideDown();
        else
            result.slideUp();
    });
    return;
}

diag_action = {
    load: function () {
        var id = page_map.method.val() + page_map.diag_type.val();
        //Add by fyy for bug#0004482
        if (id.length == 0) {
            $("#selfDiagForm").submit();
            $("#waiting_animation").fadeOut("fast");
            return;
        }
        //End of fyy
        if (page_map.method.val().length == 0) {
            MyAlert("Diagnose is forbidden, please wait for one minute");
            return;
        }

        var action_word = "";
        if (page_map.diag_type.val() == "fix")
            action_word = "(Repair)";
        $("#diag_space").append("\
        <div id=\"" + id + "\" class='item_place justhover'>\
            <div style='margin:0 auto;'>\
                <div style='display:inline-block;font-weight:bold'>" + L(method_name_map[page_map.method.val()]) + action_word + "</div>\
                    <div style='float:right;display:inline'>\
                        <i id=\"" + id + "-icon" + "\" class='fas fa-fw fa-minus-circle' style='color: rgb(137, 137, 138);'></i>\
                    </div>\
                </div>\
            <div style='text-align:center'></div>\
            <div id=\"" + id + "-result" + "\" class='item_place2' style='display:none'></div>\
        </div>");
        icon_status.running($("#" + id + "-icon"));
        $("#selfDiagForm").submit();
        $("#waiting_animation").fadeOut("fast");
    },
    result: function () {
        var str_result = "";
        var id = page_map.method.val() + page_map.diag_type.val();
        var tar = $("#" + id + "-result");
        if ((str_result = result_tips_word_find()).length != 0) {
            tar.text(str_result);
        } else {
            tar.append(vs_diag_msg);
            set_icon_status();
        }
        result_fold();
    },
    fix_check: function () {
        page_map.diag_type.val("fix_check");
        page_map.method.val("");
        page_map.action.val("");
        page_map.result.val("");
        $("#selfDiagForm").submit();
        $("#waiting_animation").fadeOut("fast");
    },

    stop: function () {

    },
}

var icon_status = {
    hold: function (tar) {
        tar.removeClass();
        tar.addClass("fas fa-fw fa-minus-circle");
        tar.css("color", "rgb(137 137 138)");
    },
    running: function (tar) {
        tar.removeClass();
        tar.addClass("fas fa-fw fa-spinner spinning");
        tar.css("color", "#3a3b45");
    },
    warn: function (tar) {
        tar.removeClass();
        tar.addClass("fas fa-fw fa-exclamation-circle");
        tar.css("color", "#ffd66f");
    },
    error: function (tar) {
        tar.removeClass();
        tar.addClass("fas fa-fw fa-times-circle");
        tar.css("color", "#e74a3b");
    },
    normal: function (tar) {
        tar.removeClass();
        tar.addClass("fas fa-fw fa-check-circle");
        tar.css("color", "#28a745");
    }
}

function conflict_prevent() {
    if ($("#selfDiagStart_Table").css("display") == "none")
        page_map_tcpdump.tcpdump_start.disabled();
    else
        page_map_tcpdump.tcpdump_start.enable();
    if ($("#tcpdump_start").css("display") == "none")
        page_map.selfDiagStart.disabled();
    else
        page_map.selfDiagStart.enable();
}

function oam_omci_log_page() {
    function reflash_data() {
        var obj = {};
        Page_data_obj_init(obj, getASPdata("get_pon_debug_status"));
        set_obj_data_to_html(obj);
    }
    var log_page = {
        "length": 1,
        1: [
            ["oam_omci_log_page", arrLang[lang]["LANG_PON_AUTH_LOG"], 2],
            ["tips", "h6", "class='tips_font'", arrLang[lang]["LANG_PON_AUTH_LOG_TIPS1"]],
            ["tips", "h6", "class='tips_font'", arrLang[lang]["LANG_PON_AUTH_LOG_TIPS2"]],
            ["tips", "h6", "class='tips_font'", arrLang[lang]["LANG_PON_AUTH_LOG_TIPS3"]],
            ["form", "oam_omci_log_form", "action=\"/boaform/getASPdata/set_pon_debug_status\" method=\"post\"", "1", reflash_data, reflash_data],
            ["switch", "pon_dbug", "PON Debug", "pon_debug_status"],
            ["submit", "oam_omci_log_submit"],
        ]
    }

    Auto_Page_generate(log_page);
    reflash_data();

}

function serial_log_download_page_init() {
    var serial_log_enable = getData("/boaform/getASPdata/get_serial_log_enable");
    if (serial_log_enable!=null && serial_log_enable.indexOf("enable")!=-1) {
        APG.new([
            ["serial_log_download", arrLang[lang]["LANG_SERIAL_LOG"], "2"],
            ["form", "clear_serial_log", "action=\"/boaform/getASPdata/clear_serial_log\" method=\"post\"", "1"],
            ["button", "sure_clear_serial_log", L("LANG_CLEAR_SERIAL_LOG")],
            ["button", "download_serial_log", arrLang[lang]["LANG_DOWNLOAD_LOG"], , "margin-top: 20px;"],
        ]);
        $("#download_serial_log").on("click", function () {
            get_bin_file("/boaform/getASPdata/serial_log_download", "serial_log.txt");
        });
        $("#sure_clear_serial_log").on("click", function () {
            swal({
                title: arrLang[lang]["LANG_CLEAR_SERIAL_LOG"] + "?",
                icon: "info",
                buttons: true,
            })
                .then((sure) => {
                    if (sure) {
                        $("#clear_serial_log").submit();
                    }
                });
        });
    }
}

$(document).ready(function () {
    diag_page_init();
    serial_log_download_page_init();
    oam_omci_log_page();
    if (g_page_attr.no_wifi6)
        wlan_cap_init();
    download_pcap_init();
    conflict_prevent();
})
