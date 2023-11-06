var Basic_Config_List = {};

function VOIP_Basic_Config_List_init() {
    Basic_Config_List = {
        "length": 1,
        1: [
            ["Adv_Config_row", arrLang[lang]["LANG_VOIP_ADVANCE_CONFIG"], "2"],
            ["form", "Adv_Config_form", "action=\"/boaform/admin/voip2_e8c_set\" method=\"POST\"", "1", after_success],
            ["tips", "h6", "class='tips_font' ", "SIP"],
            ["text", "B_sipPort", "SIP ,arrLang[lang][\"LANG_LOCAL\"], ,arrLang[lang][\"LANG_PORT\"]", "sipPort", "5"],
            ["text", "B_rtpPort", "RTP ,arrLang[lang][\"LANG_START_PORT\"]", "rtpPort", "5"],
            ["text", "B_packetTime", arrLang[lang]["LANG_PACKET_TIME"], "packetTime", "5"],
            ["menu", "B_dtmfMode", "DTMF ,arrLang[lang][\"LANG_MODE\"]", "dtmfMode", [
                ["RFC2833", "RFC2833"],
                ["SIP INFO", "SIP INFO"],
                ["Inband", "Inband"],
                ["DTMF_delete", "DTMF_delete"],
            ]],
            ["text", "B_rfc2833_payload", "RFC2833 payload", "rfc2833_payload", "5"],
            ["tips", "h6", "class='tips_font' ", arrLang[lang]["LANG_VOIP_ADVANCE_CONFIG"]],
            ["switch", "B_echo_cancellation", arrLang[lang]["LANG_LEC"], "echo_cancellation"],
            ["switch", "B_useVad", "VAD", "useVad"],
            ["switch", "B_useT38", "T.38", "useT38"],
            ["switch", "B_syncphonetime", arrLang[lang]["LANG_SYNC_PHONE_TIME"], "syncphonetime"],
            ["menu", "B_caller_id", arrLang[lang]["LANG_CALLER_ID_MODE"], "caller_id", [
                ["FSK_BELLCORE", "FSK_BELLCORE"],
                ["FSK_ETSI", "FSK_ETSI"],
                ["FSK_BT", "FSK_BT"],
                ["FSK_NTT", "FSK_NTT"],
                ["DTMF", "DTMF"],
            ]],
            ["menu", "B_tone_of_country", arrLang[lang]["LANG_REGION"], "tone_of_country", [
                ["USA", "USA"],
                ["UK", "UK"],
                ["AUSTRALI", "AUSTRALI"],
                ["HK", "HK"],
                ["JAPAN", "JAPAN"],
                ["SWEDEN", "SWEDEN"],
                ["GERMANY", "GERMANY"],
                ["FRANCE", "FRANCE"],
                ["TW", "TW"],
                ["BELGIUM", "BELGIUM"],
                ["FINLAND", "FINLAND"],
                ["ITALY", "ITALY"],
                ["CHINA", "CHINA"],
                ["INDIA", "INDIA"],
                ["BRAZIL", "BRAZIL"],
            ]],
            ["text", "B_SessionExpireTimer", arrLang[lang]["LANG_SESSION_EXPIRE_SEC"], "SessionExpireTimer", "32"],
            ["text", "B_flash_hook_time_min", "arrLang[lang][\"LANG_FLASH_TIME\"], min(80ms)", "flash_hook_time_min", "5"],
            ["text", "B_flash_hook_time", "arrLang[lang][\"LANG_FLASH_TIME\"], max(2000ms)", "flash_hook_time", "5"],
            ["text", "B_off_hook_alarm", arrLang[lang]["LANG_OFF_HOOK_ALARM"], "off_hook_alarm", "32"],
            ["text", "B_auto_dial", arrLang[lang]["LANG_SHORT_DIGIT_TIMER"], "auto_dial", "32"],
            ["text", "B_InterDigitTimerLong", arrLang[lang]["LANG_LONG_DIGIT_TIMER"], "InterDigitTimerLong", "32"],
            ["text", "B_BusyToneTimer", arrLang[lang]["LANG_BUSY_TONE_TIME"], "BusyToneTimer", "32"],
            ["text", "B_HangingReminderToneTimer", arrLang[lang]["LANG_HOWLER_TIME"], "HangingReminderToneTimer", "32"],
            ["text", "B_RegisterRetryInterval", arrLang[lang]["LANG_REG_RETRY_INTERVAL"], "RegisterRetryInterval", "32"],
            ["menu", "B_HeartbeatMode", arrLang[lang]["LANG_HEART_BEAT_MODE"], "HeartbeatMode", [
                ["0", "arrLang[lang][\"LANG_AUTO\"]"],
                ["1", "arrLang[lang][\"LANG_VOIP_HB_PASSIVE_OPTION\"]"],
                ["2", "arrLang[lang][\"LANG_VOIP_HB_ACTIVE_REGISTER\"]"],
                ["3", "arrLang[lang][\"LANG_VOIP_HB_ACTIVE_OPTION\"]"],
            ]],
            ["text", "B_HeartbeatCycle", "arrLang[lang][\"LANG_HEART_BEAT_CYCLE\"],[0:,arrLang[lang][\"LANG_DISABLE\"],]", "HeartbeatCycle", "32"],
            ["text", "B_NoAnswerTimer", "arrLang[lang][\"LANG_NO_ANSWER_TIMER\"],[0:,arrLang[lang][\"LANG_DISABLE\"],]", "NoAnswerTimer", "32"],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang][\"LANG_CODEC\"], ,arrLang[lang][\"LANG_PRIORITY\"]"],
            ["menu", "B_preced0", "arrLang[lang][\"LANG_PRIORITY\"], 1", "preced0", [
                ["0", "G711-ulaw"],
                ["1", "G711-alaw"],
                ["2", "G729"],
                ["3", "G722"],
            ]],
            ["menu", "B_preced1", "arrLang[lang][\"LANG_PRIORITY\"], 2", "preced1", [
                ["0", "G711-ulaw"],
                ["1", "G711-alaw"],
                ["2", "G729"],
                ["3", "G722"],
                //["4", "NULL"],
            ]],
            ["menu", "B_preced2", "arrLang[lang][\"LANG_PRIORITY\"], 3", "preced2", [
                ["0", "G711-ulaw"],
                ["1", "G711-alaw"],
                ["2", "G729"],
                ["3", "G722"],
                //["4", "NULL"],
            ]],
            ["menu", "B_preced3", "arrLang[lang][\"LANG_PRIORITY\"], 4", "preced3", [
                ["0", "G711-ulaw"],
                ["1", "G711-alaw"],
                ["2", "G729"],
                ["3", "G722"],
                //["4", "NULL"],
            ]],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang][\"LANG_DAIL_PLAN\"]"],
            ["switch", "B_digitmap_enable", arrLang[lang]["LANG_DAIL_PLAN_ENABLE"], "digitmap_enable"],
            ["switch", "B_maxMatch_enable", arrLang[lang]["LANG_MAX_MATCH"], "maxMatch_enable"],
            ["textarea", "dialplan", "arrLang[lang]['LANG_DAIL_PLAN']", "dialplan"],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang][\"LANG_LINE\"], 1"],
            ["switch", "B_polarity_reversal_l1", arrLang[lang]["LANG_POLAR_REVERSAL"], "polarity_reversal_l1"],
            ["text", "B_send_gain_l1", "arrLang[lang][\"LANG_SEND_GAIN\"],(dB)", "send_gain_l1", "32"],
            ["text", "B_recv_gain_l1", "arrLang[lang][\"LANG_RECV_GAIN\"],(dB)", "recv_gain_l1", "32"],
            ["switch", "B_call_waiting_l1", arrLang[lang]["LANG_CALL_WAIT"], "call_waiting_l1"],
            ["switch", "B_call_conference_l1", arrLang[lang]["LANG_3PTY_CONFERENCE"], "call_conference_l1"],
            ["switch", "B_hot_line_enable_l1", arrLang[lang]["LANG_HOT_LINE_ENABLE"], "hot_line_enable_l1"],
            ["text", "B_hot_line_tm_l1", arrLang[lang]["LANG_HOT_LINE_TIMEOUT"], "hot_line_tm_l1", "32"],
            ["text", "B_hot_line_num_l1", arrLang[lang]["LANG_HOT_LINE_NUMBER"], "hot_line_num_l1", "32"],
            ["switch", "B_uc_forward_enable_l1", arrLang[lang]["LANG_UNCOND_FORWARD"], "uc_forward_enable_l1"],
            ["text", "B_uc_forward_l1", arrLang[lang]["LANG_UNCOND_NUM"], "uc_forward_l1", "32"],
            ["switch", "B_busy_forward_enable_l1", arrLang[lang]["LANG_BUSY_FORWARD"], "busy_forward_enable_l1"],
            ["text", "B_busy_forward_l1", arrLang[lang]["LANG_BUSY_FORWARD_NUM"], "busy_forward_l1", "32"],
            ["switch", "B_na_forward_enable_l1", arrLang[lang]["LANG_NO_ANSWER_FORWARD"], "na_forward_enable_l1"],
            ["text", "B_na_forward_l1", arrLang[lang]["LANG_NO_ANSWER_FORWARD_NUM"], "na_forward_l1", "32"],
            ["text", "B_na_forward_time_l1", arrLang[lang]["LANG_NO_ANSWER_FORWARD_TIME"], "na_forward_time_l1", "32"],
            ["switch", "B_call_trans_enable_l1", arrLang[lang]["LANG_CALL_TRANSFER"], "call_trans_enable_l1"],
            ["text", "B_unat_call_trans_l1", arrLang[lang]["LANG_UNATTEND_TRANSFER"], "unat_call_trans_l1", "32"],
            ["text", "B_at_call_trans_l1", arrLang[lang]["LANG_ATTEND_TRANSFER"], "at_call_trans_l1", "32"],
            ["submit", "Adv_Config_Submit", Adv_Config_Check]
        ]
    };
}

function Adv_Config_Check() {
    if (($("input[name='preced0']").val() == $("input[name='preced1']").val()) || ($("input[name='preced0']").val() == $("input[name='preced2']").val()) || ($("input[name='preced0']").val() == $("input[name='preced3']").val()) ||
        (($("input[name='preced1']").val() == $("input[name='preced2']").val()) && ($("input[name='preced1']").val() != '4')) || (($("input[name='preced1']").val() == $("input[name='preced3']").val()) && ($("input[name='preced1']").val() != '4')) ||
        (($("input[name='preced2']").val() == $("input[name='preced3']").val()) && ($("input[name='preced2']").val() != '4'))) {
        $("#B_preced0_Link").focus();
        MyAlert(arrLang[lang]["LANG_APP_VOIP2_ERR"]);
        return false;
    }

    var port_check_list = ["sipPort", "rtpPort"];
    for (var i in port_check_list) {
        if (VOIP_ADV_PM[port_check_list[i]].val().length != 0) {
            if (!sji_checkdigit2(VOIP_ADV_PM[port_check_list[i]].val()) || !sji_checkdigitrange(VOIP_ADV_PM[port_check_list[i]].val(), 10, 65535)) {
                swal_check_warning("input[name='" + port_check_list[i] + "']", arrLang[lang]["LANG_PARAMETER"] + " " + arrLang[lang]['LANG_INVALID']);
                return false;
            }
        }
    }

    var NUM_CHECK_LIST = ["rfc2833_payload", "SessionExpireTimer", "flash_hook_time_min",
        "flash_hook_time", "off_hook_alarm", "auto_dial",
        "auto_dial", "InterDigitTimerLong", "BusyToneTimer",
        "HangingReminderToneTimer", "RegisterRetryInterval", "InterDigitTimerLong",
        "BusyToneTimer", "HangingReminderToneTimer", "RegisterRetryInterval",
        "HeartbeatCycle", "NoAnswerTimer"];
    for (var i in NUM_CHECK_LIST) {
        if (VOIP_ADV_PM[NUM_CHECK_LIST[i]].val().length != 0) {
            if (!sji_checkdigit2(VOIP_ADV_PM[NUM_CHECK_LIST[i]].val())) {
                swal_check_warning("input[name='" + NUM_CHECK_LIST[i] + "']", arrLang[lang]["LANG_PARAMETER"] + " " + arrLang[lang]['LANG_INVALID']);
                return false;
            }
        }
    }

    return true;
}

function after_success() {
    Page_data_obj_init(VOIP_PAGE, OneForAll("getASPdata/asp_voip_e8c_get", 5, 0, 0, 0));
    set_obj_data_to_html(VOIP_PAGE);
}

var VOIP_PAGE = {};
var VOIP_ADV_PM = {};
$(document).ready(function () {
    VOIP_Basic_Config_List_init();
    VOIP_ADV_PM = Auto_Page_generate(Basic_Config_List, "200px");
    Page_data_obj_init(VOIP_PAGE, OneForAll("getASPdata/asp_voip_e8c_get", 5, 0, 0, 0));
    set_obj_data_to_html(VOIP_PAGE);
})
