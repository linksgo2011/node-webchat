define(function( require, exports, module ) {


	/*
		引用包
	*/
	var _Domsearch = require( 'domsearch' );


	// 数组去重
	Array.prototype.unique = function() {
		var res = [], hash = {};
	    for(var i=0, elem; (elem = this[i]) != null; i++)  {
			if (!hash[elem])
			{
				res.push(elem);
				hash[elem] = true;
			}
	    }
		return res;
	}


	//html5本地存储
	var storage = window.localStorage;

	$( function(){


		// 获取本地存储的数据
		var  storageData = [];

		if( storage.searchStorage !== undefined ){

			storageData = storage.searchStorage;

			if( storageData.indexOf(',') > 0 ){
				storageData = storage.searchStorage.split( ',' );

				storageData = storageData.unique();

				for(var i = 0; i < storageData.length; i++ ){
				  //key(i)获得相应的键，再用getItem()方法获得对应的值
				 	$( '.search-list ul' ).append( '<li class="cell"><span class="title"><i class="m-icon icon-history"></i>'+storageData[i]+'</span></li>' );
				}
			}else{
				storageData = new Array( storageData );
				$( '.search-list ul' ).append( '<li class="cell"><span class="title"><i class="m-icon icon-history"></i>'+storageData+'</span></li>' );

			}
			
		}else{
			$( '.clear-history .m-btn' ).css({'display':'none'});
		}


		//将搜索数据存到本地;
		$( '#search-btn' ).click(function(){

			var _val = $( '#search-val' ).val();
			if( _val != '' ){
				storageData.push( _val );

				storageData = storageData.unique();

				storage.searchStorage = storageData;
			}		
		});

		//清空本地数据

		$( '.clear-history .m-btn' ).click(function(){
			storage.removeItem( 'searchStorage' );
			$( '.search-list ul li' ).remove();
			$( this ).css({'display':'none'});
		});

		//点击选中数据
		$( '.search-list ul' ).delegate( 'li' , 'click' ,function(){
			$( '#search-val' ).val( $( this ).text() );
		});
		
		new _Domsearch( $( '#search-val' )[0] , {
			dataItem: $( '.search-list ul li' ),
			dataSource:'span'
		});

	});

	
	

});