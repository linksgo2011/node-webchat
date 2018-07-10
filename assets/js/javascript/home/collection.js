/**
 * founder : zzf
 * Creation time :  2015/2/10
 * note :
 * role :
 */
define(function( require, exports, module ) {
    var _tools = require("tools");

    _tools.setSelected({
        container : ".m-tab",
        tags : "li",
        selected : "on"
    });

    var isCompile = 1;
    $(".rt-bar").click(function(){
        if(isCompile){
            $(".m-table-view li").animate({left : "-30px"}).addClass("cell-am").one('webkitAnimationEnd', function(){
                $(".m-radio").stop().show().addClass("m-radio-am");
                return false;
            });
            $(".m-footer").show().addClass("m-footer-am");
            isCompile = 0;
        }else{
            $(".m-table-view li").animate({left : "0px"});
            $(".m-footer").removeClass("m-footer-am");
            $(".m-radio").removeClass("m-radio-am").one('webkitAnimationEnd', function(){
               $(this).hide();
               $(".m-table-view li").removeClass("cell-am");
            });
            isCompile = 1;
        }
        return false;
    });



});