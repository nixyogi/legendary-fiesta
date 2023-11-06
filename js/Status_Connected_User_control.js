function Mesh_List_init() {
    var station_info_obj = {};
    var tmp_data = {};
    function search_childnode_to_end(father_node, point_obj) {
        if (point_obj == undefined || point_obj.length == 0)
            return;
        father_node.append("<ul></ul>");
        var tar = father_node.find("ul");
        for (var i = 0; i < point_obj.length; i++) {
            tar.append("<li class='justhover'></li>");
            tar.find("li").eq(i).text(point_obj[i].device_name + "(" + point_obj[i].station_info.length + ")");
            tar.find("li").eq(i).prop("id", "mac" + point_obj[i].mac_address);
            station_info_obj["mac" + point_obj[i].mac_address] = point_obj[i];
            search_childnode_to_end($("#" + "mac" + point_obj[i].mac_address).parent("ul").eq(0), point_obj[i].child_devices);
        }
    }

    Page_data_obj_init(tmp_data,OneForAll("getASPdata/get_ESM_Page_data",5,0,0,0));
    if(tmp_data.role=="0"){
        return;
    }
    var Mesh_List = {
        "length": 1,
        1: [
            ["Mesh_List_row", "arrLang[lang]['LANG_WLAN_EASY_MESH_DEVICE_DETAILS']"],
            ["append", "<div id='Mesh_List_Place' ></div>"],
            ["append", "<div>\
            <div style=\"display: inline;\"><button type=\"button\" id=\"ESM_Refresh\" class=\"btn btn-info btn-round\">" + arrLang[lang]["LANG_REFRESH"] + "</button></div>\
        </div>"]
        ]
    }
    Auto_Page_generate(Mesh_List);
    $("#Mesh_List_row").find(".col-lg-8").each(function () {
        $(this).removeClass("col-lg-8");
        $(this).addClass("col-lg-8");
    })
    $("#ESM_Refresh").on("click",function(){
        $("#Mesh_List_row").remove();
        Mesh_List_init();
    })
    station_info_obj = {};
    var t = "#Mesh_List_Place";
    var index = 0;
    var ESM_PM_STR_DATA = OneForAll("getASPdata/get_ESM_State_data", 5, 0, 0, 0);
    if(ESM_PM_STR_DATA[ESM_PM_STR_DATA.length-1]=='#')
        var ESM_PM_DATA = $.parseJSON(ESM_PM_STR_DATA.substring(0, ESM_PM_STR_DATA.length - 1));
    else
        var ESM_PM_DATA = $.parseJSON(ESM_PM_STR_DATA);
    
    var obj_point;
    var ul_li = "<ul><li class='justhover'></li></ul>"
    $(t).empty();
    $(t).append(ul_li);
    if (ESM_PM_DATA.device_name != undefined) {
        $(t).find("li").eq(index).each(function () {
            $(this).text(ESM_PM_DATA.device_name + "(" + ESM_PM_DATA.station_info.length + ")");
            $(this).prop("id", "mac" + ESM_PM_DATA.mac_address);
            station_info_obj["mac" + ESM_PM_DATA.mac_address] = ESM_PM_DATA;
        })
        index++;
    } else {
        console.log("ESM LIST EMPTY!");
        return;
    }
    obj_point = ESM_PM_DATA;
    obj_point = obj_point.child_devices;
    search_childnode_to_end($("#" + "mac" + ESM_PM_DATA.mac_address).parent("ul").eq(0), obj_point);
    $("#Mesh_List_row").find("li").each(function () {
        $(this).on("click", function () {
            var flow_page_config = {
                id: "ESM_INFO_LIST",
                name: arrLang[lang]["LANG_WLAN_EASY_MESH_DEVICE_DETAILS"],
                width:"900px",
                hieght:"1000px",
            }
            flow_table_generate(flow_page_config);
            var flow_page_data = {
                "length": 1,
                1: [
                    ["#ESM_INFO_LIST", 0],
                    ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_NODE_INFO']"],
                    ["append", "<div class=\"table-responsive\">\
                    <table class=\"table table-bordered table-striped\">\
                    <thead>\
                        <tr>\
                            <th>" + arrLang[lang]["LANG_MAC_ADDRESS"] + "</th>\
                            <th>" + arrLang[lang]["LANG_DEVICE_NAME"] + "</th>\
                            <th>" + "RSSI(dBm)" + "</th>\
                            <th>" + arrLang[lang]["LANG_BAND"] + "</th>\
                        </tr>\
                    </thead>\
                    <tbody id=\"node_info\"></tbody>\
                </table>\
                </div>"],
                    ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_WLAN_EASY_MESH_STA_INFO']"],
                    ["append", "<div class=\"table-responsive\">\
                    <table class=\"table table-bordered table-striped\">\
                    <thead>\
                        <tr>\
                            <th>" + arrLang[lang]["LANG_MAC_ADDRESS"] + "</th>\
                            <th>" + "RSSI(dBm)" + "</th>\
                            <th>" + arrLang[lang]["LANG_BAND"] + "</th>\
                            <th>" + "Downlink" + "</th>\
                            <th>" + "Uplink" + "</th>\
                        </tr>\
                    </thead>\
                    <tbody id=\"sta_info\"></tbody>\
                </table>\
                </div>"],
                ]
            }
            Auto_Page_generate(flow_page_data);
            var tmp_obj = station_info_obj[$(this).prop("id")];
            $("#node_info").append("<tr> <td></td><td></td><td></td><td></td></tr>");
            $("#node_info").find("td").eq(0).text(tmp_obj.mac_address);
            $("#node_info").find("td").eq(1).text(tmp_obj.device_name);
            if(tmp_obj.child_rssi != undefined)
                $("#node_info").find("td").eq(2).text("-"+tmp_obj.child_rssi);
            if(tmp_obj.child_band !=undefined)
                $("#node_info").find("td").eq(3).text(tmp_obj.child_band);
            var tmp_array = tmp_obj.station_info;
            for(var j=0;j<tmp_array.length;j++){
                var temp = tmp_array[j];
                $("#sta_info").append("<tr><td></td><td></td><td></td><td></td><td></td></tr>");
                $("#sta_info").find("tr").eq(j).find("td").eq(0).text(temp.station_mac);
                $("#sta_info").find("tr").eq(j).find("td").eq(1).text("-"+temp.station_rssi);
                $("#sta_info").find("tr").eq(j).find("td").eq(2).text(temp.station_connected_band);
                $("#sta_info").find("tr").eq(j).find("td").eq(3).text(temp.station_downlink);
                $("#sta_info").find("tr").eq(j).find("td").eq(4).text(temp.station_uplink);
            }
        })
    })
}



function wlan_intf() {
    var page = {
        "length": 1,
        1: [
            ["wlan_intf_row", "arrLang[lang]['WLAN Interface']", "2"],
            ["append", "<div id='wlan_intf_t'></div>"],
        ]
    };
    Auto_Page_generate(page);
    var data = getASPdata("wlStatus_parm");
    var obj = get_nest_data_obj(data);

    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 5; j++) {
            var wlan_id = "wlan_info[" + i + "][" + j + "]";
            if (obj[wlan_id] != undefined) {
                var encryptState = L(obj[wlan_id].encryptState);
                var wlan_ssid_attr = L(obj[wlan_id].wlan_ssid_attr);
                obj[wlan_id].encryptState = encryptState;
                obj[wlan_id].wlan_ssid_attr = wlan_ssid_attr;
            }
        }
    }

    var table_obj = {
        direction: 0,
        selector: $("#wlan_intf_t"),
        header: [L("SSID-Name"), L("SSID Hide"), L("LANG_ENCRYPTION"), L("LANG_CHANNEL"), L("LANG_MODE"), "BSSID"],
        contain: ["ssidname", "wlan_ssid_attr", "encryptState", "channel", "mode", "BSSID"],
        origin: obj,
        origin_key_word: "wlan_info",
    };
    table_generate(table_obj);
}

function connected_wlan_cli() {
    var page = {
        "length": 1,
        1: [
            ["connected_wlan_cli_row", "arrLang[lang]['LANG_ASSOCIATED_CLIENTS']", "2"],
            ["append", "<div id='connected_wlan_cli_t'></div>"],
        ]
    };
    Auto_Page_generate(page);
    var data = getASPdata("wirelessClientList");
    var obj = get_nest_data_obj(data);
    var table_obj = {
        direction: 0,
        selector: $("#connected_wlan_cli_t"),
        header: [L("LANG_MAC_ADDRESS"), L("LANG_TX_PKT"), L("LANG_RX_PKT"), L("Send Rate (Mbps)"), L("RSSI (dBm)"), L("LANG_EXPIRED_TIME_SEC"),L("SSID-Name")],
        contain: ["mac_addr", "tx_pack", "rx_pack", "txrate", "rssi", "expired_time","ssidname"],
        origin: obj,
        origin_key_word: "wlan_cli",
    };
    table_generate(table_obj);
}


function wlan_tx_rx_pac() {
    var page = {
        "length": 1,
        1: [
            ["wlan_tx_rx_row", "arrLang[lang]['WLAN Send and Recv']", "2"],
            ["append", "<div id='wlan_tx_rx_t'></div>"],
        ]
    };
    Auto_Page_generate(page);
    var data = getASPdata("wirelessSendRecvInfo");
    var obj = get_nest_data_obj(data);
    var table_obj = {
        direction: 0,
        selector: $("#wlan_tx_rx_t"),
        header: [L("LANG_INTERFACE"), L("Packets (Recv)"), L("Bytes (Recv)"), L("Errors (Recv)"), L("Dropped (Recv)"),
        L("Packets (Send)"), L("Bytes (Send)"), L("Errors (Send)"), L("Dropped (Send)")],
        contain: ["intf", "Receive_Packets", "Receive_Bytes", "Receive_Errors", "Receive_Dropped",
            "Send_Packets", "Send_Bytes", "Send_Errors", "Send_Dropped"],
        origin: obj,
        origin_key_word: "wlan",
    };
    table_generate(table_obj);
}

function lan_tx_rx_pac() {
    var page = {
        "length": 1,
        1: [
            ["lan_tx_rx_row", "arrLang[lang]['LAN Send and Recv']", "2"],
            ["append", "<div id='lan_tx_rx_t'></div>"],
        ]
    };
    Auto_Page_generate(page);
    var data = getASPdata("E8BPktStatsList");
    var obj = get_nest_data_obj(data);
    var table_obj = {
	    direction: 0,
	    selector: $("#lan_tx_rx_t"),
        header: [L("LANG_INTERFACE"), L("LANG_STATUS"), L("LANG_RATE"), L("Packets (Recv)"), L("Bytes (Recv)"), L("Errors (Recv)"), L("Dropped (Recv)"),
	    L("Packets (Send)"), L("Bytes (Send)"), L("Errors (Send)"), L("Dropped (Send)")],
	    contain: ["intf", "lan_status","lan_speed","rx_packets", "rx_bytes", "rx_errors", "rx_dropped",
	        "tx_packets", "tx_bytes", "tx_errors", "tx_dropped"],
	    origin: obj,
	    origin_key_word: "LAN",
	    //origin_key_word: "PORT",
    };
    table_generate(table_obj);
}

function lan_intf() {
    var page = {
        "length": 1,
        1: [
            ["lan_intf_row", "arrLang[lang]['LAN Interface']", "2"],
            ["append", "<div id='lan_intf_t'></div>"],
        ]
    };
    Auto_Page_generate(page);
    var data = getASPdata("get_lan_interface_info");
    var obj = get_nest_data_obj(data);
    var table_obj = {
        direction: 0,
        selector: $("#lan_intf_t"),
        header: [L("LANG_IP_ADDRESS"), L("LANG_MAC_ADDRESS")],
        contain: ["lan-ip", "elan-Mac"],
        origin: obj,
        origin_key_word: "lan_info",
    };
    table_generate(table_obj);
}

function dhcp_cli() {
    var page = {
        "length": 1,
        1: [
            ["dhcp_cli_row", "arrLang[lang]['LANG_ACTIVE_DHCP_CLIENTS']", "2"],
            ["append", "<div id='dhcp_cli_t'></div>"],
        ]
    };
    Auto_Page_generate(page);
    var data = getASPdata("E8BDhcpClientList");
    var obj = get_nest_data_obj(data);
    var table_obj = {
        direction: 0,
        selector: $("#dhcp_cli_t"),
        header: [L("LANG_DEVICE_NAME"), L("LANG_MAC_ADDRESS"), L("LANG_IP_ADDRESS"), L("LANG_LEASE_TIME")],
        contain: ["devname", "macAddr", "ipAddr", "liveTime"],
        origin: obj,
        origin_key_word: "dhcp_cli",
    };
    table_generate(table_obj);
}

$(document.ready).ready(function () {
    if (!g_page_attr.no_wlan) {
        wlan_intf();
        connected_wlan_cli();
        wlan_tx_rx_pac();
    }
    lan_intf();
    lan_tx_rx_pac();
    dhcp_cli();
    if (!g_page_attr.no_5G && !g_page_attr.no_wlan) {
        Mesh_List_init();
    }
});
