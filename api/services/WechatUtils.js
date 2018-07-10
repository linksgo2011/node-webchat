/**
 * 
 * 微信工具组件
 * 
 * @type {Object}
 */
var crypto = require('crypto');
var wechat_api = require('wechat-api');
var util = require('util'),
	fs = require("fs");
var api = sails.wechat_api = new wechat_api(sails.config.custom.appid, sails.config.custom.appsecret, function(callback) {
	fs.readFile('access_token.txt', 'utf8', function(err, txt) {
		if (err) {
			return callback(err);
		}
		callback(null, JSON.parse(txt));
	});
}, function(token, callback) {
	fs.writeFile('access_token.txt', JSON.stringify(token), callback);
});

module.exports = {
	/**
	 * 检查认证标示符
	 * @param  {objec} query 
	 * @param  {string} token 
	 * @return {boolea}     结果
	 */
	checkSignature: function(query, token) {
		var signature = query.signature;
		var timestamp = query.timestamp;
		var nonce = query.nonce;

		var shasum = crypto.createHash('sha1');
		var arr = [token, timestamp, nonce].sort();
		shasum.update(arr.join(''));

		return shasum.digest('hex') === signature;
	}
}