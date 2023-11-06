function iperf_test_page_init() {
    function status_refresh() {
        $("#download_test_data").hide();
        var obj = getASPdata("getWlanCliDetailInfo");
        var list = {};
        obj = obj.split("\n");
        for (var i in obj) {
            var reg = /&/g;
            obj[i] = obj[i].replace(reg, '\n');
            if (obj[i].indexOf("host") == -1)
                break;
            var tmpobj = {};
            Page_data_obj_init(tmpobj, obj[i]);
            if (tmpobj["online"] == "1")
                list["mac-" + tmpobj["mac"]] = tmpobj;
        }

        APG.new_tbl({
            "direction": "0",
            "selector": $("#sta_list"),
            "header": ["Name", "IP", "BSSID"],
            "contain": ["host", "ip", "mac"],
            "origin": list,
            "origin_key_word": "mac-",
            table_mapping: ["", "", PM.mac, ""],
        });

        var status = getASPdata("iperfTestStatus");
        $("#iperf_test_status").text("Test Status: " + status);

        if (status.indexOf("DONE") != -1) {
            $("#download_test_data").show();
        } else {
            $("#download_test_data").hide();
        }

        PM.mac.val("");
    }

    function start_check() {
        if ($("#iperf_test_status").text().indexOf("RUN") != -1) {
            MyAlert("Iperf is running");
            return false;
        }
        if (PM.mac.val() == "") {
            MyAlert("Please select a device");
            return false;
        }
        return true;
    }

    function msg_process(data) {
        setTimeout(status_refresh, 1000);
        MyAlert(data);
    }

    var PM = APG.new([
        ["iperf_test_page", "Iperf Test", "2"],
        ["tips", "h6", "class='tips_font'", "arrLang[lang]['IPERF_TEST_INSTRUCTION1']"],
        ["tips", "h6", "class='tips_font'", "arrLang[lang]['IPERF_TEST_INSTRUCTION2']"],
        ["tips", "h6", "class='tips_font'", "arrLang[lang]['IPERF_TEST_INSTRUCTION3']"],
        ["tips", "h6", "class='tips_font'", "arrLang[lang]['IPERF_TEST_INSTRUCTION4']"],
        ["form", "iperf_test_form", "action=\"/boaform/getASPdata/formIperfTest\"method=\"POST\"", "1", , msg_process],
        ["append", "<div id='iperf_test_status' class=\"tips_font\"></div>"],
        ["hidden", "mac", ""],
        ["submit", "iperf_test_start", start_check, "Start"],
        ["button", "status_refresh", "Refresh", "btn-info", "margin-bottom:10px;margin-top:10px"],
        ["button", "download_test_data", "Download Test Data", , "margin-bottom:10px;"],
        ["append", "<div style=\"text-align:center;font-weight:600;font-size:18px;\">Online Device</div>"],
        ["append", "<div id=\"sta_list\" class=\"table-striped\"></div>"],
    ]);
    status_refresh();

    $("#status_refresh").on("click", status_refresh);

    $("#download_test_data").on("click", function () {
        get_bin_file("/boaform/getASPdata/getIperfRecord", "iperf_record.txt");
    });
}

$(document).ready(function () {
    iperf_test_page_init();
});
