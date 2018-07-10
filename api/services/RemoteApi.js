/**
 * 
 * 远程请求APi
 * @type {Object}
 */
var http = require('http');
var url = require('url');

module.exports = {
	post: function(request_url, post_data,user_id) {
		return new Promise(function(resolve, reject) {
			post_data.token = {
				"requestTime": (new Date).getTime(),
				"secretkey": "__diligrp_mobsite_getway__",
				"deviceType": 4
			};
			if(user_id){
				post_data.token.userId  = user_id;
			}
			post_data = JSON.stringify(post_data);
			var opt = {
				method: "POST",
				host: url.parse(request_url).host,
				port: 80,
				path: url.parse(request_url).path,
				headers: {
					"Content-Type": 'application/json',
					"Content-Length": post_data.length
				}
			};
			var body = '';
			var req = http.request(opt, function(http_res) {
				http_res.on('data', function(d) {
					body += d;
				}).on('end', function() {
					body = JSON.parse(body);
					resolve(body);
				});
			}).on('error', function(e) {
				reject({
					code: 300,
					msg: null
				});
			})
			req.write(post_data + "\n");
			req.end();
		});
	}
}