define(function(require, exports, module){
    $(function() {
        var pageStat = $('.page-contrl .page');
        var pages = $('.swiper-wrapper div').length;
        pageStat.text('1' + '/' + pages);
        var mySwiper = new Swiper('.slider', {
            // pagination: '.pagination',
            loop: true,
            // grabCursor: true,
            autoplay: 5000,
            onSlideChangeEnd: function(swiper) {
                    $('.page-contrl .page').text((swiper.activeLoopIndex + 1) + '/' + pages);
                    // console.log(swiper);
                }
                // paginationClickable: true
        });

        $('.tabs').on('click', 'li', function(e) {
            e.preventDefault();
            $(this).addClass('on').siblings().removeClass('on');
            $('.targets').children().eq($(this).index()).removeClass('m-hide').siblings().addClass('m-hide');
        });

        $('.area').on('click', '.m-btn:not(.disable)', function() {
            $(this).addClass('on').siblings().removeClass('on');
        });

        $('.m-input-number').on('click', 'span', function() {
            var isAdd = $(this).hasClass('add');
            var input = $(this).siblings('input');
            var current = +input.val();
            current = isAdd ? current + 1 : current - 1;
            current = current <= 1 ? 1 : current;
            input.val(current);
        });
    });
})