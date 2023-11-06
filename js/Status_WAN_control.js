function list_wan_v4() {
    var page = {
        "length": 2,
        1: [
            ["wan_v4_info_row", "arrLang[lang]['IPv4 WAN Info']", "2"],
            ["append", "<div id='wan_v4_info_t'></div>"],
        ],
        2: [
            ["wan_v4_network_row", "arrLang[lang]['IPv4 Network Info']", "2"],
            ["append", "<div id='wan_v4_network_t'></div>"],
        ]
    };
    Auto_Page_generate(page);
    var data = getASPdata("listWanConfig");
    var obj = get_nest_data_obj(data);
    for (var i in obj) {
        if (obj[i]["igmpEnbl"] == "1")
            obj[i]["igmpEnbl"] = L("LANG_ENABLED");
        else if (obj[i]["igmpEnbl"] == "0")
            obj[i]["igmpEnbl"] = L("LANG_DISABLED");
    }
    var table_obj1 = {
        direction: 0,
        selector: $("#wan_v4_info_t"),
        header: [L("LANG_SRV_INTF"), "VLAN ID", L("LANG_PROTOCOL"), "IGMP", L("LANG_STATUS"), L("LANG_IP_ADDRESS"), L("LANG_SUBNET_MASK"), L("LANG_MAC_ADDRESS")],
        contain: ["servName", "vlanId", "protocol", "igmpEnbl", "strStatus", "ipAddr", "netmask", "MacAddr"],
        origin: obj,
        origin_key_word: "listWanv4",
    };
    var table_obj2 = {
        direction: 0,
        selector: $("#wan_v4_network_t"),
        header: [L("LANG_SRV_INTF"), L("LANG_DEFAULT_GATEWAY"), L("LANG_DNS_FIRST"), L("LANG_DNS_SECOND")],
        contain: ["servName", "gateway", "dns1", "dns2"],
        origin: obj,
        origin_key_word: "listWanv4",
    };
    table_generate(table_obj1);
    table_generate(table_obj2);
}

function list_wan_v6() {
    var page = {
        "length": 2,
        1: [
            ["wan_v6_info_row", "arrLang[lang]['IPv6 WAN Info']", "2"],
            ["append", "<div id='wan_v6_info_t'></div>"],
        ],
        2: [
            ["wan_v6_network_row", "arrLang[lang]['IPv6 Network Info']", "2"],
            ["append", "<div id='wan_v6_network_t'></div>"],
        ]
    };
    Auto_Page_generate(page);
    var data = getASPdata("listWanConfigIpv6");
    var obj = get_nest_data_obj(data);
    for (var i in obj) {
        if (obj[i]["igmpEnbl"] == "1")
            obj[i]["igmpEnbl"] = L("LANG_ENABLED");
        else if (obj[i]["igmpEnbl"] == "0")
            obj[i]["igmpEnbl"] = L("LANG_DISABLED");
    }
    var table_obj1 = {
        direction: 0,
        selector: $("#wan_v6_info_t"),
        header: [L("LANG_SRV_INTF"), "VLAN ID", L("LANG_PROTOCOL"), "MLD", L("LANG_STATUS"), L("LANG_IP_ADDRESS"), L("LANG_PREFIX")],
        contain: ["servName", "vlanId", "protocol", "igmpEnbl", "strStatus", "ipv6Addr", "ipv6Prefix"],
        origin: obj,
        origin_key_word: "listWanv6",
    };
    var table_obj2 = {
        direction: 0,
        selector: $("#wan_v6_network_t"),
        header: [L("LANG_SRV_INTF"), L("LANG_DEFAULT_GATEWAY"), L("LANG_DNS_FIRST"), L("LANG_DNS_SECOND")],
        contain: ["servName", "ipv6Gateway", "ipv6Dns1", "ipv6Dns2"],
        origin: obj,
        origin_key_word: "listWanv6",
    };
    table_generate(table_obj1);
    table_generate(table_obj2);
}

function tr069_info() {
    var page = {
        "length": 1,
        1: [
            ["tr069_info_row", "arrLang[lang]['LANG_REMOTE_MANAGEMENT_INFO']", "2"],
            ["append", "<div id='tr069_info_t'></div>"],
        ],
    };
    Auto_Page_generate(page);
    var data = getASPdata("get_tr096_status");
    var obj = get_nest_data_obj(data);
    for (var i in obj) {
        for (var j in obj[i])
            obj[i][j] = L(obj[i][j]);
    }
    var table_obj1 = {
        direction: 1,
        selector: $("#tr069_info_t"),
        header: [L("LANG_TR069_INFO_ADMIN"), L("LANG_TR069_CONNECT_REQUEST_STATE"), L("LANG_TR069_SERVICE_CONFIG_STATE")],
        contain: ["tr069Inform", "tr069Connect", "tr069Config"],
        origin: obj,
        origin_key_word: "tr069_info",
    };
    table_generate(table_obj1);
}

function voip_info() {
    const data = getASPdata("new_asp_voip_e8c_get");
    if (data) {
        const page = {
            "length": 1,
            1: [
                ["voip_info_row", "arrLang[lang]['LANG_VOIP_INFO']", "2"],
                ["append", "<div id='voip_info_t'></div>"],
            ],
        };
        Auto_Page_generate(page);
        var obj = get_nest_data_obj(data);
        for (var i in obj) {
            obj[i]["status"] = L(obj[i]["status"]);
        }
        const table_obj1 = {
            direction: 1,
            selector: $("#voip_info_t"),
            header: [L("LANG_PORT_STATE"), L("LANG_PHONE_NUMBER")],
            contain: ["status", "phone_num"],
            origin: obj,
            origin_key_word: "VoIPCfg",
        };
        table_generate(table_obj1);
    }
}

function pppoe_info() {
    if (!g_page_cstmfun.CF_WEB_PPPOE_INFO || g_page_cstmfun.CF_WEB_PPPOE_INFO == "1") {
        const data = getASPdata("get_pppoe_status");
        if (data) {
            const page = {
                "length": 1,
                1: [
                    ["pppoe_info_row", "arrLang[lang]['LANG_PPPOE_INFO']", "2"],
                    ["append", "<div id='pppoe_info_t'></div>"],
                ],
            };
            Auto_Page_generate(page);
            var obj = get_nest_data_obj(data);
            for (var i in obj) {
                for (var j in obj[i])
                    obj[i][j] = L(obj[i][j]);
            }
            const table_obj = {
                direction: 1,
                selector: $("#pppoe_info_t"),
                header: [L("LANG_WAN_INTERFACE"), L("LANG_NET_CONNECT_STATE"), L("LANG_UPTIME"), L("LANG_MAC_ADDRESS"), L("LANG_PPPOE_ACNAME"), "AC " + L("LANG_MAC_ADDRESS")],
                contain: ["name", "status", "uptime", "dev_mac", "ac_name", "ac_mac"],
                origin: obj,
                origin_key_word: "pppoe_info",
            };
            table_generate(table_obj);
        }
    }
}

$(document.ready).ready(function () {
    list_wan_v4();
    list_wan_v6();
    pppoe_info();
    voip_info();
    tr069_info();
});
