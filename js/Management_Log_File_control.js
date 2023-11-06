var Log_Page = {
    "length": 4,
    1: [
        ["System_log_row", "arrLang[lang]['LANG_SYSTEM_LOG'], ,arrLang[lang]['LANG_CONFIG']", "2"],
        ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_SYSLOG_CONFIGURATION_PAGE_1']"],
        ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_SYSLOG_CONFIGURATION_PAGE_2']"],
        ["form", "System_log_form", "action=\"/boaform/getASPdata/formSysLogConfig\" method=\"post\"", "1"],
        ["switch", "B_syslogEnable", "arrLang[lang][\"LANG_RECORD_TITLE\"]", "syslogEnable"],
        ["menu", "B_recordLevel", "arrLang[lang][\"LANG_RECORD_LEVEL_TITLE\"]", "recordLevel", [
            ["0", "Emergency"],
            ["1", "Alert"],
            ["2", "Critical"],
            ["3", "Error"],
            ["4", "Warning"],
            ["5", "Notice"],
            ["6", "Infomational"],
            ["7", "Debugging"],
        ]],
        ["menu", "B_dispLevel", "arrLang[lang][\"LANG_DISPLAY_LEVEL_TITLE\"]", "dispLevel", [
            ["0", "Emergency"],
            ["1", "Alert"],
            ["2", "Critical"],
            ["3", "Error"],
            ["4", "Warning"],
            ["5", "Notice"],
            ["6", "Infomational"],
            ["7", "Debugging"],
        ]],
        ["menu", "B_sysMode", "arrLang[lang][\"LANG_MODE\"]", "sysMode", [
            ["1", "Local"],
            ["2", "Remote"],
            ["3", "Both"],
        ]],
        ["text", "B_logAddr", "arrLang[lang][\"LANG_NAT_CONFIG_HELP_PAGE_VIRTUAL_6\"]", "logAddr"],
        ["text", "B_logPort", "arrLang[lang][\"LANG_SERVER_UDP_PORT_TITLE\"]", "logPort"],
        ["submit", "System_log_submit", check_remote]
    ],
    2: [
        ["Device_log_row", "arrLang[lang][\"LANG_DEVICE_LOG\"]"],
        ["append", "<div id='show_log'></div>"],
        ["append", "<div id='clr_and_savelog'></div>"],
    ],
    3: [
        ["show_log", 0],
        ["form", "showlog_form", "action=\"/boaform/getASPdata/sysLogList\" method=\"post\"", "1", , show_log_success],
        ["hidden", "target", "systemlog"],
        ["submit", "show_log_submit", show_flow_window_and_wait, "arrLang[lang][\"LANG_ACCESS_RECORDS\"]"],
    ],
    4: [
        ["clr_and_savelog", 0],
        ["form", "clr_and_savelog_form", "action=\"/boaform/getASPdata/formSysLog\" method=\"post\"", "1", , saveLog_success],
        ["hidden", "action", ""],
        ["append", "<div style=\"line-height:20px;\">&nbsp</div>"],
        ["submit", "clr_submit", check_action, "arrLang[lang]['LANG_CLEAR_RECORDS']"],
        ["append", "<div style=\"line-height:20px;\">&nbsp</div>"],
        ["submit", "saveLog_submit", check_action, "arrLang[lang]['LANG_DOWNLOAD_LOG']"],
    ],
}

var System_log_obj = {
    "1": "#B_recordLevel_Table,\
          #B_dispLevel_Table,\
          #B_sysMode_Table",
    "2": "#B_logAddr_Table,#B_logPort_Table",
}

function show_log_success(data) {
    if (data == "nolist") {
        $("#flow_waitingn").hide();
        $("#log_show").append(
            "<div class='animated fadeInUp log_show_alert'>" +
            arrLang[lang]['LANG_SYS_LOG_ALERT0'] +
            "</div>"
        )
    } else if (data.indexOf("=") != -1) {
        var tmp_obj = {};
        Page_data_obj_init(tmp_obj, data);
        for (var key in tmp_obj) {
            var tmp = tmp_obj[key].split("&");
            $("#log_list").append(
                "<tr>" +
                "<td>" + tmp[0] + "</td>" +
                "<td>" + tmp[1] + "</td>" +
                "<td>" + tmp[2] + "</td>" +
                "</tr>"
            )
        }
        $("#flow_waitingn").hide();
        $(".table-responsive").addClass("animated fadeInUp");
        $(".table-responsive").show();
    } else {
        $("#flow_waitingn").hide();
        $("#log_show").append(
            "<div class='animated fadeInUp log_show_alert'>" +
            arrLang[lang]['LANG_ERROR'] +
            "</div>"
        )
    }
}

function show_flow_window_and_wait() {
    var flow_Page = {
        id: "log_show",
        name: arrLang[lang]["LANG_SYSTEM_LOG"],
        width: "850px",
        height: "500px",
    }
    flow_table_generate(flow_Page);
    var flow_Page_waiting = {
        "length": 1,
        1: [
            ["log_show", 0],
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
            ["append", "<div class=\"table-responsive\" style='display:none;'>\
        <table class=\"table table-bordered table-striped\">\
        <thead>\
            <tr>\
                <th>" + arrLang[lang]["LANG_DATE_TIME"] + "</th>\
                <th>" + arrLang[lang]["LANG_SEVERITY"] + "</th>\
                <th>" + arrLang[lang]["LANG_INFO"] + "</th>\
            </tr>\
        </thead>\
        <tbody id=\"log_list\"></tbody>\
    </table>\
    </div>"],
        ]
    }
    Auto_Page_generate(flow_Page_waiting);
    setTimeout(function () {
        $("#waiting_animation").hide()
    }, 10);
    return true;
}

function saveLog_success(data) {
    if ($("input[name='action']").val() == "saveLog") {
        txtDownload(data);
        MyAlert(arrLang[lang]['LANG_DOWNLOAD_SUCCESS']);
    } else {
        MyAlert(arrLang[lang]['LANG_ERROR']);
    }
}

function check_remote() {
    if ($("input[name='syslogEnable']").val() == "1" && ($("input[name='sysMode']").val() == "2" || $("input[name='sysMode']").val() == "3")) {
        if (checkHostIP($("#B_logAddr"), 1) == false) {
            return false;
        }
        if (sji_checkdigitrange($("input[name='logPort']").val(), 1, 65535) == false) {
            $("input[name='logPort']").focus();
            MyAlert(arrLang[lang]["LANG_SERVER_UDP_PORT"] + " " + arrLang[lang]["LANG_IS_INVALID"]);
            return false;
        }
    }
    return true;
}

function check_action(tar) {
    if (tar.prop('id') == "clr_submit")
        $("input[name='action']").val("clr");
    else {
        $("input[name='action']").val("saveLog");
    }
    return true;
}

function Global_click_monitoring() {
    (function (s) {
        s(".container-fluid").on("click", function () {
            if (s("input[name='syslogEnable']").val() == "0") {
                $(System_log_obj["1"]).parent("div").slideUp();
                $(System_log_obj["2"]).parent("div").slideUp();
            } else {
                $(System_log_obj["1"]).parent("div").slideDown();
                if (s("input[name='sysMode']").val() == "2" || s("input[name='sysMode']").val() == "3") {
                    $(System_log_obj["2"]).parent("div").slideDown();
                } else {
                    $(System_log_obj["2"]).parent("div").slideUp();
                }
            }
        })
        s(".container-fluid").click();
    })(jQuery);
}

var System_log_page_data = {}
var LOG_PM;

function User_Config_Log_Page_init() {
    function change_status_error() {
        if (pm_user.user_log_enable.val()=="1") {
            MyAlert("Enable user log failed");
            pm_user.user_log_enable.val("0");
        } else {
            MyAlert("Disable user log failed");
            pm_user.user_log_enable.val("1");
        }
    }
    function change_status_success() {
        if (pm_user.user_log_enable.val()=="1") {
            MyAlert("User log switch to enable");
        } else {
            MyAlert("User log switch to disable");
        }
    }
    var user_log = "";

    function get_user_log_str(do_function) {
        var url = "/boaform/getASPdata/get_user_log"
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status === 200) {
                var blob = this.response;
                var reader = new FileReader();
                reader.readAsText(blob);
                reader.onload = function (e) {
                    user_log = reader.result;
                    do_function();
                }
            } else {
                return -1;
            }
        };
        xhr.send();
        return 0;
    }

    var pm_user = APG.new([
        ["User_Config_Log_Page", "User Log", "2"],
        ["form", "user_log_status_change", "action=\"/boaform/getASPdata/from_user_log_status\" method=\"POST\"", "1", change_status_success, change_status_error],
        ["switch", "user_log_enable", "User Log Enable", "user_log_enable"],
        ["button", "show_user_log", "Show User Log", "btn-info", "margin-bottom:10px;margin-top:10px"],
        ["button", "down_load_user_log", "Download User Log", , "margin-bottom:10px;"],
    ]);
    var log_status = {};
    Page_data_obj_init(log_status, getASPdata("get_user_log_status"));
    set_obj_data_to_html(log_status);

    $("#user_log_enable").on("change", function() {
        $("#waiting_animation").fadeIn("fast");
        $.ajaxSettings.async = true;
        $("#user_log_status_change").submit();
    });

    APG.new_flow({
        id: "show_user_log_page",
        name: "User Log",
        width: "850",
        click: $("#show_user_log"),
        click_page: [
            ["append", "<div id='current_user_log' class=\"table-striped\"></div>"],
        ],
        init_method: function () {
            get_user_log_str(function(){
                var nl_log = user_log.split("\n");
                var user_log_obj = {};
                var line_num = 0
                for (i in nl_log) {
                    var time_str = nl_log[i].match(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/);
                    var info = nl_log[i].match(/ :: (.*)/);
                    var ip = nl_log[i].match(/IP\[([^ ]*)\]/);
                    var user_name = nl_log[i].match(/Username\[([^ ]*)\]/);
                    if (time_str != undefined && info != undefined) {
                        user_log_obj["log_" + line_num] = {
                            ["time"]: time_str[0],
                            ["info"]: info[1],
                            ["ip"]: (ip!=undefined?ip[1]:""),
                            ["user_name"]: (user_name!=undefined?user_name[1]:""),
                        }
                        line_num++;
                    }
                }
                APG.new_tbl({
                    "direction": "0",
                    "selector": $("#current_user_log"),
                    "header": ["Time", "IP", "Username", "Info"],
                    "contain": ["time", "ip", "user_name", "info"],
                    "origin": user_log_obj,
                    "origin_key_word": "log_",
                });
            });
        }
    });

    $("#down_load_user_log").on("click", function(){
        get_bin_file("/boaform/getASPdata/get_user_log", "User_Log.txt");
    });
}


$(document).ready(function () {
    LOG_PM = Auto_Page_generate(Log_Page);    
    Page_data_obj_init(System_log_page_data, OneForAll("getASPdata/get_System_log_Page_data", 5, 0, 0, 0));
    set_obj_data_to_html(System_log_page_data);
    if (System_log_obj.sysMode == undefined) {
        $("#B_sysMode_Table").hide();
        $("#B_logAddr_Table").hide();
        $("#B_logPort_Table").hide();
    }
    if (System_log_page_data.logAddr == "0.0.0.0" && System_log_page_data.logPort == "0") {
        LOG_PM.logPort.val("514");
    }
    Global_click_monitoring();
    if (!g_page_attr.no_web_user_log)
      User_Config_Log_Page_init();
});
