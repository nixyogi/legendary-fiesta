function CONFIG_PAGE_INIT() {
    URL_CONFIG_DATA = {}
    $("#URL_FILTER_CONFIG_ROW").remove();
    Page_data_obj_init(URL_CONFIG_DATA, OneForAll("getASPdata/initPageURL", 5, 0, 0, 0))
    var config_page = {
        "length": 1,
        1: [
            ["URL_FILTER_CONFIG_ROW", "arrLang[lang]['LANG_URL_FILTER']", "2"],
            ["form", "URL_FILTER_CONFIG_FORM", "action=\"/boaform/getASPdata/formURL\" method=\"POST\"", "1"],
            ["switch", "URL_ENABLE", "arrLang[lang]['LANG_URL_FILTER_ENABLE']", "EnableUrl"],
            ["menu", "Filter_Mode", "arrLang[lang]['LANG_FILTER_MODE']", "urlFilterMode", [
                ["0", "arrLang[lang]['LANG_BLACK_LIST']"],
                ["1", "arrLang[lang]['LANG_WHITE_LIST']"],
            ]],
            ["submit", "url_config_submit"]
        ]
    }
    URL_CONFIG_PM = Auto_Page_generate(config_page);
    set_obj_data_to_html(URL_CONFIG_DATA);
    if (URL_CONFIG_DATA.EnableUrl == "0") {
        URL_CONFIG_PM.urlFilterMode.val("0");
    }
    $("#URL_FILTER_CONFIG_ROW").on("click", function () {
        if (URL_CONFIG_PM.EnableUrl.val() == "0") {
            URL_CONFIG_PM.urlFilterMode.body(0);
        } else {
            URL_CONFIG_PM.urlFilterMode.body(1);
        }
    })
    $("#URL_FILTER_CONFIG_ROW").click();
}

function URL_TBL_INIT() {
    URL_TBL_DATA = {}
    $("#URL_TBL_ROW").remove();
    Page_data_obj_init(URL_TBL_DATA, OneForAll("getASPdata/initURLTable", 5, 0, 0, 0))
    var url_tbl_page = {
        "length": 1,
        1: [
            ["URL_TBL_ROW", "arrLang[lang]['LANG_FILTER_RULE_LIST']"],
            ["form", "URL_TBL_Form", "action=\"/boaform/getASPdata/AddURL\" method='POST'", "1", URL_TBL_INIT],
            ["append", "<div class=\"table-responsive\">\
            <table class=\"table table-bordered table-striped\">\
            <thead>\
                <tr>\
                    <th>" + "URL " + arrLang[lang]['LANG_ADDRESS'] + "</th>\
                </tr>\
            </thead>\
            <tbody id=\"URL_LIST\"></tbody>\
        </table>\
        </div>"],
            ["hidden", "Url_Addr", ""],
            ["hidden", "action", "rm"],
            ["append", "<div>\
            <div style=\"display: inline;\"><button type=\"button\" id=\"URL_Add\" action=\"addRoute\" class=\"btn btn-primary btn-round\">" + arrLang[lang]["LANG_ADD"] + "</button></div>\
            <div style=\"display: inline;\"><button type=\"button\" id=\"URL_DEL\" class=\"btn btn-danger btn-round\">" + arrLang[lang]["LANG_DELETE_SELECTED"] + "</button></div>\
        </div>"],
        ]
    }
    Auto_Page_generate(url_tbl_page);
    for (var key in URL_TBL_DATA) {
        if (key == "URL_List")
            URL_TBL_DATA[key] = nest_obj_init(URL_TBL_DATA[key]);
    }
    var index = 0;
    if (URL_TBL_DATA["URL_List"]) {
        for (var key in URL_TBL_DATA["URL_List"]) {
            $("#URL_LIST").append("<tr class=\"justhover\"><td></td></tr>");
            $("#URL_LIST").find("tr").eq(index).children("td").text(key);
            index++;
        }
    }
	/*Modified by liangjuan for mission21748*/
    $("#URL_LIST").find(".justhover").on("click", function () {
        $(this).toggleClass("td_select");
    })
    $("#URL_DEL").on("click", function () {
		var url_delst = "";
		$("#URL_LIST").find(".td_select").each(function(){
			url_delst += $(this).children("td").text();
			url_delst += ";";
		})
	$("input[name='Url_Addr']").val(url_delst);
	//End of mission#21748
		if ($("input[name='Url_Addr']").val().length == 0) {
            swal_check_warning("input[name='Url_Addr']", arrLang[lang]['LANG_PLEASE_SELECT_AN_ENTRY_TO_DELETE']);
            return;
        }
        $.ajaxSettings.async = true;
        $("#waiting_animation").show();
        $("#URL_TBL_Form").submit();
    })
    $("#URL_Add").on("click", function () {
        flow_window_show();
    })
    FMask_init();
}

function flow_window_show() {
    var flow_Page = {
        id: "url_flow_page",
        name: "URL " + arrLang[lang]["LANG_ADD"],
        width: "500px",
        height: "300px",
    }
    var flow_auto_page = {
        "length": 1,
        1: [
            ["url_flow_page", 0],
            ["form", "URL_Flow_TBL_Form", "action=\"/boaform/getASPdata/AddURL\" method='POST'", "1", after_flow_success],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_URL_FILTER_NOTE']"],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_LIST_LIMIT']"],
            ["hidden", "action", "ad"],
            ["text", "URL_INPUT", "URL", "Url_Addr"],
            ["append", "<br>"],
            ["submit", "Flow_Page_submit", url_check]
        ]
    }
    flow_table_generate(flow_Page);
    Auto_Page_generate(flow_auto_page);
    FMask_init();
}

function after_flow_success() {
    URL_TBL_INIT();
    $(".layui-layer-close2").click();
}

function url_check() {
    var url = $("#url_flow_page").find("input[name='Url_Addr']").val();
    if (url.length == 0) {
        swal_check_warning("input[name='Url_Addr']", arrLang[lang]["LANG_INVALID_URL_ADDR_SHOULD_NOT_EMPTY"]);
        return false;
    }
    if (!vs_checkhttpurl(url) || url.indexOf("=") != -1) {
        swal_check_warning("input[name='Url_Addr']", "url " + arrLang[lang]["LANG_IS_INVALID"]);
        return false;
    }
    for (var key in URL_TBL_DATA["URL_List"]) {
        if (key == url) {
            swal_check_warning("input[name='Url_Addr']", arrLang[lang]['LANG_RULE_ALREADY_EXISTS']);
            return false
        }
    }
    return true;
}

var URL_CONFIG_PM;
var URL_CONFIG_DATA = {}
var URL_TBL_DATA = {}
$(document).ready(function () {
    CONFIG_PAGE_INIT();
    URL_TBL_INIT();
})
