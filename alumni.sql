CREATE DATABASE  IF NOT EXISTS `sdd_primary` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sdd_primary`;
-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: localhost    Database: sdd_primary
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `academic_field`
--

DROP TABLE IF EXISTS `academic_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `academic_field` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `field_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `description` mediumtext CHARACTER SET utf8 COLLATE utf8_bin,
  `major` tinyint(4) DEFAULT NULL,
  `minor` tinyint(4) DEFAULT NULL,
  `concentration` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `field_id` (`id`),
  UNIQUE KEY `academic_field_field_name_uindex` (`field_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `account_type`
--

DROP TABLE IF EXISTS `account_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `account_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `acct_id` (`id`),
  UNIQUE KEY `account_type_type_name_uindex` (`type_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `club_roster`
--

DROP TABLE IF EXISTS `club_roster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `club_roster` (
  `club_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `added_on` datetime DEFAULT NULL,
  PRIMARY KEY (`club_id`,`user_id`),
  KEY `roster2users` (`user_id`),
  CONSTRAINT `club_roster_clubs_id_fk` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`id`),
  CONSTRAINT `club_roster_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clubs`
--

DROP TABLE IF EXISTS `clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `clubs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `club_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `description` mediumtext CHARACTER SET utf8 COLLATE utf8_bin,
  PRIMARY KEY (`id`),
  UNIQUE KEY `club_id` (`id`),
  UNIQUE KEY `clubs_club_name_uindex` (`club_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `user_id` int(11) NOT NULL,
  `expiration` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `session_id` (`id`),
  CONSTRAINT `sessions_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `first_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `grad_year` int(11) DEFAULT NULL,
  `industry` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `gpa` float DEFAULT NULL,
  `salary` float DEFAULT NULL,
  `picture` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `bio` mediumtext CHARACTER SET utf8 COLLATE utf8_bin,
  `comm_context` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `last_login_ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `major_primary` int(11) DEFAULT NULL,
  `major_secondary` int(11) DEFAULT NULL,
  `minor` int(11) DEFAULT NULL,
  `concentration` int(11) DEFAULT NULL,
  `account_type_id` int(11) DEFAULT NULL,
  `region` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_2` (`id`),
  KEY `user_id` (`id`),
  KEY `primary_major` (`major_primary`),
  KEY `secondary_major` (`major_secondary`),
  KEY `concentration` (`concentration`),
  KEY `minor` (`minor`),
  KEY `users2accounts` (`account_type_id`),
  KEY `user_id_3` (`id`),
  CONSTRAINT `users_account_type_id_fk` FOREIGN KEY (`account_type_id`) REFERENCES `account_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-24 16:38:17

