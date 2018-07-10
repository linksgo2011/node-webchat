/**
 * user.js 微信用户模型
 */
var http = require('http');

module.exports = {
	tableName: "users",
	attributes: {
		id: {
			type: 'integer',
			unique: true,
			primaryKey: true,
			columnName: 'id'
		},
		open_id: {
			type: "string",
			columnName: "open_id"
		},
		user_id: {
			type: "integer",
			columnName: "user_id"
		},
		accountName: {
			type: "integer",
			columnName: "accountName"
		},
		password: {
			type: "string",
			columnName: "password"
		},
		registerNo: {
			type: "string",
			columnName: "registerNo"
		},
		businessType: {
			type: "integer",
			columnName: "businessType"
		},
		active: {
			type: "integer",
			columnName: "active"
		}
	},

	/**
	 * 登陆远程服务器
	 * @param  {string} accountName  
	 * @param  {string} password     
	 * @param  {string} registerNo   
	 * @param  {integer} businessType 
	 * @return {promise}              
	 */
	login: function(accountName, password, registerNo, businessType) {
		var data = {
			accountName: accountName || "",
			password: password || "",
			businessType: businessType || 1
		};

		return new Promise(function(resolve, reject) {
			data = JSON.stringify(data);
			var opt = {
				method: "POST",
				host: "mobapi.nong12.com",
				port: 80,
				path: "/mobsiteApp/user/login.do",
				headers: {
					"Content-Type": 'application/json',
					"Content-Length": data.length
				}
			};
			var body = '';
			var req = http.request(opt, function(res) {
				res.on('data', function(d) {
					body += d;
				}).on('end', function() {
					var error_msg = "server_erro_unknow";
					body = JSON.parse(body);
					if (typeof body !== "object") {
						return reject({
							name: "login_erro",
							msg: error_msg
						});
					}
					if (body.code && body.code !== 200) {
						return reject({
							name: "login_erro",
							msg: "server_login_fail",
							data: body
						});
					}
					if (body.accountState && body.accountState === 1) {
						return resolve(body);
					}
					if (body.accountState === 2) {
						error_msg = "server_erro_lock";
					}
					if (body.accountState === 3) {
						error_msg = "server_erro_unactive";
					}
					if (body.accountState === 4) {
						error_msg = "server_erro_password";
					}
					return reject({
						name: "login_erro",
						msg: error_msg
					});
				});
			}).on('error', function(e) {
				reject({
					name: "login_erro",
					msg: "server_http_erro",
					data: ""
				});
			})
			req.write(data + "\n");
			req.end();
		});
	},

	/**
	 * 用户注册
	 * @param  {[string]} mobile       
	 * @param  {[string]} veriCode     
	 * @param  {[string]} accountName  
	 * @param  {[string]} password     
	 * @param  {[string]} businessType 
	 * @return {[promise]}              
	 */
	register: function(mobile, veriCode, accountName, password, businessType) {
		var data = {
			mobile: mobile || "",
			veriCode: veriCode || "",
			accountName: accountName || "",
			password: password || "",
			businessType: businessType || 1
		};

		return new Promise(function(resolve, reject) {
			RemoteApi.post("http://mobapi.nong12.com/mobsiteApp/user/userRegister.do", data)

			.then(function(post_res) {
				if (post_res.code === 200) {
					resolve(post_res);
				} else {
					reject(post_res);
				}
			}, function(post_err) {
				reject(post_err);
			});
		});
	},
	
	/**
	 * 绑定账号存入数据库，如果存在就更新，如果不存在就添加
	 * @param  {string} open_id    
	 * @param  {[integer]} user_id    
	 * @param  {[string]} accountName
	 * @param  {[string]} password   
	 * @return {[promise]}            
	 */
	bind: function(open_id, user_id, accountName, password) {
		return new Promise(function(resolve, reject) {
			User.findOne({
				accountName: accountName
			}).then(function(user_record) {
				if (user_record) {
					if(user_record['active'] == 0){
						return reject({
							name:"bind_exist",
							msg:"该手机号已被绑定!"
						});
					}
					// update 
					User.update({
						accountName: accountName
					}, {
						user_id: user_id,
						open_id: open_id,
						password: password,
						active: 0
					}).exec(function cb(err, records) {
						if (err) {
							return reject(err);
						} else {
							return resolve({
								result: true,
								msg: "",
								data: records[0]
							});
						}
					});
				} else {
					User.create({
						open_id: open_id,
						user_id: user_id,
						accountName: accountName,
						password: password,
						active: 0
					}).exec(function(err, created) {
						if (err) {
							reject(err)
						} else {
							resolve({
								result: true,
								msg: "",
								data: created
							})
						}
					});
				}
			});
		});
	}
};