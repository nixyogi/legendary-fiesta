function catv_config_page_init() {
    function refresh_page() {
        const obj = {};
        Page_data_obj_init(obj, getData("/boaform/getASPdata/catvGetStatus"));
        set_obj_data_to_html(obj);
    }
    APG.new([
        ["CATV_PAGE", "CATV " + L("LANG_CONFIG"), "2"],
        ["form", "catv_config_form", "action=\"/boaform/getASPdata/formCatv\" method=\"post\"", "1", refresh_page, refresh_page],
        ["switch", "catv_enable_id", "CATV " + L("LANG_ENABLE"), "catv_enable"],
        ["submit", "catv_config_submit"],
    ]);
    refresh_page();
}

$(document).ready(() => catv_config_page_init());
