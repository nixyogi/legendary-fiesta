function lan_ipv4_page() {
    var ori_lan_ip = "";
    var auto_jump_timeout;
    function auto_jump_to_new_lan_ip()
    {
        if ($("input[name='uIp']").val() != ori_lan_ip) {
            var new_ip = $("input[name='uIp']").val();
            auto_jump_timeout = setTimeout(function(){
                window.location = "http://" + new_ip;
            }, 5000);
        }
    }

    function IPv4_LAN_input_check() {
        if (sji_checkvip($("input[name='uIp']").val()) == false) {
            swal_check_warning("input[name='uIp']", $("input[name='uIp']").val() + " " + arrLang[lang]["LANG_IS_INVALID"] + " IP " + arrLang[lang]["LANG_ADDRESS"]);
            return false;
        }
        if (sji_checkmask($("input[name='uMask']").val()) == false) {
            swal_check_warning("input[name='uMask']", $("input[name='uMask']").val() + " " + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_SUBNET_MASK"]);
            return false;
        }
        if ($("input[name='uDhcpType']").val() == "1") {
            if (sji_checkvip($("input[name='dhcpRangeStart']").val()) == false || !(isSameSubNet($("input[name='uIp']").val(), $("input[name='uMask']").val(), $("input[name='dhcpRangeStart']").val(), $("input[name='uMask']").val())) || $("input[name='uIp']").val() == $("input[name='dhcpRangeStart']").val()) {
                swal_check_warning("#Start_IPAddress", $("input[name='dhcpRangeStart']").val() + " " + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_START"] + " " + arrLang[lang]["LANG_ADDRESS"]);
                return false;
            }
            if (sji_checkvip($("input[name='dhcpRangeEnd']").val()) == false || !(isSameSubNet($("input[name='uIp']").val(), $("input[name='uMask']").val(), $("input[name='dhcpRangeEnd']").val(), $("input[name='uMask']").val()))) {
                swal_check_warning("#END_IPAddress", $("input[name='dhcpRangeEnd']").val() + " " + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_END"] + " " + arrLang[lang]["LANG_ADDRESS"]);
                return false;
            }
            if (sji_ipcmp($("input[name='dhcpRangeStart']").val(), $("input[name='dhcpRangeEnd']").val()) > 0) {
                swal_check_warning("#END_IPAddress", arrLang[lang]["LANG_END_ADDRESS_MUST_BIG_THANSTART_ADDRESS"]);
                return false;
            }
            if ($("input[name='ipv4landnsmode']").val() == 1) {
                if (sji_checkvip($("input[name='Ipv4Dns1']").val()) == false) {
                    swal_check_warning("input[name='ipv4landnsmode']", $("input[name='Ipv4Dns1']").val() + " " + arrLang[lang]["LANG_IS_INVALID"] + " DNS " + arrLang[lang]["LANG_ADDRESS"]);
                    return false;
                }
                if (sji_checkvip($("input[name='Ipv4Dns2']").val()) == false) {
                    swal_check_warning("input[name='Ipv4Dns2']", $("input[name='Ipv4Dns2']").val() + " " + arrLang[lang]["LANG_IS_INVALID"] + " DNS " + arrLang[lang]["LANG_ADDRESS"]);
                    return false;
                }
            }
        } else if ($("input[name='uDhcpType']").val() == "2") {
            if (sji_checkvip($("input[name='uServerIp']").val()) == false || $("input[name='uIp']").val() == $("input[name='uServerIp']").val()) {
                swal_check_warning("input[name='uServerIp']", "DHCP " + arrLang[lang]["LANG_SERVER"] + " IP " + $("input[name='uServerIp']").val() + " " + arrLang[lang]["LANG_IS_INVALID"]);
                return false;
            }
        }

        auto_jump_to_new_lan_ip();
        return true;
    }

    function page_refresh() {
        var obj = {};
        Page_data_obj_init(obj, getASPdata("init_dhcpmain_page"));
        set_obj_data_to_html(obj);
        ori_lan_ip = obj.uIp;
        $("#lan_v4_row").click();
    }

    function page_refresh_error() {
        clearTimeout(auto_jump_timeout);
        page_refresh();
    }

    var lan_v4_PM = APG.new([
        ["lan_v4_row", "arrLang[lang]['IPv4 LAN Configuration']", "2"],
        ["form", "lan_v4_form", "action=\"/boaform/getASPdata/formDhcpd\"method=\"POST\"", "1", page_refresh, page_refresh_error],
        ["text", "lanv4_addr", L("LANG_TIP_ADDR"), "uIp"],
        ["text", "lanv4_mask", L("LANG_SUBNET_MASK"), "uMask"],
        ["switch", "lanv4_serv_enable", L("Enable DHCP Server"), "uDhcpType"],
        ["text", "v4_start_addr", L("Start IP Address"), "dhcpRangeStart"],
        ["text", "dhcpRangeEnd", L("End IP Address"), "dhcpRangeEnd"],
        ["menu", "Lease_Time_v4", L("LANG_LEASE_TIME"), "ulTime", [
            ["60", L("LANG_ONE_MINUTE")],
            ["3600", L("LANG_ONE_HOUR")],
            ["86400", L("LANG_ONE_DAY")],
            ["604800", L("LANG_ONE_WEEK")],
        ]],
        ["menu", "lan_v4_dns_mode", L("LAN DNS Mode"), "ipv4landnsmode", [
            ["0", "HGW Proxy"],
            ["1", "Static"],
            ["2", "From ISP"],
        ]],
        ["text", "v4_dns1", L("Primary IP DNS"), "Ipv4Dns1"],
        ["text", "v4_dns2", L("Secondary IP DNS"), "Ipv4Dns2"],
        ["switch", "en_v4_dhcp_relay", L("Enable DHCP Server Relay"), "v4_dhcp_relay"],//??
        ["text", "v4_dhcp_relay_ip", L("DHCP Server IP"), "uServerIp"],
        ["submit", "lan_v4_submit", IPv4_LAN_input_check],
    ]);
    lan_v4_PM.Logic(function () {
        lan_v4_PM.uDhcpType.relate({
            "1": ["dhcpRangeStart", "dhcpRangeEnd", "ulTime",
                "ipv4landnsmode", "Ipv4Dns1", "Ipv4Dns2"],
            "0": ["v4_dhcp_relay", "uServerIp"],
        });
        if (lan_v4_PM.uDhcpType.val() == "1")
            lan_v4_PM.v4_dhcp_relay.val("0");
        lan_v4_PM.ipv4landnsmode.relate({
            "1": ["Ipv4Dns1", "Ipv4Dns2"],
        });
        lan_v4_PM.v4_dhcp_relay.relate({
            "1": ["uServerIp"]
        });
    });
    page_refresh();
}

function lan_ipv6_page() {
    var v6_data = get_nest_data_obj(getASPdata("IPv6_LAN_Page_init"));
    function v6_wan_list() {
        var list = [];
        for (var i in v6_data["ext_if_list"]) {
            list.push([v6_data["ext_if_list"][i], i]);
        }
        return list;
    }
    var lan_v6_PM = APG.new([
        ["lan_v6_row", L("IPv6 LAN Configuration"), "2"],
        ["form", "lan_v6_form", "action=\"/boaform/getASPdata/formDhcpServerV6\"method=\"POST\"", "1", page_refresh, page_refresh],
        ["text", "lanv6_addr", L("LANG_IPV6_ADDRESS"), "lanIpv6addr"],
        ["menu", "lan_v6_dns_mode", L("IPv6 LAN DNS Mode"), "ipv6landnsmode", [
            ["0", "HGW Proxy"],
            ["1", "WAN Connection"],
            ["2", "Static"],
        ]],
        ["menu", "v6_dns_wan", L("LANG_INTERFACE"), "ext_if_dns", v6_wan_list()],
        ["text", "v6_dns1", L("Primary IPv6 DNS"), "Ipv6Dns1"],
        ["text", "v6_dns2", L("Secondary IPv6 DNS"), "Ipv6Dns2"],
        ["menu", "v6_prefix", L("LAN Prefix Delegation"), "ipv6lanprefixmode", [
            ["0", "WAN Delegated"],
            ["1", "Static"],
        ]],
        ["menu", "v6_prefix_wan", L("LANG_INTERFACE"), "ext_if_prefix", v6_wan_list()],
        ["text", "v6_static_prefix", L("IPv6 Prefix : (2001::/64)"), "lanIpv6prefix"],
        ["append", "<div style=\"text-align: left;\" class=\"pt-2\"><b  class=\"text-left tips_font\">" + L("LANG_DHCPV6") + "</b></div>"],
        ["switch", "dhcp_v6_enable", L("DHCPv6 Mode"), "dhcpdenable"],
        ["text", "dhcp_v6_start", L("Start IP Address(IPv6)"), "dhcpv6RangeStart", "19"],
        ["text", "dhcp_v6_end", L("End IP Address(IPv6)"), "dhcpv6RangeEnd", "19"],
        ["text", "v6_valid_lifeTime", L("LANG_VALID_LIFETIME"), "Dltime"],
        ["text", "v6_perfer_lifeTime", L("LANG_PREFERRED_LIFETIME"), "PFtime"],
        ["submit", "lan_v6_submit", IPv6_LAN_input_check],
    ]);
    lan_v6_PM.Logic(function () {
        lan_v6_PM.ipv6landnsmode.relate({
            "1": ["ext_if_dns"],
            "2": ["Ipv6Dns1", "Ipv6Dns2"],
        });
        lan_v6_PM.ipv6lanprefixmode.relate({
            "1": ["lanIpv6prefix"],
            "0": ["ext_if_prefix"],
        });
        lan_v6_PM.dhcpdenable.relate({
            "1": ["dhcpv6RangeStart", "dhcpv6RangeEnd", "Dltime", "PFtime"],
        });
        if ($("input[name='dhcpdenable']").val() == "1") {
            if ($("input[name='ipv6lanprefixmode']").val() == "0") {
                lan_v6_PM.Dltime.body(0);
                lan_v6_PM.PFtime.body(0);
            } else {
                lan_v6_PM.Dltime.body(1);
                lan_v6_PM.PFtime.body(1);
            }
        }
    });
    function page_refresh() {
        var obj = {};
        Page_data_obj_init(obj, getASPdata("IPv6_LAN_Page_init"));
        set_obj_data_to_html(obj);
        $("#lan_v6_row").click();
    }
    page_refresh();
}

function reserve_mac_ip_page() {
    var res_PM = APG.new([
        ["reserve_mac_ip_row", L("LANG_RESERVE_IP_ADDRESS_LIST"), "2"],
        ["append", "<div id='reserve_mac_ip_tab'></div>"],
        ["form", "lan_dhcp_reserve", "action=\"/boaform/getASPdata/formMacAddrBase\"method=\"POST\"", "1", page_refresh, page_refresh],
        ["hidden", "macAddr_Dhcp_d", ""],
        ["hidden", "ipAddr_Dhcp_d", ""],
        ["button", "dhcp_reserve_add", L("LANG_ADD"), "btn-info"],
        ["append", "<div><br></div>"],
        ["submit", "dhcp_reserve_rm", , L("LANG_DELETE_SELECTED"), "btn-danger"],
    ]);
    $("#reserve_lan_dhcp_submit").hide();
    page_refresh();
    function page_refresh() {
        var res_data = getASPdata("showMACBaseTable");
        var obj = get_nest_data_obj(res_data);
        APG.new_tbl({
            direction: 0,
            selector: $("#reserve_mac_ip_tab"),
            header: ["MAC Address", "IP Address"],
            contain: ["mac", "ip"],
            origin: obj,
            origin_key_word: "list",
            td_width: "50%",
            table_mapping: [res_PM.macAddr_Dhcp_d, res_PM.ipAddr_Dhcp_d],
        });
        $(".layui-layer-close").click();
    }

    function check_flow_submit() {
        if (!sji_checkmac2($("input[name='macAddr_Dhcp_a']").val())) {
            swal_check_warning("input[name='macAddr_Dhcp_a']", "MAC " + arrLang[lang]['LANG_IS_INVALID']);
            return false;
        }
        if (!checkHostIP($("input[name='ipAddr_Dhcp_a']"), 1)) {
            return false;
        }
        return true;
    }

    APG.new_flow({
        id: "reserve_dhcp_add_f",
        name: L("LANG_ADD") + " " + L("LANG_RESERVE_IP_ADDRESS_LIST"),
        width: "500",
        click: $("#dhcp_reserve_add"),
        click_page: [
            ["form", "lan_dhcp_reserve_add", "action=\"/boaform/getASPdata/formMacAddrBase\"method=\"POST\"", "1", page_refresh, page_refresh],
            ["text", "f_reserve_dhcp_mac", "MAC", "macAddr_Dhcp_a", , "placeholder=\"00:90:96:01:2A:3B\""],
            ["text", "f_reserve_dhcp_ip", "IP", "ipAddr_Dhcp_a", , "placeholder=\"192.168.1.2\""],
            ["hidden", "action", "sv"],
            ["submit", "f_reserve_dhcp_submit", check_flow_submit]
        ]
    });
}

function ra_config_page() {
    var rac_PM = APG.new([
        ["ra_config_page_row", L("RA Configuration"), "2"],
        ["form", "ra_config_form", "action=\"/boaform/getASPdata/formRadvdSetup\"", "1"],
        ["switch", "ra_enable", L("RA Enable"), "radvd_enable"],
        ["switch", "adv_mgm_flag_act", L("LANG_ADVMANAGEDFLAG"), "AdvManagedFlagAct"],
        ["switch", "adv_oth_config_flag", L("LANG_ADVOTHERCONFIGFLAG"), "AdvOtherConfigFlagAct"],
        ["text", "max_rtr_adv_interval", L("LANG_MAXRTRADVINTERVAL"), "MaxRtrAdvIntervalAct"],
        ["text", "min_rtr_adv_interval", L("LANG_MINRTRADVINTERVAL"), "MinRtrAdvIntervalAct"],
        ["submit", "ra_config_submit", IPv6_LAN_RA_config_check]
    ]);
    function page_refresh() {
        var obj = {};
        Page_data_obj_init(obj, getASPdata("IPv6_RA_Config_init"));
        set_obj_data_to_html(obj);
        $("#ra_config_page_row").click();
    }
    page_refresh();
}



function check_IP_Range(IP) {
    var Set_IP_Value = parseInt(IP.substring(IP.lastIndexOf(".") + 1, IP.length));
    var Range_Value = parseInt(lan_IP_ST.substring(lan_IP_ST.lastIndexOf(".") + 1, lan_IP_ST.length));
    if (Set_IP_Value < Range_Value)
        return false;
    else
        return true;
}


var dhcpRangeStart_default_val = "0001:0001:0001:0001";
var dhcpRangeEnd_default_val = "0002:0002:0002:0002";


function IPv6_LAN_input_check() {
    var tar = $("#LAN_row_3");

    if ($("input[name='lanIpv6addr']").val().length != 0) {
        if (!isLinkLocalIpv6Address($("input[name='lanIpv6addr']").val())) {
            swal_check_warning("input[name='lanIpv6addr']", arrLang[lang]["LANG_INVALID_LAN_IPV6_IP"]);
            $("input[name='lanIpv6addr']").val("fe80::1");
            return false;
        }
    }

    if ($("input[name='ipv6landnsmode']").val() == 2) {
        if ($("input[name='Ipv6Dns1']").val().lenght == 0 && $("input[name='Ipv6Dns2']").val().lenght == 0) {
            swal_check_warning("input[name='Ipv6Dns1']", " DNS " + arrLang[lang]["LANG_IP_ADDRESS_CANNOT_BE_EMPTY"]);
            return false;
        } else {
            if ($("input[name='Ipv6Dns1']").val().lenght != 0) {
                if (!isUnicastIpv6Address($("input[name='Ipv6Dns1']").val())) {
                    swal_check_warning("input[name='Ipv6Dns1']", arrLang[lang]["LANG_INVALID_PRIMARY_IPV6_DNS_ADDRESS"]);
                    return false;
                }
            }
            if ($("input[name='Ipv6Dns2']").val().lenght != 0) {
                if (!isUnicastIpv6Address($("input[name='Ipv6Dns2']").val())) {
                    swal_check_warning("input[name='Ipv6Dns1']", arrLang[lang]["LANG_INVALID_SECONDARY_IPV6_DNS_ADDRESS"]);
                    return false;
                }
            }
        }
    }

    if ($("input[name='ipv6lanprefixmode']").val() == 1) {
        if ($("input[name='lanIpv6prefix']").val() == "") {
            swal_check_warning("input[name='lanIpv6prefix']", arrLang[lang]["LANG_INVALID_6RD_PREFIX_ADDRESS"]);
            return false;
        } else if (validateKeyV6Prefix($("input[name='lanIpv6prefix']").val()) == 0) {
            swal_check_warning("input[name='lanIpv6prefix']", arrLang[lang]["LANG_INVALID_6RD_PREFIX_LENGTH"]);
            return false;
        } else {
            var tmp = $("input[name='lanIpv6prefix']").val();
            tmp = tmp.substring(tmp.indexOf("/") + 1);
            tmp = parseInt(tmp);
            if (tmp > 64 || tmp < 48) {
                swal_check_warning("input[name='lanIpv6prefix']", arrLang[lang]["LANG_INVALID_LAN_IPV6_PREVIX"]);
                return false;
            }
        }
    }


    var RS = $("input[name='dhcpv6RangeStart']");
    var RE = $("input[name='dhcpv6RangeEnd']");
    var ValidT = $("input[name='Dltime']");
    var PreferT = $("input[name='PFtime']");
    if ($("input[name='dhcpdenable']").val() == "1") {
        if (RS.val().length == 0) {
            swal_check_warning("input[name='dhcpdenable']", arrLang[lang]["LANG_START_IP_ADDRESS_CANNOT_BE_EMPTY_FORMAT_IS_IPV6_ADDRESS_FOR_EXAMPLE_2000_0200_10"]);
            RS.val(dhcpRangeStart_default_val);
            return false;
        } else {
            if (RS.val().length != 19 || !isUnicastIpv6AddressForDHCPv6('0:0:0:0:' + RS.val())) {
                swal_check_warning("#dhcp_v6_start", arrLang[lang]["LANG_INVALID_START_IP"]);
                return false;
            }
        }
        if (RE.val().length == 0) {
            swal_check_warning("#dhcp_v6_end", arrLang[lang]["LANG_END_IP_ADDRESS_CANNOT_BE_EMPTY_FORMAT_IS_IPV6_ADDRESS_FOR_EXAMPLE_2000_0200_20"]);
            RE.val(dhcpRangeEnd_default_val);
            return false;
        } else {
            if (RE.val().length != 19 || !isUnicastIpv6AddressForDHCPv6('0:0:0:0:' + RE.val())) {
                swal_check_warning("#dhcp_v6_end", arrLang[lang]["LANG_INVALID_END_IP"]);
                return false;
            }
        }
        if (!sji_checkdigit2(ValidT.val())) {
            swal_check_warning("input[name='Dltime']", ValidT.val() + " " + arrLang[lang]["LANG_IS_INVALID"]);
            return false
        }
        if (!sji_checkdigit2(PreferT.val())) {
            swal_check_warning("input[name='PFtime']", PreferT.val() + " " + arrLang[lang]["LANG_IS_INVALID"]);
            return false
        }
    }
    return true;
}


function IPv6_LAN_RA_config_check() {
    MaxRtrAdvIntervalAct = $("input[name='MaxRtrAdvIntervalAct']").val();
    MinRtrAdvIntervalAct = $("input[name='MinRtrAdvIntervalAct']").val();

    /*Modified by fyy for bug#6054*/
    if (MaxRtrAdvIntervalAct.length == 0 || checkDigit(MaxRtrAdvIntervalAct) == 0) { 
        swal_check_warning("input[name='MaxRtrAdvIntervalAct']", arrLang[lang]["LANG_INVALID_MAXRTRADVINTERVAL_IT_SHOULD_BE_THE_DECIMAL_NUMBER_0_9"]);
        return false;
    }
    MaxRAI = parseInt(MaxRtrAdvIntervalAct, 10);
    if (MaxRAI < 4 || MaxRAI > 1800) {
        swal_check_warning("input[name='MaxRtrAdvIntervalAct']", arrLang[lang]["LANG_MAXRTRADVINTERVAL_MUST_BE_NO_LESS_THAN_4_SECONDS_AND_NO_GREATER_THAN_1800_SECONDS"]);
        return false;
    }
    if (MinRtrAdvIntervalAct.length == 0 || checkDigit(MinRtrAdvIntervalAct) == 0)  {
        swal_check_warning("input[name='MinRtrAdvIntervalAct']", arrLang[lang]["LANG_INVALID_MINRTRADVINTERVAL_IT_SHOULD_BE_THE_DECIMAL_NUMBER_0_9"]);
        return false;
    }
    /*End of bug#6054*/
    MinRAI = parseInt(MinRtrAdvIntervalAct, 10);
    MaxRAI075 = 0.75 * MaxRAI;
    if (MinRAI < 3 || MinRAI > MaxRAI075) {
        swal_check_warning("input[name='MinRtrAdvIntervalAct']", arrLang[lang]["LANG_MINRTRADVINTERVAL_MUST_BE_NO_LESS_THAN_3_SECONDS_AND_NO_GREATER_THAN_0_75_MAXRTRADVINTERVAL"]);
        return false;
    }
    return true;
}


$(document.ready).ready(function () {
    lan_ipv4_page();
    reserve_mac_ip_page();
    lan_ipv6_page();
    ra_config_page();
    FMask_init();
});
