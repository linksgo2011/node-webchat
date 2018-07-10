define(function( require, exports, module ) {
/*
	引入包
*/
var _Base = require( 'base' );

// 引入jquery
var $ = require('jquery');
window.$ = $;
window.jQuery = $;


require( 'underscore' );


$(function(){

	//select 模型
	$( '.m-select select' ).on('change',function(){
		$( this ).parent().find( '.select-text' ).text( $( this ).find( 'option:selected' ).text() );
	});


	/* 搜索 */

	//搜索切换
	$( '.h-search' ).click(function(){
		$( '.s-page' ).css({'display':'block'});
	});

	//取消搜索、返回
	$( '.s-page .icon-back' ).click(function(){
		$( '.s-page' ).css({'display':'none'});
	});

	//搜索类型选择
	$( '.search-type-box' ).click(function(){
		$( '.dropdown-items' ).css({'display':'block'});
	});

	$( '.dropdown-items li' ).click(function(){
		$( '.search-type-box' ).html( $( this ).text() );
		$( '.dropdown-items' ).css({'display':'none'});
	});

	//悬浮工具条
	var timer = null;
	$( '.m-bar' ).on( 'click' , function(){
		clearTimeout( timer );
		if( !$( this ).hasClass( 'open' ) ){
			$( '.m-bar-bg' ).css( 'display' , 'block' );
			$( this ).addClass( 'open' ).removeClass( 'close' );
		}else{
			$( this ).removeClass( 'open' ).addClass( 'close' );
			timer = setTimeout(function(){
				$( '.m-bar-bg' ).css( 'display' , 'none' );
			} , 300 );
		}
		
	});


	//页面切换效果
	$( '.transition-btn' ).on( 'click' , function(){
		$( $( this ).attr( 'elem' ) ).addClass( 'show' ); 
		// $( '.transition-content' ).css( 'display' , 'block' );
	});

	$( '.transition-close' ).on( 'click' , function(){
		$( $( this ).attr( 'elem' ) ).removeClass( 'show' );
		// setTimeout(function(){
		// 	// $( '.transition-content' ).css( 'display' , 'none' );
		// },300);
		
	});


	/* app download */
	var androidIs = false;

	//  ios
	var ios = {
	  	Url: "",
	    downloadUrl: ""
	};
	//android
	var android = {};
	android = {
		Url: "intent://m.ml.com#Intent;scheme=milanoo;package=com.milanoo.store;end;",
		downloadUrl: "http://m.milanoo.com/downloadapp/index.html"
	};

	var appInfoFn = function(){
	    return{
	        Url: androidIs ? android.Url : ios.Url,
	        downloadUrl: androidIs ? android.downloadUrl : ios.downloadUrl
	    };
	};


	var app = {
	    init:function(){ 
	        if( app.getcookie( 'applink' ) == '' && $( '.to-app-box' ).length > 0 ){
	          	$( '.to-app-box' ).animate({ bottom: '0' }, 500 );
	          	app.appInfo = appInfoFn();
	      
	          	document.getElementById("applink").onclick = app.applink( app.appInfo.downloadUrl );
	          	app.close();
	          	app.applink();
	        }                  
	    },
	    close: function(){
	          $( '.app-close' ).click( function(){
	              $( '.to-app-box' ).animate({ bottom: '-100%' }, 500 );
	              app.setcookie( 3600 );
	          });
	    },
	    applink:function( fail ){
	        
	        return function(){    
	            var clickedAt = +new Date;    
	            // During tests on 3g/3gs this timeout fires immediately if less than 500ms.    
	            window.location = app.appInfo.Url ;
	            if(window.location !== app.appInfo.Url){

	              setTimeout(function(){    
	                    // To avoid failing on return to MobileSafari, ensure freshness!    
	                    if (+new Date - clickedAt < 2000){    
	                       window.location = fail;
	                       app.close();    
	                    }    
	              }, 500);        
	            }
	        };
	    },
	    setcookie:function( seconds ){
	        var date = new Date();
	        date.setTime( date.getTime()+( seconds*1000 ) );   
	        document.cookie="applink=yes;path=/;expires="+date.toGMTString();
	    },
	    getcookie:function( name ){
	         var search = name + "="
	         var returnvalue = "";
	         if (document.cookie.length > 0) {
	           offset = document.cookie.indexOf(search)
	           if (offset != -1) { 
	               // if cookie exists
	              offset += search.length
	               // set index of beginning of value
	              end = document.cookie.indexOf(";", offset);
	               // set index of end of cookie value
	              if (end == -1)
	                 end = document.cookie.length;
	              returnvalue=unescape(document.cookie.substring(offset, end))
	            }
	         }  
	         return returnvalue;
	    }
	};

	var u = navigator.userAgent  ;
    if ( /*u.match(/(iPhone|iPod|iPad);?/i) || */u.indexOf('Android') > -1  ) {      
 
	   // if( u.indexOf('Android') > -1){
	        androidIs = true;
	    //}

	    app.init();
	}


});


});
