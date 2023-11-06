var Network_Route_Page = {}

function Network_Route_Page_List_init() {
    Network_Route_Page = {
        "length": 2,
        1: [
            ["Network_Route_row", "arrLang[lang][\"LANG_RIP\"]", "2"],
            ["form", "Network_Route_form", "action=\"/boaform/getASPdata/formRip\" method=\"post\"", "1", after_success, after_fail],
            ["switch", "RIP_Enable", "RIP ,arrLang[lang][\"LANG_ENABLE\"]", "rip_on"],
            ["tips", "div", " style=\"color:#4e72dfbe;font-weight:bold;\"", "arrLang[lang][\"LANG_INPUT_CONFIGURATION\"]"],
            ["menu", "rip_if_choose", "arrLang[lang][\"LANG_INTERFACE\"]", "rip_if", rip_if_choose_init()],
            ["menu", "rip_receive_mode", "arrLang[lang][\"LANG_RECEIVE_MODE\"]", "receive_mode", [
                ["0", "None"],
                ["1", "RIP1"],
                ["2", "RIP2"],
                ["3", "Both"],
            ]],
            ["menu", "rip_send_mode", "arrLang[lang][\"LANG_SEND_MODE\"]", "send_mode", [
                ["0", "NONE"],
                ["1", "RIP1"],
                ["2", "RIP2"],
                ["4", "RIP1COMPAT"],
            ]],
            ["hidden", "ripSet", "1"],
            ["hidden", "ripDel", "1"],
            ["hidden", "ripDelAll", "1"],
            ["hidden", "ripAdd", "1"],
            ["append", "<br>"],
            ["submit", "Rip_Add_submit", enable_add, "arrLang[lang][\"LANG_ADD\"]"],
            ["append", "<br>"],
            ["append", "<table class=\"table table-bordered table-striped\">\
            <thead>\
                <tr>\
                    <th>" + arrLang[lang]["LANG_INTERFACE"] + "</th>\
                    <th>" + arrLang[lang]["LANG_RECEIVE_MODE"] + "</th>\
                    <th>" + arrLang[lang]["LANG_SEND_MODE"] + "</th>\
                </tr>\
            </thead>\
            <tbody id=\"Rip_Config_List\"></tbody>\
        </table>"],
            ["append", "<div>\
            <div style=\"display: inline;\"><button type=\"button\" id=\"ripDel\" class=\"btn btn-primary btn-round\">" + arrLang[lang]["LANG_DELETE_SELECTED"] + "</button></div>\
            <div style=\"display: inline;\"><button type=\"button\" id=\"ripDelAll\" class=\"btn btn-danger btn-round\">" + arrLang[lang]["LANG_DELETE_ALL"] + "</button></div>\
        </div>"]
        ],
        2: [
            ["Network_Static_Route_row", "arrLang[lang][\"LANG_STATIC_ROUTER\"]", "2"],
            ["append", "<div class=\"table-responsive\">\
            <table class=\"table table-bordered table-striped\">\
            <thead>\
                <tr>\
                    <th>" + arrLang[lang]["LANG_STATUS"] + "</th>\
                    <th>" + arrLang[lang]["LANG_DESTINATION"] + "</th>\
                    <th>" + arrLang[lang]["LANG_SUBNET_MASK"] + "</th>\
                    <th>" + arrLang[lang]["LANG_GATEWAY"] + "</th>\
                    <th>" + arrLang[lang]["LANG_METRIC"] + "</th>\
                    <th>" + arrLang[lang]["LANG_INTERFACE"] + "</th>\
                </tr>\
            </thead>\
            <tbody id=\"Static_Route_List\"></tbody>\
        </table>\
        </div>"],
            ["append", "<div>\
            <div style=\"display: inline;\"><button type=\"button\" id=\"Static_Route_Add\" action=\"addRoute\" class=\"btn btn-primary btn-round\">" + arrLang[lang]["LANG_ADD"] + "</button></div>\
            <div style=\"display: inline;\"><button type=\"button\" id=\"Route_Table_show\" class=\"btn btn-info btn-round\">" + arrLang[lang]["LANG_SHOW_ROUTES"] + "</button></div>\
        </div>"]
        ],
    }
}


var Static_Route_Config_List = {};

function Flow_Edit_window_list_init() {
    Static_Route_Config_List = {
        "length": 1,
        1: [
            ["flow_window", 0, "2"],
            ["tips", "div", " style=\"color:#4e72dfbe;font-weight:bold;\"", "arrLang[lang][\"LANG_STATIC_ROUTE_TIPS\"]"],
            ["form", "Static_Route_Config_form", "action=\"/boaform/getASPdata/formRoute\" method=\"post\"", "1", Static_Route_success_method, function(){MyAlert("Error")}],
            ["switch", "enable_route", arrLang[lang]["LANG_ENABLE"], "enable"],
            ["text", "dest_net", arrLang[lang]["LANG_DESTINATION"], "destNet", "15"],
            ["text", "sub_mask", arrLang[lang]["LANG_SUBNET_MASK"], "subMask", "15"],
            ["text", "next_hop", arrLang[lang]["LANG_GATEWAY"], "nextHop", "15"],
            ["text", "metric", arrLang[lang]["LANG_METRIC"], "metric", "5"],
            ["menu", "interface_choose", "arrLang[lang][\"LANG_INTERFACE\"]", "interface", rip_if_choose_init(1)],
            ["hidden", "addRoute", "1"],
            ["hidden", "updateRoute", "1"],
            ["hidden", "delRoute", "1"],
            ["hidden", "select", ""],
            ["submit", "addRoute", Static_Route_check, "arrLang[lang][\"LANG_ADD\"]"],
            ["submit", "updateRoute", Static_Route_check, "arrLang[lang][\"wan_submit\"]"],
            ["append", "<br>"],
            ["submit", "delRoute", Static_Route_check, "arrLang[lang][\"wan_del\"]", "btn-danger"],
        ],
    }
}

function Static_Route_success_method() {
    $(".layui-layer-close2").click();
    Static_Table_init();
    flow_window_init();
}

function Static_Route_check(tar) {
    var action = tar.prop("id");
    $("#Static_Route_Config_form").find("input[type='hidden']").each(function () {
        if ($(this).prop("name") != "select" && $(this).prop("name") != "enable" && $(this).prop("name") != "interface" && $(this).prop("name") != "csrfMask") {
            $(this).attr("disabled", true);
        }
    })
    $("input[name=\"" + action + "\"]").attr("disabled", false);
    if ($("input[name='interface']").val() == 65535 && (action=="addRoute"||action=="updateRoute")) {
        MyAlert(L("LANG_STATIC_ROUTE_TIPS2"));
        return false;
        /*
        if ($("input[name='nextHop']").val() == "") {
            MyAlert(arrLang[lang]["LANG_ENTER_NEXT_HOP_IP_OR_SELECT_A_GW_INTERFACE"]);
            $("input[name='nextHop']").focus();
            return false;
        }
        if (!checkHostIP($("input[name='nextHop']"), 0))
            return false;
        */
    }
    if (!checkHostIP($("input[name='destNet']"), 1))
        return false;
    if (!checkNetmask($("input[name='subMask']"), 1))
        return false;
    if (checkDest($("input[name='destNet']").val(), $("input[name='subMask']").val()) == true) {
        MyAlert(arrLang[lang]["LANG_THE_SPECIFIED_MASK_PARAMETER_IS_INVALID_DESTINATION_MASK_DESTINATION"]);
        $("input[name='destNet']").focus();
        return false;
    }
    if (!checkDigitRange($("input[name='metric']").val(), 1, 0, 16)) {
        MyAlert(arrLang[lang]["LANG_INVALID_METRIC_RANGE_IT_SHOULD_BE_0_16"]);
        $("input[name='metric']").focus();
        return false;
    }
    return true;

}

function rip_if_choose_init(op) {
    var data = OneForAll("getASPdata/get_wan_name_list", 5, 0, 0, 0);
    if (data == "nolist") {
        if (op == 1) {
            return [
                ["65535", ""]
            ];
        } else
            return [
                ["65535", "br0"]
            ];
    }
    var data_split = data.split("\n");
    if (op == 1) {
        var menu = [
            ["65535", ""]
        ];
    } else {
        var menu = [
            ["65535", "br0"]
        ];
    }

    for (var i in data_split) {
        var temp = data_split[i];
        if (temp.indexOf("&") != -1) {
            var temp_split = temp.split("&");
            var name = temp_split[0];
            var value = temp_split[1];
            menu.push([value, name]);
        }
    }
    return menu;
}


var action_list = ["ripSet", "ripDel", "ripDelAll", "ripAdd"];
var Page_data = {};

function RIP_table_Page_init() {
    var data = OneForAll("getASPdata/showRipIf", 5, 0, 0, 0);
    Page_data_obj_init(Page_data, data);
    $("#Rip_Config_List").empty();
    if (data == "nolist")
        return;
    if (data.indexOf("select") == -1)
        return;
    var data_split = data.split("\n");
    for (var i in data_split) {
        var temp = data_split[i];
        if (temp.indexOf("select") == -1) {
            continue;
        }
        var name = temp.substring(0, temp.indexOf("="));
        var list = temp.substring(temp.indexOf("=") + 1);
        var list_split = list.split("&");
        $("#Rip_Config_List").append("<tr id=\"" + name + "\" class=\"justhover\" name=\"RIP_SELECT\">" + "<td>" + list_split[0] + "</td>" + "<td>" + list_split[1] + "</td>" + "<td>" + list_split[2] + "</td>" + "</tr>");
        $("#Rip_Config_List").append("<tr style=\"display:none;\">" + "<input type=\"hidden\" name=\"" + name + "\" value='1' disabled=\"disabled\">" + "</tr>");
    }
    RIP_table_click_Page_init();
}

function RIP_table_click_Page_init() {
    (function (s) {
        s("tr[name='RIP_SELECT']").on("click", function () {
            $(this).toggleClass("td_select");
            if ($(this).hasClass("td_select")) {
                $("input[name=\"" + $(this).prop("id") + "\"]").attr("disabled", false);
            } else {
                $("input[name=\"" + $(this).prop("id") + "\"]").attr("disabled", true);
            }
        })
    })(jQuery);
}

function enable_add() {
    $("input[name='ripAdd']").attr("disabled", false);
    return true;
}


function after_success() {
    for (var i in action_list) {
        $("input[name=\"" + action_list[i] + "\"]").attr("disabled", true);
    }
    RIP_table_Page_init();
}

function after_fail(data) {
    if (data == "Entry already exists!") {
        MyAlert(arrLang[lang]["LANG_ENTRY_ALREADY_EXISTS"]);
    } else if (data == "There is no item selected to delete!") {
        MyAlert(arrLang[lang]["LANG_THERE_IS_NO_ITEM_SELECTED_TO_DELETE"]);
    }
}

function Global_click_monitoring() {
    for (var i in action_list) {
        $("input[name=\"" + action_list[i] + "\"]").attr("disabled", true);
    }
    (function (s) {
        s("#ripDel").on("click", function (e) {
            $("input[name='ripDel']").attr("disabled", false);
            $("input[name='ripDelAll']").attr("disabled", true);
            $("input[name='ripSet']").attr("disabled", true);
            $("input[name='ripAdd']").attr("disabled", true);
            $("#waiting_animation").show();
            $.ajaxSettings.async = true;
            s("#Network_Route_form").submit();
        });
        s("#ripDelAll").on("click", function (e) {
            $("input[name='ripDelAll']").attr("disabled", false);
            $("input[name='ripSet']").attr("disabled", true);
            $("input[name='ripDel']").attr("disabled", true);
            $("input[name='ripAdd']").attr("disabled", true);
            $("#waiting_animation").show();
            $.ajaxSettings.async = true;
            s("#Network_Route_form").submit();
        });
        s("#RIP_Enable").on("click", function (e) {
            $("input[name='ripSet']").attr("disabled", false);
            $("input[name='ripDel']").attr("disabled", true);
            $("input[name='ripDelAll']").attr("disabled", true);
            $("input[name='ripAdd']").attr("disabled", true);
            setTimeout(function () {
                $("#waiting_animation").show();
                $.ajaxSettings.async = true;
                s("#Network_Route_form").submit();
            }, 10);
        });
        s("#Route_Table_show").on("click", function (e) {
            Route_Table_init();
        })
    })(jQuery);
}




var layer_Edit = {
    id: "Route_Edit",
    type: 1,
    title: false,
    closeBtn: 1,
    area: [window_width(), "550px"],
    shadeClose: true,
    content: "<div class=\"card shadow mb-4 col-lg-push-1\"><div class=\"card-header py-3 \"><h6 class=\"m-0 font-weight-bold text-primary \">" + arrLang[lang]["LANG_ROUTER_CONFIG"] + "</h6></div><div class=\"card-body\"><div id='flow_window'></div></div></div>"
};

function window_width() {
    var window_width = parseInt($(window).width());
    var width;
    if (window_width > 420) {
        width = 400 + "px";
    } else {
        width = (window_width - 20) + "px";
    }
    return width;
}


function flow_window_init() {
    $("#Static_Route_Add").off("click");
    (function (s) {
        s("tr[name='Static_Route_Select'],#Static_Route_Add").on("click", function (e) {
            layer.open(layer_Edit);
            Flow_Edit_window_list_init();
            Auto_Page_generate(Static_Route_Config_List);
            FMask_init();


            if ($(this).hasClass("justhover")) {
                $("#addRoute").hide();
                $("input[name='select']").val($(this).attr("value"));
                $(this).find("td").each(function (e) {
                    var name = $(this).attr("value");
                    var value = $(this).text();
                    $("input[name=\"" + name + "\"]").val(value);
                    if (name == "enable") {
                        value = $(this).attr("value2");
                        set_obj_data_to_html({
                            "enable": value
                        });
                    }
                    if (name == "interface") {
                        value = $(this).attr("value2");
                        set_obj_data_to_html({
                            "interface": value
                        });
                    }
                })
            } else {
                $("#updateRoute").hide();
                $("#delRoute").hide();
                set_obj_data_to_html({
                    "enable": "1",
                    "interface": "65535"
                })
            }

            $(".layui-layer-page").each(function (e) {
                var height = parseInt($(this).find(".shadow").css("height"));
                if (height <= 500) {
                    $(this).height(height + "px");
                } else {
                    $(this).height("500px");
                }
            });
        })
    })(jQuery);
}


function Static_Table_init() {
    var data = OneForAll("getASPdata/showStaticRoute", 5, 0, 0, 0);
    $("#Static_Route_List").empty();
    if (data == "nolist")
        return;
    var data_split = data.split("\n");
    for (var i in data_split) {
        var temp = data_split[i];
        if (temp.indexOf("list") == -1)
            return;
        var name = temp.substring(0, temp.indexOf("="));
        var value = temp.substring(temp.indexOf("=") + 1);
        var value_split = value.split("&");
        var state;
        if (value_split[1] == "1") {
            state = arrLang[lang]["LANG_ENABLE"];
        } else {
            state = arrLang[lang]["LANG_DISABLE"];
        }
        $("#Static_Route_List").append(
            "<tr id=\"" + name + "\" value=\"" + value_split[0] + "\" action=\"" + "updateRoute" + "\" class=\"justhover\" name=\"Static_Route_Select\">" +
            "<td value=\"" + "enable" + "\" value2=\"" + value_split[1] + "\">" + state + "</td>" +
            "<td value=\"" + "destNet" + "\">" + value_split[2] + "</td>" +
            "<td value=\"" + "subMask" + "\">" + value_split[3] + "</td>" +
            "<td value=\"" + "nextHop" + "\">" + value_split[4] + "</td>" +
            "<td value=\"" + "metric" + "\">" + value_split[5] + "</td>" +
            "<td value=\"" + "interface" + "\" value2=\"" + value_split[7] + "\">" + value_split[6] + "</td>" +
            "</tr>"
        )
    }
}


function Route_Table_init() {
    var list = {
        id: "Route_table_tmp",
        name: arrLang[lang]["LANG_IP_ROUTE_TABLE"],
        height: "400px",
        width: "600px",
    }
    flow_table_generate(list);
    var Route_Table = {
        "length": 1,
        1: [
            ["Route_table_tmp", 0],
            ["append", "<div class=\"table-responsive\">\
            <table class=\"table table-bordered table-striped\">\
            <thead>\
                <tr>\
                    <th>" + arrLang[lang]["LANG_DESTINATION"] + "</th>\
                    <th>" + arrLang[lang]["LANG_SUBNET_MASK"] + "</th>\
                    <th>" + arrLang[lang]["LANG_GATEWAY"] + "</th>\
                    <th>" + arrLang[lang]["LANG_INTERFACE"] + "</th>\
                    <th>" + arrLang[lang]["LANG_METRIC"] + "</th>\
                </tr>\
            </thead>\
            <tbody id=\"route_table\"></tbody>\
        </table>\
        </div>"],
        ]
    }
    Auto_Page_generate(Route_Table);
    var data = OneForAll("getASPdata/routeList", 5, 0, 0, 0);
    if (data.indexOf("=") == -1) {
        console.log(data);
        return;
    }
    var data_split = data.split("\n");
    for (var i in data_split) {
        var temp = data_split[i];
        if (temp.indexOf("=") != -1) {
            var value = temp.substring(temp.indexOf("=") + 1).split("&");
            $("#route_table").append("<tr>" +
                "<td>" + value[0] + "</td>" +
                "<td>" + value[1] + "</td>" +
                "<td>" + value[2] + "</td>" +
                "<td>" + value[3] + "</td>" +
                "<td>" + value[4] + "</td>" +
                "</tr>")
        }
    }
}

$(document).ready(function () {
    Network_Route_Page_List_init();
    Auto_Page_generate(Network_Route_Page);
    RIP_table_Page_init();
    set_obj_data_to_html({
        "rip_on": Page_data["rip_on"],
        "rip_if": "65535",
        "receive_mode": "0",
        "send_mode": "0"
    });
    Static_Table_init();
    flow_window_init();
    Global_click_monitoring();
})
