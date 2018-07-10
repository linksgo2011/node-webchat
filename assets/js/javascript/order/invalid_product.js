define(function(require, exports, module){

    $(function(){
        $('.rt-bar').on('click', function(e){
            var clear = confirm('确定要清空失效商品吗？');
            if(clear){
                $('.m-table-view').empty();
                $(this).hide();
            }
            e.preventDefault();
        });   
    });

});