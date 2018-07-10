/*
	地区选择
*/

define( 'mcity', function( require, exports ) {

	var mcity = function( target, options ) {
		this.target = target;
		this.parentId = 0; //城市id
		this.text = '';
		this.opt = {
			ajaxurl:'http://manweb.dili7.com/city/getCountryJsonpList.do' //ajax 请求地址
		};
		
		$.extend( this.opt, options );
		
		this.init();
	};

	mcity.prototype = {
		// 初始请求
		init:function(){

			this.cityAjax();
			
		},
		// ajax 请求
		cityAjax:function(){

			var _this = this;

			var _html = '<ul class="m-table-view" >';

			$.ajax({
				type : 'GET',
				url : _this.opt.ajaxurl + '?parentId=' + _this.parentId,
				dataType : 'jsonp',
				success : function(data){
					
					if( data == null || data == '' ){
						_this.text = '';
						return;
					}

					$.each( data , function( i ){
						_html += '<li parentId="' + data[i].regionId+ '" class="cell acc-icon s-city-data"><span class="title">' + data[i].regionName + '</span></li>';
					});

					_html += '</ul>';

					$( '.f-province' ).html( _html );

					// 继续查询下级城市
					$( '.s-city-data' ).bind( 'click' , function(){ 
						_this.text += $( this ).text();
						_this.parentId = $( this ).attr( 'parentId' );
						_this.cityAjax();
						_this.setValue( _this.parentId , _this.text );
					});
				},

				error : function(error){
					
				}
			});	
		},
		//设置值
		setValue:function( id , value ){
			var _this = this;
			$( _this.target ).text( value );
			if( $( _this.target ).find( 'input' ).length < 1 ){
				$( _this.target ).append( '<input type="hidden" name="originMinId" value="'+id+'"/>' );
			}else{
				$( _this.target ).find( 'input' ).value( id );
			}
		}
	}


	return mcity;

});