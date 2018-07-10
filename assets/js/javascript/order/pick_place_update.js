define(function(require, exports, module) {
    var _Mcity = require('mcity'); //城市信息

    $(function() {
        $('.m-city').on('click', function() {
            new _Mcity(this, {});
        });

        //页面切换效果
        $('.transition-btn').on('click', function() {
            $($(this).attr('elem')).addClass('show');
        });

        $('.transition-close').on('click', function() {
            $($(this).attr('elem')).removeClass('show');
        });

    });

});