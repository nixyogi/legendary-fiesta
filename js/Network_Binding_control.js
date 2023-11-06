function network_binding_page_init() {
    $("#container").append("<div class=\"row\">      \
    <div id=\"WAN_row\" class=\"col-lg-8\">\
        <div class=\"card shadow mb-4 col-lg-push-1\">\
            <div class=\"card-header py-3 \">\
                <h6 class=\"m-0 font-weight-bold text-primary lang\" key=\"LANG_BIND_CONFIG\">" + L("LANG_BIND_CONFIG") + "</h6>\
            </div>\
            <div class=\"card-body\">\
                <table id=\"binding_table\" class=\"table table-bordered table-striped\">\
                    <tr>\
                        <th width=\"180px\" class=\"lang\" key=\"LANG_PORT\">" + L("LANG_PORT") + "</th>\
                        <th width=\"300px\" class=\"lang\" key=\"LANG_BIND_MODE\">" + L("LANG_BIND_MODE") + "</th>\
                        <th width=\"540px\"><span>VLAN </span><span class=\"lang\"\
                                key=\"LANG_BIND\">" + L("LANG_BIND") + "</span>\
                        </th>\
                        <th width=\"120px\" class=\"lang\" key=\"LANG_EDIT\">" + L("LANG_EDIT") + "\
                        </th>\
                    </tr>\
                </table>\
            </div>\
        </div>\
    </div>\
</div>");

    var just_this;
    var index;

    function text_input_init() {
        var content = "";
        var hidden_input = "<input type=\"hidden\" name=\"if_index\" value=\"" + index + "\">";
        for (var i = 0; i < 4; i++) {
            var text_input = "<table class=\"input_tap\" style=\"display:none;line-height: 50px;\">\
                                <tbody>\
                                    <tr>\
                                        <td width=\"200px\">\
                                            <div><input type=\"text\" name=\"Frm_VLAN" + i + "a\" class=\"form-control\"\
                                                    ></div>\
                                        </td>\
                                        <td width=\"5px\">/</td>\
                                        <td width=\"200px\">\
                                            <div><input type=\"text\" name=\"Frm_VLAN" + i + "b\" class=\"form-control\"\
                                                    ></div>\
                                        </td>\
                                    </tr>\
                                </tbody>\
                            </table>";
            content += text_input;
        }
        content += hidden_input;

        just_this = {
            "length": 1,
            1: [
                ["#flow_window", 0, 2],
                ["form", "binding_form", "action=\"/boaform/getASPdata/formVlanMapping\" method=\"post\""],
                ["menu", "mode_choose", "arrLang[lang][\"LANG_BIND_MODE\"]", "Frm_Mode", [
                    ["0", "arrLang[lang][\"LANG_BIND\"],arrLang[lang][\"LANG_PORT\"]"],
                    ["1", "VLAN ,arrLang[lang][\"LANG_BIND\"]"],
                ]],
                ["append", content],
                ["append", "<br>"],
                ["submit", "binding_vlan", pageCheckValue],

            ]
        };
    }

    function pageCheckValue() {
        var vlan_str=";";
        if ($("input[name='Frm_Mode']").val() == "0") {
            return true;
        }
        for (var i = 0; i < 4; i++) {
            var a = "input[name=\"Frm_VLAN" + i + "a\"]";
            var b = "input[name=\"Frm_VLAN" + i + "b\"]";
            var vlan_a = $(a).val();
            var vlan_b = $(b).val();
            if (vlan_a.length == 0 && vlan_b.length == 0) {
                continue;
            }
            if (vlan_a.length == 0 || vlan_b.length == 0) {
                var tar = a;
                if (vlan_a.length) {
                    tar = b;
                }
                MyAlert(arrLang[lang]["LANG_NET_VLAN_MAPPING_ERR_1"]);
                $(tar).focus();
                return false;
            }
            var check_vlan = new_check_vlan(vlan_a);
            if (!check_vlan[0]) {
                MyAlert(eval(check_vlan[1]));
                $(a).focus();
                return false;
            }
            check_vlan = new_check_vlan(vlan_b);
            if (!check_vlan[0]) {
                MyAlert(eval(check_vlan[1]));
                $(b).focus();
                return false;
            }
            var pair_str=vlan_a+"/"+vlan_b;
            if(vlan_str&&vlan_str.indexOf(pair_str) !=-1){
                MyAlert(arrLang[lang]["LANG_NET_VLAN_MAPPING_ERR_3"]);
                $(a).focus();
                return false;
            }
            vlan_str=vlan_str+pair_str+";";
        }
        return true;
    }


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


    var layer_I = {
        id: "ceng",
        type: 1,
        title: false,
        closeBtn: 1,
        area: [window_width(), "500px"],
        shadeClose: true,
        content: ""
    };

    function show_text_init() {
        (function (s) {
            $(".mode_choose").on("click", function (e) {
                if ($(this).attr("value") == "1") {
                    $(".input_tap").show();
                } else {
                    $(".input_tap").hide();
                }
            })
        })(jQuery);
    }

    function flow_window_init() {
        (function (s) {
            s(".fa-wrench").on("click", function (e) {
                var name = $(this).parents("tr").children("td").eq(0).text();
                layer_I.content = "<div class=\"card shadow mb-4 col-lg-push-1\"><div class=\"card-header py-3 \"><h6 class=\"m-0 font-weight-bold text-primary \">" + name + "</h6></div><div class=\"card-body\"><div id='flow_window'></div></div></div>";
                layer.open(layer_I);
                name = name.toString();
                name = name.match(/[A-Z]{3,4}[0-9]/);
                index = port_index_mapping[name];
                text_input_init();
                Auto_Page_generate(just_this);
                FMask_init();
                show_text_init();

                $(".layui-layer-page").each(function (e) {
                    var height = parseInt($(this).find(".shadow").css("height"));
                    if (height <= 500) {
                        $(this).height(height + "px");
                    } else {
                        $(this).height("500px");
                    }
                });

                set_list_to_flow_Page(index);
                $("#binding_form").ajaxForm(function (data) {
                    FMask_init();
                    if (data == "success") {
                        $("#waiting_animation").hide();
                        Page_data = OneForAll("getASPdata/initPagePBind", 5, 0, 0, 0);
                        Page_data_init();
                        MyAlert(arrLang[lang]["LANG_SUBMIT_SUCCESS"]);
                        $(".layui-layer-close2").click();
                    } else {
                        $("#waiting_animation").hide();
                        MyAlert("ERROR");
                        console.log(data);
                    }
                })
            })

            s(window).on('resize', function (e) {
                layer_I.area[0] = window_width();
            })
        })(jQuery);
    }

    function Binding_table_init() {
        var data = OneForAll("getASPdata/new_ShowPortMapping", 5, 0, 0);

        // var data_split = data.split("/");
        // var content1 = "";
        // var content2 = "";
        // for (var i in data_split) {
        //     var temp = data_split[i];
        //     if (temp.indexOf("SSID") != -1) {
        //         var name = temp;
        //         if (name.indexOf("2") != -1 || name.indexOf("3") != -1 || name.indexOf("4") != -1) {
        //             content1 += "<tr id=\"" + name + "\"><td>" + name + "</td><td></td><td></td><td><i class=\"fa fa-wrench\" aria-hidden=\"true\"></i></td></tr>";
        //         } else {
        //             content2 += "<tr id=\"" + name + "\"><td>" + name + "</td><td></td><td></td><td><i class=\"fa fa-wrench\" aria-hidden=\"true\"></i></td></tr>";
        //         }
        //     }
        // }
        // $("#SSID1").after(content1);
        // $("#SSID5").after(content2);

        var content = "";
        var obj = {};
        Page_data_obj_init(obj, data);
        for (var key in obj) {
            if (key.indexOf("SSID") == -1) //only show lan
            {
                content = "<tr id=\"" + key + "\"><td>" + key + "</td><td></td><td></td><td><i class=\"fa fa-wrench\" aria-hidden=\"true\"></i></td></tr>";
                $("#binding_table").append(content);

                if (obj[key] == "0") {
                    $(key).hide();
                }
            }
        }
    }

    var port_index_mapping = {
        "0": "#LAN1",
        "1": "#LAN2",
        "2": "#LAN3",
        "3": "#LAN4",

        "LAN1": "0",
        "LAN2": "1",
        "LAN3": "2",
        "LAN4": "3",
    }

    var mode_key_mapping = {
        "0": arrLang[lang]["LANG_BIND"] + " " + arrLang[lang]["LANG_PORT"],
        "1": "VLAN " + arrLang[lang]["LANG_BIND"],
    }

    function Page_data_init() {
        var data = Page_data;

        var data_split = data.split("\n");
        for (var i = 0; i < data_split.length; i++) {
            var temp = data_split[i];
            if (temp.indexOf("=") != -1) {
                var id = port_index_mapping[temp.substring(0, temp.indexOf("_"))];
                var mode = temp.substring(temp.indexOf("=") + 1);
                var vlan_list;
                if (mode == "1") {
                    mode = mode_key_mapping[mode];
                    $(id).find("td").eq(1).text(mode);
                    i++;
                    temp = data_split[i];
                    vlan_list = temp.substring(temp.indexOf("=") + 1);
                    $(id).find("td").eq(2).text(vlan_list);
                } else {
                    mode = mode_key_mapping[mode];
                    $(id).find("td").eq(1).text(mode);
                    $(id).find("td").eq(2).text("");
                }
            }
        }
    }

    function set_list_to_flow_Page(num) {
        var data = Page_data;

        var data_split = data.split("\n");
        for (var i in data_split) {
            var temp = data_split[i];
            if (temp.substring(0, temp.indexOf("_")) != num) {
                continue;
            }
            var mode = temp.substring(temp.indexOf("=") + 1);
            var vlan_list;
            $(".mode_choose[value=\"" + mode + "\"]").click();
            if (mode == "1") {
                i++;
                temp = data_split[i];
                vlan_list = temp.substring(temp.indexOf("=") + 1);
                vlan_list = vlan_list.split(";");
                for (var j in vlan_list) {
                    var tmp = vlan_list[j];
                    if (tmp.indexOf("/") == -1) {
                        break;
                    } else {
                        tmp = tmp.split("/");
                        $("input[name=\"Frm_VLAN" + j + "a\"]").val(tmp[0]);
                        $("input[name=\"Frm_VLAN" + j + "b\"]").val(tmp[1]);
                    }
                }
            }
            return;
        }
    }

    var test_data = "0_mode=1\n0_Binding=123/321;23/232\n1_mode=0\n2_mode=0\n3_mode=0\n4_mode=0\n5_mode=0\n6_mode=0\n7_mode=0\n8_mode=0\n9_mode=0\n10_mode=0\n11_mode=0\n12_mode=0\n13_mode=0\n";
    var Page_data;


    Page_data = OneForAll("getASPdata/initPagePBind", 5, 0, 0, 0);

    Binding_table_init();

    Page_data_init();
    flow_window_init();
}












$(document.ready).ready(function () {
    network_binding_page_init();
});
