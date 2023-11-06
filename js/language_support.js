var lang = "";
var g_page_cstmfun = {};
var g_page_attr = {
    no_2_4G: 0,
    no_5G: 0,
    no_wlan: 0,
    no_wifi6: 0,
    no_usb: 0,
    no_voip: 0,
    no_catv: 0,
    no_mqtt: 0,
    no_self_diag: 0,
    no_wlan_cli_mgm: 0,
    no_sys_log: 0,
    no_lan1: 0,
    no_lan2: 0,
    no_lan3: 0,
    no_lan4: 0,
    no_lan5: 0,
    no_lan6: 0,
    no_lan7: 0,
    no_lan8: 0,
    no_ftp: 0,
    no_tftp: 0,
    no_https: 0,
    no_ssh: 0,
    no_diag_iperf_test: 0,
    no_ap_detect: 0,
    no_web_user_log:0,
};
let c_page_is_init = 0;

function custom_page_init() {
    Page_data_obj_init(g_page_cstmfun, getASPdata("custom_page"));
    var value = parseInt(g_page_cstmfun.page_attr);
    g_page_attr.no_2_4G = !(value & 1<<0);
    g_page_attr.no_5G = !(value & 1<<1);
    g_page_attr.no_wlan = !(value & 0x03);
    g_page_attr.no_usb = !(value & 1<<2);
    g_page_attr.no_voip = !(value & 1<<3);
    g_page_attr.no_catv = !(value & 1<<4);
    g_page_attr.no_mqtt = !(value & 1<<5);
    g_page_attr.no_self_diag = !(value & 1<<6);
    g_page_attr.no_wlan_cli_mgm = !(value & 1<<7);
    g_page_attr.no_sys_log = !(value & 1<<8);
    g_page_attr.no_wifi6 = !(value & 1<<9);
    g_page_attr.no_ftp = !(value & 1<<10);
    g_page_attr.no_tftp = !(value & 1<<11);
    g_page_attr.no_https = !(value & 1<<12);
    g_page_attr.no_ssh = !(value & 1<<13);
    g_page_attr.no_diag_iperf_test = !(value & 1<<14);
    g_page_attr.no_ap_detect = !(value & 1<<15);
    g_page_attr.no_web_user_log = !(value & 1<<16);
    var basic_offset = 24;
    var offset = 0;
    for (; offset < 8; offset++) {
        g_page_attr["no_lan" + (offset + 1)] = !(value & (1 << (basic_offset + offset)));
    }
    setTimeout(function sidebar_custom_go() {
        var check_tar = $(".nav-item");
        if ($("meta[name='is_horizontal_menu']").attr("content")=="1") {
            check_tar = $(".mm-collapse")
        }
        if (check_tar.length == 0) {
            setTimeout(sidebar_custom_go, 10);
            return;
        }
        c_page_is_init = 1;
        page_custom();
        $("#accordionSidebar").removeClass("sidebar_init");
    }, 10);
}
custom_page_init();

$(document.ready).ready(function () {
    switch (g_page_cstmfun.CF_WEB_LANGUAGE) {
        case "1":
            lang = "en";
            break;
        case "2":
            lang = "zh";
            break;
        default:
            switch (navigator.language.slice(0, 2)) {
                case "en":
                    lang = "en";
                    break;
                case "zh":
                    lang = "zh";
                    break;
                default:
                    lang = "en";
                    break;
            }
            break;
    }
    $("#language_support_adaptive").prop("src", "js/LANG_new_" + lang + ".js");
});

function getData(target) {
    return OneForAll(target, 5, 0, 0, 0);
}

function OneForAll(target, mode, Op, selector, time) {
    var result = "";

    target = "/boaform/" + target;

    $.ajaxSetup({ async: false });
    $.get(target, function (data, status) {
        result = data;
    });

    $.ajaxSettings.async = true;
    page_custom();
    return result;
}

function getASPdata(url) {
    return OneForAll("getASPdata/" + url, 5, 0, 0, 0);
}

function L(tar) {
    if (arrLang[lang][tar] == undefined)
        return tar;
    return arrLang[lang][tar];
}

var reservedVlan = [0, 4096];
var alertVlanStr = "";


function check_vlan_reserved(vlanID) {
    var num = reservedVlan.length;

    for (var i = 0; i < num; i++) {
        if (vlanID == reservedVlan[i])
            return true;
    }
    return false;
}





function new_check_vlan(vlanID) {
    if (!sji_checkdigit(vlanID)) {
        return [false, "arrLang[lang][\"LANG_INVALID_VLAN_ID\"]"];
    }
    vlanID = parseInt(vlanID);
    if (vlanID <= 0 || vlanID >= 4096) {
        return [false, "arrLang[lang][\"LANG_INVALID_VLAN_RANGE2\"]"];
    }
    var reserved_data = OneForAll("getASPdata/get_Reserve_Vlan", 5, 0, 0, 0);
    reserved_data = reserved_data.split(",");
    for (var i in reserved_data) {
        if (reserved_data[i].search(/[0-9]/) != -1) {
            reservedVlan.push(reserved_data[i]);
        }
    }

    for (var j in reservedVlan) {
        if (vlanID == reservedVlan[j])
            return [false, "arrLang[lang][\"LANG_VLAN_ID_IS_RESERVED\"]"];
    }
    return [true, "true"];
}




function sji_checkdigit(str) {
    if (typeof str == "undefined") return false;
    var pattern = /^-?[0-9]+((\.[0-9]+)|([0-9]*))$/;
    return pattern.test(str);
}



function sji_checkdigit2(str) {
    if (typeof str == "undefined") return false;
    var pattern = /[^0-9]/;
    if (pattern.test(str) == true) return false;
    return true;
}




function sji_checkdigitrange(num, dmin, dmax) {
    if (typeof num == "undefined")
        return false;
    if (sji_checkdigit2(num) == false)
        return false;

    if (typeof dmin != "undefined" && num < dmin)
        return false;
    if (typeof dmax != "undefined" && num > dmax)
        return false;
    return true;
}



function sji_checkvip(ip) {
    if (typeof ip == "undefined") return false;
    var pattern1 = /^([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){2}(\.([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-4]))$/;
    if (pattern1.test(ip) == false) return false;
    var pattern2 = /^127\..+$/;
    if (pattern2.test(ip) == true) return false;
    return true;
}



function sji_checkmac(mac) {
    if (typeof mac == "undefined") return false;
    var pattern = /^([0-9a-fA-F]{2}(:|-)){5}[0-9a-fA-F]{2}$/;

    return pattern.test(mac);
}

function sji_checkmac2(mac) {
    if (typeof mac == "undefined") return false;

    var pattern = /^([0-9a-fA-F]{2})(:[0-9a-fA-F]{2}){5}$/;
    return pattern.test(mac);
}



function sji_checkip(ip) {
    if (typeof ip == "undefined") return false;
    var pattern = /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3}$/;
    return pattern.test(ip);
}



function sji_checkpppacc(username, smin, smax) {
    var str = username;
    if (typeof username == "undefined") return false;
    if (typeof smin != "undefined" && username.length < smin) return false;
    if (typeof smax != "undefined" && username.length > smax) return false;

    for (var i = 0; i < str.length; i++) {
        if ((str.charAt(i) >= '0' && str.charAt(i) <= '9') || (str.charAt(i) >= 'A' && str.charAt(i) <= 'Z') || (str.charAt(i) >= 'a' && str.charAt(i) <= 'z') ||
            (str.charAt(i) == '.') || (str.charAt(i) == ':') || (str.charAt(i) == '-') || (str.charAt(i) == '_') || (str.charAt(i) == ' ') || (str.charAt(i) == '/') || (str.charAt(i) == '@') ||
            (str.charAt(i) == '!') || (str.charAt(i) == '~') || (str.charAt(i) == '#') || (str.charAt(i) == '$') || (str.charAt(i) == '%') || (str.charAt(i) == '^') || (str.charAt(i) == '&') ||
            (str.charAt(i) == '*') || (str.charAt(i) == '(') || (str.charAt(i) == ')') || (str.charAt(i) == '+') || (str.charAt(i) == '=') || (str.charAt(i) == '?') || (str.charAt(i) == '>') ||
            (str.charAt(i) == '<'))
            continue;
        return false;
    }
    return true;
}

/* Added by Zhongying for mission#00023738 */
function sji_checkpppacc_errchr(username) {
    var str = username;
	var errchr = "";
	
    for (var i = 0; i < str.length; i++) {
        if ((str.charAt(i) >= '0' && str.charAt(i) <= '9') || (str.charAt(i) >= 'A' && str.charAt(i) <= 'Z') || (str.charAt(i) >= 'a' && str.charAt(i) <= 'z') ||
            (str.charAt(i) == '.') || (str.charAt(i) == ':') || (str.charAt(i) == '-') || (str.charAt(i) == '_') || (str.charAt(i) == ' ') || (str.charAt(i) == '/') || (str.charAt(i) == '@') ||
            (str.charAt(i) == '!') || (str.charAt(i) == '~') || (str.charAt(i) == '#') || (str.charAt(i) == '$') || (str.charAt(i) == '%') || (str.charAt(i) == '^') || (str.charAt(i) == '&') ||
            (str.charAt(i) == '*') || (str.charAt(i) == '(') || (str.charAt(i) == ')') || (str.charAt(i) == '+') || (str.charAt(i) == '=') || (str.charAt(i) == '?') || (str.charAt(i) == '>') ||
            (str.charAt(i) == '<'))
            continue;
		errchr = errchr + str.charAt(i);
    }
    return errchr;
}

function sji_checkpppacc_errchr_norepeat(errchr) {
    var str = errchr;
	var errchr_norepeat = "";
	
    for (var i = 0; i < str.length; i++) {
		var j = 0;
		for (j = 0; j < errchr_norepeat.length; j++)
			if (str.charAt(i) == errchr_norepeat.charAt(j))
				break;
		if(j == errchr_norepeat.length)
		errchr_norepeat = errchr_norepeat + str.charAt(i);
    }
    return errchr_norepeat;
}
/* End of mission#00023738 */


function isAllStar(str) {
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) != '*') {
            return false;
        }
    }
    return true;
}



function sji_checkmask(mask) {
    if (typeof mask == "undefined") return false;
    var check_illegal = /[^0-9.]/;
    if (check_illegal.test(mask) == true) return false;
    var pattern = /^((128)|(192)|(224)|(240)|(248)|(252)|(254))(.0){3}$/;
    if (pattern.test(mask) == true) return true;
    pattern = /^255.((0)|(128)|(192)|(224)|(240)|(248)|(252)|(254))(.0){2}$/;
    if (pattern.test(mask) == true) return true;
    pattern = /^255.255.((0)|(128)|(192)|(224)|(240)|(248)|(252)|(254)).0$/;
    if (pattern.test(mask) == true) return true;
    pattern = /^255.255.255.((0)|(128)|(192)|(224)|(240)|(248)|(252)|(254)|(255))$/;
    return pattern.test(mask);
}




function isUnicastIpv6Address(address) {
    var tempAddress = getFullIpv6Address(address);
    if ((tempAddress == '') ||
        (tempAddress == '0000:0000:0000:0000:0000:0000:0000:0000') ||
        (tempAddress == '0000:0000:0000:0000:0000:0000:0000:0001') ||
        (tempAddress.substring(0, 2) == 'ff')) {
        return false;
    }
    return true;
}



function isGlobalIpv6Address(address) {
    var tempAddress = getFullIpv6Address(address);
    if ((tempAddress == '') ||
        (tempAddress == '0000:0000:0000:0000:0000:0000:0000:0000') ||
        (tempAddress == '0000:0000:0000:0000:0000:0000:0000:0001') ||
        (tempAddress.substring(0, 3) == 'fe8') ||
        (tempAddress.substring(0, 3) == 'fe9') ||
        (tempAddress.substring(0, 3) == 'fea') ||
        (tempAddress.substring(0, 3) == 'feb') ||
        (tempAddress.substring(0, 2) == 'ff')) {
        return false;
    }
    return true;
}



function getFullIpv6Address(address) {
    var c = '';
    var i = 0,
        j = 0,
        k = 0,
        n = 0;
    var startAddress = new Array();
    var endAddress = new Array();
    var finalAddress = '';
    var startNum = 0;
    var endNum = 0;
    var lowerAddress;
    var totalNum = 0;
    lowerAddress = address.toLowerCase();
    var addrParts = lowerAddress.split('::');
    if (addrParts.length == 2) {
        if (addrParts[0] != '') {
            startAddress = ParseIpv6Array(addrParts[0]);
            if (startAddress.length == 0) {
                return '';
            }
        }
        if (addrParts[1] != '') {
            endAddress = ParseIpv6Array(addrParts[1]);
            if (endAddress.length == 0) {
                return '';
            }
        }
        if (startAddress.length + endAddress.length >= 8) {
            return '';
        }
    } else if (addrParts.length == 1) {
        startAddress = ParseIpv6Array(addrParts[0]);
        if (startAddress.length != 8) {
            return '';
        }
    } else {
        return '';
    }
    for (i = 0; i < startAddress.length; i++) {
        finalAddress += startAddress[i];
        if (i != 7) {
            finalAddress += ':';
        }
    }
    for (; i < 8 - endAddress.length; i++) {
        finalAddress += '0000';
        if (i != 7) {
            finalAddress += ':';
        }
    }
    for (; i < 8; i++) {
        finalAddress += endAddress[i - (8 - endAddress.length)];
        if (i != 7) {
            finalAddress += ':';
        }
    }
    return finalAddress;
}



function ParseIpv6Array(str) {
    var Num;
    var i, j;
    var finalAddrArray = new Array();
    var falseAddrArray = new Array();
    var addrArray = str.split(':');
    Num = addrArray.length;
    if (Num > 8) {
        return falseAddrArray;
    }
    for (i = 0; i < Num; i++) {
        if ((addrArray[i].length > 4) ||
            (addrArray[i].length < 1)) {
            return falseAddrArray;
        }
        for (j = 0; j < addrArray[i].length; j++) {
            if ((addrArray[i].charAt(j) < '0') ||
                (addrArray[i].charAt(j) > 'f') ||
                ((addrArray[i].charAt(j) > '9') &&
                    (addrArray[i].charAt(j) < 'a'))) {
                return falseAddrArray;
            }
        }
        finalAddrArray[i] = '';
        for (j = 0; j < (4 - addrArray[i].length); j++) {
            finalAddrArray[i] += '0';
        }
        finalAddrArray[i] += addrArray[i];
    }
    return finalAddrArray;
}



function isIPv6(str) {
    return str.match(/:/g).length <= 7 &&
        /::/.test(str) ?
        /^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str) :
        /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str);
}




function getDigit(str, num) {
    i = 1;
    if (num != 1) {
        while (i != num && str.length != 0) {
            if (str.charAt(0) == '.') {
                i++;
            }
            str = str.substring(1);
        }
        if (i != num)
            return -1;
    }
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) == '.') {
            str = str.substring(0, i);
            break;
        }
    }
    if (str.length == 0)
        return -1;
    d = parseInt(str, 10);
    return d;
}



function isSameSubNet(lan1Ip, lan1Mask, lan2Ip, lan2Mask) {
    var count = 0;
    lan1a = lan1Ip.split(".");
    lan1m = lan1Mask.split(".");
    lan2a = lan2Ip.split(".");
    lan2m = lan2Mask.split(".");
    for (i = 0; i < 4; i++) {
        l1a_n = parseInt(lan1a[i]);
        l1m_n = parseInt(lan1m[i]);
        l2a_n = parseInt(lan2a[i]);
        l2m_n = parseInt(lan2m[i]);
        if ((l1a_n & l1m_n) == (l2a_n & l2m_n))
            count++;
    }
    if (count == 4)
        return true;
    else
        return false;
}



function sji_ipcmp(ip1, ip2) {
    if (typeof ip1 == "undefined" || typeof ip2 == "undefined") return -2;
    if (ip1 == ip2) return 0;
    var uip1 = sji_str2ip(ip1);
    var uip2 = sji_str2ip(ip2);
    if (uip1 > 0 && uip2 < 0) return -1;
    if (uip1 < 0 && uip2 > 0) return 1;
    return (uip1 > uip2) ? 1 : -1;
}



function sji_str2ip(str) {
    if (sji_checkip(str) == false) return 0;
    var cells = str.split(".");
    var addr = 0;
    for (var i = 0; i < 4; i++) {
        addr <<= 8;
        addr |= (parseInt(cells[i], 10) & 0xff);
    }
    return addr;
}



function isLinkLocalIpv6Address(address) {
    var tempAddress = getFullIpv6Address(address);
    if ((tempAddress.substring(0, 3) == 'fe8') ||
        (tempAddress.substring(0, 3) == 'fe9') ||
        (tempAddress.substring(0, 3) == 'fea') ||
        (tempAddress.substring(0, 3) == 'feb')) {
        return true;
    }
    return false;
}



function validateKeyV6Prefix(str) {
    find_flag = 0;
    var prefix_len = 0;
    var prefix_len_tmp1 = 0;
    var prefix_len_tmp2 = 0;
    for (var i = 0; i < str.length; i++) {
        if ((str.charAt(i) >= '0' && str.charAt(i) <= '9') ||
            (str.charAt(i) == ':') || (str.charAt(i) == '/') ||
            (str.charAt(i) >= 'A' && str.charAt(i) <= 'F') ||
            (str.charAt(i) >= 'a' && str.charAt(i) <= 'f')) {
            if ((str.charAt(i) == ':' && str.charAt(i - 1) == ':')) {
                if (str.charAt(i + 1) != '/') {
                    return 0;
                }
                find_flag = find_flag + 1;
            }
            if (str.charAt(i) == '/') {
                if (str.charAt(i + 1) < '0' || str.charAt(i + 1) > '9') {
                    return 0;
                }
                if ((i + 2) < str.length) {
                    if (str.charAt(i + 2) < '0' || str.charAt(i + 2) > '9') {
                        return 0;
                    }
                    prefix_len_tmp1 = parseInt(str.charAt(i + 1), 10);
                    prefix_len_tmp1 = prefix_len_tmp1 * 10;
                    prefix_len_tmp2 = parseInt(str.charAt(i + 2), 10);
                    prefix_len = prefix_len_tmp1 + prefix_len_tmp2;
                } else {
                    prefix_len = parseInt(str.charAt(i + 1), 10);
                }
                if (prefix_len > 64 || prefix_len < 3) {
                    return 0;
                }
            }
            if (str.charAt(i) == ':' && str.charAt(i - 1) == ':' && str.charAt(i - 2) == ':') {
                return 0;
            }
            continue;
        }
        return 0;
    }

    if (find_flag != 1) {

        return 0;
    }
    return 1;
}



function isUnicastIpv6AddressForDHCPv6(address) {
    var tempAddress = getFullIpv6Address(address);
    if ((tempAddress == '') ||
        (tempAddress.substring(0, 2) == 'ff')) {
        return false;
    }
    return true;
}



function checkDigit(str) {
    for (var i = 0; i < str.length; i++) {
        if ((str.charAt(i) >= '0' && str.charAt(i) <= '9'))
            continue;
        return 0;
    }
    return 1;
}



function sji_checkhttpurl(url) {
    if (typeof url == "undefined") return false;
    var pattern = /^(https?:\/\/)?((((\d+.){3}\d+)|([a-zA-Z]\w*(.\w+){2,}))(:[0-9]+)?(\/\S*)*)$/;
    return pattern.test(url);
}

function vs_checkhttpurl(url) {
    if (typeof url == "undefined") return false;
    var pattern = /^([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*)$/;
    return pattern.test(url);
}


function sji_checkurl(url) {
    if (typeof url == "undefined") return false;
    var pattern = /^((http|https|ftp):\/\/)?((((\d+.){3}\d+)|([a-zA-Z]\w*(.\w+){2,}))(\/\S*)*)$/;
    return pattern.test(url);
}



function sji_checknum(str) {
    if (typeof str == "undefined") return false;
    var pattern = /^[0-9]{1,}$/;
    return pattern.test(str);
}
/*
 * isCharUnsafe - test a character whether is unsafe
 * @c: character to test
 */
function isInvalidChar(c) {
    var unsafeString = "\"\\`\,='\t";
    return unsafeString.indexOf(c) != -1 ||
        c.charCodeAt(0) <= 32 ||
        c.charCodeAt(0) >= 123;
}
/*
 * isIncludeInvalidChar - test a string whether includes invalid characters
 * @s: string to test
 */
function isInvalidInput(s) {
    var i;
    for (i = 0; i < s.length; i++) {
        if (isInvalidChar(s.charAt(i)) == true)
            return true;
    }
    return false;
}



function sji_checkntp_host(ntp_host) {
    var str = ntp_host;
    if (typeof str == "undefined") return false;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == ';' || str.charAt(i) == '&' || str.charAt(i) == '|')
            return true;
    }
    return false;
}



function checkDest(ip, mask) {
    var i, dip, dmask, nip;
    for (i = 1; i <= 4; i++) {
        dip = getDigit(ip, i);
        dmask = getDigit(mask, i);
        nip = dip & dmask;
        if (nip != dip)
            return true;
    }
    return false;
}



function validateKey(str) {
    for (var i = 0; i < str.length; i++) {
        if ((str.charAt(i) >= '0' && str.charAt(i) <= '9') ||
            (str.charAt(i) == '.'))
            continue;
        return 0;
    }
    return 1;
}



function IsLoopBackIP(str) {
    if (str == "127.0.0.1")
        return 1;
    return 0;
}



function IsInvalidIP(str) {

    d = getDigit(str, 1);
    if (d == 127)
        return 1;
    return 0;
}



function checkDigitRange(str, num, min, max) {
    d = getDigit(str, num);
    if (d > max || d < min)
        return false;
    return true;
}




function checkHostIP(ip, checkEmpty) {
    if (checkEmpty == 1 && ip.val() == "") {
        MyAlert(arrLang[lang]["LANG_CHECK_IP_ERR_1"]);
        ip.focus();
        return false;
    }
    if (validateKey(ip.val()) == 0) {
        MyAlert(arrLang[lang]["LANG_CHECK_IP_ERR_2"]);
        ip.focus();
        return false;
    }
    if (IsLoopBackIP(ip.val()) == 1 || IsInvalidIP(ip.val()) == 1) {
        MyAlert(arrLang[lang]["LANG_CHECK_IP_ERR_3"]);
        ip.focus();
        return false;
    }
    if (!checkDigitRange(ip.val(), 1, 1, 223)) {
        MyAlert(arrLang[lang]["LANG_CHECK_IP_ERR_4"]);
        ip.focus();
        return false;
    }
    if (!checkDigitRange(ip.val(), 2, 0, 255)) {
        MyAlert(arrLang[lang]["LANG_CHECK_IP_ERR_5"]);
        ip.focus();
        return false;
    }
    if (!checkDigitRange(ip.val(), 3, 0, 255)) {
        MyAlert(arrLang[lang]["LANG_CHECK_IP_ERR_6"]);
        ip.focus();
        return false;
    }
    if (!checkDigitRange(ip.val(), 4, 0, 254)) {
        MyAlert(arrLang[lang]["LANG_CHECK_IP_ERR_7"]);
        ip.focus();
        return false;
    }
    return true;
}




function checkNetmask(netmask, checkEmpty) {
    var i, d;
    if (checkEmpty == 1 && netmask.val() == "") {
        MyAlert(arrLang[lang]["LANG_INVALID_IPV4_SUBNET_SHOULD_NOT_EMPTY"]);
        netmask.focus();
        return false;
    }
    if (validateKey(netmask.val()) == 0) {
        MyAlert(arrLang[lang]["LANG_INVALID_IPV4_SUBNET_SHOULD_BE_DECIMAL_NUM"]);
        netmask.focus();
        return false;
    }
    for (i = 1; i <= 4; i++) {
        d = getDigit(netmask.val(), i);
        if (!(d == 0 || d == 128 || d == 192 || d == 224 || d == 240 || d == 248 || d == 252 || d == 254 || d == 255)) {
            MyAlert(arrLang[lang]["LANG_INVALID_IPV4_SUBNET_DIGIT"]);
            netmask.focus();
            return false;
        }
    }
    return true;
}



function sji_checkstrnor(str, smin, smax) {
    if (typeof str == "undefined") return false;
    if (typeof smin != "undefined" && str.length < smin) return false;
    if (typeof smax != "undefined" && str.length > smax) return false;
    var pattern = /^[a-zA-Z0-9%@.,~+=_*&\(\)\[\]:]+$/;
    return pattern.test(str);
}



function sji_checkpswnor(str, smin, smax) {
    if (typeof str == "undefined") return false;
    if (typeof smin != "undefined" && str.length < smin) return false;
    if (typeof smax != "undefined" && str.length > smax) return false;
    var pattern = /^[a-zA-Z0-9%@.,~+=_*&\s\(\)\[\]:]+$/;
    return pattern.test(str);
}



function sji_checkhex(str, smin, smax) {
    if (typeof str == "undefined") return false;
    if (typeof smin != "undefined" && str.length < smin) return false;
    if (typeof smax != "undefined" && str.length > smax) return false;
    var pattern = /^[0-9a-fA-F]+$/;
    return pattern.test(str);
}



function sji_checkLoginPsk(username, smin, smax) {
    var str = username;
    if (typeof username == "undefined") return false;
    if (typeof smin != "undefined" && username.length < smin) return false;
    if (typeof smax != "undefined" && username.length > smax) return false;
    var TypeAZ = 0;
    var Typeza = 0;
    var TypeNum = 0;
    var TypeChar = 0;
    for (var i = 0; i < str.length; i++) {
        if ((str.charAt(i) >= '0' && str.charAt(i) <= '9') || (str.charAt(i) >= 'A' && str.charAt(i) <= 'Z') || (str.charAt(i) >= 'a' && str.charAt(i) <= 'z') ||
            (str.charAt(i) == '.') || (str.charAt(i) == ':') || (str.charAt(i) == '-') || (str.charAt(i) == '_') || (str.charAt(i) == ' ') || (str.charAt(i) == '/') || (str.charAt(i) == '@') ||
            (str.charAt(i) == '!') || (str.charAt(i) == '~') || (str.charAt(i) == '#') || (str.charAt(i) == '$') || (str.charAt(i) == '%') || (str.charAt(i) == '^') || (str.charAt(i) == '*') ||
            (str.charAt(i) == '(') || (str.charAt(i) == ')') || (str.charAt(i) == '+') || (str.charAt(i) == '=') || (str.charAt(i) == '?')) {
            if ((str.charAt(i) >= '0' && str.charAt(i) <= '9'))
                TypeNum = 1;
            else if ((str.charAt(i) >= 'A' && str.charAt(i) <= 'Z'))
                TypeAZ = 1;
            else if ((str.charAt(i) >= 'a' && str.charAt(i) <= 'z'))
                Typeza = 1;
            else if ((str.charAt(i) == '.') || (str.charAt(i) == ':') || (str.charAt(i) == '-') || (str.charAt(i) == '_') || (str.charAt(i) == ' ') || (str.charAt(i) == '/') || (str.charAt(i) == '@') ||
                (str.charAt(i) == '!') || (str.charAt(i) == '~') || (str.charAt(i) == '#') || (str.charAt(i) == '$') || (str.charAt(i) == '%') || (str.charAt(i) == '^') || (str.charAt(i) == '*') ||
                (str.charAt(i) == '(') || (str.charAt(i) == ')') || (str.charAt(i) == '+') || (str.charAt(i) == '=') || (str.charAt(i) == '?'))
                TypeChar = 1;
            else;
            continue;
        }
        return false;
    }
    if ((TypeNum + TypeAZ + Typeza + TypeChar) < 2)
        return false;
    return true;
}



function illegal_char_check(char) {
    var pattern = /[<>&\\=]/;
    return pattern.test(char);
}

function swal_check_warning(selector, word) {
    $(selector).focus();
    MyAlert(word);
}

function checkWarningT(tar, word) {
    tar.focus();
    MyAlert(word);
}


var counting_time;
var reload_target;
var is_count_down_running = 0;
function start_count_down(time, target) {
    if (!is_count_down_running) {
        is_count_down_running = 1;
        $("#waiting_animation").prop("id", "temp_temp");
        $("#temp_temp").hide();
        MyAlert(arrLang[lang]["LANG_DEVICE_RESETTING"]);
        counting_time = time;
        if (target != undefined) {
            reload_target = "http://" + target;
        } else {
            reload_target = "login.html";
        }
        var tar = $("#temp_temp").children("div");
        tar.append("<div class=\"count_down_font\">" + counting_time + "</div>");
        setTimeout(function () {
            $("#temp_temp").show();
            setTimeout(count_down, 1000);
        }, 2000);
        return true;
    }
    return false;
}

function count_down() {
    if (counting_time == 0) {
        window.location = reload_target;
        is_count_down_running = 0;
    } else {
        counting_time--;
        $("#temp_temp").find(".count_down_font").text(counting_time);
        setTimeout(count_down, 1000);
    }
}

function sleep(num) {
    for (var i = 0; i < num; i++) {
        for (var j = 0; j < 1000; j++) { }
    }
}


function set_text_prompt_center() {
    $(".tooltip2text").each(function (e) {
        var parent_width = parseInt($(this).parent("div").css("width"));
        $(this).css("max-width", parent_width - 40);
        var self_width = parseInt($(this).css("width"));
        var center_width = (parent_width - self_width) / 2;
        $(this).css("left", center_width + "px");
    })
}


function Submit_button_center() {
    $("button").each(function (s) {
        if ($(this).text().indexOf(arrLang[lang]["wan_submit"]) != -1) {
            var self_width = parseInt($(this).parent("div").parent("td").css("width"));
            var row_width = parseInt($(this).parents(".card-body").width());
            if (isNaN(row_width)) {
                row_width = parseInt($(this).parents(".shadow").width());
            }
            var result = (row_width - self_width) / 2;
            $(this).parent("div").parent("td").prev("td").prop("width", result);
        }
    })
}

setTimeout(function () {
    (function (s) {
        set_text_prompt_center();

        dropdown_menu_adap();
        $(window).resize(function () {
            set_text_prompt_center();

            dropdown_menu_adap();
        })
        s("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
            set_text_prompt_center();

        })
        $(".tooltip2").hover(function () {
            $(this).children("span").addClass("animated fadeInUp");
        }, function () {
            $(this).children("span").removeClass("animated fadeInUp");
        })
    })(jQuery);
}, 600);



var fadeOut_Time_Mark;
var MyAlert_showing_word = "";
function MyAlert(word) {
    if (MyAlert_showing_word == word)
        return;
    MyAlert_showing_word = word;
    $(".MyAlert").remove();
    clearTimeout(fadeOut_Time_Mark);
    if ($(".MyAlert").length == 0) {
        $("body").prepend("<div class=\"MyAlert animated shadow-sm\" style=\"display:none;z-index:100;\"></div>");
    } else {
        return;
    }
    $(".MyAlert").text("");
    if (word.indexOf("LANG_") != -1) {
        word = "arrLang[lang][\"" + word + "\"]";
        word = eval(word);
    }
    $(".MyAlert").text(word);
    var body_width = parseInt($("body").css("width"));
    var MyAlert_width = parseInt($(".MyAlert").css("width"));
    var MyAlert_height = parseInt($(".MyAlert").css("height"));
    $(".MyAlert").css("left", (body_width - MyAlert_width) / 2);
    $(".MyAlert").css("top", $(window).height() / 2 + $(window).scrollTop() - MyAlert_height);
    $(".MyAlert").addClass("fadeInUp");
    $(".MyAlert").show();
    fadeOut_Time_Mark = setTimeout(function () {
        $(".MyAlert").removeClass("fadeInUp");
        $(".MyAlert").addClass("fadeOutUp");
        setTimeout(function () {
            $("*").off("click", MyAlert_event_fade_out);
            $(".MyAlert").remove();
            MyAlert_showing_word = "";
        }, 500);
    }, 5000);
    (function () {
        $(".MyAlert").hover(function () {
            clearTimeout(fadeOut_Time_Mark);
        }, function () {
            fadeOut_Time_Mark = setTimeout(function () {
                $(".MyAlert").removeClass("fadeInUp");
                $(".MyAlert").addClass("fadeOutUp");
                setTimeout(function () {
                    $(".MyAlert").off('mouseenter').unbind('mouseleave');
                    $("*").off("click", MyAlert_event_fade_out);
                    $(".MyAlert").remove();
                    MyAlert_showing_word = "";
                }, 500);
            }, 1000);
        })
    })(jQuery);
    setTimeout(function () {
        $("*").on("click", MyAlert_event_fade_out);
    }, 500);

}

function MyAlert_event_fade_out(e) {
    if (!$(this).hasClass("MyAlert")) {
        clearTimeout(fadeOut_Time_Mark);
        $(".MyAlert").removeClass("fadeInUp");
        $(".MyAlert").addClass("fadeOutUp");
        setTimeout(function () {
            $("*").off("click", MyAlert_event_fade_out);
            $(".MyAlert").remove();
            MyAlert_showing_word = "";
        }, 500);
    } else {
        $("*").off("click", MyAlert_event_fade_out);
    }

}


function Add_Head_Tips(tar, word) {
    exp = RegExp("\n", 'g');
    word = word.replace(exp, "<br>");
    if ($(tar).prop("class").indexOf("card-header") == -1) {
        var position = $(tar).find(".card-header");
        position.addClass("tooltip2");
        position.prepend("<span class=\"tooltip2text tooltip2-bottom\">" + word + "</span>");
    } else {
        var position = $(tar);
        position.addClass("tooltip2");
        position.prepend("<span class=\"tooltip2text tooltip2-bottom\">" + word + "</span>");
    }
}


function passwd_show_function_init() {
    $("input[type='password']").each(function (e) {
        if ($(this).parents("tr").find(".fa-eye").length==0) {
            $(this).parents("tr").append("<td><i class=\"fa fa-eye disabled\"aria-hidden=\"true\"></i></td>");
        }
    })

    $(".fa-eye").off('click').on('click', function (e) {
        var tar = $(this).parent("td").prev("td").find("input");
        $(this).toggleClass("enable");
        $(this).toggleClass("disabled");
        if ($(this).prop("class").indexOf("enable") != -1) {
            tar.prop("type", "text");
        } else {
            tar.prop("type", "password");
        }
    });
}


function dropdown_menu_adap() {
    var win_width = $(window).width();
    $(".dropdown-toggle,.dropdown-menu").css("max-width", win_width - 200);
}


function FMask_init() {

    var csrf = OneForAll("getASPdata/FMask", 5, 0, 0, 0);
    last_request_time = new Date().getTime();
    $("form").each(function (e) {
        if ($(this).prop("id") == "login_form")
            return;
        if ($(this).find("input[name='csrfMask']").length)
            $(this).find("input[name='csrfMask']").val(csrf);
        else
            $(this).append("<input type='hidden' name='csrfMask' value=\"" + csrf + "\">");
    })
    return csrf;
}
setTimeout(FMask_init, 1000);


var last_request_time;
var now_timestamp;

function Keep_Page_alive() {
    (function (s) {
        s("body").on("click", function (s) {
            if (now_timestamp - last_request_time > 230000) {
                FMask_init();
            }
        })
    })(jQuery);
}
setTimeout(Keep_Page_alive, 3000);


function Page_Time_Remain() {
    now_timestamp = new Date().getTime();
    if (now_timestamp - last_request_time >= 295000) {
        $("#Logout_button").click();
    }
    setTimeout(Page_Time_Remain, 1000);
}
setTimeout(Page_Time_Remain, 2000);

var num_of_abbreviation1 = 0;

function MyHoverAlert(tar, word) {
    $(".MyHoverAlert").remove();
    tar.parents("table").eq(0).css("position", "relative");
    tar.parents("table").eq(0).prepend("<div class=\"MyHoverAlert animated shadow-sm\" style=\"display:none;\"></div>");
    $(".MyHoverAlert").prepend(word);

    $(".MyHoverAlert").show();
}

function MyHoverAlert_event_remove(e) {
    if (!$(this).find(".MyHoverAlert").length) {
        $("*").off("click", MyHoverAlert_event_remove);
        $(".MyHoverAlert").remove();
    }
}

function line_wrap_sign() {
    $("table").each(function (e) {
        if ($(this).prev("table").length > 0 || $(this).nextAll("table").length > 0) {
            var word = $(this).find("th").text();
            $(this).find("th").text("");
            $(this).find("th").append("<div class='abbreviation0'>" + "<span>" + word + "</span>" + "</div>");
        }
    })
    $("table").each(function (e) {
        if ($(this).prop("id").indexOf("Table") != -1) {
            var word_height = parseInt($(this).find("th").eq(0).find("span").css("height"));
            var div_height = parseInt($(this).find("th").eq(0).find("div").css("height"));
            if (word_height > div_height) {
                $(this).find(".abbreviation0").each(function () {
                    $(this).removeClass('abbreviation0');
                    $(this).addClass('abbreviation1');
                })
            }
        }
    })
    $(".abbreviation1").off("click");
    $(".abbreviation1").on("click", function () {
        MyHoverAlert($(this), $(this).text());
        setTimeout(function () {
            $("*").on("click", MyHoverAlert_event_remove);
        }, 200);
    })


    $(window).resize(function () {
        Dynamic_wrap();
    })
}
setTimeout(line_wrap_sign, 500);

function Dynamic_wrap() {
    $(".MyHoverAlert").remove();
    $("table").each(function (e) {
        if ($(this).prop("id").indexOf("Table") != -1) {
            var word_height = parseInt($(this).find("th").eq(0).find("span").css("height"));
            var div_height = parseInt($(this).find("th").eq(0).find("div").css("height"));
            if (word_height > div_height) {
                $(this).find(".abbreviation0").each(function () {
                    $(this).removeClass('abbreviation0');
                    $(this).addClass('abbreviation1');
                })
            } else {

                $(this).find(".abbreviation1").each(function () {
                    $(this).removeClass('abbreviation1');
                    $(this).addClass('abbreviation0');
                })
            }
        }
    })
    $(".abbreviation1").off("click");
    $(".abbreviation1").on("click", function () {
        MyHoverAlert($(this), $(this).text());
        setTimeout(function () {
            $("*").on("click", MyHoverAlert_event_remove);
        }, 200);
    })

}




function get_bin_file(url, filename) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status === 200) {
            var blob = this.response;
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = function (e) {
                var a = document.createElement('a');
                a.download = filename;
                a.href = e.target.result;
                $("body").append(a);
                a.click();
                $(a).remove();
            }
        } else {
            return -1;
        }
    };
    xhr.send();
    return 0;
}

function _file_download(data, name, file_type) {
    if (name == undefined || name.length == 0)
        name = "derived_data";
    if (file_type == undefined || file_type.length == 0)
        file_type = "";
    else
        file_type = "." + file_type;
    const ASheets = data

    if (!ASheets || !ASheets.length) {
        return
    }
    let alink = document.createElement('a')
    alink.download = `${name}` + file_type + ``;
    let blob = new Blob([ASheets])
    alink.href = URL.createObjectURL(blob)

    alink.click()
}

function XMLDownload(data) {
    _file_download(data, "lastgood", "xml");
}


function txtDownload(data) {
    _file_download(data, "syslogd", "txt");
}

var g_device_is_ready = {
    device_down: 0,
    device_up_again: 0,
};

function check_device_is_up() {
    $.ajax({
        url: window.location,
        timeout: 1000,
        success: function () {
            setTimeout(function () {
                if (g_device_is_ready.device_down >= 3) {
                    g_device_is_ready.device_up_again = 1;
                } else {
                    g_device_is_ready.device_down = 0;
                    check_device_is_up();
                }
            }, 2000);
        },
        error: function () {
            g_device_is_ready.device_down += 1;
            check_device_is_up();
        }
    });
}

function if_device_up_then_init_gValue()
{
    if (g_device_is_ready.device_up_again) {
        g_device_is_ready.download = 0;
        g_device_is_ready.device_up_again = 0;
        return true;
    }
    return false;
}

function proc_page_custom() {
    page_attr = {
        no_2_4G: [
            $("a[js=\"Network_2.4G_control.js\"]"),
            $("#Binding_selection").find("div[value=\"4\"]"),
            $("#Binding_selection").find("div[value=\"5\"]"),
            $("#Binding_selection").find("div[value=\"6\"]"),
            $("#Binding_selection").find("div[value=\"7\"]"),
            $("#binding_table").find("tr[id=\"SSID6\"]"),
            $("#binding_table").find("tr[id=\"SSID7\"]"),
            $("#binding_table").find("tr[id=\"SSID8\"]"),
            $("#binding_table").find("tr[id=\"SSID5\"]"),
            $("button[value=\"ch_load_wlan0\"]"),
            $("#ch_load_wlan0"),
            $("#ch_load_wlan0_w"),
        ],
        no_5G: [
            $("a[js=\"Network_5G_control.js\"]"),
            $("#Binding_selection").find("div[value=\"12\"]"),
            $("#Binding_selection").find("div[value=\"9\"]"),
            $("#Binding_selection").find("div[value=\"10\"]"),
            $("#Binding_selection").find("div[value=\"11\"]"),
            $("#binding_table").find("tr[id=\"SSID1\"]"),
            $("#binding_table").find("tr[id=\"SSID2\"]"),
            $("#binding_table").find("tr[id=\"SSID3\"]"),
            $("#binding_table").find("tr[id=\"SSID4\"]"),
            $("button[value=\"ch_load_wlan1\"]"),
            $("#ch_load_wlan1"),
            $("#ch_load_wlan1_w"),
            $("#AP_Type1"),
        ],
        no_wlan: [
            $(".collapse-header[key=\"LANG_WLAN\"]"),
            $("#wlan_interface_tbl"),
            $("#wlan_send_and_recv"),
            $("#wlan_client_list"),
            $("a[js=\"Diagnose_AP_Detect_control.js\"]"),
            $("a[js=\"Diagnose_Iperf_Test_control.js\"]"),
        ],
        no_wifi6: [
        ],
        no_usb: [
            $("#USB_Printer_page_row"),
        ],
        no_voip: [
            $("#voip_status_info_tbl"),
            $("a[js=\"Application_VOIP_control.js\"]"),
            $("a[js=\"Application_VOIP_Adv_control.js\"]"),
            $(".B_applicationtype[value='4']"),
            $(".B_applicationtype[value='5']"),
            $(".B_applicationtype[value='6']"),
            $(".B_applicationtype[value='7']"),
            $(".synchronizing_type[value='1']"),
        ],
        no_catv: [
            $("a[js=\"Status_CATV_control.js\"]"),
            $("a[js=\"Network_CATV_control.js\"]"),
        ],
        no_mqtt: [
            $("a[js=\"Application_MQTT_control.js\"]"),
        ],
        no_self_diag: [
            $("a[js=\"Diagnose_Self_control.js\"]"),
            $("a[js=\"Diagnose_AP_Detect_control.js\"]"),
            $("a[js=\"Diagnose_Iperf_Test_control.js\"]"),
        ],
        no_wlan_cli_mgm: [
            $("a[js=\"Network_ClientMangement_control.js\"]"),
            $("a[js=\"Status_Wireless_Performance_control.js\"]"),
            $("a[js=\"Diagnose_Iperf_Test_control.js\"]"),
            $("a[js=\"Network_FamilyGroupManagement_control.js\"]"),
        ],
        no_sys_log: [
            $("a[js=\"Management_Log_File_control.js\"]"),
        ],
        no_lan1: [
            $("#Binding_selection").find("div[value=\"0\"]"),
            $("#binding_table").find("tr[id=\"LAN1\"]"),
            $("#LAN_table").find("tr").eq(1),
            $("#loop_back_status").find("tr").eq(0),
        ],
        no_lan2: [
            $("#Binding_selection").find("div[value=\"1\"]"),
            $("#binding_table").find("tr[id=\"LAN2\"]"),
            $("#B_phypt_Table").find(".B_phypt[value='2']"),
            $("#LAN_table").find("tr").eq(2),
            $("#loop_back_status").find("tr").eq(1),
        ],
        no_lan3: [
            $("#Binding_selection").find("div[value=\"2\"]"),
            $("#binding_table").find("tr[id=\"LAN3\"]"),
            $("#B_phypt_Table").find(".B_phypt[value='3']"),
            $("#LAN_table").find("tr").eq(3),
            $("#loop_back_status").find("tr").eq(2),
        ],
        no_lan4: [
            $("#Binding_selection").find("div[value=\"3\"]"),
            $("#binding_table").find("tr[id=\"LAN4\"]"),
            $("#B_phypt_Table").find(".B_phypt[value='4']"),
            $("#LAN_table").find("tr").eq(4),
            $("#loop_back_status").find("tr").eq(3),
        ],
        no_lan5: [],
        no_lan6: [],
        no_lan7: [],
        no_lan8: [],
        no_ftp: [
            $("#Ftp_Ctrl").parents("div").eq(0),
            $("#Ftp_setting_div"),
        ],
        no_tftp: [
            $("#Tftp_Ctrl").parents("div").eq(0),
            $("#Tftp_setting_div"),
        ],
        no_https: [
            $("#Https_Ctrl").parents("div").eq(0),
            $("#Https_setting_div"),
        ],
        no_ssh: [
            $("#SSH_Ctrl").parents("div").eq(0),
            $("#SSH_setting_div"),
        ],
        no_diag_iperf_test: [
            $("a[js=\"Diagnose_Iperf_Test_control.js\"]"),
        ],
        no_ap_detect: [
            $("a[js=\"Diagnose_AP_Detect_control.js\"]"),
        ],
        no_web_user_log: [
            $("#User_Config_Log_Page"),
        ],
    }
    page_attr.no_wlan = page_attr.no_wlan.concat(page_attr.no_2_4G, page_attr.no_5G, page_attr.no_wifi6, page_attr.no_wlan_cli_mgm);
    for (const i in g_page_attr) {
        if (g_page_attr[i] == 1) {
            const tar = page_attr[i];
            for (const j in tar) {
                tar[j].remove();
            }
        }
    }
}

function Page_data_obj_init(obj, data) {
    var data_split = data.split("\n");
    for (var i in data_split) {
        var temp = data_split[i];
        if (temp.indexOf("=") != -1) {
            var name = temp.substring(0, temp.indexOf("="));
            var value = temp.substring(temp.indexOf("=") + 1);
            obj[name] = value;
        }
    }
}

function page_custom() {
    if (c_page_is_init)
        proc_page_custom();
}
