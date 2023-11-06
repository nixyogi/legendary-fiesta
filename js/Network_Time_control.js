var Time_Page = {};

function Time_Page_list_init() {
    Time_Page = {
        "length": 1,
        1: [
            ["Time_Page_row", "arrLang[lang][\"LANG_TIMER_CONFIG\"]", "2"],
            ["tips", "div", "class='tips_font' id='Time_tips'", arrLang[lang]["LANG_CURRENT_TIME"] + " | " + Time_page_data["time_tips"]],
            ["form", "Time_form", "action=\"/boaform/getASPdata/formTimezone\" method=\"POST\"", "1", Time_tip_reload],
            ["switch", "ntp_enabled", "arrLang[lang][\"LANG_ENABLE_SNTP_CLIENT_UPDATE\"]", "ntpEnabled"],
            ["menu", "tmzone_choose", "arrLang[lang][\"LANG_TIME_ZONE_SELECT\"]", "tmzone", time_zone_choose_init()],
            ["switch", "dst_enabled", "arrLang[lang][\"LANG_ENABLE_DAYLIGHT_SAVING_TIME\"]", "dstEnabled"],
            ["menu", "ntp_server_host_1", "NTP ,arrLang[lang][\"LANG_PRIMARY\"],arrLang[lang][\"LANG_TIME\"],arrLang[lang][\"LANG_SERVER\"]", "ntpServerHost1", [
                ["time.windows.com", "time.windows.com"],
                ["time.nist.gov", "time.nist.gov"],
                ["clock.fmt.he.net", "clock.fmt.he.net"],
                ["clock.nyc.he.net", "clock.nyc.he.net"],
                ["clock.sjc.he.net", "clock.sjc.he.net"],
                ["clock.via.net", "clock.via.net"],
                ["ntp1.tummy.com", "ntp1.tummy.com"],
                ["time.cachenetworks.com", "time.cachenetworks.com"],
                ["time.google.com", "time.google.com"],
                ["time1.google.com", "time1.google.com"],
                ["Other", "Other"],
            ]],
            ["text", "ntp_other_server_1", "", "ntpServerOther1", "29"],
            ["menu", "ntp_server_host_2", "NTP ,arrLang[lang][\"LANG_STANDBY\"],arrLang[lang][\"LANG_TIME\"],arrLang[lang][\"LANG_SERVER\"]", "ntpServerHost2", [
                ["", "none"],
                ["time.windows.com", "time.windows.com"],
                ["time.nist.gov", "time.nist.gov"],
                ["clock.fmt.he.net", "clock.fmt.he.net"],
                ["clock.nyc.he.net", "clock.nyc.he.net"],
                ["clock.sjc.he.net", "clock.sjc.he.net"],
                ["clock.via.net", "clock.via.net"],
                ["ntp1.tummy.com", "ntp1.tummy.com"],
                ["time.cachenetworks.com", "time.cachenetworks.com"],
                ["time.google.com", "time.google.com"],
                ["time1.google.com", "time1.google.com"],
                ["Other", "Other"],
            ]],
            ["text", "ntp_other_server_2", "", "ntpServerOther2", "29"],
            ["menu", "synchronizing_type", "arrLang[lang][\"LANG_SYNCHRONIZING_TYPE\"]", "if_type", [
                ["0", "INTERNET"],
                ["1", "VOICE"],
                ["2", "TR069"],
                ["3", "Other"],
            ]],
            ["menu", "wan_syn_choose", "arrLang[lang][\"LANG_SYNCHRONIZING_WAN_INTERFAVE\"]", "if_wan", wan_syn_choose_init()],
            ["text", "syn_interval", "arrLang[lang][\"LANG_INTERVAL\"]", "interval", "8"],
            ["submit", "Time_Page_Submit", check_Time_Page_row]
        ],
    };
}

var syn_type_map = {
    "0": "INTERNET",
    "1": "VOICE",
    "2": "TR069",
    "3": "Other",
}

function Global_click_monitoring() {
    (function (s) {
        s(".container-fluid").on('click', function (e) {
            if (s("input[name='ntpServerHost1']").val() == "Other" && $("input[name='ntpEnabled']").val() == "1") {
                s("#ntp_other_server_1_Table").parent("div").slideDown();
            } else {
                s("#ntp_other_server_1_Table").parent("div").slideUp();
            }
            if (s("input[name='ntpServerHost2']").val() == "Other" && $("input[name='ntpEnabled']").val() == "1") {
                s("#ntp_other_server_2_Table").parent("div").slideDown();
            } else {
                s("#ntp_other_server_2_Table").parent("div").slideUp();
            }
            s(".wan_syn_choose").each(function (e) {
                if ($(this).text().indexOf(syn_type_map[$("input[name='if_type']").val()]) == -1) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            })
            if ($("input[name='ntpEnabled']").val() == "0") {
                $("input[name='ntpEnabled']").parents("table").parent("div").nextAll().slideUp();
                $("input[name='ntpEnabled']").parents("table").parent("div").nextAll().find("input").attr("disabled", true);
            } else {
                $("input[name='ntpEnabled']").parents("table").parent("div").nextAll().each(function () {
                    if ($(this).children("table").prop("id") != "ntp_other_server_1_Table" && $(this).children("table").prop("id") != "ntp_other_server_2_Table") {
                        $(this).slideDown();
                    }
                })
                $("input[name='ntpEnabled']").parents("table").parent("div").nextAll().find("input").attr("disabled", false);
            }
        })

        s(".synchronizing_type").on('click', function (e) {
            setTimeout(function () {
                $(".wan_syn_choose").each(function (e) {
                    if ($(this).css("display") != "none") {
                        $(this).click();
                        return false;
                    } else {
                        if (e == $(".wan_syn_choose").length - 1) {
                            $("#wan_syn_choose_Link").text("");
                            $("input[name='if_wan']").val("");
                        }
                    }
                });
            }, 50);
        })
    })(jQuery);
    $(".ntp_server_host_1").each(function (e) {
        if ($(this).attr("value") != $("input[name='ntpServerHost1']").val()) {
            if ($(this).attr("value") == "Other") {
                $("input[name='ntpServerOther1']").val($("input[name='ntpServerHost1']").val());
                $(this).click();
            }
        } else {
            return false;
        }
    })
    $(".ntp_server_host_2").each(function (e) {
        if ($(this).attr("value") != $("input[name='ntpServerHost2']").val()) {
            if ($(this).attr("value") == "Other") {
                $("input[name='ntpServerOther2']").val($("input[name='ntpServerHost2']").val());
                $(this).click();
            }
        } else {
            return false;
        }
    })

    $(".container-fluid").click();
}

function Time_tip_reload() {
    Page_data_obj_init(Time_page_data, OneForAll("getASPdata/Network_Time_Page_init", 5, 0, 0, 0));
    $("#Time_tips").text(Time_page_data["time_tips"]);
}

function check_Time_Page_row() {
    if ($("input[name='ntpEnabled']").val() == "1") {
        if ($("input[name='ntpServerHost1']").val() == "Other") {
            if ($("input[name='ntpServerOther1']").val().length == 0) {
                MyAlert(arrLang[lang]["LANG_NTP_SERVER_OTHER1"]);
                $("input[name='ntpServerOther1']").focus();
                return false;
            }
            if (sji_checkntp_host($("input[name='ntpServerOther1']").val())) {
                MyAlert(arrLang[lang]["LANG_ILLEGAL_CHARACTER"]);
                $("input[name='ntpServerOther1']").focus();
                return false;
            }
        }
        if ($("input[name='ntpServerHost2']").val() == "Other") {
            if ($("input[name='ntpServerOther2']").val().length == 0) {
                MyAlert(arrLang[lang]["LANG_NTP_SERVER_OTHER2"]);
                $("input[name='ntpServerOther2']").focus();
                return false;
            }
            if (sji_checkntp_host($("input[name='ntpServerOther2']").val())) {
                MyAlert(arrLang[lang]["LANG_ILLEGAL_CHARACTER"]);
                $("input[name='ntpServerOther2']").focus();
                return false;
            }
        }
        if ($("input[name='interval']").val() == 0) {
            MyAlert(arrLang[lang]["LANG_INTERVAL_SHOULD_NOT_BE_0"]);
            $("input[name='interval']").focus();
            return false;
        }
        if (!sji_checknum($("input[name='interval']").val())) {
            MyAlert(arrLang[lang]["LANG_ILLEGAL_CHARACTER"]);
            $("input[name='interval']").focus();
            return false;
        }
    }
    return true;
}

function time_zone_choose_init() {
    var data = OneForAll("getASPdata/timeZoneList", 5, 0, 0, 0);

    if (data == "nolist") {
        return [];
    }
    var data_split = data.split("\n");
    var menu = [];
    for (var i in data_split) {
        var temp = data_split[i];
        if (temp.indexOf("=") != -1) {
            var temp_split = temp.split("=");
            var name = temp_split[0];
            var value = temp_split[1];
            menu.push([value, name]);
        }
    }
    return menu;
}

function wan_syn_choose_init() {
    var data = OneForAll("getASPdata/get_wan_name_list", 5, 0, 0, 0);
    if (data == "nolist") {
        return [];
    }
    var data_split = data.split("\n");
    var menu = [];
    for (var i in data_split) {
        var temp = data_split[i];
        if (temp.indexOf("&") != -1) {
            var temp_split = temp.split("&");
            var name = temp_split[0];
            var value = temp_split[1];
            menu.push([value, name]);
        }
    }
    return menu;
}

var Time_page_data = {};

$(document.ready).ready(function () {
    Page_data_obj_init(Time_page_data, OneForAll("getASPdata/Network_Time_Page_init", 5, 0, 0, 0));
    Time_Page_list_init();
    Auto_Page_generate(Time_Page);
    set_obj_data_to_html(Time_page_data);
    Global_click_monitoring();
});
