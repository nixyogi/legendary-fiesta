function Guide_Place_GO() {
    $("#wrapper").after("<div id=\"content-wrapper2\" style=\"display: none;\">\
    <div class=\"d-flex flex-column\">\
      <br>\
      <br>\
      <br>\
      <br>\
      <div id=\"content2\">\
        <div class=\"\" id='CTF'>\
          <div class=\"row justify-content-center\">\
            <div class=\"card o-hidden border-0 shadow-lg my-5\">\
              <div class=\"row\">\
                <div class=\"card-body\" id='Guide_Place'></div>\
                <div class=\"card-body\" id='next_is_wifi_config' style=\"display:none;\"></div>\
                \
              </div>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>\
  </div>");

    $("#Guide_Place").empty();
    $("#next_is_wifi_config").empty();
    $("#wrapper").hide();
    $("#CTF").addClass("animated fadeInDown");
    var Page_data = {};
    Page_data_obj_init(Page_data, OneForAll("getASPdata/Quick_Guide_init", 5, 0, 0, 0));
    var GP_Page = {
        "length": 2,
        1: [
            ["#Guide_Place", 0],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_QUICK_GUIDE_TIPS1']"],
            ["text", "B_pppoe_username", "PPPoE, ,arrLang[lang][\"LANG_USERNAME\"]", "pppoe_username", "62"],
            ["password", "B_pppoe_password", "PPPoE, ,arrLang[lang][\"LANG_PASSWORD\"]", "pppoe_password", "29"],
            ["append", "<br>"],
            ["submit", "pppoe_config_go_next", , Page_data.wifi_name == undefined ? L('wan_submit') : L('LANG_NEXT_STEP')],
            ["append", "<br>"],
            ["submit", "pppoe_config_go_back", , "arrLang[lang]['LANG_BACK']", "btn-secondary"],
        ],
        2: [
            ["#next_is_wifi_config", 0],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_QUICK_GUIDE_TIPS2']"],
            ["form", "QUICK_GUIDE_FORM", "action=\"/boaform/getASPdata/form_Quick_Guide\"method=\"POST\"", "1", after_guide_success],
            ["text", "B_ssid", "arrLang[lang][\"LANG_SSID\"]", "wifi_name_2", "32"],
            ["password", "B_pskValue", "arrLang[lang][\"LANG_PASSWORD\"]", "wifi_password", "64"],
            ["password", "B_pskValue2", "arrLang[lang][\"LANG_AFFIRM_PASSWORD_TITLE\"]", "wifi_password2", "64"],
            ["hidden", "wifi_name_5", ""],
            ["hidden", "encodePppUserName", ""],
            ["hidden", "encodePppPassword", ""],
            ["append", "<br>"],
            ["submit", "wifi_config_final_submit", check_Quick_Guide2],
            ["append", "<br>"],
            ["submit", "wifi_config_go_back", check_Quick_Guide2, "arrLang[lang]['LANG_BACK']", "btn-secondary"],
        ]
    }
    var QG_PM = Auto_Page_generate(GP_Page);
    var pppoe_flag = 0;
    if (Page_data.pppUsername != undefined) {
        set_obj_data_to_html({
            "pppoe_username": decode64(Page_data.pppUsername)
        });
        set_obj_data_to_html({
            "pppoe_password": Page_data.pppPassword
        });
        pppoe_flag = 1;
    } else {
        $("#Guide_Place").hide();
        $("#next_is_wifi_config").show();
        pppoe_flag = 0;
    }
    if (Page_data.wifi_name != undefined)
        set_obj_data_to_html({
            "wifi_name_2": Page_data.wifi_name
        });
    FMask_init();
    $("#pppoe_config_go_next,#pppoe_config_go_back,#wifi_config_go_back").off("click");
    $("#content-wrapper2").show();

    $("#pppoe_config_go_back").on("click", function () {
        $("#content-wrapper2").hide();
        if (!$("#wrapper").hasClass("animated fadeInUp")) {
            $("#wrapper").addClass("animated fadeInUp");
        }
        $("#CTF").removeClass();
        $("#CTF").addClass("container-fluid");
        $("#wrapper").show();
        $("#content-wrapper2").remove();
    });

    $("#pppoe_config_go_next").on("click", function () {
        if (check_Quick_Guide1()) {
            if (Page_data.wifi_name == undefined) {
                $("#wifi_config_final_submit").click();
                return;
            }
            $("#CTF").removeClass();
            $("#CTF").addClass("container-fluid");
            $("#content-wrapper2").hide();
            $("#Guide_Place").hide();
            $("#next_is_wifi_config").show();
            $("#CTF").addClass("animated fadeInDown");
            $("#content-wrapper2").show();
        }
    });
    if (pppoe_flag == 1) {
        $("#wifi_config_go_back").on("click", function () {
            $("#CTF").removeClass();
            $("#CTF").addClass("container-fluid");
            $("#content-wrapper2").hide();
            $("#Guide_Place").show();
            $("#next_is_wifi_config").hide();
            $("#CTF").addClass("animated fadeInUp");
            $("#content-wrapper2").show();
        });
    } else if (pppoe_flag == 0) {
        $("#wifi_config_go_back").on("click", function () {
            $("#content-wrapper2").hide();
            if (!$("#wrapper").hasClass("animated fadeInUp")) {
                $("#wrapper").addClass("animated fadeInUp");
            }
            $("#CTF").removeClass();
            $("#CTF").addClass("container-fluid");
            $("#wrapper").show();
            $("#content-wrapper2").remove();
        });
    }

    function check_Quick_Guide1() {
        if ((QG_PM.pppoe_username.val() == "" || QG_PM.pppoe_password.val() == "")) {
            ((QG_PM.pppoe_username.val() == "") ? swal_check_warning("input[name='pppoe_username']", arrLang[lang]["LANG_PPP_USER_NAME_CANNOT_BE_EMPTY"]) : swal_check_warning("input[name='pppoe_password']", arrLang[lang]["LANG_PPP_PASSWORD_CANNOT_BE_EMPTY"]))
            return false;
        } else {
            if (QG_PM.pppoe_username.val() != "" && sji_checkpppacc(QG_PM.pppoe_username.val(), 1, 64) == false) {
                swal_check_warning("input[name='pppoe_username']", arrLang[lang]["LANG_USERNAME"] + "\"" + QG_PM.pppoe_username.val() + "\"" + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_TRY_AGAIN"]);
                return false;
            }
            if (!isAllStar(QG_PM.pppoe_password.val())) {
                if (sji_checkpppacc(QG_PM.pppoe_password.val(), 1, 30) == false) {
                    swal_check_warning("input[name='pppoe_password']", arrLang[lang]["LANG_PASSWORD"] + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_TRY_AGAIN"]);
                    return false;
                }
            } else if ($("input[name='lkname']").val() == "new") {
                swal_check_warning("input[name='pppoe_password']", arrLang[lang]["LANG_PASSWORD"] + arrLang[lang]["LANG_IS_INVALID"] + " " + arrLang[lang]["LANG_TRY_AGAIN"]);
                return false;
            }
        }
        return true;
    }

    function check_Quick_Guide2() {
        if (Page_data.wifi_name != undefined) {
            if (QG_PM.wifi_name_2.val().length == 0) {
                swal_check_warning("input[name='wifi_name_2']", arrLang[lang]["LANG_SSID_CANNOT_BE_EMPTY"]);
                return false;
            }
            if (QG_PM.wifi_name_2.val().indexOf("/") != -1 || QG_PM.wifi_name_2.val().indexOf("<") != -1 || QG_PM.wifi_name_2.val().indexOf(">") != -1 || QG_PM.wifi_name_2.val().indexOf("=") != -1 || QG_PM.wifi_name_2.val().indexOf("&") != -1) {
                swal_check_warning("input[name='wifi_name_2']", arrLang[lang]['LANG_ILLEGAL_CHARACTER'])
                return false;
            }
            if (QG_PM.wifi_password.val().length < 8) {
                swal_check_warning("input[name='wifi_password']", arrLang[lang]['LANG_PRE_SHARED_KEY_VALUE_SHOULD_BE_SET_AT_LEAST_8_CHARACTERS']);
                return false;
            }

            if (QG_PM.wifi_password.val() != QG_PM.wifi_password2.val()) {
                swal_check_warning("input[name='wifi_password2']", arrLang[lang]['LANG_AFFIRM_PASSWORD_DO_NOT_MATCH_NEW_PASSWORD_INPUT_AGAIN']);
                return false;
            }

            QG_PM.wifi_name_5.val(QG_PM.wifi_name_2.val() + "_5G");
        }
        QG_PM.encodePppUserName.val(encode64(QG_PM.pppoe_username.val()));
        QG_PM.encodePppPassword.val(encode64(QG_PM.pppoe_password.val()));
        return true;
    }

    function after_guide_success() {
        $("#content-wrapper2").hide();
        if (!$("#wrapper").hasClass("animated fadeInUp")) {
            $("#wrapper").addClass("animated fadeInUp");
        }
        $("#CTF").removeClass();
        $("#CTF").addClass("container-fluid");
        $("#wrapper").show();
        $("#content-wrapper2").remove();
    }
}

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "abcdefghijklmnopqrstuvwxyz" +
    "0123456789+/=";

function encode64(input) {
    var output = "";
    var i = 0,
        len = input.length;
    for (i = 0; i <= len - 3; i += 3) {
        output += keyStr.charAt(input.charCodeAt(i) >>> 2);
        output += keyStr.charAt(((input.charCodeAt(i) & 3) << 4) | (input.charCodeAt(i + 1) >>> 4));
        output += keyStr.charAt(((input.charCodeAt(i + 1) & 15) << 2) | (input.charCodeAt(i + 2) >>> 6));
        output += keyStr.charAt(input.charCodeAt(i + 2) & 63);
    }
    if (len % 3 == 2) {
        output += keyStr.charAt(input.charCodeAt(i) >>> 2);
        output += keyStr.charAt(((input.charCodeAt(i) & 3) << 4) | (input.charCodeAt(i + 1) >>> 4));
        output += keyStr.charAt(((input.charCodeAt(i + 1) & 15) << 2));
        output += keyStr.charAt(64);
    } else if (len % 3 == 1) {
        output += keyStr.charAt(input.charCodeAt(i) >>> 2);
        output += keyStr.charAt(((input.charCodeAt(i) & 3) << 4));
        output += keyStr.charAt(64);
        output += keyStr.charAt(64);
    }
    return output;
}

function decode64(input) {
    var output = "";
    var i, a, b, c, d, z;
    for (i = 0; i < input.length - 3; i += 4) {
        a = keyStr.indexOf(input.charAt(i + 0));
        b = keyStr.indexOf(input.charAt(i + 1));
        c = keyStr.indexOf(input.charAt(i + 2));
        d = keyStr.indexOf(input.charAt(i + 3));
        output += String.fromCharCode((a << 2) | (b >>> 4));
        if (input.charAt(i + 2) != keyStr.charAt(64))
            output += String.fromCharCode(((b << 4) & 0xF0) | ((c >>> 2) & 0x0F));
        if (input.charAt(i + 3) != keyStr.charAt(64))
            output += String.fromCharCode(((c << 6) & 0xC0) | d);
    }
    return output;
}

function Guide_Button() {
    $(".container-fluid").append("<div id=\"Guide_Button_row\" class=\"row\">\
    <div class=\"col-lg-8\">\
      <div class=\"card shadow mb-4 col-lg-push-1\">\
        <div class=\"card-header py-3\">\
          <h6 class=\"m-0 font-weight-bold text-primary\" >"+ arrLang[lang]["LANG_QUICK_GUIDE"] + "</h6>\
        </div>\
        <div class=\"card-body\">\
          <div id=\"Guick_Guide_Button_Table\">\
            <div style=\"max-width: 300px;margin: 0 auto;\">\
              <button type=\"button\" id=\"Guick_Guide_Button\"\
                class=\"btn btn-primary btn-block btn-round submit_button\">\
                <span >"+ arrLang[lang]["LANG_START"] + "</span>\
                <span >"+ arrLang[lang]["LANG_QUICK_GUIDE"] + "</span>\
              </button>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>\
  </div>");
    $("#Guick_Guide_Button").on("click", function () {
        Guide_Place_GO();
    })
}

function custom_Page_init() {
    $(".container-fluid").append("<div id=\"custom_row\" class=\"row\" style=\"display: none;\">\
    <div class=\"col-lg-12\">\
      <div class=\"card shadow mb-4 col-lg-push-1\">\
        <div class=\"card-header py-3\">\
          <h6 class=\"m-0 font-weight-bold text-primary\"></h6>\
        </div>\
        <div class=\"card-body\" id=\"custom_Page\">\
        </div>\
      </div>\
    </div>\
  </div>");
    if (CUSTOM__PAGE != undefined) {
        var tar_Page = {
            "length": 1,
            1: [
                ["#custom_Page", 0],
            ]
        }
        for (var key in CUSTOM__PAGE) {
            var tmp = CUSTOM__PAGE[key];
            if (key.indexOf("title") != -1) {
                $("#custom_row").find(".text-primary").text(tmp);
            } else {
                var reg = new RegExp(" ", "g");
                tmp = tmp.replace(reg, "&nbsp");
                tar_Page[1].push(["tips", "h6", "class='tips_font' ", tmp]);
            }
        }
        Auto_Page_generate(tar_Page);
        $("#custom_row").show();
    }
}

function dev_basic_info() {
    var page = {
        "length": 1,
        1: [
            ["basic_info_row", "arrLang[lang]['LANG_DEVICE_BASIC_INFO']", "2"],
            ["append", "<div id='basic_info_t'></div>"],
        ]
    };
    Auto_Page_generate(page);
    var data = getASPdata("dev_basic_info");
    var obj = get_nest_data_obj(data);
    var table_obj = {
        direction: 1,
        selector: $("#basic_info_t"),
        header: [L("LANG_DEVICE_MODEL"), L("LANG_DEVICE_SN"), L("LANG_HARDWARE_VERSION"), L("LANG_FIRMWARE_VERSION"), L("LANG_SERIAL_NO")],
        contain: ["devModel", "devId", "hdVer", "stVer", "gpon_sn"],
        origin: obj,
        origin_key_word: "basic_info",
    };
	var table_time_obj = {
        direction: 1,
        selector: $("#basic_info_t"),
        header: [L("LANG_DEVICE_MODEL"), L("LANG_DEVICE_SN"), L("LANG_HARDWARE_VERSION"), L("LANG_FIRMWARE_VERSION"), L("LANG_SERIAL_NO"),L("LANG_WEB_UPTIME")],
        contain: ["devModel", "devId", "hdVer", "stVer", "gpon_sn", "web_uptime"],
        origin: obj,
        origin_key_word: "basic_info",
    };
    
	if (!g_page_cstmfun.CF_WEB_SHOW_UPTIME || g_page_cstmfun.CF_WEB_SHOW_UPTIME == "1") {
		table_generate(table_time_obj);
    }
	else{
		table_generate(table_obj);
	}
	
}

function is_Guide_Page_ready() {
    var Page_data = {};
    Page_data_obj_init(Page_data, OneForAll("getASPdata/Quick_Guide_init", 5, 0, 0, 0));
    if (Page_data.pppUsername == undefined && Page_data.wifi_name == undefined)
        return 0;
    return 1;
}

function dev_resource_info() {
    var page = {
        "length": 1,
        1: [
            ["dev_resource_row", "arrLang[lang]['LANG_DEVICE_RESOURCE_INFO']", "2"],
            ["append", "<div id='resource_info_t'></div>"],
        ]
    };
    Auto_Page_generate(page);
    var data = getASPdata("dev_resource_info");
    var obj = get_nest_data_obj(data);
    var table_obj = {
        direction: 1,
	 td_width:"36%",
        selector: $("#resource_info_t"),
        header: [L("LANG_DEVICE_CPUSAGE"), L("LANG_DEVICE_MEMUSAGE")],
        contain: ["cpUsage", "memUsage"],
        origin: obj,
        origin_key_word: "dev_resource_info",
    };
    table_generate_progress(table_obj);
}

$(document).ready(function () {
	dev_basic_info();
	dev_resource_info();
	
	if (is_Guide_Page_ready())
		Guide_Button();
	//custom_Page_init();
})
