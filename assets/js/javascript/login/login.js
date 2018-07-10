/**
 * founder : zzf
 * Creation time :  2015/2/25
 * note :
 * role :
 */

define(function( require, exports, module ) {
    var Alert = require('alert');
    var Validate = require('validate');
    var Tools = require('tools');
    var HTTP = require('http');

    //登录
    $(".login-btn").click(function(){
        new Validate({view : "#login", alerts : Alert}, function(){
            Alert.show("验证成功");
        });
        //console.log(HTTP);
        HTTP.send({
            url : "../js/javascript/login/ceshi.json",
            type : "GET",
            success : function(data){
                console.log(data);
            }
        });
        return false;
    });

    //个人用户注册
    var registerCat = 0;
    $(".m-tab li").click(function(){
        registerCat = $(this).index();
        $(".m-tab .on").removeClass("on");
        $(this).addClass("on");
        $(".m-form").hide();
        $(".m-form").eq(registerCat).show();
    });
    var validate = null;
    $(".reg-next-1").click(function(){
        var isSucceed = false;
        if(! registerCat){
            validate = new Validate({view : "#user-reg", alerts : Alert}, function(){
                Alert.show("验证成功");
                isSucceed = true;
            });
        }else{
            validate = new Validate({view : "#firm-reg", alerts : Alert}, function(){
                Alert.show("验证成功");
                isSucceed = true;
            });
        };
        if(! isSucceed){
            return false;
        }
    });
    $(".firm-reg-code").click(function(){
        new Tools.securitycode(this);
        return false;
    });
    $(".firm-reg-reg").click(function(){
        new Tools.securitycode(this);
        return false;
    });

    //用户信息
    $(".reg-name-btn").click(function(){
        new Validate({view : "#reg-name", alerts : Alert}, function(){
            Alert.show("验证成功");
        });
        return false;
    });


    //找回密码-用户名
    $(".found-btn-1").click(function(){
        var isSucceed = false;
        new Validate({view : "#found-view", alerts : Alert}, function(){
            Alert.show("验证成功");
            isSucceed = true;
        });
        if(! isSucceed){
            return false;
        }
    });
    //找回密码-用户验证
    $(".found-btn-2").click(function(){
        var isSucceed = false;
        new Validate({view : "#found-view-1", alerts : Alert}, function(){
            Alert.show("验证成功");
            isSucceed = true;
        });
        if(! isSucceed){
            return false;
        }
    });
    $(".found-pas-code").click(function(){
        new Tools.securitycode(this);
        return false;
    });
    //找回密码-重置密码
    $(".found-btn-3").click(function(){
        new Validate({view : "#found-view-2", alerts : Alert}, function(){
            Alert.show("验证成功");
        });
        return false;
    });
});
