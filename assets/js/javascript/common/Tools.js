/**
 *  jinrun
 *  2014-05-22
 *  工具类
 */
define( 'tools', function( require, exports ) {
    var Tools = (function () {

        var self = this;

        /**
         * 设置选中状态class
         * _view  :  最外面容器类名
         * _aView ： 需要绑定的标签
         * _show  ： 需要显示的类名
         */
        this.setSelected = function (obj) {

            var Selected = function (data) {
                var $container, $tags;

                var config = {
                    type: 'click',//事件监听类型
                    container: "",//父窗口容器
                    tags: "",//绑定事件标签
                    selected: "act",//设置选中class
                    disabledClass: 'disabled',//禁用切换class名
                    cllback: function () {
                    }//事件操作回调
                };

                var methods = {
                    setIndex: function (is) {
                        if (is.hasClass(config.disabledClass) || is.hasClass(config.selected)) {
                            return false;
                        }
                        ;
                        $container.find(config.tags).removeClass(config.selected);
                        is.addClass(config.selected);
                        if (typeof(is.index()) != 'undefined') {
                            config.cllback(is.index(), is);
                        }
                        ;
                    }
                };

                $.extend(config, data);
                $container = $(config.container);
                $tags = $container.find(config.tags);
                $tags.on(config.type, function (event) {
                    if ($tags.is('a')) {
                        if (event && event.preventDefault) {
                            event.preventDefault();
                        }
                    }

                    if ($(this).hasClass(config.disabledClass)) {
                        return;
                    }

                    methods.setIndex($(this));
                });
                this.setIndex = function (index) {
                    if ($tags.eq(index)) {
                        methods.setIndex($tags.eq(index));
                    }
                };

                return this;
            };
            return new Selected(obj);
        };

        /**
         * 短信接收时间倒计时
         * @param view
         */
        this.securitycode = function(view){
            var time = 60;
            var btn = $(view);
            btn.addClass("gray-btn");
            var date = setInterval(function(){
                if(0 >= time){
                    clearInterval(date);
                    btn.html("获取验证码");
                    time = 60;
                    btn.removeClass("gray-btn");
                    return false;
                };
                btn.html(time+"s重新获取");
                time --;
            }, 1000);
        };
        
        
        /**
         * 解析url方法
         * 参数
         *        paras  必填    解析url参数的 键   key
         *        _url   选填    此参数有解析当前参数，无解析当前页面url
         * 返回：
         *        paras 这个key对应的值
         * 方法：
         *        无
         *
         */
        this.request = function (paras, _url) {
            var url = "";
            if (_url) {
                url = _url;
            } else {
                url = location.href;
            };
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
            var paraObj = {};
            for (var i = 0; j = paraString[i]; i++) {
                paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
            }
            var returnValue = paraObj[paras.toLowerCase()];
            if (typeof(returnValue) == "undefined") {
                return "";
            } else {
                return returnValue;
            }
        };
        
        //滚动加载事件
        this.loadmore = function( target, options ){
            this.target = target;
            this.isRequestData = false;
            this.opt = {
                loadwrap:'#list-loading',
                loading:function( target ){}
            };
            
            $.extend( this.opt, options );
            
            this.bind();
        }
        loadmore.prototype = {
            //绑定浏览器滚动事件
            bind:function(){
                var _this = this , _target = _this.target;
                $( '.m-page' ).scroll(function(){
                        
                    var scrollBottom = $('.m-page-content').height() - $( '.m-page' ).height() - $( '.m-page' ).scrollTop();
                    if( scrollBottom <= 20 && !_this.isRequestData){

                        _this.isRequestData = true;
                        $( _this.opt.loadwrap ).css( 'display' , 'block' );
                        var time = setTimeout(function(){
                        	_this.opt.loading( _target );
                        	clearTimeout(time);
                        }, 1000);
                    }
                });
            },
            colseLoding : function(){
            	$( this.opt.loadwrap ).css( 'display' , 'none' );
                this.isRequestData = false;
            }
        };

        return this;
    })();

	return Tools;
});	


