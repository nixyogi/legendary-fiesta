

function family_group_management_init() {
    function get_sta_info (str) {
        var sta_info = {};
        var str_list = str.split("\n");
        for (i in str_list) {
            var param_list = str_list[i].split("&");
            var host_name = ""
            for (j in param_list) {
                var key_value = param_list[j].split("=");
                var key = key_value[0];
                var value = key_value[1];
                if (key=="host" && value.length!=0 && sta_info[value]==null) {
                    host_name = value;
                    sta_info[host_name] = {};
                }
                if (sta_info[host_name]!=null && key.length!=0) {
                    if (key=="family_index") {
                        sta_info[host_name][key] = parseInt(value);
                    } else {
                        sta_info[host_name][key] = value;
                    }
                }
            }
        }
        return sta_info;
    }
    

    function refresh_family_list() {
        
        var sta_info_str = getASPdata("getAllCliInfo");
//         var sta_info_str = "\
// host=Redmi-K50&ip=192.168.1.3&mac=42:26:bf:d6:9e:02&is_global_mac=0&download_rate=6&upload_rate=25&traffic_statistics=9&download_limit=0&upload_limit=0&link_time=4&linkSSID=FTTH_23D308_5G&online=1&family_index=1&ban=0&mcs_rx_rate=OFDM_54M 54&mcs_tx_rate=OFDM_54M 54&rssi=-22&snr=0&\n\
// host=Redmi-K33&ip=192.168.1.4&mac=41:26:bf:d6:9e:02&is_global_mac=0&download_rate=6&upload_rate=25&traffic_statistics=9&download_limit=0&upload_limit=0&link_time=4&linkSSID=FTTH_23D308_5G&online=1&family_index=2&ban=0&mcs_rx_rate=OFDM_54M 54&mcs_tx_rate=OFDM_54M 54&rssi=-22&snr=0&\n\
// host=Redmi-K00&ip=192.168.1.5&mac=40:26:bf:d6:9e:02&is_global_mac=0&download_rate=6&upload_rate=25&traffic_statistics=9&download_limit=0&upload_limit=0&link_time=4&linkSSID=FTTH_23D308_5G&online=1&family_index=0&ban=0&mcs_rx_rate=OFDM_54M 54&mcs_tx_rate=OFDM_54M 54&rssi=-22&snr=0&\n";
        
        var sta_info = get_sta_info(sta_info_str);

        var fml_info  = JSON.parse(getASPdata("get_fml_info"));
        // var fml_info = {
        //     "1" : {
        //         "family_name" : "A_Family",
        //         "family_index" : "1",
        //     },
        //     "2": {
        //         "family_name" : "B_Family",
        //         "family_index" : "2",
        //     }
        // };
        
        var url_info = JSON.parse(getASPdata("get_fml_url_info"));
        // var url_info = {
        //     ["0"] : {
        //         "family_index" : "1",
        //         "url" : "www.giao00.com",
        //         "url_limit_type" : "1",
        //     },
        //     ["1"] : {
        //         "family_index" : "1",
        //         "url" : "www.giao11.com",
        //         "url_limit_type" : "1",
        //     },
        //     ["3"] : {
        //         "family_index" : "2",
        //         "url" : "www.giao22.com",
        //         "url_limit_type" : "1",
        //     },
        //     ["4"] : {
        //         "family_index" : "2",
        //         "url" : "www.giao33.com",
        //         "url_limit_type" : "1",
        //     },
        // }

        var date_info = JSON.parse(getASPdata("get_fml_date_info"));
        // var date_info = {
        //     0 : {
        //         family_index : "1",
        //         date_week : 0,
        //         on_time : 47800,
        //         off_time : 86340,
        //     },
        //     1 : {
        //         family_index : "2",
        //         date_week : 0,
        //         on_time : 47800,
        //         off_time : 86340,
        //     },
        // }

        $(".layui-layer-close").click(); //close flow window
        $("#family_group_list").empty(); //clear old page
        $("#family_group_list").append("\
        <div class=\"table-responsive\">\
            <table id=\"family_group_list_table\" class=\"table table-bordered table-striped\" width=\"100%\" cellspacing=\"0\">\
                <thead>\
                    <tr>\
                        <th>Family Group</th>\
                        <th>Family Group Member</th>\
                        <th>URL Rules</th>\
                        <th>Time Rules</th>\
                        <th>Del Family Group</th>\
                    </tr>\
                </thead>\
            </table>\
        </div>");

        for (i in fml_info) {
            const sel_fml = fml_info[i]; //select family
            $("#family_group_list_table").append("\
                <tbody>\
                    <td>"+fml_info[i].family_name+"</td>\
                    <td>\
                        <div style=\"display: inline;\">\
                            <button type=\"button\" id=\"list_fml_mem"+fml_info[i].family_index+"\" class=\"btn btn-info btn-round\" style=\"font-size: 12px; margin-right: 3px; width:40px;\">List</button>\
                        </div>\
                        <div style=\"display: inline;\">\
                            <button type=\"button\" id=\"fml_mem_edit"+fml_info[i].family_index+"\" class=\"btn btn-primary btn-round\" style=\"font-size: 12px; margin-right: 3px; width:40px;\">Edit</button>\
                        </div>\
                    </td>\
                    <td>\
                        <div style=\"display: inline;\">\
                            <button type=\"button\" id=\"fml_rule_edit"+fml_info[i].family_index+"\" class=\"btn btn-primary btn-round\" style=\"font-size: 12px;  width:40px;\">Edit</button>\
                        </div>\
                    </td>\
                    <td>\
                        <div style=\"display: inline;\">\
                            <button type=\"button\" id=\"fml_time_edit"+fml_info[i].family_index+"\" class=\"btn btn-primary btn-round\" style=\"font-size: 12px;  width:40px;\">Edit</button>\
                        </div>\
                    </td>\
                    <td>\
                        <div style=\"display: inline;\">\
                            <button type=\"button\" id=\"fml_group_del"+fml_info[i].family_index+"\" class=\"btn btn-danger btn-round\" style=\"font-size: 12px;  width:40px;\">Del</button>\
                        </div>\
                    </td>\
                </tbody>\
            ");

            //show family members
            APG.new_flow({
                id: "fml_list_page"+sel_fml.family_index,
                name: fml_info[i].family_name+" Members List",
                width: "500",
                click: $("#list_fml_mem"+sel_fml.family_index),
                click_page: [
                    ["append", "<div id='family_member_list' class=\"table-striped\"></div>"]
                ],
                init_method: function () {
                    var select_sta_info = {};
                    for (j in sta_info) {
                        if (sta_info[j].family_index==sel_fml.family_index) {
                            select_sta_info["sta_info_"+j] = sta_info[j];
                        }
                    }
                    //console.log(select_sta_info);
                    APG.new_tbl({
                        "direction": "0",
                        "selector": $("#family_member_list"),
                        "header": ["Host Name", "IP", "MAC"],
                        "contain": ["host", "ip", "mac"],
                        "origin": select_sta_info,
                        "origin_key_word": "sta_info_",
                    });
                }
            });

            //edit family members
            var gen_fml_mems_json_func = undefined
            function gen_fml_mems_json() {
                return gen_fml_mems_json_func();
            }
            APG.new_flow({
                id: "fml_add_mem_page"+sel_fml.family_index,
                name: fml_info[i].family_name+" Select Members",
                width: "500",
                click: $("#fml_mem_edit"+sel_fml.family_index),
                click_page: [
                    ["form", "edit_fml_mems", "action=\"/boaform/getASPdata/form_fml_config_set\" method=\"POST\"", "1", refresh_family_list, refresh_family_list],
                    ["hidden", "config_json", ""],
                    ["append", "<div id='family_avaliable_mems_list' class=\"table-striped\"></div>"],
                    ["submit", "fml_mem_submit", gen_fml_mems_json]
                ],
                init_method: function () {
                    var add_json = {
                        family_index : sel_fml.family_index,
                        family_name : sel_fml.family_name,
                        member_list : "",
                    }
                    function gen_json_str() {
                        $("input[name='config_json']").val(JSON.stringify(add_json));
                        return true;
                    }
                    gen_fml_mems_json_func = gen_json_str;
                    function edit_fml_mem_json(is_add, mac) {
                        if (is_add) {
                            add_json.member_list += mac+",";
                        } else {
                            add_json.member_list = add_json.member_list.replace(mac+",", "");
                        }
                    }
                    var select_sta_info = {};
                    for (j in sta_info) {
                        select_sta_info["sta_info_"+j] = sta_info[j];
                        if (sta_info[j].family_index!=0) {
                            for (k in fml_info) {
                                if (sta_info[j].family_index == fml_info[k].family_index) {
                                    select_sta_info["sta_info_"+j]["belongs"] = fml_info[k].family_name;
                                    break;
                                }
                            }
                        } else {
                            select_sta_info["sta_info_"+j]["belongs"] = "none";
                        }
                    }
                    //console.log(select_sta_info);
                    APG.new_tbl({
                        "direction": "0",
                        "selector": $("#family_avaliable_mems_list"),
                        "header": ["Host Name", "IP", "MAC", "Belongs"],
                        "contain": ["host", "ip", "mac", "belongs"],
                        "origin": select_sta_info,
                        "origin_key_word": "sta_info_",
                        "table_mapping" : ["", "", edit_fml_mem_json, ""],
                        "table_mapping_type" : "no_only_one",
                    });
                    $("#family_avaliable_mems_list").find(".justhover").each(function(){
                        if($(this).find("td").eq(3).text()==sel_fml.family_name) {
                            $(this).click();
                        }
                    });
                }
            });

            //edit family group url rules
            function gen_fml_url_add_json() {
                if ($("input[name='add_url_rules']").val().length==0) {
                    MyAlert("Url can't be empty");
                    return false
                }
                var rules_num = 0;
                var add_json = {
                    family_index : sel_fml.family_index,
                    family_name : sel_fml.family_name,
                    url_list : {},
                }
                for (j in url_info) {
                    if (url_info[j].family_index==sel_fml.family_index) {
                        add_json.url_list[rules_num]={}
                        add_json.url_list[rules_num]["url"] = url_info[j]["url"];
                        add_json.url_list[rules_num]["url_limit_type"] = "0";
                        rules_num++;
                    }
                }
                add_json.url_list[rules_num]={}
                add_json.url_list[rules_num]["url"] = $("input[name='add_url_rules']").val();
                add_json.url_list[rules_num]["url_limit_type"] = "0";
                $("input[name='config_json']").val(JSON.stringify(add_json));
                return true;
            }
            function gen_fml_url_del_json() {
                var rules_num = 0;
                var del_json = {
                    family_index : sel_fml.family_index,
                    family_name : sel_fml.family_name,
                    url_list : {},
                }
                $("#family_current_url_rules").find(".justhover").each(function(){
                    if (!$(this).hasClass("td_select")) {
                        del_json.url_list[rules_num]={};
                        del_json.url_list[rules_num]["url"] = $(this).find("td").eq(0).text();
                        del_json.url_list[rules_num]["url_limit_type"] = "0";
                        rules_num++;
                    }
                })
                $("input[name='config_json']").val(JSON.stringify(del_json));
                $("#waiting_animation").fadeIn("fast");
                $.ajaxSettings.async = true;
                $("#edit_fml_url").submit();
            }
            APG.new_flow({
                id: "fml_edit_fml_url_rules_page"+sel_fml.family_index,
                name: fml_info[i].family_name+" Url Rules",
                width: "500",
                click: $("#fml_rule_edit"+sel_fml.family_index),
                click_page: [
                    ["form", "edit_fml_url", "action=\"/boaform/getASPdata/form_fml_config_set\" method=\"POST\"", "1", refresh_family_list, refresh_family_list],
                    ["hidden", "config_json", ""],
                    ["append", "<div id='family_current_url_rules' class=\"table-striped\"></div>"],
                    ["text", "add_url_rules", "Add Url to Black List", "add_url_rules", "30"],
                    ["submit", "fml_url_add_submit", gen_fml_url_add_json, "Add Rules"],
                    ["button", "fml_url_del_submit", "Delete Selected", "btn-danger"],
                ],
                init_method: function () {
                    var select_url_info = {};
                    for (j in url_info) {
                        if (url_info[j].family_index==sel_fml.family_index) {
                            select_url_info["url_"+j]={};
                            select_url_info["url_"+j]["url"] = url_info[j]["url"];
                        }
                    }
                    APG.new_tbl({
                        "direction": "0",
                        "selector": $("#family_current_url_rules"),
                        "header": ["Url"],
                        "contain": ["url"],
                        "origin": select_url_info,
                        "origin_key_word": "url_",
                        "table_mapping" : ["", "", "", ""],
                        "table_mapping_type" : "no_only_one",
                    });
                    $("#fml_url_del_submit").on("click", gen_fml_url_del_json);
                }
            });
            
            //edit family group date rules
            function sec_convert_2_date(sec) {
                var hour = parseInt(sec/3600);
                var min = parseInt(sec%3600/60);
                return hour+":"+min;
            }
            function date_convert_2_sec(data) {
                return data.match(/([0-2][0-9]):[0-5][0-9]/)[1]*3600 + data.match(/[0-2][0-9]:([0-5][0-9])/)[1]*60;
            }
            function gen_fml_date_add_json() {
                var date_week = $("input[name='date_week']").val();
                var from = $("input[name='on_time']").val();
                var to = $("input[name='off_time']").val();
                if (!from.match(/[0-2][0-9]:[0-5][0-9]/)) {
                    MyAlert("'From' setting format is invalid!");
                    return false;
                }
                if (!to.match(/[0-2][0-9]:[0-5][0-9]/)) {
                    MyAlert("'To' setting format is invalid!");
                    return false;
                }
                var on_time = date_convert_2_sec(from);
                var off_time = date_convert_2_sec(to);
                if (on_time>86400) {
                    MyAlert("'From' setting time is invalid!");
                    return false;
                }
                if (off_time>86400) {
                    MyAlert("'To' setting time is invalid!");
                    return false;
                }

                var rules_num = 0;
                var add_json = {
                    family_index : sel_fml.family_index,
                    family_name : sel_fml.family_name,
                    date_list : {},
                }
                for (j in date_info) {
                    if (date_info[j].family_index==sel_fml.family_index) {
                        add_json.date_list[rules_num]={}
                        add_json.date_list[rules_num]["enable"] = "1";
                        add_json.date_list[rules_num]["date_week"] = date_info[j]["date_week"];
                        add_json.date_list[rules_num]["on_time"] = date_info[j]["on_time"];
                        add_json.date_list[rules_num]["off_time"] = date_info[j]["off_time"];
                        rules_num++;
                    }
                }
                add_json.date_list[rules_num]={}
                add_json.date_list[rules_num]["enable"] = "1";
                add_json.date_list[rules_num]["date_week"] = date_week;
                add_json.date_list[rules_num]["on_time"] = on_time.toString();
                add_json.date_list[rules_num]["off_time"] = off_time.toString();
                $("input[name='config_json']").val(JSON.stringify(add_json));
                return true;
            }
            APG.new_flow({
                id: "fml_edit_date_rules_page" + sel_fml.family_index,
                name: fml_info[i].family_name + " Allowed Time of Use",
                width: "500",
                click: $("#fml_time_edit"+sel_fml.family_index),
                click_page: [
                    ["form", "edit_fml_date", "action=\"/boaform/getASPdata/form_fml_config_set\" method=\"POST\"", "1", refresh_family_list, refresh_family_list],
                    ["hidden", "config_json", ""],
                    ["append", "<div id='family_current_date_rules' class=\"table-striped\"></div>"],
                    ["menu", "date_week", "Week", "date_week", [
                        ["0", "Monday"],
                        ["1", "Tuesday"],
                        ["2", "Wednesday"],
                        ["3", "Thursday"],
                        ["4", "Friday"],
                        ["5", "Saturday"],
                        ["6", "Sunday"],
                    ]],
                    ["text", "on_time", "From", "on_time", "5", "placeholder='06:00'"],
                    ["text", "off_time", "To", "off_time", "5", "placeholder='19:00'"],
                    ["submit", "fml_date_add_submit", gen_fml_date_add_json, "Add Rules"],
                    ["button", "fml_date_del_submit", "Delete Selected", "btn-danger"],
                ],
                init_method: function (PM) {
                    PM.date_week.val("0");
                    var select_date_info = {};
                    var date_week_map = {
                        ["0"] : "Monday",
                        ["1"] : "Tuesday",
                        ["2"] : "Wednesday",
                        ["3"] : "Thursday",
                        ["4"] : "Friday",
                        ["5"] : "Saturday",
                        ["6"] : "Sunday",
                    }
                    
                    for (j in date_info) {
                        if (date_info[j].family_index==sel_fml.family_index) {
                            select_date_info["date_"+j] = date_info[j];
                            select_date_info["date_"+j]["day"] = date_week_map[date_info[j]["date_week"]];
                            select_date_info["date_"+j]["from"] = sec_convert_2_date(date_info[j]["on_time"]);
                            select_date_info["date_"+j]["to"] = sec_convert_2_date(date_info[j]["off_time"]);
                        }
                    }
                    //console.log(select_sta_info);
                    APG.new_tbl({
                        "direction": "0",
                        "selector": $("#family_current_date_rules"),
                        "header": ["Day", "From", "To"],
                        "contain": ["day", "from", "to"],
                        "origin": select_date_info,
                        "origin_key_word": "date_",
                        "table_mapping" : ["", "", "", ""],
                        "table_mapping_type" : "no_only_one",
                    });
                    $("#fml_date_del_submit").on("click", function(){
                        var rules_num = 0;
                        var del_json = {
                            family_index : sel_fml.family_index,
                            family_name : sel_fml.family_name,
                            date_list : {},
                        }
							
            						function date_week_convert(date_week_str) {
            							for (i in date_week_map) {
            							    if (date_week_map[i]==date_week_str)
            							        return i;
            							}
            							console.warn("no return of date_week - ",date_week_str);
            							return "0";
            						}
                        $("#family_current_date_rules").find(".justhover").each(function(){
                            if (!$(this).hasClass("td_select")) {
                                del_json.date_list[rules_num]={}
                                del_json.date_list[rules_num]["enable"] = "1";
                                del_json.date_list[rules_num]["date_week"] = date_week_convert($(this).find("td").eq(0).text());
                                del_json.date_list[rules_num]["on_time"] = date_convert_2_sec($(this).find("td").eq(1).text()).toString();
                                del_json.date_list[rules_num]["off_time"] = date_convert_2_sec($(this).find("td").eq(2).text()).toString();
                                rules_num++;
                            }
                        })
                        $("input[name='config_json']").val(JSON.stringify(del_json));
                        $("#waiting_animation").fadeIn("fast");
                        $.ajaxSettings.async = true;
                        $("#edit_fml_date").submit();
                    });
                }
            });

            //del family
            $("#fml_group_del" + fml_info[i].family_index).on("click", function() {
                $("input[name='del_family_index']").val(sel_fml.family_index);
                swal({
                    title: "Are you sure to delete "+sel_fml.family_name,
                    icon: "info",
                    buttons: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        $("#waiting_animation").fadeIn("fast");
                        $.ajaxSettings.async = true;
                        $("#del_fml_group").submit();
                    }
                });
                
            });
        }

    }
    
    const PM = APG.new([
        ["Family_Group_Management", L("LANG_FAMILY_GROUP_MANAGEMENT"), "2"],
        ["append", "<div id='family_group_list' class=\"table-striped\"></div>"],
        ["append", "<div style=\"max-width: 300px;margin: 0 auto;margin-bottom:10px;margin-top:10px\"><button type=\"button\" id=\"create_family_group\" class=\"btn btn-primary btn-block btn-round\">Create Family Group</button></div>"],
        ["append", "<div style=\"max-width: 300px;margin: 0 auto;margin-bottom:10px;margin-top:10px\"><button type=\"button\" id=\"refresh_page_info\" class=\"btn btn-info btn-block btn-round\">Refresh Page Data</button></div>"],
        ["form", "del_fml_group", "action=\"/boaform/getASPdata/form_del_fml\" method=\"POST\"", "1", refresh_family_list, refresh_family_list],
        ["hidden", "del_family_index", ""],
    ]);

    function gen_create_fml_json() {
        var fml_name = $("#fml_group_name_fk").val();
        var create_fml_json = {
            family_index : "0",
            family_name : fml_name,
        };
        $("input[name='config_json']").val(JSON.stringify(create_fml_json));
        return true;
    }

    APG.new_flow({
        id: "create_fml_group_page",
        name: "Create Family Group",
        width: "500",
        click: $("#create_family_group"),
        click_page: [
            ["form", "create_fml_group", "action=\"/boaform/getASPdata/form_fml_config_set\" method=\"POST\"", "1", refresh_family_list, refresh_family_list],
            ["text", "fml_group_name_fk", "Family Group Name", "fml_group_name_fk", "30"],
            ["hidden", "config_json", ""],
            ["submit", "fml_name_submit", gen_create_fml_json],
        ],
    });

    $("#refresh_page_info").on("click", function(){
        refresh_family_list();
        MyAlert("Refresh Success");
    });

	refresh_family_list();
}


$(document).ready(function () {
    family_group_management_init()
});