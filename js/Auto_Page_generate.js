
function base_control_js_generate(space, switch_std, check_Func) {
    if (space.indexOf("#") == -1 && space.indexOf(".") == -1) {
        space = "#" + space;
    }

    tar = $(space);
    var std;
    if (switch_std == 1)
        std = ["OFF", "ON"];
    else if (switch_std == 2)
        std = ["0", "1"];
    else if (switch_std == undefined)
        alert("base_control_js_generate missing parameter");
    else
        std = switch_std;

    tar.find(".btn-group").each(function (e) {
        var input = $(this).next("input");
        var click_tar = $(this).find(".btn");
        (function (s) {
            s(click_tar).on("click", function (e) {
                var val = s(this).attr("value");
                input.val(val);
                $(this).addClass("btn-primary");
                $(this).removeClass("btn-light");
                $(this).nextAll(".btn").addClass("btn-light");
                $(this).nextAll(".btn").removeClass("btn-primary");
                $(this).prevAll(".btn").addClass("btn-light");
                $(this).prevAll(".btn").removeClass("btn-primary");
            })
        })(jQuery);
    });

    tar.find(".dropdown-menu").each(function (e) {
        var Link_name = $(this).attr("aria-labelledby");
        var click_tar = "." + Link_name.substring(0, Link_name.length - 5);
        var change_tar = "#" + Link_name;
        var input = $(this).parents("table").find("input");
        (function (s) {
            s(click_tar).on("click", function (e) {
                var val = s(this).attr("value");
                input.val(val);
                var text = s(this).text();
                s(change_tar).text(text);
            })
        })(jQuery);
    })

    tar.find(".switch-3d").each(function (e) {
        var switch_self = $(this).find("input");
        var input = $(this).parents("table").find("input[type='hidden']");
        (function (s) {
            switch_self.on("click", function (e) {
                if (s(this).prop("checked") == true)
                    input.val(std[1]);
                else
                    input.val(std[0]);
            })
        })(jQuery);
    })

    tar.find(".submit_button").each(function (e) {
        var form_id = "#" + tar.find("form").prop("id");
        var button_id = "#" + $(this).prop("id");
        if (check_Func == undefined)
            check_input = 1;
        else
            check_input = 0;
        if (check_input == 1) {
            (function (s) {
                s(button_id).on("click", function (e) {
                    $("#waiting_animation").fadeIn("fast");
                    $.ajaxSettings.async = true;
                    s(form_id).submit();
                })
            })(jQuery);
        } else {
            (function (s) {
                s(button_id).on("click", function (e) {
                    if (check_Func(s(this))) {
                        $("#waiting_animation").fadeIn("fast");
                        $.ajaxSettings.async = true;
                        s(form_id).submit();
                    }
                })
            })(jQuery);
        }
    })
}

var Adding_place;
var Page_switch_std;
var ajaxForm_set;
var ajaxForm_id;
var ajaxForm_success_method;
var ajaxForm_fail_method;

var APG = {
    new: function (one_page) {
        const page = {
            "length": 1,
            1: one_page
        };
        return Auto_Page_generate(page);
    },
    new_tbl: function (tb_obj) {
        const tbl_obj = tb_obj;
        if (!this.obj_check("new_tbl", tbl_obj,
            ["direction", "selector", "header", "contain", "origin", "origin_key_word"]))
            return;
        tbl_obj.selector.empty();
        table_generate(tbl_obj);
    },
    new_flow: function (fl_obj) {
        const flow_obj = fl_obj;
        if (!this.obj_check("new_flow", flow_obj, ["id", "name"]))
            return;
        if (flow_obj["click"] != undefined && flow_obj["click_page"] != undefined) {
            flow_obj.click.on("click", function () {
                var page = [
                    [flow_obj.id, 0]
                ];
                for (var i in flow_obj.click_page)
                    page.push(flow_obj.click_page[i]);
                const one_page = page;
                flow_table_generate(flow_obj);
                const PM = APG.new(one_page);
                FMask_init();
                if (flow_obj.init_method!=null) {
                    flow_obj.init_method(PM);
                }
            });
        }
    },
    obj_check: function (func_name, obj, list) {
        var check_flag = 0;
        for (var i in list) {
            if (obj[list[i]] == undefined) {
                console.warn(func_name + " lack of " + list[i]);
                check_flag = 1;
            }
        }
        if (check_flag)
            return false;
        return true;
    }
}

function Auto_Page_generate(Page_List, Interval_width, div_class_col) {
    var content;
    var Page_map = {}
    Adding_place = ".container-fluid";
    var data_length = Page_List["length"];
    if (Interval_width == undefined || Interval_width.length == 0) {
        Interval_width = "200px";
    }
    for (var i = 1; i < data_length + 1; i++) {
        content = "";
        var Data_i = Page_List[i];
        var temp = Table_Build_init(Data_i, content, Interval_width, Page_map);
        content = temp[0];
        check_Func = temp[1];
        content = Card_Row_init(Data_i[0], content, div_class_col);
        $(Adding_place).append(content);
        base_control_js_generate(Data_i[0][0], Page_switch_std, check_Func);
        ajaxForm_init(ajaxForm_success_method, ajaxForm_fail_method);
    }
    Dynamic_wrap();
    passwd_show_function_init();
    return temp[2];
}

function Card_Row_init(data, content, div_class_col) {
    if (data[2] == undefined) {
        Page_switch_std = 1;
    } else
        Page_switch_std = data[2];

    if (div_class_col == undefined || div_class_col.length == 0)
        div_class_col = "col-lg-8";

    if (data[1] == 0) {
        Adding_place = data[0];
        if (Adding_place.indexOf("#") == -1 && Adding_place.indexOf(".") == -1)
            Adding_place = "#" + Adding_place;
        return content;
    } else {
        Adding_place = ".container-fluid";
    }
    var head_id = data[0];
    if (head_id.substring(0, 1).indexOf("#") != -1)
        head_id = head_id.substring(1);
    var head_key = Key_data_process(data[1]);
    content = "<div id=\"" + head_id + "\"class=\"row\" ><div class=\"" + div_class_col + "\"><div class=\"card shadow mb-4 col-lg-push-1\"><div class=\"card-header py-3\"><h6 class=\"m-0 font-weight-bold text-primary\">" + head_key + "</h6></div><div class=\"card-body\">" + content;
    content = content + "</div></div></div></div>"
    return content;
}

function Table_Build_init(data, content, Interval_width, Page_map) {
    var D;
    var form_flag = 0;
    var form_place = 2;
    var check_Func;
    ajaxForm_set = 0;
    ajaxFomr_id = 0;
    ajaxForm_success_method = 0;
    ajaxForm_fail_method = 0;
    if (data.toString().indexOf(",submit,") != -1) {
        form_place = 3;
    }

    Page_map["Method"] = {
        show: function (list) {
            for (var i in list)
                Page_map[list[i]].body(1);
        },
        hide: function (list) {
            for (var i in list)
                Page_map[list[i]].body(0);
        }
    }

    Page_map["Logic"] = function (func) {
        const head_id = data[0][1] != "0" ? ("#" + data[0][0]) : (data[0][0]);
        $(head_id).on("click", function () {
            func();
        });
        func();
    }

    for (var i = 1; i < data.length; i++) {
        D = data[i];
        if (D[0] == "text" || D[0] == "password") {
            var tb_name = D[1];
            var key = Key_data_process(D[2]);
            var input_name = D[3];
            var else_attribute = "";
            if (D.length == 6) {
                else_attribute = D[5];
            }
            const Table_Name_in = "#" + tb_name + "_Table";
            const Value_Name_in = input_name;
            Page_map[input_name] = {
                body: function (action, disabled) {
                    if (action == 1) {
                        $(Table_Name_in).show();
                    } else if (action == 0) {
                        $(Table_Name_in).hide();
                    }
                    if (disabled == true)
                        $("input[name='" + Value_Name_in + "']").prop("disabled", true);
                    else if (disabled == false)
                        $("input[name='" + Value_Name_in + "']").prop("disabled", false);
                    return $(Table_Name_in);
                },
                val: function (value) {
                    if (value == undefined) {
                        return $("input[name='" + Value_Name_in + "']").val();
                    } else {
                        var obj = {}
                        obj[Value_Name_in] = value;
                        set_obj_data_to_html(obj);
                    }
                }
            }
            var type = D[0];
            var length = D[4];
            content += "<div><table id=\"" + tb_name + "_Table\" style=\"line-height: 30px;\"><tbody><tr nowrap=\"\"><th width=\"" + Interval_width + "\" >" + "<div class='abbreviation0'>" + "<span>" + key + "</span>" + "</div>" + "</th><td width=\"200px\"><div><input type=\"" + type + "\" name=\"" + input_name + "\" maxlength=\"" + length + "\" id=\"" + tb_name + "\"" + else_attribute + " class=\"form-control\"></div></td></tr></tbody></table></div>"
        }
        if (D[0] == "textarea") {
            const tb_name = D[1];
            const key = Key_data_process(D[2]);
            const input_name = D[3];
            const else_attribute = (D.length == 5) ? D[4] : "";
            const Table_Name_in = "#" + tb_name + "_Table";
            const Value_Name_in = input_name;
            Page_map[input_name] = {
                body: function (action, disabled) {
                    if (action == 1) {
                        $(Table_Name_in).show();
                    } else if (action == 0) {
                        $(Table_Name_in).hide();
                    }
                    if (disabled == true)
                        $("textarea[name='" + Value_Name_in + "']").prop("disabled", true);
                    else if (disabled == false)
                        $("textarea[name='" + Value_Name_in + "']").prop("disabled", false);
                    return $(Table_Name_in);
                },
                val: function (value) {
                    if (value == undefined) {
                        return $("textarea[name='" + Value_Name_in + "']").val();
                    } else {
                        var obj = {};
                        obj[Value_Name_in] = value;
                        set_obj_data_to_html(obj);
                    }
                }
            }
            content += "<div><table id=\"" + tb_name + "_Table\" style=\"line-height: 30px;\"><tbody><tr nowrap=\"\"><th width=\"" + Interval_width + "\" ><div class='abbreviation0'><span>" + key + "</span></div></th><td width=\"200px\"><div><textarea name=\"" + input_name + "\" id=\"" + tb_name + "\"" + else_attribute + " class=\"form-control\"></textarea></div></td></tr></tbody></table></div>"
        }
        if (D[0] == "switch") {
            var tb_name = D[1];
            var key = Key_data_process(D[2]);
            const input_name = D[3];
            const Table_Name_in = "#" + tb_name + "_Table";
            const Value_Name_in = input_name;
            Page_map[input_name] = {
                body: function (action, disabled) {
                    action = parseInt(action);
                    if (action == 1) {
                        $(Table_Name_in).show();
                    } else if (action == 0) {
                        $(Table_Name_in).hide();
                    }
                    if (disabled == true)
                        $("input[name='" + Value_Name_in + "']").prop("disabled", true);
                    else
                        $("input[name='" + Value_Name_in + "']").prop("disabled", false);
                    return $(Table_Name_in);
                },
                val: function (value) {
                    if (value == undefined) {
                        return $("input[name='" + Value_Name_in + "']").val();
                    } else {
                        var obj = {}
                        obj[Value_Name_in] = value;
                        set_obj_data_to_html(obj);
                    }
                },
                relate: function (list) {
                    if ($(Table_Name_in).css("display") != "none") {
                        for (var i in list) {
                            if (Page_map[input_name].val() == i)
                                Page_map.Method.show(list[i]);
                            else
                                Page_map.Method.hide(list[i]);
                        }
                    }
                }
            }
            content += "<div><table id=\"" + tb_name + "_Table\" style=\"line-height: 30px;\"><tbody><tr nowrap=\"\"><th width=\"" + Interval_width + "\" >" + "<div class='abbreviation0'>" + "<span>" + key + "</span>" + "</div>" + "</th><td width=\"" + Interval_width + "\" ><div><label class=\"switch switch-3d switch-primary\"><input type=\"checkbox\" id=\"" + tb_name + "\" class=\"switch-input\"><span class=\"switch-label\"></span><span class=\"switch-handle\"></span></label></div><input type=\"hidden\" name=\"" + input_name + "\"></td></tr></tbody></table></div>"
        }
        if (D[0] == "menu") {
            var tb_name = D[1];
            var key = Key_data_process(D[2]);
            const input_name = D[3];
            var op_list = D[4];
            const Table_Name_in = "#" + tb_name + "_Table";
            const Option_Name_in = "." + tb_name;
            const Value_Name_in = input_name;
            Page_map[input_name] = {
                body: function (action, disabled) {
                    action = parseInt(action);
                    if (action == 1) {
                        $(Table_Name_in).show();
                    } else if (action == 0) {
                        $(Table_Name_in).hide();
                    }
                    if (disabled == true)
                        $("input[name='" + Value_Name_in + "']").prop("disabled", true);
                    else if (disabled == false)
                        $("input[name='" + Value_Name_in + "']").prop("disabled", false);
                    return $(Table_Name_in);
                },
                op: function (index, action) {
                    if (index == "all") {
                        if (action == 1) {
                            $(Option_Name_in).show();
                        } else if (action == 0) {
                            $(Option_Name_in).hide();
                        }
                        return $(Option_Name_in);
                    } else {
                        index = parseInt(index);
                        if (action == 1) {
                            $(Option_Name_in).eq(index).show();
                        } else if (action == 0) {
                            $(Option_Name_in).eq(index).hide();
                        }
                        return $(Option_Name_in).eq(index);
                    }
                },
                val: function (value) {
                    if (value == undefined) {
                        return $("input[name='" + Value_Name_in + "']").val();
                    } else if (value == "-name") {
                        return $(Option_Name_in + "[value=\"" + $("input[name='" + Value_Name_in + "']").val() + "\"]").text();
                    } else {
                        var obj = {}
                        obj[Value_Name_in] = value;
                        set_obj_data_to_html(obj);
                    }
                },
                relate: function (list) {
                    if ($(Table_Name_in).css("display") != "none") {
                        for (var i in list) {
                            if (Page_map[input_name].val() == i)
                                Page_map.Method.show(list[i]);
                            else
                                Page_map.Method.hide(list[i]);
                        }
                    }
                }
            }
            content += "<div><table id=\"" + tb_name + "_Table\" style=\"line-height: 30px;\"><tbody><tr nowrap=\"\"><th width=\"" + Interval_width + "\" >" + "<div class='abbreviation0'>" + "<span>" + key + "</span>" + "</div>" + "</th><td width=\"" + Interval_width + "\" ><div class=\"dropdown\"><a class=\"btn btn-light dropdown-toggle\"  role=\"button\" id=\"" + tb_name + "_Link\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"></a><div class=\"dropdown-menu shadow-sm\" style=\"line-height:30px;\"aria-labelledby=\"" + tb_name + "_Link\">";
            for (var k = 0; k < op_list.length; k++) {
                var op = op_list[k];
                content += "<a class=\"dropdown-item " + tb_name + "\"  value=\"" + op[0] + "\">" + Key_data_process(op[1]) + "</a>";
            }
            content += "</div></div></td><input type=\"hidden\" name=\"" + input_name + "\"></tr></tbody></table></div>";
        }
        if (D[0] == "tips") {
            var element = D[1];
            var render = D[2];
            var tips_word = Key_data_process(D[3]);
            content += "<" + element + " " + render + ">" + tips_word + "</" + element + ">";
        }
        if (D[0] == "hidden") {
            var hidden_name = D[1];
            var hidden_value = D[2];
            content += "<input type=\"hidden\" name=" + hidden_name + " value=" + hidden_value + ">";
            const Value_Name_in = hidden_name;
            Page_map[hidden_name] = {
                val: function (value) {
                    if (value == undefined) {
                        return $("input[name=\"" + Value_Name_in + "\"]").val();
                    } else {
                        $("input[name=\"" + Value_Name_in + "\"]").val(value);
                    }
                }
            }
        }
        if (D[0] == "btn-group") {
            var tb_name = D[1];
            var key = Key_data_process(D[2]);
            const input_name = D[3];
            var op_list = D[4];
            const Table_Name_in = "#" + tb_name + "_Table";
            const Value_Name_in = input_name;
            Page_map[input_name] = {
                body: function (action, disabled) {
                    action = parseInt(action);
                    if (action == 1) {
                        $(Table_Name_in).show();
                    } else if (action == 0) {
                        $(Table_Name_in).hide();
                    }
                    if (disabled == true)
                        $("input[name='" + Value_Name_in + "']").prop("disabled", true);
                    else if (disabled == false)
                        $("input[name='" + Value_Name_in + "']").prop("disabled", false);
                    return $(Table_Name_in);
                },
                op: function (index) {
                    if (index == "all")
                        return $(Table_Name_in).find(".btn");
                    index = parseInt(index);
                    return $(Table_Name_in).find(".btn").eq(index);
                },
                val: function (value) {
                    if (value == undefined) {
                        return $("input[name='" + Value_Name_in + "']").val();
                    } else {
                        var obj = {}
                        obj[Value_Name_in] = value;
                        set_obj_data_to_html(obj);
                    }
                },
                relate: function (list) {
                    if ($(Table_Name_in).css("display") != "none") {
                        for (var i in list) {
                            if (Page_map[input_name].val() == i)
                                Page_map.Method.show(list[i]);
                            else
                                Page_map.Method.hide(list[i]);
                        }
                    }
                }
            }
            content += "<div><table id=\"" + tb_name + "_Table\" style=\"line-height: 30px;\">\
            <tbody>\
                <tr nowrap=\"\">\
                    <th width=\"" + Interval_width + "\" >" + "<div class='abbreviation0'>" + "<span>" + key + "</span>" + "</div>" + "</th>\
                    <td>\
                        <div class=\"btn-group\">";
            for (var k = 0; k < op_list.length; k++) {
                var op = op_list[k];
                content += "<button id=\"" + tb_name + k + "\" type=\"button\" class=\"btn btn-light\" value=\"" + op[0] + "\">" + Key_data_process(op[1]) + "</button>"
            }
            content += "</div>\
                        <input type=\"hidden\" name=\"" + input_name + "\" >\
                    </td>\
                </tr>\
            </tbody>\
            </table></div>";
        }
        if (D[0] == "submit") {
            var tb_name = D[1];
            if (D.length >= 3)
                check_Func = D[2];
            var button_name = D[3];
            var button_color = D[4];
            if (button_name == undefined)
                button_name = arrLang[lang]["wan_submit"];
            else
                button_name = Key_data_process(button_name);
            if (button_color == undefined)
                button_color = "btn-primary";
            const Table_Name_in = "#" + tb_name;
            Page_map[tb_name] = {
                disabled: function () {
                    $(Table_Name_in).addClass("disabled_button gray_picture");
                },
                enable: function () {
                    $(Table_Name_in).removeClass("disabled_button gray_picture");
                },
            }
            content += "<div class='pt-2'><table style='line-height: 30px;'><tbody><tr nowrap=''><th width='200px'><div class='abbreviation0'><span></span></div></th><td width='200px'>";
            content += "<div id=\"" + tb_name + "_Table" + "\">\
                    <div style=\"max-width: 300px;margin: 0 auto;\"><button type=\"button\" id=\"" + tb_name + "\"\
                            class=\"btn " + button_color + " btn-block btn-round submit_button\">" + button_name + "</button></div>\
                </div>";
            content += "</td></tr></tbody></table></div>";
                
        }
        if (D[0] == "button") {
            var tb_name = D[1];
            var button_name = D[2];
            var button_color = D[3];
            var style = D[4];
            button_name = Key_data_process(button_name);
            if (button_color == undefined)
                button_color = "btn-primary";
            const Table_Name_in = "#" + tb_name;
            Page_map[tb_name] = {
                disabled: function () {
                    $(Table_Name_in).addClass("disabled_button gray_picture");
                },
                enable: function () {
                    $(Table_Name_in).removeClass("disabled_button gray_picture");
                },
            }
            content += "<div class='pt-2'><table style='line-height: 30px;'><tbody><tr nowrap=''><th width='200px'><div class='abbreviation0'><span></span></div></th><td width='200px'>";
            content += "<div id=\"" + tb_name + "_Table" + "\">\
                    <div style=\"max-width: 300px;margin: 0 auto;"+ style + "\"><button type=\"button\" id=\"" + tb_name + "\"\
                            class=\"btn " + button_color + " btn-block btn-round\">" + button_name + "</button></div>\
                </div>";
            content += "</td></tr></tbody></table></div>";
        }
        if (D[0] == "form") {
            var form_id = D[1];
            var other_setting = D[2];
            ajaxForm_set = D[3];
            if (ajaxForm_set == "1") {
                ajaxForm_id = "#" + form_id;
                if (D[4] != undefined) {
                    ajaxForm_success_method = D[4];
                }
                if (D[5] != undefined) {
                    ajaxForm_fail_method = D[5];
                }
            }
            content += "<form " + "id=\"" + form_id + "\" " + other_setting + ">";
            form_flag = 1;
        }
        if (D[0] == "file") {
            var table_id = D[1];
            var file_name = D[2];
            content += "<table><tbody><tr><th><input class=\"lang\" type=\"file\" id=\"" + table_id + "\"key=\"LANG_CHOOSE_FILE\" name=\"" + file_name + "\"></th></tr></tbody></table>";
        }
        if (D[0] == "append") {
            var append = D[1];
            content += append;
        }
        if (i > data.length - form_place) {
            if (form_flag == 1) {
                content += "</form>";
                form_flag = 0;
            }
        }
    }
    return [content, check_Func, Page_map];
}

function Key_data_process(data) {
    var temp = "";
    if (data.indexOf(",") != -1) {
        var data_s = data.split(",");
        for (var i = 0; i < data_s.length; i++) {
            if (data_s[i].indexOf("[lang]") != -1) {
                temp += eval(data_s[i]);
            } else
                temp += data_s[i];
        }
    } else {
        if (data.indexOf("[lang]") != -1)
            temp = eval(data);
        else
            temp = data;
    }
    return temp;
}

function ajaxForm_init(method_Y, method_N) {
    if (ajaxForm_set == "1") {
        const YM = method_Y;
        const NM = method_N;
        $(ajaxForm_id).ajaxForm(function (data) {
            FMask_init();
            if (data == "success") {
                $("#waiting_animation").fadeOut("fast");
                if (YM)
                    YM(data);
                MyAlert(arrLang[lang]["LANG_SUBMIT_SUCCESS"]);
            } else {
                $("#waiting_animation").fadeOut("fast");
                if (NM)
                    NM(data);
                if (L(data)!=data)
                    MyAlert(L(data));
                else
                    console.log(data);
            }
        })
    }
}


function nest_obj_init(data) {
    var data_split = data.split("&");
    var tmp = {};
    for (var i in data_split) {
        var temp = data_split[i];
        if (temp.indexOf("=") != -1) {
            var name = temp.substring(0, temp.indexOf("="));
            var value = temp.substring(temp.indexOf("=") + 1);
            tmp[name] = value;
        }
    }
    return tmp;
}

function get_nest_data_obj(data) {
    var obj = {};
    Page_data_obj_init(obj, data);
    for (var i in obj) {
        obj[i] = nest_obj_init(obj[i]);
    }
    return obj;
}

function set_obj_data_to_html(obj) {
    for (var key in obj) {
        var name = key;
        var data = obj[key];
        var tar = $("input[name=" + name + "]");
        if (tar.length == 0) {
            tar = $("textarea[name=" + name + "]");
            if (tar.length == 0) {
                continue;
            }
        }
        if (tar.prop("type") == "hidden") {
            tar.val(data);
        } else if (tar.prop("type") == "checkbox") {

            if (data == "0")
                tar.prop("checked", false);
            else
                tar.prop("checked", true);
        } else {

            tar.val(data);
        }

        if (tar.parents("table").eq(0).find(".btn-group").length == 1) {
            tar = tar.parents("table").eq(0).find(".btn-group");
            if (tar.find(".btn[value=\"" + data + "\"]").length != 0) {

                tar.next("input").val(data);
                tar = tar.find(".btn[value=\"" + data + "\"]");
                tar.addClass("btn-primary");
                tar.removeClass("btn-light");
                tar.nextAll(".btn").addClass("btn-light");
                tar.nextAll(".btn").removeClass("btn-primary");
                tar.prevAll(".btn").addClass("btn-light");
                tar.prevAll(".btn").removeClass("btn-primary");
            }
        }

        if (tar.parents("table").eq(0).find("div[class='dropdown']").length == 1) {
            tar = tar.parents("table").eq(0).find("div[class='dropdown']");
            if (tar.find("a[value=\"" + data + "\"]").length != 0) {

                tar.children(".dropdown-toggle").text(tar.find("a[value=\"" + data + "\"]").text());
                tar.parents("td").eq(0).next("input").val(data);
            }

        } else if (tar.parents("table").find("input[class='switch-input']").length == 1) {
            if (data == 0) {
                tar.parents("table").find("input[class='switch-input']").prop("checked", false);
                tar.val("0");
            } else {
                tar.parents("table").find("input[class='switch-input']").prop("checked", true);
                tar.val("1");
            }
        }
    }
    return;
}

function flow_window_width_adap(max_width) {
    var window_width = parseInt($(window).width());
    var width;
    if (max_width == undefined) {
        if (window_width > 520) {
            width = 500 + "px";
        } else {
            width = (window_width - 20) + "px";
        }
    } else {
        max_width = parseInt(max_width);
        if (window_width < max_width)
            width = (window_width - 20) + "px";
        else
            width = (max_width - 20) + "px";
    }
    return width;
}


function flow_table_generate(data) {
    if (data["id"] == undefined || data["name"] == undefined) {
        console.error("Lack of parameter in flow_table_generate()");
        return;
    }
    var flow_width = flow_window_width_adap(data["width"]);
    var flow_height = data["height"];
    if (flow_height == undefined) {
        flow_height = "550px";
    }
    var Flow_Page = {
        id: "ceng",
        type: 1,
        title: false,
        closeBtn: 1,
        area: [flow_width, flow_height],
        shadeClose: true,
        content: "<div class=\"card shadow col-lg-push-1\"><div class=\"card-header py-3 \"><h6 class=\"m-0 font-weight-bold text-primary \">" + data["name"] + "</h6></div><div class=\"card-body\"><div id=\"" + data["id"] + "\"></div></div></div>"
    };
    layer.open(Flow_Page);

    $(".layui-layer-page").each(function (e) {
        var height = parseInt($(this).find(".shadow").css("height"));
        if (height <= 500) {
            $(this).height(height + "px");
        } else {
            $(this).height("500px");
        }
    });
}


function table_generate(obj) {
    function check_undefined(name, val) {
        if (val == undefined) {
            console.warn(obj.origin_key_word + ": " + name + " is undefined!");
            return "";
        }
        return val;
    }

    var td_width = "";
    var tr_width = "";
    if (obj["td_width"] != undefined)
        td_width = "style=\"width:" + obj["td_width"] + "\"";
    if (obj["tr_width"] != undefined)
        tr_width = "style=\"width:" + obj["td_width"] + "\"";
    if (obj.header.length != obj.contain.length || obj.header == undefined) {
        console.error("table generate fail");
        return;
    }
    if (obj.direction == 1) {
        var table = "<table id=" + obj.origin_key_word+ "_table class=\"table table-bordered table-striped \" width=\"100%\" cellspacing=\"0\"><tbody>";
        for (var i in obj.header) {
            table += "<tr " + tr_width + "><td " + td_width + "><b>" + obj.header[i] + "</b></td>";
            for (var key in obj.origin) {
                if (key.indexOf(obj.origin_key_word) == -1)
                    continue;
                if (illegal_char_check(obj.origin[key][obj.contain[i]])) {
                    obj.origin[key][obj.contain[i]] = obj.origin[key][obj.contain[i]].replace(/&/g, "&#38;");
                    obj.origin[key][obj.contain[i]] = obj.origin[key][obj.contain[i]].replace(/</g, "&#60;");
                    obj.origin[key][obj.contain[i]] = obj.origin[key][obj.contain[i]].replace(/>/g, "&#62;");
                }
                table += "<td " + td_width + ">" + check_undefined(obj.contain[i], obj.origin[key][obj.contain[i]]) + "</td>"
            }
            table += "</tr>";
        }
        table += "</tbody></table>";
        table = "<div class=\"table-responsive\">" + table + "</div>";
        obj.selector.append(table);
        return;
    }
    if (obj.direction == 0) { //horizon table
        var table = "<table id=" + obj.origin_key_word+ "_table class=\"table table-bordered table-striped\" width=\"100%\" cellspacing=\"0\"><thead><tr " + tr_width + ">";
        for (var i in obj.header) {
            table += "<th>" + obj.header[i] + "</th>"
        }
        table += "</tr></thead><tbody>";
        for (var key in obj.origin) {
            if (key.indexOf(obj.origin_key_word) == -1)
                continue;
            table += "<tr " + tr_width + ">";
            for (var j in obj.contain) {
                if (illegal_char_check(obj.origin[key][obj.contain[j]])) {
                    obj.origin[key][obj.contain[j]] = obj.origin[key][obj.contain[j]].replace(/&/g, "&#38;");
                    obj.origin[key][obj.contain[j]] = obj.origin[key][obj.contain[j]].replace(/</g, "&#60;");
                    obj.origin[key][obj.contain[j]] = obj.origin[key][obj.contain[j]].replace(/>/g, "&#62;");
                }
                table += "<td " + td_width + ">" + check_undefined(obj.contain[j], obj.origin[key][obj.contain[j]]) + "</td>"
            }
            table += "</tr>"
        }
        table += "</tbody></table>";
        table = "<div class=\"table-responsive\">" + table + "</div>";
        obj.selector.append(table);
        if (obj["table_mapping"] != undefined) {
            obj.selector.find("tr").on("click", function () {
                var index = $(this).index();
                $(this).parents("tbody").find("tr").each(function () {
                    if (obj["table_mapping_type"]=="no_only_one") {
                        if (index == $(this).index())
                            $(this).toggleClass("td_select");
                    } else {
                        if (index == $(this).index())
                            $(this).toggleClass("td_select");
                        else
                            $(this).removeClass("td_select");
                    }
                });
                var i = 0;
                var td_data = {};
                $(this).find("td").each(function () {
                    td_data[i] = $(this).text();
                    i++;
                });
                i = 0;
                for (var j in obj.table_mapping) {
                    if (typeof(obj.table_mapping[j])=='function') {
                        obj.table_mapping[j]($(this).hasClass("td_select"), td_data[i]);
                    } else if (obj.table_mapping[j] != undefined && obj.table_mapping[j].length != 0) {
                        if ($(this).hasClass("td_select"))
                            obj.table_mapping[j].val(td_data[i]);
                        else
                            obj.table_mapping[j].val("");
                    }
                    i++;
                }
            });
            obj.selector.find("tbody").find("tr").addClass("justhover");
        }
        return;
    }
}

function table_generate_progress(obj) {
    function check_undefined(name, val) {
        if (val == undefined) {
            console.warn(obj.origin_key_word + ": " + name + " is undefined!");
            return "";
        }
        return val;
    }

    var td_width = "";
    var tr_width = "";
    if (obj["td_width"] != undefined)
        td_width = "style=\"width:" + obj["td_width"] + "\"";
    if (obj["tr_width"] != undefined)
        tr_width = "style=\"width:" + obj["td_width"] + "\"";
    if (obj.header.length != obj.contain.length || obj.header == undefined) {
        console.error("table generate fail");
        return;
    }
    if (obj.direction == 1) {
        var table = "<table class=\"table table-bordered table-striped\" width=\"100%\" cellspacing=\"0\"><tbody>";
        for (var i in obj.header) {
            table += "<tr " + tr_width + "><td " + td_width + "><b>" + obj.header[i] + "</b></td>";
            for (var key in obj.origin) {
                if (key.indexOf(obj.origin_key_word) == -1)
                    continue;
                if (illegal_char_check(obj.origin[key][obj.contain[i]])) {
                    obj.origin[key][obj.contain[i]] = obj.origin[key][obj.contain[i]].replace(/&/g, "&#38;");
                    obj.origin[key][obj.contain[i]] = obj.origin[key][obj.contain[i]].replace(/</g, "&#60;");
                    obj.origin[key][obj.contain[i]] = obj.origin[key][obj.contain[i]].replace(/>/g, "&#62;");
                }
		  var bar_raito = check_undefined(obj.contain[i], obj.origin[key][obj.contain[i]]);
		  if(bar_raito < 10){
		  	  bar_raito += "%";
	                table += "<td " +  ">" + "<div class='progress-bar progress-bar-striped progress-bar-animated' style='border-radius:5px; width:" + bar_raito 
				   + "'>&nbsp;</div>" + bar_raito + "</td>";
	  	 }else{
		  	  bar_raito += "%";
	                table += "<td " +  ">" + "<div class='progress-bar progress-bar-striped progress-bar-animated' style='border-radius:5px; width:" + bar_raito 
				   + "'>" + bar_raito + "</div></td>";
		 }
            }
            table += "</tr>";
        }
        table += "</tbody></table>";
        table = "<div class=\"table-responsive\">" + table + "</div>";
        obj.selector.append(table);
        return;
    }

}
