/**
 * 微信接入控制器，和微信对接API 使用
 */
if (!sails.config.custom) {
	throw new Error('token not config');
}
var https = require('https');
var url = require('url');

var custom = sails.config.custom;
module.exports = {
	/**
	 * 微信通知入口方法
	 * @param  {[type]}   req  [description]
	 */
	index: function(req, res, next) {
		// 认证检查
		if (req.method !== "POST") {
			if (!WechatUtils.checkSignature(req.query, custom.token)) {
				console.log(req.query);
				res.send("Bad Token!");
			} else {
				res.send(req.query.echostr);
			}
		}

		if (req.method == "POST") {
			WechatDispatch.postMsg(custom, req, function(err, data) {
				if (err) {
					return next(err);
				}
				if (typeof data === "object") {
					// 渲染输出
					res.set('Content-Type', 'text/xml; charset=utf-8');
					var view = "api/" + data.MsgType + ".ejs";
					return res.view(view, data);
				} else {
					return res.end(data);
				}
			});
		}
	},

	/**
	 * 发起菜单更新
	 * 使用第三方模块
	 */
	updateMenu: function(req, res, next) {
		var menu = Menu.data;
		sails.wechat_api.createMenu(menu, function(err, result) {
			if (err) {
				return next(err);
			}
			return res.json(result);
		});
	},

	/**
	 * 匿名认证code,获取openid
	 */
	auth: function(req, res, next) {
		var code = req.query.code;
		var EventKey = req.query.event_key;
		var OpenID = "";
		if (!code) {
			return res.end("访问非法,请在微信中访问");
		}

		var p_getopenid = new Promise(function(resolve, reject) {
			var request_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + custom.appid + "&secret=" + custom.appsecret + "&code=" + code + "&grant_type=authorization_code"
			var opt = {
				method: "GET",
				host: url.parse(request_url).host,
				port: 443,
				path: url.parse(request_url).path,
			};
			var body = '';
			var req = https.request(opt, function(http_res) {
				http_res.on('data', function(d) {
					body += d;
				}).on('end', function() {
					body = JSON.parse(body);
					return resolve(body);
				});
			}).on('error', function(e) {
				return reject(e);
			})
			req.end();
		});

		Promise.resolve(p_getopenid).then(function(auth_res){
			OpenID = auth_res.openid;
			if(!OpenID){
				return res.end("参数错误");
			}
			return User.findOne({open_id: OpenID,active: 0});
		})
		
		.then(function(user_record) {
				if (!user_record) {
					return Promise.reject({
						name: 'no_bind',
						"msg": ""
					});
				}
				return user_record;
			})
		.then(function(user_record) {
			return HttpClient.login(user_record);
		})

		.then(function resolve(login_res) {
			var target_url = "http://m.nong12.com/user/user_home.do?open_id="+OpenID;
			if (EventKey == "btn_ordersearch") {
				target_url = 'http://m.nong12.com/order/shopped_list.do?orderState=-1&user_id=' + login_res.accountId+'&open_id='+OpenID;
			}
			if (EventKey == "btn_usercenter") {
				target_url = 'http://m.nong12.com/user/user_home.do?user_id=' + login_res.accountId+'&open_id='+OpenID;
			}
			if(EventKey == "btn_category"){
				target_url = "http://m.nong12.com/category/getFirstCategory.do?open_id="+OpenID+"&user_id="+login_res.accountId;
			}
			res.redirect(target_url);
		}, function reject(err) {
			var target_url = "http://m.nong12.com/user/user_home.do"+'?open_id='+OpenID;
			if (EventKey == "btn_usercenter") {
				target_url = encodeURIComponent("http://m.nong12.com/user/user_home.do"+'?open_id='+OpenID);
			}
			if (EventKey == "btn_ordersearch") {
				target_url = encodeURIComponent("http://m.nong12.com/order/shopped_list.do?orderState=-1"+'&open_id='+OpenID);
			}
			// 跳转绑定
			if (err.name == "no_bind") {
				if(EventKey == "btn_category"){
					target_url = "http://m.nong12.com/category/getFirstCategory.do?open_id="+OpenID;
					return res.redirect(target_url);
				}else{
					return res.redirect('http://wx.nong12.com/UserRelevance/index?target_url=' + target_url + '&open_id=' + OpenID);
				}
			} else {
				console.log(err);
				// 先解除关联
				User.destroy({
					open_id: OpenID
				}).exec(function(destroy_err, records) {
					if(destroy_err){
						err = destroy_err;
					}
					res.locals.err = err;
					res.locals.open_id = OpenID;
					return res.view();
				});
			}
		});
	}
};