var Basic_Config_List = {};

function VOIP_Basic_Config_List_init() {
    Basic_Config_List = {
        "length": 1,
        1: [
            ["Basic_Config_row", arrLang[lang]["LANG_VOIP_BASIC_CONFIG"], "2"],
            ["form", "Basic_Config_form", "action=\"/boaform/admin/voip_e8c_set\" method=\"POST\"", "1", after_success],
            ["tips", "h6", "class='tips_font' ", arrLang[lang]["LANG_SERVER_TYPE"]],
            ["menu", "B_servertype", arrLang[lang]["LANG_SERVER_TYPE"], "servertype", [
                ["IMS SIP", "IMS SIP"],
                ["Soft Switch SIP", "Soft Switch SIP"],
            ]],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang][\"LANG_PRIMARY_SIP_REG\"]"],
            ["text", "B_register_addr", "arrLang[lang][\"LANG_PRIMARY_SIP_REG\"], arrLang[lang][\"LANG_ADDRESS\"]", "register_addr", "32"],
            ["text", "B_register_port", arrLang[lang]["LANG_PORT"], "register_port", "32"],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang][\"LANG_STANDBY\"], SIP ,arrLang[lang][\"LANG_REGISTER\"]"],
            ["text", "B_backupreg_addr", "arrLang[lang][\"LANG_STANDBY\"], SIP ,arrLang[lang][\"LANG_REGISTER\"], arrLang[lang][\"LANG_ADDRESS\"]", "backupreg_addr", "32"],
            ["text", "B_backupreg_port", arrLang[lang]["LANG_PORT"], "backupreg_port", "32"],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang][\"LANG_PRIMARY\"], SIP ,arrLang[lang][\"LANG_PROXY\"]"],
            ["text", "B_proxy0_addr", "arrLang[lang][\"LANG_PROXY\"], arrLang[lang][\"LANG_ADDRESS\"]", "proxy0_addr", "32"],
            ["switch", "B_proxy0_subscribe_enable", "arrLang[lang][\"LANG_ENABLE\"] ,arrLang[lang][\"LANG_SUBSCRIBE\"]", "proxy0_subscribe_enable"],
            ["text", "B_proxy0_port", arrLang[lang]["LANG_PORT"], "proxy0_port", "32"],
            ["switch", "B_proxy0_obEnable", "arrLang[lang][\"LANG_ENABLE\"], ,arrLang[lang][\"LANG_OUTBOUND\"], ,arrLang[lang][\"LANG_PROXY\"]", "proxy0_obEnable"],
            ["text", "B_proxy0_obAddr", "arrLang[lang][\"LANG_OUTBOUND\"], ,arrLang[lang][\"LANG_PROXY\"], ,arrLang[lang][\"LANG_ADDRESS\"]", "proxy0_obAddr", "32"],
            ["text", "B_proxy0_obPort", "arrLang[lang][\"LANG_OUTBOUND\"], ,arrLang[lang][\"LANG_PROXY\"], ,arrLang[lang][\"LANG_PORT\"]", "proxy0_obPort", "32"],
            ["text", "B_proxy0_domain_name", "SIP ,arrLang[lang][\"LANG_DOMAIN\"]", "proxy0_domain_name", "32"],
            ["text", "B_proxy0_reg_expire", "arrLang[lang][\"LANG_REGISTER\"], ,arrLang[lang][\"LANG_EXPIRE\"]", "proxy0_reg_expire", "32"],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang][\"LANG_STANDBY\"], SIP ,arrLang[lang][\"LANG_PROXY\"]"],
            ["switch", "B_proxy1_enable", "arrLang[lang][\"LANG_STANDBY\"], SIP ,arrLang[lang][\"LANG_ENABLE\"]", "proxy1_enable"],
            ["switch", "B_proxy1_subscribe_enable", "arrLang[lang][\"LANG_ENABLE\"], ,arrLang[lang][\"LANG_SUBSCRIBE\"]", "proxy1_subscribe_enable"],
            ["text", "B_proxy1_addr", "arrLang[lang][\"LANG_PROXY\"], ,arrLang[lang][\"LANG_ADDRESS\"]", "proxy1_addr", "32"],
            ["text", "B_proxy1_port", arrLang[lang]["LANG_PORT"], "proxy1_port", "32"],
            ["switch", "B_proxy1_obEnable", "arrLang[lang][\"LANG_ENABLE\"], ,arrLang[lang][\"LANG_OUTBOUND\"], ,arrLang[lang][\"LANG_PROXY\"]", "proxy1_obEnable"],
            ["text", "B_proxy1_obAddr", "arrLang[lang][\"LANG_OUTBOUND\"], ,arrLang[lang][\"LANG_PROXY\"], ,arrLang[lang][\"LANG_ADDRESS\"]", "proxy1_obAddr", "32"],
            ["text", "B_proxy1_obPort", "arrLang[lang][\"LANG_OUTBOUND\"], ,arrLang[lang][\"LANG_PROXY\"], ,arrLang[lang][\"LANG_PORT\"]", "proxy1_obPort", "32"],
            ["text", "B_proxy1_domain_name", "SIP ,arrLang[lang][\"LANG_DOMAIN\"]", "proxy1_domain_name", "32"],
            ["text", "B_proxy1_reg_expire", "arrLang[lang][\"LANG_REGISTER\"], ,arrLang[lang][\"LANG_EXPIRE\"]", "proxy1_reg_expire", "32"],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang][\"LANG_LINE\"], 1 ,arrLang[lang][\"LANG_USER_ACCOUNT\"]"],
            ["switch", "B_port1_account_enable", arrLang[lang]["LANG_ENABLE"], "port1_account_enable"],
            ["text", "B_port1_number", arrLang[lang]["LANG_USER_NUMBER"], "port1_number", "32"],
            ["text", "B_port1_login_id", arrLang[lang]["LANG_USER_LOGIN"], "port1_login_id", "64"],
            ["password", "B_port1_password", arrLang[lang]["LANG_USER_PASSWORD"], "port1_password", "64"],
            ["submit", "Basic_Config_Submit", Basic_Config_Check]
        ],
    }
}

function Basic_Config_Check() {
    if (($("input[name='proxy0_port']").val() == "") || !sji_checkdigitrange($("input[name='proxy0_port']").val(), 1, 65535)) {
        $("input[name='proxy0_port']").focus();
        MyAlert(arrLang[lang]["LANG_PRIMARY"] + " SIP " + arrLang[lang]["LANG_PROXY"] + " " + arrLang[lang]["LANG_PORT"] + " " + arrLang[lang]["LANG_INVALID"]);
        return false;
    }
    if (!($("input[name='proxy1_port']").val() == "") && !sji_checkdigitrange($("input[name='proxy1_port']").val(), 1, 65535)) {
        $("input[name='proxy1_port']").focus();
        MyAlert(arrLang[lang]["LANG_STANDBY"] + " SIP " + arrLang[lang]["LANG_PROXY"] + " " + arrLang[lang]["LANG_PORT"] + " " + arrLang[lang]["LANG_INVALID"]);
        return false;
    }
    if (($("input[name='proxy0_reg_expire']").val() == "") || !sji_checkdigitrange($("input[name='proxy0_reg_expire']").val(), 10, 86400)) {
        $("input[name='proxy0_reg_expire']").focus();
        MyAlert("Primary SIP Proxy Register Expire out of range [10-86400]!");
        return false;
    }
    if (($("input[name='proxy1_reg_expire']").val() == "") || !sji_checkdigitrange($("input[name='proxy1_reg_expire']").val(), 10, 86400)) {
        $("input[name='proxy1_reg_expire']").focus();
        MyAlert("Standby SIP Proxy Register Expire out of range [10-86400]!");
        return false;
    }
    if (($("input[name='proxy1_enable']").val() == "1") && ($("input[name='port1_account_enable']").val() != "1") && ($("input[name='port2_account_enable']").val() != "1")) {
        $("input[name='port1_account_enable']").focus();
        MyAlert(arrLang[lang]["LANG_ENABLE"] + " " + arrLang[lang]["LANG_STANDBY"] + " SIP " + arrLang[lang]["LNAG_PROXY"] + " " + arrLang[lang]["LANG_NEED_ACCOUNT"]);
        return false;
    }
    if (($("input[name='max_voip_ports']").val() == 2) && ($("input[name='port1_number']").val() != "") && ($("input[name='port1_number']").val() == $("input[name='port2_number']").val())) {
        $("input[name='port2_number']").focus();
        MyAlert(arrLang[lang]["LANG_APP_VOIP_ERR"]);
        return false;
    }
    var port_check_list = ["register_port", "backupreg_port", "proxy0_obPort", "proxy1_obPort"];
    for (var i in port_check_list) {
        if (VOIP_PM[port_check_list[i]].val().length != 0) {
            if (!sji_checkdigit2(VOIP_PM[port_check_list[i]].val()) || !sji_checkdigitrange(VOIP_PM[port_check_list[i]].val(), 10, 65535)) {
                swal_check_warning("input[name='" + port_check_list[i] + "']", arrLang[lang]["LANG_PARAMETER"] + " " + arrLang[lang]['LANG_INVALID']);
                return false;
            }
        }
    }


    return true;
}



function after_success() {
    Page_data_obj_init(VOIP_PAGE, OneForAll("getASPdata/asp_voip_e8c_get", 5, 0, 0, 0));
    set_obj_data_to_html(VOIP_PAGE);
    $("textarea").val(VOIP_PAGE["dialplan"]);
}

var VOIP_PAGE = {};
var VOIP_PM = {};
$(document).ready(function () {
    VOIP_Basic_Config_List_init();
    VOIP_PM = Auto_Page_generate(Basic_Config_List, "200px");
    Page_data_obj_init(VOIP_PAGE, OneForAll("getASPdata/asp_voip_e8c_get", 5, 0, 0, 0));
    set_obj_data_to_html(VOIP_PAGE);
    $("textarea").val(VOIP_PAGE["dialplan"]);
})
