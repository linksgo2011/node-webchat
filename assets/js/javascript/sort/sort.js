/**
 * founder : zzf
 * Creation time :  2015/2/6
 * note :
 * role :
 */
define(function( require, exports, module ) {
    var _tools = require("tools");

    _tools.setSelected({
        container : ".sort-left",
        tags : "li",
        selected : "on"
    });

    $(".sort-right p").click(function(){
        var view = $(this).parent();
        if(view.hasClass("on")){
            view.removeClass("on");
        }else{
            view.addClass("on");
        }
    });
});