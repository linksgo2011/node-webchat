/**
 * 页面模块加载配置
 *
 */
//var pub_url = 'http://10.28.2.35:222/common/js/',
//	sea_url = 'http://10.28.2.35:777/js/javascript/';
	
var pub_url = 'http://static.nong12.com/static/newStatic/common/js/',
	sea_url = 'http://wx.nong12.com/js/javascript/';

// var pub_url = 'http://static.dili7.com/static/newStatic/common/js/',
// 	sea_url = 'http://static.dili7.com/static/newStatic/pnrwap/js/javascript/';

var _version = window.GLOBAL && window.GLOBAL.version ?  window.GLOBAL.version : '?'+( new Date() ).getTime(); //版本号

seajs.config({
	alias: {
        'jquery'                :'/js/javascript/common/jquery-2.1.3.min',
		'base'	                : pub_url +'base/base.js',
        'domsearch'				: pub_url +'ui/domsearch.js',
        'underscore' 			: pub_url +'plugin/underscore/underscore-min.js',
        'swipe' 				: sea_url +'common/swipe.js',
        'tools'                 : sea_url +'common/Tools.js',
        'alert'                 : sea_url +'common/Alert.js',
        'validate'              : sea_url +'common/Validate.js',
        'datepicker'			: sea_url +'common/datepicker.js',
        'mcity'					: sea_url +'common/mcity.js',
        'highcharts' 			: pub_url +'plugin/highcharts.js',
        'imguploader' 			: pub_url +'ui/imguploader.js',
        'http' 			        : sea_url +'common/Httpclient.js',
        'regs'                  : sea_url +'common/regs.js',
        'vercode'                  : sea_url +'common/vercode.js',
	},
	map: [
	    [ /^(.*\.(?:css|js))(?:.*)$/i, '$1'+_version ]
	],
	debug: false,
	charset: 'utf-8'
});

//开启关闭调试输出

if(seajs.data.debug){
    this.console = {
        log : function(){}
    };
};


window.confirm = function(message){ //去除IOS UIAlertView 弹出框链接地址
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    var rtn = window.frames[0].window.confirm(message);
    iframe.parentNode.removeChild(iframe);
    return rtn;
};