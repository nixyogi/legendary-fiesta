function Network_WAN_Page_init() {
    var Network_WAN_Page = {
        "length": 2,
        1: [
            ["Network_WAN_Row", "WAN ,arrLang[lang]['LANG_CONFIG']", 2],
            ["form", "Network_WAN_form", "action=\"/boaform/getASPdata/formEthernet\" method=\"post\"", "1", success_refresh, wrong_refresh],
            ["menu", "B_lkname", "arrLang[lang][\"LANG_CONNECTION_NAME\"]", "lkname", WAN_Data_init()],
            ["menu", "B_lkmode", "arrLang[lang][\"LANG_MODE\"]", "lkmode", [
                ["0", "Bridge"],
                ["1", "Route"],
            ]],
            ["menu", "B_IpProtocolType", "arrLang[lang][\"LANG_IP_VERSION\"]", "IpProtocolType", [
                ["3", " IPv4/IPv6"],
                ["1", " IPv4"],
                ["2", " IPv6"],
            ]],
            ["btn-group", "B_ipmode", "arrLang[lang][\"Connection Mode:\"]", "ipmode", [
                ["0", "DHCP"],
                ["1", "Static"],
                ["2", "PPPoE"],
            ]],
            ["switch", "B_napt", "arrLang[lang]['LANG_ENABLED'], NAT", "napt"],
            ["switch", "B_vlan", "arrLang[lang]['LANG_ENABLED'], Vlan", "vlan"],
            ["text", "B_vid", "Vlan ID", "vid", "4"],
            ["menu", "B_vprio", "802.1p", "vprio", [
                ["0", "arrLang[lang]['LANG_NONE']"],
                ["1", "0"],
                ["2", "1"],
                ["3", "2"],
                ["4", "3"],
                ["5", "4"],
                ["6", "5"],
                ["7", "6"],
                ["8", "7"],
            ]],
            ["text", "B_mtu", "MTU", "mtu", "4"],
            ["text", "B_pppUsername", "arrLang[lang][\"LANG_USERNAME\"]", "pppUsername", "62"],
            ["password", "B_pppPassword", "arrLang[lang][\"LANG_PASSWORD\"]", "pppPassword", "32"],
            ["text", "B_pppServiceName", "arrLang[lang][\"LANG_SERVICE_NAME\"]", "pppServiceName", "32"],
            ["menu", "B_pppCtype", "arrLang[lang][\"LANG_PPP_TYPE\"]", "pppCtype", [
                ["0", "arrLang[lang]['pppoe_continuous']"],
                ["1", "arrLang[lang]['pppoe_connect_on_demand']"],
            ]],
            ["text", "B_ipAddr", "arrLang[lang][\"LANG_IP_ADDRESS\"]", "ipAddr", "15"],
            ["text", "B_netMask", "arrLang[lang][\"LANG_SUBNET_MASK\"]", "netMask", "15"],
            ["text", "B_remoteIpAddr", "arrLang[lang][\"LANG_DEFAULT_GATEWAY\"]", "remoteIpAddr", "15"],
            ["switch", "B_dnsMode", "Request DNS", "dnsMode"],
            ["text", "B_v4dns1", "arrLang[lang]['LANG_PRIMARY'], DNS", "v4dns1", "15"],
            ["text", "B_v4dns2", "arrLang[lang]['LANG_STANDBY'], DNS", "v4dns2", "15"],

            ["menu", "B_applicationtype", "arrLang[lang][\"LANG_SERVICE\"],arrLang[lang]['LANG_MODE']", "applicationtype", [
                ["0", "TR069_INTERNET"],
                ["1", "INTERNET",],
                ["2", "TR069",],
                ["3", "Other",],
                ["4", "VOIP",],
                ["5", "TR069_VOIP",],
                ["6", "VOIP_INTERNET",],
                ["7", "TR069_VOIP_INTERNET"],
                ["2052", "",],
            ]],
            ["switch", "B_disableLanDhcp", "Disable LAN DHCP", "disableLanDhcp"],
            //["switch", "B_enableBridgeIgmp", "arrLang[lang][\"LANG_BRIDGE_IGMP\"]", "enableBridgeIgmp"],
            ["tips", "div", "style=\"font-weight: bolder;line-height:52px;\"", "arrLang[lang]['LANG_BIND_PORT'], :"],
            ["append", Binding_selection_init()],
            ["hidden", "itfGroup", "0"],
            ["tips", "div", "id='IPv6_Place_tips' class='tips_font pt-2' style=\"text-align:left;\"", "arrLang[lang]['wan_ipv6_address_mode']"],
            ["menu", "B_AddrMode", "arrLang[lang][\"LANG_GLOBAL_IP_MODE\"]", "AddrMode", [
                ["1", "arrLang[lang]['LANG_STAT_LESS']"],
                ["2", "arrLang[lang]['LANG_MANUAL']"],
                ["16", " DHCP"],
            ]],
            ["switch", "B_iapd", "DHCP ,arrLang[lang]['LANG_ENABLED'], ,arrLang[lang]['LANG_PREFIX'], ,arrLang[lang]['LANG_PROXY']", "iapd"],
            ["switch", "B_dslite_enable", "DS-Lite ,arrLang[lang][\"LANG_ENABLED\"]", "dslite_enable"],
            ["menu", "B_dslite_aftr_mode", "arrLang[lang][\"AFTR Address Mode\"]", "dslite_aftr_mode", [
                ["0", "DHCPv6"],
                ["1", "arrLang[lang]['LANG_MANUAL']"],
            ]],
            ["text", "B_dslite_aftr_hostname", "arrLang[lang][\"AFTR Address_Domain\"]", "dslite_aftr_hostname", "64"],
            ["text", "B_Ipv6Addr", "IPv6 ,arrLang[lang]['LANG_IP_ADDRESS']", "Ipv6Addr", "39"],
            ["text", "B_Ipv6PrefixLen", "arrLang[lang]['LANG_IPV6_PREFIX_LENGTH']", "Ipv6PrefixLen", "3"],
            ["text", "B_Ipv6Gateway", "IPv6 ,arrLang[lang][\"LANG_DEFAULT_GATEWAY\"]", "Ipv6Gateway", "39"],
            ["switch", "B_dnsv6Mode", "arrLang[lang][\"ipv6_request_dns\"]", "dnsv6Mode"],
            ["text", "B_Ipv6Dns1", "arrLang[lang]['LANG_PRIMARY'], DNS", "Ipv6Dns1", "39"],
            ["text", "B_Ipv6Dns2", "arrLang[lang]['LANG_STANDBY'], DNS", "Ipv6Dns2", "39"],
            ["hidden", "cmode", ""],
            ["hidden", "ipDhcp", ""],
            ["hidden", "encodePppUserName", ""],
            ["hidden", "encodePppPassword", ""],
            ["hidden", "lst", ""],
            ["hidden", "action", ""],
            ["hidden", "acnameflag", ""],
            ["hidden", "iana", ""],
            ["append", "<br>"],
            ["submit", "WAN_Config_Submit", WAN_PAGE_check_input,],
            ["append", "<br>"],
            ["submit", "WAN_Config_Del", WAN_PAGE_check_input, "arrLang[lang][\"wan_del\"]", "btn-danger"]
        ],
        2: [
            ["NAT_Choose_row", "arrLang[lang]['LANG_NAT_CONFIG']"],
            ["form", "NAT_Choose_form", "action=\"/boaform/getASPdata/formNat\" method=\"post\"", "1"],
            ["btn-group", "B_nat_type", "NAT", "nat_type", [
                ["1", "NAT1"],
                ["2", "NAT2"],
                ["0", "NAT4"],
            ]],
            ["submit", "NAT_Config_Submit"]
        ]
    };
    WAN_PM = Auto_Page_generate(Network_WAN_Page);
}





var alert_of_reserver_vlan = "";

function Reserve_vlan_process(reserve_vlan) {
    var reserve_vlan_split = reserve_vlan.split(",");
    for (var i = 0; i < reserve_vlan_split.length - 1; i++) {
        if (reserve_vlan_split[i] < 4096 && reserve_vlan_split[i] > 0) {
            reservedVlan.push(reserve_vlan_split[i]);
            alertVlanStr = alertVlanStr + "," + reserve_vlan_split[i];
        }
    }

    if (alertVlanStr == "") {
        var alert_word = arrLang[lang]["LANG_INVALID_VLAN_RANGE"];
        if (alert_word.lastIndexOf(",") != -1)
            alert_of_reserver_vlan = alert_word.substring(0, alert_word.lastIndexOf(","));
        else
            alert_of_reserver_vlan = alert_word;
    } else {
        alert_of_reserver_vlan = arrLang[lang]["LANG_INVALID_VLAN_RANGE"] + alertVlanStr;
    }
}



var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "abcdefghijklmnopqrstuvwxyz" +
    "0123456789+/=";

function encode64(input) {
    var output = "";
    var i = 0,
        len = input.length;
    for (i = 0; i <= len - 3; i += 3) {
        output += keyStr.charAt(input.charCodeAt(i) >>> 2);
        output += keyStr.charAt(((input.charCodeAt(i) & 3) << 4) | (input.charCodeAt(i + 1) >>> 4));
        output += keyStr.charAt(((input.charCodeAt(i + 1) & 15) << 2) | (input.charCodeAt(i + 2) >>> 6));
        output += keyStr.charAt(input.charCodeAt(i + 2) & 63);
    }
    if (len % 3 == 2) {
        output += keyStr.charAt(input.charCodeAt(i) >>> 2);
        output += keyStr.charAt(((input.charCodeAt(i) & 3) << 4) | (input.charCodeAt(i + 1) >>> 4));
        output += keyStr.charAt(((input.charCodeAt(i + 1) & 15) << 2));
        output += keyStr.charAt(64);
    } else if (len % 3 == 1) {
        output += keyStr.charAt(input.charCodeAt(i) >>> 2);
        output += keyStr.charAt(((input.charCodeAt(i) & 3) << 4));
        output += keyStr.charAt(64);
        output += keyStr.charAt(64);
    }
    return output;
}

function decode64(input) {
    var output = "";
    var i, a, b, c, d, z;
    for (i = 0; i < input.length - 3; i += 4) {
        a = keyStr.indexOf(input.charAt(i + 0));
        b = keyStr.indexOf(input.charAt(i + 1));
        c = keyStr.indexOf(input.charAt(i + 2));
        d = keyStr.indexOf(input.charAt(i + 3));
        output += String.fromCharCode((a << 2) | (b >>> 4));
        if (input.charAt(i + 2) != keyStr.charAt(64))
            output += String.fromCharCode(((b << 4) & 0xF0) | ((c >>> 2) & 0x0F));
        if (input.charAt(i + 3) != keyStr.charAt(64))
            output += String.fromCharCode(((c << 6) & 0xC0) | d);
    }
    return output;
}



function Binding_selection_init() {
    var selection = "";
    selection += "<div class='row' id='Binding_selection' style=\"margin-left:2%;font-size:88%;white-space: nowrap;\">";
    var option = {
        "0": arrLang[lang]["port_1"],
        "1": arrLang[lang]["port_2"],
        "2": arrLang[lang]["port_3"],
        "3": arrLang[lang]["port_4"],
        "4": arrLang[lang]["wireless(ssid5-2.4g)"],
        "5": arrLang[lang]["wireless(ssid6-2.4g)"],
        "6": arrLang[lang]["wireless(ssid7-2.4g)"],
        "7": arrLang[lang]["wireless(ssid8-2.4g)"],
        "9": arrLang[lang]["wireless(ssid1-5g)"],
        "10": arrLang[lang]["wireless(ssid2-5g)"],
        "11": arrLang[lang]["wireless(ssid3-5g)"],
        "12": arrLang[lang]["wireless(ssid4-5g)"],
    }
    for (var key in option) {
        selection += "<div class=\"justhover\" style=\"font-weight:600; line-height:30px; width:48%;display:none;\" value=\"" + key + "\">" + option[key] + "</div>";
    }
    selection += "</div>";
    return selection;
}

function Binding_selection_operate_init() {
    var tar = $("#Binding_selection");
    tar = tar.find(".justhover");
    var input = $("input[name='itfGroup']");
    tar.on("click", function (e) {
        $(this).toggleClass("td_select");
        if ($(this).hasClass("td_select")) {
            input.val(parseInt(input.val()) + (0x1 << parseInt($(this).attr("value"))));
        } else {
            input.val(parseInt(input.val()) - (0x1 << parseInt($(this).attr("value"))));
        }
    })
}


function Binding_selection_hide_init() {
    var data = OneForAll("getASPdata/new_ShowPortMapping", 5, 0, 0);
    var tar = $("#Binding_selection");
    var obj = {};
    var portmap = {
        "LAN1": "0",
        "LAN2": "1",
        "LAN3": "2",
        "LAN4": "3",
        "SSID1": "4",
        "SSID2": "5",
        "SSID3": "6",
        "SSID4": "7",
        "SSID6": "9",
        "SSID7": "10",
        "SSID8": "11",
        "SSID9": "12",
    }
    Page_data_obj_init(obj, data);
    for (var key in obj) {
        if (obj[key] == "1") {
            if (tar.children("div[value=\"" + portmap[key] + "\"]").length != 0)
                tar.children("div[value=\"" + portmap[key] + "\"]").show();
        }
    }

}

function bridge_mode() {
    WAN_PM.applicationtype.op("all", 0);
    WAN_PM.applicationtype.op(1, 1);
    WAN_PM.applicationtype.op(3, 1);
    WAN_PM.applicationtype.op(8, 1);
}

function route_mode() {
    WAN_PM.applicationtype.op("all", 1);
}


function check_vlan_exist() {
    if (WAN_PM.vlan.val() == "0")
        return false;
    for (var key in WAN_DATA) {
        if (key.indexOf("_VID_") != -1) {
            if (WAN_DATA[key].index != WAN_PM.lkname.val()) {
                if (WAN_DATA[key].vid == WAN_PM.vid.val())
                    return true;
            }
        }
    }
    return false;
}


function check_port_binding_exist() {
    var option = {
        "0": arrLang[lang]["port_1"],
        "1": arrLang[lang]["port_2"],
        "4": arrLang[lang]["wireless(ssid1-5g)"],
        "5": arrLang[lang]["wireless(ssid2-5g)"],
        "6": arrLang[lang]["wireless(ssid3-5g)"],
        "7": arrLang[lang]["wireless(ssid4-5g)"],
        "9": arrLang[lang]["wireless(ssid5-2.4g)"],
        "10": arrLang[lang]["wireless(ssid6-2.4g)"],
        "11": arrLang[lang]["wireless(ssid7-2.4g)"],
        "12": arrLang[lang]["wireless(ssid8-2.4g)"],
    }
    if (WAN_PM.itfGroup.val() == "0") {
        return false;
    }
    if (WAN_PM.lkname.val() == "new") {
        var reslut;
        for (var key in WAN_DATA) {
            if (key.indexOf("_VID_") != -1) {
                reslut = WAN_DATA[key].itfGroup & parseInt(WAN_PM.itfGroup.val());
                if (reslut) {
                    for (var i = 0; i < 13; i++) {
                        if ((0x1 << i) & reslut) {
                            return option[i];
                        }
                    }
                }
            }
        }
    } else {
        for (var key in WAN_DATA) {
            var reslut;
            if (key.indexOf("_VID_") != -1) {
                if (WAN_DATA[key].index == WAN_PM.lkname.val()) {
                    if (WAN_DATA[key].itfGroup == WAN_PM.itfGroup.val()) {
                        return false;
                    }
                } else {
                    reslut = WAN_DATA[key].itfGroup & parseInt(WAN_PM.itfGroup.val());
                    if (reslut) {
                        for (var i = 0; i < 13; i++) {
                            if ((0x1 << i) & reslut) {
                                return option[i];
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}


function WAN_PAGE_check_input(tar_button) {
    if (WAN_PM.lkname.val() == "new") {
        WAN_PM.lst.val("");
    } else {
        WAN_PM.lst.val(WAN_PM.lkname.val("-name"));
    }
    if (tar_button.prop("id") == "WAN_Config_Submit") {
        WAN_PM.action.val("sv");
    } else if (tar_button.prop("id") == "WAN_Config_Del") {
        WAN_PM.action.val("rm");
        return true;
    } else {
        console.log("action init error!");
    }

    if (0) {
        swal_check_warning("input[name='vid']", arrLang[lang]["LANG_STRCONNECTEXIST"]);
        return;
    }

    var conflit_port = check_port_binding_exist();
    if (conflit_port) {
        MyAlert(arrLang[lang]["LANG_PORT_BINDING_EXIST"] + " -> " + conflit_port);
        return false;
    }

    if ((WAN_PM.vlan.val() == "1") && ((sji_checkdigitrange($("input[name='vid']").val(), 0, 4096) == false) || (check_vlan_reserved($("input[name='vid']").val()) == true))) {
        swal_check_warning("input[name='vid']", alert_of_reserver_vlan);
        return false;
    }

    if ((($("input[name='ipmode']").val() != 2) && (sji_checkdigitrange($("input[name='mtu']").val(), 650, 1500) == false))) {
        swal_check_warning("input[name='mtu']", arrLang[lang]["LANG_INVALID_MTU_VALUE_YOU_SHOULD_SET_A_VALUE_BETWEEN_650_1500"]);
        return false;
    }

    if ((($("input[name='ipmode']").val() == 2) && (sji_checkdigitrange($("input[name='mtu']").val(), 650, 1492) == false))) {
        swal_check_warning("input[name='mtu']", arrLang[lang]["LANG_INVALID_MTU_VALUE_YOU_SHOULD_SET_A_VALUE_BETWEEN_650_1492"]);
        return false;
    }

    if ($("input[name='lkmode']").val() == 1 && $("input[name='ipmode']").val() == 1 && $("input[name='IpProtocolType']").val() != "2" && sji_checkvip($("input[name='ipAddr']").val()) == false) {
        swal_check_warning("input[name='ipAddr']", arrLang[lang]["LANG_IP_ADDRESS"] + "\"" + $("input[name='ipAddr']").val() + "\"" + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_TRY_AGAIN"]);
        return false;
    }

    if ($("input[name='lkmode']").val() == 1 && $("input[name='ipmode']").val() == 1 && $("input[name='IpProtocolType']").val() != "2" && sji_checkmask($("input[name='netMask']").val()) == false) {
        swal_check_warning("input[name='netMask']", arrLang[lang]["LANG_SUBNET_MASK"] + "\"" + $("input[name='netMask']").val() + "\"" + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_TRY_AGAIN"]);
        return false;
    }

    if ($("input[name='lkmode']").val() == 1 && $("input[name='ipmode']").val() == 1 && $("input[name='IpProtocolType']").val() != "2" && sji_checkvip($("input[name='remoteIpAddr']").val()) == false) {
        swal_check_warning("input[name='remoteIpAddr']", arrLang[lang]["LANG_DEFAULT_GATEWAY"] + "\"" + $("input[name='remoteIpAddr']").val() + "\"" + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_TRY_AGAIN"]);
        return false;
    }

    if ($("input[name='ipmode']").val() == 2 && $("input[name='lkmode']").val() == 1) {
        if ((WAN_PM.pppUsername.val() == "" || WAN_PM.pppPassword.val() == "")) {
            ((WAN_PM.pppUsername.val() == "") ? swal_check_warning("input[name='pppUsername']", arrLang[lang]["LANG_PPP_USER_NAME_CANNOT_BE_EMPTY"]) : swal_check_warning("input[name='pppPassword']", arrLang[lang]["LANG_PPP_PASSWORD_CANNOT_BE_EMPTY"]))
            return false;
        } else {
            if (WAN_PM.pppUsername.val() != "" && sji_checkpppacc(WAN_PM.pppUsername.val(), 1, 64) == false) {
                var errchr = sji_checkpppacc_errchr(WAN_PM.pppUsername.val());  /* Added by Zhongying for mission#00023738 */
                var errchr_norepeat = sji_checkpppacc_errchr_norepeat(errchr);  /* Added by Zhongying for mission#00023738 */
                swal_check_warning("input[name='pppUsername']", arrLang[lang]["LANG_USERNAME"] + "\"" + WAN_PM.pppUsername.val() + "\"" + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_TRY_AGAIN"] + " ," + arrLang[lang]["LANG_ILLEGAL_CHARACTER"] + " " + errchr_norepeat);
                return false;
            }
            if (!isAllStar(WAN_PM.pppPassword.val())) {
                if (sji_checkpppacc(WAN_PM.pppPassword.val(), 1, 32) == false) {
                    swal_check_warning("input[name='pppPassword']", arrLang[lang]["LANG_PASSWORD"] + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_TRY_AGAIN"]);
                    return false;
                }
            } else if ($("input[name='lkname']").val() == "new") {
                swal_check_warning("input[name='pppPassword']", arrLang[lang]["LANG_PASSWORD"] + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_TRY_AGAIN"]);
                return false;
            }
        }
    }

    if ($("input[name='pppServiceName']").val() != "") {
        if ($("input[name='lkmode']").val() == 1 && $("input[name='ipmode']").val() == 2 && sji_checkpppacc($("input[name='pppServiceName']").val(), 1, 32) == false) {
            swal_check_warning("input[name='pppServiceName']", arrLang[lang]["LANG_SERVICE_NAME"] + "\"" + $("input[name='pppServiceName']").val() + "\"" + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_TRY_AGAIN"]);
            return false;
        }
    }

    if ($("input[name='v4dns1']").val() != "") {
        if ($("input[name='lkmode']").val() == 1 && ($("input[name='ipmode']").val() == 0 || $("input[name='ipmode']").val() == 1) && $("input[name='dnsMode']").val() == 0 && sji_checkvip($("input[name='v4dns1']").val()) == false) {
            swal_check_warning("input[name='v4dns1']", arrLang[lang]["LANG_DNS_FIRST"] + "\"" + $("input[name='v4dns1']").val() + "\"" + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_TRY_AGAIN"]);
            return false;
        }
    }

    if ($("input[name='v4dns2']").val() != "") {
        if ($("input[name='lkmode']").val() == 1 && ($("input[name='ipmode']").val() == 0 || $("input[name='ipmode']").val() == 1) && $("input[name='dnsMode']").val() == 0 && sji_checkvip($("input[name='v4dns2']").val()) == false) {
            swal_check_warning("input[name='v4dns2']", arrLang[lang]["LANG_DNS_SECOND"] + "\"" + $("input[name='v4dns2']").val() + "\"" + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_TRY_AGAIN"]);
            return false;
        }
    }


    if ($("input[name='IpProtocolType']").val() == 3 || $("input[name='IpProtocolType']").val() == 2) {
        if ($("input[name='lkmode']").val() != 0) {

            if (WAN_PM.dslite_enable.val() == "1") {
                var dslitemode = $("input[name='dslite_aftr_mode']").val();
                if (dslitemode == "1") {
                    if ($("input[name='dslite_aftr_hostname']").val() == "") {
                        swal_check_warning("input[name='dslite_aftr_hostname']", arrLang[lang]["AFTR Address_Domain"] + " " + arrLang[lang]["LANG_SHOULD_NOT_BE_EMPTY"]);
                        return false;
                    }
                    var index_of_dot = $("input[name='dslite_aftr_hostname']").val().indexOf('.');
                    if (!isUnicastIpv6Address($("input[name='dslite_aftr_hostname']").val()) ||
                        (index_of_dot != -1)) {
                        swal_check_warning("input[name='dslite_aftr_hostname']", arrLang[lang]["AFTR Address_Domain"] + " " + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_TRY_AGAIN"]);
                        return false;
                    }
                }
            }

            if ($("input[name='AddrMode']").val() == 2) {
                if ($("input[name='Ipv6Addr']").val() == "") {
                    swal_check_warning("input[name='Ipv6Addr']", arrLang[lang]["LANG_PLEASE_INPUT_IPV6_ADDRESS_OR_SELECT_DHCPV6_CLIENT_OR_CLICK_SLAAC"]);
                    return false;
                } else {
                    if (!isGlobalIpv6Address($("input[name='Ipv6Addr']").val())) {
                        swal_check_warning("input[name='Ipv6Addr']", arrLang[lang]["LANG_INVALID_IPV6_ADDRESS"]);
                        return false;
                    }
                    var prefixlen = getDigit($("input[name='Ipv6PrefixLen']").val(), 1);
                    if (prefixlen > 128 || prefixlen <= 0) {
                        swal_check_warning("input[name='Ipv6PrefixLen']", arrLang[lang]["LANG_INVALID_IPV6_PREFIX_LENGTH"]);
                        return false;
                    }
                }
                if ($("input[name='Ipv6Gateway']").val() != "") {
                    if (!isUnicastIpv6Address($("input[name='Ipv6Gateway']").val())) {
                        swal_check_warning("input[name='Ipv6Gateway']", arrLang[lang]["LANG_INVALID_IPV6_GATEWAY_ADDRESS"]);
                        return false;
                    }
                }
            }

            if ($("input[name='Ipv6Dns1']").val() != "") {
                if (($("input[name='ipmode']").val() == 0 || $("input[name='ipmode']").val() == 1) && $("input[name='dnsv6Mode']").val() == 0 && isUnicastIpv6Address($("input[name='Ipv6Dns1']").val()) == false) {
                    swal_check_warning("input[name='Ipv6Dns1']", arrLang[lang]["LANG_INVALID_PRIMARY_IPV6_DNS_ADDRESS"]);
                    return false;
                }
            }

            if ($("input[name='Ipv6Dns2']").val() != "") {
                if (($("input[name='ipmode']").val() == 0 || $("input[name='ipmode']").val() == 1) && $("input[name='dnsv6Mode']").val() == 0 && isUnicastIpv6Address($("input[name='Ipv6Dns2']").val()) == false) {
                    swal_check_warning("input[name='Ipv6Dns2']", arrLang[lang]["LANG_INVALID_SECONDARY_IPV6_DNS_ADDRESS"]);
                    return false;
                }
            }
        }
    }

    WAN_PM.encodePppUserName.val(encode64(WAN_PM.pppUsername.val()));
    WAN_PM.encodePppPassword.val(encode64(WAN_PM.pppPassword.val()));
    WAN_PM.pppUsername.val("");
    WAN_PM.pppPassword.val("");



    var lkmode = $("input[name='lkmode']").val();
    var ipmode = $("input[name='ipmode']").val();
    if (lkmode == "0") {
        $("input[name='cmode']").val("0");
        $("input[name='ipDhcp']").val("0");
    } else {
        if (ipmode == "0") {
            $("input[name='cmode']").val("1");
            $("input[name='ipDhcp']").val("1");
        } else if (ipmode == "1") {
            $("input[name='cmode']").val("1");
            $("input[name='ipDhcp']").val("0");
        } else if (ipmode == "2") {
            $("input[name='cmode']").val("2");
            $("input[name='ipDhcp']").val("0");
        }
    }
    return true;
}

function WAN_PAGE_LOGIC() {
    (function (s) {

        s(".B_lkmode").on("click", function () {
            if ($(this).attr("value") == "0") {
                WAN_PM.disableLanDhcp.val("1");
                WAN_PM.napt.val("0");
                if (WAN_PM.applicationtype.val() != "1" && WAN_PM.applicationtype.val() != "3" && WAN_PM.applicationtype.val() != "2052") {
                    WAN_PM.applicationtype.val("1");
                }
            } else {
                if (WAN_PM.applicationtype.val() != "2" && WAN_PM.applicationtype.val() != "4" && WAN_PM.applicationtype.val() != "5") {
                    WAN_PM.napt.val("1");
                }
                WAN_PM.disableLanDhcp.val("0");
            }
        })


        s(".B_AddrMode").on("click", function () {
            if (WAN_PM.AddrMode.val() == "16")
                WAN_PM.iana.val("1");
            else
                WAN_PM.iana.val("0");
        })


        s("#Network_WAN_Row").on("click", function () {


            if (WAN_PM.lkmode.val() == "1") {
                WAN_PM.ipmode.body(1);
                route_mode();

            } else if (WAN_PM.lkmode.val() == "0") {
                WAN_PM.ipmode.body(0);
                WAN_PM.pppCtype.body(0);
                bridge_mode();
            }

            if (WAN_PM.lkmode.val() == "1" && (WAN_PM.IpProtocolType.val() == "3" || WAN_PM.IpProtocolType.val() == "1")) {
                if (WAN_PM.applicationtype.val() == "2" || WAN_PM.applicationtype.val() == "4" || WAN_PM.applicationtype.val() == "5") {
                    WAN_PM.napt.val("0");
                    WAN_PM.napt.body(0);
                } else {
                    WAN_PM.napt.body(1);
                }
            } else {
                WAN_PM.napt.val("0");
                WAN_PM.napt.body(0);
            }

            if (WAN_PM.vlan.val() == "1") {
                WAN_PM.vid.body(1);
                WAN_PM.vprio.body(1);
            } else {
                WAN_PM.vid.body(0);
                WAN_PM.vprio.body(0);
                WAN_PM.vprio.val("0");
            }

            if (WAN_PM.lkmode.val() == "1" && WAN_PM.ipmode.val() == "2") {
                WAN_PM.pppUsername.body(1);
                WAN_PM.pppPassword.body(1);
                WAN_PM.pppCtype.body(1);
                if (g_page_cstmfun.CF_WAN_PPPOE_HIDE_SERNAME == "0") {
                    WAN_PM.pppServiceName.body(1);
                    if (g_page_cstmfun.CF_WAN_PPPOE_SERNAME != "-") {
                        s("input[name='pppServiceName']").attr("readonly", "true");
                    }
                }
            } else {
                WAN_PM.pppUsername.body(0);
                WAN_PM.pppPassword.body(0);
                WAN_PM.pppServiceName.body(0);
                WAN_PM.pppCtype.body(0);
                s("input[name='pppServiceName']").removeAttr("readonly");
            }

            if (WAN_PM.lkmode.val() == "1" && WAN_PM.ipmode.val() == "1" && WAN_PM.IpProtocolType.val() != "2") {
                WAN_PM.ipAddr.body(1);
                WAN_PM.netMask.body(1);
                WAN_PM.remoteIpAddr.body(1);
            } else {
                WAN_PM.ipAddr.body(0);
                WAN_PM.netMask.body(0);
                WAN_PM.remoteIpAddr.body(0);
            }

            if (WAN_PM.lkmode.val() == "1" && WAN_PM.ipmode.val() == "0" && WAN_PM.IpProtocolType.val() != "2") {
                WAN_PM.dnsMode.body(1);
            } else {
                WAN_PM.dnsMode.body(0);
            }

            if (WAN_PM.lkmode.val() == "1" && WAN_PM.ipmode.val() == "0" && WAN_PM.dnsMode.val() == "0" && WAN_PM.IpProtocolType.val() != "2") {
                WAN_PM.v4dns1.body(1);
                WAN_PM.v4dns2.body(1);
            } else if (WAN_PM.lkmode.val() == "1" && WAN_PM.ipmode.val() == "1" && WAN_PM.IpProtocolType.val() != "2") {
                WAN_PM.dnsMode.val("0");
                WAN_PM.v4dns1.body(1);
                WAN_PM.v4dns2.body(1);
            } else {
                WAN_PM.v4dns1.body(0);
                WAN_PM.v4dns2.body(0);
            }

            if (WAN_PM.lkmode.val() == "1" && WAN_PM.IpProtocolType.val() != "1") {
                $("#IPv6_Place_tips").show();
                WAN_PM.AddrMode.body(1);
                WAN_PM.iapd.body(1);
            } else {
                $("#IPv6_Place_tips").hide();
                WAN_PM.AddrMode.body(0);
                WAN_PM.iapd.body(0);
            }

            if (WAN_PM.lkmode.val() == "1" && WAN_PM.IpProtocolType.val() == "2") {
                WAN_PM.dslite_enable.body(1);
            } else {
                WAN_PM.dslite_enable.body(0);
            }


            if (WAN_PM.lkmode.val() == "1" && WAN_PM.IpProtocolType.val() != "1" && WAN_PM.ipmode.val() == "1") {
                WAN_PM.Ipv6Addr.body(1);
                WAN_PM.Ipv6PrefixLen.body(1);
                WAN_PM.Ipv6Gateway.body(1);
            } else {
                WAN_PM.Ipv6Addr.body(0);
                WAN_PM.Ipv6PrefixLen.body(0);
                WAN_PM.Ipv6Gateway.body(0);
            }

            if (WAN_PM.lkmode.val() == "1" && WAN_PM.IpProtocolType.val() != "1" && WAN_PM.ipmode.val() == "0") {
                WAN_PM.dnsv6Mode.body(1);
            } else {
                WAN_PM.dnsv6Mode.body(0);
            }

            if (WAN_PM.lkmode.val() == "1" && WAN_PM.IpProtocolType.val() != "1" && ((WAN_PM.ipmode.val() == "0" && WAN_PM.dnsv6Mode.val() == "0") || WAN_PM.ipmode.val() == "1")) {
                WAN_PM.dnsv6Mode.val("0");
                WAN_PM.Ipv6Dns1.body(1);
                WAN_PM.Ipv6Dns2.body(1);
            } else {
                WAN_PM.dnsv6Mode.val("1");
                WAN_PM.Ipv6Dns1.body(0);
                WAN_PM.Ipv6Dns2.body(0);
            }

            if (WAN_PM.ipmode.val() == "1") {
                WAN_PM.AddrMode.op("all", 0);
                WAN_PM.AddrMode.op(1, 1);
                WAN_PM.AddrMode.val("2");
            } else if (WAN_PM.ipmode.val() != "1") {
                WAN_PM.AddrMode.op("all", 1);
                WAN_PM.AddrMode.op(1, 0);
                if (WAN_PM.AddrMode.val() == "2" || WAN_PM.AddrMode.val() == "0") { //Modified by fyy for bug#6108
                    WAN_PM.AddrMode.val("1");
                }
            }

            if (WAN_PM.dslite_enable.body().css("display") != "none" && WAN_PM.dslite_enable.val() == "1") {
                WAN_PM.dslite_aftr_mode.body(1);
            } else {
                WAN_PM.dslite_aftr_mode.body(0);
            }


            if (WAN_PM.dslite_aftr_mode.body().css("display") != "none" && WAN_PM.dslite_aftr_mode.val() == "1") {
                WAN_PM.dslite_aftr_hostname.body(1);
            } else {
                WAN_PM.dslite_aftr_hostname.body(0);
            }

            if (WAN_PM.lkname.val() == "new") {
                $("#WAN_Config_Del_Table").hide();
            } else {
                $("#WAN_Config_Del_Table").show();
            }

        });


        $(".B_lkname").on("click", function (e) {
            if ($(this).attr("value") != "new") {
                var tmp = WAN_DATA[$(this).text()];
                set_obj_data_to_html(tmp);
                var itfGroup = parseInt(tmp.itfGroup);
                $("#Binding_selection").find(".justhover").each(function (e) {
                    if (itfGroup & (0x1 << parseInt($(this).attr("value")))) {
                        if (!$(this).hasClass("td_select")) {
                            $(this).addClass("td_select");
                        }
                    } else {
                        $(this).removeClass("td_select");
                    }
                })
                WAN_PM.lkmode.val(parseInt(tmp.cmode) >= 1 ? 1 : 0);
                if (tmp.cmode == 2)
                    WAN_PM.ipmode.val("2");
                else if (tmp.IpProtocolType == "2" && tmp.cmode == "1" && tmp.AddrMode == "1")
                    WAN_PM.ipmode.val("0");
                else if (tmp.IpProtocolType == "2" && tmp.cmode == "1" && tmp.AddrMode == "16")
                    WAN_PM.ipmode.val("0");
                else if (tmp.IpProtocolType == "2" && tmp.cmode == "1")
                    WAN_PM.ipmode.val("1");
                else if (tmp.cmode != "0" && tmp.ipDhcp == "0") {
                    if (tmp.cmode == "1")
                        WAN_PM.ipmode.val("1");
                } else WAN_PM.ipmode.val("0");

                if (tmp.encodePppUserName != "")
                    WAN_PM.pppUsername.val(decode64(tmp.encodePppUserName));
            } else {
                var default_data = "2_INTERNET_B_VID_=index=1&upmode=1&napt=0&cmode=0&brmode=0&AddrMode=0&encodePppUserName=&pppPassword=&pppAuth=0&pppServiceName=&pppACName=&pppCtype=0&ipDhcp=0&ipAddr=0.0.0.0&remoteIpAddr=0.0.0.0&netMask=0.0.0.0&dgw=0&v4dns1=&v4dns2=&dnsMode=1&vlan=0&vid=0&mtu=1500&vprio=0&vpass=0&itfGroup=0&qos=0&PPPoEProxyEnable=0&PPPoEProxyMaxUser=0&applicationtype=1&disableLanDhcp=1&enableBridgeIgmp=0&bandctl_en=0&bandctl_us=0&bandctl_ds=0&IpProtocolType=3&slacc=0&staticIpv6=0&Ipv6Addr=&Ipv6Gateway=&Ipv6Dns1=&Ipv6Dns2=&DSLiteRemoteIP=&dslite_enable=0&Ipv6PrefixLen=&itfenable=0&iana=0&iapd=0&dslite_aftr_mode=0&dslite_aftr_hostname=::&dnsv6Mode=1&";
                default_data = nest_obj_init(default_data);
                set_obj_data_to_html(default_data);
                WAN_PM.lkmode.val("0");
                WAN_PM.ipmode.val("0");
                WAN_PM.AddrMode.val("1");
                WAN_PM.dnsMode.val("1");
                WAN_PM.IpProtocolType.val("3");
                WAN_PM.disableLanDhcp.val("1");
                WAN_PM.iapd.val("1");
                $("#Binding_selection").find(".justhover").each(function (e) {
                    $(this).removeClass("td_select");
                })
            }
        })

        WAN_PM.ipmode.op("2").on("click", function () {
            WAN_PM.mtu.val("1492");
        });

        WAN_PM.ipmode.op("0").on("click", function () {
            WAN_PM.mtu.val("1500");
            WAN_PM.dnsMode.val("1");
            WAN_PM.dnsv6Mode.val("1");
        });

        WAN_PM.ipmode.op("1").on("click", function () {
            WAN_PM.mtu.val("1500");
        });

        if (g_page_cstmfun.CF_WAN_CUSTOM_SERVICE && g_page_cstmfun.CF_WAN_CUSTOM_SERVICE != "-") {
            $(".B_applicationtype[value='2052']").text(g_page_cstmfun.CF_WAN_CUSTOM_SERVICE);
        } else {
            $(".B_applicationtype[value='2052']").remove();
        }
    })(jQuery);
}


var WAN_DATA;

function WAN_Data_init() {
    var obj = {};
    var lkname_selection = [
        ["new", arrLang[lang]['LANG_ADD_NEW_WAN_LINK']]
    ]
    Page_data_obj_init(obj, OneForAll("getASPdata/initPageEth", 5, 0, 0, 0));
    for (var key in obj) {
        if (key.indexOf("_VID_") != -1) {
            obj[key] = nest_obj_init(obj[key]);
            lkname_selection.push([obj[key]["index"], key]);
        }
    }
    WAN_DATA = obj;
    return lkname_selection
}

function success_refresh() {
    if (WAN_PM.action.val() == "sv" && WAN_PM.lkname.val() == "new") {
        $("#NAT_Choose_row").remove();
        $("#Network_WAN_Row").remove();
        WAN_MAIN();
        var length = $(".B_lkname").length;
        $(".B_lkname").eq(length - 1).click();
    } else if (WAN_PM.action.val() == "sv" && WAN_PM.lkname.val() != "new") {
        var index = WAN_PM.lkname.val();
        $("#NAT_Choose_row").remove();
        $("#Network_WAN_Row").remove();
        WAN_MAIN();
        $(".B_lkname[value=\"" + index + "\"]").click();
    } else {
        $("#NAT_Choose_row").remove();
        $("#Network_WAN_Row").remove();
        WAN_MAIN();
        $(".B_lkname[value='new']").click();
    }
}


function wrong_refresh(msg) {
    MyAlert(L(msg));
    // if(msg.indexOf("LANG_")!=-1)
    //     swal_check_warning("*",arrLang[lang][msg]);
    // else
    //     swal_check_warning("*",msg);
}

function NAT_Data_init() {
    var obj = {}
    Page_data_obj_init(obj, OneForAll("getASPdata/init_NAT_Setting", 5, 0, 0, 0));
    set_obj_data_to_html(obj);
}

var WAN_PM = {}

function WAN_MAIN() {
    Network_WAN_Page_init();
    Binding_selection_operate_init();
    Binding_selection_hide_init();
    WAN_PAGE_LOGIC();
    NAT_Data_init();
    $(".B_lkname").eq(0).click();
    FMask_init();
}
$(document).ready(function () {
    Reserve_vlan_process(OneForAll("getASPdata/get_Reserve_Vlan", 5, 0, 0));
    WAN_MAIN();
});
