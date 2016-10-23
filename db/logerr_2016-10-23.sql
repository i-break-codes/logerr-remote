# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.6.26)
# Database: logerr
# Generation Time: 2016-10-23 12:40:09 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table tbl_logs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_logs`;

CREATE TABLE `tbl_logs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `err` text,
  `file_name` varchar(256) DEFAULT NULL,
  `line_no` int(11) DEFAULT NULL,
  `col_no` int(11) DEFAULT NULL,
  `stack_trace` text,
  `client_time` datetime DEFAULT NULL,
  `all_params` text,
  `user_agent` text,
  `referrer_url` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `badge` varchar(60) DEFAULT NULL,
  `is_read` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tbl_logs` WRITE;
/*!40000 ALTER TABLE `tbl_logs` DISABLE KEYS */;

INSERT INTO `tbl_logs` (`id`, `err`, `file_name`, `line_no`, `col_no`, `stack_trace`, `client_time`, `all_params`, `user_agent`, `referrer_url`, `created_at`, `updated_at`, `badge`, `is_read`)
VALUES
	(1,'Uncaught ReferenceError: s is not defined','test.js',3,23,'ReferenceError: s is not defined    at http://localhost:8888/jerror/test.js:3:23','2016-10-23 18:09:02','{\"type\":\"error\",\"path\":\"http://localhost:8888/jerror/test.js\",\"filename\":\"test.js\",\"line\":\"3\",\"column\":\"23\",\"error\":\"Uncaught ReferenceError: s is not defined\",\"stackTrace\":\"ReferenceError: s is not defined    at http://localhost:8888/jerror/test.js:3:23\",\"datetime\":\"Sun Oct 23 2016 18:09:02 GMT+0530 (IST)\",\"userAgent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36\",\"cookieEnabled\":\"true\",\"badge\":\"development\"}','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36','http://localhost:8888/jerror/','2016-10-23 18:09:02','2016-10-23 18:09:02','development',NULL);

/*!40000 ALTER TABLE `tbl_logs` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
