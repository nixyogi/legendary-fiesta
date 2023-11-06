function Firewall_Page_init() {
    FIREWLALL_CONFIG_DATA = {}
    $("#FIREWALL_PAGE_ROW").remove();
    var firewall_page = {
        "length": 1,
        1: [
            ["FIREWALL_PAGE_ROW", "arrLang[lang]['LANG_SECURITY_CLASSIFY']", "2"],
            ["form", "FIREWALL_PAGE_FORM", "action=\"/boaform/getASPdata/formFirewall\" method=\"POST\"", "1", Firewall_Page_init],
            ["menu", "firewall_security_level", "arrLang[lang]['LANG_SELECT_FIREWALL_LEVEL']", "FirewallLevel", [
                ["0", "arrLang[lang]['LANG_LOW']"],
                ["2", "arrLang[lang]['LANG_HIGH']"],
            ]],
            ["switch", "enable_attack_protection", "arrLang[lang]['LANG_ATTACK_PROTECTION_CONFIG']", "DosEnable"],
            ["submit", "FIREWALL_PAGE_SUBMIT"]
        ]
    }
    Auto_Page_generate(firewall_page);
    Page_data_obj_init(FIREWLALL_CONFIG_DATA, OneForAll("getASPdata/initPageFirewall", 5, 0, 0, 0));
    set_obj_data_to_html(FIREWLALL_CONFIG_DATA);
    FMask_init();
}

var FIREWLALL_CONFIG_DATA = {}
$(document).ready(function () {
    Firewall_Page_init();
})
