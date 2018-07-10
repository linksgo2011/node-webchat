define(function( require, exports, module ) {
/*
	引入包
*/

var _Miniclock = require( 'miniclock' );

$(function(){

    if( $( '.mini-clock' ).length ){
       	$( '.mini-clock' ).click( function(){
            new _Miniclock( this, {

                SD: "获取验证码",
                WT: "s重新获取",
                ban: "btn-grey"  //已点击标志禁用样式名称。

            } );
       });
    }

});


});
