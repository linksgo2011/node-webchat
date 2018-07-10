define(function( require, exports, module ) {
/*
	引入包
*/

var _Mcity = require( 'mcity' ); //城市信息

require( 'datepicker' ); // 日历


$(function(){

	/*日期选择*/

	$( '.m-input-date' ).datepicker({
        todayHighlight: true,
        autoclose: true,
        todayHighlight:true
    });

	/*
		商品产地数据读取
	*/

	$( '.m-city' ).on( 'click' ,function(){
		new _Mcity( this , {});
	});

	//添加代购商品
	var g_num = 1;

	$( '#add-more' ).on( 'click' ,function(){
		_html = $('<ul class="m-table-view">\
			<li class="cell">\
				<span class="title group-title">代购商品'+ (++g_num) +'</span><span class="remove-icon"></span>\
			</li>\
			<li class="cell">\
				<span class="title">商品名称<input type="text" class="m-input" placeholder="请输入商品名称"></span>\
			</li>\
			<li class="cell">\
				<span class="title">代购总量<input type="number" class="m-input" value="1000"></span>\
				<span class="m-select">\
                    <span class="select-text">公斤</span>\
                    <select>\
                        <option value="0" selected="selected">公斤</option>\
                        <option value="1">斤</option>\
                        <option value="2">顿</option>\
                        <option value="3">盒</option>\
                        <option value="4">袋</option>\
                    </select>\
                </span>\
			</li>\
			<li class="cell">\
				<span class="title">代购单价<input type="number" class="m-input"></span>\
				<span class="text">(元/公斤)</span>\
			</li>\
			<li class="cell acc-icon">\
				<span class="title">商品产地</span><span class="text transition-btn m-city" elem="#filter-area">请选择</span>\
			</li>\
			<li class="cell acc-icon">\
				<span class="title">截止时间</span>\
				<span class="text"><input type="text" class="m-input m-input-date" readonly placeholder="选择时间" data-date-format="yyyy-mm-dd" data-date-start-date="Date.default"></span>\
			</li>\
		</ul>');

		_html.insertBefore( $( this ).parent() );

		// 删除
		$( '.remove-icon' ).on( 'click' ,function(){
			$( this ).parents( '.m-table-view' ).remove();
		});

		// 日期选择
		$( '.m-input-date' ).datepicker({
	        todayHighlight: true,
	        autoclose: true,
	        todayHighlight:true
	    });
		// select 交互
	    $( '.m-select select' ).on('change',function(){
			$( this ).parent().find( '.select-text' ).text( $( this ).find( 'option:selected' ).text() );
		});

	    //商品产地数据读取

	    $( '.m-city' ).on( 'click' ,function(){
			new _Mcity( this, {});
		});

	    //页面切换效果
		$( '.transition-btn' ).on( 'click' , function(){
			$( $( this ).attr( 'elem' ) ).addClass( 'show' ); 
			// $( '.transition-content' ).css( 'display' , 'block' );
		});

		$( '.transition-close' ).on( 'click' , function(){
			$( $( this ).attr( 'elem' ) ).removeClass( 'show' );
			
		});
	    
	});

});


});
