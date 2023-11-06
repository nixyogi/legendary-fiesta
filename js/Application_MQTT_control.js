var configPage = {
    "length": 1,
    1: [
        ["mqtt_row", "arrLang[lang]['LANG_ADVANCE_MQTT_CONFIG']", 2],
        ["form", "mqttForm", "action=\"/boaform/getASPdata/formMqttConfig\" method=\"POST\"", "1", Pageinit, Pageinit],
        ["menu", "connect_status", "arrLang[lang]['LANG_STATUS']", "mqttConnectStatus", [
            [0, arrLang[lang]['LANG_NOT_CONNECTED']],
            [1, arrLang[lang]['LANG_CONNECTED']],
        ]],
        ["switch", "mqtt_enable", "MQTT ,arrLang[lang]['LANG_ENABLE']", "mqttEnable"],
        ["text", "mqtt_addr", "arrLang[lang]['LANG_SERVER'], arrLang[lang]['LANG_ADDRESS']", "mqttAddr", 64],
        ["text", "mqtt_username", "arrLang[lang]['LANG_USERNAME']", "mqttUserName", 32],
        ["text", "mqtt_password", "arrLang[lang]['LANG_PASSWORD']", "mqttPassword", 32],
        ["submit", "mqttConfigSubmit"]
    ]
}

function Pageinit() {
    var data = {};
    Page_data_obj_init(data, getData("/boaform/getASPdata/getMqttConfig"));
    set_obj_data_to_html(data);
}

$(document).ready(function () {
    Auto_Page_generate(configPage);
    $("#connect_status_Link").addClass("disabled");
    Pageinit();
    FMask_init();
});
