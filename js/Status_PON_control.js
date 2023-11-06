function pon_info() {
    var page = {
        "length": 3,
        1: [
            ["pon_info1_row", "arrLang[lang]['LANG_NET_CONNECT_INFO']", "2"],
            ["append", "<div id='pon_info1_t'></div>"],
        ],
        2: [
            ["pon_info2_row", "arrLang[lang]['LANG_LASER_DEVICE_INFO']", "2"],
            ["append", "<div id='pon_info2_t'></div>"],
        ],
        3: [
            ["pon_info3_row", "arrLang[lang]['LANG_LINK_PERFORMANCE_INFO']", "2"],
            ["append", "<div id='pon_info3_t'></div>"],
        ],
    };
    Auto_Page_generate(page);
    var data = getASPdata("ponGetStatus");
    var obj = get_nest_data_obj(data);
    for (var i in obj) {
        for (var j in obj[i])
            obj[i][j] = L(obj[i][j]);
    }
    var table_obj1 = {
        direction: 1,
        selector: $("#pon_info1_t"),
        header: ["PON MODE", L("LANG_NET_CONNECT_STATE"), L("LANG_FEC_UPSTREAM_STATUS"), L("LANG_FEC_DOWNSTREAM_STATUS")],
        contain: ["pon_mode", "pon_connect_status", "pon-fec-us-state", "pon-fec-ds-state"],
        origin: obj,
        origin_key_word: "pon_info",
    };
    if (obj["pon_info"]["pon_mode"] == "EPON") {
        table_obj1.header.push(L("LANG_MESH_NEI_MAC"));
        table_obj1.contain.push("epon-mac-address");
    }
    var table_obj2 = {
        direction: 1,
        selector: $("#pon_info2_t"),
        header: [L("LANG_TX_POWER"), L("LANG_RX_POWER"), L("LANG_TEMPERATURE"), L("LANG_VOLTAGE"), L("LANG_BIAS_CURRENT"), L("LANG_EPON_ALARM_INFO")],
        contain: ["tx-power", "rx-power", "temperature", "voltage", "bias-current", "pon-alarm"],
        origin: obj,
        origin_key_word: "pon_info",
    };
    var table_obj3 = {
        direction: 1,
        selector: $("#pon_info3_t"),
        header: [L("LANG_TX_BYTE"), L("LANG_RX_BYTE"), L("LANG_TX_FRAME"), L("LANG_RX_FRAME"),
        L("LANG_TX_UNICAST_FRAME"), L("LANG_RX_UNICAST_FRAME"), L("LANG_TX_MULTICAST_FRAME"), L("LANG_RX_MULTICAST_FRAME"),
        L("LANG_TX_BROADCAST_FRAME"), L("LANG_RX_BROADCAST_FRAME"), L("LANG_RX_FEC_ERR_FRAME"), L("LANG_RX_HEC_ERR_FRAME"),
        L("LANG_TX_LOSE_FRAME"), L("LANG_TX_PAUSE_STREAM_CONTROL_FRAME"), L("LANG_RX_PAUSE_STREAM_CONTROL_FRAME")],
        contain: ["bytes-sent", "bytes-received", "packets-sent", "packets-received",
            "unicast-packets-sent", "unicast-packets-received", "multicast-packets-sent", "multicast-packets-received",
            "broadcast-packets-sent", "broadcast-packets-received", "fec-errors", "hec-errors",
            "packets-dropped", "pause-packets-sent", "pause-packets-received"],
        origin: obj,
        origin_key_word: "pon_info",
    };
    table_generate(table_obj1);
    table_generate(table_obj2);
    table_generate(table_obj3);
}


$(document.ready).ready(function () {
    pon_info();

});
