define(function(require, exports, module){
    $(function() {
        $('.tabs').on('click', 'li', function(e) {
            e.preventDefault();
            $(this).addClass('on').siblings().removeClass('on');
            $('.targets').children().eq($(this).index()).removeClass('m-hide').siblings().addClass('m-hide');
            $('.m-footer .m-btn').eq($(this).index()).removeClass('m-hide').siblings().addClass('m-hide');
        });

        $('.m-footer').on('click', 'span', function(){
            $('.m-message').removeClass('m-animate-hide');
        });

    });
});