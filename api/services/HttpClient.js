/**
 * 请求接口API工具
 * @type {Object}
 */
var crypto = require('crypto');
var http = require('http');

module.exports = {

	/**
	 * 请求服务器认证登陆		
	 * @param  {[type]} user_record 
	 * @return {[permise]}
	 */
	login: function(user_record) {
		return new Promise(function(resolve, reject) {
			var data = {
				accountName: user_record.accountName,
				password: user_record.password,
				businessType: user_record.businessType
			};

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
					if (!body.accountState || typeof body !== "object") {
						return reject({
							name: "parse_err",
							msg: error_msg
						});
					}
					if (body.accountState === 1) {
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
						name: "no_bind",
						msg: error_msg
					});
				});
			}).on('error', function(e) {
				reject({
					name: "http_err",
					msg: "server_erro"
				});
			})
			req.write(data + "\n");
			req.end();
		});
	}
}