var Adv_NAT_Config_Page = {};

function Adv_NAT_Config_Page_init() {
    Adv_NAT_Config_Page = {
        "length": 3,
        1: [
            ["Adv_NAT_ALG_row", "arrLang[lang][\"LANG_ALG\"]", "2"],
            ["form", "ALG_Config_form", "action=\"/boaform/getASPdata/formALGOnOff\" method=\"POST\"", "1", Server_Add_success],
            ["switch", "B_ftp_algonoff", "ftp", "ftp_algonoff"],
            ["switch", "B_tftp_algonoff", "tftp", "tftp_algonoff"],
            ["switch", "B_h323_algonoff", "h323", "h323_algonoff"],
            ["switch", "B_rtsp_algonoff", "rtsp", "rtsp_algonoff"],
            ["switch", "B_l2tp_algonoff", "l2tp", "l2tp_algonoff"],
            ["switch", "B_ipsec_algonoff", "ipsec", "ipsec_algonoff"],
            ["switch", "B_sip_algonoff", "sip", "sip_algonoff"],
            ["switch", "B_pptp_algonoff", "pptp", "pptp_algonoff"],
            ["hidden", "apply", "1"],
            ["submit", "ALG_Config_Submit"]
        ],
        2: [
            ["Adv_NAT_DMZ_row", "arrLang[lang][\"LANG_NAT_DMZ_HOST\"]", "2"],
            ["form", "DMZ_form", "action=\"/boaform/getASPdata/formDMZ\" method=\"POST\"", "1", Server_Add_success],
            ["switch", "B_dmzcap", "arrLang[lang][\"LANG_DMZ_HOST_TITLE\"]", "dmzcap"],
            ["text", "B_ip", "arrLang[lang][\"LANG_DMZ_IP_ADDRESS_TITLE\"]", "ip", "15"],
            ["submit", "DMZ_Submit", check_dmz_ip]
        ],
        3: [
            ["Adv_NAT_Virtual_Server_row", "arrLang[lang][\"LANG_NAT_VIRTUAL_SERVER_CONFIGURATION\"]", "2"],
            ["form", "Virtual_Server_list_form", "action=\"/boaform/admin/formVrtsrv\" method=\"post\"", "1", Server_Add_success],
            ["hidden", "action", "delete"],
            ["append", "<div class=\"table-responsive\">\
            <table class=\"table table-bordered table-striped\">\
            <thead>\
                <tr>\
                    <th>" + arrLang[lang]["LANG_SERVER_NAME"] + "</th>\
                    <th>" + arrLang[lang]["LANG_EXTERNAL_IP_ADDRESS"] + "</th>\
                    <th>" + arrLang[lang]["LANG_EXTERNAL_START_PORT"] + "</th>\
                    <th>" + arrLang[lang]["LANG_EXTERNAL_END_PORT"] + "</th>\
                    <th>" + arrLang[lang]["LANG_PROTOCOL"] + "</th>\
                    <th>" + arrLang[lang]["LANG_SERVER_IP_ADDR"] + "</th>\
                    <th>" + arrLang[lang]["LANG_SOURCE_PORT"] + "</th>\
                </tr>\
            </thead>\
            <tbody id=\"Virtual_Server_List\"></tbody>\
        </table>\
        </div>"],
            ["append", "<div>\
        <div style=\"display: inline;\"><button type=\"button\" id=\"Virtual_Server_Add\" action=\"addRoute\" class=\"btn btn-primary btn-round\">" + arrLang[lang]["LANG_ADD"] + "</button></div>\
        <div style=\"display: inline;\"><button type=\"button\" id=\"Virtual_Server_Del\" class=\"btn btn-danger btn-round\">" + arrLang[lang]["LANG_DELETE_SELECTED"] + "</button></div>\
    </div>"]
        ]
    }
}

function check_dmz_ip() {
    if ($("input[name='dmzcap']").val() == "1") {
        if (!checkHostIP($("input[name='ip']"), 1)) {
            return false;
        }
    }
    return true;
}

function Global_event_monitor() {
    (function (s) {
        s(".container-fluid").on("click", function () {
            if (s("input[name='dmzcap']").val() == "1") {
                s("#B_ip_Table").parent("div").slideDown();
            } else {
                s("#B_ip_Table").parent("div").slideUp();
            }
        })
        s("#Virtual_Server_Del").on("click", function (e) {
            $("#waiting_animation").show();
            $.ajaxSettings.async = true;
            s("#Virtual_Server_list_form").submit();
        });
        s(".container-fluid").click();
    })(jQuery);
}

var Virtual_Server_Page_data = {};

function Virtual_Server_List_init() {
    for (var key in Virtual_Server_Page_data) {
        delete Virtual_Server_Page_data[key];
    }
    $("#Virtual_Server_List").empty();
    var protoType_key = {
        "4": "TCP/UDP",
        "1": "TCP",
        "2": "UDP"
    }
    Page_data_obj_init(Virtual_Server_Page_data, OneForAll("getASPdata/virtualSvrList", 5, 0, 0, 0));
    for (var key in Virtual_Server_Page_data) {
        if (key.indexOf("rml") != -1) {
            var tmp = Virtual_Server_Page_data[key];
            var value_split = tmp.split("&");
            $("#Virtual_Server_List").append(
                "<tr class=\"justhover\">" +
                "<td>" + value_split[0] + "</td>" +
                "<td>" + value_split[1] + "</td>" +
                "<td>" + value_split[2] + "</td>" +
                "<td>" + value_split[3] + "</td>" +
                "<td>" + protoType_key[value_split[4]] + "</td>" +
                "<td>" + value_split[5] + "</td>" +
                "<td>" + value_split[6] + "</td>" +
                "<td style=\"display:none;\">" + "<input type=\"hidden\" name=\"" + key + "\">" + "</td>" +
                "</tr>");
        }
    }
    (function (s) {
        s(".justhover").on("click", function () {
            s(this).toggleClass("td_select");
            if (s(this).hasClass("td_select")) {
                s(this).find("input").val("1");
            } else {
                s(this).find("input").val("0");
            }
        })
    })(jQuery)
}

function Virtual_Server_Add_Config_window_init() {
    var data = {
        id: "Virtual_Server_Page_Add",
        name: arrLang[lang]["LANG_NAT_VIRTUAL_SERVER_CONFIGURATION"],
    }

    var Add_Page = {
        "length": 1,
        1: [
            ["Virtual_Server_Page_Add", 0],
            ["form", "Virtual_Server_Add_form", "action=\"/boaform/admin/formVrtsrv\" method=\"post\"", "1", Server_Add_success],
            ["text", "Server_Name", arrLang[lang]["LANG_SERVER_NAME"], "cusSrvName"],
            ["text", "External_IP_Addr", arrLang[lang]["LANG_EXTERNAL_IP_ADDRESS"], "remotehost"],
            ["text", "External_start_port", arrLang[lang]["LANG_EXTERNAL_START_PORT"], "wanStartPort"],
            ["text", "External_end_port", arrLang[lang]["LANG_EXTERNAL_END_PORT"], "wanEndPort"],
            ["menu", "Protocol_type", arrLang[lang]["LANG_PROTOCOL"], "protoType", [
                ["4", "TCP/UDP"],
                ["1", "TCP"],
                ["2", "UDP"],
            ]],
            ["text", "Server_IP_Addr", arrLang[lang]["LANG_SERVER_IP_ADDR"], "serverIp"],
            ["text", "Server_Port", arrLang[lang]["LANG_SOURCE_PORT"], "lanPort"],
            ["hidden", "vrtenable", "1"],
            ["hidden", "action", "add"],
            ["submit", "Add_submit", Server_Add_check, "arrLang[lang][\"LANG_ADD\"]"]
        ]
    };

    (function (s) {
        s("#Virtual_Server_Add").on("click", function () {
            flow_table_generate(data);
            Auto_Page_generate(Add_Page);
            FMask_init();
            set_obj_data_to_html({
                "protoType": "1"
            });
        })
    })(jQuery);
}

function Server_Add_check() {
    if (sji_checkstrnor($("input[name='cusSrvName']").val(), 1, 60) == false) {
        $("input[name='cusSrvName']").focus();
        MyAlert(arrLang[lang]["LANG_SERVER_NAME"] + " " + arrLang[lang]["LANG_IS_INVALID"]);
        return false;
    }
    if ($("input[name='remotehost']").val().length!=0 && sji_checkvip($("input[name='remotehost']").val()) == false) {
        $("input[name='remotehost']").focus();
        MyAlert(arrLang[lang]["LANG_EXTERNAL_IP_ADDRESS"] + " " + arrLang[lang]["LANG_IS_INVALID"]);
        return false;
    }

    if (sji_checkdigitrange($("input[name='wanStartPort']").val(), 1, 65535) == false) {
        $("input[name='wanStartPort']").focus();
        MyAlert(arrLang[lang]["LANG_EXTERNAL_START_PORT"] + " " + arrLang[lang]["LANG_IS_INVALID"]);
        return false;
    }
    if (sji_checkdigitrange($("input[name='wanEndPort']").val(), parseInt($("input[name='wanStartPort']").val(), 10), 65535) == false) {
        $("input[name='wanEndPort']").focus();
        MyAlert(arrLang[lang]["LANG_EXTERNAL_END_PORT"] + " " + arrLang[lang]["LANG_IS_INVALID"]);
        return false;
    }
    if (sji_checkvip($("input[name='serverIp']").val()) == false) {
        $("input[name='serverIp']").focus();
        MyAlert(arrLang[lang]["LANG_SERVER_IP_ADDR"] + " " + arrLang[lang]["LANG_IS_INVALID"]);
        return false;
    }
    if (sji_checkdigitrange($("input[name='lanPort']").val(), 1, 65535) == false) {
        $("input[name='lanPort']").focus();
        MyAlert(arrLang[lang]["LANG_SOURCE_PORT"] + " " + arrLang[lang]["LANG_IS_INVALID"]);
        return false;
    }
    return true;
}

function Server_Add_success() {
    Virtual_Server_List_init();
    $(".layui-layer-close2").click();
    Page_data_obj_init(ALG_DMZ_data, OneForAll("getASPdata/GetAlgTypes", 5, 0, 0, 0));
    set_obj_data_to_html(ALG_DMZ_data);
}

var ALG_DMZ_data = {};


$(document).ready(function () {
    Adv_NAT_Config_Page_init();
    Auto_Page_generate(Adv_NAT_Config_Page);
    Page_data_obj_init(ALG_DMZ_data, OneForAll("getASPdata/GetAlgTypes", 5, 0, 0, 0));
    set_obj_data_to_html(ALG_DMZ_data);
    Global_event_monitor();
    Virtual_Server_Add_Config_window_init();
    Virtual_Server_List_init();
});
