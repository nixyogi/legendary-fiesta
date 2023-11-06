function catv_status_page_init() {
    const obj = {};
    Page_data_obj_init(obj, getASPdata("catvGetStatus"));
    obj["catv_enable"] = L(obj["catv_enable"] == "1" ? "LANG_ENABLE" : "LANG_DISABLE");
    APG.new([
        ["catv_status", "CATV " + L("LANG_STATUS"), "2"],
        ["append", "<div id='catv_info'></div>"]
    ]);
    APG.new_tbl({
        "direction": "0",
        "selector": $("#catv_info"),
        "header": [L("LANG_STATUS"), L("LANG_RX_POWER") + " (dBuV)", L("LANG_TX_POWER") + " (dBm)"],
        "contain": ["catv_enable", "catv_rx_power", "catv_tx_power"],
        "origin": { "catv_status": obj },
        "origin_key_word": "catv_status",
    });
}

$(document).ready(() => catv_status_page_init());
