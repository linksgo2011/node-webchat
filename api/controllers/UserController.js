/**
 * UserController.js 用户控制器，提供远程服务器接口
 *
 * @description :: Server-side logic for managing userrelevances
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var http = require('http');

module.exports = {

	/**
	 * 检查手机号码是否被注册
	 */
	checkMobile: function(req, res, next) {
		if (!req.xhr) {
			return res.end("fail, please use ajx request");
		}
		RemoteApi.post("http://mobapi.nong12.com/mobsiteApp/user/checkMobile.do", req.body.params).then(function(body) {
			return res.json(body);
		}, function(error) {
			return res.json(error);
		});
	},

	sendAuthCode: function(req, res, next) {
		if (!req.xhr) {
			return res.end("fail, please use ajx request");
		}
		RemoteApi.post("http://mobapi.nong12.com/mobsiteApp/user/sendAuthCode.do", req.body.params).then(function(body) {
			return res.json(body);
		}, function(error) {
			return res.json(error);
		});
	},

	checkAuthCode: function(req, res, next) {
		if (!req.xhr) {
			return res.end("fail, please use ajx request");
		}
		RemoteApi.post("http://mobapi.nong12.com/mobsiteApp/user/checkAuthCode.do", req.body.params).then(function(body) {
			return res.json(body);
		}, function(error) {
			return res.json(error);
		});
	},
};