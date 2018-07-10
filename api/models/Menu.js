 /*
  * Menu.js 微信菜单模型
  *
  * @description :: TODO: You might write a short summary of how this model works and what it represents here.
  * @docs        :: http://sailsjs.org/#!documentation/models
  */
 module.exports = {
 	connection: "localDiskDb",
 	autoCreatedAt: false,
 	autoUpdatedAt: false,
 	data: {
 		"button": [{
 			"type": "view",
 			"name": "我要采购",
 			"url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + sails.config.custom.appid + "&redirect_uri=http%3A%2F%2Fwx.nong12.com%2Fapi%2Fauth%3Fevent_key%3Dbtn_category&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
 		}, {
 			"type": "view",
 			"name": "订单查询",
 			"url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + sails.config.custom.appid + "&redirect_uri=http%3A%2F%2Fwx.nong12.com%2Fapi%2Fauth%3Fevent_key%3Dbtn_ordersearch&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
 		}, {
 			"type": "view",
 			"name": "个人账号",
 			"url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + sails.config.custom.appid + "&redirect_uri=http%3A%2F%2Fwx.nong12.com%2Fapi%2Fauth%3Fevent_key%3Dbtn_usercenter&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
 		}]
 	}
 };