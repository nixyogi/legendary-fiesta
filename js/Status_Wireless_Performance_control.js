function initWlanCliListData() {
    var list = [];
    var tmpStr = getASPdata("getWlanCliDetailInfo");
    tmpStr = tmpStr.split("\n");
    for (var i in tmpStr) {
        if (tmpStr[i] != "") {
            var nextPart = tmpStr[i].split("&");
            var initObj = {};
            for (var j in nextPart) {
                if (nextPart[j] != "") {
                    var finalPart = nextPart[j].split("=");
                    initObj[finalPart[0]] = finalPart[1];
                }
            }
            if ($("input[name='search']").val()) {
                var keyw = $("input[name='search']").val();
                keyw = keyw.toUpperCase();
                if (initObj["host"].toUpperCase().indexOf(keyw) != -1 || initObj["mac"].toUpperCase().indexOf(keyw) != -1 || initObj["ip"].indexOf(keyw) != -1) {
                    list.push(initObj);
                }
            } else
                list.push(initObj);
        }
    }
    return list;
}

function initWlanChLoadData() {
    var obj = {};
    var tmpStr = getASPdata("getWlanChLoadInfo");
    Page_data_obj_init(obj, tmpStr);
    for (var key in obj) {
        obj[key] = nest_obj_init(obj[key]);
    }
    return obj;
}

var WP_STA_PM = {};
var g_sta_data_set = {};
var g_ch_load = {};
var wp_tmp_stop_data = {}; //For chart & table can continue update from last data


function max_time_of_record(data) {
    var max = 1;
    for (var i in data) {
        return data[i].length-1
    }
    return max
}

function limit_info_num(data) {
    var newdata = []
    if (WP_STA_PM.go_or_stop.val()==1) {
        var limit_sta_info_show_num = $("#range_slider").data("ionRangeSlider").old_from
        if (data.length<limit_sta_info_show_num) {
            return data
        }

        var i = 0;
        while (i < limit_sta_info_show_num) {
            newdata.push(data[data.length-limit_sta_info_show_num+i-1])
            i++;
        }
    } else {
        var from = $("#range_slider").data("ionRangeSlider").old_from
        var to = $("#range_slider").data("ionRangeSlider").old_to
        var i = from;
        while (i <= to) {
            newdata.push(data[i])
            i++;
        }
    }
    return newdata
}

function sta_connect_status() {
    function check_windows_size() {
        var a = parseInt($("#prefer_parm").css("width")) + 20;
        var b = parseInt($("#STA_CON_STATUS_ROW").css("width"));
        if (a > b) {
            $("#prefer_parm").hide();
            $("#prefer_parm").find(".btn").each(function () {
                WP_STA_PM[$(this).attr("value") + "_c"].val(1);
            });
        } else {
            var click_tar = $("#prefer_parm").find(".btn");
            $(click_tar).on("click", function (e) {
                $(this).toggleClass("btn-primary");
                $(this).toggleClass("btn-light");
                $("#prefer_parm").find(".btn-primary").each(function () {
                    WP_STA_PM[$(this).attr("value") + "_c"].val(1);
                });
                $("#prefer_parm").find(".btn-light").each(function () {
                    WP_STA_PM[$(this).attr("value") + "_c"].val(0);
                });
                g_sta_data_set.show_chart();
            })
        }
    }

    function import_mcs_rate_init(data) {
        for (var i in data["sta_member"]) {
            for(var j in data["sta_member"][i]) {
                data["sta_member"][i][j] = g_sta_data_set.mcs_rate_init(data["sta_member"][i][j]);
            }
        }
        return data;
    }

    function data_import_derived() {
        $("#go_or_stop").on("click", function() {
            if (WP_STA_PM.go_or_stop.val() == "1") {
                $("#data_proc").hide();
                g_sta_data_set.member = wp_tmp_stop_data["sta_member"];
                g_sta_data_set.last_data = wp_tmp_stop_data["sta_last_data"];
                g_ch_load.member = wp_tmp_stop_data["ch_load_member"];
                var file = document.getElementById('import_file');
                file.value = '';
                range_slider.dynamic_wlan_range_set()
            } else {
                $("#data_proc").show();
                wp_tmp_stop_data["sta_member"] = g_sta_data_set.member;
                wp_tmp_stop_data["sta_last_data"] = g_sta_data_set.last_data;
                wp_tmp_stop_data["ch_load_member"] = g_ch_load.member;
                range_slider.static_wlan_range_set()
            }
        });
        $("#import_data").on("click", function () {
            $("#import_file").click();
        });
        $("#import_file").on("change", function () {
            var files = $('input[name="import_file"]').prop('files');
            if (files.length == 0) {
                return;
            } else {
                var reader = new FileReader();
                reader.readAsText(files[0], "UTF-8");
                reader.onload = function (evt) {
                    var fileString = evt.target.result;
                    var imData = JSON.parse(fileString);
                    if (imData["sta_member"] == undefined || imData["sta_last_data"] == undefined || imData["ch_load_member"] == undefined) {
                        MyAlert("Can't parse data properly");
                        return;
                    }
                    imData = import_mcs_rate_init(imData);
                    g_sta_data_set.member = imData.sta_member;
                    g_sta_data_set.last_data = imData.sta_last_data;
                    g_ch_load.member = imData.ch_load_member;
                    if (imData.add_time_offset!=undefined)
                        g_sta_data_set.add_time_offset = imData.add_time_offset
                    range_slider.static_wlan_range_set()
                    g_sta_data_set.show_chart();
                    g_sta_data_set.show_table();
                    g_ch_load.show_chart();
                }
            }
        });
        $("#derived_data").on("click", function () {
            var out_d = {
                sta_member: g_sta_data_set.member,
                sta_last_data: g_sta_data_set.last_data,
                add_time_offset: g_sta_data_set.add_time_offset,
                ch_load_member: g_ch_load.member,
            };
            _file_download(JSON.stringify(out_d), "wlan_data", "info");
        });
    }

    var status_page = {
        "length": 1,
        1: [
            ["STA_CON_STATUS_ROW", arrLang[lang]["LANG_WRIELESS_PERFORMANCE"], 2],
            ["switch", "go_or_stop", arrLang[lang]["LANG_UPDATE"], "go_or_stop"],
            ["append", "<div id=\"data_proc\" style=\"display:none;\"><table  style=\"line-height: 50 px;\"><tbody>\
                <tr nowrap=\"\"><th width=\"200 px\">\
                    <div class=\"abbreviation0\"><span>Data:</span></div></th><td>\
                    <div class=\"btn-group\">\
                        <button id=\"import_data\" type=\"button\" class=\"btn btn-light\">Import</button>\
                        <button id=\"derived_data\" type=\"button\" class=\"btn btn-light\">Export</button>\
                    </div>\
                </tr></tbody></table>\</div>\
                <div><input style=\"display:none;\" type=\"file\" id=\"import_file\" name=\"import_file\"></div>"],
            ["append", "<div id='range_slider'></div>"],
            ["text", "B_mac_filter", arrLang[lang]["LANG_MAC_FILTER"], "mac_filter", , "placeholder='e.g: \"xx:xx||xx:xx\" '"],
            ["append", "<div id=\"sta_info_table\"></div>"],
            ["append", "<div style=\"text-align:center;\"><div class=\"btn-group\" id=\"prefer_parm\" >\
                    <button type=\"button\"  class=\"btn btn-primary prefer_parm\" value=\"download_rate\">Download Rate</button>\
                    <button type=\"button \" class=\"btn btn-primary prefer_parm\" value=\"upload_rate\">Upload Rate</button>\
                    <button type=\"button \" class=\"btn btn-primary prefer_parm\" value=\"mcs_rx\">MCS RX Rate</button>\
                    <button type=\"button \" class=\"btn btn-primary prefer_parm\" value=\"mcs_tx\">MCS TX Rate</button>\
                    <button type=\"button \" class=\"btn btn-primary prefer_parm\" value=\"rssi\">RSSI</button>\
                    <button type=\"button \" class=\"btn btn-primary prefer_parm\" value=\"snr\">SNR</button>\
                    <button type=\"button \" class=\"btn btn-primary prefer_parm\" value=\"ch_load_wlan0\">Ch Load(5G)</button>\
                    <button type=\"button \" class=\"btn btn-primary prefer_parm\" value=\"ch_load_wlan1\">Ch Load(2.4G)</button>\
                </div></div>"],
            ["hidden", "download_rate_c", "1"],
            ["hidden", "upload_rate_c", "1"],
            ["hidden", "mcs_rx_c", "1"],
            ["hidden", "mcs_tx_c", "1"],
            ["hidden", "rssi_c", "1"],
            ["hidden", "snr_c", "1"],
            ["hidden", "ch_load_wlan0_c", "1"],
            ["hidden", "ch_load_wlan1_c", "1"],
            ["append", "<div class=\"sta_chart_select\" id=\"sta_parm_chart_download_rate\" style=\"max-height:200px;\"></div>\
                <div class=\"sta_chart_select\" id=\"sta_parm_chart_download_rate_w\" style=\"text-align:center;\">Download Rate (Kbps)</div>"],
            ["append", "<div class=\"sta_chart_select\" id=\"sta_parm_chart_upload_rate\" style=\"max-height:200px;\"></div>\
                <div class=\"sta_chart_select\" id=\"sta_parm_chart_upload_rate_w\" style=\"text-align:center;\">Upload Rate (Kbps)</div>"],
            ["append", "<div class=\"sta_chart_select\" id=\"sta_parm_chart_mcs_rx\" style=\"max-height:200px;\"></div>\
                <div class=\"sta_chart_select\" id=\"sta_parm_chart_mcs_rx_w\" style=\"text-align:center;\">MCS RX Rate (Mbps)</div>"],
            ["append", "<div class=\"sta_chart_select\" id=\"sta_parm_chart_mcs_tx\" style=\"max-height:200px;\"></div>\
                <div class=\"sta_chart_select\" id=\"sta_parm_chart_mcs_tx_w\" style=\"text-align:center;\">MCS TX Rate (Mbps)</div>"],
            ["append", "<div class=\"sta_chart_select\" id=\"sta_parm_chart_rssi\" style=\"max-height:200px;\"></div>\
                <div class=\"sta_chart_select\" id=\"sta_parm_chart_rssi_w\" style=\"text-align:center;\">RSSI (dBm)</div>"],
            ["append", "<div class=\"sta_chart_select\" id=\"sta_parm_chart_snr\" style=\"max-height:200px;\"></div>\
                <div class=\"sta_chart_select\" id=\"sta_parm_chart_snr_w\" style=\"text-align:center;\">SNR (dB)</div>"],
            ["append", "<div id=\"ch_load_wlan0\" style=\"max-height:200px;\"></div>\
                <div id=\"ch_load_wlan0_w\" style=\"text-align:center;\">Channel Load (5G)</div>"],
            ["append", "<div id=\"ch_load_wlan1\" style=\"max-height:200px;\"></div>\
                <div id=\"ch_load_wlan1_w\" style=\"text-align:center;\">Channel Load (2.4G)</div>"],
        ]
    }
    WP_STA_PM = Auto_Page_generate(status_page, "","col-lg-12");
    WP_STA_PM.go_or_stop.val("1");
    $(".prefer_parm").off("click");
    $("#import_data").off("click");
    $("#derived_data").off("click");
    check_windows_size();
    data_import_derived();

    g_ch_load = {
        chart: {},
        member: {},
        check_exist: function (wlan_symbol) {
            for (var key in this.member) {
                if (key == wlan_symbol)
                    return true;
            }
            return false;
        },
        member_add: function (new_data) {
            for (var i in new_data) {
                var nd = new_data[i];
                nd[i] = "";
                if (this.check_exist(i)) {
                    this.member[i].push(nd);
                } else {
                    this.member[i] = [nd];
                }
            }
        },
        show_one_chart: function (wlan_symbol) {
            var chart_data = [];
            var label_list = [];
            if (this.member[wlan_symbol] == undefined)
                return;
            if ($("#ch_load_" + wlan_symbol).length == 0) { //check whether is a div for parm to display
                return;
            }
            if (WP_STA_PM["ch_load_" + wlan_symbol + "_c"].val() != 1) { //btn-group value check
                if ($("#ch_load_" + wlan_symbol).children().length) {
                    $("#ch_load_" + wlan_symbol).empty();
                    delete this.chart[wlan_symbol];
                }
                $("#ch_load_" + wlan_symbol + "_w").hide();
                return;
            }
            $("#ch_load_" + wlan_symbol).show();
            $("#ch_load_" + wlan_symbol + "_w").show();
            for (var i in this.member[wlan_symbol]) {
                this.member[wlan_symbol][i][wlan_symbol] = i;
            }
            for (var key in this.member[wlan_symbol][0]) {
                if (key != wlan_symbol)
                    label_list.push(key);
            }
            chart_data = this.member[wlan_symbol];
            if (this.chart[wlan_symbol] == undefined) {
                this.chart[wlan_symbol] = Morris.Line({
                    element: "ch_load_" + wlan_symbol,
                    behaveLikeLine: true,
                    pointSize: 0,
                    parseTime: false,
                    ymax: 100.0,
                    hideHover: true,
                    data: chart_data,
                    xkey: wlan_symbol,
                    ykeys: label_list,
                    labels: label_list
                });
                this.chart[wlan_symbol].resizeHandler();
            } else {
                setTimeout(function(){
                    const key = wlan_symbol
                    const data = chart_data
                    g_ch_load.chart[key].setData(limit_info_num(data));
                }, 100);
            }
        },
        show_chart: function () {
            for (var i in this.member) {
                this.show_one_chart(i);
            }
        }
    }

    g_sta_data_set = {
        debug_on: 0,
        member: {},
        chart: {},
        mac_list: [],
        last_data: [],
        table_member: {},
        add_time_offset:{},
        mac_list_init: function () {
            var mac_list = [];
            var filter = WP_STA_PM.mac_filter.val();
            filter = filter.split("||");
            for (var key in this.member) { //mac filt
                // if (this.member[key][this.member[key].length-1]["online"] == "0") //offline filt
                //     continue;
                if (!filter.length) {
                    mac_list.push(key);
                    continue;
                }
                for (var i in filter) {
                    if (key.indexOf(filter[i]) != -1) {
                        mac_list.push(key);
                        break;
                    }
                }
            }
            if (this.mac_list.toString() != mac_list.toString()) {
                this.mac_list = mac_list;
                this.chart = {};
                for (var i in this.member) {
                    for (var parm in this.member[i][0]) {
                        if ($("#sta_parm_chart_" + parm).length != 0) {
                            $("#sta_parm_chart_" + parm).empty();
                        }
                    }
                    break;
                }
            }
            return;
        },
        check_exist: function (mac) {
            for (var key in this.member) {
                if (key == mac)
                    return true;
            }
            return false;
        },
        mcs_rate_init: function (nd) {
            var mcs_rx = nd["mcs_rx_rate"].split(" ");
            mcs_rx = mcs_rx[mcs_rx.length - 1];
            var mcs_tx = nd["mcs_tx_rate"].split(" ");
            mcs_tx = mcs_tx[mcs_tx.length - 1];
            if (mcs_rx == '')
                mcs_rx = "0";
            if (mcs_tx == '')
                mcs_tx = "0";
            nd["mcs_rx"] = mcs_rx;
            nd["mcs_tx"] = mcs_tx;
            return nd;
        },
        member_add: function (new_data) {
            if (new_data==undefined || new_data.length == 0)
                return;
            this.last_data = new_data;
            for (var i in new_data) {
                var nd = new_data[i];
                nd = this.mcs_rate_init(nd);
                if (this.check_exist(nd.mac)) {
                    this.member[nd.mac].push(nd);
                } else {
                    const add_time = current_time;
                    this.add_time_offset[nd.mac] = add_time;
                    this.member[nd.mac] = [nd];
                }
            }
        },
        show_one_chart: function (parm_name, unit) {
            var chart_place = "sta_parm_chart_" + parm_name;
            if ($("#sta_parm_chart_" + parm_name).length == 0) { //check whether is a div for parm to display
                return;
            }
            var chart_data = [];
            var line_num = 0;
            for (var mac in this.member) { //chart data init
                var md = this.member[mac];
                var time_offset = this.add_time_offset[mac]
                if (time_offset==undefined)
					time_offset=0;
                for (var i in md) {
                    var index = parseInt(i)+parseInt(time_offset) //add_time_offset to sync the X Coordinate
                    if (chart_data[index] == undefined)
                        chart_data[index] = {};
                    chart_data[index][mac] = md[i][parm_name];
                }
                while(time_offset) {//fill up empty data
                    time_offset--;
                    if (chart_data[time_offset] == undefined)
                        chart_data[time_offset] = {};
                    chart_data[time_offset][mac] = "0"
                }
                line_num++;
                if (line_num >= 7) //limit the line_num, for morris.js only has 7 colors for lines
                    break;
            }
            for (var i in chart_data) {//Add index to parms
                chart_data[i][parm_name] = i;
            }
            if (WP_STA_PM[parm_name + "_c"].val() != 1) { //btn-group value check
                if ($("#sta_parm_chart_" + parm_name).children().length) {
                    $("#sta_parm_chart_" + parm_name).empty();
                    delete this.chart[parm_name];
                }
                $("#sta_parm_chart_" + parm_name + "_w").hide();
                return;
            }
            $("#sta_parm_chart_" + parm_name).show();
            $("#sta_parm_chart_" + parm_name + "_w").show();
            if (this.debug_on)
                console.log(chart_data)
            if (this.chart[parm_name] == undefined) {
                var obj = Morris.Line({
                    element: chart_place,
                    behaveLikeLine: true,
                    pointSize: 0,
                    parseTime: false,
                    hideHover: true,
                    units: unit,
                    data: chart_data,
                    xkey: parm_name,
                    ykeys: this.mac_list,
                    labels: this.mac_list
                });
                this.chart[parm_name] = obj;
                this.chart[parm_name].resizeHandler();
            } else {
                setTimeout(function(){
                    const key = parm_name
                    const data = chart_data
                    g_sta_data_set.chart[key].setData(limit_info_num(data));
                },100);
            }
        },
        show_chart: function () {
            this.mac_list_init();
            if (this.mac_list.length == 0) {
                $(".sta_chart_select").hide();
                return;
            }
            for (var i in this.member) {
                for (var parm in this.member[i][0])
                    this.show_one_chart(parm);
                break;
            }
        },
        show_table: function () {
            var tmp_data = JSON.parse(JSON.stringify(this.last_data));
            for (var i in tmp_data) {
                if (this.mac_list.toString().indexOf(tmp_data[i]["mac"]) == -1) {
                    delete tmp_data[i];
                }
            }
            if (JSON.stringify(tmp_data) != JSON.stringify(this.table_member)) {
                this.table_member = JSON.parse(JSON.stringify(tmp_data));
                $("#sta_info_table").empty();
                var table_obj = {
                    direction: 0,
                    selector: $("#sta_info_table"),
                    header: ["MAC", "Download", "Upload", "MCS Rx", "MCS Tx", "SNR", "RSSI", "Online"],
                    contain: ["mac", "download_rate", "upload_rate", "mcs_rx_rate", "mcs_tx_rate", "snr", "rssi", "online"],
                    origin: this.table_member,
                    origin_key_word: "",
                };
                if (this.table_member[0] != undefined && this.table_member[0].length != 0)
                    table_generate(table_obj);
            }
            return;
        },
    }
    

    range_slider = {
        init: function(){
            $("#range_slider").ionRangeSlider({
                skin: "round",
                min: 0,
                max: 30,
                from: 30,
                from_min: 5,
                type: 'single',
                prefix: "time range: ",
                postfix: "s",
                grid: true,
                min_interval: null,
                grid_num: 1
            });
        },
        dynamic_wlan_range_set : function() {
            var tar = $("#range_slider").data("ionRangeSlider")
            tar.update({
                min: 0,
                max: 30,
                from: 30,
                from_min: 5,
                min_interval: null,
                type: 'single',
            })
        },
        static_wlan_range_set: function() {
            var max = max_time_of_record(g_sta_data_set.member)
            var tar = $("#range_slider").data("ionRangeSlider")
            tar.update({
                min: 0,
                max: max,
                from: 0,
                to: max,
                from_min: 0,
                min_interval: 2,
                type: 'double',
            })
        }
    }

}

function check_is_ch_load_OK() {
    var ch_load_data = initWlanChLoadData();
    for (var wlan in ch_load_data) {
        if (ch_load_data[wlan].interence_time != 0 ||
            ch_load_data[wlan].DUT_Time != 0 ||
            ch_load_data[wlan].other_APs_Time != 0 ||
            ch_load_data[wlan].free_Time != 0)
            return 1;
    }
    $("button[value='ch_load_wlan0']").hide();
    $("button[value='ch_load_wlan1']").hide();
    $("#ch_load_wlan0").hide();
    $("#ch_load_wlan0_w").hide();
    $("#ch_load_wlan1").hide();
    $("#ch_load_wlan1_w").hide();
    $("button[value='snr']").css("border-bottom-right-radius", ".35rem");
    $("button[value='snr']").css("border-top-right-radius", ".35rem");
    console.warn("ch_load is not ready");
    return 0;
}

var is_ch_load_OK = 0;
var wireless_performance_updata_timeout;
var current_time = -1;
function reflash_chart() {
    current_time++;
    if ($("#STA_CON_STATUS_ROW").length == 0) {
        if (wireless_performance_updata_timeout)
            clearTimeout(wireless_performance_updata_timeout);
        return;
    }

    if (WP_STA_PM.go_or_stop.val() == 1) {
        var list_data = initWlanCliListData();
        g_sta_data_set.member_add(list_data);
    }


    g_sta_data_set.show_chart();
    g_sta_data_set.show_table();
    if (is_ch_load_OK) {
        var ch_load_data = initWlanChLoadData();
        g_ch_load.member_add(ch_load_data);
        g_ch_load.show_chart();
    }
    wireless_performance_updata_timeout = setTimeout(reflash_chart, 1000);
}

$(document).ready(function () {
    sta_connect_status();
    is_ch_load_OK = check_is_ch_load_OK();
    range_slider.init();
    reflash_chart();
})
