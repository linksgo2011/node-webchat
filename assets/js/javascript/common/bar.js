/**
 * founder : dbc
 * Creation time :  2015/3/19
 * note :
 * role :
 */
//悬浮工具条

define(function( require, exports, module ) {
    var Utils = require('utils');
    $(function(){
    var tmpl = '<div class="m-bar close">\
                    <div class="m-bar-bg" style="display: none;"></div>\
                    <div class="m-bar-content">\
                        <div class="m-bar-btn"><span class="logo m-bar-icon"></span></div>\
                        <a href="/" class="bar-home"><i class="icon icon-home"></i><p>首页</p></a>\
                        <a href="/user/user_home.do?userid='+Utils.uid()+'" class="bar-me"><i class="icon icon-me"></i><p>我</p></a>\
                        <a href="shopped_list.html" class="bar-order"><i class="icon icon-order"></i><p>进货单</p></a>\
                    </div>\
                </div>';

    var bar = $(tmpl);
    $('body').append(bar);
    var mask = $( '.m-bar-bg', $(this) );
    var timer = null;
    bar.on( 'click' , function(){
        clearTimeout( timer );
        if( !$( this ).hasClass( 'open' ) ){
           mask.css( 'display' , 'block' );
            $( this ).addClass( 'open' ).removeClass( 'close' );
        }else{
            $( this ).removeClass( 'open' ).addClass( 'close' );
            timer = setTimeout(function(){
               mask.css( 'display' , 'none' );
            } , 300 );
        }
    });
        });
});