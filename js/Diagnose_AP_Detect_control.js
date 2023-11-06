function AP_Table_init() {
    function detect() {
        $("#ap_search_list").empty();
        APG.new_tbl({
            "direction": "0",
            "selector": $("#ap_search_list"),
            "header": ["SSID", "BSSID", L("LANG_CHANNEL"), L("LANG_SIGNAL_STRENGTH")],
            "contain": ["ssid", "bssid", "chan", "sdbm"],
            "origin": JSON.parse(getASPdata(PM.ap_type.val() == "1" ? "wlSiteSurveyTbl_2G" : "wlSiteSurveyTbl_5G")),
            "origin_key_word": "ap_list",
        });
    }
    function check_available_wlan() {
        const data = getASPdata("available_wlan_for_ap_detect");
        const menu = [];
        if (data.indexOf("2.4G") != -1)
            menu.push(["1", "2.4G"]);
        if (data.indexOf("5G") != -1)
            menu.push(["0", "5G"],);
        if (menu.length == 0)
            MyAlert(L("LANG_AP_DETECT_ERROR"));
        return menu;
    }
    const PM = APG.new([
        ["AP_Search_list", "AP Detect", "2"],
        ["btn-group", "AP_Type", L("LANG_BAND"), "ap_type", check_available_wlan()],
        ["button", "detect_again", L("LANG_DETECT"), , "margin-bottom: 8px;"],
        ["append", "<div id='ap_search_list' class=\"table-striped\"></div>"],
    ]);
    PM.ap_type.val("1");
    $("#detect_again").on("click", detect);
    FMask_init();
}

$(document).ready(() => AP_Table_init());
