var BandSteering_Page_Data = {};

function PW_Change_Page_init() {
    /*$(".container-fluid").hide();
    $(".card-body").empty();*/
    var Band_Steering_Page = {
        "length": 1,
        1: [
            /*[".card-body", 0],*/
            ["Band_Steering_row", "Band Steering", "2"],
            ["tips", "h6", "class='tips_font' ", "You can modefied band steering to enable and wifi ssid/psk."],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_PLDT_PASSWORD_RULE0']"],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_PLDT_PASSWORD_RULE1']"],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_PLDT_PASSWORD_RULE2']"],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_MGM_USER_PASSWORD_RULE4']"],
            ["append", "<br>"],
            ["form", "band_steering_form", "action=\"/boaform/getASPdata/formBandSteering\" method=\"post\"", "1"],
			["switch", "B_BandSteeringEn", "Band Steering", "BandSteeringEn"],
            ["append", "<br>"],
            ["tips", "h6", "class=\"text-primary\" style=\"font-weight: bold;\" id=\"tips_Dual\"", "Basic Config"],
            ["text", "B_ssid", "arrLang[lang][\"LANG_SSID\"]", "wifi_name", "32"],
            ["password", "B_pskValue", "arrLang[lang][\"LANG_PASSWORD\"]", "wifi_password", "64"],
            ["text", "rssi_threshold_high", "High rssi", "thresholdHighRssi", "8", "disabled"],
			["text", "rssi_threshold_low", "Low rssi", "thresholdLowRssi", "8", "disabled"],
            ["append", "<br>"],
            ["submit", "quick_guide_config_final_submit", check_Band_Steering],
        ],
    }

    Auto_Page_generate(Band_Steering_Page);
    //$(".container-fluid").addClass("animated fadeInDown");
    //$(".container-fluid").show();

/*
    function key_monitor() {
        (function (s) {
            var key_flag = 0;
            s(document).keyup(function (event) {
                if (event.keyCode == 13) {
                    key_flag = !key_flag;
                    if (key_flag == 1) {
                        $("#management_user_config_submit").click();
                    }
                }
            });
        })(jQuery);
    }

    key_monitor();
*/
    function pldt_sji_checkLoginPsk(username, smin, smax) {
        var str = username;
        if (typeof username == "undefined") return false;
        if (typeof smin != "undefined" && username.length < smin) return false;
        if (typeof smax != "undefined" && username.length > smax) return false;
        var TypeAZ = 0;
        var Typeza = 0;
        var TypeNum = 0;
        var TypeChar = 0;
        for (var i = 0; i < str.length; i++) {
            if ((str.charAt(i) >= '0' && str.charAt(i) <= '9') || (str.charAt(i) >= 'A' && str.charAt(i) <= 'Z') || (str.charAt(i) >= 'a' && str.charAt(i) <= 'z') ||
                (str.charAt(i) == '.') || (str.charAt(i) == ':') || (str.charAt(i) == '-') || (str.charAt(i) == '_') || (str.charAt(i) == ' ') || (str.charAt(i) == '/') || (str.charAt(i) == '@') ||
                (str.charAt(i) == '!') || (str.charAt(i) == '~') || (str.charAt(i) == '#') || (str.charAt(i) == '$') || (str.charAt(i) == '%') || (str.charAt(i) == '^') || (str.charAt(i) == '*') ||
                (str.charAt(i) == '(') || (str.charAt(i) == ')') || (str.charAt(i) == '+') || (str.charAt(i) == '=') || (str.charAt(i) == '?')) {
                if ((str.charAt(i) >= '0' && str.charAt(i) <= '9'))
                    TypeNum = 1;
                else if ((str.charAt(i) >= 'A' && str.charAt(i) <= 'Z'))
                    TypeAZ = 1;
                else if ((str.charAt(i) >= 'a' && str.charAt(i) <= 'z'))
                    Typeza = 1;
                else if ((str.charAt(i) == '.') || (str.charAt(i) == ':') || (str.charAt(i) == '-') || (str.charAt(i) == '_') || (str.charAt(i) == ' ') || (str.charAt(i) == '/') || (str.charAt(i) == '@') ||
                    (str.charAt(i) == '!') || (str.charAt(i) == '~') || (str.charAt(i) == '#') || (str.charAt(i) == '$') || (str.charAt(i) == '%') || (str.charAt(i) == '^') || (str.charAt(i) == '*') ||
                    (str.charAt(i) == '(') || (str.charAt(i) == ')') || (str.charAt(i) == '+') || (str.charAt(i) == '=') || (str.charAt(i) == '?'))
                    TypeChar = 1;
                else;
                continue;
            }
            return false;
        }
        if ((TypeNum + TypeAZ + Typeza + TypeChar) < 3)
            return false;
        return true;
    }

    function check_wlan() {
        if ($("#B_ssid").val().length == 0) {
            swal_check_warning("#B_ssid", arrLang[lang]["LANG_SSID_CANNOT_BE_EMPTY"]);
            return false;
        }
        if ($("#B_ssid").val().indexOf("/") != -1 || $("#B_ssid").val().indexOf("<") != -1 || $("#B_ssid").val().indexOf(">") != -1 || $("#B_ssid").val().indexOf("=") != -1 || $("#B_ssid").val().indexOf("&") != -1) {
            swal_check_warning("#B_ssid", arrLang[lang]['LANG_ILLEGAL_CHARACTER'])
            return false;
        }
        if ($("#B_pskValue").val().length < 8) {
            swal_check_warning("#B_pskValue", arrLang[lang]['LANG_PRE_SHARED_KEY_VALUE_SHOULD_BE_SET_AT_LEAST_8_CHARACTERS']);
            return false;
        }
        if (pldt_sji_checkLoginPsk($("#B_pskValue").val(), 8, 15) == false) {
            swal_check_warning("#B_pskValue", arrLang[lang]["LANG_PLDT_PASSWORD_RULE2"] + "\n" + arrLang[lang]["LANG_MGM_USER_PASSWORD_RULE4"]);
            return false;
        }

        return true;
    }

    function check_Band_Steering()
    {
		$("input[name='wifi_name']").prop("disabled", false);
		$("input[name='wifi_password']").prop("disabled", false);
		$("input[name='thresholdHighRssi']").prop("disabled", false);
		$("input[name='thresholdLowRssi']").prop("disabled", false);

        if(check_wlan() == true)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

function Global_Click_Monitoring() {
    (function (s) {
			s("#Band_Steering_row").on("click", function () {
		
				if ($("input[name='BandSteeringEn']").val() == "0") {
					$("input[name='wifi_name']").prop("disabled", true);
					$("input[name='wifi_password']").prop("disabled", true);
					$("input[name='thresholdHighRssi']").prop("disabled", true);
					$("input[name='thresholdLowRssi']").prop("disabled", true);
				} else {
					$("input[name='wifi_name']").prop("disabled", false);
					$("input[name='wifi_password']").prop("disabled", false);
					$("input[name='thresholdHighRssi']").prop("disabled", false);
					$("input[name='thresholdLowRssi']").prop("disabled", false);

				}
			})
		})(jQuery);
}

$(document).ready(function () {
    PW_Change_Page_init();
    Page_data_obj_init(BandSteering_Page_Data, OneForAll("getASPdata/initBandSteeringPage", 5, 0, 0, 0));
    set_obj_data_to_html(BandSteering_Page_Data);
    FMask_init();
    Global_Click_Monitoring();
    $("#Band_Steering_row").click();
})
