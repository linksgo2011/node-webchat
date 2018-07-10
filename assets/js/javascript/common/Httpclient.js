/**
 * founder : zzf
 * Creation time :  2015/3/4
 */

define(function( require, exports, module ) {
    var Alert = require('alert');

    var HTTP = (function(){
        var config = {
            time : 2000,
            url : "",
            data : [],
            isasync : true,
            dataType : "json",
            type : "GET",
            retry : 3
        };

        var methods = {
            start : function(o){
                var cfig = {
                    page : 0,
                    id : null
                };

                var http = function(){
                    $.ajax({
                        type : o.type ? o.type : o.type,
                        url : config.url + o.url,
                        async : o.async ?  o.async : config.isasync,
                        data : o.data,
                        dataType : o.dataType ? o.dataType : config.dataType,
                        error : function(){
                            cfig.page += 1;
                            if(cfig.page <= config.retry){
                                http();
                            }else{
                                methods.showmsg();
                                config.data.splice((cfig.id - 1), 1);
                            }
                        },
                        success : function(data){
                            o.success(data);
                        }
                    });
                };
                http();
            },
            showmsg : function(){
                Alert.show("亲~数据请求异常请稍后在试哟~");
            }
        };


        //启动方法
        this.send = function(o){
            var http = new methods.start(o);
            var index = config.data.push(http);
        };
        //获取属性
        this.get = function(key){
            if(! key){return false;}
            for(i in config){
                if(i === key){
                    return config[i];
                }
            }
            return false;
        };
        //设置属性
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


        return this;
    })();

    return HTTP;
});

