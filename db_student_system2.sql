/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : db_student_system

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-01-25 17:53:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_course
-- ----------------------------
DROP TABLE IF EXISTS `t_course`;
CREATE TABLE `t_course` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `number` char(4) NOT NULL COMMENT '课程号',
  `name` char(20) NOT NULL COMMENT '课程名',
  `credit` char(4) NOT NULL COMMENT '学分',
  `start_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '开课时间点',
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建记录时插入时间',
  `update_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改记录时插入当前时间',
  `delete_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '删除时间',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '假删除状态，1表示正常，0表示假删除',
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='课程表';

-- ----------------------------
-- Records of t_course
-- ----------------------------
INSERT INTO `t_course` VALUES ('1', 'A012', '操作系统', '3.0', '2018-09-15 00:00:00', '2018-01-25 09:55:06', '2018-01-25 10:24:23', '0000-00-00 00:00:00', '1');
INSERT INTO `t_course` VALUES ('2', 'A003', '数据结构', '2.5', '2018-03-12 00:00:00', '2018-01-25 09:59:56', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_course` VALUES ('3', 'A004', '离散数学', '2.5', '2018-03-12 00:00:00', '2018-01-25 15:06:28', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_course` VALUES ('4', 'A005', 'C++', '3.0', '2018-03-12 00:00:00', '2018-01-25 15:06:56', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_course` VALUES ('5', 'A006', '数字逻辑', '3.0', '2018-03-12 00:00:00', '2018-01-25 15:07:53', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_course` VALUES ('6', 'A007', '大学英语1', '1.5', '2018-03-12 00:00:00', '2018-01-25 15:08:13', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_course` VALUES ('7', 'A008', '软件工程导论', '2.5', '2018-03-12 00:00:00', '2018-01-25 15:08:47', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');

-- ----------------------------
-- Table structure for t_manager
-- ----------------------------
DROP TABLE IF EXISTS `t_manager`;
CREATE TABLE `t_manager` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `password` varchar(20) NOT NULL COMMENT '密码',
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建记录时插入时间',
  `update_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改记录时插入当前时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='管理员表';

-- ----------------------------
-- Records of t_manager
-- ----------------------------
INSERT INTO `t_manager` VALUES ('1', 'admin', '555', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for t_score
-- ----------------------------
DROP TABLE IF EXISTS `t_score`;
CREATE TABLE `t_score` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `student_id` int(10) DEFAULT NULL COMMENT '外键t_student的id字段',
  `course_id` int(10) DEFAULT NULL COMMENT '外键t_course的id字段',
  `score` float(5,2) NOT NULL COMMENT '分数',
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建记录时插入时间',
  `update_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改记录时插入当前时间',
  PRIMARY KEY (`id`),
  KEY `stu_id` (`student_id`) USING BTREE,
  KEY `cou_id` (`course_id`) USING BTREE,
  CONSTRAINT `t_score_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `t_student` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `t_score_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `t_course` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='成绩表';

-- ----------------------------
-- Records of t_score
-- ----------------------------
INSERT INTO `t_score` VALUES ('3', '5', '1', '85.50', '2018-01-25 11:16:18', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('4', '9', '4', '90.00', '2018-01-25 15:10:38', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('6', '5', '4', '89.00', '2018-01-25 15:12:25', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('9', '12', '3', '87.50', '2018-01-25 15:15:02', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('10', '12', '6', '85.00', '2018-01-25 15:15:32', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('11', '5', '5', '95.00', '2018-01-25 15:15:56', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('12', '13', '2', '92.00', '2018-01-25 15:16:22', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for t_student
-- ----------------------------
DROP TABLE IF EXISTS `t_student`;
CREATE TABLE `t_student` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `number` char(13) NOT NULL COMMENT '学号',
  `name` char(20) NOT NULL COMMENT '姓名',
  `sex` tinyint(1) NOT NULL COMMENT '性别，1表示男，0表示女',
  `age` char(10) NOT NULL COMMENT '年龄',
  `major` char(20) NOT NULL COMMENT '专业',
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建记录时插入时间',
  `update_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改记录时插入当前时间',
  `delete_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '删除时间',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '假删除状态，1表示正常，0表示假删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='学生表';

-- ----------------------------
-- Records of t_student
-- ----------------------------
INSERT INTO `t_student` VALUES ('5', '1514080902117', '林晓聪', '1', '1996-10-08', '软件工程', '2018-01-24 10:12:07', '2018-01-24 21:29:50', '0000-00-00 00:00:00', '1');
INSERT INTO `t_student` VALUES ('9', '1514080902118', 'Hiaocong', '0', '1996-10-08', '软件工程', '2018-01-24 17:15:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_student` VALUES ('12', '1514080903119', '张三', '1', '1996-11-12', '网络工程', '2018-01-25 09:31:38', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_student` VALUES ('13', '1514080902230', '王芳', '0', '1997-08-12', '计算机科学与技术', '2018-01-25 09:36:01', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');

-- ----------------------------
-- View structure for user
-- ----------------------------
DROP VIEW IF EXISTS `user`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user` AS select `t_student`.`number` AS `number`,`t_student`.`name` AS `studenName`,`t_course`.`name` AS `name`,`t_score`.`score` AS `score` from ((`t_student` join `t_course`) join `t_score`) ;