function PW_Change_Page_init() {
    $(".container-fluid").hide();
    $(".card-body").empty();
    var Manag_User = {
        "length": 1,
        1: [
            [".card-body", 0],
            ["tips", "h6", "style=\"font-weight:bold;color:#4e73dfbe \"", "arrLang[lang]['LANG_MGM_USER_PASSWORD_RULE0']"],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_MGM_USER_PASSWORD_RULE1']"],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_MGM_USER_PASSWORD_RULE2']"],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_MGM_USER_PASSWORD_RULE3']"],
            ["tips", "h6", "class='tips_font' ", "arrLang[lang]['LANG_MGM_USER_PASSWORD_RULE4']"],
            ["form", "management_user_form", "action=\"/boaform/getASPdata/new_formPasswordSetup\" method=\"post\""],
            ["password", "old_password", "arrLang[lang][\"LANG_OLD_PASSWORD_TITLE\"]", "oldPasswd", "16"],
            ["password", "new_password", "arrLang[lang][\"LANG_NEW_PASSWORD_TITLE\"]", "newPasswd", "16"],
            ["password", "affirmPasswd", "arrLang[lang][\"LANG_AFFIRM_PASSWORD_TITLE\"]", "affirmPasswd", "16"],
            ["submit", "management_user_config_submit", check_passwd],
        ],
    }

    Auto_Page_generate(Manag_User);
    $(".container-fluid").addClass("animated fadeInDown");
    $(".container-fluid").show();

    function key_monitor() {
        (function (s) {
            var key_flag = 0;
            s(document).keyup(function (event) {
                if (event.keyCode == 13) {
                    key_flag = !key_flag;
                    if (key_flag == 1) {
                        $("#management_user_config_submit").click();
                    }
                }
            });
        })(jQuery);
    }

    $("#management_user_form").ajaxForm(function (data) {
        FMask_init();
        if (data.indexOf("LANG_PSWD_SHOULD_NOT_BE_SAME") != -1) {
            $("#waiting_animation").hide();
            swal_check_warning("#new_password", arrLang[lang]["LANG_PSWD_SHOULD_NOT_BE_SAME"])
        } else if (data.indexOf("LANG_PSWD_IS_INVALID") != -1) {
            $("#waiting_animation").hide();
            swal_check_warning("#new_password", arrLang[lang]["LANG_PSWD_IS_INVALID"])
        } else if (data.indexOf("LANG_ERROR_INPUT_OLD_USER_PASSWORD_ERROR") != -1) {
            $("#waiting_animation").hide();
            swal_check_warning("#old_password", arrLang[lang]["LANG_ERROR_INPUT_OLD_USER_PASSWORD_ERROR"])
        } else if (data.indexOf("Successs") != -1) {
            $("#waiting_animation").hide();
            swal({
                title: arrLang[lang]["LANG_SUBMIT_SUCCESS"],
                icon: "success",
            })
                .then((willDelete) => {
                    if (willDelete) window.location = "login.html";
                });
        }
    })

    key_monitor();

    function check_passwd() {
        if ($("#old_password").val().length <= 0) {
            swal_check_warning("#old_password", arrLang[lang]["LANG_PASSWORD_CANNOT_BE_EMPTY_PLEASE_TRY_IT_AGAIN"]);
            return false;
        } else if ($("#new_password").val().length <= 0) {
            swal_check_warning("#new_password", arrLang[lang]["LANG_NEW_PASSWORD_CAN_NOT_BE_EMPTY_INPUT_AGAIN"]);
            return false;
        } else if ($("#new_password").val().length < 6) {
            swal_check_warning("#new_password", arrLang[lang]["LANG_MGM_USER_PASSWORD_RULE1"]);
            return false;
        } else if ($("#new_password").val().length > 16) {
            swal_check_warning("#new_password", arrLang[lang]["LANG_MGM_USER_PASSWORD_RULE2"]);
            return false;
        } else if (sji_checkLoginPsk($("#new_password").val(), 6, 16) == false) {
            swal_check_warning("#new_password", arrLang[lang]["LANG_MGM_USER_PASSWORD_RULE3"] + "\n" + arrLang[lang]["LANG_MGM_USER_PASSWORD_RULE4"]);
            return false;
        } else if ($("#affirmPasswd").val().length <= 0) {
            swal_check_warning("#affirmPasswd", arrLang[lang]["LANG_AFFIRM_PASSWORD_CAN_NOT_BE_EMPTY_INPUT_AGAIN"]);
            return false;
        } else if ($("#new_password").val() != $("#affirmPasswd").val()) {
            swal_check_warning("#affirmPasswd", arrLang[lang]["LANG_AFFIRM_PASSWORD_DO_NOT_MATCH_NEW_PASSWORD_INPUT_AGAIN"]);
            return false;
        }
        return true;
    }
}

$(document).ready(function () {
    PW_Change_Page_init();
    FMask_init();
})
