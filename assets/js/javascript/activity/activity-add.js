define(function( require, exports, module ) {
	/**
     * 引入包 
     */

    var _Imguploader = require( 'imguploader' );

    $(function() {


        //图片上传

        if( $( ".s-uploader" ).length > 0 ){
            $( ".s-uploader" ).each( function(){

                new _Imguploader( this , { 
                    max: 4,
                    errorPlace: $( ".s-uploader" ).parent().parent(),
                    fileName    : "userPicture[]",
                    onFinish: function() { this._list.css( 'z-index', 2 ); },
                    onRemove: function() { this._list.css( 'z-index', 0 ); },
                    messages: {
                        typeError: '图片格式错误',
                        sizeError: '最大上5M的图片'
                    }
                });

            });
        }

    });
});