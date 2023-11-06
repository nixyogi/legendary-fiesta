var TR069_Client_Page = {
    "length": 6,
    1: [
        ["#TR069_Client_row", "arrLang[lang][\"LANG_TR069_CLIENT_CONFIGURATION\"]", "2"],
        ["form", "TR069_form", "action=\"/boaform/getASPdata/formTR069Config\" method=\"post\"", "1"],
        ["switch", "enable_remote_manage", "arrLang[lang][\"LANG_ENABLE\"],arrLang[lang][\"LANG_TR069\"]", "acsCwmpFlag"],
        ["text", "service_url", "arrLang[lang][\"LANG_SERVER_URL\"]", "acsURL", "256"],
        ["text", "Client_User_name", "arrLang[lang][\"pppoe_username\"]", "acsUser", "256"],
        ["password", "Client_User_pssword", "arrLang[lang][\"pppoe_password\"]", "acsPwd", "256"],
        ["switch", "enable_Certificate", "arrLang[lang][\"LANG_ENABLE_CERTIFICATE\"]", "certauth"],
        ["switch", "Periodic_reporting", "arrLang[lang][\"LANG_PERIODIC_REPORT\"]", "inform"],
        ["text", "Periodic_reporting_interval", "arrLang[lang][\"LANG_PERIODIC_REPORT_INTERVAL\"],(s)", "informInterval", "10"],
        ["text", "connect_request_username", "arrLang[lang][\"LANG_CONNECT_REQUEST_USERNAME\"]", "connReqUser", "256"],
        ["password", "connect_request_password", "arrLang[lang][\"LANG_CONNECT_REQUEST_PASSWORD\"]", "connReqPwd", "256"],
        ["hidden", "applyTr069Config", "1"],
        ["submit", "TR069_Client_Submit", chekc_TR069_Client_row],
    ],
    2: [
        ["#LOID_Config_row", "arrLang[lang][\"LANG_LLID_CONFIG\"]", "2"],
        ["form", "LOID_form", "action=\"/boaform/getASPdata/formUserReg\" method=\"post\"", "1"],
        ["text", "LOID_input", "LOID", "loid", "24"],
        ["password", "LOID_password", "arrLang[lang][\"pppoe_password\"]", "password", "24"],
        ["submit", "LOID_Submit", check_LOID_Config_row],
    ],
    3: [
        ["#PWD_Config_row", "arrLang[lang][\"LANG_PLOAM_CONFIG\"]", "2"],
        ["form", "GPON_SN_form", "action=\"/boaform/getASPdata/formUserReg2\" method=\"post\"", "1"],
        ["text", "gpon_sn", "GPON SN", "gponsn", "24", "disabled"],
        ["password", "gpon_sn_passwd", "arrLang[lang][\"pppoe_password\"]", "snpassword", "24"],
        ["submit", "GPON_SN_Submit", check_PWD_Config_row],
    ],
    4: [
        ["#CA_Upload_row", "arrLang[lang][\"LANG_TRUSTED_CA_CERTIFICATE\"]", "2"],
        ["append", upload_ca_cert_page_init()],
    ],
    5:[
        ["#STUN_Config_row", "arrLang[lang][\"LANG_STUN_CONFIG\"]", "2"],
        ["form", "STUN_form", "action=\"/boaform/getASPdata/formTR069ConfigStun\" method=\"post\"", "1"],
        ["switch", "enable_stun_manage", "arrLang[lang][\"LANG_ENABLE\"],arrLang[lang][\"LANG_STUN\"]", "stun_enable"],
        ["text", "stun_service_url", "arrLang[lang][\"LANG_SERVER_URL\"]", "stunsvraddr", "256"],
        ["text", "stun_service_port", "arrLang[lang][\"LANG_SERVER_PORT\"]", "stunsvrport", "8"],
        ["text", "stun_service_username", "arrLang[lang][\"LANG_STUN\"],arrLang[lang][\"pppoe_username\"]", "stunsvruname", "256"],
        ["password", "stun_service_password", "arrLang[lang][\"LANG_STUN\"],arrLang[lang][\"pppoe_password\"]", "stunsvrupasswd", "256"],
        ["submit", "STUN_Submit", check_STUN_Config_row],
    ],
    6: [
        ["Cwmp_Acl_row", "Tr069 Wan Acl Config", "2"],
        ["form", "Cwmp_Acl_list_form", "action=\"/boaform/getASPdata/formCwmpBlock\" method=\"post\"", "1",ACL_Add_success],
        ["hidden", "action", "delete"],
            ["append", "<div class=\"table-responsive\">\
            <table class=\"table table-bordered table-striped\">\
            <thead>\
                <tr>\
                    <th>" + "ACL IP" + "</th>\
                    <th>" + "ACL MASK" + "</th>\
                </tr>\
            </thead>\
            <tbody id=\"Cwmp_Acl_List\"></tbody>\
        </table>\
        </div>"],
            ["append", "<div>\
        <div style=\"display: inline;\"><button type=\"button\" id=\"Cwmp_Acl_Add\" action=\"addAcl\" class=\"btn btn-primary btn-round\">" + arrLang[lang]["LANG_ADD"] + "</button></div>\
        <div style=\"display: inline;\"><button type=\"button\" id=\"Cwmp_Acl_Del\" action=\"delAcl\" class=\"btn btn-danger btn-round\">" + arrLang[lang]["LANG_DELETE_SELECTED"] + "</button></div>\
    </div>"]
    ]
}

function upload_ca_cert_page_init() {
    var file_choose_element = "<form id=\"CA_Upload_form\" action=\"/boaform/getASPdata/formTR069CACert\" method=\"post\"><table>\
    <tbody>\
        <tr>\
            <th>\
                <div width=\"200px\">\
                    <input class=\"lang\" type=\"file\" id=\"upgrade_file\" key=\"LANG_CHOOSE_FILE\"\
                        name=\"binary\">\
                </div>\
            </th>\
        </tr>\
    </tbody>\
</table>\
</form>\
<br>"
    var button_upload_del_element = "<from id=\"CA_File_Del_form\" action=\"boaform/getASPdata/formTR069CACertDel\" method=\"post\"></from>\
    <table>\
        <tbody>\
            <tr>\
                <td width=\"150px\">\
                    <div>\
                        <button type=\"button\" id=\"CA_file_Upload_Submit\"\
                            class=\"btn btn-primary btn-block btn-round\"\
                            >"+ arrLang[lang]["LANG_CERTIFICATE_IMPORT"] + "</button>\
                    </div>\
                </td>\
                <td width=\"50px\"></td>\
                <td width=\"200px\">\
                    <div style=\"display:none;\">\
                        <button type=\"button\" id=\"CA_file_Del\"\
                            class=\"btn btn-danger btn-block btn-round\"\
                            >"+ arrLang[lang]["LANG_DELETE_CERT"] + "</button>\
                    </div>\
                </td>\
            </tr>\
        </tbody>\
    </table>"

    return file_choose_element + button_upload_del_element;
}

function CA_File_Page_init() {
    (function (s) {
        s("#CA_file_Upload_Submit").on('click', function (e) {
            $("#waiting_animation").show();
            $.ajaxSettings.async = true;
            s("#CA_Upload_form").submit();
        })
        s("#CA_file_Del").on('click', function (e) {
            $("#waiting_animation").show();
            $.ajaxSettings.async = true;
            s("#CA_File_Del_form").submit();
        })
    })(jQuery);
}

function check_STUN_Config_row() {
    if ($("input[name='stunsvraddr']").val().length > 256) {
        MyAlert('The length of STUN service URL (' + $("input[name='stunsvraddr']").val().length + ') is too long [1-256].');
        $("input[name='stunsvraddr']").focus();
        return false;
    }
    if (!sji_checkhttpurl($("input[name='stunsvraddr']").val())) {
        MyAlert('The STUN service URL is an illegal URL.');
        $("input[name='stunsvraddr']").focus();
        return false;
    }
    if ($("input[name='stunsvrport']").length && $("input[name='stunsvrport']").val().length != 0) {
        var portnumber = $("input[name='stunsvrport']").val();
        if (!sji_checkdigitrange(portnumber, 0, 65535)) {
            swal_check_warning("input[name='stunsvrport']", arrLang[lang]["LANG_SERVER_PORT"] + " " + portnumber + " " + arrLang[lang]["LANG_IS_INVALID"]);
            return false;
        }
    }
    if ($("input[name='stunsvruname']").val().length > 256) {
        MyAlert('The length of STUN username (' + $("input[name='stunsvruname']").val().length + ') is too long [0-256].');
        $("input[name='stunsvruname']").focus();
        return false;
    }
    if (isInvalidInput($("input[name='stunsvruname']").val())) {
        MyAlert('The STUN username contains illegal characters, please input it again!');
        $("input[name='stunsvruname']").focus();
        return false;
    }
    if ($("input[name='stunsvrupasswd']").val().length > 256) {
        MyAlert('The length of STUN password (' + $("input[name='stunsvrupasswd']").val().length + ') is too long [0-256].');
        $("input[name='stunsvrupasswd']").focus();
        return false;
    }
    if (isInvalidInput($("input[name='stunsvrupasswd']").val())) {
        MyAlert('The STUN password contains illegal characters, please input it again!');
        $("input[name='stunsvrupasswd']").focus();
        return false;
    }
    return true;
}

function chekc_TR069_Client_row() {
    if ($("input[name='acsURL']").val().length > 256) {
        MyAlert('The length of ACS URL (' + $("input[name='acsURL']").val().length + ') is too long [1-256].');
        $("input[name='acsURL']").focus();
        return false;
    }
    if (!sji_checkhttpurl($("input[name='acsURL']").val())) {
        MyAlert(arrLang[lang]["LANG_NET_TR069_ERROR_1"]);
        $("input[name='acsURL']").focus();
        return false;
    }
    if (!sji_checknum($("input[name='informInterval']").val())) {
        MyAlert(arrLang[lang]["LANG_NET_TR069_ERROR_2"]);
        $("input[name='informInterval']").focus();
        return false;
    }
    if ($("input[name='acsUser']").val().length > 256) {
        MyAlert('The length of ACS user name (' + $("input[name='acsUser']").val().length + ') is too long [0-256].');
        $("input[name='acsUser']").focus();
        return false;
    }
    if (isInvalidInput($("input[name='acsUser']").val())) {
        MyAlert(arrLang[lang]["LANG_NET_TR069_ERROR_3"]);
        $("input[name='acsUser']").focus();
        return false;
    }
    if ($("input[name='acsPwd']").val().length > 256) {
        MyAlert('The length of sysName (' + $("input[name='acsPwd']").val().length + ') is too long [0-256].');
        $("input[name='acsPwd']").focus();
        return false;
    }
    if (isInvalidInput($("input[name='acsPwd']").val())) {
        MyAlert(arrLang[lang]["LANG_NET_TR069_ERROR_4"]);
        $("input[name='acsPwd']").focus();
        return false;
    }
    if ($("input[name='connReqUser']").val().length > 256) {
        MyAlert('The length of connection request user name (' + $("input[name='connReqUser']").val().length + ') is too long [0-256].');
        $("input[name='connReqUser']").focus();
        return false;
    }
    if (isInvalidInput($("input[name='connReqUser']").val())) {
        MyAlert(arrLang[lang]["LANG_NET_TR069_ERROR_5"]);
        $("input[name='connReqUser']").focus();
        return false;
    }
    if ($("input[name='connReqPwd']").val().length > 256) {
        MyAlert('The length of connection request password (' + $("input[name='connReqPwd']").val().length + ') is too long [0-256].')
        $("input[name='connReqPwd']").focus();
        return false;
    }
    if (isInvalidInput($("input[name='connReqPwd']").val())) {
        MyAlert(arrLang[lang]["LANG_NET_TR069_ERROR_6"]);
        $("input[name='connReqPwd']").focus();
        return false;
    }
    return true;
}

function check_LOID_Config_row() {
    if (sji_checkpppacc($("input[name='loid']").val(), 1, 24) == false) {
        MyAlert("LOID " + $("input[name='loid']").val() + " " + arrLang[lang]["LANG_LLID_CONFIG_ERR_1"]);
        $("input[name='loid']").focus();
        return false;
    }
    if (sji_checkpppacc($("input[name='password']").val(), 1, 24) == false) {
        MyAlert(arrLang[lang]["LANG_PASSWORD"] + " " + $("input[name='password']").val() + " " + arrLang[lang]["LANG_LLID_CONFIG_ERR_1"]);
        $("input[name='password']").focus();
        return false;
    }
    return true;
}

function check_PWD_Config_row() {
    if (sji_checkpppacc($("input[name='snpassword']").val(), 1, 24) == false) {
        MyAlert(arrLang[lang]["LANG_PASSWORD"] + " " + $("input[name='snpassword']").val() + " " + arrLang[lang]["LANG_LLID_CONFIG_ERR_1"]);
        $("input[name='snpassword']").focus();
        return false;
    }
    return true;
}

function Global_click_monitoring() {
    (function (s) {
        s(".container-fluid").on('click', function (e) {
            if ($("input[name='acsCwmpFlag']").val() == "0") {
                $("#enable_remote_manage").parents("table").parent("div").nextAll().each(function (e) {
                    $(this).slideUp();
                })
            } else {
                $("#enable_remote_manage").parents("table").parent("div").nextAll().each(function (e) {
                    if ($(this).children("table").prop("id") == "Periodic_reporting_interval_Table") {
                        return;
                    } else
                        $(this).slideDown();
                })
            }
            if ($("input[name='inform']").val() == "0") {
                $("#Periodic_reporting_interval").parents("table").parent("div").slideUp();
            } else if ($("input[name='acsCwmpFlag']").val() == "1" && $("input[name='inform']").val() == "1") {
                $("#Periodic_reporting_interval").parents("table").parent("div").slideDown();
            }

            if ($("input[name='stun_enable']").val() == "0") {
                $("#enable_stun_manage").parents("table").parent("div").nextAll().each(function (e) {
                    $(this).slideUp();
                })
            } else {
                $("#enable_stun_manage").parents("table").parent("div").nextAll().each(function (e) {
                    $(this).slideDown();
                })
            }
        })
        s("#Cwmp_Acl_Del").on("click", function (e) {
            $("#waiting_animation").show();
            $.ajaxSettings.async = true;
            s("#Cwmp_Acl_list_form").submit();
        });
    })(jQuery);
    $(".container-fluid").click();
}

function check_CA_file_exist() {
    if (Network_TR069_obj["CA_file_Del"] == "1") {
        $("#CA_file_Del").parent("div").show();
    } else {
        $("#CA_file_Del").parent("div").hide();
    }
}

var Cwmp_Acl_Page_data = {};
var Cwmp_Acl_Md_data = {};

function Cwmp_Acl_List_init() {
    for (var key in Cwmp_Acl_Page_data) {
        delete Cwmp_Acl_Page_data[key];
    }
    $("#Cwmp_Acl_List").empty();

    Page_data_obj_init(Cwmp_Acl_Page_data, OneForAll("getASPdata/cwmpBlockList", 5, 0, 0, 0));
    for (var key in Cwmp_Acl_Page_data) {
        if (key.indexOf("rml") != -1) {
            var tmp = Cwmp_Acl_Page_data[key];
            var value_split = tmp.split("&");
            $("#Cwmp_Acl_List").append(
                "<tr class=\"justhover\">" +
                "<td>" + value_split[0] + "</td>" +
                "<td>" + value_split[1] + "</td>" +
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

function ACL_Add_success() {
    Cwmp_Acl_List_init();
    $(".layui-layer-close2").click();
}

function Cwmp_Acl_Add_Config_window_init() {
    var data = {
        id: "Cwmp_Acl_Page_Add",
        name: "Cwmp WAN Acl Configuration",
    }

    var Add_Page = {
        "length": 1,
        1: [
            ["Cwmp_Acl_Page_Add", 0],
            ["form", "Cwmp_Acl_Add_form", "action=\"/boaform/getASPdata/formCwmpBlock\" method=\"post\"", "1", ACL_Add_success],
            ["text", "cwmpacl_ipaddr", arrLang[lang]["LANG_IP_ADDRESS"], "cwmpaclIpaddr"],
            ["text", "cwmpacl_maskbit", arrLang[lang]["LANG_MASK"], "cwmpaclMaskbit"],
            ["hidden", "action", "add"],
            ["submit", "Add_submit", ACL_Add_check, "arrLang[lang][\"LANG_ADD\"]"]
        ]
    };

    (function (s) {
        s("#Cwmp_Acl_Add").on("click", function () {
            flow_table_generate(data);
            Auto_Page_generate(Add_Page);
            FMask_init();
        })
    })(jQuery);
}

function ACL_Add_check() {

    if ($("input[name='cwmpaclIpaddr']").val().length!=0 && sji_checkvip($("input[name='cwmpaclIpaddr']").val()) == false) {
        $("input[name='cwmpaclIpaddr']").focus();
        MyAlert(arrLang[lang]["LANG_IP_ADDRESS"] + " " + arrLang[lang]["LANG_IS_INVALID"]);
        return false;
    }
    if (sji_checkdigitrange($("input[name='cwmpaclMaskbit']").val(), 1, 32) == false) {
        $("input[name='cwmpaclMaskbit']").focus();
        MyAlert(arrLang[lang]["LANG_MASK"] + " " + arrLang[lang]["LANG_IS_INVALID"]);
        return false;
    }
    return true;
}

var Network_TR069_obj = {};

$(document.ready).ready(function () {
    Auto_Page_generate(TR069_Client_Page, "200px");
    Page_data_obj_init(Network_TR069_obj, OneForAll("getASPdata/Network_TR069_Page_init", 5, 0, 0, 0));
    check_CA_file_exist();
    set_obj_data_to_html(Network_TR069_obj);
    CA_File_Page_init();
    Cwmp_Acl_Add_Config_window_init()
    Cwmp_Acl_List_init();
    Page_data_obj_init(Cwmp_Acl_Md_data, OneForAll("getASPdata/cwmpBlockMode", 5, 0, 0, 0));
    if(Cwmp_Acl_Md_data.CwmpAclMd != '1'){
        $("#Cwmp_Acl_row").remove();
    }
    Global_click_monitoring();
    $("#CA_Upload_form").ajaxForm(function (data) {
        FMask_init();
        if (data == "success") {
            Page_data_obj_init(Network_TR069_obj, OneForAll("getASPdata/Network_TR069_Page_init", 5, 0, 0, 0));
            check_CA_file_exist();
            $('#CA_Upload_form')[0].reset();
            $("#waiting_animation").hide();
            MyAlert(arrLang[lang]["LANG_UPLOAD_SUCCESS"]);
        } else {
            MyAlert("ERROR");
            console.log(data);
        }
    })
    $("#CA_File_Del_form").ajaxForm(function (data) {
        FMask_init();
        if (data == "success") {
            Page_data_obj_init(Network_TR069_obj, OneForAll("getASPdata/Network_TR069_Page_init", 5, 0, 0, 0));
            check_CA_file_exist();
            $('#CA_Upload_form')[0].reset();
            $("#waiting_animation").hide();
            MyAlert(arrLang[lang]["LANG_DELETE_SUCCESS"]);
        } else {
            MyAlert("ERROR");
            console.log(data);
        }
    })
});
