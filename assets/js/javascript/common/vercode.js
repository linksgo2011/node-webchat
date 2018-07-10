define(function(require, exports, module) {
	var timer;
	exports.sendCode = function(btn){
		var time = 180;
		if(btn.hasClass("gray-btn")){
		    return false;
		};
		btn.addClass("gray-btn");
		clearInterval(timer);
		timer = setInterval(function(){
		    if(0 >= time){
		        clearInterval(timer);
		        btn.html("获取验证码");
		        time = 180;
		        btn.removeClass("gray-btn");
		        return false;
		    };
		    btn.html(time+"s重新获取");
		    time --;
		}, 1000);
	};

	exports.resetCode = function(btn){
		clearInterval(timer);
		btn.removeClass("gray-btn").html('获取验证码');
	}
});