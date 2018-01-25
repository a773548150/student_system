/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : db_student_system

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-01-23 17:39:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_course
-- ----------------------------
DROP TABLE IF EXISTS `t_course`;
CREATE TABLE `t_course` (
  `id` char(8) NOT NULL,
  `cou_name` varchar(20) NOT NULL,
  `cou_credit` char(3) NOT NULL,
  `cou_start_time` datetime NOT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_course
-- ----------------------------

-- ----------------------------
-- Table structure for t_manager
-- ----------------------------
DROP TABLE IF EXISTS `t_manager`;
CREATE TABLE `t_manager` (
  `id` char(8) NOT NULL,
  `man_user` varchar(20) NOT NULL,
  `man_psw` varchar(20) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_manager
-- ----------------------------

-- ----------------------------
-- Table structure for t_score
-- ----------------------------
DROP TABLE IF EXISTS `t_score`;
CREATE TABLE `t_score` (
  `stu_id` char(8) NOT NULL,
  `cou_id` char(8) NOT NULL,
  `score` char(3) CHARACTER SET ujis NOT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  KEY `stu_id` (`stu_id`),
  KEY `cou_id` (`cou_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_score
-- ----------------------------

-- ----------------------------
-- Table structure for t_student
-- ----------------------------
DROP TABLE IF EXISTS `t_student`;
CREATE TABLE `t_student` (
  `id` char(8) NOT NULL,
  `stu_name` varchar(20) NOT NULL,
  `stu_sex` char(2) NOT NULL,
  `stu_age` char(3) NOT NULL,
  `stu_class` varchar(20) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建记录时插入时间',
  `update_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改记录时插入当前时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_student
-- ----------------------------
