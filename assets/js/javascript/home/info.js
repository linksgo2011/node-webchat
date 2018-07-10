/**
 * founder : zzf
 * Creation time :  2015/2/28
 * note :
 * role :
 */
define(function( require, exports, module ) {
    var Alert = require('alert');
    var Validate = require('validate');
    var Tools = require('tools');

    window.URL = window.URL || window.webkitURL;
    var methods = {
        setimg : function(file, fun){
            var files = file.files,
                img = new Image();
            img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
            img.onload = function(e) {
                window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
                fun(img);
            }
        }
    };

    //修改头像
    $(".user-info input").change(function(){
        var view = $(this);
        methods.setimg(this, function(img){
            view.parent().find("img").remove();
            img.width = 28;
            img.height = 28;
            view.nextAll("h3").after(img);
        });
    });

    //修改姓名
    $(".user-name-save").click(function(){
        new Validate({view : "#user-name", alerts : Alert}, function(){
            Alert.show("验证成功");
        });
        return false;
    });

    //修改电话
    $(".user-phone-save").click(function(){
        new Validate({view : "#user-phone", alerts : Alert}, function(){
            Alert.show("验证成功");
        });
        return false;
    });
    $(".user-phone-reg").click(function(){
        new Tools.securitycode(this);
        return false;
    });

    //认证
    $(".user-upload-save").click(function(){
        new Validate({view : "#user-upload", alerts : Alert}, function(){
            Alert.show("验证成功");
        });
        return false;
    });
    $(".images input").change(function(){
        var showview = $(this).prevAll(".img");
        methods.setimg(this, function(img){
            showview.append(img);
        });
    });
});