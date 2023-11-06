function QoS_Config_Page_init() {
    var QoS_Config_Page = {
        "length": 1,
        1: [
            ["QoS_Config_Row", "arrLang[lang]['LANG_QOS_CONFIG']", "2"],
            ["form", "QoS_Config_form", "action=\"/boaform/getASPdata/formQosPolicy\" method=\"post\"", "1", Queue_Page_init],
            ["switch", "B_qosen", "arrLang[lang][\"LANG_IP_QOS\"]", "qosen"],
            //["switch", "B_enable_force_weight", "arrLang[lang][\"LANG_TOTAL_BANDWIDTH_LIMIT\"]", "enable_force_weight"],
            //["switch", "B_enable_dscp_remark", "DSCP/TC ,arrLang[lang][\"LANG_REMARK_ENABLE\"]", "enable_dscp_remark"],
            // ["menu", "B_enable_1p_remark", "802.1p ,arrLang[lang]['LANG_REMARK_MODE']", "enable_1p_remark", [
            //     ["0", "arrLang[lang]['LANG_DISABLE']"],
            //     ["1", "arrLang[lang]['LANG_TRANSPARENT_MODE']"],
            //     ["2", "arrLang[lang]['LANG_OVER_WRITE']"],
            // ]],
            ["menu", "B_QoS_Policy", "QoS ,arrLang[lang]['LANG_POLICY']", "QoS_Policy", [
                ["0", "arrLang[lang]['LANG_PRIO']"],
                ["1", "arrLang[lang]['LANG_WRR']"],
            ]],
            ["append", "<br>"],
            ["append", "<div class=\"table-responsive\">\
            <table id='queue_table' class=\"table table-bordered table-striped\">\
            <thead>\
                <tr>\
                    <th>" + arrLang[lang]["LANG_QUEUE"] + "</th>\
                    <th class='QoSL2'>" + arrLang[lang]["LANG_PRIO"] + "</th>\
                    <th class='QoSL3'>" + arrLang[lang]["LANG_WRR"] + "</th>\
                </tr>\
            </thead>\
            <tbody id=\"Queue_Config_List\"></tbody>\
        </table>\
        </div>"],
            ["submit", "QoS_Config_Submit", QoS_Config_Check]
        ],
    }
    Auto_Page_generate(QoS_Config_Page);

    $(".B_QoS_Policy").on("click", function () {
        setTimeout(function () {
            $("#Queue_Config_List").empty();
            for (var key in QoS_Page_data) {
                if (key.indexOf("queues") != -1) {
                    Queue_Config_List_generate(QoS_Page_data[key]);
                }
            }
            if ($("input[name='QoS_Policy']").val() == "0") {
                $(".QoSL2").show();
                $(".QoSL3").hide();
                $(".QoSL3").find("input").prop("disabled", true);
            } else {
                $(".QoSL2").hide();
                $(".QoSL3").show();
                $(".QoSL3").find("input").prop("disabled", false);
            }
            $(".QCList").on("click", function () {
                $(this).toggleClass("td_select");
                if ($(this).hasClass("td_select")) {
                    $(this).nextAll().find("input").each(function () {
                        if ($(this).prop("name").indexOf("qen") != -1) {
                            $(this).prop("disabled", false);
                        }
                    })
                } else {
                    $(this).nextAll().find("input").each(function () {
                        if ($(this).prop("name").indexOf("qen") != -1) {
                            $(this).prop("disabled", true);
                        }
                    })
                }
            })
        }, 20);
    });
    Queue_Page_init();


    function QoS_Config_Check() {
        var weight = 0;
        if ($("input[name='QoS_Policy']").val() == "1") {
            if ($("input[name='qen0']").prop("disabled") == false) {
                weight += parseInt($("input[name='w0']").val());
            }
            if ($("input[name='qen1']").prop("disabled") == false) {
                weight += parseInt($("input[name='w1']").val());
            }
            if ($("input[name='qen2']").prop("disabled") == false) {
                weight += parseInt($("input[name='w2']").val());
            }
            if ($("input[name='qen3']").prop("disabled") == false) {
                weight += parseInt($("input[name='w3']").val());
            }
            if (weight != 100) {
                MyAlert("LANG_TOTAL_WRR_LIMIT");
                return false;
            }
        }
        return true;
    }
}

function QoS_Classify_Page_init() {
    var QoS_Classify_Page = {
        "length": 1,
        1: [
            ["QoS_Classification", "arrLang[lang]['LANG_QOS_CLASSIFICATION']", "2"],
            ["append", "<div class=\"table-responsive\">\
        <table class=\"table table-bordered table-striped\">\
        <thead>\
            <tr>\
                <th>" + "ID" + "</th>\
                <th>" + arrLang[lang]['LANG_NAME'] + "</th>\
                <th>" + "DSCP " + arrLang[lang]['LANG_MARK'] + "</th>\
                <th>" + "IP " + arrLang[lang]['LANG_PRIORITY'] + "</th>\
                <th>" + "802.1P " + arrLang[lang]["LANG_MARK"] + "</th>\
                <th>" + "LAN " + arrLang[lang]['LANG_PORT'] + "</th>\
                <th>" + arrLang[lang]['LANG_PROTOCOL'] + "</th>\
                <th>" + "DSCP" + "</th>\
                <th>" + arrLang[lang]['LANG_SOURCE'] + " IP/ " + arrLang[lang]['LANG_SUBNET_MASK'] + "</th>\
                <th>" + arrLang[lang]['LANG_SOURCE'] + " " + arrLang[lang]['LANG_PORT'] + "</th>\
                <th>" + arrLang[lang]['LANG_DESTINATION'] + " IP/ " + arrLang[lang]['LANG_SUBNET_MASK'] + "</th>\
                <th>" + arrLang[lang]['LANG_DESTINATION'] + arrLang[lang]['LANG_PORT'] + "</th>\
                <th>" + arrLang[lang]['LANG_SOURCE'] + " MAC" + "</th>\
                <th>" + arrLang[lang]['LANG_DESTINATION'] + " MAC" + "</th>\
                <th>" + "802.1P" + "</th>\
                <th>" + "IP " + arrLang[lang]['LANG_VERSION'] + "</th>\
                <th>" + arrLang[lang]['LANG_CONNECT_TYPE'] + "</th>\
                <th style='display:none;'>" + "flag" + "</th>\
            </tr>\
        </thead>\
        <tbody id=\"QoS_Rule_List\"></tbody>\
    </table>\
    </div>"],
            ["append", "<div>\
    <div style=\"display: inline;\"><button type=\"button\" id=\"rule_Add\" action=\"addRoute\" class=\"btn btn-primary btn-round\">" + arrLang[lang]["LANG_ADD"] + "</button></div>\
</div>"],
        ]
    }
    Auto_Page_generate(QoS_Classify_Page);
    $("#QoS_Classification").find(".col-lg-8").each(function () {
        $(this).removeClass("col-lg-8");
        $(this).addClass("col-lg-12");
    })
    QoS_Rule_data = {};

    function QoS_Rule_Page_data_table_init() {
        /*var test_data = "0=index=0&name=rule_1&state=0&prio=1&outif=65535|0&wanifname=Any&IpProtocolType=1&sip6=::&dip6=::&sip6PrefixLen=0&dip6PrefixLen=0&mvid=0&mdscp=0&m1p=0&vlan1p=0&ethType=0000&phypt=0&proto=0&dscp=0&sip=0.0.0.0&smsk=&dip=0.0.0.0&dmsk=&spts=0&spte=0&dpts=0&dpte=0&dhcpopt_type_select=0&opt60_vendorclass=&opt61_iaid=0&dhcpopt61_DUID_select=0&duid_hw_type=0&duid_mac=&duid_time=0&duid_ent_num=0&duid_ent_id=&opt125_ent_num=0&opt125_manufacturer=&opt125_product_class=&opt125_model=&opt125_serial=&smac=00:00:00:00:00:00&smacw=00:00:00:00:00:00&dmac=00:00:00:00:00:00&dmacw=00:00:00:00:00:00&conntypeStr=none&conntype=0&classtype=0\n\
1=index=1&name=rule_&state=1&prio=1&outif=0|0&wanifname=ppp0&IpProtocolType=1&sip6=::&dip6=::&sip6PrefixLen=0&dip6PrefixLen=0&mvid=0&mdscp=1&m1p=1&vlan1p=3&ethType=0000&phypt=1&proto=4&dscp=1&sip=192.168.15.16&smsk=255.255.255.0&dip=192.168.15.16&dmsk=255.255.255.0&spts=12&spte=0&dpts=90&dpte=0&dhcpopt_type_select=0&opt60_vendorclass=&opt61_iaid=0&dhcpopt61_DUID_select=0&duid_hw_type=0&duid_mac=&duid_time=0&duid_ent_num=0&duid_ent_id=&opt125_ent_num=0&opt125_manufacturer=&opt125_product_class=&opt125_model=&opt125_serial=&smac=00:00:00:00:00:00&smacw=00:00:00:00:00:00&dmac=00:00:00:00:00:00&dmacw=00:00:00:00:00:00&conntypeStr=none&conntype=0&classtype=0\n\
2=index=2&name=rule_3&state=0&prio=1&outif=65535|0&wanifname=Any&IpProtocolType=1&sip6=::&dip6=::&sip6PrefixLen=0&dip6PrefixLen=0&mvid=0&mdscp=0&m1p=0&vlan1p=0&ethType=0000&phypt=0&proto=0&dscp=0&sip=0.0.0.0&smsk=&dip=0.0.0.0&dmsk=&spts=0&spte=0&dpts=0&dpte=0&dhcpopt_type_select=0&opt60_vendorclass=&opt61_iaid=0&dhcpopt61_DUID_select=0&duid_hw_type=0&duid_mac=&duid_time=0&duid_ent_num=0&duid_ent_id=&opt125_ent_num=0&opt125_manufacturer=&opt125_product_class=&opt125_model=&opt125_serial=&smac=00:00:00:00:00:00&smacw=00:00:00:00:00:00&dmac=00:00:00:00:00:00&dmacw=00:00:00:00:00:00&conntypeStr=none&conntype=0&classtype=0\n\
3=index=3&name=rule_4&state=0&prio=1&outif=65535|0&wanifname=Any&IpProtocolType=1&sip6=::&dip6=::&sip6PrefixLen=0&dip6PrefixLen=0&mvid=0&mdscp=0&m1p=0&vlan1p=0&ethType=0000&phypt=0&proto=0&dscp=0&sip=0.0.0.0&smsk=&dip=0.0.0.0&dmsk=&spts=0&spte=0&dpts=0&dpte=0&dhcpopt_type_select=0&opt60_vendorclass=&opt61_iaid=0&dhcpopt61_DUID_select=0&duid_hw_type=0&duid_mac=&duid_time=0&duid_ent_num=0&duid_ent_id=&opt125_ent_num=0&opt125_manufacturer=&opt125_product_class=&opt125_model=&opt125_serial=&smac=00:00:00:00:00:00&smacw=00:00:00:00:00:00&dmac=00:00:00:00:00:00&dmacw=00:00:00:00:00:00&conntypeStr=none&conntype=0&classtype=0\n\
4=index=4&name=kowayi&state=1&prio=1&outif=0|0&wanifname=ppp0&IpProtocolType=1&sip6=::&dip6=::&sip6PrefixLen=0&dip6PrefixLen=0&mvid=0&mdscp=41&m1p=4&vlan1p=6&ethType=0000&phypt=2&proto=4&dscp=41&sip=192.168.11.11&smsk=255.255.255.0&dip=192.168.22.22&dmsk=255.255.255.0&spts=66&spte=0&dpts=66&dpte=0&dhcpopt_type_select=0&opt60_vendorclass=&opt61_iaid=0&dhcpopt61_DUID_select=0&duid_hw_type=0&duid_mac=&duid_time=0&duid_ent_num=0&duid_ent_id=&opt125_ent_num=0&opt125_manufacturer=&opt125_product_class=&opt125_model=&opt125_serial=&smac=00:00:00:00:00:00&smacw=00:00:00:00:00:00&dmac=00:00:00:00:00:00&dmacw=00:00:00:00:00:00&conntypeStr=none&conntype=0&classtype=0\n\
        ";*/
        QoS_Rule_data = {};
        Page_data_obj_init(QoS_Rule_data, OneForAll("getASPdata/initQosRulePage", 5, 0, 0, 0));

        for (var key in QoS_Rule_data) {
            QoS_Rule_data[key] = nest_obj_init(QoS_Rule_data[key]);
        }

        var index = 0;
        $("#QoS_Rule_List").empty();
        for (var key in QoS_Rule_data) {
            var data = QoS_Rule_data[key];

            var tmp;
            $("#QoS_Rule_List").append("<tr class='justhover'>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td style='display:none;'><input type='hidden' name='rule__" + index + "'></td>\
        </tr>");
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(0).text(key);
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(1).text(data.name);
            tmp = data.mdscp;
            if (tmp != "0") {
                tmp = parseInt(tmp) - 1;
            } else
                tmp = "";
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(2).text(tmp);
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(3).text(data.prio);
            if (data.m1p != "0") {
                tmp = parseInt(data.m1p) - 1;
            } else
                tmp = "";
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(4).text(tmp);
            var LAN_MAP = {
                0: "",
                1: "LAN1",
                2: "LAN2",
                3: "LAN3",
                4: "LAN4",
            }
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(5).text(LAN_MAP[data.phypt]);
            var PROTOS = {
                0: "",
                1: "TCP",
                2: "UDP",
                3: "ICMP",
                4: "ICP/UDP",
                5: "RTP",
            }
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(6).text(PROTOS[data.proto]);
            if (data.dscp != "0") {
                tmp = parseInt(data.dscp) - 1;
            } else
                tmp = "";
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(7).text(tmp);
            if (data.IpProtocolType == "1") {
                if (data.sip == "0.0.0.0")
                    tmp = ""
                else {
                    if (data.smsk == "")
                        tmp = data.sip;
                    else
                        tmp = data.sip + "/" + data.smsk;
                }
            } else if (data.IpProtocolType == "2") {
                if (data.sip6 == "::") {
                    tmp = "";
                } else {
                    if (tmp.sip6PrefixLen == "")
                        tmp = data.sip6;
                    else
                        tmp = data.sip6 + "/" + data.sip6PrefixLen;
                }
            } else
                tmp = "";
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(8).text(tmp);
            if (data.spts == "0")
                tmp = "";
            else if (data.spte == "0")
                tmp = data.spts;
            else
                tmp = (typeof data.spte == undefined) ? data.spts : data.spts + ":" + data.spte;
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(9).text(tmp);
            if (data.IpProtocolType == "1") {
                if (data.dip == "0.0.0.0")
                    tmp = ""
                else {
                    if (data.dmsk == "")
                        tmp = data.dip;
                    else
                        tmp = data.dip + "/" + data.dmsk;
                }
            } else if (data.IpProtocolType == "2") {
                if (data.dip6 == "::") {
                    tmp = "";
                } else {
                    if (tmp.dip6PrefixLen == "")
                        tmp = data.dip6;
                    else
                        tmp = data.dip6 + "/" + data.dip6PrefixLen;
                }
            } else
                tmp = "";
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(10).text(tmp);
            if (data.dpts == "0")
                tmp = "";
            else if (data.dpte == "0")
                tmp = data.dpts;
            else
                tmp = (typeof data.dpte == undefined) ? data.dpts : data.dpts + ":" + data.dpte;
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(11).text(tmp);

            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(12).text((data.smac == "00:00:00:00:00:00") ? "" : data.smac);
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(13).text((data.dmac == "00:00:00:00:00:00") ? "" : data.dmac);
            if (data.vlan1p != "0") {
                tmp = parseInt(data.vlan1p) - 1;
            } else
                tmp = "";
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(14).text(tmp);
            if (data.IpProtocolType == "2")
                tmp = "IPv6";
            else
                tmp = "IPv4";
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(15).text(tmp);
            if (data.conntypeStr != "")
                tmp = data.conntypeStr;
            else
                tmp = "";
            $("#QoS_Rule_List").find("tr").eq(index).find("td").eq(16).text(tmp);
            $("#QoS_Rule_List").find("input[name='rule__" + index + "']").val(key)
            index++;
        }


        $("#QoS_Rule_List").find(".justhover").on("click", function () {
            QoS_Rule_flow_Page_init();
            var index = $(this).find("td").eq(0).text();
            set_obj_data_to_html(QoS_Rule_data[index]);
            Rule_Config_PM.action.val("editrule");
            $("#QoS_Rule_flow").find("input[type='text']").each(function () {
                var value = $(this).val();
                if (value == "0" || value == "0.0.0.0" || value == "::" || value == "00:00:00:00:00:00")
                    $(this).val("");
            })
            $("#del_action").show();
            $("#del_action").find("input[name='list']").eq(0).val(function () {
                var list = "";
                $("#QoS_Rule_List").find("input").each(function () {
                    if (index == $(this).val()) {
                        list += $(this).val() + ",1,1&";
                    } else
                        list += $(this).val() + ",1,0&";
                });
                return list.substring(0, list.length - 1);
            })
            $("#enable_action").hide();
            $("#QoS_Rule_flow").click();
        })

    }

    QoS_Rule_Page_data_table_init();

    function QoS_rule_final_after_success() {
        QoS_Rule_Page_data_table_init();
        $(".layui-layer-close2").click();
    }

    function QoS_rule_submit_after_success() {
        $("#QoS_rule_enable_submit").click();
    }




    var Rule_Config_PM;

    function QoS_Rule_flow_Page_init() {

        var QoS_Rule_Config_Page = {
            "length": 3,
            1: [
                ["QoS_Rule_flow", 0, "2"],
                ["form", "QoS_Rule_Config_Form", "action=\"/boaform/getASPdata/formQosRuleEdit\" method=\"post\"", "1", QoS_rule_submit_after_success],
                ["menu", "B_IpProtocolType", "arrLang[lang][\"LANG_IP_PROTOCOL_VERSION\"]", "IpProtocolType", [

                    ["1", "IPv4"],
                    ["2", "IPv6"],
                ]],
                ["text", "B_name", "arrLang[lang][\"LANG_FLOW_CONTROL_TYPE_NAME\"]", "name", "30"],
                ["menu", "B_prio", "arrLang[lang][\"LANG_NET_QOS_CLS_PAGE_5\"]", "prio", [
                    ["1", "Queue 1"],
                    ["2", "Queue 2"],
                    ["3", "Queue 3"],
                    ["4", "Queue 4"],

                ]],
                ["menu", "B_mdscp", "arrLang[lang][\"LANG_NET_QOS_CLS_PAGE_6\"]", "mdscp", [
                    ["0", ""],
                    ["1", "(000000)"],
                    ["33", "CS1(001000)"],
                    ["41", "AF11(001010)"],
                    ["49", "AF12(001100)"],
                    ["57", "AF13(001110)"],
                    ["65", "CS2(010000)"],
                    ["73", "AF21(010010)"],
                    ["81", "AF22(010100)"],
                    ["89", "AF23(010110)"],
                    ["97", "CS3(011000)"],
                    ["105", "AF31(011010)"],
                    ["113", "AF32(011100)"],
                    ["121", "AF33(011110)"],
                    ["129", "CS4(100000)"],
                    ["137", "AF41(100010)"],
                    ["145", "AF42(100100)"],
                    ["153", "AF43(100110)"],
                    ["161", "CS5(101000)"],
                    ["185", "EF(101110)"],
                    ["193", "CS6(110000)"],
                    ["225", "CS7(111000)"],
                ]],
                ["menu", "B_m1p", "arrLang[lang][\"LANG_NET_QOS_CLS_PAGE_7\"]", "m1p", [
                    ["0", ""],
                    ["1", "0"],
                    ["2", "1"],
                    ["3", "2"],
                    ["4", "3"],
                    ["5", "4"],
                    ["6", "5"],
                    ["7", "6"],
                    ["8", "7"],
                ]],
                ["menu", "B_classtype", "arrLang[lang][\"LANG_MODE_SELECTION\"]", "classtype", [
                    ["0", "arrLang[lang]['LANG_GENERAL_MODE']"],
                    ["1", "arrLang[lang]['LANG_APPLICATION_TYPE']"],
                ]],
                ["menu", "B_conntype", "arrLang[lang][\"LANG_CONNECT_TYPE\"]", "conntype", [
                    ["0", ""],
                    ["1", "TR069_INTERNET"],
                    ["2", "INTERNET"],
                    ["3", "TR069"],
                    ["4", "Other"],
                    ["5", "VOICE"],
                    ["6", "TR069_VOICE"],
                    ["7", "VOICE_INTERNET"],
                    ["8", "TR069_VOICE_INTERNET"],
                ]],
                ["menu", "B_phypt", "arrLang[lang][\"LANG_PHYSICAL_LAN_PORT\"]", "phypt", [
                    ["0", ""],
                    ["1", "LAN1"],
                    ["2", "LAN2"],
                    ["3", "LAN3"],
                    ["4", "LAN4"],
                ]],
                ["menu", "B_proto", "arrLang[lang][\"LANG_PROTOCOL\"]", "proto", [
                    ["0", ""],
                    ["1", "TCP"],
                    ["2", "UDP"],
                    ["3", "ICMP"],
                    ["4", "TCP/UDP"],
                    ["5", "RTP"],
                ]],
                ["menu", "B_dscp", "arrLang[lang][\"LANG_DSCP_CHECK\"]", "dscp", [
                    ["0", ""],
                    ["1", "(000000)"],
                    ["33", "CS1(001000)"],
                    ["41", "AF11(001010)"],
                    ["49", "AF12(001100)"],
                    ["57", "AF13(001110)"],
                    ["65", "CS2(010000)"],
                    ["73", "AF21(010010)"],
                    ["81", "AF22(010100)"],
                    ["89", "AF23(010110)"],
                    ["97", "CS3(011000)"],
                    ["105", "AF31(011010)"],
                    ["113", "AF32(011100)"],
                    ["121", "AF33(011110)"],
                    ["129", "CS4(100000)"],
                    ["137", "AF41(100010)"],
                    ["145", "AF42(100100)"],
                    ["153", "AF43(100110)"],
                    ["161", "CS5(101000)"],
                    ["185", "EF(101110)"],
                    ["193", "CS6(110000)"],
                    ["225", "CS7(111000)"],
                ]],
                ["menu", "B_vlan1p", "arrLang[lang][\"LANG_8021P_PROORITY\"]", "vlan1p", [
                    ["0", ""],
                    ["1", "0"],
                    ["2", "1"],
                    ["3", "2"],
                    ["4", "3"],
                    ["5", "4"],
                    ["6", "5"],
                    ["7", "6"],
                    ["8", "7"],
                ]],
                ["text", "B_sip", "arrLang[lang][\"LANG_SOURCE_IP_ADDRESS\"]", "sip", "15"],
                ["text", "B_smsk", "arrLang[lang][\"LANG_SOURCE_SUBNET_MASK\"]", "smsk", "15"],
                ["text", "B_dip", "arrLang[lang][\"LANG_DESTINATION_IP_ADDRESS_TITLE\"]", "dip", "15"],
                ["text", "B_dmsk", "arrLang[lang][\"LANG_DESTINATION_SUBNET_MASK\"]", "dmsk", "15"],
                ["text", "B_sip6", "arrLang[lang][\"LANG_SOURCE_IP_ADDRESS\"]", "sip6", "39"],
                ["text", "B_sip6PrefixLen", "arrLang[lang][\"LANG_SOURCE_PREFIX_LENGTH_TITILE\"]", "sip6PrefixLen", "3"],
                ["text", "B_dip6", "arrLang[lang][\"LANG_DESTINATION_IP_ADDRESS_TITLE\"]", "dip6", "39"],
                ["text", "B_dip6PrefixLen", "arrLang[lang][\"LANG_DESTINATION_PREFIX_LENGTH_TITILE\"]", "dip6PrefixLen", "3"],
                ["text", "B_spts", "arrLang[lang][\"LANG_SOURCE_PORT_TITLE\"]", "spts", "5"],
                ["text", "B_spte", ": ", "spte", "5"],
                ["text", "B_dpts", "arrLang[lang][\"LANG_DESTINATION_PORT_TITLE\"]", "dpts", "5"],
                ["text", "B_dpte", ":", "dpte", "5"],
                ["text", "B_smac", "arrLang[lang][\"LANG_SOURCE_MAC_TITLE\"]", "smac", "17"],
                ["text", "B_dmac", "arrLang[lang][\"LANG_DESTINATION_MAC_TITLE\"]", "dmac", "17"],
                ["hidden", "index", "0"],
                ["hidden", "action", ""],
                ["hidden", "lst", ""],
                ["submit", "QoS_Rule_Submit", QoS_Rule_check],
                ["append", "<br>"],
                ["append", "<div id='del_action'></div>"],
            ],
            2: [
                ["#del_action", 0],
                ["form", "QoS_Rule_form1", "action=\"/boaform/getASPdata/formQosRule\" method=\"post\"", "1", QoS_rule_final_after_success],
                ["hidden", "list", ""],
                ["submit", "QoS_rule_del_submit", , "arrLang[lang]['wan_del']", "btn-danger"],
                ["append", "<br>"],
                ["append", "<div id='enable_action'></div>"],
            ],
            3: [
                ["#enable_action", 0],
                ["form", "QoS_Rule_form2", "action=\"/boaform/getASPdata/formQosRule\" method=\"post\"", "1", QoS_rule_final_after_success],
                ["hidden", "list", ""],
                ["submit", "QoS_rule_enable_submit", , "arrLang[lang]['LANG_DELETE']", "btn-danger"]
            ],
        }

        var QoS_Rule_flow_Page = {
            id: "QoS_Rule_flow",
            name: arrLang[lang]["LANG_ADD_IP_QOS_TRAFFIC"],
            width: "500px",
            height: "550px",
        }
        flow_table_generate(QoS_Rule_flow_Page);
        Rule_Config_PM = Auto_Page_generate(QoS_Rule_Config_Page);
        FMask_init();

        $("#QoS_Rule_flow").on("click", function () {
            if (Rule_Config_PM.IpProtocolType.val() == "2" && Rule_Config_PM.classtype.val() == "0") {
                Rule_Config_PM.sip.body(0);
                Rule_Config_PM.smsk.body(0);
                Rule_Config_PM.dip.body(0);
                Rule_Config_PM.dmsk.body(0);
                Rule_Config_PM.sip6.body(1);
                Rule_Config_PM.sip6PrefixLen.body(1);
                Rule_Config_PM.dip6.body(1);
                Rule_Config_PM.dip6PrefixLen.body(1);
            } else if (Rule_Config_PM.IpProtocolType.val() == "1" && Rule_Config_PM.classtype.val() == "0") {
                Rule_Config_PM.sip.body(1);
                Rule_Config_PM.smsk.body(1);
                Rule_Config_PM.dip.body(1);
                Rule_Config_PM.dmsk.body(1);
                Rule_Config_PM.sip6.body(0);
                Rule_Config_PM.sip6PrefixLen.body(0);
                Rule_Config_PM.dip6.body(0);
                Rule_Config_PM.dip6PrefixLen.body(0);
            }

            if (Rule_Config_PM.classtype.val() == "1") {
                Rule_Config_PM.conntype.body(1);
                Rule_Config_PM.phypt.body(0);
                Rule_Config_PM.proto.body(0);
                Rule_Config_PM.dscp.body(0);
                Rule_Config_PM.vlan1p.body(0);
                Rule_Config_PM.spts.body(0);
                Rule_Config_PM.spte.body(0);
                Rule_Config_PM.dpts.body(0);
                Rule_Config_PM.dpte.body(0);
                Rule_Config_PM.smac.body(0);
                Rule_Config_PM.dmac.body(0);
                Rule_Config_PM.sip.body(0);
                Rule_Config_PM.sip6.body(0);
                Rule_Config_PM.dip.body(0);
                Rule_Config_PM.dip6.body(0);
                Rule_Config_PM.smsk.body(0);
                Rule_Config_PM.dmsk.body(0);
                Rule_Config_PM.sip6PrefixLen.body(0);
                Rule_Config_PM.dip6PrefixLen.body(0);
            } else {
                Rule_Config_PM.conntype.body(0);
                Rule_Config_PM.phypt.body(1);
                Rule_Config_PM.proto.body(1);
                Rule_Config_PM.dscp.body(1);
                Rule_Config_PM.vlan1p.body(1);
                Rule_Config_PM.spts.body(1);
                Rule_Config_PM.spte.body(1);
                Rule_Config_PM.dpts.body(1);
                Rule_Config_PM.dpte.body(1);
                Rule_Config_PM.smac.body(1);
                Rule_Config_PM.dmac.body(1);
            }
        })
    }


    $("#rule_Add").click(function () {
        QoS_Rule_flow_Page_init();
        Rule_Config_PM.IpProtocolType.val("1");
        Rule_Config_PM.prio.val("1");
        Rule_Config_PM.classtype.val("0");
        Rule_Config_PM.action.val("addrule");
        Rule_Config_PM.phypt.val("1");
        $("#del_action").hide();
        $("#enable_action").hide();
        $("#enable_action").find("input[name='list']").val(function () {
            var list = "";
            var max_index = 0;
            $("#QoS_Rule_List").find("input").each(function () {
                list += $(this).val() + ",1,0&";
                max_index = parseInt($(this).val());
            });
            max_index++;
            return list + max_index + ",1,0";
        })
        $("#QoS_Rule_flow").click();
    })


    function QoS_Rule_check() {
        if (Rule_Config_PM.name.val() == "") {
            swal_check_warning("input[name='name']", arrLang[lang]["LANG_INVALID_DESTINATION_VALUE"]);
            return false;
        }
        if (!sji_checkstrnor(Rule_Config_PM.name.val(), undefined, 30)) {
            swal_check_warning("input[name='name']", arrLang[lang]["LANG_NET_QOS_CLS_ERROR_1"]);
            return false;
        }



        /*if (Rule_Config_PM.prio.val() == "") {
            swal_check_warning("#B_prio_Table", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_2']);
            return false;
        }*/


        if (Rule_Config_PM.phypt.val() == 0 && Rule_Config_PM.proto.val() == 0 && Rule_Config_PM.dscp.val() == 0 && (Rule_Config_PM.sip.val() == "" ||
            Rule_Config_PM.sip.val() == "0.0.0.0") && (Rule_Config_PM.spts.val() == 0 || Rule_Config_PM.spts.val() == "") && (Rule_Config_PM.dip.val() == "" ||
                Rule_Config_PM.dip.val() == "0.0.0.0") && (Rule_Config_PM.dpts.val() == 0 || Rule_Config_PM.dpts.val() == "") && Rule_Config_PM.vlan1p.val() == 0 &&
            Rule_Config_PM.smac.val() == "" && Rule_Config_PM.dmac.val() == "" && Rule_Config_PM.sip6.val() == "" && Rule_Config_PM.dip6.val() == "" && Rule_Config_PM.conntype.val() == 0) {
            swal_check_warning("*", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_3']);
            return false;
        }

        /*if (Rule_Config_PM.IpProtocolType.val() == 0) {
            swal_check_warning("*",arrLang[lang]['LANG_FILTER_ADD_ERROR_15']);
            return false;
        }*/


        if (Rule_Config_PM.IpProtocolType.val() == 1) {
            if (Rule_Config_PM.sip.val() != "" && !sji_checkip(Rule_Config_PM.sip.val())) {
                swal_check_warning("input[name='sip']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_4']);
                return false;
            }

            if (Rule_Config_PM.smsk.val() != "" && !sji_checkmask(Rule_Config_PM.smsk.val())) {
                swal_check_warning("input[name='smsk']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_5']);
                return false;
            }

            if (Rule_Config_PM.dip.val() != "" && !sji_checkip(Rule_Config_PM.dip.val())) {
                swal_check_warning("input[name='dip']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_6']);
                return false;
            }

            if (Rule_Config_PM.dmsk.val() != "" && !sji_checkmask(Rule_Config_PM.dmsk.val())) {
                swal_check_warning("input[name='dmsk']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_10']);
                return false;
            }
        } else {

            if (Rule_Config_PM.IpProtocolType.val() == 2) {
                if (Rule_Config_PM.sip6.val() != "") {
                    if (!isGlobalIpv6Address(Rule_Config_PM.sip6.val())) {
                        swal_check_warning("input[name='sip6']", arrLang[lang]['LANG_INVALID_SOURCE_IPV6_ADDRESS']);
                        return false;
                    }
                    if (Rule_Config_PM.sip6PrefixLen.val() != "") {
                        var prefixlen = getDigit(Rule_Config_PM.sip6PrefixLen.val(), 1);
                        if (prefixlen > 128 || prefixlen <= 0) {
                            swal_check_warning("input[name='sip6PrefixLen']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_7']);
                            return false;
                        }
                    }
                }

                if (Rule_Config_PM.dip6.val() != "") {
                    if (!isGlobalIpv6Address(Rule_Config_PM.dip6.val())) {
                        swal_check_warning("input[name='dip6']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_8']);
                        return false;
                    }
                    if (Rule_Config_PM.dip6PrefixLen.val() != "") {
                        var prefixlen = getDigit(Rule_Config_PM.dip6PrefixLen.val(), 1);
                        if (prefixlen > 128 || prefixlen <= 0) {
                            swal_check_warning("input[name='dip6PrefixLen']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_9']);
                            return false;
                        }
                    }
                }
            }
        }




        if ((Rule_Config_PM.spts.val() != "" ? !sji_checkdigit(Rule_Config_PM.spts.val()) : false) || Rule_Config_PM.spts.val() < 0 || Rule_Config_PM.spts.val() > 65536) {
            swal_check_warning("input[name='spts']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_11']);
            return false;
        } else {
            if (Rule_Config_PM.spts.val() != "" && ((Rule_Config_PM.proto.val() == 0) || (Rule_Config_PM.proto.val() == 3))) {
                swal_check_warning("input[name='spts']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_12']);
                return false;
            }
        }

        if ((Rule_Config_PM.spte.val() != "" ? !sji_checkdigit(Rule_Config_PM.spte.val()) : false) || Rule_Config_PM.spte.val() < 0 || Rule_Config_PM.spte.val() > 65536) {
            swal_check_warning("input[name='spte']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_13']);
            return false;
        } else {
            if (Rule_Config_PM.spte.val() != "" && ((Rule_Config_PM.proto.val() == 0) || (Rule_Config_PM.proto.val() == 3))) {
                swal_check_warning("input[name='spte']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_12']);
                return false;
            }
        }

        if ((Rule_Config_PM.dpts.val() != "" ? !sji_checkdigit(Rule_Config_PM.dpts.val()) : false) || Rule_Config_PM.dpts.val() < 0 || Rule_Config_PM.dpts.val() > 65536) {
            swal_check_warning("input[name='dpts']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_14']);
            return false;
        } else {
            if (Rule_Config_PM.dpts.val() != "" && ((Rule_Config_PM.proto.val() == 0) || (Rule_Config_PM.proto.val() == 3))) {
                swal_check_warning("input[name='dpts']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_12']);
                return false;
            }
        }

        if ((Rule_Config_PM.dpte.val() != "" ? !sji_checkdigit(Rule_Config_PM.dpte.val()) : false) || Rule_Config_PM.dpte.val() < 0 || Rule_Config_PM.dpte.val() > 65536) {
            swal_check_warning("input[name='dpte']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_15']);
            return false;
        } else {
            if (Rule_Config_PM.dpte.val() != "" && ((Rule_Config_PM.proto.val() == 0) || (Rule_Config_PM.proto.val() == 3))) {
                swal_check_warning("input[name='dpte']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_12']);
                return false;
            }
        }

        if (Rule_Config_PM.smac.val() != "" && !sji_checkmac2(Rule_Config_PM.smac.val())) {
            swal_check_warning("input[name='smac']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_16']);
            return false;
        }

        if (Rule_Config_PM.dmac.val() != "" && !sji_checkmac2(Rule_Config_PM.dmac.val())) {
            swal_check_warning("input[name='dmac']", arrLang[lang]['LANG_NET_QOS_CLS_ERROR_17'])
            return false;
        }


        var lst_val = "";
        lst_val += $("#QoS_Rule_flow").find("input[name='action']").val() + "&"
        $("#QoS_Rule_flow").find("input").each(function () {
            var name = $(this).prop("name");
            var value = $(this).val();
            if (name != "lst" && name != "" && name != "action" && name != "csrfMask" && name != "vlan1p") {
                lst_val += name + "=" + value + "&"
            }
        })
        lst_val += "vlan1p=" + $("#QoS_Rule_flow").find("input[name='vlan1p']").val();
        $("#QoS_Rule_flow").find("input[name='lst']").val(lst_val);
        return true;
    }


}

function QoS_Traffic_Control_Page_init() {
    var Traffic_ctl_Page = {
        "length": 1,
        1: [
            ["Traffic_ctl_row", "QoS ,arrLang[lang]['LANG_TRAFFIC_CONTROL']", "2"],
            ["append", "<div id='Total_BW_Limit_place'></div>"],
            ["append", "<br>"],
            ["append", "<div class=\"table-responsive\">\
        <table class=\"table table-bordered table-striped\">\
        <thead>\
            <tr>\
                <th>" + "ID" + "</th>\
                <th>" + arrLang[lang]['LANG_PROTOCOL'] + "</th>\
                <th>" + arrLang[lang]['LANG_SOURCE'] + " " + arrLang[lang]['LANG_PORT'] + "</th>\
                <th>" + arrLang[lang]['LANG_DESTINATION'] + arrLang[lang]['LANG_PORT'] + "</th>\
                <th>" + arrLang[lang]['LANG_SOURCE'] + " IP/ " + arrLang[lang]['LANG_SUBNET_MASK'] + "</th>\
                <th>" + arrLang[lang]['LANG_DESTINATION'] + " IP/ " + arrLang[lang]['LANG_SUBNET_MASK'] + "</th>\
                <th>" + arrLang[lang]['LANG_RATE'] + "(kb/s)" + "</th>\
                <th>" + "IP " + arrLang[lang]['LANG_VERSION'] + "</th>\
                <th>" + arrLang[lang]['LANG_DIRECTION'] + "</th>\
            </tr>\
        </thead>\
        <tbody id=\"QoS_Traffic_Rule_List\"></tbody>\
    </table>\
    </div>"],
            ["append", "<div>\
                <div style=\"display: inline;\"><button type=\"button\" id=\"Traffic_rule_Add\"  class=\"btn btn-primary btn-round\">" + arrLang[lang]["LANG_ADD"] + "</button></div>\
                <div style=\"display: inline;\"><button type=\"button\" id=\"Traffic_rule_del\" class=\"btn btn-danger btn-round\">" + arrLang[lang]["LANG_DELETE_SELECTED"] + "</button></div>\
            </div>"],
            ["append", "<div id='Traffic_rule_del_place'></div>"],
        ]
    }

    var Total_BW_Limit_Part = {
        "length": 1,
        1: [
            ["#Total_BW_Limit_place", 0, "2"],
            ["switch", "Total_BW_Limit_Switch", "arrLang[lang]['LANG_TOTAL_BANDWIDTH_LIMIT'], ,arrLang[lang]['LANG_ENABLE']", "totalBandWidthEn"],
            ["text", "Limit_rate", "arrLang[lang]['LANG_TOTAL_BANDWIDTH_LIMIT']", "totalBandwidth", , "placeholder='kb/s'"],
            ["form", "BWL_form", "action=\"/boaform/getASPdata/formQosTraffictl\" method=\"post\"", "1", Traffic_Page_refresh],
            ["hidden", "lst", ""],
        ]
    }

    var Traffic_rule_del_Part = {
        "length": 1,
        1: [
            ["#Traffic_rule_del_place", 0, "2"],
            ["form", "Traffic_Del_form", "action=\"/boaform/getASPdata/formQosTraffictl\" method=\"post\"", "1", Traffic_Page_refresh],
            ["hidden", "lst", ""],
        ]
    }

    Auto_Page_generate(Traffic_ctl_Page);
    var TBL_PM = Auto_Page_generate(Total_BW_Limit_Part);
    Auto_Page_generate(Traffic_rule_del_Part);

    function QoS_Traffic_Rule_List_init() {
        $("#QoS_Traffic_Rule_List").empty();
        var index = 0;
        for (var key in Traffic_config_data) {
            if (key.indexOf("traffictl_rule") != -1) {
                var data = Traffic_config_data[key];

                var tmp;
                $("#QoS_Traffic_Rule_List").append("<tr class='justhover'>\
                                            <td></td>\
                                            <td></td>\
                                            <td></td>\
                                            <td></td>\
                                            <td></td>\
                                            <td></td>\
                                            <td></td>\
                                            <td></td>\
                                            <td></td>\
                                        </tr>");
                $("#QoS_Traffic_Rule_List").find("tr").eq(index).find("td").eq(0).text(data.id);
                var pro_Map = {
                    "0": "NONE",
                    "1": "TCP",
                    "2": "UDP",
                    "3": "ICMP",
                };
                $("#QoS_Traffic_Rule_List").find("tr").eq(index).find("td").eq(1).text(pro_Map[data.proto]);
                $("#QoS_Traffic_Rule_List").find("tr").eq(index).find("td").eq(2).text(data.sport);
                $("#QoS_Traffic_Rule_List").find("tr").eq(index).find("td").eq(3).text(data.dport);
                if (data.IPversion == "2") {
                    var sip = data.srcip6;
                    var dip = data.dstip6;
                } else {
                    var sip = data.srcip;
                    var dip = data.dstip;
                }
                $("#QoS_Traffic_Rule_List").find("tr").eq(index).find("td").eq(4).text(sip);
                $("#QoS_Traffic_Rule_List").find("tr").eq(index).find("td").eq(5).text(dip);
                $("#QoS_Traffic_Rule_List").find("tr").eq(index).find("td").eq(6).text(data.rate);
                if (data.IPversion == "2")
                    var IP_ver = "IPv6";
                else
                    var IP_ver = "IPv4";
                $("#QoS_Traffic_Rule_List").find("tr").eq(index).find("td").eq(7).text(IP_ver);
                if (data.direction == "0")
                    var Dir = arrLang[lang]['LANG_UPSTREAM'];
                else
                    var Dir = arrLang[lang]['LANG_DOWNSTREAM'];
                $("#QoS_Traffic_Rule_List").find("tr").eq(index).find("td").eq(8).text(Dir);
                index++;
            }
        }
        $("#QoS_Traffic_Rule_List").find(".justhover").on("click", function () {
            $(this).toggleClass("td_select");
        })

    }

    $("#Total_BW_Limit_Switch").on("click", function () {
        setTimeout(function () {
            if (!checkDigit(TBL_PM.totalBandwidth.val()) || TBL_PM.totalBandwidth.val() == "") {
                TBL_PM.totalBandWidthEn.val("0");
                swal_check_warning("input[name='totalBandwidth']", arrLang[lang]['LANG_TOTAL_BANDWIDTH_LIMIT'] + " " + arrLang[lang]['LANG_IS_INVALID']);
                return;
            }
            if (TBL_PM.totalBandWidthEn.val() == "1") {
                var content = "";
                content += "applybandwidth&bandwidth=" + $("input[name='totalBandwidth']").val();
                $("input[name='totalBandwidth']").prop("disabled", true);
                $("#BWL_form").find("input[name='lst']").val(content);
                $("#waiting_animation").show();
                $.ajaxSettings.async = true;
                $("#BWL_form").submit();
            } else if (TBL_PM.totalBandWidthEn.val() == "0") {
                var content = "cancelbandwidth";
                $("input[name='totalBandwidth']").prop("disabled", false);
                $("#BWL_form").find("input[name='lst']").val(content);
                $("#waiting_animation").show();
                $.ajaxSettings.async = true;
                $("#BWL_form").submit();
            }
        }, 50);
    })

    function Traffic_rule_edit_Page_init(mode) {
        var Traffic_rule_flow_page = {
            id: "QoS_Traffic_Rule_flow",
            name: arrLang[lang]["LANG_ADD_IP_QOS_TRAFFIC"],
            width: "500px",
            height: "550px",
        }

        var Traffic_rule_edit_page = {
            "length": 1,
            1: [
                ["QoS_Traffic_Rule_flow", 0, "2"],
                ["form", "Traffic_rule_edit_form", "action=\"/boaform/getASPdata/formQosTraffictlEdit\" method=\"post\"", "1", Traffic_Page_refresh],
                ["menu", "B_IpProtocolType", "arrLang[lang][\"LANG_IP_VERSION\"]", "IPversion", [
                    ["1", " Ipv4"],
                    ["2", " Ipv6"],
                ]],
                ["menu", "B_inf", "arrLang[lang][\"LANG_INTERFACE\"]", "inf", [
                    ["130816|1", "nas0_0"],
                    ["130817|1", "nas0_1"],
                ]],
                ["menu", "B_direction", "arrLang[lang][\"LANG_DIRECTION\"]", "direction", [
                    ["0", "arrLang[lang]['LANG_UPSTREAM']"],
                    ["1", "arrLang[lang]['LANG_DOWNSTREAM']"],
                ]],
                ["menu", "B_protolist", "arrLang[lang][\"LANG_PROTOCOL\"]", "protocol0", [
                    ["0", "NONE"],
                    ["1", "TCP"],
                    ["2", "UDP "],
                    ["3", "ICMP "],
                ]],
                ["text", "B_srcip", "arrLang[lang]['LANG_SOURCE'], ,IP", "srcip", "15"],
                ["text", "B_srcnetmask", "arrLang[lang][\"LANG_SOURCE_MASK\"]", "srcnetmask", "15"],
                ["text", "B_dstip", "arrLang[lang]['LANG_DESTINATION'], ,IP", "dstip", "15"],
                ["text", "B_dstnetmask", "arrLang[lang][\"LANG_DESTINATION_MASK\"]", "dstnetmask", "15"],
                ["text", "B_sip6", "arrLang[lang][\"LANG_SOURCE\"], ,IP", "srcip6", "39"],
                ["text", "B_sip6PrefixLen", "arrLang[lang][\"LANG_SOURCE_PREFIX_LENGTH\"]", "srcip6PrefixLen", "15"],
                ["text", "B_dip6", "arrLang[lang][\"LANG_DESTINATION\"], ,IP", "dstip6", "39"],
                ["text", "B_dip6PrefixLen", "arrLang[lang][\"LANG_DESTINATION_PREFIX_LENGTH\"]", "dstip6PrefixLen", "15"],
                ["text", "B_sport", "arrLang[lang][\"LANG_SOURCE_PORT\"]", "sport"],
                ["text", "B_dport", "arrLang[lang][\"LANG_DESTINATION_PORT\"]", "dport"],
                ["text", "B_rate", "arrLang[lang][\"LANG_RATE_LIMIT\"]", "rate"],
                ["hidden", "lst", ""],
                ["submit", "Traffic_rule_edit_submit", Traffic_rule_edit_check],
            ]
        }



        flow_table_generate(Traffic_rule_flow_page);
        var tmp_PM = Auto_Page_generate(Traffic_rule_edit_page);
        tmp_PM.inf.body(0);
        tmp_PM.inf.val("130816|1");
        tmp_PM.IPversion.val("1");
        tmp_PM.direction.val("0");
        tmp_PM.protocol0.val("0");
        $("#QoS_Traffic_Rule_flow").on("click", function () {
            if (tmp_PM.IPversion.val() == "2") {
                tmp_PM.srcip.body(0);
                tmp_PM.srcnetmask.body(0);
                tmp_PM.dstip.body(0);
                tmp_PM.dstnetmask.body(0);
                tmp_PM.srcip6.body(1);
                tmp_PM.srcip6PrefixLen.body(1);
                tmp_PM.dstip6.body(1);
                tmp_PM.dstip6PrefixLen.body(1);
            } else {
                tmp_PM.srcip.body(1);
                tmp_PM.srcnetmask.body(1);
                tmp_PM.dstip.body(1);
                tmp_PM.dstnetmask.body(1);
                tmp_PM.srcip6.body(0);
                tmp_PM.srcip6PrefixLen.body(0);
                tmp_PM.dstip6.body(0);
                tmp_PM.dstip6PrefixLen.body(0);
            }
        })
        $("#QoS_Traffic_Rule_flow").click();

        function Traffic_rule_edit_check() {
            if (tmp_PM.inf.val() == "") {
                swal_check_warning("#QoS_Traffic_Rule_flow", arrLang[lang]['LANG_WAN_INTERFACE_NOT_ASSIGNED']);
                return false;
            }

            if (tmp_PM.IPversion.val() == "1") {
                if (tmp_PM.srcip.val() != "" && sji_checkip(tmp_PM.srcip.val()) == false) {
                    swal_check_warning("input[name='srcip']", arrLang[lang]['LANG_SOURCE_IP_INVALID']);
                    return false;
                }
                if (tmp_PM.dstip.val() != "" && sji_checkip(tmp_PM.dstip.val()) == false) {
                    swal_check_warning("input[name='dstip']", arrLang[lang]['LANG_DESTINATION_IP_INVALID']);
                    return false;
                }
                if (tmp_PM.srcnetmask.val() != "" && sji_checkip(tmp_PM.srcnetmask.val()) == false) {
                    swal_check_warning("input[name='srcnetmask']", arrLang[lang]['LANG_SOURCE_IP_MASK_INVALID']);
                    return false;
                }
                if (tmp_PM.dstnetmask.val() != "" && sji_checkip(tmp_PM.dstnetmask.val()) == false) {
                    swal_check_warning("input[name='dstnetmask']", arrLang[lang]['LANG_DESTINATION_IP_MASK_INVALID']);
                    return false;
                }
            } else if (tmp_PM.IPversion.val() == 2) {
                if (tmp_PM.srcip6.val() != "") {
                    if (!isGlobalIpv6Address(tmp_PM.srcip6.val())) {
                        swal_check_warning("input[name='srcip6']", arrLang[lang]['LANG_INVALID_SOURCE_IPV6_ADDRESS']);
                        return false;
                    }
                    if (tmp_PM.srcip6PrefixLen.val() != "") {
                        var prefixlen = getDigit(tmp_PM.srcip6PrefixLen.val(), 1);
                        if (prefixlen > 128 || prefixlen <= 0) {
                            swal_check_warning("input[name='srcip6PrefixLen']", arrLang[lang]['LANG_INVALID_SOURCE_IPV6_PREFIX_LENGTH']);
                            return false;
                        }
                    }
                }
                if (tmp_PM.dstip6.val() != "") {
                    if (!isGlobalIpv6Address(tmp_PM.dstip6.val())) {
                        swal_check_warning("input[name='dstip6']", arrLang[lang]['LANG_INVALID_DESTINATION_IPV6_ADDRESS'])
                        return false;
                    }
                    if (tmp_PM.dstip6PrefixLen.val() != "") {
                        var prefixlen = getDigit(tmp_PM.dstip6PrefixLen.val(), 1);
                        if (prefixlen > 128 || prefixlen <= 0) {
                            swal_check_warning("input[name='dstip6PrefixLen']", arrLang[lang]['LANG_INVALID_DESTINATION_IPV6_PREFIX_LENGTH']);
                            return false;
                        }
                    }
                }
            }


            if (tmp_PM.sport.val() != "") {
                if (!sji_checkdigit(tmp_PM.sport.val()) || tmp_PM.sport.val() < 0 || tmp_PM.sport.val() > 65536) {
                    swal_check_warning("input[name='sport']", arrLang[lang]['LANG_SOURCE_PORT_INVALID']);
                    return false;
                }
                if (tmp_PM.sport.val() > 0 && tmp_PM.sport.val() < 65535) {
                    if (tmp_PM.protocol0.val() == 3) {
                        swal_check_warning("#B_protolist", arrLang[lang]['LANG_PLEASE_ASSIGN_TCP_UDP']);
                        return false;
                    }
                }
            }
            if (tmp_PM.dport.val() != "") {
                if (!sji_checkdigit(tmp_PM.dport.val()) || tmp_PM.dport.val() < 0 || tmp_PM.dport.val() > 65536) {
                    swal_check_warning("input[name='dport']", arrLang[lang]['LANG_DESTINATION_PORT_INVALID']);
                    return false;
                }
                if (tmp_PM.dport.val() > 0 && tmp_PM.dport.val() < 65535) {
                    if (tmp_PM.protocol0.val() == 3) {
                        swal_check_warning("#B_protolist", arrLang[lang]['LANG_PLEASE_ASSIGN_TCP_UDP']);
                        return false;
                    }
                }
            }
            if (!sji_checkdigit(tmp_PM.rate.val()) || tmp_PM.rate.val() <= 0) {
                swal_check_warning("input[name='rate']", arrLang[lang]['LANG_UPLINK_RATE_INVALID']);
                return false;
            }
            if ((tmp_PM.rate.val() % 512) != 0) {
                swal_check_warning("input[name='rate']", arrLang[lang]['LANG_THE_RATE_MUST_MULTIPLE_OF_FOT']);
                return false;
            }



            if (tmp_PM.IPversion.val() == 1) {
                var content = "inf=" + tmp_PM.inf.val() + "&protocol0=" + tmp_PM.protocol0.val() + "&IPversion=" + tmp_PM.IPversion.val() + "&srcip=" + tmp_PM.srcip.val() + "&srcnetmask=" + tmp_PM.srcnetmask.val() +
                    "&dstip=" + tmp_PM.dstip.val() + "&dstnetmask=" + tmp_PM.dstnetmask.val() + "&sport=" + tmp_PM.sport.val() + "&dport=" + tmp_PM.dport.val() + "&rate=" + tmp_PM.rate.val() + "&direction=" + tmp_PM.direction.val();
            }

            else if (tmp_PM.IPversion.val() == 2) {
                var content = "inf=" + tmp_PM.inf.val() + "&protocol0=" + tmp_PM.protocol0.val() + "&IPversion=" + tmp_PM.IPversion.val() + "&srcip6=" + tmp_PM.srcip6.val() + "&srcip6PrefixLen=" + tmp_PM.srcip6PrefixLen.val() +
                    "&dstip6=" + tmp_PM.dstip6.val() + "&dstip6PrefixLen=" + tmp_PM.dstip6PrefixLen.val() + "&sport=" + tmp_PM.sport.val() + "&dport=" + tmp_PM.dport.val() + "&rate=" + tmp_PM.rate.val() + "&direction=" + tmp_PM.direction.val();

            }
            $("#QoS_Traffic_Rule_flow").find("input[name='lst']").val(content);

            return true;
        }
    }

    $("#Traffic_rule_Add").on("click", function () {
        Traffic_rule_edit_Page_init();
        FMask_init();
    })

    $("#Traffic_rule_del").on("click", function () {
        var content = "";
        $("#QoS_Traffic_Rule_List").find(".td_select").each(function () {
            if (content == "")
                content = "applysetting#id=" + $(this).find("td").eq(0).text();
            else
                content += "|" + $(this).find("td").eq(0).text();

        })
        $("#Traffic_Del_form").find("input[name='lst']").val(content);
        $("#waiting_animation").show();
        $.ajaxSettings.async = true;
        $("#Traffic_Del_form").submit();
    })

    $("#Traffic_ctl_row").find(".col-lg-8").each(function () {
        $(this).removeClass("col-lg-8");
        $(this).addClass("col-lg-12");
    })

    function Traffic_Page_refresh() {
        Traffic_config_data = {};
        Page_data_obj_init(Traffic_config_data, OneForAll("getASPdata/initTraffictlPage"));
        if (Traffic_config_data.totalBandWidthEn == "1") {
            $("input[name='totalBandwidth']").prop("disabled", true);
        } else {
            $("input[name='totalBandwidth']").prop("disabled", false);
        }
        for (var key in Traffic_config_data) {
            if (key.indexOf("traffictl_rule") != -1) {
                Traffic_config_data[key] = nest_obj_init(Traffic_config_data[key]);
            }
        }
        set_obj_data_to_html(Traffic_config_data);
        QoS_Traffic_Rule_List_init();
        $(".layui-layer-close2").click();
    }

    Traffic_Page_refresh();
}

function Queue_Page_init() {
    var data = OneForAll("getASPdata/initQueuePolicy", 5, 0, 0, 0);
    Page_data_obj_init(QoS_Page_data, data);
    set_obj_data_to_html(QoS_Page_data);
    $("#Queue_Config_List").empty();
    for (var key in QoS_Page_data) {
        if (key.indexOf("queues") != -1) {
            QoS_Page_data[key] = nest_obj_init(QoS_Page_data[key]);
            Queue_Config_List_generate(QoS_Page_data[key]);
        }
    }
    if ($("input[name='QoS_Policy']").val() == "0") {
        $(".QoSL2").show();
        $(".QoSL3").hide();
        $(".QoSL3").find("input").prop("disabled", true);
    } else {
        $(".QoSL2").hide();
        $(".QoSL3").show();
        $(".QoSL3").find("input").prop("disabled", false);
    }

    (function (s) {
        $(".QCList").on("click", function () {
            $(this).toggleClass("td_select");
            if ($(this).hasClass("td_select")) {
                $(this).nextAll().find("input").each(function () {
                    if ($(this).prop("name").indexOf("qen") != -1) {
                        $(this).prop("disabled", false);
                    }
                })
            } else {
                $(this).nextAll().find("input").each(function () {
                    if ($(this).prop("name").indexOf("qen") != -1) {
                        $(this).prop("disabled", true);
                    }
                })
            }
        })
    })(jQuery);
}

function Queue_Config_List_generate(data) {
    var content = "";
    content += "<tr>";
    if (data["enable"] == '1') {
        content += "<td class='QCList justhover td_select'>" + "Q" + (parseInt(data["qindex"]) + 1) + "</td>"
    } else {
        content += "<td class='QCList justhover'>" + "Q" + (parseInt(data["qindex"]) + 1) + "</td>"
    }

    content += "<td class='QoSL2'>" + data["prio"] + "</td>\
            <td class='QoSL3'>" + "<input class='form-control' name=\"" + "w" + data["qindex"] + "\" value=\"" + data["weight"] + "\">" + "</td>";
    if (data["enable"] == '1') {
        content += "<td style='display:none;'>" + "<input name=\"" + "qen" + data["qindex"] + "\" value='on'>" + "</td>"
    } else {
        content += "<td style='display:none;'>" + "<input name=\"" + "qen" + data["qindex"] + "\" value='on' disabled>" + "</td>"
    }
    content += "</tr>"
    $("#Queue_Config_List").append(content);
}



var QoS_Rule_data = {};
var QoS_Page_data = {};
var Traffic_config_data = {};
$(document).ready(function () {
    QoS_Config_Page_init();
    QoS_Classify_Page_init();
    QoS_Traffic_Control_Page_init();

})
