/**
 * founder : zzf
 * Creation time :  2015/2/25
 * note :
 * role :
 */

define(function( require, exports, module ) {
     var Validate = function(arges, fun){
        var config = {
            data : [],//数据源
            view : null,
            alerts : null
        };
        var self = this;
        var regulars = {
            "username" : {
                tip : "请填写正确用户名格式,4-20位中英文或数字",
                regular : /[a-z0-9\u4E00-\u9FFF]{4,20}/
            },
            "password" : {
                tip : "请填写正确密码格式,6-20位字母或数字",
                regular : /^[0-9a-zA-Z]{6,20}$/
            },
            phone : {
                tip : "请输入正确的手机号",
                regular : /^(13|15|18|17|14)[0-9]{9}$/
            },
            code : {
                tip : "请填写验证码",
                regular : /\S/
            },
            zh_cn : {
                tip : "名字不超过10个汉字或20个英文字符",
                regular : /([\u4E00-\u9FA5]{1,10})|([A-Za-z]{1,20})/
            },
            identitycard : {
                tip : "请填写正确的身份证号码",
                regular : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
            }
        }

        var method = {
            serialize : function(){
                $.extend(config, arges);
                var val = $(config.view).serializeArray();
                for(i in val){
                    var aval = val[i];
                    var obj = $('[name='+val[i].name+']');
                    var rel = method.isreg(obj.attr("regular"));
                    if("object" === typeof(rel)){
                        rel["value"] = aval.value;
                    };
                    config.data.push(rel);
                };
                this.send();
            },
            isreg : function(str){
                if(! str){return null;}
                for(i in regulars){
                    if(i === str){
                        return regulars[i];
                    }
                };
                return null;
            },
            parse : function(){

            },
            send : function(){
                for(j in config.data){
                    var adata = config.data[j];
                    if(adata.value) {
                        if ((!adata.regular) || (!adata.regular.test(adata.value))) {
                            method.alert(adata.tip);
                            return false;
                        }
                    }else{
                        method.alert("请完善表单信息！");
                        return false;
                    };
                }
                fun();
            },
            alert : function(txt){
                if(config.alerts){
                    config.alerts.show(txt);
                }else{
                    alert(txt);
                }
            }
        };

        this.get = function(key){
            if(! key){return false;}
            for(i in config){
                if(i === key){
                    return config[i];
                }
            }
            return false;
        };

        this.set = function(Object){
            if("object" !== typeof(Object)){return false;}
            var isSucceed = false;
            for(i in config){
                for(k in Object){
                    if(i === k){
                        config[i] = Object[k];
                        isSucceed = true;
                    }
                }
            }
            return isSucceed;
        };

        method.serialize();

        return this;
    };
    return Validate;
});

