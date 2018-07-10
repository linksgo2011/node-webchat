/**
 * 微信消息响应分发组件
 * 
 * @type {Object}
 */
var crypto = require('crypto');
var xml2js = require('xml2js');

/**
 * 解析原始请求数据
 */
var load = function(stream, callback) {
	if (stream.rawBody) {
		callback(null, stream.rawBody);
		return;
	}

	var buffers = [];
	stream.on('data', function(trunk) {
		buffers.push(trunk);
	});
	stream.on('end', function() {
		callback(null, Buffer.concat(buffers));
	});
	stream.once('error', callback);
};

var getMessage = function(stream, callback) {
	load(stream, function(err, buf) {
		if (err) {
			return callback(err);
		}
		var xml = buf.toString('utf-8');
		stream.weixin_xml = xml;
		xml2js.parseString(xml, {
			trim: true
		}, callback);
	});
};

var formatMessage = function(result) {
	var message = {};
	if (typeof result === 'object') {
		for (var key in result) {
			if (!(result[key] instanceof Array) || result[key].length === 0) {
				continue;
			}
			if (result[key].length === 1) {
				var val = result[key][0];
				if (typeof val === 'object') {
					message[key] = formatMessage(val);
				} else {
					message[key] = (val || '').trim();
				}
			} else {
				message[key] = [];
				result[key].forEach(function(item) {
					message[key].push(formatMessage(item));
				});
			}
		}
	}
	return message;
};

var Time = {
	now: function() {
		return parseInt(new Date().getTime());
	}
};


/**
 * 响应消息格式
 * @type {Object}
 */
var repyFactory = {
	text: function(ToUserName, FromUserName, Content) {
		return {
			ToUserName: ToUserName,
			FromUserName: FromUserName,
			CreateTime: Time.now(),
			MsgType: "text",
			Content: Content || ""
		}
	},

	image: function(ToUserName, FromUserName, MediaId) {
		return {
			ToUserName: ToUserName,
			FromUserName: FromUserName,
			CreateTime: Time.now(),
			MsgType: "image",
			MediaId: MediaId
		}
	},


	voice: function(ToUserName, FromUserName, MediaId) {
		return {
			ToUserName: ToUserName,
			FromUserName: FromUserName,
			CreateTime: Time.now(),
			MsgType: "voice",
			MediaId: MediaId
		}
	},

	video: function(ToUserName, FromUserName, MediaId, Title, Description) {
		return {
			ToUserName: ToUserName,
			FromUserName: FromUserName,
			CreateTime: Time.now(),
			MsgType: "video",
			MediaId: MediaId,
			Title: Title,
			Description: Description
		}
	},

	music: function(ToUserName, FromUserName, Title, Description, MusicURL, HQMusicUrl, ThumbMediaId) {
		return {
			ToUserName: ToUserName,
			FromUserName: FromUserName,
			CreateTime: Time.now(),
			MsgType: "music",
			Title: Title,
			Description: Description,
			MusicURL: MusicURL,
			HQMusicUrl: HQMusicUrl,
			ThumbMediaId: ThumbMediaId
		}
	},

	news: function(ToUserName, FromUserName, Articles) {
		// 单条新闻格式为
		// Articles[0] = {Title:Title,Description:Description,PicUrl:PicUrl,Url:Url}
		var out = {
			ToUserName: ToUserName,
			FromUserName: FromUserName,
			CreateTime: Time.now(),
			MsgType: "news",
			Articles: Articles
		}
	}
};

/**
 * 事件处理器
 * @param  {[type]}   data [description]
 * @param  {Function} cb   [description]
 * @return {[type]}        [description]
 */
var EventHanderCenter = function(data, cb) {
	// 内置事件处理
	this.data = data;
	this.cb = cb;
	var cellcets = {
		// 默认事件处理
		default: function(data, cb) {
			cb(null, "");
		},

		/**
		 * 订阅事件
		 */
		subscribe: function(data, cb) {
			var OpenID = data.FromUserName;
			var EventKey = data.EventKey;
			var target_url = encodeURIComponent("http://m.nong12.com/category/getFirstCategory.do?open_id="+OpenID);
			var bind_content = sails.config.custom.defaultSubscribeRepy+'<a href="http://wx.nong12.com/UserRelevance/index?target_url=' + target_url + '&open_id=' + OpenID + '">点击绑定</a>'
			data = repyFactory.text(data.FromUserName, data.ToUserName, bind_content);
			cb(null, data);
		},
		
		/**
		 * 取消订阅事件
		 * 更新状态为-1
		 */
		unsubscribe: function(data, cb) {
			var OpenID = data.FromUserName;
			var EventKey = data.EventKey;
			User.destroy({
				open_id: OpenID
			}).exec(function(err, records) {
				if (err) {
					return cb(err, "");
				}
				if(records[0]){
					Promise.resolve(RemoteApi.post("http://mobapi.dili7.com/mobsiteApp/user/logout.do",{},records[0].user_id))
					.then(function(logout_res){
						console.log(logout_res);
					},function(logout_err){
						console.log(logout_err);
						sails.log.error(logout_err);
					});
				}
				cb(null, "");
			});
		}
	};

	this.deal = function() {
		var key = this.data.Event;
		if (typeof cellcets[key] !== "function") {
			key = "default";
		}
		cellcets[key](this.data, this.cb);
	};

	this.addHander = function(name, fn) {
		cellcets[name] = fn;
	};
};

module.exports = {
	/**
	 * 根据消息进行调度
	 * @param  {[type]}   config [description]
	 */
	postMsg: function(config, req, cb) {
		var err, data;
		var that = this;
		getMessage(req, function(err, result) {
			if (err) {
				err.name = 'BadMessage' + err.name;
				cb(err, null);
			}

			data = formatMessage(result.xml);
			var hander = data.MsgType + "Hander";
			if (typeof that[hander] == "function") {
				that[hander](data, cb);
			} else {
				that.defaultHander(data, cb);
			}
		});
	},

	/**
	 * 默认消息处理，系统目前不处理的消息类型
	 */
	defaultHander: function(data, cb) {
		// var defaultrepy = sails.config.custom.defaultrepy || "欢迎!";
		// data = repyFactory.text(data.FromUserName, data.ToUserName, defaultrepy);
		cb(null, "");
	},

	/**
	 * 事件响应处理
	 * @param  {[type]}   data [description]
	 * @param  {Function} cb   [description]
	 * @return {[type]}        [description]
	 */
	eventHander: function(data, cb) {
		if (data.MsgType === "event" && data.Event) {
			new EventHanderCenter(data, cb).deal();
		} else {
			this.defaultHander(data, cb);
		}
	}
};