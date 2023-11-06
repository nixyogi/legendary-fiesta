
/*Added by liangjuan for mission#22467*/
function wlan_site_survey(){
    var SITE_PAGE = {
        "length": 1,
        1: [
            ["wlan_site_intf_row", "arrLang[lang]['WLAN Site Survey']", "2"],
            ["append", "<div id='wlan_site_intf_t'></div>"],
            ["button", "WLAN_SITE_REFRESH", "arrLang[lang]['LANG_REFRESH']", "btn-info"]
        ]
    };
    Auto_Page_generate(SITE_PAGE);
    var data = getASPdata("wlSiteSurvey_parm");
    var obj = get_nest_data_obj(data);
	  console.log(data);
	  console.log(obj);
    var table_obj = {
        direction: 0,
        selector: $("#wlan_site_intf_t"),
        header: [L("SSID-Name"), L("SdBm"), L("LANG_CHANNEL"), L("LANG_FLAG"), "BSSID"],
        contain: ["ssidname", "SdBm",  "channel", "flag", "BSSID"],
        origin: obj,
        origin_key_word: "wlan_info",
    };
    table_generate(table_obj);

    
	$("#wlan_info_table").bootstrapTable({
		pagination: true, 
		pageSize: 10,
		paginationLoop: false,
		showloading: false,
		formatShowingRows:function(pageFrom, pageTo, totalRows)
		{
			return pageFrom+"-"+pageTo+L("LANG_TO")+totalRows+"";
		},
		formatRecordsPerPage:function(pageNumber)
		{
			return pageNumber+L("LANG_PER_PAGE");
		}
	});
  
  	$("#WLAN_SITE_REFRESH").on("click", function () {
		$("#wlan_site_intf_row").remove();
    	wlan_site_survey();
    });
}

$(document.ready).ready(function () {
	if (!g_page_attr.no_wlan) {
		  wlan_site_survey();
    }
});
	//End of mission#22467