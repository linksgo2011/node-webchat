/*! dili 2015-07-01 */
var pub_url="http://static.dili7.com/static/newStatic/common/js/",sea_url="http://10.28.2.204:10086/pnrwap/js/javascript/",_version=window.GLOBAL&&window.GLOBAL.version?window.GLOBAL.version:"?"+(new Date).getTime();seajs.config({alias:{base:pub_url+"base/base.js",domsearch:pub_url+"ui/domsearch.js",underscore:pub_url+"plugin/underscore/underscore-min.js",swipe:sea_url+"common/swipe.js",tools:sea_url+"common/Tools.js",alert:sea_url+"common/Alert.js",validate:sea_url+"common/Validate.js",datepicker:sea_url+"common/datepicker.js",mcity:sea_url+"common/mcity.js",highcharts:pub_url+"plugin/highcharts.js",imguploader:pub_url+"ui/imguploader.js",http:sea_url+"common/Httpclient.js"},map:[[/^(.*\.(?:css|js))(?:.*)$/i,"$1"+_version]],debug:!1,charset:"utf-8"}),seajs.data.debug&&(this.console={log:function(){}}),window.confirm=function(a){var b=document.createElement("IFRAME");b.setAttribute("src","data:text/plain,"),document.documentElement.appendChild(b);var c=window.frames[0].window.confirm(a);return b.parentNode.removeChild(b),c};