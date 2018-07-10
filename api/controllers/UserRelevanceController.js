/**
 * 账号绑定控制器
 *
 * @description :: Server-side logic for managing userrelevances
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	/**
	 * 账号绑定
	 */
	index: function(req, res, next) {
		var open_id = req.query.open_id;
		var target_url = req.query.target_url;
		res.locals.open_id = open_id;
		res.locals.target_url = target_url;

		if (!open_id) {
			return res.end("您不是使用微信操作,请使用微信操作，进行绑定");
		}
		User.findOne({open_id:open_id,active:0}).exec(function(err,record){
			if(err){
				return next(err);
			}
			// 检查是否已经关注，如果已经关注,帮其登陆,直接跳转出去
			if(record){
				if(!target_url){
					target_url = "http://m.nong12.com/user/user_home.do?open_id="+open_id+"&user_id="+record['user_id'];
				}
				target_url = decodeURIComponent(target_url);
				if(/user_id=[0-9]+/.test(target_url) == false){
					if(target_url.indexOf("?") !== -1){
						target_url += ("&user_id="+record['user_id']);
					}else{
						target_url += ("?user_id="+record['user_id']);
					}
				}
				if(/open_id=\w+/.test(target_url) == false){
					if(target_url.indexOf("?") !== -1){
						target_url += ("&open_id="+open_id);
					}else{
						target_url += ("?open_id="+open_id);
					}  
				}
				// target_url = encodeURIComponent(target_url);
				HttpClient.login(record)

				.then(function(login_res){
					return res.redirect(target_url);				
				},function(login_err){
					sails.log.error("系统登陆错误!");
					return res.end("系统登陆错误,请稍后再试!");
				});
			}else{
				sails.wechat_api.getUser(open_id, function(err, result) {
					if (err) {
						return next(err);
					} else {
						res.locals.weixin_user = result;
						return res.view();
					}
				});
			}
		});
	},

	/**
	 * 绑定成功
	 */
	succss: function(req, res, next) {
		var user_id = req.query.user_id;
		if (!user_id) {
			return next(user_id);
		}
		res.locals.target_url = decodeURIComponent(req.target_url);
		User.findOne({
			user_id: user_id
		}).exec(function(err, record) {
			if (err) {
				return next(err);
			} else {
				res.locals.user = record;
				return res.view();
			}
		});
	},

	/**
	 * 登陆绑定
	 */
	login_bind: function(req, res, next) {
		if (!req.xhr) {
			return res.end("fail please use ajx request");
		}
		var post_data = req.body;
		var open_id = post_data.open_id;
		var permise = Promise
			.resolve(User.login(post_data.username, post_data.password))
			.then(function(res_body) {
				return User.bind(open_id, res_body.accountId, post_data.username, post_data.password);
			})
			.then(function(bind_res) {
				return res.json(bind_res);
			}, function(err) {
				if (err.msg == "server_http_erro") {
					return res.json({
						result: false,
						msg: "请求网络错误!",
						data: {}
					});
				} else if (err.msg == "server_login_fail") {
					return res.json({
						result: false,
						msg: err.data.msg,
						data: err.data
					});
				} else {
					console.log("line:117",err);
					res.json({
						result: false,
						msg: err.msg,
						data: {}
					});
				}
			});
	},

	/**
	 * 注册绑定
	 */
	register_bind: function(req, res, next) {
		if (!req.xhr) {
			return res.end("fail please use ajx request");
		}
		var post_data = req.body;
		var open_id = post_data.open_id;
		var permise = Promise
			.resolve(User.register(post_data.username, post_data.code, "", post_data.password, 1))
			.then(function(register_res) {
				return User.login(post_data.username, post_data.password);
			})
			.then(function(login_res) {
				return User.bind(open_id, login_res.accountId, post_data.username, post_data.password);
			})
			.then(function(bind_res) {
				return res.json(bind_res);
			}, function(err) {
				if (err.msg == "server_http_erro") {
					return res.json({
						result: false,
						msg: "请求网络错误!",
						data: {}
					});
				} else if (err.msg == "server_login_fail") {
					return res.json({
						result: false,
						msg: err.data.msg,
						data: err.data
					});
				} else {
					res.json({
						result: false,
						msg: err.msg,
						data: {}
					});
				}
			});
	},
};