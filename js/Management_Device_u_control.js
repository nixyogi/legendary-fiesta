function Device_Manage_Page_init() {
    var rate = 0;
    var upgrade_state = 0;
    var Timing_Reboot_Page_data = {};
    Page_data_obj_init(Timing_Reboot_Page_data, OneForAll("getASPdata/initPageSysSchedule", 5, 0, 0, 0));
    const Device_Manage_Page = {
        "length": 2,
        1: [
            ["upload_and_reboot_row", "arrLang[lang][\"LANG_COMMIT_REBOOT\"]"],
            ["form", "upload_and_reboot_form", "action=\"/boaform/getASPdata/formNewReboot\" method=\"post\"", "1", , empty_action],
            ["submit", "upload_and_reboot_submit", reboot_count_down, "arrLang[lang][\"LANG_COMMIT_AND_REBOOT\"]"],
        ],
        2: [
            ["Timing_Reboot_row", "arrLang[lang][\"LANG_AUTO_REBOOT\"]", "2"],
            ["form", "Timing_Reboot_form", "action=\"/boaform/getASPdata/formSysSchedule\" method=\"POST\"", "1"],
            ["tips", "div", "class='tips_font'", arrLang[lang]["LANG_CURRENT_TIME"] + ": " + Timing_Reboot_Page_data["time_tips"] + " | " + arrLang[lang][Timing_Reboot_Page_data["datestatus"]]],
            ["append", "<div>\
            <table id=\"day_choose_table\" style=\"line-height: 30px;\">\
                <tbody>\
                    <tr nowrap=\"\">\
                        <th width=\"200px\">" + arrLang[lang]["LANG_SYS_SCH_DAY"] + "</th>\
                        <td>\
                            <div class=\"row\">\
                                <div class=\"justhover\" style=\"white-space: nowrap\" value=\"2\">" + arrLang[lang]["LANG_MON"] + "&nbsp|&nbsp" + "</div>\
                                <div class=\"justhover\" style=\"white-space: nowrap\" value=\"4\">" + arrLang[lang]["LANG_TUE"] + "&nbsp|&nbsp" + "</div>\
                                <div class=\"justhover\" style=\"white-space: nowrap\" value=\"8\">" + arrLang[lang]["LANG_WED"] + "&nbsp|&nbsp" + "</div>\
                                <div class=\"justhover\" style=\"white-space: nowrap\" value=\"16\">" + arrLang[lang]["LANG_THU"] + "&nbsp|&nbsp" + "</div>\
                                <div class=\"justhover\" style=\"white-space: nowrap\" value=\"32\">" + arrLang[lang]["LANG_FRI"] + "&nbsp|&nbsp" + "</div>\
                                <div class=\"justhover\" style=\"white-space: nowrap\" value=\"64\">" + arrLang[lang]["LANG_SAT"] + "&nbsp|&nbsp" + "</div>\
                                <div class=\"justhover\" style=\"white-space: nowrap\" value=\"128\">" + arrLang[lang]["LANG_SUN"] + "</div>\
                            </div>\
                        </td>\
                    </tr>\
                </tbody>\
            </table>\
        </div>"],
            ["hidden", "day", "0"],
            ["tips", "div", "class='tips_font'", arrLang[lang]["LANG_SYS_SCH_TIME"]],
            ["menu", "B_hour", "arrLang[lang][\"LANG_HOUR\"]", "hour", [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["8", "8"],
                ["9", "9"],
                ["10", "10"],
                ["11", "11"],
                ["12", "12"],
                ["13", "13"],
                ["14", "14"],
                ["15", "15"],
                ["16", "16"],
                ["17", "17"],
                ["18", "18"],
                ["19", "19"],
                ["20", "20"],
                ["21", "21"],
                ["22", "22"],
                ["23", "23"],
            ]],
            ["menu", "B_minute", "arrLang[lang][\"LANG_MIN\"]", "minute", [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["8", "8"],
                ["9", "9"],
                ["10", "10"],
                ["11", "11"],
                ["12", "12"],
                ["13", "13"],
                ["14", "14"],
                ["15", "15"],
                ["16", "16"],
                ["17", "17"],
                ["18", "18"],
                ["19", "19"],
                ["20", "20"],
                ["21", "21"],
                ["22", "22"],
                ["23", "23"],
                ["24", "24"],
                ["25", "25"],
                ["26", "26"],
                ["27", "27"],
                ["28", "28"],
                ["29", "29"],
                ["30", "30"],
                ["31", "31"],
                ["32", "32"],
                ["33", "33"],
                ["34", "34"],
                ["35", "35"],
                ["36", "36"],
                ["37", "37"],
                ["38", "38"],
                ["39", "39"],
                ["40", "40"],
                ["41", "41"],
                ["42", "42"],
                ["43", "43"],
                ["44", "44"],
                ["45", "45"],
                ["46", "46"],
                ["47", "47"],
                ["48", "48"],
                ["49", "49"],
                ["50", "50"],
                ["51", "51"],
                ["52", "52"],
                ["53", "53"],
                ["54", "54"],
                ["55", "55"],
                ["56", "56"],
                ["57", "57"],
                ["58", "58"],
                ["59", "59"],
            ]],
            ["submit", "Timing_Reboot_Submit"]
        ],
    }


	//Added by liangjuan
    function Device_Manage_Page_Firmware_upgrade_init() {
        const Firmware_upgrade = {
            "length": 1,
            1: [
                ["firmware_upgrade_row", "arrLang[lang][\"LANG_FIRMWARE_UPGRADE\"]"],
                ["form", "Upload_File_form", "action=\"/boaform/getASPdata/formUpload\" method=\"post\" enctype=\"multipart/form-data\" name=\"password\"", "1", , empty_action],
                ["tips", "h6", "class='tips_font'", "arrLang[lang]['LANG_PAGE_DESC_UPGRADE_FIRMWARE']"],
                ["file", "upgrade_file", "binary"],
                ["append", "<div>\
                    <table id=\"File_Upload_Submit_Table\" style=\"line-height: 50px;\">\
                        <tbody>\
                            <th height=\"20px\"></th>\
                            <tr>\
                                <td width=\"100px\">\
                                    <button type=\"button\" id=\"File_Upload_Submit\" class=\"btn btn-new-light btn-block btn-round submit\">" + L("LANG_UPGRADE") + "</button>\
                                </td>\
                                <td width=\"20px\"></td>\
                                <td width=\"100px\">\
                                    <button type=\"button\" id=\"File_Reset_Submit\"  class=\"btn btn-new-light btn-block btn-round submit\">" + L("LANG_RESET") + "</button>\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                </div>\
                <br>\
                <div class=\"progress progress-striped active\" style=\"display: none;\">\
                    <div style=\"width: 0%\" aria-valuemax=\"100\" aria-valuemin=\"0\" aria-valuenow=\"75\" role=\"progressbar\" class=\"progress-bar\">\
                        <span style=\"font-size:15px;font-weight:700;\" id=\"upgrade_rate\"></span>\
                    </div>\
                </div>"],
            ],
        }

        if (!g_page_cstmfun.CF_WEB_UPGRADE || g_page_cstmfun.CF_WEB_UPGRADE == "2" || g_page_cstmfun.CF_WEB_UPGRADE == "3") {
            Auto_Page_generate(Firmware_upgrade);
        }

        $("#File_Upload_Submit").on("click", function (e) {
            var BinaryFileName;
            var BinaryExtName;
            BinaryFileName = document.password.binary.value.substring(document.password.binary.value.lastIndexOf('\\') + 1);
            BinaryExtName = BinaryFileName.substring(BinaryFileName.lastIndexOf('.') + 1);
            if ($("#upgrade_file").get(0).files[0] == undefined)
                MyAlert(L("LANG_SELECTED_FILE_CANNOT_BE_EMPTY"));
            else if (BinaryExtName != "tar") {
                MyAlert(L("LANG_UPGRADE_FAIL_REASON_2"));
            } else {
                swal({
                    title: arrLang[lang]["LANG_PAGE_DESC_UPGRADE_CONFIRM"],
                    icon: "info",
                    buttons: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            $.ajaxSettings.async = true;
                            $(".progress-striped").show();
                            setTimeout(progress_bar_load, 0);
                            $("#Upload_File_form").submit();
                        } else {
                            swal(arrLang[lang]["LANG_CANCEL"]);
                        }
                    });
            }
        })

        $("#File_Reset_Submit").on("click", function (e) {
            $('#Upload_File_form')[0].reset();
        })
    }
  
	//End of added by liangjuan
	var flash_time_avg_need = 1600;
	
	   function progress_bar_load() {
		   rate = rate + 0.5;
		   if (rate < 100 && rate % 1 == 0) {
			   if (upgrade_state == 0 && rate > 30) {
				   rate = 30;
				   setTimeout(Upload_upgrade_file_fail_detetive, 60000);
			   }
			   $("#upgrade_rate").text(rate + "%");
			   $(".progress-bar").css("width", rate + "%");
			   if (rate < 30)
				   setTimeout(progress_bar_load, 500);
			   if (rate >= 30) {
				   if (if_device_up_then_init_gValue()) {
					   if (rate<98)
						   rate = 98;
				   }
				   setTimeout(progress_bar_load, flash_time_avg_need);
			   }
		   } else if (rate >= 100) {
			   $("#upgrade_rate").text("100%");
			   $(".progress-bar").css("width", "100%");
			   swal({
				   title: arrLang[lang]["Upgrade_Success"],
				   icon: "success",
			   })
				   .then((willDelete) => {
					   if (willDelete) window.location = "login.html";
				   });
		   } else setTimeout(progress_bar_load, 1000);
	   }
	      
    function Upload_upgrade_file_fail_detetive() {
        if (rate == 30) {
            swal({
                title: arrLang[lang]["LANG_UPLOAD_FAILED"],
                icon: "warning",
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) window.location = "login.html";
                });
        }
    }

    function reboot_count_down() {
        return start_count_down(80);
    }

    function Timing_Reboot_Page_init() {
        set_obj_data_to_html(Timing_Reboot_Page_data);
        var day = Timing_Reboot_Page_data["day"];
        var tar = $("#day_choose_table").find(".justhover");
        for (var i = 1; i < 8; i++) {
            if (day == (day | 1 << i)) {
                tar.eq(i - 1).addClass("td_select");
            } else {
                tar.eq(i - 1).removeClass("td_select");
            }
        }
    }

    function Global_Click_Monitoring() {
        $(".justhover").on("click", function () {
            $(this).toggleClass("td_select");
            if ($(this).hasClass("td_select")) {
                var value = $("input[name='day']").val();
                $("input[name='day']").val(value |= (1 << ($(this).index() + 1)));
            } else {
                var value = $("input[name='day']").val();
                $("input[name='day']").val(value &= ~(1 << ($(this).index() + 1)));
            }
        })
    }

    function empty_action() { }
    //Add by liangjuan
    Device_Manage_Page_Firmware_upgrade_init();
    //End of Add by liangjuan

    Auto_Page_generate(Device_Manage_Page);
    Timing_Reboot_Page_init();
    Global_Click_Monitoring();
		//Add by liangjuan 
		$("#set_current_config_to_default_submit_Table").hide();
		$("#cancel_current_config_to_default_submit").hide();
		$("#Upload_Config_file_toDefault_submit").hide();
		
		$("#Upload_File_form").ajaxForm(function (data) {
			FMask_init();
			if (data.indexOf("INVALID_FILE") != -1) {
				swal({
					title: arrLang[lang]["LANG_UPGRADE_FAIL_REASON_3"],
					icon: "warning",
					dangerMode: true,
				})
					.then((willDelete) => {
						if (willDelete) swal(arrLang[lang]["LANG_DEVICE_RESETTING"])
					});
			} else if (data.indexOf("FILE_TOO_LARGE") != -1) {
				swal({
					title: arrLang[lang]["LANG_UPGRADE_FAIL_REASON_1"],
					icon: "warning",
					dangerMode: true,
				})
					.then((willDelete) => {
						if (willDelete) swal(arrLang[lang]["LANG_DEVICE_RESETTING"])
					});
			} else if (data.indexOf("INCORRECT_FORMAT") != -1) {
				swal({
					title: arrLang[lang]["LANG_UPGRADE_FAIL_REASON_2"],
					icon: "warning",
					dangerMode: true,
				})
					.then((willDelete) => {
						if (willDelete) swal(arrLang[lang]["LANG_DEVICE_RESETTING"])
					});
			} else if (data.indexOf("MODEL_IMAGE_FILE_ERROR") != -1) {
				swal({
					title: arrLang[lang]["UPLOAD_MODEL_IMAGE_FILE_ERROR"],
					icon: "warning",
					dangerMode: true,
				})
					.then((willDelete) => {
						if (willDelete) swal(arrLang[lang]["LANG_DEVICE_RESETTING"])
					});
			} else if (data.indexOf("VENDOR_IMAGE_FILE_ERROR") != -1) {
				swal({
					title: arrLang[lang]["UPLOAD_VENDOR_IMAGE_FILE_ERROR"],
					icon: "warning",
					dangerMode: true,
				})
					.then((willDelete) => {
						if (willDelete) swal(arrLang[lang]["LANG_DEVICE_RESETTING"])
					});
			} else if (data.indexOf("PONLOCK_IMAGE_FILE_ERROR") != -1) {
				swal({
					title: arrLang[lang]["UPLOAD_PONLOCK_IMAGE_FILE_ERROR"],
					icon: "warning",
					dangerMode: true,
				})
					.then((willDelete) => {
						if (willDelete) swal(arrLang[lang]["LANG_DEVICE_RESETTING"])
					});
			} else if (data.indexOf("DEFAULT_IMAGE_FILE_ERROR") != -1) {
				swal({
					title: arrLang[lang]["UPLOAD_DEFAULT_IMAGE_FILE_ERROR"],
					icon: "warning",
					dangerMode: true,
				})
					.then((willDelete) => {
						if (willDelete) swal(arrLang[lang]["LANG_DEVICE_RESETTING"])
					});
			} else if (data.indexOf("UPGRADE_FLASH_START") != -1) {
				upgrade_state = 1;
				rate = 30;
				var flash_time = parseInt((parseInt(data.split(" ")[1])+80)*1000/70);
				if (flash_time > flash_time_avg_need) {
					flash_time_avg_need = flash_time;
				}
				check_device_is_up();
			}
		});
	//End of liangjuan
	}


$(document).ready(function () {
    Device_Manage_Page_init();
	FMask_init();
});
