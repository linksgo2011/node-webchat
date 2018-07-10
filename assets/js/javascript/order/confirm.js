define(function(require, exports, module) {
    $(function() {
        $('.m-input-date').on('change', 'input', function() {
            var date = $(this).val();
            $(this).prev('.current').text(date);
        });

        $('.m-actionsheet').on('click', 'li', function(e) {
            e.preventDefault();
            var text = $.trim($(this).find('a').text());
            if (text.indexOf('取消') >= 0) {
                return;
            }
            $('#deliveryMethod .text').text(text);
        });

        //页面切换效果
        $('.transition-btn').on('click', function() {
            $($(this).attr('elem')).addClass('show');
            // $( '.transition-content' ).css( 'display' , 'block' );
        });

        $('.transition-close').on('click', function() {
            $($(this).attr('elem')).removeClass('show');
            // setTimeout(function(){
            //  // $( '.transition-content' ).css( 'display' , 'none' );
            // },300);

        });
    });
});