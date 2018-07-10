var request = require('supertest');
var http = require('http');
var assert = require("assert");
var xml2js = require("xml2js");

describe('ApiController', function() {

	describe('/api/index', function() {

		it('更新菜单', function(done) {
			var get = request(sails.hooks.http.app)
				.get('/api/updateMenu')
				.set('Content-Type', 'text/xml');
			get.end(function(err, res) {
				assert.equal(res.body.errcode, 0, "更新菜单失败!");
				done();
			});
		});

		it('关注事件', function(done) {
			var post = request(sails.hooks.http.app)
				.post('/api/index')
				.set('Content-Type', 'text/xml');
			post.write(
				'<xml>\
					<ToUserName><![CDATA[gh_c6400d2e0936]]></ToUserName>\
					<FromUserName><![CDATA[oT7-Mwplp68gJDSZf-aUpWiEe-22]]></FromUserName>\
					<CreateTime>1435742357</CreateTime>\
					<MsgType><![CDATA[event]]></MsgType>\
					<Event><![CDATA[subscribe]]></Event>\
					<MsgId>1234567890123456</MsgId>\
					</xml>');
			post.end(function(err, res) {
				assert.notEqual(res.text.indexOf("xml"), -1, "返回格式错误!");
				assert.notEqual(res.text.indexOf("感谢您关注农丰网官方微信"), -1, "结果非预期!");
				done();
			});
		});

		it('微信接口对象,检查认证消息', function(done) {
			request(sails.hooks.http.app)
				.get('/api/index?signature=8daa8c455c670d289a560496b464c3263b2ff719&echostr=4834903257182334973&timestamp=1436168141&nonce=757015469')
				.expect(200)
				.end(function(err, res) {
					if (err) {
						throw new Error(err);
					}
					assert.equal(res.text, "4834903257182334973");
					done();
				})
		});
	});
});