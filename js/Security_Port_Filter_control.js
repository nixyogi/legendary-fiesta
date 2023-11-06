


var ipPort_Filter_Page = {
    "length": 2,
    1: [
        ["ipPort_filter_row", "arrLang[lang]['LANG_IP_PORT_FILTERING']", "2"],
        ["form", "ipPort_filter_form", "action=\"/boaform/getASPdata/formPortFilter\" method=\"POST\"", "1", ipPort_Filter_Page_init],
        ["switch", "B_ipfilterEnable", "IP ,arrLang[lang]['LANG_ADDRESS'], ,arrLang[lang]['LANG_FILTERING']", "ipfilterEnable"],
        ["menu", "B_ipFilterMode", "arrLang[lang]['LANG_FILTERING'], ,arrLang[lang]['LANG_MODE']", "ipFilterMode", [
            ["0", "arrLang[lang][\"LANG_BLACK_LIST\"]"],
            ["1", "arrLang[lang][\"LANG_WHITE_LIST\"]"]
        ]],
        ["tips", "h6", "class='tips_font'", "arrLang[lang]['LANG_IP_FILTER_FUNCTION_DESCRIPTION']"],
        ["submit", "ipPort_filter_submit"],
    ],
    2: [
        ["filter_list_show", "arrLang[lang]['LANG_BLACK_LIST'], ,arrLang[lang]['LANG_CONFIG']"],
        ["form", "filter_list_form", "action=\"/boaform/getASPdata/formPortFilterBlack\" method=\"post\"", "1", after_add_success_action],
        ["tips", "h6", "id='list_tips' class='tips_font'", "arrLang[lang]['LANG_BLACK_LIST_NOTE']"],
        ["append", "<div class=\"table-responsive\">\
        <table class=\"table table-bordered table-striped\">\
        <thead>\
            <tr>\
                <th>" + arrLang[lang]['LANG_NAME'] + "</th>\
                <th>" + arrLang[lang]['LANG_PROTOCOL'] + "</th>\
                <th>" + arrLang[lang]['LANG_SOURCE'] + " IP " + arrLang[lang]["LANG_ADDRESS"] + "</th>\
                <th>" + arrLang[lang]['LANG_SOURCE'] + " " + arrLang[lang]['LANG_SUBNET_MASK'] + "</th>\
                <th>" + arrLang[lang]["LANG_SOURCE_PORT"] + "</th>\
                <th>" + arrLang[lang]['LANG_DESTINATION'] + " IP " + arrLang[lang]["LANG_ADDRESS"] + "</th>\
                <th>" + arrLang[lang]['LANG_DESTINATION'] + " " + arrLang[lang]['LANG_SUBNET_MASK'] + "</th>\
                <th>" + arrLang[lang]["LANG_DESTINATION_PORT"] + "</th>\
                <th>" + arrLang[lang]["LANG_IP_VERSION"] + "</th>\
            </tr>\
        </thead>\
        <tbody id=\"filter_list_place\"></tbody>\
    </table>\
    </div>"],
        ["hidden", "action", "rm"],
        ["append", "<div>\
        <div style=\"display: inline;\"><button type=\"button\" id=\"filter_list_add\" class=\"btn btn-primary btn-round\">" + arrLang[lang]["LANG_ADD"] + "</button></div>\
            <div style=\"display: inline;\"><button type=\"button\" id=\"filter_list_del\" class=\"btn btn-danger btn-round\">" + arrLang[lang]["LANG_DELETE_SELECTED"] + "</button></div>\
        </div>"],
    ]
}

var ipPort_filter_Page_data = {};

function ipPort_Filter_Page_init() {
    Page_data_obj_init(ipPort_filter_Page_data, OneForAll("getASPdata/ipPortFilterConfig", 5, 0, 0, 0));
    set_obj_data_to_html(ipPort_filter_Page_data);
    if ($("input[name='ipFilterMode']").val() == "1") {
        White_list_init();
    } else if ($("input[name='ipFilterMode']").val() == "0") {
        Black_list_init();
    }
}

function Global_click_monitoring_2() {
    (function (s) {
        /*s(".container-fluid").on("click", function (e) {
        });*/
        s(".B_ipFilterMode").on("click", function (e) {
            setTimeout(function () {
                if (s("input[name='ipFilterMode']").val() == "0") {
                    Black_list_init();
                } else {
                    White_list_init();
                }
            }, 50);
        })
        s("#filter_list_del").on("click", function (e) {
            $("#waiting_animation").show();
            $.ajaxSettings.async = true;
            $("#filter_list_form").submit();
        })

    })(jQuery);
}

var protoType_Mapv4 = {
    "5": " ",
    "1": "TCP/UDP",
    "2": "TCP",
    "3": "UDP",
    "4": "ICMP",
    "0": "ANY",
}

var protoType_Mapv6 = {
    "5": " ",
    "1": "TCP/UDP",
    "2": "TCP",
    "3": "UDP",
    "4": "ICMPV6",
    "0": "ANY",
}

function table_list_init(data) {
    for (var key in data) {
        if (key.indexOf("filter_list") != -1) {
            data[key] = nest_obj_init(data[key]);
            var tmp = data[key];
            var content = "";
            var sFlag = 0;
            var dFlag = 0;
            if (tmp["IpProtocolType"] == "2") {
                content += "<tr class=\"justhover\">";
                content += "<td>" + tmp["filterName"] + "</td>";
                content += "<td>" + protoType_Mapv6[tmp["protoType"]] + "</td>";
                content += "<td>" + tmp["sip6Start"];
                if (tmp["sip6End"] != "::") {
                    content += "~" + tmp["sip6End"];
                    sFlag = 1;
                }
                content += "</td>";
                if (0) {
                    content += "<td>" + "</td>";
                } else {
                    content += "<td>" + tmp["sip6PrefixLen"] + "</td>";
                }
                content += "<td>" + tmp["sportStart"];
                if (tmp["sportEnd"] != tmp["sportStart"]) {
                    content += "~" + tmp["sportEnd"];
                }
                content += "</td>";
                content += "<td>" + tmp["dip6Start"];
                if (tmp["dip6End"] != "::") {
                    content += "~" + tmp["dip6End"];
                    dFlag = 1;
                }
                content += "</td>";
                if (0) {
                    content += "<td>" + "</td>";
                } else {
                    content += "<td>" + tmp["dip6PrefixLen"] + "</td>"
                }
                content += "<td>" + tmp["dportStart"];
                if (tmp["dportEnd"] != tmp["dportStart"]) {
                    content += "~" + tmp["dportEnd"];
                }
                content += "</td>";
                content += "<td>" + "IPv6" + "</td>";
                content += "<td style='display:none;'>" + "<input name=\"" + tmp["filterName"] + "_flag" + "\" value=\"" + tmp["filterName"] + "\" disabled=\"disabled\">" + "</td>";
                content += "</tr>";
            } else {
                content += "<tr class=\"justhover\">";
                content += "<td>" + tmp["filterName"] + "</td>";
                content += "<td>" + protoType_Mapv4[tmp["protoType"]] + "</td>";
                content += "<td>" + tmp["sipStart"];
                if (tmp["sipEnd"] != "0.0.0.0") {
                    content += "~" + tmp["sipEnd"];
                    sFlag = 1;
                }
                content += "</td>";
                if (sFlag == 1) {
                    content += "<td>" + "</td>";
                } else {
                    content += "<td>" + tmp["smask"] + "</td>";
                }
                content += "<td>" + tmp["sportStart"];
                if (tmp["sportEnd"] != tmp["sportStart"]) {
                    content += "~" + tmp["sportEnd"];
                }
                content += "</td>";
                content += "<td>" + tmp["dipStart"];
                if (tmp["dipEnd"] != "0.0.0.0") {
                    content += "~" + tmp["dipEnd"];
                    dFlag = 1;
                }
                content += "</td>";
                if (dFlag == 1) {
                    content += "<td>" + "</td>";
                } else {
                    content += "<td>" + tmp["dmask"] + "</td>"
                }
                content += "<td>" + tmp["dportStart"];
                if (tmp["dportEnd"] != tmp["dportStart"]) {
                    content += "~" + tmp["dportEnd"];
                }
                content += "</td>";
                content += "<td>" + "IPv4" + "</td>";
                content += "<td style='display:none;'>" + "<input name=\"" + tmp["filterName"] + "_flag" + "\" value=\"" + tmp["filterName"] + "\" disabled=\"disabled\">" + "</td>";
                content += "</tr>";
            }
            $("#filter_list_place").append(content);
        }
    }
    $("#filter_list_place").find("tr").off("click");
    $("#filter_list_place").find("tr").on("click", function (e) {
        $(this).toggleClass("td_select");
        if ($(this).hasClass("td_select")) {
            $(this).find("input").prop("disabled", false);
        } else {
            $(this).find("input").prop("disabled", true);
        }
    });
}

var white_list_data = {};
function White_list_init() {
    white_list_data = {};
    $("#filter_list_form").prop("action", "/boaform/getASPdata/formPortFilterWhite");
    $("#filter_list_show").find("h6").text(arrLang[lang]['LANG_WHITE_LIST'] + " " + arrLang[lang]['LANG_CONFIG']);
    $("#list_tips").text(arrLang[lang]['LANG_WHITE_LIST_NOTE']);
    var data = OneForAll("getASPdata/ipPortFilterWhitelist", 5, 0, 0, 0);
    $("#filter_list_place").empty();
    filter_list_modify_init();
    if (data == "nolist")
        return;
    Page_data_obj_init(white_list_data, data);
    table_list_init(white_list_data);
}

var black_list_data = {};
function Black_list_init() {
    black_list_data = {};
    $("#filter_list_form").prop("action", "/boaform/getASPdata/formPortFilterBlack");
    $("#filter_list_show").find("h6").text(arrLang[lang]['LANG_BLACK_LIST'] + " " + arrLang[lang]['LANG_CONFIG']);
    $("#list_tips").text(arrLang[lang]['LANG_BLACK_LIST_NOTE']);
    var data = OneForAll("getASPdata/ipPortFilterBlacklist", 5, 0, 0, 0);
    $("#filter_list_place").empty();
    filter_list_modify_init();
    if (data == "nolist")
        return;
    Page_data_obj_init(black_list_data, data);
    table_list_init(black_list_data);
}

function filter_list_modify_init() {
    var head_word;
    var tar_form;
    if ($("input[name='ipFilterMode']").val() == "1") {
        head_word = arrLang[lang]["LANG_ADD_IP_FILTER_INCOMING"];
        tar_form = "action=\"/boaform/getASPdata/formPortFilterWhite\" method=\"post\""
    } else {
        head_word = arrLang[lang]["LANG_ADD_IP_FILTER_OUT"];
        tar_form = "action=\"/boaform/getASPdata/formPortFilterBlack\" method=\"post\""
    }

    var mode_choose = {
        "IPv4": "#B_protoType_Table,\
                  #IPv4sip,\
                  #B_sipStart_Table,\
                  #B_sipEnd_Table,\
                  #B_smask_Table,\
                  #IPv4dip,\
                  #B_dipStart_Table,\
                  #B_dipEnd_Table,\
                  #B_dmask_Table",
        "IPv6": "#B_protoTypeV6_Table,\
                  #IPv6sip,\
                  #B_sip6Start_Table,\
                  #B_sip6End_Table,\
                  #B_sip6PrefixLen_Table,\
                  #IPv6dip,\
                  #B_dip6Start_Table,\
                  #B_dip6End_Table,\
                  #B_dip6PrefixLen_Table",
    }

    var filter_flow_page = {
        "length": 1,
        1: [
            ["filter_flow_page", 0],
            ["form", "filter_flow_form", tar_form, "1", after_add_success_action],
            ["text", "B_filterName", "arrLang[lang][\"LANG_FILTER_NAME\"]", "filterName", "30"],
            ["menu", "B_IpProtocolType", "arrLang[lang][\"LANG_IP_VERSION\"]", "IpProtocolType", [
                ["1", "IPv4"],
                ["2", "IPv6"],
            ]],
            ["menu", "B_protoType", "arrLang[lang][\"LANG_PROTOCOL\"]", "protoType", [
                ["5", " "],
                ["1", "TCP/UDP"],
                ["2", "TCP"],
                ["3", "UDP"],
                ["4", "ICMP"],
                ["0", "ANY"],
            ]],
            ["menu", "B_protoTypeV6", "arrLang[lang][\"LANG_PROTOCOL\"]", "protoTypeV6", [
                ["5", " "],
                ["1", "TCP/UDP"],
                ["2", "TCP"],
                ["3", "UDP"],
                ["4", "ICMPV6"],
                ["0", "ANY"],
            ]],
            ["text", "B_sipStart", "<b>" + arrLang[lang]['LANG_SOURCE'] + " IP " + arrLang[lang]["LANG_ADDRESS"] + "</b>", "sipStart", "", "placeholder=\"" + arrLang[lang]["LANG_START"] + "\""],
            ["text", "B_sipEnd", "&nbsp", "sipEnd", "", "placeholder=\"" + arrLang[lang]["LANG_END"] + "\""],
            ["text", "B_smask", arrLang[lang]['LANG_SOURCE'] + "&nbsp" + arrLang[lang]['LANG_SUBNET_MASK'], "smask"],
            ["text", "B_dipStart", "<b>" + arrLang[lang]['LANG_DESTINATION'] + " IP " + arrLang[lang]["LANG_ADDRESS"] + "</b>", "dipStart", "", "placeholder=\"" + arrLang[lang]["LANG_START"] + "\""],
            ["text", "B_dipEnd", "&nbsp", "dipEnd", "", "placeholder=\"" + arrLang[lang]["LANG_END"] + "\""],
            ["text", "B_dmask", arrLang[lang]['LANG_DESTINATION'] + "&nbsp" + arrLang[lang]['LANG_SUBNET_MASK'], "dmask"],
            ["text", "B_sip6Start", "<b>" + arrLang[lang]['LANG_SOURCE'] + " IP " + arrLang[lang]["LANG_ADDRESS"] + "</b>", "sip6Start", "", "placeholder=\"" + arrLang[lang]["LANG_START"] + "\""],
            ["text", "B_sip6End", "&nbsp", "sip6End", "", "placeholder=\"" + arrLang[lang]["LANG_END"] + "\""],
            ["text", "B_sip6PrefixLen", arrLang[lang]['LANG_SOURCE'] + "&nbsp" + arrLang[lang]["LANG_PREFIX_LENGTH"], "sip6PrefixLen"],
            ["text", "B_dip6Start", "<b>" + arrLang[lang]['LANG_DESTINATION'] + " IP " + arrLang[lang]["LANG_ADDRESS"] + "</b>", "dip6Start", "", "placeholder=\"" + arrLang[lang]["LANG_START"] + "\""],
            ["text", "B_dip6End", "&nbsp", "dip6End", "", "placeholder=\"" + arrLang[lang]["LANG_END"] + "\""],
            ["text", "B_dip6PrefixLen", arrLang[lang]['LANG_DESTINATION'] + "&nbsp" + arrLang[lang]["LANG_PREFIX_LENGTH"], "dip6PrefixLen"],
            ["text", "B_sportStart", "<b>" + arrLang[lang]["LANG_SOURCE_PORT"] + "</b>", "sportStart", "", "placeholder=\"" + arrLang[lang]["LANG_START"] + "\""],
            ["text", "B_sportEnd", "&nbsp", "sportEnd", "", "placeholder=\"" + arrLang[lang]["LANG_END"] + "\""],
            ["text", "B_dportStart", "<b>" + arrLang[lang]["LANG_DESTINATION_PORT"] + "</b>", "dportStart", "", "placeholder=\"" + arrLang[lang]["LANG_START"] + "\""],
            ["text", "B_dportEnd", "&nbsp", "dportEnd", "", "placeholder=\"" + arrLang[lang]["LANG_END"] + "\""],
            ["hidden", "action", "ad"],
            ["submit", "filter_flow_submit", flow_Page_add_check, arrLang[lang]['LANG_ADD']]
        ]
    };

    (function (s) {
        s("#filter_list_add").off("click");
        s("#filter_list_add").on("click", function () {
            var flow_Page = {
                id: "filter_flow_page",
                name: head_word,
                height: "600px",
                width: "550px",
            }
            flow_table_generate(flow_Page);
            Auto_Page_generate(filter_flow_page);
            FMask_init();
            s("#filter_flow_page").off("click");
            s("#filter_flow_page").on("click", function (e) {
                if ($("input[name='IpProtocolType']").val() == "1") {
                    $(mode_choose["IPv4"]).show();
                    $(mode_choose["IPv6"]).hide();
                } else if ($("input[name='IpProtocolType']").val() == "2") {
                    $(mode_choose["IPv4"]).hide();
                    $(mode_choose["IPv6"]).show();
                }
            })
            $(".B_IpProtocolType").eq(0).click();
            $(".B_protoType").eq(0).click();
            $(".B_protoTypeV6").eq(0).click();
        })


    })(jQuery);
}

function after_add_success_action() {
    if ($("input[name='ipFilterMode']").val() == "0") {
        Black_list_init();
    } else if ($("input[name='ipFilterMode']").val() == "1") {
        White_list_init();
    }
    $(".layui-layer-close2").click();
}

function flow_Page_add_check() {

    if ($("input[name='filterName']").val().length <= 0) {
        $("input[name='filterName']").focus();
        MyAlert(arrLang[lang]['LANG_FILTER_NAME'] + " " + arrLang[lang]['LANG_SHOULD_NOT_BE_EMPTY']);
        return false;
    }
    if ($("#filter_flow_form").attr("action").indexOf("formPortFilterWhite") != -1) {
        for (var key in white_list_data) {
            if (white_list_data[key].filterName == $("input[name='filterName']").val()) {
                swal_check_warning("input[name='filterName']", arrLang[lang]['LANG_ENTRY_EXIST']);
                return false;
            }
        }
    } else {
        for (var key in black_list_data) {
            if (black_list_data[key].filterName == $("input[name='filterName']").val()) {
                swal_check_warning("input[name='filterName']", arrLang[lang]['LANG_ENTRY_EXIST']);
                return false;
            }
        }
    }
    if (sji_checkstrnor($("input[name='filterName']").val(), 1, 22) == false || illegal_char_check($("input[name='filterName']").val())) {
        $("input[name='filterName']").focus();
        MyAlert(arrLang[lang]['LANG_FILTER_NAME'] + " " + arrLang[lang]["LANG_ERROR"] + "," + arrLang[lang]['LANG_TRY_AGAIN']);
        return false;
    }
    if (($("input[name='sipStart']").val().length == 0 && $("input[name='dipStart']").val().length == 0 &&
        $("input[name='sportStart']").val().length == 0 && $("input[name='dportEnd']").val().length == 0) &&
        ($("input[name='sip6Start']").val().length == 0 && $("input[name='dip6Start']").val().length == 0 &&
            $("input[name='sportStart']").val().length == 0 && $("input[name='dportEnd']").val().length == 0)) {
        MyAlert("LANG_FILTER_ADD_ERROR_14");
        return false;
    }

    if ($("input[name='IpProtocolType']").val() == "1") {
        if ($("input[name='sipStart']").val().length == 0 && $("input[name='sipEnd']").val().length) {
            $("input[name='sipStart']").focus();
            MyAlert(arrLang[lang]["LANG_FILTER_ADD_ERROR_2"]);
            return false;
        }
        if ($("input[name='dipStart']").val().length == 0 && $("input[name='dipEnd']").val().length) {
            $("input[name='dipStart']").focus();
            MyAlert("LANG_FILTER_ADD_ERROR_3");
            return false;
        }
        if ($("input[name='smask']").val().length && $("input[name='sipStart']").val().length == 0) {
            $("input[name='sipStart']").focus();
            MyAlert("LANG_FILTER_ADD_ERROR_4");
            return false;
        }
        if ($("input[name='dmask']").val().length && $("input[name='dipStart']").val().length == 0) {
            $("input[name='dipStart']").focus();
            MyAlert("LANG_FILTER_ADD_ERROR_5");
            return false;
        }
        if ($("input[name='sipStart']").val().length != 0 && sji_checkvip($("input[name='sipStart']").val()) == false) {
            $("input[name='sipStart']").focus();
            MyAlert(arrLang[lang]["LANG_ADDRESS"] + " " + arrLang[lang]["LANG_IS_INVALID"] + "," + arrLang[lang]["LANG_TRY_AGAIN"]);
            return false;
        }
        if ($("input[name='sipEnd']").val().length != 0 && sji_checkvip($("input[name='sipEnd']").val()) == false) {
            $("input[name='sipEnd']").focus();
            MyAlert(arrLang[lang]["LANG_ADDRESS"] + " " + arrLang[lang]["LANG_IS_INVALID"] + "," + arrLang[lang]["LANG_TRY_AGAIN"]);
            return false;
        }
        if ($("input[name='sipStart']").val().length != 0 && $("input[name='sipEnd']").val().length != 0 && sji_ipcmp($("input[name='sipStart']").val(), $("input[name='sipEnd']").val()) > 0) {
            $("input[name='sipEnd']").focus();
            MyAlert("LANG_FILTER_ADD_ERROR_8");
            return false;
        }
        if ($("input[name='sipStart']").val().length != 0 && $("input[name='sipEnd']").val().length == 0 && sji_checkmask($("input[name='smask']").val()) == false) {
            $("input[name='smask']").focus();
            MyAlert(arrLang[lang]["LANG_MASK"] + " " + arrLang[lang]["LANG_IS_INVALID"] + "," + arrLang[lang]["LANG_TRY_AGAIN"]);
            return false;
        }
        if ($("input[name='sipStart']").val().length != 0 && $("input[name='sipEnd']").val().length != 0 && $("input[name='smask']").val().length != 0) {
            $("input[name='smask']").focus();
            MyAlert("LANG_FILTER_ADD_ERROR_9");
            return false;
        }
        if ($("input[name='dipStart']").val().length != 0 && sji_checkvip($("input[name='dipStart']").val()) == false) {
            $("input[name='dipStart']").focus();
            MyAlert(arrLang[lang]["LANG_ADDRESS"] + " " + arrLang[lang]["LANG_IS_INVALID"] + "," + arrLang[lang]["LANG_TRY_AGAIN"]);
            return false;
        }
        if ($("input[name='dipEnd']").val().length != 0 && sji_checkvip($("input[name='dipEnd']").val()) == false) {
            $("input[name='dipEnd']").focus();
            MyAlert(arrLang[lang]["LANG_ADDRESS"] + " " + arrLang[lang]["LANG_IS_INVALID"] + "," + arrLang[lang]["LANG_TRY_AGAIN"]);
            return false;
        }
        if ($("input[name='dipStart']").val().length != 0 && $("input[name='dipEnd']").val().length != 0 && sji_ipcmp($("input[name='dipStart']").val(), $("input[name='dipEnd']").val()) > 0) {
            $("input[name='dipEnd']").focus();
            MyAlert("LANG_FILTER_ADD_ERROR_11");
            return false;
        }
        if ($("input[name='dipStart']").val().length != 0 && $("input[name='dipEnd']").val().length == 0 && sji_checkmask($("input[name='dmask']").val()) == false) {
            $("input[name='dmask']").focus();
            MyAlert(arrLang[lang]["LANG_MASK"] + " " + arrLang[lang]["LANG_IS_INVALID"] + "," + arrLang[lang]["LANG_TRY_AGAIN"]);
            return false;
        }
        if ($("input[name='dipStart']").val().length != 0 && $("input[name='dipEnd']").val().length != 0 && $("input[name='dmask']").val().length != 0) {
            $("input[name='dmask']").focus();
            MyAlert("LANG_FILTER_ADD_ERROR_12");
            return false;
        }

    } else if ($("input[name='IpProtocolType']").val() == "2") {
        if ($("input[name='sip6Start']").val() != "") {
            if (!isGlobalIpv6Address($("input[name='sip6Start']").val())) {
                $("input[name='sip6Start']").focus();
                MyAlert("IPv6  " + arrLang[lang]["LANG_ADDRESS"] + " " + arrLang[lang]["LANG_IS_INVALID"] + "," + arrLang[lang]["LANG_TRY_AGAIN"]);
                return false;
            }
            if ($("input[name='sip6PrefixLen']").val() != "") {
                var prefixlen = getDigit($("input[name='sip6PrefixLen']").val(), 1);
                if (prefixlen > 128 || prefixlen <= 0) {
                    $("input[name='sip6PrefixLen']").focus();
                    MyAlert("LANG_INVALID_SOURCE_IPV6_PREFIX_LENGTH");
                    return false;
                }
            }
        }
        if ($("input[name='sip6End']").val() != "") {
            if (!isGlobalIpv6Address($("input[name='sip6End']").val())) {
                $("input[name='sip6End']").focus();
                MyAlert("LANG_INVALID_SOURCE_IPV6_END_ADDRESS");
                return false;
            }
        }
        if ($("input[name='dip6Start']").val() != "") {
            if (!isGlobalIpv6Address($("input[name='dip6Start']").val())) {
                $("input[name='dip6Start']").focus();
                MyAlert("LANG_INVALID_DESTINATION_IPV6_START_ADDRESS");
                return false;
            }
            if ($("input[name='dip6PrefixLen']").val() != "") {
                var prefixlen = getDigit($("input[name='dip6PrefixLen']").val(), 1);
                if (prefixlen > 128 || prefixlen <= 0) {
                    $("input[name='dip6PrefixLen']").focus();
                    MyAlert("LANG_INVALID_DESTINATION_IPV6_PREFIX_LENGTH");
                    return false;
                }
            }
        }
        if ($("input[name='dip6End']").val() != "") {
            if (!isGlobalIpv6Address($("input[name='dip6End']").val())) {
                $("input[name='dip6End']").focus();
                MyAlert("LANG_INVALID_DESTINATION_IPV6_END_ADDRESS");
                return false;
            }
        }
    }

    if (($("input[name='protoType']").val() == 0 || $("input[name='protoType']").val() == 4) && ($("input[name='protoTypeV6']").val() == 0 || $("input[name='protoTypeV6']").val() == 4) && ($("input[name='sportStart']").val() || $("input[name='sportEnd']").val() || $("input[name='dportStart']").val() || $("input[name='dportEnd']").val())) {
        $("input[name='sportStart']").focus();
        MyAlert("LANG_FILTER_ADD_ERROR_1");
        return false;
    }

    if ($("input[name='sportStart']").val().length == 0 && $("input[name='sportEnd']").val().length) {
        $("input[name='sportStart']").focus();
        MyAlert("LANG_FILTER_ADD_ERROR_6");
        return false;
    }
    if ($("input[name='sportStart']").val().length == 0 && $("input[name='sportEnd']").val().length) {
        $("input[name='sportStart']").focus();
        MyAlert("LANG_FILTER_ADD_ERROR_7");
        return false;
    }

    if ($("input[name='sportStart']").val().length != 0 && sji_checkdigitrange($("input[name='sportStart']").val(), 1, 65535) == false) {
        $("input[name='sportStart']").focus();
        MyAlert(arrLang[lang]["LANG_SOURCE_START_PORT"] + " " + arrLang[lang]["LANG_IS_INVALID"] + "," + arrLang[lang]["LANG_TRY_AGAIN"]);
        return false;
    }
    if ($("input[name='sportEnd']").val().length != 0 && sji_checkdigitrange($("input[name='sportEnd']").val(), 1, 65535) == false) {
        $("input[name='sportEnd']").focus();
        MyAlert(arrLang[lang]["LANG_SOURCE_END_PORT"] + " " + arrLang[lang]["LANG_IS_INVALID"] + "," + arrLang[lang]["LANG_TRY_AGAIN"]);
        return false;
    }
    if ($("input[name='sportStart']").val().length != 0 && $("input[name='sportEnd']").val().length != 0 && (parseInt($("input[name='sportStart']").val()) > parseInt($("input[name='sportEnd']").val()))) {
        $("input[name='sportEnd']").focus();
        MyAlert("LANG_FILTER_ADD_ERROR_10");
        return false;
    }

    if ($("input[name='dportStart']").val().length != 0 && sji_checkdigitrange($("input[name='dportStart']").val(), 1, 65535) == false) {
        $("input[name='dportStart']").focus();
        MyAlert(arrLang[lang]["LANG_DESTINATION_START_PORT"] + " " + arrLang[lang]["LANG_IS_INVALID"] + "," + arrLang[lang]["LANG_TRY_AGAIN"]);
        return false;
    }
    if ($("input[name='dportEnd']").val().length != 0 && sji_checkdigitrange($("input[name='dportEnd']").val(), 1, 65535) == false) {
        $("input[name='dportEnd']").focus();
        MyAlert(arrLang[lang]["LANG_DESTINATION_END_PORT"] + " " + arrLang[lang]["LANG_IS_INVALID"] + "," + arrLang[lang]["LANG_TRY_AGAIN"]);
        return false;
    }
    if ($("input[name='dportStart']").val().length != 0 && $("input[name='dportEnd']").val().length != 0 && (parseInt($("input[name='dportStart']").val()) > parseInt($("input[name='dportEnd']").val()))) {
        $("input[name='dportEnd']").focus();
        MyAlert("LANG_FILTER_ADD_ERROR_13");
        return false;
    }

    return true;
}

$(document.ready).ready(function () {
    Auto_Page_generate(ipPort_Filter_Page, "250px");
    $("#filter_list_show").find(".col-lg-8").each(function () {
        $(this).removeClass("col-lg-8");
        $(this).addClass("col-lg-12");
    })
    ipPort_Filter_Page_init();
    Global_click_monitoring_2();
});
