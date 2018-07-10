define(function( require, exports, module ) {
/*
	引入包
*/
var _Base = require( 'base' );


require( 'swipe' );


$(function(){

	/*轮播图*/

    var mySwiper = new Swiper('.banner',{
	    pagination: '.pagination',
	    loop:true,
	    grabCursor: true,
	    autoplay:3000,
	    paginationClickable: true
	  });

	

	//点击市场选择


});


});
