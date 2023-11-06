var IGMP_Page_data = {};
var MLD_Page_data = {};
var listWanName_data = {};
var igmproxyList_data = "";
var get_wan_name_list2_data = "";

var IGMP_Page = {
    "length": 2,
    1: [
        ["IGMP_SNOOPING_ROW", "arrLang[lang][\"LANG_IGMP_SNOOPING_CONFIG\"]", "2"],
        ["form", "IGMP_SNOOPING_FORM", "action=\"/boaform/getASPdata/formIgmpSnooping\" method=\"POST\"", "1"],
        ["switch", "B_snoop", "IGMP Snooping ,arrLang[lang][\"LANG_ENABLE\"]", "snoop"],
        ["submit", "IGMP_snooping_submit"]
    ],
    2: [
        ["IGMP_Proxy_row", "arrLang[lang][\"LANG_IGMP_PROXY\"]", "2"],
        ["form", "IGMP_PROXY_FORM", "action=\"/boaform/getASPdata/formIgmproxy\" method=\"POST\"", "1"],
        ["switch", "B_daemon4", "arrLang[lang][\"LANG_IGMP_PROXY\"], ,arrLang[lang][\"LANG_ENABLE\"]", "daemon4"],
        ["menu", "B_ext_if4", "arrLang[lang][\"LANG_INTERFACE\"]", "ext_if4", IGMP_interface_select_init()],
        ["submit", "IGMP_Proxy_Submit"]
    ]
}

var MLD_Page = {
    "length": 2,
    1: [
        ["MLD_Snooping_row", "arrLang[lang][\"LANG_MLD_SNOOPING_CONFIG\"]", "2"],
        ["form", "MLD_Snooping_form", "action=\"/boaform/getASPdata/formMLDSnooping\" method=\"POST\"", "1"],
        ["switch", "B_snoop2", "arrLang[lang][\"LANG_MLD_SNOOPING_CONFIG\"], ,arrLang[lang][\"LANG_ENABLE\"]", "MLD_snoop"],
        ["submit", "MLD_Snooping_Submit"]
    ],
    2: [
        ["MLD_Proxy_row", "MLD ,arrLang[lang][\"LANG_PROXY\"]", "2"],
        ["form", "MLD_Proxy_form", "action=\"/boaform/getASPdata/formMLDProxy\" method=\"POST\"", "1"],
        ["switch", "B_daemon", "arrLang[lang][\"LANG_MLD_PROXY\"], ,arrLang[lang][\"LANG_ENABLE\"]", "daemon"],
        ["menu", "B_ext_if", "arrLang[lang][\"LANG_INTERFACE\"]", "ext_if", MLD_interface_select_init()],
        ["submit", "MLD_Proxy_Submit"]
    ]
}

var IPTV_Page = {
    "length": 1,
    1: [
        ["IPTV_row", "IPTV", "2"],
        ["append", "<div class=\"table-responsive\">\
        <table class=\"table table-bordered table-striped\">\
        <thead>\
            <tr>\
                <th>" + arrLang[lang]["LANG_INTERFACE"] + "</th>\
                <th>" + arrLang[lang]["LANG_MCAST_VLAN"] + "</th>\
            </tr>\
        </thead>\
        <tbody id=\"IPTV_List\"></tbody>\
    </table>\
    </div>"],
    ]
}

function IPTV_Table_init() {
    for (var key in listWanName_data) {
        delete listWanName_data[key];
    }
    $("#IPTV_List").empty();
    Page_data_obj_init(listWanName_data, OneForAll("getASPdata/listWanName", 5, 0, 0, 0));
    for (var key in listWanName_data) {
        var tmp = listWanName_data[key].split("&");
        var interface_name = tmp[0];
        var interface_Mvlan = tmp[1];
        if (interface_Mvlan == "0") {
            interface_Mvlan = "";
        }
        $("#IPTV_List").append(
            "<tr class=\"justhover\">" +
            "<td>" + interface_name + "</td>" +
            "<td>" + interface_Mvlan + "</td>" +
            "</tr>"
        );
    }
}

function IPTV_flow_window_init() {
    var flow_Page = {
        id: "IPTV_MVlan_Config",
        name: arrLang[lang]["LANG_MULTICAST_VLAN_TITLE"],
        height: "300px"
    }

    var MVlan_Page = {
        "length": 1,
        1: [
            ["IPTV_MVlan_Config", 0],
            ["form", "IPTV_MVlan_form", "action=\"/boaform/getASPdata/formMcastVlanMapping\" method=\"POST\"", "1", after_IPTV_success],
        ]
    }
    $(".justhover").off("click");
    $(".justhover").on("click", function () {
        var WanName = $(this).children("td").eq(0).text();
        var mVlan = $(this).children("td").eq(1).text();
        var if_index = parseInt(WanName[0]) - 1;
        MVlan_Page[1] = [
            ["IPTV_MVlan_Config", 0],
            ["form", "IPTV_MVlan_form", "action=\"/boaform/getASPdata/formMcastVlanMapping\" method=\"POST\"", "1", after_IPTV_success],
        ];
        MVlan_Page[1].push(["hidden", "WanName", WanName]);
        MVlan_Page[1].push(["hidden", "if_index", if_index]);
        MVlan_Page[1].push(["text", "M_" + WanName, WanName, "mVlan"]);
        MVlan_Page[1].push(["submit", "flow_submit", CheckValue]);
        flow_table_generate(flow_Page);
        Auto_Page_generate(MVlan_Page);
        FMask_init();
        $("input[name='mVlan']").val(mVlan);
    })

}

function after_IPTV_success() {
    $(".layui-layer-close2").click();
    IPTV_Table_init();
    IPTV_flow_window_init();
}


function check_IPTV_vlan(vlanID) {
    if (!sji_checkdigit(vlanID)) {
        return [false, "arrLang[lang][\"LANG_INVALID_VLAN_ID\"]"];
    }
    vlanID = parseInt(vlanID);
    if (vlanID < 0 || vlanID >= 4096) {
        return [false, "arrLang[lang][\"LANG_INVALID_VLAN_RANGE3\"]"];
    }
    return [true, "true"];
}

function CheckValue() {
    var a = "input[name=\"mVlan\"]";
    var vlan_a = $(a).val();
    if (vlan_a.length == 0) {
        return true;
    }
    //var check_vlan = new_check_vlan(vlan_a);
    var check_vlan = check_IPTV_vlan(vlan_a);
    if (!check_vlan[0]) {
        MyAlert(eval(check_vlan[1]));
        $(a).focus();
        return false;
    }
    return true;
}

function IGMP_interface_select_init() {
    igmproxyList_data = OneForAll("getASPdata/igmproxyList", 5, 0, 0, 0);
    var obj_tmp = {};
    var menu = [];
    Page_data_obj_init(obj_tmp, igmproxyList_data);
    for (var key in obj_tmp) {
        menu.push([obj_tmp[key], key]);
    }
    return menu;
}

function MLD_interface_select_init() {
    get_wan_name_list2_data = OneForAll("getASPdata/get_wan_name_list2", 5, 0, 0, 0);
    var obj_tmp = {};
    var menu = [];
    Page_data_obj_init(obj_tmp, get_wan_name_list2_data);
    for (var key in obj_tmp) {
        menu.push([obj_tmp[key], key]);
    }
    return menu;
}

$(document).ready(function () {
    Auto_Page_generate(IGMP_Page);
    Auto_Page_generate(MLD_Page);
    Auto_Page_generate(IPTV_Page);
    IPTV_Table_init();
    IPTV_flow_window_init();
    Page_data_obj_init(IGMP_Page_data, OneForAll("getASPdata/get_IGMP_Status", 5, 0, 0, 0));
    set_obj_data_to_html(IGMP_Page_data);
    Page_data_obj_init(MLD_Page_data, OneForAll("getASPdata/get_MLD_Status", 5, 0, 0, 0));
    set_obj_data_to_html(MLD_Page_data);
    (function (s) {
        s(".container-fluid").on("click", function () {
            if (s("input[name='daemon']").val() == '0')
                s("#B_ext_if_Table").parent("div").slideUp();
            else
                s("#B_ext_if_Table").parent("div").slideDown();

            if (s("input[name='daemon4']").val() == '0')
                s("#B_ext_if4_Table").parent("div").slideUp();
            else
                s("#B_ext_if4_Table").parent("div").slideDown();

            if (igmproxyList_data.indexOf("nolist") != -1)
                s("#IGMP_Proxy_row").hide();

            if (get_wan_name_list2_data.indexOf("nolist") != -1)
                s("#MLD_Proxy_row").hide();
        })
        s(".container-fluid").click();
    })(jQuery);
})
