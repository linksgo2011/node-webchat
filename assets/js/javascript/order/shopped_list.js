define(function(require, exports, module){

    $(function(){
        $('.m-tab').on('click', 'li', function(e){
            e.preventDefault();
            $(this).addClass('on').siblings().removeClass('on');
            var status = $(this).data('status');
            if(status == ''){
                $('.m-table-view').show();
                return;
            }
            $('.m-table-view[data-status='+status+']').show().siblings('.m-table-view').hide();
        });            
    });

});