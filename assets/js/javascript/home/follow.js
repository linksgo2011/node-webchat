/**
 * founder : zzf
 * Creation time :  2015/2/10
 * note :
 * role :
 */
define(function( require, exports, module ) {
    var Alert = require('alert');

    var methods = {
        startAm : function(view){
            $(".m-table-view input.text").css({"right" : "15px"});
            $(".m-table-view input.text").addClass("text-am");
            $("span.icon-more").addClass("icon-more-am");
            $(view).html("取消");
            $(".btn-success").addClass("btn-success-am").one('webkitAnimationEnd', function(){
                $(this).hide();
                $(".btn-danger").css("display", "inline-block").addClass("btn-danger-am");
            });
        },
        overAm : function(view){
            $(".m-table-view input.text").removeClass("text-am").one('webkitAnimationEnd', function(){
                $(this).css({"right" : "-20px"});
            });
            $("span.icon-more").removeClass("icon-more-am");
            $(view).html("编辑");
            $(".btn-danger").removeClass("btn-danger-am").one('webkitAnimationEnd', function(){
                $(this).hide();
                $(".btn-success").css("display", "inline-block").removeClass("btn-success-am");
            });
        }
    };

    var isCompile = 1;
    $(".m-header .rt-bar").click(function(){
        if(isCompile){
            methods.startAm(this);
            isCompile = 0;
        }else{
            methods.overAm(this);
            isCompile = 1;
        }
        return false;
    });


    $(".btn-danger").click(function(){
        $("[name='ceshi']").each(function(){
            if($(this).attr("checked")){
                $(this).parent().parent().remove();
            };
        });
        Alert.show("删除成功");
        return false;
    });
});