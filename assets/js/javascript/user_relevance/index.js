/**
 * 账户关联
 */
define(function(require, exports, module) {
    var Alert = require('alert');
    var Validate = require('validate');
    var Tools = require('tools');
    var Http = require('http');
    var Regs = require('regs');
    var VerCode = require('vercode');
    var container = null;

    /**
     * 表单序列化
     * @return {[type]} [description]
     */
    $.fn.serializeJson = function() {
        var serializeObj = {};
        $(this.serializeArray()).each(function() {
            serializeObj[this.name] = this.value;
        });
        return serializeObj;
    };

    /**
     * 标签页
     */
    var tabIndex = {
        init: function($ele) {
            $ele.on('click', ".head p:not(.on)", function(event) {
                $(".relevance-form", $ele).addClass('m-hide').filter('.' + $(this).attr('data-tarte')).removeClass('m-hide');
                $(this).addClass('on').siblings().removeClass('on');
            });
        }
    };

    function checkPhoneIsExist(phone) { //检查手机号是否已存在
        Http.send({
            url: "/User/checkMobile",
            type: "POST",
            data: {
                "module": "user",
                "method": "checkMobile",
                params: {
                    mobile: phone
                }
            },
            success: function(response) {
                if (response.checkFlag != 1) {
                    Alert.show("你的手机号已被注册！");
                } else {
                    sendVerCode(phone); //用户不存在，发送验证码
                }
            }
        });
    }

    function sendVerCode(phone) { //发送验证码，到指定手机号
        Http.send({
            url: "/user/sendAuthCode",
            type: "POST",
            data: {
                "module": "user",
                "method": "sendAuthCode",
                params: {
                    mobile: phone,
                    msgType: 2
                }
            },
            success: function(response) {
                if (response.sendCode == 2) {
                    Alert.show("获取失败，请核对电话号码或者重试！");
                    VerCode.sendCode(container.find('.firm-reg-reg')); //发送失败，显示60s倒计时
                } else if (response.sendCode == 1) {
                    Alert.show("发送成功，请填写验证码");
                    VerCode.sendCode(container.find('.firm-reg-reg')); //发送成功，显示60s倒计时
                } else {
                    VerCode.resetCode(container.find('.firm-reg-reg'));
                    Alert.show("发送异常，请重试！");
                    return;
                }
            }
        });
    }

    //校验手机号及验证码是否匹配
    function checkVerCode(phone, code, callback) {
        Http.send({
            url: "/User/checkAuthCode",
            type: "POST",
            data: {
                "module": "user",
                "method": "checkAuthCode",
                params: {
                    mobile: phone,
                    veriCode: code,
                    msgType: 2
                }
            },
            success: function(response) {
                if (response.checkFlag != 1) {
                    Alert.show("验证码错误或已失效！");
                    VerCode.resetCode(container.find('.firm-reg-reg'));
                    return;
                }
                if (callback) {
                    callback(response);
                }
            }
        });
    }

    /**
     * 主逻辑
     * @type {Object}
     */
    var Relevance = {
        direct: function(user) {
            if (!user || !user.user_id) {
                Alert.show("跳转错误");
            }
            if (!_global.target_url) {
                return;
            }
            var target_url = decodeURIComponent(_global.target_url);
            if (target_url.indexOf("?") === -1) {
                target_url += ("?user_id=" + user.user_id);
            } else {
                target_url += ("&user_id=" + user.user_id);
            }
            target_url = encodeURIComponent(target_url);
            window.location.href = "/UserRelevance/succss?target_url=" + target_url + "&user_id=" + user.user_id;
        },
        login_bind: function(event) {
            new Validate({
                view: "#login",
                alerts: Alert
            }, function() {
                var form_data = $("#login").serializeJson();
                form_data.open_id = _global.open_id;
                $.post('/UserRelevance/login_bind', form_data, function(res, textStatus, xhr) {
                    if (res.result) {
                        Alert.show("绑定成功,正在跳转");
                        Relevance.direct(res.data);
                    } else {
                        Alert.show(res.msg);
                    }
                });
            });
            event.preventDefault();
        },

        /**
         * 注册绑定
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        reg_bind: function(event) {
            console.log(1);
            new Validate({
                view: "#register",
                alerts: Alert
            }, function() {
                var phone = $("#register input[name='username']").val();
                var code = $("#register input[name='code']").val();
                checkVerCode(phone, code, function(response) {
                    var form_data = $("#register").serializeJson();
                    form_data.open_id = _global.open_id;
                    $.post('/UserRelevance/register_bind', form_data, function(res, textStatus, xhr) {
                        if (res.result) {
                            Alert.show("绑定成功,正在跳转");
                            Relevance.direct(res.data);
                        } else {
                            Alert.show(res.msg);
                        }
                    });
                });
            });
            event.preventDefault();
        },

        initialize: function() {
            container = $("#relevance");
            // 登陆绑定
            $("#login .login-bind").click(this.login_bind);

            // 发送验证码
            $("#register .firm-reg-reg").click(function() {
                if ($(this).hasClass("gray-btn")) {
                    return false;
                }
                var phone = $.trim($("#register input[name='username']").val());
                if (!Regs.phone.test(phone)) {
                    Alert.show("手机号为空或者不正确！");
                    return;
                }
                checkPhoneIsExist(phone);
            });
            $("#register .reg-bind").click(this.reg_bind);
        }
    };

    $(function() {
        tabIndex.init($(".relevance-bound"));
        Relevance.initialize();
    });
});