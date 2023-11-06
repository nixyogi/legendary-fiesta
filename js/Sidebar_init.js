function NEWWEB_Siderbar_init(NW_S_B) {
    let Finnal_Res = "";
    for (const i in NW_S_B) {
        const nwsb_i = NW_S_B[i];
        const nwsb_i_0 = nwsb_i[0];
        const nwsb_i_1 = nwsb_i[1];
        const nwsb_i_2 = nwsb_i[2];
        switch (nwsb_i_0) {
            case "Line": // Divider
                Finnal_Res += "<hr class=\"sidebar-divider\">";
                continue;
            case "L_Word": // Heading
                Finnal_Res += "<div class=\"sidebar-heading lang\" key=\"" + (nwsb_i_1 == 0 ? nwsb_i_2 : nwsb_i_1) + "\"></div>";
                continue;
            default: // ["h6", "lang_heading_name"] || ["js_name", "lang_menu_name", "id"] || ["js_name", 0, "menu_name", "id"]
                Finnal_Res += "<li class=\"nav-item\" id=\"" + nwsb_i_0 + "\"><a class=\"nav-link collapsed\" href=\"#\" data-toggle=\"collapse\" data-target=\"#collapse" + nwsb_i_0 + "\"><i class=\"fas fa-fw " + nwsb_i_1 + "\"></i><span class=\"lang\" key=\"" + nwsb_i_0 + "\"></span></a><div id=\"collapse" + nwsb_i_0 + "\" class=\"collapse\" data-parent=\"#accordionSidebar\"><div class=\"bg-white py-2 collapse-inner rounded\">";
                for (const j in nwsb_i_2) {
                    const nwsb_i_2_j = nwsb_i_2[j];
                    const nwsb_i_2_j_0 = nwsb_i_2_j[0];
                    const nwsb_i_2_j_1 = nwsb_i_2_j[1];
                    if (nwsb_i_2_j_0 == "h6") {
                        Finnal_Res += "<h6 class=\"collapse-header lang\" key=\"" + nwsb_i_2_j_1 + "\"></h6>";
                    } else {
                        const nwsb_i_2_j_2 = nwsb_i_2_j[2];
                        Finnal_Res += "<a class=\"collapse-item lang sidebar_tag\" id=\"" + (nwsb_i_2_j_1 == 0 ? nwsb_i_2_j[3] : nwsb_i_2_j_2) + "\" href=\"#\" js=\"" + nwsb_i_2_j_0 + "\" key=\"" + (nwsb_i_2_j_1 == 0 ? "" : nwsb_i_2_j_1) + "\">" + (nwsb_i_2_j_1 == 0 ? nwsb_i_2_j_2 : "") + "</a>";
                    }
                }
                Finnal_Res += "</div></div></li>";
                break;
        }
    }
    Finnal_Res += "<hr class=\"sidebar-divider d-md-block\"><div class=\"text-center d-md-inline\"><button class=\"rounded-circle border-0\" id=\"sidebarToggle\"></button></div>";
    $("#accordionSidebar").append(Finnal_Res);
}

let Admin_Sidebar = [
    ["LANG_STATUS", "fa-info", [
        ["h6", "HGU Status"],
        ["index_control.js", "LANG_DEVICE_INFO", "stat_index"],
        ["Status_WAN_control.js", "LANG_WAN_CONNECTION_INFO", "stat_wan"],
        ["Status_PON_control.js", "PON_INFO", "stat_pon"],
        ["Status_Connected_User_control.js", "LANG_USER_INFO", "stat_user"],
        ["Status_CATV_control.js", "LANG_CATV_STATUS", "stat_catv"],
        ["Status_Wireless_Performance_control.js", "LANG_WIRELESS_PERFORMANCE", "stat_wlan"],
    ]],
    ["LANG_NETWORK", "fa-globe", [
        ["h6", "Network Settings"],
        ["Network_WAN_control.js", "LANG_WAN", "net_wan"],
        ["Network_LAN_control.js", "LANG_LAN", "net_lan"],
        ["h6", "LANG_WLAN"],
        ["Network_2.4G_control.js", 0, "2.4G", "net_2g"],
        ["Network_5G_control.js", 0, "5G", "net_5g"],
        ["Network_ClientMangement_control.js", "LANG_WLAN_CLIENT_MANGEMENT", "net_client"],
        ["Network_FamilyGroupManagement_control.js", "LANG_FAMILY_GROUP_MANAGEMENT", "net_family_gourp"],
        ["h6", "Others"],
        ["Network_CATV_control.js", 0, "CATV", "net_catv"],
        ["Network_Binding_control.js", "LANG_BIND", "net_bind"],
        ["Network_TR069_control.js", "LANG_TR069", "net_tr069"],
        ["Network_QoS_control.js", "LANG_QOS", "net_qos"],
        ["Network_Time_control.js", "LANG_TIME", "net_time"],
        ["Network_Route_control.js", "LANG_ROUTER_CONFIG", "net_route"],
    ]],
    ["Line"],
    ["L_Word", "Advance Settings"],
    ["LANG_SECURITY", "fa-shield-alt", [
        ["h6", "Security Config"],
        ["Security_WAN_Access_control.js", "LANG_URL_FILTER", "sec_url"],
        ["Security_Firewall_control.js", "LANG_FIREWALL", "sec_fw"],
        ["Login_Privilege_control.js", "LANG_LOGIN_PRIVILEGE", "sec_login"],
        ["Security_MAC_Filter_control.js", "LANG_MAC_FILTERING", "sec_mac"],
        ["Security_Port_Filter_control.js", "LANG_IP_PORT_FILTERING", "sec_port"],
    ]],
    ["LANG_APPLICATION", "fa-sitemap", [
        ["h6", "Application Config"],
        ["Application_VOIP_control.js", "LANG_VOIP_BASIC_CONFIG", "app_voip"],
        ["Application_VOIP_Adv_control.js", "LANG_VOIP_ADVANCE_CONFIG", "app_voipadv"],
        ["Application_Multicast_Setting_control.js", "Multicast Setting", "app_igmp"],
        ["Application_Advanced_NAT_control.js", "LANG_ADVANCE_NAT_CONFIG", "app_nat"],
        ["Application_MQTT_control.js", 0, "MQTT", "app_mqtt"],
        ["Application_Others_control.js", "Others", "app_other"],
    ]],
    ["LANG_MANAGEMENT", "fa-toolbox", [
        ["h6", "LANG_MANAGEMENT"],
        ["Management_User_control.js", "LANG_USER_MANAGEMENT", "mgmt_user"],
        ["Management_Device_control.js", "LANG_DEVICE_MANAGEMENT", "mgmt_device"],
        ["Management_Log_File_control.js", "LANG_LOG_FILE_MANAGEMENT", "mgmt_log"],
        ["Management_Other_control.js", "LANG_OTHER_MANAGEMENT", "mgmt_other"],
    ]],
    ["LANG_DIAGNOSTICS", "fa-tools", [
        ["h6", "Diagnose Tools"],
        ["Diagnose_Network_control.js", "LANG_NETWORK_DIAGNOSTICS", "diag_net"],
        ["Diagnose_LoopBack_control.js", "LANG_LOOPBACK_SET", "diag_loop"],
        ["Diagnose_Self_control.js", "LANG_SELF_DIAGNOSE", "diag_self"],
        ["Diagnose_AP_Detect_control.js", "LANG_AP_DETECT", "diag_ap"],
        ["Diagnose_Iperf_Test_control.js", "LANG_IPERF_TEST", "diag_iperf"],
    ]],
];

let User_Sidebar = [
    ["LANG_STATUS", "fas fa-fw fa-info", [
        ["index_control.js", "LANG_DEVICE_INFO", "stat_index"],
        ["Status_WAN_control.js", "LANG_WAN_CONNECTION_INFO", "stat_wan"],
        ["Status_PON_control.js", "PON_INFO", "stat_pon"],
        ["Status_Connected_User_control.js", "LANG_USER_INFO", "stat_user"]
    ]],
    ["LANG_NETWORK", "fas fa-fw fa-globe", [
        ["Network_LAN_control.js", "LANG_LAN", "net_lan"],
        ["Network_2.4G_control.js", 0, "2.4G", "net_2g"],
        ["Network_5G_control.js", 0, "5G", "net_5g"],
        ["Network_ClientMangement_control.js", "LANG_WLAN_CLIENT_MANGEMENT", "net_client"],
        ["Network_FamilyGroupManagement_control.js", "LANG_FAMILY_GROUP_MANAGEMENT", "net_family_gourp"],
        ["Network_Time_control.js", "LANG_TIME", "net_time"],
    ]],
    ["Line"],
    ["L_Word", "Advance Settings"],
    ["LANG_SECURITY", "fas fa-fw fa-shield-alt", [
        ["Security_WAN_Access_control.js", "LANG_URL_FILTER", "sec_url"],
        ["Security_MAC_Filter_control.js", "LANG_MAC_FILTERING", "sec_mac"],
    ]],
    ["LANG_APPLICATION", "fas fa-fw fa-sitemap", [
        ["Application_Advanced_NAT_u_control.js", "LANG_ADVANCE_NAT_CONFIG", "app_nat"],
        ["Application_MQTT_control.js", 0, "MQTT", "app_mqtt"],
        ["Application_Others_control.js", "Others", "app_other"],
    ]],
    ["LANG_MANAGEMENT", "fas fa-fw fa-toolbox", [
        ["Management_User_control.js", "LANG_USER_MANAGEMENT", "mgmt_user"],
        ["Management_Device_u_control.js", "LANG_DEVICE_MANAGEMENT", "mgmt_device"],
    ]],
];

function info_bar_init(info) {
    $("#wrapper").after("<div class=\"animated fadeInUp info_bar\">" + info + "</div>");
    $("#content-wrapper").css("margin-bottom", $(".info_bar").height());
}

function sidebar_blacklist(NW_S_B, blacklist_str) {
    if (blacklist_str) {
        const blacklist = blacklist_str.split("+");
        for (const i in NW_S_B) {
            const nwsb_i = NW_S_B[i];
            const nwsb_i_0 = nwsb_i[0];
            //if ((nwsb_i_0 != "Line") && (nwsb_i_0 != "L_Word")) { //Modified by grs for mission#00022528
			if(1) {
                if (blacklist.indexOf(nwsb_i_0) != -1) {
                    delete NW_S_B[i];
                } else {
                    const nwsb_i_2 = nwsb_i[2];
                    for (const j in nwsb_i_2) {
                        const nwsb_i_2_j = nwsb_i_2[j];
                        if (nwsb_i_2_j[0] != "h6" && blacklist.indexOf((nwsb_i_2_j[1] == 0) ? nwsb_i_2_j[3] : nwsb_i_2_j[2]) != -1) {
                            delete nwsb_i_2[j];
                        }
                    }
                }
            }
        }
    }
}

function horizontal_menu_init(NW_S_B)
{
    $("#accordionSidebar").remove();
    let Finnal_Res = "<nav class=\"topbar-nav is-hoverable\"><ul class=\"metismenu\" id=\"horizontal_sidebar\">";
    Finnal_Res += "<li><img src=\"custom/logo.png\" class=\"\" style=\"max-height: 49.19px;max-width:100%;margin:auto;display: flex;justify-content: center;\"></li>"
    for (const i in NW_S_B) {
        const nwsb_i = NW_S_B[i];
        const level_1_title = nwsb_i[0];
        const level_1_icon = nwsb_i[1];
        const level_2_menu = nwsb_i[2];
        switch (level_1_title) {
            case "Line": // Divider
                continue;
            case "L_Word": // Heading
                continue;
            default: // ["h6", "lang_heading_name"] || ["js_name", "lang_menu_name", "id"] || ["js_name", 0, "menu_name", "id"]
                Finnal_Res += "<li>\
                    <a class=\"has-arrow\" href=\"#\">\
                        <span class=\"fas fa-fw "+level_1_icon+"\"></span>\
                        <span class=\"lang\" key=\""+level_1_title+"\" ></span>\
                    </a><ul>"
                for (const j in level_2_menu) {
                    const menu = level_2_menu[j];
                    var js_name = menu[0];
                    var menu_title = menu[1];
                    var menu_id = menu[2];
                    if (menu_title==0) {
                        menu_title=menu[2];
                        menu_id = menu[3];
                    }
                    if (js_name == "h6") {
                    } else {
                        Finnal_Res += "<li><a href=\"#\" id=\""+menu_id+"\" js=\""+js_name+"\" class=\"lang sidebar_tag\" key=\""+(menu[1]==0?"":menu_title)+"\">"+ (menu[1]==0?menu_title:"")+"</a>\</li>";
                    }
                }
                Finnal_Res += "</ul></li>";
                break;
        }
    }
    Finnal_Res += "</ul></nav>";
    $("#page-top").prepend(Finnal_Res);
    $('#horizontal_sidebar').metisMenu();
    $("head").append("\
    <style> \
        @media (min-width:992px) { \
            .col-lg-8 {\
                flex: none;\
                max-width: 66.6%;\
                margin:0 auto;\
            }\
        }\
    </style>\
    ");
    $("#Logout_button").on("click", function (e) {
        $.ajaxSetup({
            async: false
        });
        $("#Logout_form").submit();
    })
}

function get_custom_menu_type()
{
    var result = "";
    target = "/boaform/getASPdata/custom_menu_type";
    $.ajaxSetup({ async: false });
    $.get(target, function (data, status) {
        result = data;
    });
    $.ajaxSettings.async = true;

    if (result=="") {
        console.warn("custom_menu_type is invalid");
        result="0";
    }

    return parseInt(result);
}

function is_horizontal_menu()
{
    var custom_menu_type = get_custom_menu_type();
    
    if (custom_menu_type&(1<<0)) {
        if (custom_menu_type&(1<<2)) {
            $("meta[name='is_horizontal_menu']").attr("content", "0");
        } else {
            $("meta[name='is_horizontal_menu']").attr("content", "1");
        }
    } 

    return $("meta[name='is_horizontal_menu']").attr("content");
}

$(document).ready(() => {
    var sidebar_init_method = NEWWEB_Siderbar_init;
    if (is_horizontal_menu()=="1") {
        sidebar_init_method = horizontal_menu_init
    }
    switch (parseInt($("meta[name='page_priv']").attr("content"))) {
        case 0: // User
            sidebar_blacklist(User_Sidebar, g_page_cstmfun.CF_WEB_SIDEBAR_BLACKLIST_USER);
            sidebar_init_method(User_Sidebar);
            break;
        case 2: // Subadmin
            sidebar_blacklist(Admin_Sidebar, g_page_cstmfun.CF_WEB_SIDEBAR_BLACKLIST_SUBADMIN);
            sidebar_init_method(Admin_Sidebar);
            break;
        default: // Admin or Unknown
            sidebar_blacklist(Admin_Sidebar, g_page_cstmfun.CF_WEB_SIDEBAR_BLACKLIST_ADMIN);
            sidebar_init_method(Admin_Sidebar);
            break;
    }
});
