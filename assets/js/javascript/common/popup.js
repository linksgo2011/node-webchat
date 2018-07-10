/***************************************************
* feature  :  弹出框组件;
* update   :  2015/02/17;
* use      :  ;
* extend   :  ;
* example  :  ;
* desc     :  ;
* feedback :  此处填入 issue, 并请附带以下信息[os_version, browser_version, page_path, issue_description]
*          -  demo => [windows 7, IE 8, http://diligrp.com/icon.html, 在不定height下未能垂直居中];
****************************************************/

//mask
//position
//action
//event
define(function(require, exports, module){
	(function($){
		var Popup = {
			defaults:{
				position: 'bottom' //[center|bottom]
			},
			initialize:function(){
				this.render();
				this.bindEvents();
			},
			bindEvents:function(){
				var _this = this;
				$(document).on('click', 'a[data-popup]', function(e){ //绑定弹出框open event
					_this.open($(this));
					e.preventDefault();
				}).on('click', 'a[data-dismiss]', function(e){ //绑定弹出框close event
					_this.close();
					e.preventDefault();
				});
			},
			open:function(target){
				var position = target.data('popup');
				if(position){
					this.setting = $.extend({}, this.defaults, {position: position});
				}else{
					this.setting = $.extend({}, this.defaults);
				}
				this.popup = $(target.attr('href'));
				this.show();
			},
			close:function(){
				this.hide();
			},
			render:function(){
				this.createMask(); //创建背景遮罩层
			},
			show:function(){ //显示弹出框
				this.mask.removeClass('hidden');
				this.position();
				this.popup.addClass('m-animate-show');
			},
			hide:function(){ 	//关闭弹出框
				this.mask.addClass('hidden');
				this.popup.removeClass('m-animate-show');
				this.reset();
			},
			position:function(){
				this.popup.css(this[this.setting.position]());
			},
			bottom:function(){ //底对齐
				return {
					bottom:0
				};
			},
			center:function(){ //水平、垂直居于屏幕中心
				var w = this.popup.outerWidth();
				var h = this.popup.outerHeight();
				return {
					top:'50%',
					bottom:'auto',
					left:'50%',
					marginLeft:-w/2,
					marginTop:-h/2
				};
			},
			reset:function(){ //重置style
				var position = {
					bottom: 0
				};
				this.popup.css(position);
			},
			createMask:function(){ //创建遮罩层
				var mask = $('.m-mask');
				if(mask.length > 0){ //防止背景遮罩层重复
					this.mask = mask;
					return;
				}
				mask = $('<div class="m-mask hidden">');
				this.mask = mask;
				$('body').append(mask);
			}
		};
		Popup.initialize();
	})(jQuery);
});
