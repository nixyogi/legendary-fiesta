
function BS_PAGE_INIT() {
    $("#5G_WLAN_BASIC_CONFIG_ROW").remove();
    WLAN_BASIC_DATA = {};
    Page_data_obj_init(WLAN_BASIC_DATA, OneForAll("getASPdata/wlanPageInit_5G", 5, 0, 0, 0));
    var WLAN_5G_PAGE = {
        "length": 1,
        1: [
            ["5G_WLAN_BASIC_CONFIG_ROW", "arrLang[lang]['5g Wlan Basic Setting']", "2"],
            ["form", "5G_WLAN_BASIC_CONFIG_FORM", "action=\"/boaform/getASPdata/formWlanSetup\"method=\"POST\"", "1", basic_config_success_refresh],
            ["switch", "B_wlanDisabled", "arrLang[lang][\"LANG_DISABLE_WLAN_INTERFACE\"]", "wlanDisabled"],
            // ["menu", "B_band", "arrLang[lang][\"LANG_BAND\"]", "band", [
            //     ["3", "5 GHz (A)"],
            //     ["7", "5 GHz (N)"],
            //     ["11", "5 GHz (A+N)"],
            //     ["63", "5 GHz (AC)"],
            //     ["71", "5 GHz (N+AC)"],
            //     ["75", "5 GHz (A+N+AC)"],
            // ]],
            ["menu", "B_band", "arrLang[lang][\"LANG_BAND\"]", "band", band_init()],
            ["menu", "B_mode", "arrLang[lang][\"LANG_MODE\"]", "mode", [
                ["0", "AP"],
               // ["1", "Client"], ONU only use AP mode now
            ]],
            ["text", "B_ssid", "arrLang[lang][\"LANG_SSID\"]", "ssid", "32"],
            ["switch", "B_wlHide", "arrLang[lang][\"LANG_CANCEL_BROADCAST\"]", "wlHide"],
            ["switch", "B_wl_access", "arrLang[lang][\"LANG_BLOCK_RELAY\"]", "wl_access"],
            ["switch", "B_wl_wmm_func", "WMM", "wl_wmm_func"],
            //["switch", "B_powerincrease", "arrLang[lang][\"LANG_POWER_ENHANCING\"]", "powerincrease"],
            //["switch", "B_powersaving", "arrLang[lang][\"LANG_POWER_SAVING\"]", "powersaving"],
            ["menu", "B_chanwid", "arrLang[lang][\"LANG_CHANNEL_WIDTH\"]", "chanwid", [
                ["0", "20MHz"],
                ["1", "40MHz"],
                ["2", "80MHz"],
            ]],
            /*["menu", "B_ctlband", "arrLang[lang][\"LANG_CONTROL_SIDEBAND\"]", "ctlband", [
                ["0", "Upper"],
                ["1", "Lower"],
            ]],*/
            ["menu", "B_chan", "arrLang[lang][\"LANG_CHANNEL_NUMBER\"]", "chan", [
                [0, "arrLang[lang]['LANG_AUTO_WITH_DFS']"],
                /*[20, "arrLang[lang]['LANG_AUTO_WITHOUT_DFS']"], remove it*/
                [34, "34"],
                [36, "36"],
                [40, "40"],
                [42, "42"],
                [44, "44"],
                [48, "48"],
                [52, "52"],
                [56, "56"],
                [60, "60"],
                [64, "64"],
                [100, "100"],
                [104, "104"],
                [108, "108"],
                [112, "112"],
                [116, "116"],
                [120, "120"],
                [124, "124"],
                [128, "128"],
                [132, "132"],
                [136, "136"],
                [140, "140"],
                [144, "144"],
                [149, "149"],
                [153, "153"],
                [157, "157"],
                [161, "161"],
                [165, "165"],
                [169, "169"],
                [173, "173"],
                [177, "177"],
            ]],
            ["menu", "B_txpower", "arrLang[lang][\"LANG_RADIO_POWER\"]", "txpower", [
                ["0", "100%"],
                ["1", "75%"],
                ["2", "50%"],
                ["3", "25%"],
                ["4", "15%"],
            ]],


            ["menu", "B_regdomain_demo", "arrLang[lang][\"LANG_REGDOMAIN\"]", "regdomain_demo", [
                ["1", "(1) FCC"],
                ["2", "(2) IC"],
                ["3", "(3) ETSI"],
                ["4", "(4) SPAIN"],
                ["5", "(5) FRANCE"],
                ["6", "(6) MKK"],
                ["7", "(7) ISREAL"],
                ["9", "(9) MKK2"],
                ["10", "(10) MKK3"],
                ["12", "(12) RUSSIAN"],
                ["13", "(13) CN"],
                ["14", "(14) Global"],
                ["15", "(15) World-wide"],
            ]],
            ["hidden", "basicrates", ""],
            ["hidden", "operrates", ""],
            ["hidden", "wlan_idx", "1"],
            ["hidden", "Band2G5GSupport", "2"],
            ["hidden", "WiFiTest", ""],
            ["submit", "5G_BASIC_SUBMIT", CHECK_5G_BASIC],
        ],
    }
    WLAN_5G_PM = Auto_Page_generate(WLAN_5G_PAGE);
    set_obj_data_to_html(WLAN_BASIC_DATA);

    function band_init() {
        var obj = {};
        var band_selection = [];
        Page_data_obj_init(obj, OneForAll("getASPdata/band_init_5G", 5, 0, 0, 0));
        //console.log(obj);
        for (var key in obj) {
            band_selection.push([key, obj[key]]);
        }
        return band_selection
    }
}

function SEC_PAGE_INIT() {
    $("#5G_SECURITY_CONFIG_ROW").remove();
    WLAN_SECURITY_DATA = {};
    Page_data_obj_init(WLAN_SECURITY_DATA, OneForAll("getASPdata/initWlWpa_data_5G", 5, 0, 0, 0));
    for (var key in WLAN_SECURITY_DATA) {
        WLAN_SECURITY_DATA[key] = nest_obj_init(WLAN_SECURITY_DATA[key]);
    }
    var WLAN_5G_SECURITY_PAGE = {
        "length": 1,
        1: [
            ["5G_SECURITY_CONFIG_ROW", "arrLang[lang]['LANG_WLAN_SECURITY_SETTINGS']", "2"],
            ["form", "5G_SECURITY_CONFIG_FORM", "action=\"/boaform/getASPdata/formWlEncrypt\"method=\"POST\"", "1"],
            ["menu", "B_wpaSSID", "SSID ,arrLang[lang][\"LANG_NAME\"]", "wpaSSID", ssid_name_select_init()],
            // ["menu", "B_security_method", "arrLang[lang][\"LANG_ENCRYPTION\"]", "security_method", [
            //     ["0", "None"],
            //     ["1", "WEP"],
            //     ["2", "WPA"],
            //     ["4", "WPA2"],
            //     ["6", "WPA2 Mixed"],
            // ]],
            ["menu", "B_security_method", "arrLang[lang][\"LANG_ENCRYPTION\"]", "security_method", security_method_init()],
            ["switch", "B_use1x", "802.1x ,arrLang[lang][\"LANG_AUTHENTICATION\"]", "use1x"],
            ["menu", "B_auth_type", "arrLang[lang][\"LANG_AUTHENTICATION\"]", "auth_type", [
                ["0", "arrLang[lang]['LANG_OPEN_SYSTEM']"],
                ["1", "arrLang[lang]['LANG_SHARED_KEY']"],
                ["2", "arrLang[lang]['LANG_AUTO']"]
            ]],
            ["menu", "B_length0", "arrLang[lang][\"LANG_KEY_LENGTH\"]", "length0", [
                ["1", " 64-bit"],
                ["2", "128-bit"],
            ]],
            ["menu", "B_format0", "arrLang[lang][\"LANG_KEY_FORMAT\"]", "format0", [
                ["1", "ASCII (5 characters)"],
                ["2", "Hex (10 characters)"],
            ]],
            ["text", "B_key0", "arrLang[lang][\"LANG_ENCRYPTION_KEY\"]", "key0"],
            ["menu", "B_wpaAuth", "arrLang[lang][\"LANG_AUTHENTICATION_MODE\"]", "wpaAuth", [
                ["1", "Enterprise (RADIUS)"],
                ["2", "Personal (Pre-Shared Key)"]
            ]],
            /*["menu", "B_dotIEEE80211W", "arrLang[lang][\"LANG_IEEE_802_11W\"]", "dotIEEE80211W", [
                ["0", "None"],
                ["1", "Capable"],
                ["2", "Required"],
            ]],*/

            ["tips", "div", "class='WPA_mode' style=\"font-weight: bolder;line-height:52px;\"", "WPA ,arrLang[lang][\"LANG_CIPHER_SUITE\"]"],
            ["append", Cipher_suite_init(0)],
            ["hidden", "ciphersuite_t", ""],
            ["hidden", "ciphersuite_a", ""],
            ["tips", "div", "class='WPA2_mode' style=\"font-weight: bolder;line-height:52px;\"", "WPA2 ,arrLang[lang][\"LANG_CIPHER_SUITE\"]"],
            ["append", Cipher_suite_init(1)],
            ["hidden", "wpa2ciphersuite_t", ""],
            ["hidden", "wpa2ciphersuite_a", ""],

            ["tips", "div", "class='WPA3_mode' style=\"font-weight: bolder;line-height:52px;\"", "WPA3 ,arrLang[lang][\"LANG_CIPHER_SUITE\"]"],
            ["append", Cipher_suite_init(2)],
            ["hidden", "wpa3ciphersuite_a", ""],


            ["menu", "B_pskFormat", "arrLang[lang][\"LANG_PRE_SHARED_KEY_FORMAT\"]", "pskFormat", [
                ["0", "Passphrase"],
                ["1", "HEX (64 characters)"],
            ]],
            ["password", "B_pskValue", "arrLang[lang][\"LANG_PRE_SHARED_KEY\"]", "pskValue", "64"],
            /*["switch", "B_wapiAuth", "arrLang[lang][\"LANG_OMCI_OLT_MODE\"]", "wapiAuth"],
            ["menu", "B_wapiPskFormat", "arrLang[lang][\"LANG_PRE_SHARED_KEY_FORMAT\"]", "wapiPskFormat", [
                ["0", "Passphrase"],
                ["1", "HEX (64 characters)"],
            ]],
            ["password", "B_wapiPskValue", "arrLang[lang][\"LANG_PRE_SHARED_KEY\"]", "wapiPskValue", "64"],*/
            ["menu", "B_wepKeyLen", "arrLang[lang][\"LANG_KEY_LENGTH\"]", "wepKeyLen", [
                ["1", "64-bit"],
                ["2", "128-bit"],
            ]],
            ["text", "B_radiusIP", "RADIUS ,arrLang[lang][\"LANG_SERVER\"], IP ,arrLang[lang][\"LANG_ADDRESS\"]", "radiusIP", "15"],
            ["text", "B_radiusPort", "RADIUS ,arrLang[lang][\"LANG_SERVER\"], ,arrLang[lang][\"LANG_PORT\"]", "radiusPort", "5"],
            ["password", "B_radiusPass", "RADIUS ,arrLang[lang][\"LANG_SERVER\"], ,arrLang[lang][\"LANG_PASSWORD\"]", "radiusPass", "64"],




            ["hidden", "wlan_idx", "1"],
            ["submit", "5G_SECURITY_CONFIG_SUBMIT", CHECK_5G_SEC]
        ]
    }
    WLAN_5G_SEC_PM = Auto_Page_generate(WLAN_5G_SECURITY_PAGE);
    (function (s) {
        $(".B_wpaSSID").on("click", function (e) {
            var index = $(this).attr("value");
            var data;
            for (var key in WLAN_SECURITY_DATA) {
                if (WLAN_SECURITY_DATA[key].index == index)
                    data = WLAN_SECURITY_DATA[key];
            }
            set_obj_data_to_html(data);
            if (data.security_method == "6") {
                WLAN_5G_SEC_PM.ciphersuite_t.val(data.ciphersuite_t);
                WLAN_5G_SEC_PM.ciphersuite_a.val(data.ciphersuite_a);
                WLAN_5G_SEC_PM.wpa2ciphersuite_t.val(data.wpa2ciphersuite_t);
                WLAN_5G_SEC_PM.wpa2ciphersuite_a.val(data.wpa2ciphersuite_a);
            }
            else if (data.security_method == "16" || data.security_method == "20") {
                WLAN_5G_SEC_PM.wpa3ciphersuite_a.val("1");
            }
        })
    })(jQuery);

    function security_method_init() {
        var obj = {};
        var security_method_selection = [];
        Page_data_obj_init(obj, OneForAll("getASPdata/initSecurityMethod", 5, 0, 0, 0));
        //console.log(obj);
        for (var key in obj) {
            security_method_selection.push([key, obj[key]]);
        }
        return security_method_selection
    }
}

function MULTI_AP_PAGE_INIT() {
    $("#MULTI_AP_PAGE_ROW").remove();
    var multi_page = {
        "length": 1,
        1: [
            ["MULTI_AP_PAGE_ROW", "arrLang[lang]['LANG_WLAN_MULTIPLE_BSSID_SETTINGS']", "2"],
            ["append", "\
            <table>\
                <th width=\"30px\"></th>\
                <th width=\"80px\">\
                    <div style=\"position: relative;\">\
                        <button type=\"button\" id=\"5g_AP_1\"\
                            class=\"btn btn-secondary btn-block btn-round\" style=\"text-align: left;\">AP1</button>\
                            <div class=\"circle_enable\"></div>\
                    </div>\
                </th>\
                <th width=\"20px\"></th>\
                <th width=\"80px\">\
                    <div style=\"position: relative;\">\
                        <button type=\"button\" id=\"5g_AP_2\"\
                            class=\"btn btn-secondary btn-block btn-round\" style=\"text-align: left;\">AP2</button>\
                            <div class=\"circle_enable\"></div>\
                    </div>\
                </th>\
                <th width=\"20px\"></th>\
                <th width=\"80px\">\
                    <div style=\"position: relative;\">\
                        <button type=\"button\" id=\"5g_AP_3\"\
                            class=\"btn btn-secondary btn-block btn-round\" style=\"text-align: left;\">AP3</button>\
                            <div class=\"circle_enable\"></div>\
                    </div>\
                </th>\
            </table>"],
            ["form", "Multi_AP_form", "action=\"/boaform/getASPdata/formWlanMultipleAP\" method=\"POST\"", "1", basic_config_success_refresh],
            ["append", "<div id=\"5g_AP1_setting_div\" style=\"display:none;\">\
            <br>\
        </div>\
        <div id=\"5g_AP2_setting_div\" style=\"display:none;\">\
            <br>\
        </div>\
        <div id=\"5g_AP3_setting_div\" style=\"display:none;\">\
            <br>\
        </div>\
        <input type=\"hidden\" name=\"wlan_idx\" value=\"1\">\
        </div>"],
            ["submit", "Multi_AP_Submit", check_Multi_SSID_setting],
            ["append", "<br>"],
        ]
    }
    var Multi_AP = {
        "length": 3,
        1: [
            ["#5g_AP1_setting_div", 0, 2],
            ["tips", "h6", "class='tips_font'", "AP-1 ,arrLang[lang][\"LANG_CONFIGURATION\"]"],
            ["switch", "5g_AP1_Enable", "arrLang[lang][\"LANG_DISABLE_WLAN_INTERFACE\"]", "wl_disable1"],
            // ["menu", "5g_AP1_Band", "arrLang[lang][\"LANG_BAND\"]", "wl_band1", [
            //     [3, "5 GHz (A)"],
            //     [7, "5 GHz (N)"],
            //     [11, "5 GHz (A+N)"],
            //     [63, "5 GHz (AC)"],
            //     [71, "5 GHz (N+AC)"],
            //     [75, "5 GHz (A+N+AC)"],
            // ]],
            ["menu", "5g_AP1_Band", "arrLang[lang][\"LANG_BAND\"]", "wl_band1", wl_band_init()],
            ["text", "5g_AP1_SSID", "arrLang[lang][\"LANG_SSID\"]", "wl_ssid1", "32"],
            ["menu", "5g_AP1_data_rate", "arrLang[lang][\"LANG_DATA_RATE\"]", "TxRate1", [
                [0, "arrLang[lang][\"LANG_AUTO\"]"],
                [5, "6M"],
                [6, "9M"],
                [7, "12M"],
                [8, "18M"],
                [9, "24M"],
                [10, "36M"],
                [11, "48M"],
                [12, "54M"],
                [13, "MCS0"],
                [14, "MCS1"],
                [15, "MCS2"],
                [16, "MCS3"],
                [17, "MCS4"],
                [18, "MCS5"],
                [19, "MCS6"],
                [20, "MCS7"],
                [21, "MCS8"],
                [22, "MCS9"],
                [23, "MCS10"],
                [24, "MCS11"],
                [25, "MCS12"],
                [26, "MCS13"],
                [27, "MCS14"],
                [28, "MCS15"],
                [29, "MCS16"],
                [30, "MCS17"],
                [31, "MCS18"],
                [32, "MCS19"],
                [33, "MCS20"],
                [34, "MCS21"],
                [35, "MCS22"],
                [36, "MCS23"],
                [37, "NSS1-MCS0"],
                [38, "NSS1-MCS1"],
                [39, "NSS1-MCS2"],
                [40, "NSS1-MCS3"],
                [41, "NSS1-MCS4"],
                [42, "NSS1-MCS5"],
                [43, "NSS1-MCS6"],
                [44, "NSS1-MCS7"],
                [45, "NSS1-MCS8"],
                [46, "NSS1-MCS9"],
                [47, "NSS2-MCS0"],
                [48, "NSS2-MCS1"],
                [49, "NSS2-MCS2"],
                [50, "NSS2-MCS3"],
                [51, "NSS2-MCS4"],
                [52, "NSS2-MCS5"],
                [53, "NSS2-MCS6"],
                [54, "NSS2-MCS7"],
                [55, "NSS2-MCS8"],
                [56, "NSS2-MCS9"],
            ]],
            ["switch", "5g_AP1_Broadcast_SSID", "arrLang[lang][\"LANG_CANCEL_BROADCAST\"]", "wl_hide_ssid1"],

            ["switch", "5g_AP1_Block_Relay", "arrLang[lang][\"LANG_BLOCK_RELAY\"]", "wl_access1"],
        ],
        2: [
            ["#5g_AP2_setting_div", 0, 2],
            ["tips", "h6", "class='tips_font'", "AP-2 ,arrLang[lang][\"LANG_CONFIGURATION\"]"],
            ["switch", "5g_AP2_Enable", "arrLang[lang][\"LANG_DISABLE_WLAN_INTERFACE\"]", "wl_disable2"],
            // ["menu", "5g_AP2_Band", "arrLang[lang][\"LANG_BAND\"]", "wl_band2", [
            //     [3, "5 GHz (A)"],
            //     [7, "5 GHz (N)"],
            //     [11, "5 GHz (A+N)"],
            //     [63, "5 GHz (AC)"],
            //     [71, "5 GHz (N+AC)"],
            //     [75, "5 GHz (A+N+AC)"],
            // ]],
            ["menu", "5g_AP2_Band", "arrLang[lang][\"LANG_BAND\"]", "wl_band2", wl_band_init()],
            ["text", "5g_AP2_SSID", "arrLang[lang][\"LANG_SSID\"]", "wl_ssid2", "32"],
            ["menu", "5g_AP2_data_rate", "arrLang[lang][\"LANG_DATA_RATE\"]", "TxRate2", [
                [0, "arrLang[lang][\"LANG_AUTO\"]"],
                [5, "6M"],
                [6, "9M"],
                [7, "12M"],
                [8, "18M"],
                [9, "24M"],
                [10, "36M"],
                [11, "48M"],
                [12, "54M"],
                [13, "MCS0"],
                [14, "MCS1"],
                [15, "MCS2"],
                [16, "MCS3"],
                [17, "MCS4"],
                [18, "MCS5"],
                [19, "MCS6"],
                [20, "MCS7"],
                [21, "MCS8"],
                [22, "MCS9"],
                [23, "MCS10"],
                [24, "MCS11"],
                [25, "MCS12"],
                [26, "MCS13"],
                [27, "MCS14"],
                [28, "MCS15"],
                [29, "MCS16"],
                [30, "MCS17"],
                [31, "MCS18"],
                [32, "MCS19"],
                [33, "MCS20"],
                [34, "MCS21"],
                [35, "MCS22"],
                [36, "MCS23"],
                [37, "NSS1-MCS0"],
                [38, "NSS1-MCS1"],
                [39, "NSS1-MCS2"],
                [40, "NSS1-MCS3"],
                [41, "NSS1-MCS4"],
                [42, "NSS1-MCS5"],
                [43, "NSS1-MCS6"],
                [44, "NSS1-MCS7"],
                [45, "NSS1-MCS8"],
                [46, "NSS1-MCS9"],
                [47, "NSS2-MCS0"],
                [48, "NSS2-MCS1"],
                [49, "NSS2-MCS2"],
                [50, "NSS2-MCS3"],
                [51, "NSS2-MCS4"],
                [52, "NSS2-MCS5"],
                [53, "NSS2-MCS6"],
                [54, "NSS2-MCS7"],
                [55, "NSS2-MCS8"],
                [56, "NSS2-MCS9"],
            ]],
            ["switch", "5g_AP2_Broadcast_SSID", "arrLang[lang][\"LANG_CANCEL_BROADCAST\"]", "wl_hide_ssid2"],

            ["switch", "5g_AP2_Block_Relay", "arrLang[lang][\"LANG_BLOCK_RELAY\"]", "wl_access2"],
        ],
        3: [
            ["#5g_AP3_setting_div", 0, 2],
            ["tips", "h6", "class='tips_font'", "AP-3 ,arrLang[lang][\"LANG_CONFIGURATION\"]"],
            ["switch", "5g_AP3_Enable", "arrLang[lang][\"LANG_DISABLE_WLAN_INTERFACE\"]", "wl_disable3"],
            // ["menu", "5g_AP3_Band", "arrLang[lang][\"LANG_BAND\"]", "wl_band3", [
            //     [3, "5 GHz (A)"],
            //     [7, "5 GHz (N)"],
            //     [11, "5 GHz (A+N)"],
            //     [63, "5 GHz (AC)"],
            //     [71, "5 GHz (N+AC)"],
            //     [75, "5 GHz (A+N+AC)"],
            // ]],
            ["menu", "5g_AP3_Band", "arrLang[lang][\"LANG_BAND\"]", "wl_band3", wl_band_init()],
            ["text", "5g_AP3_SSID", "arrLang[lang][\"LANG_SSID\"]", "wl_ssid3", "32"],
            ["menu", "5g_AP3_data_rate", "arrLang[lang][\"LANG_DATA_RATE\"]", "TxRate3", [
                [0, "arrLang[lang][\"LANG_AUTO\"]"],
                [5, "6M"],
                [6, "9M"],
                [7, "12M"],
                [8, "18M"],
                [9, "24M"],
                [10, "36M"],
                [11, "48M"],
                [12, "54M"],
                [13, "MCS0"],
                [14, "MCS1"],
                [15, "MCS2"],
                [16, "MCS3"],
                [17, "MCS4"],
                [18, "MCS5"],
                [19, "MCS6"],
                [20, "MCS7"],
                [21, "MCS8"],
                [22, "MCS9"],
                [23, "MCS10"],
                [24, "MCS11"],
                [25, "MCS12"],
                [26, "MCS13"],
                [27, "MCS14"],
                [28, "MCS15"],
                [29, "MCS16"],
                [30, "MCS17"],
                [31, "MCS18"],
                [32, "MCS19"],
                [33, "MCS20"],
                [34, "MCS21"],
                [35, "MCS22"],
                [36, "MCS23"],
                [37, "NSS1-MCS0"],
                [38, "NSS1-MCS1"],
                [39, "NSS1-MCS2"],
                [40, "NSS1-MCS3"],
                [41, "NSS1-MCS4"],
                [42, "NSS1-MCS5"],
                [43, "NSS1-MCS6"],
                [44, "NSS1-MCS7"],
                [45, "NSS1-MCS8"],
                [46, "NSS1-MCS9"],
                [47, "NSS2-MCS0"],
                [48, "NSS2-MCS1"],
                [49, "NSS2-MCS2"],
                [50, "NSS2-MCS3"],
                [51, "NSS2-MCS4"],
                [52, "NSS2-MCS5"],
                [53, "NSS2-MCS6"],
                [54, "NSS2-MCS7"],
                [55, "NSS2-MCS8"],
                [56, "NSS2-MCS9"],
            ]],
            ["switch", "5g_AP3_Broadcast_SSID", "arrLang[lang][\"LANG_CANCEL_BROADCAST\"]", "wl_hide_ssid3"],

            ["switch", "5g_AP3_Block_Relay", "arrLang[lang][\"LANG_BLOCK_RELAY\"]", "wl_access3"],
        ],

    }
    Auto_Page_generate(multi_page);
    WLAN_5G_MULTI_PM = Auto_Page_generate(Multi_AP);
    $("#Multi_AP_Submit").hide();
    (function (s) {

        s("#5g_AP_1").on('click', function (e) {
            s("#5g_AP_1").toggleClass("btn-primary");
            s("#5g_AP_1").toggleClass("btn-secondary");
            s("#5g_AP_2,#5g_AP_3").toggleClass("btn-primary", false);
            s("#5g_AP_2,#5g_AP_3").toggleClass("btn-secondary", true);
            if (s("#5g_AP1_setting_div").css("display") == "none") {
                s("#5g_AP2_setting_div").hide();
                s("#5g_AP3_setting_div").hide();
                s("#5g_AP1_setting_div").show();
                s("#Multi_AP_Submit").show();
            } else {
                s("#5g_AP1_setting_div").hide();
                s("#Multi_AP_Submit").hide();
            }
        })

        s("#5g_AP_2").on('click', function (e) {
            s("#5g_AP_2").toggleClass("btn-primary");
            s("#5g_AP_2").toggleClass("btn-secondary");
            s("#5g_AP_1,#5g_AP_3").toggleClass("btn-primary", false);
            s("#5g_AP_1,#5g_AP_3").toggleClass("btn-secondary", true);
            if (s("#5g_AP2_setting_div").css("display") == "none") {
                s("#5g_AP1_setting_div").hide();
                s("#5g_AP3_setting_div").hide();
                s("#5g_AP2_setting_div").show();
                s("#Multi_AP_Submit").show();
            } else {
                s("#5g_AP2_setting_div").hide();
                s("#Multi_AP_Submit").hide();
            }
        })

        s("#5g_AP_3").on('click', function (e) {
            s("#5g_AP_3").toggleClass("btn-primary");
            s("#5g_AP_3").toggleClass("btn-secondary");
            s("#5g_AP_2,#5g_AP_1").toggleClass("btn-primary", false);
            s("#5g_AP_2,#5g_AP_1").toggleClass("btn-secondary", true);
            if (s("#5g_AP3_setting_div").css("display") == "none") {
                s("#5g_AP1_setting_div").hide();
                s("#5g_AP2_setting_div").hide();
                s("#5g_AP3_setting_div").show();
                s("#Multi_AP_Submit").show();
            } else {
                s("#5g_AP3_setting_div").hide();
                s("#Multi_AP_Submit").hide();
            }
        })

        s("#MULTI_AP_PAGE_ROW").on('click', function (e) {
            Rate_dropmenu_init();
        })
    })(jQuery)
    WLAN_MULTI_AP_DATA = {}
    Page_data_obj_init(WLAN_MULTI_AP_DATA, OneForAll("getASPdata/Multi_AP_Page_init_5G", 5, 0, 0, 0));
    set_obj_data_to_html(WLAN_MULTI_AP_DATA);

    function wl_band_init() {
        var obj = {};
        var band_selection = [];
        Page_data_obj_init(obj, OneForAll("getASPdata/band_init_5G", 5, 0, 0, 0));
        //console.log(obj);
        for (var key in obj) {
            band_selection.push([key, obj[key]]);
        }
        return band_selection
    }
}

function ADV_PAGE_INIT() {
    $("#ADV_CONFIG_PAGE_ROW").remove();
    WLAN_ADV_DATA = {}
    var Adv_Config_Page = {
        "length": 1,
        1: [
            ["ADV_CONFIG_PAGE_ROW", "arrLang[lang]['LANG_ADVANCED']", "2"],
            ["form", "5g_Adv_Config_form", "action=\"/boaform/getASPdata/formAdvanceSetup\" method=\"post\"", "1", ADV_CONFIG_after_success],
            ["text", "5g_fragThreshold", "arrLang[lang][\"LANG_FRAGMENT_THRESHOLD\"]", "fragThreshold", "4"],
            ["text", "5g_rtsThreshold", "arrLang[lang][\"LANG_RTS_THRESHOLD\"]", "rtsThreshold", "4"],
            ["text", "5g_beaconInterval", "arrLang[lang][\"LANG_BEACON_INTERVAL\"]", "beaconInterval", "4"],
            ["menu", "5g_Adv_data_rate", "arrLang[lang][\"LANG_DATA_RATE\"]", "txRate", [
                [0, "arrLang[lang][\"LANG_AUTO\"]"],
                [5, "6M"],
                [6, "9M"],
                [7, "12M"],
                [8, "18M"],
                [9, "24M"],
                [10, "36M"],
                [11, "48M"],
                [12, "54M"],
                [13, "MCS0"],
                [14, "MCS1"],
                [15, "MCS2"],
                [16, "MCS3"],
                [17, "MCS4"],
                [18, "MCS5"],
                [19, "MCS6"],
                [20, "MCS7"],
                [21, "MCS8"],
                [22, "MCS9"],
                [23, "MCS10"],
                [24, "MCS11"],
                [25, "MCS12"],
                [26, "MCS13"],
                [27, "MCS14"],
                [28, "MCS15"],
                [29, "MCS16"],
                [30, "MCS17"],
                [31, "MCS18"],
                [32, "MCS19"],
                [33, "MCS20"],
                [34, "MCS21"],
                [35, "MCS22"],
                [36, "MCS23"],
                [37, "NSS1-MCS0"],
                [38, "NSS1-MCS1"],
                [39, "NSS1-MCS2"],
                [40, "NSS1-MCS3"],
                [41, "NSS1-MCS4"],
                [42, "NSS1-MCS5"],
                [43, "NSS1-MCS6"],
                [44, "NSS1-MCS7"],
                [45, "NSS1-MCS8"],
                [46, "NSS1-MCS9"],
                [47, "NSS2-MCS0"],
                [48, "NSS2-MCS1"],
                [49, "NSS2-MCS2"],
                [50, "NSS2-MCS3"],
                [51, "NSS2-MCS4"],
                [52, "NSS2-MCS5"],
                [53, "NSS2-MCS6"],
                [54, "NSS2-MCS7"],
                [55, "NSS2-MCS8"],
                [56, "NSS2-MCS9"],
            ]],
            ["menu", "5g_preamble", "arrLang[lang][\"LANG_PREAMBLE_TYPE\"]", "preamble", [
                ["0", "arrLang[lang][\"LANG_LONG_PREAMBLE\"]"],
                ["1", "arrLang[lang][\"LANG_SHORT_PREAMBLE\"]"],
            ]],
            ["switch", "5g_protection", "arrLang[lang][\"LANG_PROTECTION\"]", "protection"],
            ["switch", "5g_aggregation", "arrLang[lang][\"LANG_AGGREGATION\"]", "aggregation"],
            ["switch", "5g_shortGI0", "arrLang[lang][\"LANG_SHORT_GI\"]", "shortGI0"],
            ["switch", "5g_dot11kEnabled", "arrLang[lang][\"LANG_DOT11K_SUPPORT\"]", "dot11kEnabled"],
            ["switch", "5g_dot11vEnabled", "arrLang[lang][\"LANG_DOT11V_SUPPORT\"]", "dot11vEnabled"],
            ["hidden", "wlan_idx", "1"],
            ["submit", "5g_Adv_Config_submit", check_Adv_Config],
        ]
    }

    Auto_Page_generate(Adv_Config_Page);
    $("#5g_Adv_data_rate_Link").on('click', function (e) {
        Adv_Rate_dropmenu_init();
    })
    Page_data_obj_init(WLAN_ADV_DATA, OneForAll("getASPdata/Wlan_Adv_Data_init_5G", 5, 0, 0, 0));
    set_obj_data_to_html(WLAN_ADV_DATA);
}

function WPS_PAGE_INIT() {
    $("#WPS_PAGE_ROW").remove();
    var WPS_PAGE = {
        "length": 1,
        1: [
            ["WPS_PAGE_ROW", "arrLang[lang]['LANG_WI_FI_PROTECTED_SETUP']", "2"],
            ["append", "\
            <div>\
                <form id=\"5g_disable_WPS_form\" action=\"/boaform/getASPdata/formWsc\"\
                    method=\"POST\" name=\"formWsc\">\
                    <table id=\"5g_disable_WPS_Table\" style=\"line-height: 50px;\">\
                        <tbody>\
                            <tr nowrap=\"\">\
                                <th width=\"200px\">" + arrLang[lang]["LANG_DISABLE_WPS"] + "\
                                </th>\
                            <td width=\"200px\">\
                                    <div>\
                                        <label class=\"switch switch-3d switch-primary\">\
                                            <input type=\"checkbox\" id=\"5g_disable_WPS\"\
                                                class=\"switch-input\">\
                                            <span class=\"switch-label\"></span>\
                                            <span class=\"switch-handle\"></span>\
                                        </label>\
                                    </div>\
                                    <input type=\"hidden\" name=\"disableWPS\">\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                    <input type=\"hidden\" name=\"wlan_idx\" value=\"1\">\
                </form>\
            </div>\
            <div>\
                <form id=\"5g_Start_PBC_form\" action=\"/boaform/getASPdata/formWsc\" method=\"POST\"\
                    name=\"formWsc\">\
                    <table id=\"5g_Local_PIN_Table\" style=\"line-height: 50px;\">\
                        <tbody>\
                            <tr nowrap=\"\">\
                                <th width=\"200px\">" + arrLang[lang]['LANG_SELF_PIN_NUMBER'] + "\
                                </th>\
                                <td width=\"200px\">\
                                    <div style='position:relative;'>\
                                        <div><input type=\"text\" name=\"localPin\" maxlength=\"8\"\
                                            id=\"5g_Local_PIN\" class=\"form-control\">\
                                            <div style=\"position:absolute;right:3%;top:0;line-height:38px\"><i id=\"refresh_local_pin\" class=\"fa fa-retweet\" aria-hidden=\"true\"></i></div></div>\
                                    </div>\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                    <table style=\"line-height: 50px;\">\
                        <tbody>\
                            <tr nowrap=\"\">\
                                <th width=\"200px\">\
                                </th>\
                                <td width=\"200px\">\
                                    <div>\
                                        <button type=\"button\" id=\"5g_Start_PBC_submit\"\
                                            class=\"btn btn-primary btn-block btn-round\"\
                                            >" + arrLang[lang]['LANG_START_PBC'] + "</button>\
                                    </div>\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                    <input type=\"hidden\" name=\"triggerPBC\" value=\"1\">\
                    <input type=\"hidden\" name=\"wlan_idx\" value=\"1\">\
                </form>\
            </div>\
            <br>\
            <div>\
                <form id=\"5g_Start_PIN_form\" action=\"/boaform/getASPdata/formWsc\" method=\"POST\"\
                    name=\"formWsc\">\
                    <table id=\"5g_Client_PIN_Table\" style=\"line-height: 50px;\">\
                        <tbody>\
                            <tr nowrap=\"\">\
                                <th width=\"200px\">" + arrLang[lang]['LANG_CLIENT_PIN_NUMBER'] + "\
                                </th>\
                                <td width=\"200px\">\
                                    <div>\
                                        <input type=\"text\" name=\"peerPin\" maxlength=\"8\"\
                                            id=\"5g_Client_PIN\" class=\"form-control\">\
                                    </div>\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                    <table style=\"line-height: 50px;\">\
                        <tbody>\
                            <tr nowrap=\"\">\
                                <th width=\"200px\">\
                                </th>\
                                <td width=\"200px\">\
                                    <div>\
                                        <button type=\"button\" id=\"5g_Start_PIN_submit\"\
                                            class=\"btn btn-primary btn-block btn-round\"\
                                            >" + arrLang[lang]['LANG_START_PIN'] + "</button>\
                                    </div>\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                    <input type=\"hidden\" name=\"setPIN\" value=\"1\">\
                    <input type=\"hidden\" name=\"wlan_idx\" value=\"1\">\
                </form>\
            </div>"]
        ]
    }
    Auto_Page_generate(WPS_PAGE);
    Page_data_obj_init(WLAN_WPS_DATA, OneForAll("getASPdata/WPS_Page_init_5G", 5, 0, 0, 0));
    set_obj_data_to_html(WLAN_WPS_DATA);
    $("#refresh_local_pin").on("click", function (e) {
        var value = genPinRefresh();
        $("input[name='localPin']").val(value);
    })

    $("#5g_disable_WPS").on("click", function (e) {
        setTimeout(function () {
            $("#waiting_animation").show();
            $.ajaxSettings.async = true;
            $("#5g_disable_WPS_form").submit();
        }, 50);
    })


    $("#5g_Start_PBC_submit").on("click", function (e) {
        if (check_pin_input("#5g_Local_PIN")) {
            $("#waiting_animation").show();
            $.ajaxSettings.async = true;
            $("#5g_Start_PBC_form").submit();
        }
    })


    $("#5g_Start_PIN_submit").on("click", function (e) {
        if (check_pin_input("#5g_Client_PIN")) {
            $("#waiting_animation").show();
            $.ajaxSettings.async = true;
            $("#5g_Start_PIN_form").submit();
        }
    })
    $("#5g_disable_WPS_form").ajaxForm(function (data) {
        FMask_init();
        if (data == "success") {
            $("#waiting_animation").hide();
        } else {
            $("#waiting_animation").hide();
            swal(arrLang[lang]["LANG_ERROR"], arrLang[lang]["LANG_CONFIG"] + arrLang[lang]["LANG_ERROR"], "warning");
            console.log(data);
        }
    })

    $("#5g_Start_PBC_form").ajaxForm(function (data) {
        FMask_init();
        if (data == "startPBC") {
            $("#waiting_animation").hide();
            swal(arrLang[lang]["LANG_START_PBC_MSG"]);
        } else {
            $("#waiting_animation").hide();
            swal(arrLang[lang]["LANG_ERROR"], arrLang[lang]["LANG_CONFIG"] + arrLang[lang]["LANG_ERROR"], "warning");
            console.log(data);
        }
    })

    $("#5g_Start_PIN_form").ajaxForm(function (data) {
        FMask_init();
        if (data == "StartPIN") {
            $("#waiting_animation").hide();
            swal(arrLang[lang]["LANG_START_PIN_MSG"]);
        } else {
            $("#waiting_animation").hide();
            swal(arrLang[lang]["LANG_ERROR"], arrLang[lang]["LANG_CONFIG"] + arrLang[lang]["LANG_ERROR"], "warning");
            console.log(data);
        }
    })
}

function Easy_Mesh_INIT() {
    $("#EM_Config_row").remove();
    WLAN_ESM_DATA = {};
    Page_data_obj_init(WLAN_ESM_DATA, OneForAll("getASPdata/get_ESM_Page_data", 5, 0, 0, 0));
    var Easy_Mesh_Config = {
        "length": 1,
        1: [
            ["EM_Config_row", "Easy Mesh ,arrLang[lang]['LANG_CONFIG']", "2"],
            ["form", "EM_Config_form", "action=\"/boaform/getASPdata/formMultiAP\" method=\"POST\"", "1", basic_config_success_refresh],
            ["text", "EM_Device_name", "arrLang[lang]['LANG_DEVICE_NAME']", "device_name_text"],
            ["switch", "control_mode_switch", "arrLang[lang]['LANG_CONTROLLER'], ,arrLang[lang]['LANG_MODE'], ,arrLang[lang]['LANG_ENABLE']", "role"],
            ["hidden", "needEnable11kv", ""],
            ["hidden", "accept_vert_ssid_control", "0"],
            ["submit", "EM_Config_submit", EM_PAGE_CHECK]
        ]
    }
    var EM_PAGE_PM = Auto_Page_generate(Easy_Mesh_Config);
    set_obj_data_to_html(WLAN_ESM_DATA);
    function EM_PAGE_CHECK() {
        if (EM_PAGE_PM.device_name_text.val() == "") {
            swal_check_warning("input[name='device_name_text']", arrLang[lang]['LANG_WLAN_EASY_MESH_DEVICE_NAME_CANNOT_BE_EMPTY']);
            return false;
        } else {
            if (illegal_char_check(EM_PAGE_PM.device_name_text.val())) {
                swal_check_warning("input[name='device_name_text']", arrLang[lang]['LANG_ILLEGAL_CHARACTER']);
                return false;
            }
        }
        var dot11kvDisabled = !parseInt(WLAN_ADV_DATA.dot11kEnabled);
        if (dot11kvDisabled && EM_PAGE_PM.role.val() == "1" && EM_PAGE_PM.needEnable11kv.val() != "1") {
            swal({
                title: arrLang[lang]["LANG_WLAN_EASY_MESH_11KV_ENABLE_WARNING_MESSAGE"],
                icon: "warning",
                buttons: true,
            })
                .then((Continue0) => {
                    if (Continue0) {
                        EM_PAGE_PM.needEnable11kv.val("1");
                        $("#EM_Config_submit").click();
                    } else {
                        return false;
                    }
                });
            return false;
        }
        var Vert_5G_SSID1_disabled = parseInt(WLAN_MULTI_AP_DATA.wl_disable1);
        if (!Vert_5G_SSID1_disabled && EM_PAGE_PM.role.val() == "1" && EM_PAGE_PM.accept_vert_ssid_control.val() == "0") {
            swal({
                title: arrLang[lang]["LANG_WLAN_EASY_MESH_ALERT_VAP1_AUTO_MANAGED_MESSAGE"],
                icon: "warning",
                buttons: true,
            })
                .then((Continue1) => {
                    if (Continue1) {
                        EM_PAGE_PM.accept_vert_ssid_control.val("1");
                        $("#EM_Config_submit").click();
                    }
                });
            return false;
        }
        return true;
    }
}


function ADV_CONFIG_after_success() {
    WLAN_ADV_DATA = {}
    Page_data_obj_init(WLAN_ADV_DATA, OneForAll("getASPdata/Wlan_Adv_Data_init_5G", 5, 0, 0, 0));
    set_obj_data_to_html(WLAN_ADV_DATA);
}


function genPinRefresh() {
    var num_str = "1";
    var rand_no;
    var num;
    while (num_str.length != 7) {
        rand_no = Math.random() * 1000000000;
        num = parseInt(rand_no, 10);
        num = num % 10000000;
        num_str = num.toString();
    }
    num = num * 10 + compute_pin_checksum(num);
    num = parseInt(num, 10);
    return num;
}

function compute_pin_checksum(val) {
    var accum = 0;
    var code = parseInt(val) * 10;
    accum += 3 * (parseInt(code / 10000000) % 10);
    accum += 1 * (parseInt(code / 1000000) % 10);
    accum += 3 * (parseInt(code / 100000) % 10);
    accum += 1 * (parseInt(code / 10000) % 10);
    accum += 3 * (parseInt(code / 1000) % 10);
    accum += 1 * (parseInt(code / 100) % 10);
    accum += 3 * (parseInt(code / 10) % 10);
    accum += 1 * (parseInt(code / 1) % 10);
    var digit = (parseInt(accum) % 10);
    return ((10 - digit) % 10);
}



function Adv_Rate_dropmenu_init() {
    var temp = $("#B_band_Link").text();
    var key_w = temp.substring(temp.indexOf("(") + 1, temp.indexOf(")"));
    var tar;
    if (key_w == "")
        return;
    if (key_w.length <= 2) {
        tar = eval("Rate_" + key_w);
    } else if (key_w.length == 3) {
        tar = Rate_A.concat(Rate_N);
    } else if (key_w.length == 4) {
        tar = Rate_N.concat(Rate_AC);
    } else {
        tar = Rate_A.concat(Rate_N).concat(Rate_AC);
    }
    $(".5g_Adv_data_rate").each(function (e) {
        if ($(this).attr("value") != "0") {
            for (var i in tar) {
                if ($(this).attr("value") == tar[i]) {
                    $(this).show();
                    break;
                } else
                    $(this).hide();
            }
        }
    })
}

var Rate_A = ["5", "6", "7", "8", "9", "10", "11", "12"];
var Rate_N = ["13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"];
var Rate_AC = ["29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56"];

function Rate_dropmenu_init() {
    var AP1_mode = $("#5g_AP1_Band_Link").text();
    var AP2_mode = $("#5g_AP2_Band_Link").text();
    var AP3_mode = $("#5g_AP3_Band_Link").text();
    var mode = [AP1_mode, AP2_mode, AP3_mode];
    for (var i in mode) {
        var temp = mode[i];
        var key_w = temp.substring(temp.indexOf("(") + 1, temp.indexOf(")"));
        var index = parseInt(i) + 1;
        var select = "." + "5g_AP" + index + "_data_rate";
        var tar;
        if (key_w == "")
            break;
        if (key_w.length <= 2) {
            tar = eval("Rate_" + key_w);
        } else if (key_w.length == 3) {
            tar = Rate_A.concat(Rate_N);
        } else if (key_w.length == 4) {
            tar = Rate_N.concat(Rate_AC);
        } else {
            tar = Rate_A.concat(Rate_N).concat(Rate_AC);
        }
        $(select).each(function (e) {
            if ($(this).attr("value") != "0") {
                for (var i in tar) {
                    if ($(this).attr("value") == tar[i]) {
                        $(this).show();
                        break;
                    } else
                        $(this).hide();
                }
            }
        })
    }
}



function ssid_name_select_init() {
    var menu = [];
    for (var key in WLAN_SECURITY_DATA) {
        menu.push([WLAN_SECURITY_DATA[key].index, key]);
    }
    return menu;
}



function Cipher_suite_init(mode) {
    var selection = "";
    if (mode == 0)
        selection += "<div class='row Cipher_suite WPA_mode' style=\"text-align:center;white-space: nowrap;\">";
    if (mode == 1)
        selection += "<div class='row Cipher_suite WPA2_mode' style=\"text-align:center;white-space: nowrap;\">";
    if (mode == 2)
        selection += "<div class='row Cipher_suite WPA3_mode' style=\"text-align:center;white-space: nowrap;\">";
    if (mode == 0) {
        var option = {
            "ciphersuite_t": "TKIP",
            "ciphersuite_a": "AES",
        }
    } else if (mode == 1) {
        var option = {
            "wpa2ciphersuite_t": "TKIP",
            "wpa2ciphersuite_a": "AES",
        }
    } else if (mode == 2) {
        var option = {
            "wpa3ciphersuite_a": "AES",
        }
    }
    for (var key in option) {
        selection += "<div class=\"justhover\" style=\"line-height:30px;width:48%;\" value=\"" + key + "\">" + option[key] + "</div>";
    }
    selection += "</div>";
    return selection;
}

function Cipher_suite_Click_init() {
    (function (s) {
        $(".Cipher_suite").find(".justhover").off("click");
        $(".Cipher_suite").find(".justhover").on("click", function (e) {
            $(this).toggleClass("td_select");
            if ($(this).hasClass("td_select")) {
                $("input[name='" + $(this).attr("value") + "']").val("1");
            } else {
                $("input[name='" + $(this).attr("value") + "']").val("0");
            }
        })
    })(jQuery)
    WLAN_5G_SEC_PM["ciphersuite_t"] = {
        val: function (value) {
            if (value == "1") {
                $(".WPA_mode").find(".justhover").eq(0).addClass("td_select");
                $("input[name='ciphersuite_t']").val("1");
            } else if (value == "0") {
                $(".WPA_mode").find(".justhover").eq(0).removeClass("td_select");
                $("input[name='ciphersuite_t']").val("0");
            }
            return $("input[name='ciphersuite_t']").val();
        },
        disabled: function (s) {
            if (s == true) {
                $(".WPA_mode").find(".justhover").eq(0).removeClass("td_select");
                $(".WPA_mode").find(".justhover").eq(0).addClass("disabled");
                $("input[name='ciphersuite_t']").prop("disabled", true);
                $("input[name='ciphersuite_t']").val("0");
            } else if (s == false) {
                $(".WPA_mode").find(".justhover").eq(0).removeClass("disabled");
                $("input[name='ciphersuite_t']").prop("disabled", false);
            }
        }
    }
    WLAN_5G_SEC_PM["wpa2ciphersuite_t"] = {
        val: function (value) {
            if (value == "1") {
                $(".WPA2_mode").find(".justhover").eq(0).addClass("td_select");
                $("input[name='wpa2ciphersuite_t']").val("1");
            } else if (value == "0") {
                $(".WPA2_mode").find(".justhover").eq(0).removeClass("td_select");
                $("input[name='wpa2ciphersuite_t']").val("0");
            }
            return $("input[name='wpa2ciphersuite_t']").val();
        },
        disabled: function (s) {
            if (s == true) {
                $(".WPA2_mode").find(".justhover").eq(0).removeClass("td_select");
                $(".WPA2_mode").find(".justhover").eq(0).addClass("disabled");
                $("input[name='wpa2ciphersuite_t']").prop("disabled", true);
                $("input[name='wpa2ciphersuite_t']").val("0");
            } else if (s == false) {
                $(".WPA2_mode").find(".justhover").eq(0).removeClass("disabled");
                $("input[name='wpa2ciphersuite_t']").prop("disabled", false);
            }
        }
    }
    WLAN_5G_SEC_PM["ciphersuite_a"] = {
        val: function (value) {
            if (value == "1") {
                $(".WPA_mode").find(".justhover").eq(1).addClass("td_select");
                $("input[name='ciphersuite_a']").val("1");
            } else if (value == "0") {
                $(".WPA_mode").find(".justhover").eq(1).removeClass("td_select");
                $("input[name='ciphersuite_a']").val("0");
            }
            return $("input[name='ciphersuite_a']").val();
        },
        disabled: function (s) {
            if (s == true) {
                $(".WPA_mode").find(".justhover").eq(1).removeClass("td_select");
                $(".WPA_mode").find(".justhover").eq(1).addClass("disabled");
                $("input[name='ciphersuite_a']").prop("disabled", true);
                $("input[name='ciphersuite_a']").val("0");
            } else if (s == false) {
                $(".WPA_mode").find(".justhover").eq(1).removeClass("disabled");
                $("input[name='ciphersuite_a']").prop("disabled", false);
            }
        }
    }
    WLAN_5G_SEC_PM["wpa2ciphersuite_a"] = {
        val: function (value) {
            if (value == "1") {
                $(".WPA2_mode").find(".justhover").eq(1).addClass("td_select");
                $("input[name='wpa2ciphersuite_a']").val("1");
            } else if (value == "0") {
                $(".WPA2_mode").find(".justhover").eq(1).removeClass("td_select");
                $("input[name='wpa2ciphersuite_a']").val("0");
            }
            return $("input[name='wpa2ciphersuite_a']").val();
        },
        disabled: function (s) {
            if (s == true) {
                $(".WPA2_mode").find(".justhover").eq(1).removeClass("td_select");
                $(".WPA2_mode").find(".justhover").eq(1).addClass("disabled");
                $("input[name='wpa2ciphersuite_a']").prop("disabled", true);
                $("input[name='wpa2ciphersuite_a']").val("0");
            } else if (s == false) {
                $(".WPA2_mode").find(".justhover").eq(1).removeClass("disabled");
                $("input[name='wpa2ciphersuite_a']").prop("disabled", false);
            }
        }
    }
    WLAN_5G_SEC_PM["wpa3ciphersuite_a"] = {
        val: function (value) {
            if (value == "1") {
                $(".WPA3_mode").eq(1).find(".justhover").eq(0).addClass("td_select");
                $("input[name='wpa3ciphersuite_a']").val("1");
            } else if (value == "0") {
                $(".WPA3_mode").find(".justhover").eq(0).removeClass("td_select");
                $("input[name='wpa3ciphersuite_a']").val("0");
            }
            return $("input[name='wpa3ciphersuite_a']").val();
        },
        disabled: function (s) {
            if (s == true) {
                $(".WPA3_mode").find(".justhover").eq(0).removeClass("td_select");
                $(".WPA3_mode").find(".justhover").eq(0).addClass("disabled");
                $("input[name='wpa3ciphersuite_a']").prop("disabled", true);
                $("input[name='wpa3ciphersuite_a']").val("0");
            } else if (s == false) {
                $(".WPA3_mode").find(".justhover").eq(0).removeClass("disabled");
                $("input[name='wpa3ciphersuite_a']").prop("disabled", false);
            }
        }
    }
}


function CHECK_5G_BASIC() {
    if (WLAN_5G_PM.ssid.val().length == 0) {
        swal_check_warning("input[name='ssid']", arrLang[lang]["LANG_SSID_CANNOT_BE_EMPTY"]);
        return false;
    }
    if (WLAN_5G_PM.ssid.val().indexOf("/") != -1 || WLAN_5G_PM.ssid.val().indexOf("<") != -1 || WLAN_5G_PM.ssid.val().indexOf(">") != -1 || WLAN_5G_PM.ssid.val().indexOf("=") != -1) {
        swal_check_warning("input[name='ssid']", arrLang[lang]['LANG_ILLEGAL_CHARACTER'])
        return false;
    }
    if (WLAN_5G_PM.wlanDisabled.val() != "1") {
        var band = parseInt(WLAN_5G_PM.band.val(), 10) + 1;
        var basicRate = 0;
        var operRate = 0;
        var WiFiTest = WLAN_5G_PM.WiFiTest.val();
        if (band & 1) {
            basicRate |= 0xf;
            operRate |= 0xf;
        }
        if ((band & 2) || (band & 4)) {
            operRate |= 0xff0;
            if (!(band & 1)) {
                if (WiFiTest)
                    basicRate = 0x15f;
                else
                    basicRate = 0x1f0;
            }
        }
        if (band & 8) {
            // if (!(band & 3))
            //     operRate |= 0xfff;
            if (band & 1)
                basicRate = 0xf;
            else if (band & 2)
                basicRate = 0x1f0;
            // else
            //     basicRate = 0xf;
        }
        operRate |= basicRate;
        WLAN_5G_PM.basicrates.val(basicRate);
        WLAN_5G_PM.operrates.val(operRate);
    }
    return true;
}

function CHECK_5G_SEC() {
    if (WLAN_5G_SEC_PM.use1x.val() == "0" && WLAN_5G_SEC_PM.security_method.val() == "1") {
        if (WLAN_5G_SEC_PM.key0.val().length != $("input[name='key0']").prop("maxlength")) {
            swal_check_warning("input[name='key0']", arrLang[lang]['LANG_INVALID_LENGTH_OF_KEY_VALUE']);
            return false;
        }
    }
    if ((WLAN_5G_SEC_PM.use1x.val() == "1" && (WLAN_5G_SEC_PM.security_method.val() == "0" || WLAN_5G_SEC_PM.security_method.val() == "1")) || (WLAN_5G_SEC_PM.wpaAuth.val() == "1" && (WLAN_5G_SEC_PM.security_method.val() != "0" && WLAN_5G_SEC_PM.security_method.val() != "1"))) {
        if (!checkHostIP($("input[name='radiusIP']"), 1)) {
            return false;
        }
        if (!checkDigit(WLAN_5G_SEC_PM.radiusPort.val())) {
            swal_check_warning("input[name='radiusPort']", arrLang[lang]["LANG_ILLEGAL_CHARACTER"]);
            return false;
        }
        if (!sji_checkdigitrange(WLAN_5G_SEC_PM.radiusPort.val(), 0, 65535)) {
            swal_check_warning("input[name='radiusPort']", arrLang[lang]['LANG_PORT_RANGE_CANNOT_BE_EMPTY_YOU_SHOULD_SET_A_VALUE_BETWEEN_1_65535']);
            return false;
        }
    }
    if ((WLAN_5G_SEC_PM.security_method.val() != "0" && WLAN_5G_SEC_PM.security_method.val() != "1" && WLAN_5G_SEC_PM.wpaAuth.val() == "2")) {
        if (WLAN_5G_SEC_PM.pskFormat.val() == "0") {
            if (WLAN_5G_SEC_PM.pskValue.val().length < 8) {
                swal_check_warning("input[name='pskValue']", arrLang[lang]['LANG_PRE_SHARED_KEY_VALUE_SHOULD_BE_SET_AT_LEAST_8_CHARACTERS']);
                return false;
            }
        }
        if (WLAN_5G_SEC_PM.pskFormat.val() == "1") {
            if (WLAN_5G_SEC_PM.pskValue.val().length != "64") {
                swal_check_warning("input[name='pskValue']", arrLang[lang]['LANG_PRE_SHARED_KEY_VALUE_SHOULD_BE_64_CHARACTERS']);
                return false;
            }
        }
    }
    if (WLAN_5G_SEC_PM.security_method.val() == "6") {
        if (WLAN_5G_SEC_PM.ciphersuite_a.val() != "1" && WLAN_5G_SEC_PM.ciphersuite_t.val() != "1") {
            swal_check_warning(".WPA_mode", arrLang[lang]['LANG_WPA_CIPHER_SUITE_CAN_NOT_BE_EMPTY']);
            return false;
        }
        if (WLAN_5G_SEC_PM.wpa2ciphersuite_a.val() != "1" && WLAN_5G_SEC_PM.wpa2ciphersuite_t.val() != "1") {
            swal_check_warning(".WPA2_mode", arrLang[lang]['LANG_WPA2_CIPHER_SUITE_CAN_NOT_BE_EMPTY']);
            return false;
        }
    }

    if (WLAN_5G_SEC_PM.security_method.val() == "16" || WLAN_5G_SEC_PM.security_method.val() == "20") {
        if (WLAN_5G_SEC_PM.wpa2ciphersuite_a.val() != "1") {
            swal_check_warning(".WPA3_mode", arrLang[lang]['LANG_WPA3_CIPHER_SUITE_CAN_NOT_BE_EMPTY']);
            return false;
        }
    }
    return true;
}

function check_Multi_SSID_setting() {
    if (WLAN_5G_MULTI_PM.wl_disable1.val() == "0") {
        if ($("#5g_AP1_SSID").val().length == 0) {
            swal_check_warning("#5g_AP1_SSID", arrLang[lang]["LANG_SSID_CANNOT_BE_EMPTY"]);
            if ($("#5g_AP1_setting_div").css("display") == "none")
                $("#5g_AP_1").click();
            return false;
        }
        if ($("#5g_AP1_SSID").val().indexOf("/") != -1 || $("#5g_AP1_SSID").val().indexOf("<") != -1 || $("#5g_AP1_SSID").val().indexOf(">") != -1 || $("#5g_AP1_SSID").val().indexOf("=") != -1) {
            swal_check_warning("#5g_AP1_SSID", "SSID " + arrLang[lang]['LANG_ILLEGAL_CHARACTER']);
            if ($("#5g_AP1_setting_div").css("display") == "none")
                $("#5g_AP_1").click();
            return false;
        }
    }
    if (WLAN_5G_MULTI_PM.wl_disable2.val() == "0") {
        if ($("#5g_AP2_SSID").val().length == 0) {
            swal_check_warning("#5g_AP2_SSID", arrLang[lang]["LANG_SSID_CANNOT_BE_EMPTY"]);
            if ($("#5g_AP2_setting_div").css("display") == "none")
                $("#5g_AP_2").click();
            return false;
        }
        if ($("#5g_AP2_SSID").val().indexOf("/") != -1 || $("#5g_AP2_SSID").val().indexOf("<") != -1 || $("#5g_AP2_SSID").val().indexOf(">") != -1 || $("#5g_AP2_SSID").val().indexOf("=") != -1) {
            swal_check_warning("#5g_AP2_SSID", "SSID " + arrLang[lang]['LANG_ILLEGAL_CHARACTER']);
            if ($("#5g_AP2_setting_div").css("display") == "none")
                $("#5g_AP_2").click();
            return false;
        }
    }
    if (WLAN_5G_MULTI_PM.wl_disable3.val() == "0") {
        if ($("#5g_AP3_SSID").val().length == 0) {
            swal_check_warning("#5g_AP3_SSID", arrLang[lang]["LANG_SSID_CANNOT_BE_EMPTY"]);
            if ($("#5g_AP3_setting_div").css("display") == "none")
                $("#5g_AP_3").click();
            return false;
        }
        if ($("#5g_AP3_SSID").val().indexOf("/") != -1 || $("#5g_AP3_SSID").val().indexOf("<") != -1 || $("#5g_AP3_SSID").val().indexOf(">") != -1 || $("#5g_AP3_SSID").val().indexOf("=") != -1) {
            swal_check_warning("#5g_AP3_SSID", "SSID " + arrLang[lang]['LANG_ILLEGAL_CHARACTER']);
            if ($("#5g_AP3_setting_div").css("display") == "none")
                $("#5g_AP_3").click();
            return false;
        }
    }
    return true;
}

function check_Adv_Config() {
    if (checkDigit($("#5g_fragThreshold").val()) == 0) {
        swal_check_warning("#5g_fragThreshold", arrLang[lang]["LANG_INVALID_VALUE_IT_SHOULD_BE_IN_DECIMAL_NUMBER_0_9"]);
        return false;
    }
    num = parseInt($("#5g_fragThreshold").val());
    if ($("#5g_fragThreshold").val() == "" || num < 256 || num > 2346) {
        swal_check_warning("#5g_fragThreshold", arrLang[lang]["LANG_INVALID_VALUE_OF_FRAGMENT_THRESHOLD_INPUT_VALUE_SHOULD_BE_BETWEEN_256_2346_IN_DECIMAL"]);
        return false;
    }
    if (checkDigit($("#5g_rtsThreshold").val()) == 0) {
        swal_check_warning("#5g_rtsThreshold", arrLang[lang]["LANG_INVALID_VALUE_IT_SHOULD_BE_IN_DECIMAL_NUMBER_0_9"]);
        return false;
    }
    num = parseInt($("#5g_rtsThreshold").val());
    if ($("#5g_rtsThreshold").val() == "" || num > 2347) {
        swal_check_warning("#5g_rtsThreshold", arrLang[lang]["LANG_INVALID_VALUE_OF_RTS_THRESHOLD_INPUT_VALUE_SHOULD_BE_BETWEEN_0_2347_IN_DECIMAL"]);
        return false;
    }
    if (checkDigit($("#5g_beaconInterval").val()) == 0) {
        swal_check_warning("#5g_beaconInterval", arrLang[lang]["LANG_INVALID_VALUE_IT_SHOULD_BE_IN_DECIMAL_NUMBER_0_9"]);
        return false;
    }
    num = parseInt($("#5g_beaconInterval").val());
    if ($("#5g_beaconInterval").val() == "" || num < 20 || num > 1024) {
        swal_check_warning("#5g_beaconInterval", arrLang[lang]["LANG_INVALID_VALUE_OF_BEACON_INTERVAL_INPUT_VALUE_SHOULD_BE_BETWEEN_20_1024_IN_DECIMAL"])
        return false;
    }
    return true;
}


function check_pin_input(tar) {
    var pin = $(tar).val();
    ret = check_pin_code(pin);
    if (ret == 1) {
        swal_check_warning(tar, arrLang[lang]["LANG_INVALID_PIN_LENGTH_THE_DEVICE_PIN_IS_USUALLY_FOUR_OR_EIGHT_DIGITS_LONG"]);
        return false;
    } else if (ret == 2) {
        swal_check_warning(tar, arrLang[lang]["LANG_INVALID_PIN_THE_DEVICE_PIN_MUST_BE_NUMERIC_DIGITS"]);
        return false;
    } else if (ret == 3) {
        swal_check_warning(tar, arrLang[lang]["LANG_INVALID_PIN_CHECKSUM_ERRO"]);
        return false;
    }
    return true;
}

function check_pin_code(str) {
    var i;
    var code_len;
    code_len = str.length;
    if (code_len != 8 && code_len != 4)
        return 1;
    for (i = 0; i < code_len; i++) {
        if ((str.charAt(i) < '0') || (str.charAt(i) > '9'))
            return 2;
    }
    if (code_len == 8) {
        var code = parseInt(str, 10);
        if (!validate_pin_code(code))
            return 3;
        else
            return 0;
    } else
        return 0;
}

function validate_pin_code(code) {
    var accum = 0;
    accum += 3 * (parseInt(code / 10000000) % 10);
    accum += 1 * (parseInt(code / 1000000) % 10);
    accum += 3 * (parseInt(code / 100000) % 10);
    accum += 1 * (parseInt(code / 10000) % 10);
    accum += 3 * (parseInt(code / 1000) % 10);
    accum += 1 * (parseInt(code / 100) % 10);
    accum += 3 * (parseInt(code / 10) % 10);
    accum += 1 * (parseInt(code / 1) % 10);
    return (0 == (accum % 10));
}



function basic_config_success_refresh() {
    BS_PAGE_INIT();
    SEC_PAGE_INIT();
    MULTI_AP_PAGE_INIT();
    ADV_PAGE_INIT();
    WPS_PAGE_INIT();
    Easy_Mesh_INIT();  //hyj for newweb 211021 CONFIG_USER_RTK_MULTI_AP is not set;
    Cipher_suite_Click_init();
    Global_Click_Monitoring();
    $(".B_wpaSSID").eq(0).click();
    $("#5G_WLAN_BASIC_CONFIG_ROW").click();
    $("#MULTI_AP_PAGE_ROW").click();
    $("#ADV_CONFIG_PAGE_ROW").click();
    $("#WPS_PAGE_ROW").click();
    FMask_init();
}

function Global_Click_Monitoring() {
    (function (s) {
        s("#5G_SECURITY_CONFIG_ROW").on("click", function (e) {
            for (var key in WLAN_5G_SEC_PM) {
                if (WLAN_5G_SEC_PM[key].body)
                    WLAN_5G_SEC_PM[key].body(0);
            }
            $(".WPA_mode").hide();
            $(".WPA2_mode").hide();
            $(".WPA3_mode").hide();
            WLAN_5G_SEC_PM.wpaSSID.body(1);
            WLAN_5G_SEC_PM.security_method.body(1);

            if (WLAN_5G_SEC_PM.security_method.val() == "0") {
                WLAN_5G_SEC_PM.use1x.body(1);
                if (WLAN_5G_SEC_PM.use1x.val() == "1") {
                    WLAN_5G_SEC_PM.radiusIP.body(1);
                    WLAN_5G_SEC_PM.radiusPort.body(1);
                    WLAN_5G_SEC_PM.radiusPass.body(1);
                } else {
                    WLAN_5G_SEC_PM.radiusIP.body(0);
                    WLAN_5G_SEC_PM.radiusPort.body(0);
                    WLAN_5G_SEC_PM.radiusPass.body(0);
                }
            }

            else if (WLAN_5G_SEC_PM.security_method.val() == "1") {
                WLAN_5G_SEC_PM.use1x.body(1);
                WLAN_5G_SEC_PM.auth_type.body(1);
                WLAN_5G_SEC_PM.length0.body(1);
                WLAN_5G_SEC_PM.format0.body(1);
                WLAN_5G_SEC_PM.key0.body(1);
                if (WLAN_5G_SEC_PM.use1x.val() == "1") {
                    WLAN_5G_SEC_PM.auth_type.body(0, true);
                    WLAN_5G_SEC_PM.wepKeyLen.body(1);
                    WLAN_5G_SEC_PM.radiusIP.body(1);
                    WLAN_5G_SEC_PM.radiusPort.body(1);
                    WLAN_5G_SEC_PM.radiusPass.body(1);
                    WLAN_5G_SEC_PM.length0.body(0);
                    WLAN_5G_SEC_PM.format0.body(0);
                    WLAN_5G_SEC_PM.key0.body(0);
                    return;
                }
                if (WLAN_5G_SEC_PM.length0.val() == "1") {
                    WLAN_5G_SEC_PM.format0.op(0).text("ASCII (5 characters)");
                    WLAN_5G_SEC_PM.format0.op(1).text("Hex (10 characters)");
                    if (WLAN_5G_SEC_PM.format0.val() == "1")
                        $("input[name='key0']").prop("maxlength", "5");
                    else
                        $("input[name='key0']").prop("maxlength", "10");
                    WLAN_5G_SEC_PM.format0.val(WLAN_5G_SEC_PM.format0.val());
                } else if (WLAN_5G_SEC_PM.length0.val() == "2") {
                    WLAN_5G_SEC_PM.format0.op(0).text("ASCII (13 characters)");
                    WLAN_5G_SEC_PM.format0.op(1).text("Hex (26 characters)");
                    if (WLAN_5G_SEC_PM.format0.val() == "1")
                        $("input[name='key0']").prop("maxlength", "13");
                    else
                        $("input[name='key0']").prop("maxlength", "26");
                    WLAN_5G_SEC_PM.format0.val(WLAN_5G_SEC_PM.format0.val());
                } else {
                    WLAN_5G_SEC_PM.length0.val("1");
                    WLAN_5G_SEC_PM.format0.val("1");
                }
            }

            else if (WLAN_5G_SEC_PM.security_method.val() == "2") {
                WLAN_5G_SEC_PM.wpaAuth.body(1);
                $(".WPA_mode").show();
                WLAN_5G_SEC_PM.ciphersuite_a.disabled(true);
                WLAN_5G_SEC_PM.ciphersuite_a.val("0");
                WLAN_5G_SEC_PM.ciphersuite_t.val("1");
                if (WLAN_5G_SEC_PM.wpaAuth.val() == "1") {
                    WLAN_5G_SEC_PM.radiusIP.body(1);
                    WLAN_5G_SEC_PM.radiusPort.body(1);
                    WLAN_5G_SEC_PM.radiusPass.body(1);
                } else if (WLAN_5G_SEC_PM.wpaAuth.val() == "2") {
                    WLAN_5G_SEC_PM.pskFormat.body(1);
                    WLAN_5G_SEC_PM.pskValue.body(1);
                }
            }

            else if (WLAN_5G_SEC_PM.security_method.val() == "4") {
                WLAN_5G_SEC_PM.wpaAuth.body(1);
                $(".WPA2_mode").show();
                WLAN_5G_SEC_PM.wpa2ciphersuite_t.disabled(true);
                WLAN_5G_SEC_PM.wpa2ciphersuite_t.val("0");
                WLAN_5G_SEC_PM.wpa2ciphersuite_a.val("1");
                if (WLAN_5G_SEC_PM.wpaAuth.val() == "1") {
                    WLAN_5G_SEC_PM.radiusIP.body(1);
                    WLAN_5G_SEC_PM.radiusPort.body(1);
                    WLAN_5G_SEC_PM.radiusPass.body(1);
                } else if (WLAN_5G_SEC_PM.wpaAuth.val() == "2") {
                    WLAN_5G_SEC_PM.pskFormat.body(1);
                    WLAN_5G_SEC_PM.pskValue.body(1);
                }
            }

            else if (WLAN_5G_SEC_PM.security_method.val() == "6") {
                WLAN_5G_SEC_PM.wpaAuth.body(1);
                $(".WPA_mode").show();
                $(".WPA2_mode").show();
                WLAN_5G_SEC_PM.wpa2ciphersuite_t.disabled(false);
                WLAN_5G_SEC_PM.ciphersuite_t.disabled(false);
                if (WLAN_5G_SEC_PM.wpaAuth.val() == "1") {
                    WLAN_5G_SEC_PM.radiusIP.body(1);
                    WLAN_5G_SEC_PM.radiusPort.body(1);
                    WLAN_5G_SEC_PM.radiusPass.body(1);
                } else if (WLAN_5G_SEC_PM.wpaAuth.val() == "2") {
                    WLAN_5G_SEC_PM.pskFormat.body(1);
                    WLAN_5G_SEC_PM.pskValue.body(1);
                }
            }

            else if (WLAN_5G_SEC_PM.security_method.val() == "16" || WLAN_5G_SEC_PM.security_method.val() == "20") {
                WLAN_5G_SEC_PM.wpaAuth.body(0);
                $(".WPA3_mode").show();
                WLAN_5G_SEC_PM.wpa3ciphersuite_a.val("1");
                WLAN_5G_SEC_PM.wpaAuth.val("2");
                WLAN_5G_SEC_PM.pskFormat.body(0);
                WLAN_5G_SEC_PM.pskFormat.val("0");
                WLAN_5G_SEC_PM.pskValue.body(1);
            }
        })


        WLAN_5G_PM.band.op("all").on("click", function (e) {
            var value = $(this).attr("value");
            if (value == "75" || value == "71" || value == "63" ||
                value == "127" || value == "191" || value == "199" || value == "203") {
                WLAN_5G_PM.chanwid.val("2");
            } else if (value == "11" || value == "7") {
                WLAN_5G_PM.chanwid.val("1");
            } else {
                WLAN_5G_PM.chanwid.val("0");
            }
        })
        WLAN_5G_PM.chanwid.op("all").on("click", function (e) {
            WLAN_5G_PM.chan.val("20");
        })
        WLAN_5G_PM.regdomain_demo.op("all").on("click", function (e) {
            WLAN_5G_PM.chan.val("20");
        })

        s("#5G_WLAN_BASIC_CONFIG_ROW").on("click", function (e) {

            if (WLAN_5G_PM.wlanDisabled.val() == "1") {
                for (var key in WLAN_5G_PM) {
                    if (key != "wlanDisabled") {
                        if (WLAN_5G_PM[key].body)
                            WLAN_5G_PM[key].body(0);
                    }
                }
                $("#5G_SECURITY_CONFIG_ROW").hide();
                $("#MULTI_AP_PAGE_ROW").hide();
                $("#ADV_CONFIG_PAGE_ROW").hide();
                $("#WPS_PAGE_ROW").hide();
                return;
            } else {
                for (var key in WLAN_5G_PM) {
                    if (WLAN_5G_PM[key].body)
                        WLAN_5G_PM[key].body(1);
                }
                $("#5G_SECURITY_CONFIG_ROW").show();
                $("#MULTI_AP_PAGE_ROW").show();
                $("#ADV_CONFIG_PAGE_ROW").show();
                $("#WPS_PAGE_ROW").show();
            }

            if ((WLAN_5G_PM.band.val() == "75" || WLAN_5G_PM.band.val() == "71" || WLAN_5G_PM.band.val() == "63"
                || WLAN_5G_PM.band.val() == "127" || WLAN_5G_PM.band.val() == "191" || WLAN_5G_PM.band.val() == "199" || WLAN_5G_PM.band.val() == "203")
                && WLAN_5G_PM.mode.val() == "0") {
                WLAN_5G_PM.chanwid.body(1);
                WLAN_5G_PM.chanwid.op("all", 1);
            } else if ((WLAN_5G_PM.band.val() == "11" || WLAN_5G_PM.band.val() == "7") && WLAN_5G_PM.mode.val() == "0") {
                WLAN_5G_PM.chanwid.body(1);
                WLAN_5G_PM.chanwid.op(0, 1);
                WLAN_5G_PM.chanwid.op(1, 1);
                WLAN_5G_PM.chanwid.op(2, 0);
            } else {
                WLAN_5G_PM.chanwid.body(0);
                WLAN_5G_PM.chanwid.op("all", 0);
            }

            if (WLAN_5G_PM.mode.val() == "1") {
                WLAN_5G_PM.chanwid.body(0, true);
                WLAN_5G_PM.chan.body(0, true);
            } else {
                WLAN_5G_PM.chan.body(1);
            }

            {
                var channel_list_5g_dfs = [
                    [],
                    [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 136, 140, 149, 153, 157, 161, 165],
                    [36, 40, 44, 48, 52, 56, 60, 64, 149, 153, 157, 161],
                    [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
                    [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
                    [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
                    [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
                    [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140],
                    [34, 38, 42, 46],
                    [36, 40, 44, 48],
                    [36, 40, 44, 48, 52, 56, 60, 64],
                    [56, 60, 64, 100, 104, 108, 112, 116, 136, 140, 149, 153, 157, 161, 165],
                    [36, 40, 44, 48, 52, 56, 60, 64, 132, 136, 140, 149, 153, 157, 161, 165],
                    [36, 40, 44, 48, 52, 56, 60, 64, 149, 153, 157, 161, 165],
                    [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 136, 140, 149, 153, 157, 161, 165],
                    [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 136, 140, 149, 153, 157, 161, 165],
                    [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 149, 153, 157, 161, 165, 169, 173, 177]
                ];
                var domain_selection = $("input[name='regdomain_demo']").val();
                var match_data = channel_list_5g_dfs[domain_selection];

                WLAN_5G_PM.chan.op("all").each(function (e) {
                    var value = parseInt($(this).attr("value"));
                    if (value != 0 && value != 20) {
                        for (var i in match_data) {
                            if (value == match_data[i]) {
								if(WLAN_5G_PM.chanwid.val() != "0" && match_data[i] > 161)
								{
									break;
								}
                                $(this).show();
                                break;
                            } else {
                                $(this).hide();
                            }
                        }
                    }
                })
            }
        })
        s("#MULTI_AP_PAGE_ROW").on("click", function () {

            for (var i = 1; i < 5; i++) {
                var name = "wl_disable" + i;
                var button_id = "#5g_AP_" + i;
                if (s("input[name=\"" + name + "\"]").val() == "0") {
                    s(button_id).next("div").toggleClass("circle_enable", true);
                    s(button_id).next("div").removeClass("circle_disable");
                } else {
                    s(button_id).next("div").toggleClass("circle_disable", true);
                    s(button_id).next("div").removeClass("circle_enable");
                }
            }

            if (s("input[name='wl_disable1']").val() == "1" && s("#5g_AP1_Enable_Table").css("display") != "none") {
                s("input[name='wl_disable1']").parents("table").parent("div").nextAll("div").hide();
            } else {
                s("input[name='wl_disable1']").parents("table").parent("div").nextAll("div").show();
            }

            if (s("input[name='wl_disable2']").val() == "1" && s("#5g_AP2_Enable_Table").css("display") != "none") {
                s("input[name='wl_disable2']").parents("table").parent("div").nextAll("div").hide();
            } else {
                s("input[name='wl_disable2']").parents("table").parent("div").nextAll("div").show();
            }

            if (s("input[name='wl_disable3']").val() == "1" && s("#5g_AP3_Enable_Table").css("display") != "none") {
                s("input[name='wl_disable3']").parents("table").parent("div").nextAll("div").hide();
            } else {
                s("input[name='wl_disable3']").parents("table").parent("div").nextAll("div").show();
            }
        })


        s("#ADV_CONFIG_PAGE_ROW").on("click", function () {
            if ($("input[name='dot11kEnabled']").val() == "1") {
                $("#5g_dot11vEnabled").parents("table").parent("div").show();
            } else {
                $("#5g_dot11vEnabled").parents("table").parent("div").hide();
            }
        })


        s("#WPS_PAGE_ROW").on("click", function () {

            if ($("input[name='disableWPS']").val() == "1") {
                $("#5g_Start_PBC_form").parent("div").slideUp();
                $("#5g_Start_PIN_form").parent("div").slideUp();
            } else {
                $("#5g_Start_PBC_form").parent("div").slideDown();
                $("#5g_Start_PIN_form").parent("div").slideDown();
            }
        })
    })(jQuery);
}


var WLAN_5G_PM;
var WLAN_5G_SEC_PM;
var WLAN_5G_MULTI_PM;
var WLAN_BASIC_DATA = {}
var WLAN_SECURITY_DATA = {}
var WLAN_MULTI_AP_DATA = {}
var WLAN_ADV_DATA = {}
var WLAN_WPS_DATA = {}
var WLAN_ESM_DATA = {}
$(document).ready(function (e) {
    BS_PAGE_INIT();
    SEC_PAGE_INIT();
    MULTI_AP_PAGE_INIT();
    ADV_PAGE_INIT();
    WPS_PAGE_INIT();
    Easy_Mesh_INIT();
    Cipher_suite_Click_init();
    Global_Click_Monitoring();
    $(".B_wpaSSID").eq(0).click();
    $("#5G_WLAN_BASIC_CONFIG_ROW").click();
    $("#MULTI_AP_PAGE_ROW").click();
    $("#ADV_CONFIG_PAGE_ROW").click();
    $("#WPS_PAGE_ROW").click();
})
