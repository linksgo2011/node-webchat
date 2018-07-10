define(function(require, exports, module){
    $('.shop-name').on('change', ':checkbox',function(){
        var checked = $(this).is(':checked');
        $(this).closest('li').nextAll().find(':checkbox').prop('checked', checked);
        update();
    });

    $('.cell-extend-pic').on('change', ':checkbox',function(){
        var checked = $(this).is(':checked');
        if(!checked){
            $(this).closest('li').siblings('.cell-basic').find(':checkbox').prop('checked', checked);
        }
        update();
    });

    $('.cell-extend-pic').on('change', '.m-input',function(){
        var num = $.trim($(this).val());
        if(!/^[1-9]\d*$/.test(num)){
            $(this).val(1);
        }
        update();
    });

    $('.cell-extend-pic').on('click', '.remove', function(){
        var remove = confirm('确定要删除该商品吗？');
        if(remove){
            var lis = $(this).closest('li');
            if(lis.siblings().length <= 1){
                $(this).closest('.m-table-view').remove();
            }else{
                lis.remove();
            }
        }
        update();
    });

    function update(){
        var total = 0;
        $('.m-table-view .cell-extend-pic :checked').each(function(){
            var cell = $(this).closest('li');
            var num = $.trim(cell.find('.m-input').val());
            var price = $.trim(cell.find('.text .price').text());
            
            total += num * price;
        });
        $('.m-footer .total em').text(total.toFixed(2));
    }
})