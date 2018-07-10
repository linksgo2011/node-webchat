/**
 * founder : zzf
 * Creation time :  2015/2/25
 * note :
 * role :
 */

define(function( require, exports, module ) {

    var config = {
        time : 2000,//定时关闭
        x : 0,//位置x坐标
        y : 0,//位置y坐标
        z : 0,//位置z深度
        width : 300,//提示框宽度
        height : 150,//提示框高度
        view : null
    };

    exports.init = (function(){
        config.view = $('<div class="m-message m-hide" />').append($('<span class="text" />')).appendTo($('body'));
    })();

    exports.get = function(key){
        if(! key){return false;}
        for(i in config){
            if(i === key){
                return config[i];
            }
        }
        return false;
    };

    exports.set = function(object){
        // if("object" !== typeof(Object)){return false;}
        // var isSucceed = false;
        // for(i in config){
        //     for(k in Object){
        //         if(i === k){
        //             config[i] = Object[k];
        //             isSucceed = true;
        //         }
        //     }
        // }
        // return isSucceed;

        if(!$.isPlainObject(object)){
            return;
        }

        $.extend(config, object);
        return true;
    };

    exports.show = function(txt){
        txt = txt || '';
        config.view.find("span").html(txt);
        config.view.removeClass("m-hide");
        var Time = setTimeout(function(){
            clearTimeout(Time);
            config.view.addClass("m-hide");
        }, config.time);
    }

});