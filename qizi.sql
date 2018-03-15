/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50711
Source Host           : localhost:3306
Source Database       : qizi

Target Server Type    : MYSQL
Target Server Version : 50711
File Encoding         : 65001

Date: 2018-03-15 18:32:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `mangaid` int(255) NOT NULL,
  `userid` int(255) NOT NULL,
  `commentcontent` varchar(255) NOT NULL,
  `createtime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for favor
-- ----------------------------
DROP TABLE IF EXISTS `favor`;
CREATE TABLE `favor` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `mangaid` int(255) NOT NULL,
  `userid` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of favor
-- ----------------------------

-- ----------------------------
-- Table structure for manga
-- ----------------------------
DROP TABLE IF EXISTS `manga`;
CREATE TABLE `manga` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `manganame` varchar(50) NOT NULL,
  `author` varchar(20) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `updatetime` datetime DEFAULT NULL,
  `mangapic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of manga
-- ----------------------------
INSERT INTO `manga` VALUES ('1', '九泉之岛(10531)', null, null, null, null);
INSERT INTO `manga` VALUES ('2', '人渣，眼镜和文学少女（伪）(26417)', null, null, null, null);
INSERT INTO `manga` VALUES ('3', '炎拳(20082)', null, null, null, null);

-- ----------------------------
-- Table structure for part
-- ----------------------------
DROP TABLE IF EXISTS `part`;
CREATE TABLE `part` (
  `id` int(255) NOT NULL,
  `mangaid` int(255) NOT NULL,
  `partname` varchar(20) NOT NULL,
  `pic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of part
-- ----------------------------

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `projecttitle` varchar(30) NOT NULL,
  `mid1` int(50) DEFAULT NULL,
  `mid2` int(50) DEFAULT NULL,
  `mid3` int(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of project
-- ----------------------------

-- ----------------------------
-- Table structure for subject
-- ----------------------------
DROP TABLE IF EXISTS `subject`;
CREATE TABLE `subject` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `subjectname` varchar(20) NOT NULL,
  `title` varchar(20) NOT NULL,
  `subpic` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of subject
-- ----------------------------
INSERT INTO `subject` VALUES ('1', '战争在海对岸开始', '另一个村上--关于村上龙', 'https://image.g-cores.com/bb4acc5a-4669-4607-bfe7-cca6a6c2ea94.jpg?x-oss-process=style/original_hl', '1969年的夏天，他在高中校园内进行屋顶封锁抗争，结果被无限期停学。1970年3月，村上在毕业前又再度成立摇滚乐团，并开始拍摄电影、举办摇滚演唱会，这些过程之后村上龙改写成小说《69》（sixtynine），于1987年在日本出版。高中毕业后，村上进入出版社现代思潮社的美术学校就读，但在半年后被退学。1972年4月村上进入武藏野美术大学造型学部基础设计科就读。');
INSERT INTO `subject` VALUES ('2', '刺杀骑士团长', '永井豪与恶魔人的诞生', 'https://image.g-cores.com/5878fe34-f74f-4044-92b3-af058b2dc6c4.jpg?x-oss-process=style/original_hs', '111111111111111111111111111111111111');
INSERT INTO `subject` VALUES ('3', '女神异闻录', '222', 'https://image.g-cores.com/6387cb20-b73d-49f2-ac53-78e064bf56c4.jpg?x-oss-process=style/original_hs', '33');
INSERT INTO `subject` VALUES ('4', '心理测量者', '222', 'https://image.g-cores.com/96a3bbe5-b73d-4640-ba97-be39809e25e2.png?x-oss-process=style/original_hs', '333');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `gender` varchar(4) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'adiao', '12345687', '123456', '1234', '男', '2018-03-14');
