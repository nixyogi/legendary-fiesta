var loaded_js_list = [];
var loading_page = 0;
var AnimIn = "fadeInRight";
var AnimOut = "fadeOutRight";

function load_js_page(js_name) {
    if (loading_page) {
        setTimeout(function () { load_js_page(js_name); }, 100);
        return;
    }
    loading_page = 1;
    var tar = $("#container");
    tar.removeClass(AnimIn);
    tar.addClass(AnimOut);
    setTimeout(function is_container_disappear() {
        if (tar.css("opacity") == "0") {
            tar.empty();
            get_js(js_name);
            setTimeout(function () {
                tar.removeClass(AnimOut);
                tar.addClass(AnimIn);
                loading_page = 0;
                FMask_init();
            }, 200);
        } else {
            setTimeout(is_container_disappear, 100);
        }
    }, 100);
}


function sidebar_control_init() {
    if ($(".sidebar_tag").length == 0) {
        setTimeout(sidebar_control_init, 50);
        return;
    }

    $(".sidebar_tag").on("click", function () {
        $("#accordionSidebar").find(".active").removeClass("active");
        $(this).addClass("active");
        var p = $(this).parents("li").eq(0);
        p.addClass("active");
        load_js_page("js/" + $(this).attr("js"));
    });
    open_first_page();
}

function horizontal_sidebar_control_init() {
    if ($(".sidebar_tag").length == 0) {
        setTimeout(sidebar_control_init, 50);
        return;
    }
    $(".sidebar_tag").on("click", function () {
        $("#horizontal_sidebar").find(".horizontal_level_1_select").removeClass("horizontal_level_1_select");
        $("#horizontal_sidebar").find(".horizontal_level_2_select").removeClass("horizontal_level_2_select");
        var p = $(this).parents("li");
        p.eq(0).addClass("horizontal_level_2_select");
        p.eq(1).addClass("horizontal_level_1_select");
        load_js_page("js/" + $(this).attr("js"));
    });
    open_first_page_horizontal();
}
function get_js(js_name) {
    var t = undefined;
    function is_redirect_2_html(tar) {
        setTimeout(function () {
            var content_type = tar.getResponseHeader("Content-Type");
            if (content_type.indexOf("javascript") == -1)
                location.reload();
        }, 500);
    }

    jQuery.cachedScript = function (url, options) {
        options = $.extend(options || {}, {
            dataType: "script",
            cache: true,
            url: url
        });
        return jQuery.ajax(options);
    };

    for (var i in loaded_js_list) {
        if (loaded_js_list[i] == js_name) {
            t = $.cachedScript(js_name);
            is_redirect_2_html(t);
            return;
        }
    }
    loaded_js_list.push(js_name);
    t = $.getScript(js_name);
    is_redirect_2_html(t);
    return;
}

function open_first_page() {
    var tar = $(".nav-item").eq(0);
    tar.find(".nav-link").eq(0).click();
    tar.find(".collapse-item").eq(0).click();
}

function open_first_page_horizontal() {
    var tar = $(".mm-collapse").eq(0);
    tar.find("a").eq(0).click();
}
$(document).ready(function () {
    if ($("meta[name='is_horizontal_menu']").attr("content")=="1") {
        AnimIn = "fadeInDown";
        AnimOut = "fadeOutDown";
        horizontal_sidebar_control_init();
    } else {
    sidebar_control_init();
    }
});
