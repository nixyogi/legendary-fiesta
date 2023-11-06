var wlanCliListShow_timeout;
function clientMgmPage_init() {
    $("#container").append("<div id=\"clientList_row\" class=\"row\">\
    <div class=\"col-lg-8\">\
        <div class=\"card shadow mb-4 col-lg-push-1\">\
            <div class=\"card-header\" style=\"height: 52px;\">\
                <div>\
                    <div style=\"float: left;\">\
                        <h6 style='line-height:31px' class=\"m-0 font-weight-bold text-primary lang\"\
                            key=\"LANG_WLAN_CLIENT_MANGEMENT\">"+ L("LANG_WLAN_CLIENT_MANGEMENT") + "\
                        </h6>\
                    </div>\
                    <div style=\"float: right;width: 30%;\">\
                        <input type='text' name='search' class='form-control form-control-sm'\
                            placeholder=\"Search\">\
                    </div>\
                </div>\
            </div>\
            <div class=\"card-body\">\
            </div>\
        </div>\
    </div>\
</div>");

    var clientListPage = {
        "length": 1,
        1: [
            [".card-body", 0, "2"],
            ["append", '<div style="float:left; border-top: solid #dfdfdf 1px;height: 1px;width: 100%;"></div>'],
            ["append", "<div id='wirelessCliList'></div>"],
        ]
    };
    var ntpSyncStatus = 0;

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

    function timeTranslate(str) { //e.g '84111' unit:s
        str = parseInt(str);
        var day = parseInt(str / 86400);
        var hour = parseInt(str % 86400 / 3600);
        var minute = parseInt(str % 86400 % 3600 / 60);
        var second = parseInt(str % 8600 % 3600 % 60);
        var translate = day.toString() + ":" +
            (hour.toString().length == 1 ? '0' + hour.toString() : hour.toString()) + ":" +
            (minute.toString().length == 1 ? '0' + minute.toString() : minute.toString()) + ":" +
            (second.toString().length == 1 ? '0' + second.toString() : second.toString());
        return translate;
    }

    function rateTranslate(str) { //e.g '208' unit:Kbps
        if (str.length < 4)
            return (parseInt(str) / 8).toFixed(1) + "<span style='font-size:smaller'> KB/s</span>"
        if (str.length >= 4 && str.length < 7)
            return (parseInt(str) / 1024 / 8).toFixed(1) + "<span style='font-size:smaller'> MB/s</span>"
        if (str.length >= 7)
            return (parseInt(str) / 1048576).toFixed(1) + "<span style='font-size:smaller'> GB/s</span>"
    }

    function hostLogoAppend(tar) {
        if (tar["host"].toUpperCase().indexOf("DESKTOP") != -1 || tar["host"].toUpperCase().indexOf("PC") != -1)
            return 'class="fa fa-desktop"';
        if (tar["host"].toUpperCase().indexOf("LAPTOP") != -1)
            return 'class="fa fa-laptop"';
        return 'class="fa fa-mobile-alt"';
    }

    function funcLogoAppend(tar) {
        var logo = "";
        logo += '<span style="font-size: larger;font-weight: bold;" class="hostName text-primary">' + tar["host"] + ' </span>'
        if (tar["download_limit"] != 0 || tar["upload_limit"] != 0)
            logo += '<span><i style="font-size:smaller;color: #f9a202;" class="fa fa-compress-alt" aria-hidden="true"></i>&nbsp</span>';
        if (tar["onTime"] != tar["offTime"])
            logo += '<span><i style="font-size:smaller;color: #08b70d9e" class="fa fa-clock" aria-hidden="true"></i>&nbsp</span>';
        if (tar["ban"] == 1)
            logo += '<span ><i style="font-size:smaller;color: #ff660d" class="fa fa-ban" aria-hidden="true"></i>&nbsp</span>';
        return logo;
    }

    function checkCssStatus(tar) {
        if (parseInt(tar["download_limit"]) || parseInt(tar["upload_limit"]) || parseInt(tar["onTime"]) || parseInt(tar["offTime"]))
            return "class='optionable gray_picture'"
        return "class='justhover:disable gray_picture'"
    }

    var listData = [];

    function wlanCliListShow() {
        readyFlag = 0;
        var tar = $("#wirelessCliList");
        if (tar.length == 0)
            return;
        if (wlanCliListShow_timeout)
            clearTimeout(wlanCliListShow_timeout);
        var list = initWlanCliListData();
        tar.empty();
        for (var i in list) {
            tar.append('<div ' + (list[i]["online"] == 1 ? "class='justhover'" : checkCssStatus(list[i])) + '>\
                            <div style="float:left;width: 25%;height: 102px;">\
                                <div style="height: 60%;">\
                                    <i style="font-size: 40px;line-height: 60px;" ' + hostLogoAppend(list[i]) + '  aria-hidden="true"></i>\
                                </div>\
                                <div style="height: 40%;">\
                                    <div style="font-size: smaller;"><span style="color: #df9100;font-weight: bold;">↑</span><span class="uploadSpeed">' + rateTranslate(list[i]["upload_rate"]) + '</span> </div>\
                                    <div style="font-size: smaller;"><span style="color: #00c040;font-weight: bold;">↓</span><span class="downloadSpeed">' + rateTranslate(list[i]["download_rate"]) + '</span> </div>\
                                </div>\
                            </div>\
                            <div style="float:left;width: 75%;">\
                                <div>' + funcLogoAppend(list[i]) + '</div>\
                                <div><span style="color:#aaaaaa">IP:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="ipAddr">' + list[i]["ip"] + '</span> </div>\
                                <div><span style="color:#aaaaaa">MAC:&nbsp;</span> <span class="macAddr">' + list[i]["mac"].toUpperCase() + '</span> </div>\
                                <div><span style="color:#aaaaaa">' + arrLang[lang]['LANG_CONNECTED_TIME'] + ':&nbsp;</span> <span>' + timeTranslate(list[i]["link_time"]) + '</span> </div>\
                            </div>\
                        </div>\
                        <div style="float:left; border-top: solid #dfdfdf 1px;height: 1px;width: 100%;"></div>');
        }
        listData = list;
        setFuncInit();
        wlanCliListShow_timeout = setTimeout(wlanCliListShow, 2000);
    }

    function setFuncInit() {
        function menuGenerate(end) {
            var array = [];
            for (var i = 0; i <= end; i++) {
                var str = i.toString();
                if (str.length == 1)
                    str = '0' + str;
                array.push([i, str]);
            }
            return array;
        }

        function configEvent() {
            var tar;
            var config_PM = {};
            for (var i in listData) {
                if (listData[i]["mac"].toUpperCase() == $(this).find(".macAddr").text()) {
                    tar = listData[i]
                    break;
                }
            }
            var configFlowPage = {
                id: "CONFIGPAGEROW",
                name: tar["host"] + "&nbsp&nbsp&nbsp" + tar["ip"],
                width: "400px",
                height: "600px",
            }
            flow_table_generate(configFlowPage);
            var configPage = {
                "length": 1,
                1: [
                    ["CONFIGPAGEROW", 0, "2"],
                    ["form", "config_form", "action=\"/boaform/getASPdata/wlanCliDetailConfig\" method=\"POST\"", "1", after_action, after_action],
                    ["tips", "h6", "class='tips_font'", arrLang[lang]['LANG_RATE_LIMIT_TIPS']],
                    ["text", "B_uploadLimit", arrLang[lang]['LANG_UPLOAD_LIMIT'], "uploadLimit", "6", "placeholder='1 ~ 110000 unit:KB/s'"],
                    ["text", "B_downloadLimit", arrLang[lang]['LANG_DOWNLOAD_LIMIT'], "downloadLimit", "6", "placeholder='1 ~ 110000 unit:KB/s'"],
                    ["switch", "B_ban", arrLang[lang]['LANG_NOT_SURFING_INTERNET'], "ban"],
                    // ["switch", "B_timeLimit", arrLang[lang]['LANG_USE_TIME_LIMIT'], "timeLimitSwitch"],
                    // ["tips", "h6", "id='timingTips' class='banFunc' style='display:none;' ", arrLang[lang]['LANG_CLI_TIMING_FUNC_TIPS']],
                    // ["menu", "B_timeL0", arrLang[lang]["LANG_WLAN_SCHEDULE_FROM"] + arrLang[lang]["LANG_WLAN_SCHEDULE_FOR_HOUR"], "timeL0", menuGenerate(23)],
                    // ["menu", "B_timeL1", arrLang[lang]["LANG_WLAN_SCHEDULE_FROM"] + arrLang[lang]["LANG_WLAN_SCHEDULE_FOR_MIN"], "timeL1", menuGenerate(59)],
                    // ["menu", "B_timeL2", arrLang[lang]["LANG_WLAN_SCHEDULE_TO"] + arrLang[lang]["LANG_WLAN_SCHEDULE_FOR_HOUR"], "timeL2", menuGenerate(23)],
                    // ["menu", "B_timeL3", arrLang[lang]["LANG_WLAN_SCHEDULE_TO"] + arrLang[lang]["LANG_WLAN_SCHEDULE_FOR_MIN"], "timeL3", menuGenerate(59)],
                    ["hidden", "mac", ""],
                    ["hidden", "onTime", "0"],
                    ["hidden", "offTime", "0"],
                    ["submit", "configSubmit", configCheckFunc],
                ]
            }
            /*Data Init*/
            config_PM = Auto_Page_generate(configPage);
            config_PM.uploadLimit.val(parseInt(parseInt(tar["upload_limit"]) / 8));
            config_PM.downloadLimit.val(parseInt(parseInt(tar["download_limit"]) / 8));
            config_PM.ban.val(tar["ban"]);
            // if (ntpSyncStatus == "1") {
            //     config_PM.timeLimitSwitch.val(tar["onTime"] != tar["offTime"] ? 1 : 0);
            // } else {
            //     config_PM.timeLimitSwitch.val(0);
            //     config_PM.timeLimitSwitch.body().addClass("banFunc");
            //     $("#timingTips").show();
            // }
            // if (tar["onTime"] == tar["offTime"]) {
            //     config_PM.timeL0.val(0);
            //     config_PM.timeL1.val(0);
            //     config_PM.timeL2.val(0);
            //     config_PM.timeL3.val(0);
            // } else {
            //     var onTime = parseInt(tar["onTime"]);
            //     var offTime = parseInt(tar["offTime"]);
            //     config_PM.timeL0.val(parseInt(onTime / 3600));
            //     config_PM.timeL1.val(parseInt(onTime % 3600 / 60));
            //     config_PM.timeL2.val(parseInt(offTime / 3600));
            //     config_PM.timeL3.val(parseInt(offTime % 3600 / 60));
            // }
            config_PM.mac.val(tar["mac"]);
            FMask_init();


            function after_action() {
                $(".layui-layer-close2").click();
            }

            function configCheckFunc() {
                if (!sji_checknum(config_PM.uploadLimit.val())) {
                    checkWarningT(config_PM.uploadLimit.body().find("input"), arrLang[lang]['LANG_NEED_INTEGER_IN_RANGE']);
                    return false
                }
                if (config_PM.uploadLimit.val() > 110000) {
                    checkWarningT(config_PM.uploadLimit.body().find("input"), arrLang[lang]['LANG_NEED_INTEGER_IN_RANGE']);
                    return false
                }
                if (!sji_checknum(config_PM.downloadLimit.val())) {
                    checkWarningT(config_PM.downloadLimit.body().find("input"), arrLang[lang]['LANG_NEED_INTEGER_IN_RANGE']);
                    return false
                }
                if (config_PM.downloadLimit.val() > 110000) {
                    checkWarningT(config_PM.downloadLimit.body().find("input"), arrLang[lang]['LANG_NEED_INTEGER_IN_RANGE']);
                    return false
                }

                // if (config_PM.timeLimitSwitch.val() == 1) {
                //     if (config_PM.timeL0.val() == config_PM.timeL2.val() && config_PM.timeL1.val() == config_PM.timeL3.val()) {
                //         checkWarningT(config_PM.timeL0.body(), arrLang[lang]['LANG_START_END_NOT_BE_SAME'])
                //         return false
                //     }
                //     config_PM.onTime.val(parseInt(config_PM.timeL0.val()) * 3600 + parseInt(config_PM.timeL1.val()) * 60);
                //     config_PM.onTime.val(parseInt(config_PM.timeL0.val()) * 3600 + parseInt(config_PM.timeL1.val()) * 60);
                //     config_PM.offTime.val(parseInt(config_PM.timeL2.val()) * 3600 + parseInt(config_PM.timeL3.val()) * 60);
                //     config_PM.offTime.val(parseInt(config_PM.timeL2.val()) * 3600 + parseInt(config_PM.timeL3.val()) * 60);
                // } else {
                //     config_PM.onTime.val(0);
                //     config_PM.offTime.val(0);
                // }
                return true;
            }

            // $("#CONFIGPAGEROW").on("click", function () {
            //     if (config_PM.timeLimitSwitch.val() == 0) {
            //         config_PM.ban.body(1);
            //         config_PM.timeL0.body(0);
            //         config_PM.timeL1.body(0);
            //         config_PM.timeL2.body(0);
            //         config_PM.timeL3.body(0);
            //     } else {
            //         config_PM.ban.body(0);
            //         config_PM.ban.val(0);
            //         config_PM.timeL0.body(1);
            //         config_PM.timeL1.body(1);
            //         config_PM.timeL2.body(1);
            //         config_PM.timeL3.body(1);
            //     }
            // })
            $("#CONFIGPAGEROW").click();
        }
        $("#wirelessCliList").find(".justhover").on("click", configEvent);
        $("#wirelessCliList").find(".optionable").on("click", configEvent);
    }

    // var ntpSyncStatus = getASPdata("checkTimeSync");
    Auto_Page_generate(clientListPage);
    wlanCliListShow();
}





$(document).ready(function () {
    clientMgmPage_init();
})
