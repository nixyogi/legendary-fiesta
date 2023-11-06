var Other_Page = {};
var DDNS_Lits = {};
var get_wan_name_list_data = "";

function Other_Page_init() {
    Other_Page = {
        "length": 1,
        1: [
            ["DDNS_PAGE_ROW", "arrLang[lang][\"LANG_DYNAMIC_DNS_2\"]", "2"],
            ["form", "DDNS_form", "action=\"/boaform/getASPdata/formDDNS\" method=\"POST\"", "1", after_Add_success],
            ["switch", "enable_DDNS", "arrLang[lang][\"LANG_ENABLE_DDNS_SERVICE\"]", "ddnsEnable"],
            ["append", "<div class=\"table-responsive\">\
            <table class=\"table table-bordered table-striped\">\
            <thead>\
                <tr>\
                    <th>" + arrLang[lang]["LANG_HOSTNAME"] + "</th>\
                    <th>" + arrLang[lang]["LANG_USERNAME"] + "</th>\
                    <th>" + arrLang[lang]["LANG_SERVICE"] + "</th>\
                    <th>" + arrLang[lang]["LANG_INTERFACE"] + "</th>\
                </tr>\
            </thead>\
            <tbody id=\"DDNS_Table_List\"></tbody>\
        </table>\
        </div>"],
            ["append", "<div>\
        <div style=\"display: inline;\"><button type=\"button\" id=\"DDNS_Add\" action=\"addRoute\" class=\"btn btn-primary btn-round\">" + arrLang[lang]["LANG_ADD"] + "</button></div>\
        <div style=\"display: inline;\"><button type=\"button\" id=\"DDNS_Del\" class=\"btn btn-danger btn-round\">" + arrLang[lang]["LANG_DELETE_SELECTED"] + "</button></div>\
    </div>"],
            ["hidden", "action", "rm"],
        ]
    }
}

function DDNS_Table_List_init() {
    for (var key in DDNS_Lits) {
        delete DDNS_Lits[key];
    }
    $("#DDNS_Table_List").empty();

    Page_data_obj_init(DDNS_Lits, OneForAll("getASPdata/showDNSTable", 5, 0, 0, 0));
    set_obj_data_to_html({
        "ddnsEnable": DDNS_Lits["ddnsEnable"]
    });
    for (var key in DDNS_Lits) {
        if (key.indexOf("rml") != -1) {
            var tmp = DDNS_Lits[key];
            var value_split = tmp.split("&");
            $("#DDNS_Table_List").append(
                "<tr class=\"justhover\">" +
                "<td>" + value_split[0] + "</td>" +
                "<td>" + value_split[1] + "</td>" +
                "<td>" + value_split[2] + "</td>" +
                "<td>" + value_split[3] + "</td>" +
                "<td style=\"display:none;\">" + "<input type=\"hidden\" name=\"" + key + "\">" + "</td>" +
                "</tr>");
        }
    }
    (function (s) {
        s(".justhover").on("click", function () {
            s(this).toggleClass("td_select");
            if (s(this).hasClass("td_select")) {
                s(this).find("input").val("1");
            } else {
                s(this).find("input").val("0");
            }
        })
    })(jQuery)
}

function DDNS_interface_choose_init() {
    get_wan_name_list_data = OneForAll("getASPdata/get_wan_name_list", 5, 0, 0, 0);
    if (get_wan_name_list_data.indexOf("nolist") != -1) {
        return [
            ["LAN", "LAN/br0"],
        ];
    }
    var data_split = get_wan_name_list_data.split("\n");
    var menu = [
        ["LAN", "LAN/br0"],
    ];

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

function UPnP_interface_choose_init() {
    get_wan_name_list_data = OneForAll("getASPdata/get_wan_name_list", 5, 0, 0, 0);
    if (get_wan_name_list_data.indexOf("nolist") != -1) {
        return [];
    }
    var data_split = get_wan_name_list_data.split("\n");
    var menu = [];

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

function after_Add_success() {
    DDNS_Table_List_init();
    $(".layui-layer-close2").click();
}

function DDNS_window_init() {
    var data = {
        id: "DDNS_Page_Add",
        name: arrLang[lang]["LANG_ADD_DYNAMIC_DNS"],
    }

    var text_key = {
        "oray": "#B_orayusername_Table,#B_oraypassword_Table",
        "dyndns": "#B_dynusername_Table,#B_dynpassword_Table",
        "tzo": "#B_tzoemail_Table,#B_tzokey_Table",
        "noip": "#B_noipusername_Table,#B_noippassword_Table",
        "gnudip": "#B_gnudipusername_Table,#B_gnudippassword_Table",
    }

    var Add_Page = {
        "length": 1,
        1: [
            ["DDNS_Page_Add", 0],
            ["form", "DDNS_Add_form", "action=\"/boaform/getASPdata/formDDNS\" method=\"POST\"", "1", after_Add_success],
            ["menu", "B_provider", "arrLang[lang][\"LANG_DDNS_PROVIDER\"]", "provider", [
                ["oray", "arrLang[lang][\"LANG_ORAY_COM\"]"],
                ["dyndns", "DynDNS.org"],
                ["tzo", "TZO"],
                ["noip", "No-IP"],
                ["gnudip", "GnuDIP"],
            ]],
            ["text", "B_hostname", "arrLang[lang][\"LANG_HOSTNAME\"]", "hostname"],
            ["menu", "B_ifname", "arrLang[lang][\"LANG_INTERFACE\"]", "ifname", DDNS_interface_choose_init()],
            ["text", "B_orayusername", "arrLang[lang][\"LANG_USERNAME\"]", "orayusername"],
            ["password", "B_oraypassword", "arrLang[lang][\"LANG_PASSWORD\"]", "oraypassword"],
            ["text", "B_dynusername", "arrLang[lang][\"LANG_USERNAME\"]", "dynusername"],
            ["password", "B_dynpassword", "arrLang[lang][\"LANG_PASSWORD\"]", "dynpassword"],
            ["text", "B_tzoemail", "arrLang[lang][\"LANG_EMAIL\"]", "tzoemail"],
            ["password", "B_tzokey", "arrLang[lang][\"LANG_KEY\"]", "tzokey"],
            ["text", "B_noipusername", "arrLang[lang][\"LANG_USERNAME\"]", "noipusername"],
            ["password", "B_noippassword", "arrLang[lang][\"LANG_PASSWORD\"]", "noippassword"],
            ["text", "B_gnudipusername", "arrLang[lang][\"LANG_USERNAME\"]", "gnudipusername"],
            ["password", "B_gnudippassword", "arrLang[lang][\"LANG_PASSWORD\"]", "gnudippassword"],
            ["hidden", "action", "ad"],
            ["submit", "Add_submit", check_DDNS_Add, "arrLang[lang][\"LANG_ADD\"]"]
        ]
    };


    (function (s) {
        s("#DDNS_Add").on("click", function () {
            flow_table_generate(data);
            Auto_Page_generate(Add_Page);
            FMask_init();
            set_obj_data_to_html({
                "ifname": "LAN",
                "provider": "oray",
            });
            s("#DDNS_Page_Add").on("click", function () {
                var provider = $("input[name='provider']").val();
                for (var key in text_key) {
                    if (provider == key) {
                        $(text_key[key]).show();
                    } else {
                        $(text_key[key]).hide();
                    }
                }
            })
            s("#DDNS_Page_Add").click();
        })

        s("#enable_DDNS").on("click", function () {
            setTimeout(function () {
                $("#waiting_animation").show();
                $("input[name='action']").val("sw");
                $.ajaxSettings.async = true;
                s("#DDNS_form").submit();
                $("input[name='action']").val("rm");
            }, 50);
        })
        s("#DDNS_Del").on("click", function () {
            $("#waiting_animation").show();
            $("input[name='action']").val("rm");
            $.ajaxSettings.async = true;
            s("#DDNS_form").submit();
        })
        s(".container-fluid").on("click", function () {
            if ($("input[name='daemon']").val() == "0") {
                $("#B_ext_if_Table").parent("div").hide();
            } else {
                $("#B_ext_if_Table").parent("div").show();
            }
        })
        s(".container-fluid").click();
    })(jQuery);
}

function check_DDNS_Add() {
    if (!sji_checkpswnor($("input[name='hostname']").val(), 1, 32)) {
        $("input[name='hostname']").focus();
        MyAlert(arrLang[lang]["LANG_ADD_DDNS_ERR_1"]);
        return false;
    }
    var ddns = $("input[name='provider']").val();
    if (ddns == "oray") {
        if (!sji_checkpswnor($("input[name='orayusername']").val(), 0, 32)) {
            $("input[name='orayusername']").focus();
            MyAlert(arrLang[lang]["LANG_ADD_DDNS_ERR_2"]);
            return false;
        }
        if (!sji_checkpswnor($("input[name='oraypassword']").val(), 0, 32)) {
            $("input[name='oraypassword']").focus();
            MyAlert(arrLang[lang]["LANG_ADD_DDNS_ERR_3"]);
            return false;
        }
    } else if (ddns == "dyndns") {
        if (!sji_checkpswnor($("input[name='dynusername']").val(), 0, 32)) {
            $("input[name='dynusername']").focus();
            MyAlert(arrLang[lang]["LANG_ADD_DDNS_ERR_2"]);
            return false;
        }
        if (!sji_checkpswnor($("input[name='dynpassword']").val(), 0, 32)) {
            $("input[name='dynpassword']").focus();
            MyAlert(arrLang[lang]["LANG_ADD_DDNS_ERR_3"]);
            return false;
        }
    } else if (ddns == "tzo") {
        if (!sji_checkpswnor($("input[name='tzoemail']").val(), 0, 64)) {
            $("input[name='tzoemail']").focus();
            MyAlert(arrLang[lang]["LANG_INVALID_EMAIL"]);
            return false;
        }
        if (!sji_checkpswnor($("input[name='tzokey']").val(), 0, 32)) {
            $("input[name='tzokey']").focus();
            MyAlert(arrLang[lang]["LANG_INVALID_KEY"]);
            return false;
        }
    } else if (ddns == "noip") {
        if (!sji_checkpswnor($("input[name='noipusername']").val(), 0, 35)) {
            $("input[name='noipusername']").focus();
            MyAlert(arrLang[lang]["LANG_ADD_DDNS_ERR_2"]);
            return false;
        }
        if (!sji_checkpswnor($("input[name='noippassword']").val(), 0, 35)) {
            $("input[name='noippassword']").focus();
            MyAlert(arrLang[lang]["LANG_ADD_DDNS_ERR_3"]);
            return false;
        }
    } else {
        if (!sji_checkpswnor($("input[name='gnudipusername']").val(), 0, 32)) {
            $("input[name='gnudipusername']").focus();
            MyAlert(arrLang[lang]["LANG_ADD_DDNS_ERR_2"]);
            return false;
        }
        if (!sji_checkpswnor($("input[name='gnudippassword']").val(), 0, 32)) {
            $("input[name='gnudippassword']").focus();
            MyAlert(arrLang[lang]["LANG_ADD_DDNS_ERR_3"]);
            return false;
        }
    }
    return true;
}

var UPnP_Page = {
    "length": 1,
    1: [
        ["UPnP_Page_row", "arrLang[lang][\"LANG_UPNP_CONFIG\"]", "2"],
        ["form", "UPnP_form", "action=\"/boaform/getASPdata/formUpnp\" method=\"POST\"", "1", UPnP_Page_init],
        ["switch", "B_daemon", "UPnP", "daemon"],
        ["menu", "B_ext_if", "WAN ,arrLang[lang][\"LANG_INTERFACE\"]", "ext_if", UPnP_interface_choose_init()],
        ["submit", "UPnP_submit", check_upnp_submit]
    ]
}
var UPnP_Page_data = {}

/*Add by fyy for bug#6049*/
function check_upnp_submit() {
    if ($("input[name='daemon']").val() == 1) {
        if ($("input[name='ext_if']").val() == 65535) {
            $("input[name='ext_if']").focus();
            MyAlert(arrLang[lang]["LANG_UPNP_ERR_1"]);
            return false;
        }
    }
    return true;    
}
/*End of bug#6049*/

function UPnP_Page_init() {
    Page_data_obj_init(UPnP_Page_data, OneForAll("getASPdata/get_UPnP_Page_data", 5, 0, 0, 0));
    set_obj_data_to_html(UPnP_Page_data);
}

function USB_function_page_init() {
    var USB_state_data = {}
    Page_data_obj_init(USB_state_data, OneForAll("getASPdata/USB_Page_data_init"));
    $("#USB_Page_row").remove();
    $("#USB_Store_page_row").remove();
    $("#USB_Printer_page_row").remove();
    if (USB_state_data.USB_PORT == undefined || USB_state_data.USB_PORT == '0') {
        return;
    }
    var USB_Page = {
        "length": 1,
        1: [
            ["USB_Page_row", "USB, ,arrLang[lang]['LANG_CONFIG']", "2"],
            ["tips", "h6", "class='tips_font' id='USB_STATUS'", "USB " + arrLang[lang]['LANG_STATUS'] + ": " + arrLang[lang][USB_state_data.USB_state]],
        ]
    }
    if (USB_state_data.USB_state == "LANG_CONNECTED") {
        var USB_List = {}
        Page_data_obj_init(USB_List, OneForAll("getASPdata/listUsbDevices", 5, 0, 0, 0));

        function loop_of_list() {
            var tmp_arr = [];
            for (var key in USB_List) {
                tmp_arr.push([key, key]);
            }
            return tmp_arr;
        }
        USB_Page[1].push(["form", "USB_CONFIG_FORM", "action=\"/boaform/getASPdata/formUSBbak\" method=\"POST\"", "1", , Process_Method]);
        USB_Page[1].push(["menu", "USB_List", "arrLang[lang]['LANG_USB_PARTITION_SELECTION']", "usbdev", loop_of_list()]);
        USB_Page[1].push(["switch", "fast_bk_recover", "arrLang[lang]['LANG_CONFIG_RECOVERY']", "cfgFastRestoreEnable"]);
        USB_Page[1].push(["submit", "usb_backup_config_restore_and_reboot_submit", backup_config_restore, "arrLang[lang]['LANG_USB_BACKUP_CONFIG_RESTORE_AND_REBOOT']"]);/*Add by fyy for mission#24122*/
        USB_Page[1].push(["append", "<div style=\"line-height:20px;\">" + "&nbsp" + "</div>"]);
        USB_Page[1].push(["submit", "BackUp_Config_submit", backup_config_restore, "arrLang[lang]['LANG_BACKUP_CONFIGRUTION']"]);
        USB_Page[1].push(["hidden", "action", "bk"]);
        USB_Page[1].push(["append", "<br>"]);
        USB_Page[1].push(["append", "<div id='unmount_submit_place'></div>"]);
		
		/*Add by fyy for mission#24122*/
		function backup_config_restore(tar) {
			if (tar.prop("id") == "usb_backup_config_restore_and_reboot_submit") {
				$("#USB_CONFIG_FORM").find("input[name='action']").val("res");
			} else if (tar.prop("id") == "BackUp_Config_submit") {
				if ($("#USB_CONFIG_FORM").find("input[name='action']").val() == "en") {
					setTimeout(function () {
						$("#USB_CONFIG_FORM").find("input[name='action']").val("bk");
					}, 100);
				} else {
					$("#USB_CONFIG_FORM").find("input[name='action']").val("bk");
				}
			}
			return true;
		}

        function Process_Method(data) {
            if (data.indexOf("LANG_BACKUP_IS_EXIST") != -1) {
                var alert_flow_page = {
                    id: "BackUp_EXIST_page",
                    name: arrLang[lang]["LANG_BACKUP_IS_EXIST"],
                    height: "300px",
                }
                flow_table_generate(alert_flow_page);
                var flow_page_contain = {
                    "length": 1,
                    1: [
                        ["#BackUp_EXIST_page", 0, 2],
                        ["form", "USB_BK_EXIST_FORM", "action=\"/boaform/getASPdata/formUSBbak\" method=\"POST\"", "1", , Process_Method],
                        ["hidden", "usbdev", $("#USB_CONFIG_FORM").find("input[name='usbdev']").val()],
                        ["hidden", "forcebackup", "1"],
                        ["submit", "DEL_BK_And_ReBK", , arrLang[lang]['LANG_BACKUP_AFTER_DELETE']],
                    ]
                }
                Auto_Page_generate(flow_page_contain);
                FMask_init();
            } else if (data.indexOf("LANG_UNLOAD_SUCCESSFULLY") != -1) {
                USB_function_page_init();
                MyAlert(arrLang[lang]['LANG_UNLOAD_SUCCESSFULLY']);
            } else if (data.indexOf("LANG_SAVE_SUCCESSFULLY") != -1) {
                $(".layui-layer-close2").click();
                MyAlert(arrLang[lang]['LANG_SAVE_SUCCESSFULLY']);
                USB_function_page_init();
            } else if (data.indexOf("LANG_USB_BACKUP_CONFIG_RESTORE_SUCCESS") != -1) {
                start_count_down(80);
            } else {
                MyAlert(arrLang[lang][data]);
            }
            FMask_init();
        }
        Auto_Page_generate(USB_Page);
        $("#fast_bk_recover").on("click", function () {
            $("#USB_CONFIG_FORM").find("input[name='action']").val("en");
            $("#BackUp_Config_submit").click();
        });
        $(".USB_List").on("click", function () {
            setTimeout(function () {
                $("#unmount_submit_place").find("input[name='usbdev']").val($("#USB_CONFIG_FORM").find("input[name='usbdev']").val());
            }, 100);
        });
        var Unmount_Page = {
            "length": 1,
            1: [
                ["#unmount_submit_place", 0, 2],
                ["form", "USB_Unmount_FORM", "action=\"/boaform/getASPdata/formUSBUmount\" method=\"POST\"", "1", , Process_Method],
                ["hidden", "usbdev", ""],
                ["submit", "Unmount_submit", , "arrLang[lang]['LANG_USB_UNLOAD']", "btn-danger"],
            ]
        }
        Auto_Page_generate(Unmount_Page);
        $(".USB_List").eq(0).click();

        var USB_Store_page = {
            "length": 1,
            1: [
                ["USB_Store_page_row", arrLang[lang]['LANG_STORAGE'], 2],
                ["form", "USB_Store_FORM", "action=\"/boaform/getASPdata/formStorage\" method=\"POST\"", "1", , Process_Method],
                ["menu", "USB_List2", "arrLang[lang]['LANG_USB_FILE_DIRECTORY']", "saveDir", loop_of_list()],
                ["text", "B_user", "arrLang[lang][\"LANG_USERNAME\"]", "user", "32"],
                ["password", "B_passwd", "arrLang[lang][\"LANG_PASSWORD\"]", "passwd", "32"],
                ["text", "B_port", "arrLang[lang][\"LANG_PORT\"]", "port", "6"],
                ["text", "B_rmtURL", "arrLang[lang][\"LANG_REMOTE_URL\"]", "rmtURL", "128"],
                ["tips", "h6", "class='tips_font'", arrLang[lang]['LANG_STORAGE_NOTE_1']],
                ["submit", "USB_Store_submit", Store_Page_check, arrLang[lang]['LANG_DOWNLOAD']],
            ]
        }
        var Store_PM = {};
        Store_PM = Auto_Page_generate(USB_Store_page);
        $(".USB_List2").eq(0).click();
        function Store_Page_check() {
            if (Store_PM.user.val() != "" && !sji_checkpppacc(Store_PM.user.val(), 1, 32)) {
                swal_check_warning("input[name='user']", arrLang[lang]['LANG_ADD_DDNS_ERR_2']);
                return false;
            }
            if (Store_PM.passwd.val() != "" && !sji_checkpswnor(Store_PM.passwd.val(), 1, 32)) {
                swal_check_warning("input[name='passwd']", arrLang[lang]['LANG_ADD_DDNS_ERR_3']);
                return false;
            }
            if (Store_PM.port.val() !== "" && !sji_checkdigitrange(Store_PM.port.val(), 1, 65535)) {
                swal_check_warning("input[name='port']", arrLang[lang]['LANG_APP_STORAGE_ERR_3']);
                return false;
            }
            if (!sji_checkurl(Store_PM.rmtURL.val())) {
                swal_check_warning("input[name='rmtURL']", arrLang[lang]['LANG_APP_STORAGE_ERR_4']);
                return false;
            }
            return true;
        }
    } else {
        USB_Page[1].push(["button", "USB_STATE_REFRESH", "arrLang[lang]['LANG_REFRESH']", "btn-info"]);
        Auto_Page_generate(USB_Page);
        $("#USB_STATE_REFRESH").on("click", function () {
            USB_function_page_init();
        })
    }
    var USB_Printer_page = {
        "length": 1,
        1: [
            ["USB_Printer_page_row", arrLang[lang]['LANG_USBP_MGM'], 2],
            ["form", "USB_Printer_FORM", "action=\"/boaform/getASPdata/formUsbPrinterSetup\" method=\"POST\"", "1"],
            ["text", "B_usbPrinterNm", "arrLang[lang][\"LANG_DEVICE_NAME\"]", "usbPrinterNm", "32"],
            ["text", "B_usbPrinterMk", "arrLang[lang][\"LANG_USBP_DEVICE_MAKE\"]", "usbPrinterMk", "32"],
            ["submit", "USB_Printer_submit"]
        ]
    }
    if (USB_state_data.usbPrinterNm != undefined && USB_state_data.usbPrinterMk != undefined) {
        Auto_Page_generate(USB_Printer_page);
    }
    set_obj_data_to_html(USB_state_data);

    FMask_init();
}

function check_Samba_Page_row() {
    if (!sji_checkstrnor($("input[name='SambaName']").val(), 1, 32)) {
        swal_check_warning("input[name='SambaName']", arrLang[lang]['LANG_ADD_DDNS_ERR_2']);
        return false;
    }
    if (!sji_checkLoginPsk($("input[name='SambaPasswd']").val(), 1, 32)) {
        swal_check_warning("#Samba_Passwd", arrLang[lang]["LANG_MGM_USER_PASSWORD_RULE3"] + "\n" + arrLang[lang]["LANG_MGM_USER_PASSWORD_RULE4"]);
        return false;
    }
    return true;
}

var Samba_Page = {
    "length": 1,
    1: [
        ["Samba_Page_row", "Samba", "2"],
        ["form", "Samba_form", "action=\"/boaform/getASPdata/formSamba\" method=\"POST\"", "1", Samba_Page_init],
        ["switch", "Enable_Samba", "arrLang[lang][\"LANG_ENABLE\"]", "EnableSamba"],
        ["text", "Samba_Name", "arrLang[lang][\"LANG_USERNAME\"]", "SambaName", "32"],
        ["password", "Samba_Passwd", "arrLang[lang][\"LANG_PASSWORD\"]", "SambaPasswd", "32"],
        ["submit", "Samba_submit", check_Samba_Page_row]
    ]
}

function Samba_Page_init() {
    var Samba_Page_data = {};
    Page_data_obj_init(Samba_Page_data, OneForAll("getASPdata/get_Samba_Page_data", 5, 0, 0, 0));

    if (Samba_Page_data.EnableSamba == undefined ||
        Samba_Page_data.SambaName == undefined ||
        Samba_Page_data.SambaPasswd == undefined) {
        $("#Samba_Page_row").remove();
        return;
    }

    set_obj_data_to_html(Samba_Page_data);
    FMask_init();
}


function check_Ftp_Page_row() {
    if (!sji_checkstrnor($("input[name='FtpName']").val(), 1, 32)) {
        swal_check_warning("input[name='FtpName']", arrLang[lang]['LANG_ADD_DDNS_ERR_2']);
        return false;
    }
    if (!sji_checkLoginPsk($("input[name='FtpPasswd']").val(), 1, 32)) {
        swal_check_warning("#Ftp_Passwd", arrLang[lang]["LANG_MGM_USER_PASSWORD_RULE3"] + "\n" + arrLang[lang]["LANG_MGM_USER_PASSWORD_RULE4"]);
        return false;
    }
    return true;
}

var Ftp_Page = {
    "length": 1,
    1: [
        ["Ftp_Page_row", "FTP", "2"],
        ["form", "Ftp_form", "action=\"/boaform/getASPdata/formFtp\" method=\"POST\"", "1", Ftp_Page_init],
        ["switch", "Ftp_Enable", "arrLang[lang][\"LANG_ENABLE\"]", "EnableFtp"],
        ["text", "Ftp_Name", "arrLang[lang][\"LANG_USERNAME\"]", "FtpName", "16"],
        ["password", "Ftp_Passwd", "arrLang[lang][\"LANG_PASSWORD\"]", "FtpPasswd", "16"],
        ["submit", "Ftp_submit", check_Ftp_Page_row]
    ]
}

function Ftp_Page_init() {
    var Ftp_Page_data = {};
    Page_data_obj_init(Ftp_Page_data, OneForAll("getASPdata/get_Ftp_Page_data", 5, 0, 0, 0));

    if (Ftp_Page_data.EnableFtp == undefined ||
        Ftp_Page_data.FtpName == undefined ||
        Ftp_Page_data.FtpPasswd == undefined) {
        $("#Ftp_Page_row").remove();
        return;
    }

    set_obj_data_to_html(Ftp_Page_data);
    FMask_init();
}

$(document).ready(function () {
    Other_Page_init();
    Auto_Page_generate(Other_Page);
    Auto_Page_generate(UPnP_Page);
    Auto_Page_generate(Ftp_Page);
    Auto_Page_generate(Samba_Page);
    DDNS_window_init();
    DDNS_Table_List_init();
    UPnP_Page_init();
    USB_function_page_init();
    Ftp_Page_init();
    Samba_Page_init();

    (function (s) {
        s(".container-fluid").on("click", function () {
            if ($("input[name='EnableSamba']").val() == "0") {
                $("input[name='SambaName']").attr("disabled", true);
                $("input[name='SambaPasswd']").attr("disabled", true);
            } else {
                $("input[name='SambaName']").removeAttr("disabled");
                $("input[name='SambaPasswd']").removeAttr("disabled");
            }

            if ($("input[name='EnableFtp']").val() == "0") {
                $("input[name='FtpName']").attr("disabled", true);
                $("input[name='FtpPasswd']").attr("disabled", true);
            } else {
                $("input[name='FtpName']").removeAttr("disabled");
                $("input[name='FtpPasswd']").removeAttr("disabled");
            }

            if (get_wan_name_list_data.indexOf("nolist") != -1) {
                $("#UPnP_Page_row").hide();
            }
        })
    })(jQuery);

    $(".container-fluid").click();
});
