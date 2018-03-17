/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : db_student_system

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-03-17 17:25:36
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
  `credit` float(4,1) NOT NULL COMMENT '学分',
  `start_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '开课时间点',
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建记录时插入时间',
  `update_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改记录时插入当前时间',
  `delete_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '删除时间',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '假删除状态，1表示正常，0表示假删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `number` (`number`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='课程表';

-- ----------------------------
-- Records of t_course
-- ----------------------------
INSERT INTO `t_course` VALUES ('1', 'A012', '操作系统', '3.0', '2018-09-15 00:00:00', '2018-01-25 09:55:06', '2018-01-28 23:20:10', '0000-00-00 00:00:00', '1');
INSERT INTO `t_course` VALUES ('2', 'A003', '数据结构', '2.5', '2018-03-12 00:00:00', '2018-01-25 09:59:56', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_course` VALUES ('3', 'A004', '离散数学', '2.5', '2018-03-12 00:00:00', '2018-01-25 15:06:28', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_course` VALUES ('4', 'A005', 'C++', '3.0', '2018-03-12 00:00:00', '2018-01-25 15:06:56', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_course` VALUES ('5', 'A006', '数字逻辑', '3.0', '2018-03-12 00:00:00', '2018-01-25 15:07:53', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_course` VALUES ('6', 'A007', '大学英语1', '1.5', '2018-03-12 00:00:00', '2018-01-25 15:08:13', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_course` VALUES ('7', 'A008', '软件工程导论', '3.0', '2018-03-12 00:00:00', '2018-01-25 15:08:47', '2018-01-28 23:23:28', '0000-00-00 00:00:00', '1');
INSERT INTO `t_course` VALUES ('8', 'A009', '高等数学', '2.0', '2018-09-13 00:00:00', '2018-01-30 11:40:04', '2018-01-30 14:37:11', '0000-00-00 00:00:00', '1');
INSERT INTO `t_course` VALUES ('10', 'A013', '随意', '79.5', '2018-11-13 00:00:00', '2018-02-02 16:17:38', '2018-02-02 16:18:17', '2018-02-02 16:18:25', '0');

-- ----------------------------
-- Table structure for t_manager
-- ----------------------------
DROP TABLE IF EXISTS `t_manager`;
CREATE TABLE `t_manager` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` char(20) NOT NULL COMMENT '用户名',
  `password` char(32) NOT NULL COMMENT '密码',
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建记录时插入时间',
  `update_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改记录时插入当前时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='管理员表';

-- ----------------------------
-- Records of t_manager
-- ----------------------------
INSERT INTO `t_manager` VALUES ('1', 'admin', '202cb962ac59075b964b07152d234b70', '0000-00-00 00:00:00', '2018-03-17 16:40:07');

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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='成绩表';

-- ----------------------------
-- Records of t_score
-- ----------------------------
INSERT INTO `t_score` VALUES ('3', '5', '1', '85.50', '2018-01-25 11:16:18', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('4', '9', '4', '90.00', '2018-01-25 15:10:38', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('6', '5', '4', '89.00', '2018-01-25 15:12:25', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('9', '12', '3', '87.50', '2018-01-25 15:15:02', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('10', '12', '6', '88.00', '2018-01-25 15:15:32', '2018-02-02 16:23:05');
INSERT INTO `t_score` VALUES ('11', '5', '5', '97.00', '2018-01-25 15:15:56', '2018-02-01 20:49:50');
INSERT INTO `t_score` VALUES ('12', '13', '2', '92.00', '2018-01-25 15:16:22', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('14', '12', '2', '89.00', '2018-01-28 22:51:27', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('16', '12', '8', '86.50', '2018-01-30 14:47:13', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('17', '9', '1', '98.00', '2018-02-02 16:19:31', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('18', '5', '8', '88.00', '2018-03-15 14:05:37', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('19', '12', '10', '87.50', '2018-03-17 15:20:41', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('20', '9', '6', '66.00', '2018-03-17 15:25:08', '0000-00-00 00:00:00');
INSERT INTO `t_score` VALUES ('21', '5', '10', '87.00', '2018-03-17 15:29:31', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for t_student
-- ----------------------------
DROP TABLE IF EXISTS `t_student`;
CREATE TABLE `t_student` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `number` char(13) NOT NULL COMMENT '学号',
  `name` char(20) NOT NULL COMMENT '姓名',
  `sex` tinyint(1) NOT NULL COMMENT '性别,1表示男，0表示女',
  `age` char(10) NOT NULL COMMENT '年龄',
  `major` char(20) NOT NULL COMMENT '专业',
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建记录时插入时间',
  `update_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改记录时插入当前时间',
  `delete_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '删除时间',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '假删除状态，1表示正常，0表示假删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `number` (`number`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COMMENT='学生表';

-- ----------------------------
-- Records of t_student
-- ----------------------------
INSERT INTO `t_student` VALUES ('5', '1514080902117', '林晓聪', '0', '1996-10-08', '软件工程', '2018-01-24 10:12:07', '2018-01-24 21:29:50', '0000-00-00 00:00:00', '1');
INSERT INTO `t_student` VALUES ('9', '1514080902118', 'Hiaocong', '0', '1996-10-08', '软件工程', '2018-01-24 17:15:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_student` VALUES ('12', '1514080903119', '张三', '0', '1996-11-12', '网络工程', '2018-01-25 09:31:38', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_student` VALUES ('13', '1514080902230', '王小五', '0', '1997-08-12', '计算机科学与技术', '2018-01-25 09:36:01', '2018-01-28 20:21:37', '0000-00-00 00:00:00', '1');
INSERT INTO `t_student` VALUES ('15', '121', 'asd', '0', 'asd', 'asdr2', '2018-01-28 19:29:54', '0000-00-00 00:00:00', '2018-01-28 20:48:14', '0');
INSERT INTO `t_student` VALUES ('16', '1514080904212', '小刘', '0', '1998-10-07', '网络工程', '2018-01-28 20:25:25', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_student` VALUES ('17', '1514080923141', '小红', '0', '1999-03-23', '计算机科学与技术', '2018-01-28 20:26:22', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_student` VALUES ('18', 'sd', 'aa', '0', '12', 'df', '2018-01-28 20:26:50', '2018-01-28 20:28:52', '2018-01-28 20:47:42', '0');
INSERT INTO `t_student` VALUES ('19', '123', '3123', '0', '34124', 'af', '2018-01-28 20:31:27', '0000-00-00 00:00:00', '2018-01-29 17:00:32', '0');
INSERT INTO `t_student` VALUES ('20', 'rwer', 'df', '0', '12', 'fds', '2018-01-28 20:33:55', '0000-00-00 00:00:00', '2018-01-28 20:47:41', '0');
INSERT INTO `t_student` VALUES ('21', '12', '12', '0', 'asdf', 'ads', '2018-01-28 20:34:40', '0000-00-00 00:00:00', '2018-01-28 20:47:40', '0');
INSERT INTO `t_student` VALUES ('22', '14343', '13', '0', '12', 'fasdf', '2018-01-28 20:35:53', '0000-00-00 00:00:00', '2018-01-28 20:47:39', '0');
INSERT INTO `t_student` VALUES ('23', '12123', 'fsdfsdf', '0', 'fsd', 'sdfsd', '2018-01-28 20:37:31', '0000-00-00 00:00:00', '2018-01-28 20:47:34', '0');
INSERT INTO `t_student` VALUES ('24', '15434', 'sss', '0', 'dfsdf', '234', '2018-01-28 20:49:56', '2018-01-28 21:49:52', '2018-01-28 21:50:23', '0');
INSERT INTO `t_student` VALUES ('25', '1514080923151', '小明', '1', '1994-10-05', '网络工程', '2018-01-29 10:21:10', '2018-01-29 10:56:11', '0000-00-00 00:00:00', '1');
INSERT INTO `t_student` VALUES ('27', '123456', '小霞', '0', '32289', '音乐', '2018-01-29 16:05:27', '0000-00-00 00:00:00', '2018-01-29 16:59:46', '0');
INSERT INTO `t_student` VALUES ('33', '1514080901474', 'kk', '0', '2000-01-01', '电子工程', '2018-01-30 15:06:46', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_student` VALUES ('34', '1514080454540', 'gg', '0', '2001-01-01', '会计', '2018-01-30 15:07:56', '0000-00-00 00:00:00', '2018-02-02 15:37:13', '0');
INSERT INTO `t_student` VALUES ('35', '1514080508485', 'hh', '0', '1999-05-14', '体育', '2018-01-30 15:10:17', '0000-00-00 00:00:00', '2018-02-02 15:31:24', '0');
INSERT INTO `t_student` VALUES ('36', '1514080485041', 'll', '1', '1998-06-24', '日语', '2018-01-30 15:11:10', '0000-00-00 00:00:00', '2018-01-30 16:28:04', '0');
INSERT INTO `t_student` VALUES ('37', '1514080204578', '吴大大', '1', '1996-06-24', '旅游', '2018-01-30 15:48:08', '2018-01-30 18:47:24', '2018-02-02 15:30:51', '0');
INSERT INTO `t_student` VALUES ('38', '1545484874516', '洪xx', '1', '2011-01-05', '国语', '2018-01-30 18:08:36', '2018-01-30 18:42:50', '2018-02-02 15:28:19', '0');
INSERT INTO `t_student` VALUES ('39', '1345848441854', '木子', '0', '1992-08-30', '媒体', '2018-02-02 15:22:25', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_student` VALUES ('40', '1649845485014', 'peono', '1', '1992-07-21', '媒体', '2018-02-02 15:22:59', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_student` VALUES ('41', '1546541848544', '路飞', '1', '1001-01-01', '海盗', '2018-02-02 15:26:34', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '1');
INSERT INTO `t_student` VALUES ('49', '1514026546875', '林x', '0', '1998-02-01', '网络', '2018-02-02 16:09:54', '0000-00-00 00:00:00', '2018-03-15 13:16:21', '0');
INSERT INTO `t_student` VALUES ('50', '1514080354868', '小c', '1', '1997-03-26', '软件', '2018-02-02 16:09:54', '0000-00-00 00:00:00', '2018-03-15 13:16:16', '0');
INSERT INTO `t_student` VALUES ('55', '1514080903138', '陈洁敏', '0', '1995-08-08', '高级数据库', '2018-03-15 08:54:19', '0000-00-00 00:00:00', '2018-03-15 13:16:00', '0');
INSERT INTO `t_student` VALUES ('56', '1111111111154', 'ss', '0', '2000-01-12', 'sdf', '2018-03-17 16:45:07', '0000-00-00 00:00:00', '2018-03-17 16:52:32', '0');
INSERT INTO `t_student` VALUES ('57', '5645641521514', '214', '1', '2000-01-06', '1', '2018-03-17 16:47:01', '2018-03-17 16:49:25', '2018-03-17 16:51:39', '0');

-- ----------------------------
-- Table structure for t_teacher
-- ----------------------------
DROP TABLE IF EXISTS `t_teacher`;
CREATE TABLE `t_teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `number` char(13) NOT NULL COMMENT '教师编号',
  `name` char(20) NOT NULL COMMENT '教师姓名',
  `username` char(20) NOT NULL COMMENT '教师用户名',
  `password` char(32) NOT NULL COMMENT '教师密码',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '假删除的状态，1表示正常，0表示加删除',
  `delete_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '删除时间',
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建记录时插入时间',
  `update_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改记录时插入当前时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `number` (`number`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='教师表';

-- ----------------------------
-- Records of t_teacher
-- ----------------------------
INSERT INTO `t_teacher` VALUES ('1', '151409090123', '张全蛋', '小张', '202cb962ac59075b964b07152d234b70', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2018-01-30 10:26:42');
INSERT INTO `t_teacher` VALUES ('2', '1111111111111', '王尼玛', 'wang', '202cb962ac59075b964b07152d234b70', '1', '0000-00-00 00:00:00', '2018-01-31 16:04:10', '2018-01-31 16:07:19');
INSERT INTO `t_teacher` VALUES ('3', '1541541854851', '林晓聪', 'a773548150', 'f95579bd0ae8401e0480f7f328f70846', '0', '2018-02-02 16:15:03', '2018-02-02 16:13:44', '2018-02-02 16:14:56');
INSERT INTO `t_teacher` VALUES ('4', '2222222222222', '白客', 'bai', 'e10adc3949ba59abbe56e057f20f883e', '1', '0000-00-00 00:00:00', '2018-03-15 20:53:34', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for t_teacher_course
-- ----------------------------
DROP TABLE IF EXISTS `t_teacher_course`;
CREATE TABLE `t_teacher_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `teacher_id` int(11) NOT NULL COMMENT '外键教师表id',
  `course_id` int(11) NOT NULL COMMENT '外键课程表id',
  `update_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改记录时插入当前时间',
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建记录时插入时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `TC_id` (`course_id`) USING BTREE,
  KEY `teacher_id` (`teacher_id`) USING BTREE,
  CONSTRAINT `TC_id` FOREIGN KEY (`course_id`) REFERENCES `t_course` (`id`),
  CONSTRAINT `TT_id` FOREIGN KEY (`teacher_id`) REFERENCES `t_teacher` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='教师与课程的关联表';

-- ----------------------------
-- Records of t_teacher_course
-- ----------------------------
INSERT INTO `t_teacher_course` VALUES ('1', '1', '2', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `t_teacher_course` VALUES ('3', '1', '3', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `t_teacher_course` VALUES ('4', '2', '6', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `t_teacher_course` VALUES ('5', '2', '5', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `t_teacher_course` VALUES ('6', '1', '8', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `t_teacher_course` VALUES ('7', '2', '4', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `t_teacher_course` VALUES ('8', '2', '7', '0000-00-00 00:00:00', '2018-03-15 22:33:00');

-- ----------------------------
-- View structure for v_score
-- ----------------------------
DROP VIEW IF EXISTS `v_score`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_score` AS select `t_student`.`number` AS `number`,`t_student`.`name` AS `student_name`,`t_course`.`name` AS `course_name`,`t_score`.`score` AS `score` from ((`t_student` left join `t_score` on((`t_student`.`id` = `t_score`.`student_id`))) left join `t_course` on((`t_course`.`id` = `t_score`.`course_id`))) where ((`t_student`.`status` > 0) and (`t_course`.`status` > 0)) order by `t_score`.`id` desc ;
