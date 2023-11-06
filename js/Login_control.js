var remaining_time = 0;
$(document).ready(function () {
    $("#login_form").ajaxForm(function (data) {
        //alert("post success." + data);
        if (data.indexOf("PW_OR_NAME_FALSE") != -1) {
            MyAlert(arrLang[lang]["wrong user name or password"]);

        } else if (data.indexOf("LOGINED_ERROR_3") != -1) {
            MyAlert(arrLang[lang]["LANG_LOGIN_ERROR_3"]);
            data = data.split("=");
            remaining_time = parseInt(data[1]);
            setTimeout(countdown, 1000);

        } else if (data.indexOf("ANOTHER_USER_LOGINED") != -1) {
            MyAlert(arrLang[lang]["LANG_LOGIN_ERROR_4"]);

        } else if (data.indexOf("YOU_HAVE_LOGINED") != -1) {
            MyAlert(arrLang[lang]["LANG_LOGIN_ERROR_5"]);
            setTimeout(function () {
                window.location = "/";
            }, 1500);

        } else if (data.indexOf("ADMINISTRATOR_ONLY") != -1) {
            MyAlert(arrLang[lang]["wrong user name or password"]);

        } else if (data.indexOf("DEFAULT_ERROR") != -1) {
            MyAlert(arrLang[lang]["LANG_LOGIN_ERROR_6"]);

        } else if (data.indexOf("DEFAULT_PASSWD") != -1) {
            $("#Login_Button").off("click");
            window.location = "FT_Login.html";
        } else {
            $("#Login_Button").off("click");
            window.location = "/";
        }
    });
});

(function (s) {
    s("#Login_Button").on("click", function (e) {
        if (g_page_cstmfun.CF_WEB_CAPTCHA == "0") {
            $.ajaxSetup({ async: false });
            $("#login_form").submit();
        } else if (sublim()) {
            draw(show_num);
            $.ajaxSetup({ async: false });
            $("#login_form").submit();
        } else {
            MyAlert(arrLang[lang]["VERIFICATION_CODE_IS_NOT_CORRECT_PLEASE_INPUT_THE_PROPER_VERIFICATION_CODE"]);
            draw(show_num);
        }
    })
    s(document).keyup(function (event) {
        if (event.keyCode == 13) {
            if ($("#Login_Button").prop("disabled") == false) {
                $("#Login_Button").trigger("click");
            }
        }
    });
})(jQuery);



(function (s) {
    s("#login_username").prop("placeholder", arrLang[lang]["LANG_USERNAME"]);
    s("#login_password").prop("placeholder", arrLang[lang]["LANG_PASSWORD"]);
    s("#text").prop("placeholder", arrLang[lang]["enter verification code"]);
    if (g_page_cstmfun.CF_WEB_CAPTCHA == "0") {
        s("#id_captcha").prop("style", 'display:none;');
        s("#id_captcha_blank").prop("style", 'display:none;');
    }
})(jQuery);






function countdown() {
    $("#Login_Button").prop("disabled", true);
    remaining_time = remaining_time - 1;
    $("#Login_Button").text(remaining_time.toString());
    if (remaining_time <= 0) {
        $("#Login_Button").prop("disabled", false);
        $("#Login_Button").text(arrLang[lang]["LANG_LOGIN"]);
    } else setTimeout('countdown()', 1000);

}
