var PC_PM = {};

function login_pri_click() {
    $("#wan_telnet").on("click", function (e) {
        if (PC_PM.w_telnet.val() == "0" || PC_PM.w_telnet.val() == "") {
            PC_PM.w_telnet_port.body(0);
            PC_PM.w_telnet_ip1.body(0);
            PC_PM.w_telnet_ip2.body(0);
        }
        else {
            PC_PM.w_telnet_port.body(1);
            PC_PM.w_telnet_ip1.body(1);
            PC_PM.w_telnet_ip2.body(1);
        }
    })


    $("#Telnet_Ctrl").on('click', function (e) {
        $("#Telnet_Ctrl").toggleClass("btn-primary");
        $("#Telnet_Ctrl").toggleClass("btn-secondary");
        $("#Ftp_Ctrl,#Http_Ctrl,#Https_Ctrl,#SSH_Ctrl,#Tftp_Ctrl,#Ping_Ctrl").toggleClass("btn-primary", false);
        $("#Ftp_Ctrl,#Http_Ctrl,#Https_Ctrl,#SSH_Ctrl,#Tftp_Ctrl,#Ping_Ctrl").toggleClass("btn-secondary", true);
        if ($("#Telnet_setting_div").css("display") == "none") {
            $("#Ftp_setting_div").slideUp();
            $("#Http_setting_div").slideUp();
            $("#Https_setting_div").slideUp();
            $("#SSH_setting_div").slideUp();
            $("#Tftp_setting_div").slideUp();
            $("#Ping_setting_div").slideUp();
            if (PC_PM.w_telnet.val() == "0" || PC_PM.w_telnet.val() == "") {
                PC_PM.w_telnet_port.body(0);
                PC_PM.w_telnet_ip1.body(0);
                PC_PM.w_telnet_ip2.body(0);
            }
            $("#Telnet_setting_div").slideDown();
            $("#port_control_submit_Table").slideDown();
        } else {
            $("#Telnet_setting_div").slideUp();
            $("#port_control_submit_Table").slideUp();
        }
    })


    $("#wan_ftp").on("click", function (e) {
        if (PC_PM.w_ftp.val() == "0" || PC_PM.w_ftp.val() == "") {
            PC_PM.w_ftp_port.body(0);
            PC_PM.w_ftp_ip1.body(0);
            PC_PM.w_ftp_ip2.body(0);
        }
        else {
            PC_PM.w_ftp_port.body(1);
            PC_PM.w_ftp_ip1.body(1);
            PC_PM.w_ftp_ip2.body(1);
        }
    })

    $("#Ftp_Ctrl").on('click', function (e) {
        $("#Ftp_Ctrl").toggleClass("btn-primary");
        $("#Ftp_Ctrl").toggleClass("btn-secondary");
        $("#Telnet_Ctrl,#Http_Ctrl,#Https_Ctrl,#SSH_Ctrl,#Tftp_Ctrl,#Ping_Ctrl").toggleClass("btn-primary", false);
        $("#Telnet_Ctrl,#Http_Ctrl,#Https_Ctrl,#SSH_Ctrl,#Tftp_Ctrl,#Ping_Ctrl").toggleClass("btn-secondary", true);
        if ($("#Ftp_setting_div").css("display") == "none") {
            $("#Telnet_setting_div").slideUp();
            $("#Http_setting_div").slideUp();
            $("#Https_setting_div").slideUp();
            $("#SSH_setting_div").slideUp();
            $("#Tftp_setting_div").slideUp();
            $("#Ping_setting_div").slideUp();
            if (PC_PM.w_ftp.val() == "0" || PC_PM.w_ftp.val() == "") {
                PC_PM.w_ftp_port.body(0);
                PC_PM.w_ftp_ip1.body(0);
                PC_PM.w_ftp_ip2.body(0);
            }
            $("#Ftp_setting_div").slideDown();
            $("#port_control_submit_Table").slideDown();
        } else {
            $("#Ftp_setting_div").slideUp();
            $("#port_control_submit_Table").slideUp();
        }
    })

    $("#wan_http").on("click", function (e) {
        if (PC_PM.w_web.val() == "0" || PC_PM.w_web.val() == "") {
            PC_PM.w_web_port.body(0);
            PC_PM.w_web_ip1.body(0);
            PC_PM.w_web_ip2.body(0);
        }
        else {
            PC_PM.w_web_port.body(1);
            PC_PM.w_web_ip1.body(1);
            PC_PM.w_web_ip2.body(1);
        }
    })

    $("#Http_Ctrl").on('click', function (e) {
        $("#Http_Ctrl").toggleClass("btn-primary");
        $("#Http_Ctrl").toggleClass("btn-secondary");
        $("#Telnet_Ctrl,#Ftp_Ctrl,#Https_Ctrl,#SSH_Ctrl,#Tftp_Ctrl,#Ping_Ctrl").toggleClass("btn-primary", false);
        $("#Telnet_Ctrl,#Ftp_Ctrl,#Https_Ctrl,#SSH_Ctrl,#Tftp_Ctrl,#Ping_Ctrl").toggleClass("btn-secondary", true);
        if ($("#Http_setting_div").css("display") == "none") {
            $("#Telnet_setting_div").slideUp();
            $("#Ftp_setting_div").slideUp();
            $("#Https_setting_div").slideUp();
            $("#SSH_setting_div").slideUp();
            $("#Tftp_setting_div").slideUp();
            $("#Ping_setting_div").slideUp();
            if (PC_PM.w_web.val() == "0" || PC_PM.w_web.val() == "") {
                PC_PM.w_web_port.body(0);
                PC_PM.w_web_ip1.body(0);
                PC_PM.w_web_ip2.body(0);
            }
            $("#Http_setting_div").slideDown();
            $("#port_control_submit_Table").slideDown();
        } else {
            $("#Http_setting_div").slideUp();
            $("#port_control_submit_Table").slideUp();
        }
    })

    $("#wan_https").on("click", function (e) {
        if (PC_PM.w_https.val() == "0" || PC_PM.w_https.val() == "") {
            PC_PM.w_https_port.body(0);
            PC_PM.w_https_ip1.body(0);
            PC_PM.w_https_ip2.body(0);
        }
        else {
            PC_PM.w_https_port.body(1);
            PC_PM.w_https_ip1.body(1);
            PC_PM.w_https_ip2.body(1);
        }
    })

    $("#Https_Ctrl").on('click', function (e) {
        $("#Https_Ctrl").toggleClass("btn-primary");
        $("#Https_Ctrl").toggleClass("btn-secondary");
        $("#Telnet_Ctrl,#Ftp_Ctrl,#Http_Ctrl,#SSH_Ctrl,#Tftp_Ctrl,#Ping_Ctrl").toggleClass("btn-primary", false);
        $("#Telnet_Ctrl,#Ftp_Ctrl,#Http_Ctrl,#SSH_Ctrl,#Tftp_Ctrl,#Ping_Ctrl").toggleClass("btn-secondary", true);
        if ($("#Https_setting_div").css("display") == "none") {
            $("#Telnet_setting_div").slideUp();
            $("#Ftp_setting_div").slideUp();
            $("#Http_setting_div").slideUp();
            $("#SSH_setting_div").slideUp();
            $("#Tftp_setting_div").slideUp();
            $("#Ping_setting_div").slideUp();
            if (PC_PM.w_https.val() == "0" || PC_PM.w_https.val() == "") {
                PC_PM.w_https_port.body(0);
                PC_PM.w_https_ip1.body(0);
                PC_PM.w_https_ip2.body(0);
            }
            $("#Https_setting_div").slideDown();
            $("#port_control_submit_Table").slideDown();
        } else {
            $("#Https_setting_div").slideUp();
            $("#port_control_submit_Table").slideUp();
        }
    })

    $("#wan_SSH").on("click", function (e) {
        if (PC_PM.w_ssh.val() == "0" || PC_PM.w_ssh.val() == "") {
            PC_PM.w_ssh_port.body(0);
            PC_PM.w_ssh_ip1.body(0);
            PC_PM.w_ssh_ip2.body(0);
        }
        else {
            PC_PM.w_ssh_port.body(1);
            PC_PM.w_ssh_ip1.body(1);
            PC_PM.w_ssh_ip2.body(1);
        }
    })

    $("#SSH_Ctrl").on('click', function (e) {
        $("#SSH_Ctrl").toggleClass("btn-primary");
        $("#SSH_Ctrl").toggleClass("btn-secondary");
        $("#Telnet_Ctrl,#Ftp_Ctrl,#Http_Ctrl,#Https_Ctrl,#Tftp_Ctrl,#Ping_Ctrl").toggleClass("btn-primary", false);
        $("#Telnet_Ctrl,#Ftp_Ctrl,#Http_Ctrl,#Https_Ctrl,#Tftp_Ctrl,#Ping_Ctrl").toggleClass("btn-secondary", true);
        if ($("#SSH_setting_div").css("display") == "none") {
            $("#Telnet_setting_div").slideUp();
            $("#Ftp_setting_div").slideUp();
            $("#Http_setting_div").slideUp();
            $("#Https_setting_div").slideUp();
            $("#Tftp_setting_div").slideUp();
            $("#Ping_setting_div").slideUp();
            if (PC_PM.w_ssh.val() == "0" || PC_PM.w_ssh.val() == "") {
                PC_PM.w_ssh_port.body(0);
                PC_PM.w_ssh_ip1.body(0);
                PC_PM.w_ssh_ip2.body(0);
            }
            $("#SSH_setting_div").slideDown();
            $("#port_control_submit_Table").slideDown();
        } else {
            $("#SSh_setting_div").slideUp();
            $("#port_control_submit_Table").slideUp();
        }
    })

    $("#wan_tftp").on("click", function (e) {
        if (PC_PM.w_tftp.val() == "0" || PC_PM.w_tftp.val() == "") {
            PC_PM.w_tftp_ip1.body(0);
            PC_PM.w_tftp_ip2.body(0);
        }
        else {
            PC_PM.w_tftp_ip1.body(1);
            PC_PM.w_tftp_ip2.body(1);
        }
    })

    $("#Tftp_Ctrl").on('click', function (e) {
        $("#Tftp_Ctrl").toggleClass("btn-primary");
        $("#Tftp_Ctrl").toggleClass("btn-secondary");
        $("#Telnet_Ctrl,#Ftp_Ctrl,#Http_Ctrl,#SSH_Ctrl,#Https_Ctrl,#Ping_Ctrl").toggleClass("btn-primary", false);
        $("#Telnet_Ctrl,#Ftp_Ctrl,#Http_Ctrl,#SSH_Ctrl,#Https_Ctrl,#Ping_Ctrl").toggleClass("btn-secondary", true);
        if ($("#Tftp_setting_div").css("display") == "none") {
            $("#Telnet_setting_div").slideUp();
            $("#Ftp_setting_div").slideUp();
            $("#Http_setting_div").slideUp();
            $("#SSH_setting_div").slideUp();
            $("#Https_setting_div").slideUp();
            $("#Ping_setting_div").slideUp();
            if (PC_PM.w_tftp.val() == "0" || PC_PM.w_tftp.val() == "") {
                PC_PM.w_tftp_ip1.body(0);
                PC_PM.w_tftp_ip2.body(0);
            }
            $("#Tftp_setting_div").slideDown();
            $("#port_control_submit_Table").slideDown();
        } else {
            $("#Tftp_setting_div").slideUp();
            $("#port_control_submit_Table").slideUp();
        }
    })


    $("#wan_icmp").on("click", function (e) {
        if (PC_PM.w_icmp.val() == "0" || PC_PM.w_icmp.val() == "") {
            PC_PM.w_icmp_ip1.body(0);
            PC_PM.w_icmp_ip2.body(0);
        }
        else {
            PC_PM.w_icmp_ip1.body(1);
            PC_PM.w_icmp_ip2.body(1);
        }
    })

    $("#Ping_Ctrl").on('click', function (e) {
        $("#Ping_Ctrl").toggleClass("btn-primary");
        $("#Ping_Ctrl").toggleClass("btn-secondary");
        $("#Telnet_Ctrl,#Ftp_Ctrl,#Http_Ctrl,#SSH_Ctrl,#Tftp_Ctrl,#Https_Ctrl").toggleClass("btn-primary", false);
        $("#Telnet_Ctrl,#Ftp_Ctrl,#Http_Ctrl,#SSH_Ctrl,#Tftp_Ctrl,#Https_Ctrl").toggleClass("btn-secondary", true);
        if ($("#Ping_setting_div").css("display") == "none") {
            $("#Telnet_setting_div").slideUp();
            $("#Ftp_setting_div").slideUp();
            $("#Http_setting_div").slideUp();
            $("#SSH_setting_div").slideUp();
            $("#Tftp_setting_div").slideUp();
            $("#Https_setting_div").slideUp();
            if (PC_PM.w_icmp.val() == "0" || PC_PM.w_icmp.val() == "") {
                PC_PM.w_icmp_ip1.body(0);
                PC_PM.w_icmp_ip2.body(0);
            }
            $("#Ping_setting_div").slideDown();
            $("#port_control_submit_Table").slideDown();
        } else {
            $("#Ping_setting_div").slideUp();
            $("#port_control_submit_Table").slideUp();
        }
    })


    $("#Show_rules").on('click', function (e) {
        $("#Show_rules").toggleClass("btn-primary");
        $("#Show_rules").toggleClass("btn-secondary");
        $("#Add_rule").toggleClass("btn-primary", false);
        $("#Add_rule").toggleClass("btn-secondary", true);
        if ($("#rule_show_div").css("display") == "none") {
            $("#rule_add_div").slideUp();
            $("#rule_add_table").slideUp();
            $("#rule_show_div").slideDown();
            $("#rule_del_table").slideDown();
            $("#IP_Port_Config_Submit_Del").slideDown();
        } else {
            $("#rule_show_div").slideUp();
            $("#IP_Port_Config_Submit_Del").slideUp();
        }
    })


    $("#Add_rule").on('click', function (e) {
        $("#Add_rule").toggleClass("btn-primary");
        $("#Add_rule").toggleClass("btn-secondary");
        $("#Show_rules").toggleClass("btn-primary", false);
        $("#Show_rules").toggleClass("btn-secondary", true);
        if ($("#rule_add_div").css("display") == "none") {
            $("#rule_show_div").slideUp();
            $("#rule_del_table").slideUp();
            $("#rule_add_table").slideDown();
            $("#rule_add_div").slideDown();
        } else {
            $("#rule_add_div").slideUp();
            $("#rule_add_table").slideUp();
        }
    })


    $("#lan_icmp").attr("checked", "checked");
    $("#lan_icmp").attr("disabled", "true");
    $("#port_control").on("click", function (e) {

        $("#Telnet_Ctrl").next("div").toggleClass("circle_enable", true);
        $("#Telnet_Ctrl").next("div").removeClass("circle_disable");

        $("#Ftp_Ctrl").next("div").toggleClass("circle_enable", true);
        $("#Ftp_Ctrl").next("div").removeClass("circle_disable");

        $("#Http_Ctrl").next("div").toggleClass("circle_enable", true);
        $("#Http_Ctrl").next("div").removeClass("circle_disable");

        $("#Https_Ctrl").next("div").toggleClass("circle_enable", true);
        $("#Https_Ctrl").next("div").removeClass("circle_disable");

        $("#SSH_Ctrl").next("div").toggleClass("circle_enable", true);
        $("#SSH_Ctrl").next("div").removeClass("circle_disable");

        $("#Tftp_Ctrl").next("div").toggleClass("circle_enable", true);
        $("#Tftp_Ctrl").next("div").removeClass("circle_disable");

        $("#Ping_Ctrl").next("div").toggleClass("circle_enable", true);
        $("#Ping_Ctrl").next("div").removeClass("circle_disable");

        $("#Show_rules").next("div").toggleClass("circle_enable", true);
        $("#Show_rules").next("div").removeClass("circle_disable");

        $("#Add_rule").next("div").toggleClass("circle_enable", true);
        $("#Add_rule").next("div").removeClass("circle_disable");
    })

    $("#port_control_submit").on('click', function (e) {
        if (check_Port_and_IP_setting()) {
            $("#waiting_animation").show();
            $.ajaxSettings.async = true;
            $("#Port_Ctrl_form").submit();
        }
    })
}





function check_Port_and_IP_setting() {

    if ($("input[name='w_telnet_port']").length && $("input[name='w_telnet_port']").val().length != 0) {
        var portnumber = $("input[name='w_telnet_port']").val();
        if (!sji_checkdigitrange(portnumber, 0, 65535)) {
            swal_check_warning("input[name='w_telnet_port']", "telnet" + arrLang[lang]["LANG_PORT"] + " " + portnumber + " " + arrLang[lang]["LANG_IS_INVALID"]);
            return false;
        }
    }
    if ($("input[name='w_ftp_port']").length && $("input[name='w_ftp_port']").val().length != 0) {
        var portnumber = $("input[name='w_ftp_port']").val();
        if (!sji_checkdigitrange(portnumber, 0, 65535)) {
            swal_check_warning("input[name='w_ftp_port']", "ftp" + arrLang[lang]["LANG_PORT"] + " " + portnumber + " " + arrLang[lang]["LANG_IS_INVALID"]);
            return false;
        }
    }
    if ($("input[name='w_web_port']").length && $("input[name='w_web_port']").val().length != 0) {
        var portnumber = $("input[name='w_web_port']").val();
        if (!sji_checkdigitrange(portnumber, 0, 65535)) {
            swal_check_warning("input[name='w_web_port']", "http" + arrLang[lang]["LANG_PORT"] + " " + portnumber + " " + arrLang[lang]["LANG_IS_INVALID"]);
            return false;
        }
    }
    if ($("input[name='w_https_port']").length && $("input[name='w_https_port']").val().length != 0) {
        var portnumber = $("input[name='w_https_port']").val();
        if (!sji_checkdigitrange(portnumber, 0, 65535)) {
            swal_check_warning("input[name='w_https_port']", "https" + arrLang[lang]["LANG_PORT"] + " " + portnumber + " " + arrLang[lang]["LANG_IS_INVALID"]);
            return false;
        }
    }
    if ($("input[name='w_ssh_port']").length && $("input[name='w_ssh_port']").val().length != 0) {
        var portnumber = $("input[name='w_ssh_port']").val();
        if (!sji_checkdigitrange(portnumber, 0, 65535)) {
            swal_check_warning("input[name='w_ssh_port']", "SSH" + arrLang[lang]["LANG_PORT"] + " " + portnumber + " " + arrLang[lang]["LANG_IS_INVALID"]);
            return false;
        }
    }

    var check_list = ["w_telnet_ip", "w_ftp_ip", "w_web_ip", "w_https_ip", "w_ssh_ip", "w_tftp_ip", "w_icmp_ip"];

    for (var i = 0; i < check_list.length; i++) {
        if ($("input[name='" + check_list[i] + "']").length == 0)
            continue;
        var ip = $("input[name='" + check_list[i] + "1" + "']").val();
        var mask = $("input[name='" + check_list[i] + "2" + "']").val();
        var tar = $("input[name='" + check_list[i] + "']");
        if (ip.length != 0) {
            if (!sji_checkvip(ip)) {
                swal_check_warning("input[name='" + check_list[i] + "1" + "']", arrLang[lang]["LANG_IP_ADDRESS"] + " " + ip + " " + arrLang[lang]["LANG_IS_INVALID"]);
                return false;
            }
            if (!sji_checkmask(mask)) {
                swal_check_warning("input[name='" + check_list[i] + "2" + "']", arrLang[lang]["LANG_REMOTE_HOST"] + arrLang[lang]["LANG_SUBNET_MASK"] + " " + mask + " " + arrLang[lang]["LANG_IS_INVALID"]);
                return false;
            }
            var bit_eq1 = 0;
            mask = mask.split(".");
            for (var j in mask) {
                var count = 7;
                var num = parseInt(mask[j]);
                while ((num & 1 << count) != 0) {
                    count--;
                    if (count < 0)
                        break;
                }
                bit_eq1 += 7 - count;
                if (count != -1)
                    break;
            }
            tar.val(ip + "/" + bit_eq1);
        }
    }

    return true;
}


function login_pri_ip_process() {
    var ip_list = ["w_telnet_ip", "w_ftp_ip", "w_web_ip", "w_https_ip", "w_ssh_ip", "w_tftp_ip", "w_icmp_ip"];
    for (var i in ip_list) {
        var tar = $("input[name='" + ip_list[i] + "']").val();
        if (tar.length == 0)
            continue;
        else {
            if (tar.indexOf("/") != -1) {
                tar = tar.split("/");
                $("input[name='" + ip_list[i] + "1" + "']").val(tar[0]);
                if (tar[1].length != 0) {
                    var temp = parseInt(tar[1]);
                    var t8 = (temp - (temp % 8)) / 8;
                    var tlest = temp % 8;
                    var mask = "";
                    for (j = 0; j < 4; j++) {
                        if (t8 != 0) {
                            t8--;
                            mask = mask + "255";
                        } else if (tlest != 0) {
                            var tmp = 0;
                            for (tlest; tlest > 0; tlest--) {
                                tmp += (1 << (8 - tlest));
                            }
                            mask = mask + tmp;
                        } else {
                            mask = mask + 0;
                        }
                        if (j != 3) {
                            mask = mask + ".";
                        }
                    }
                    $("input[name='" + ip_list[i] + "2" + "']").val(mask);
                } else {
                    $("input[name='" + ip_list[i] + "2" + "']").val("");
                }
            } else {
                $("input[name='" + ip_list[i] + "1" + "']").val(tar);
                $("input[name='" + ip_list[i] + "2" + "']").val("");
            }
        }
    }
}

function Port_control_Page_init() {
    var data = OneForAll("getASPdata/acc_post_init", 5, 0, 0, 0);
    var obj = {}
    Page_data_obj_init(obj, data);
    set_obj_data_to_html(obj);
    //login_pri_ip_process();

}

function login_pri_html() {
    var basic_html = "<table><td><div class=\"row\">";
    var b_list = ["Telnet", "Ftp", "Http", "Https", "SSH", "Tftp", "Ping"];
    for (var i in b_list) {
        basic_html += "<div style=\"position: relative;\" class=\"m-1\">\
        <button type=\"button\" id=\""+ b_list[i] + "_Ctrl\"\
            class=\"btn btn-secondary btn-block btn-round\"\
            style=\"text-align: left;\">"+ b_list[i] + "</button>\
        </div>";
    }
    basic_html += "</div></td></table>";
    basic_html += "<form id=\"Port_Ctrl_form\" action=\"/boaform/getASPdata/formAcc\" method=\"POST\" name=\"PortControl\">";
    for (var i in b_list) {
        basic_html += "<div id=\"" + b_list[i] + "_setting_div\" style=\"display:none;\"><br></div>";
    }
    basic_html += "</form>";
    basic_html += "<div id=\"port_control_submit_Table\" style=\"display:none;\">\
                        <div style=\"max-width: 300px;margin: 0 auto;\">\
                            <button type=\"button\" id=\"port_control_submit\"\
                                class=\"btn btn-primary btn-block btn-round\">"+ L("wan_submit") + "</button>\
                        </div>\
                    </div>";
    return basic_html;
}

function login_pri() {
    var Port_Control = {
        "length": 8,
        1: [
            ["port_control", "arrLang[lang]['LANG_LOGIN_PRIVILEGE']", 2],
            ["append", login_pri_html()],
        ],
        2: [
            ["#Telnet_setting_div", 0, 2],
            ["tips", "h6", "class='tips_font'", "Telnet ,arrLang[lang][\"LANG_CONFIGURATION\"]"],
            ["switch", "lan_telnet", "LAN", "l_telnet"],
            ["switch", "wan_telnet", "WAN", "w_telnet"],
            ["text", "wan_telnet_port", "arrLang[lang][\"LANG_PORT\"]", "w_telnet_port", "8", "placeholder=\"1 - 65535\""],
            ["text", "wan_telnet_ip1", "arrLang[lang][\"LANG_REMOTE_HOST\"]", "w_telnet_ip1", "32", "placeholder=\"IP (x.x.x.x)\""],
            ["text", "wan_telnet_ip2", "arrLang[lang][\"LANG_MASK\"]", "w_telnet_ip2", "32", "placeholder=\"IP (x.x.x.x)\""],
            ["hidden", "w_telnet_ip", ""],
        ],
        3: [
            ["#Ftp_setting_div", 0, 2],
            ["tips", "h6", "class='tips_font'", "Ftp ,arrLang[lang][\"LANG_CONFIGURATION\"]"],
            ["switch", "lan_ftp", "LAN", "l_ftp"],
            ["switch", "wan_ftp", "WAN", "w_ftp"],
            ["text", "wan_ftp_port", "arrLang[lang][\"LANG_PORT\"]", "w_ftp_port", "8", "placeholder=\"1 - 65535\""],
            ["text", "wan_ftp_ip1", "arrLang[lang][\"LANG_REMOTE_HOST\"]", "w_ftp_ip1", "32", "placeholder=\"IP (x.x.x.x)\""],
            ["text", "wan_ftp_ip2", "arrLang[lang][\"LANG_MASK\"]", "w_ftp_ip2", "32", "placeholder=\"IP (x.x.x.x)\""],
            ["hidden", "w_ftp_ip", ""],
        ],
        4: [
            ["#Http_setting_div", 0, 2],
            ["tips", "h6", "class='tips_font'", "Http ,arrLang[lang][\"LANG_CONFIGURATION\"]"],
            ["switch", "lan_http", "LAN", "l_web"],
            ["switch", "wan_http", "WAN", "w_web"],
            ["text", "wan_http_port", "arrLang[lang][\"LANG_PORT\"]", "w_web_port", "8", "placeholder=\"1 - 65535\""],
            ["text", "wan_http_ip1", "arrLang[lang][\"LANG_REMOTE_HOST\"]", "w_web_ip1", "32", "placeholder=\"IP (x.x.x.x)\""],
            ["text", "wan_http_ip2", "arrLang[lang][\"LANG_MASK\"]", "w_web_ip2", "32", "placeholder=\"IP (x.x.x.x)\""],
            ["hidden", "w_web_ip", ""],
        ],
        5: [
            ["#Https_setting_div", 0, 2],
            ["tips", "h6", "class='tips_font'", "Https ,arrLang[lang][\"LANG_CONFIGURATION\"]"],
            ["switch", "lan_https", "LAN", "l_https"],
            ["switch", "wan_https", "WAN", "w_https"],
            ["text", "wan_https_port", "arrLang[lang][\"LANG_PORT\"]", "w_https_port", "8", "placeholder=\"1 - 65535\""],
            ["text", "wan_https_ip1", "arrLang[lang][\"LANG_REMOTE_HOST\"]", "w_https_ip1", "32", "placeholder=\"IP (x.x.x.x)\""],
            ["text", "wan_https_ip2", "arrLang[lang][\"LANG_MASK\"]", "w_https_ip2", "32", "placeholder=\"IP (x.x.x.x)\""],
            ["hidden", "w_https_ip", ""],
        ],
        6: [
            ["#SSH_setting_div", 0, 2],
            ["tips", "h6", "class='tips_font'", "SSH ,arrLang[lang][\"LANG_CONFIGURATION\"]"],
            ["switch", "lan_SSH", "LAN", "l_ssh"],
            ["switch", "wan_SSH", "WAN", "w_ssh"],
            ["text", "wan_SSH_port", "arrLang[lang][\"LANG_PORT\"]", "w_ssh_port", "8", "placeholder=\"1 - 65535\""],
            ["text", "wan_SSH_ip1", "arrLang[lang][\"LANG_REMOTE_HOST\"]", "w_ssh_ip1", "32", "placeholder=\"IP (x.x.x.x)\""],
            ["text", "wan_SSH_ip2", "arrLang[lang][\"LANG_MASK\"]", "w_ssh_ip2", "32", "placeholder=\"IP (x.x.x.x)\""],
            ["hidden", "w_ssh_ip", ""],
        ],
        7: [
            ["#Tftp_setting_div", 0, 2],
            ["tips", "h6", "class='tips_font'", "Tftp ,arrLang[lang][\"LANG_CONFIGURATION\"]"],
            ["switch", "lan_tftp", "LAN", "l_tftp"],
            ["switch", "wan_tftp", "WAN", "w_tftp"],
            ["text", "wan_tftp_ip1", "arrLang[lang][\"LANG_REMOTE_HOST\"]", "w_tftp_ip1", "32", "placeholder=\"IP (x.x.x.x)\""],
            ["text", "wan_tftp_ip2", "arrLang[lang][\"LANG_MASK\"]", "w_tftp_ip2", "32", "placeholder=\"IP (x.x.x.x)\""],
            ["hidden", "w_tftp_ip", ""],
        ],
        8: [
            ["#Ping_setting_div", 0, 2],
            ["tips", "h6", "class='tips_font'", "Ping ,arrLang[lang][\"LANG_CONFIGURATION\"]"],
            //["switch", "lan_icmp", "LAN", "l_icmp"],
            ["switch", "wan_icmp", "WAN", "w_icmp"],
            ["text", "wan_icmp_ip1", "arrLang[lang][\"LANG_REMOTE_HOST\"]", "w_icmp_ip1", "32", "placeholder=\"IP (x.x.x.x)\""],
            ["text", "wan_icmp_ip2", "arrLang[lang][\"LANG_MASK\"]", "w_icmp_ip2", "32", "placeholder=\"IP (x.x.x.x)\""],
            ["hidden", "w_icmp_ip", ""],
        ],
    }
    PC_PM = Auto_Page_generate(Port_Control, "250px");
    login_pri_click();
    Port_control_Page_init();
    $("#Telnet_Ctrl").click();
    $("#Show_rules").click();
    $("#Port_Ctrl_form").ajaxForm(function (data) {
        FMask_init();
        if (data == "success") {
            Port_control_Page_init();
            $("#waiting_animation").hide();
            MyAlert(arrLang[lang]["LANG_SUBMIT_SUCCESS"]);
        } else if (data == "ERROR") {
            $("#waiting_animation").hide();
            swal(arrLang[lang]["LANG_ERROR"], arrLang[lang]["LANG_CONFIG"] + arrLang[lang]["LANG_ERROR"], "warning");
        } else if (data.indexOf("filterLevel") != -1) {
            Port_control_Page_init();
            $("#waiting_animation").hide();
            MyAlert(arrLang[lang]['LANG_FILTERLEVEL_IS_HIGH']);
        }
    })
}

$(document).ready(function () {
    login_pri();
    FMask_init();
})
