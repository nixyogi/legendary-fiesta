var Wan_Mode_Page_Data = {};
var RSTBTN_Page_data = {};

function Wan_Mode_Page_Init() { // Added by ZYB for mission#19252
    const Wan_Mode_Page = {
        "length": 1,
        1: [
            ["wan_mode_row", "arrLang[lang]['LANG_WAN_MODE'], ,arrLang[lang]['LANG_CONFIG']", "2"],
            ["tips", "div", "class='tips_font'", "arrLang[lang]['LANG_WAN_MODE_NOTE']"],
            ["form", "wan_mode_form", "action=\"/boaform/getASPdata/formWANMode\" method=\"post\"", "1"],
            ["switch", "AutoPonMode", "arrLang[lang]['LANG_WAN_MODE_AUTO']", "AutoPonMode"],
            ["menu", "PonMode", "arrLang[lang]['LANG_WAN_MODE']", "PonMode", [
                ["1", "GPON"],
                ["2", "EPON"],
            ]],
            ["submit", "wan_mode_submit"],
        ],
    }
    Page_data_obj_init(Wan_Mode_Page_Data, OneForAll("getASPdata/initWANModePage", 5, 0, 0, 0));
    if (!g_page_cstmfun.CF_WEB_PONMODE || g_page_cstmfun.CF_WEB_PONMODE == "1") {
        Auto_Page_generate(Wan_Mode_Page);
        set_obj_data_to_html(Wan_Mode_Page_Data);
    }
}

/*Added by liangjuan*/
function RSTBTN_Page_Init() {
	const RSTBTN_Page = {
        "length": 1,
        1: [
            ["RSTBTN_Page_row", "arrLang[lang][\"LANG_RSTBTN_CONFIG\"]", "2"],
            ["tips", "div", "class='tips_font'", "arrLang[lang]['LANG_RSTBTN_NOTE']"],
            ["form", "rstbtn_form", "action=\"/boaform/getASPdata/formRstMode\" method=\"POST\"", "1"],
            ["switch", "RSTMode", "arrLang[lang]['LANG_RSTBTN_SWITCH']", "RSTMode"],
            ["submit", "RST_submit"],
        ],
    }
    Page_data_obj_init(RSTBTN_Page_data, OneForAll("getASPdata/initRSTBTNpage", 5, 0, 0, 0));
    if (!g_page_cstmfun.CF_WEB_RSTBTN_BLOCK || g_page_cstmfun.CF_WEB_RSTBTN_BLOCK == "1") {
		Auto_Page_generate(RSTBTN_Page);
		set_obj_data_to_html(RSTBTN_Page_data);
    }
}

function Page_Select_Menu_Type() {
    if (get_custom_menu_type == undefined)
        return;
    
    function page_refresh() {
        setTimeout(function() {
            location.reload();
        }, 800);
    }

    var custom_menu_type = get_custom_menu_type();
    var func_enable = custom_menu_type & (1<<0);
    var can_control_on_web = custom_menu_type & (1<<1);
    var is_vertical_layout = (!!(custom_menu_type & (1<<2)))?1:0;

    if (func_enable==0 || can_control_on_web==0)
        return;

    var pm =  APG.new([
        ["menu_layout_select", "arrLang[lang]['LANG_MENU_LAYOUT_SELECT']", "2"],
        ["form", "set_menu_type", "action=\"/boaform/getASPdata/set_menu_type\"method=\"POST\"", "1", page_refresh],
        ["menu", "is_vertical_layout", L("LANG_MENU_LAYOUT_SELECT"), "is_vertical_layout", [
            ["0", L("LANG_HORIZONTAL")],
            ["1", L("LANG_VERTICAL")],
        ]],
        ["submit", "menu_layout_submit"],
    ]);

    set_obj_data_to_html({
        "is_vertical_layout" : is_vertical_layout,
    });
}

$(document).ready(function () {
    Wan_Mode_Page_Init();
	RSTBTN_Page_Init();
    Page_Select_Menu_Type();
    FMask_init();
});
