/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50524
Source Host           : localhost:3306
Source Database       : wechat

Target Server Type    : MYSQL
Target Server Version : 50524
File Encoding         : 65001

Date: 2015-07-03 20:14:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `open_id` varchar(100) DEFAULT '',
  `user_id` int(11) DEFAULT '0',
  `accountName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `registerNo` varchar(255) DEFAULT NULL,
  `businessType` int(255) DEFAULT '1',
  `active` int(255) DEFAULT '0' COMMENT '绑定状态',
  `createdAt` datetime DEFAULT '0000-00-00 00:00:00',
  `updatedAt` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid` (`open_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('10', 'FromUs1213', '5205', '13000000019', '13000000019', null, '1', '0', '2015-07-03 18:55:23', '2015-07-03 20:13:40');
