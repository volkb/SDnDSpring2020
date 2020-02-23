-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2020 at 12:21 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sdd_primary`
--
CREATE DATABASE IF NOT EXISTS `sdd_primary` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `sdd_primary`;

-- --------------------------------------------------------

--
-- Table structure for table `academic_field`
--

DROP TABLE IF EXISTS `academic_field`;
CREATE TABLE IF NOT EXISTS `academic_field` (
  `field_id` int(11) NOT NULL AUTO_INCREMENT,
  `field_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` mediumtext COLLATE utf8_bin,
  `major` tinyint(4) DEFAULT NULL,
  `minor` tinyint(4) DEFAULT NULL,
  `concentration` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`field_id`),
  UNIQUE KEY `field_id` (`field_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `account_type`
--

DROP TABLE IF EXISTS `account_type`;
CREATE TABLE IF NOT EXISTS `account_type` (
  `acct_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`acct_id`),
  UNIQUE KEY `acct_id` (`acct_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `clubs`
--

DROP TABLE IF EXISTS `clubs`;
CREATE TABLE IF NOT EXISTS `clubs` (
  `club_id` int(11) NOT NULL AUTO_INCREMENT,
  `club_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` mediumtext COLLATE utf8_bin,
  PRIMARY KEY (`club_id`),
  UNIQUE KEY `club_id` (`club_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `club_roaster`
--

DROP TABLE IF EXISTS `club_roaster`;
CREATE TABLE IF NOT EXISTS `club_roaster` (
  `club_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `added_on` datetime DEFAULT NULL,
  PRIMARY KEY (`club_id`,`user_id`),
  KEY `roster2users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(255) COLLATE utf8_bin NOT NULL,
  `user_id` int(11) NOT NULL,
  `expiration` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `session_id` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `grad_year` int(11) DEFAULT NULL,
  `industry` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `gpa` float DEFAULT NULL,
  `salary` float DEFAULT NULL,
  `picture` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `bio` mediumtext COLLATE utf8_bin,
  `comm_context` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `last_login_ip` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `major_primary` int(11) DEFAULT NULL,
  `major_secondary` int(11) DEFAULT NULL,
  `minor` int(11) DEFAULT NULL,
  `concentration` int(11) DEFAULT NULL,
  `acct_type` int(11) DEFAULT NULL,
  `region` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_2` (`user_id`),
  KEY `user_id` (`user_id`),
  KEY `primary_major` (`major_primary`),
  KEY `secondary_major` (`major_secondary`),
  KEY `concentration` (`concentration`),
  KEY `minor` (`minor`),
  KEY `users2accounts` (`acct_type`),
  KEY `user_id_3` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `club_roaster`
--
ALTER TABLE `club_roaster`
  ADD CONSTRAINT `roster2club` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`club_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `roster2users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `concentration` FOREIGN KEY (`concentration`) REFERENCES `academic_field` (`field_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `minor` FOREIGN KEY (`minor`) REFERENCES `academic_field` (`field_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `primary_major` FOREIGN KEY (`major_primary`) REFERENCES `academic_field` (`field_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `secondary_major` FOREIGN KEY (`major_secondary`) REFERENCES `academic_field` (`field_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `users2accounts` FOREIGN KEY (`acct_type`) REFERENCES `account_type` (`acct_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
