-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 05, 2020 at 02:50 PM
-- Server version: 10.1.44-MariaDB-1~bionic
-- PHP Version: 7.4.1

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
-- Table structure for table `clubs`
--

CREATE TABLE `clubs` (
  `id` int(11) NOT NULL,
  `club_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` mediumtext COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `club_roster`
--

CREATE TABLE `club_roster` (
  `club_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start` datetime DEFAULT CURRENT_TIMESTAMP,
  `end` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `sortname` varchar(3) NOT NULL,
  `name` varchar(150) NOT NULL,
  `phonecode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `major`
--

CREATE TABLE `major` (
  `id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `label` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `id` int(11) NOT NULL,
  `label` varchar(255) COLLATE utf8_bin NOT NULL,
  `description` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `country_id` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `oauth_token` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `grad_date` date DEFAULT NULL,
  `industry` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `picture` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `bio` mediumtext COLLATE utf8_bin,
  `isadmin` tinyint(1) NOT NULL DEFAULT '0',
  `major_id` int(11) DEFAULT NULL,
  `minor` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `oauth_token`, `email`, `first_name`, `last_name`, `grad_date`, `industry`, `picture`, `bio`, `isadmin`, `major_id`, `minor`, `country_id`, `state_id`, `school_id`) VALUES
(1, '2779322225497712', 'jmessare46@gmail.com', 'Joseph', 'Messare', '2020-05-25', NULL, '2779322225497712.jpeg', '<p>Tstsdf</p>\r\n<p>sdf asdf as df<strong>asdf as dfa sdf ds</strong></p>\r\n<p style=\"text-align: right;\"><strong>&nbsp;asd ds<em>a sdfd fdfd</em></strong></p>', 0, 120, 'asdfdsf', 231, 3920, 4),
(2, '1232123', 'fake@rpi.edu', 'John', 'Doe', '2018-05-01', 'Engineering', NULL, '<p>Something amazing about me</p>', 0, 122, 'Something cool', 231, 3953, 1),
(3, '3114732755212436', 'loganramos@comcast.net', 'Logan', 'Ramos', '2020-12-20', NULL, '3114732755212436.png', '<p><iframe src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\" width=\"560\" height=\"314\" allowfullscreen=\"allowfullscreen\"></iframe></p>\r\n<p>&nbsp;</p>\r\n<p>CS and ITWS major. RPI 2021&nbsp;</p>\r\n<p><img src=\"https://images-na.ssl-images-amazon.com/images/I/41AHRu6tDSL._AC_.jpg\" alt=\"\" width=\"344\" height=\"507\" /></p>', 0, 106, '', 231, 3943, 3),
(4, '8456789456123485', 'volkb@myspace.net', 'Ben', 'Volk', '2020-12-20', 'Pharma', '8456789456123485.jpg', '<p><iframe src=\"https://www.youtube.com/watch?v=YUakLzaboMo\" width=\"560\" height=\"314\" allowfullscreen=\"allowfullscreen\"></iframe></p>\r\n<p>&nbsp;</p>\r\n<p>ITWS masters student. RPI 2020&nbsp;</p>\r\n<p><img src=\"https://ewscripps.brightspotcdn.com/dims4/default/925c8c4/2147483647/strip/true/crop/1024x576+0+224/resize/1280x720!/quality/90/?url=https%3A%2F%2Fewscripps.brightspotcdn.com%2Fee%2F0f%2F2716ebd9453a9750448b36367a56%2Fenimfnqwsaa6l9w.jpeg\" alt=\"\" width=\"344\" height=\"507\" /></p>', 0, 106, '', 231, 3943, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clubs`
--
ALTER TABLE `clubs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `club_id` (`id`),
  ADD UNIQUE KEY `clubs_club_name_uindex` (`club_name`);

--
-- Indexes for table `club_roster`
--
ALTER TABLE `club_roster`
  ADD PRIMARY KEY (`club_id`,`user_id`),
  ADD KEY `roster2users` (`user_id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `major`
--
ALTER TABLE `major`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_major_school` (`label`,`school_id`) USING BTREE,
  ADD KEY `school_fk` (`school_id`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_school_name` (`label`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`,`country_id`),
  ADD KEY `country_fk` (`country_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id_2` (`id`),
  ADD KEY `user_id` (`id`),
  ADD KEY `primary_major` (`major_id`),
  ADD KEY `minor` (`minor`),
  ADD KEY `user_id_3` (`id`),
  ADD KEY `state_user_fk` (`state_id`),
  ADD KEY `country_user_fk` (`country_id`),
  ADD KEY `school_user_fk` (`school_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clubs`
--
ALTER TABLE `clubs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `major`
--
ALTER TABLE `major`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `club_roster`
--
ALTER TABLE `club_roster`
  ADD CONSTRAINT `club_roster_clubs_id_fk` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`id`),
  ADD CONSTRAINT `club_roster_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `major`
--
ALTER TABLE `major`
  ADD CONSTRAINT `school_fk` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`);

--
-- Constraints for table `state`
--
ALTER TABLE `state`
  ADD CONSTRAINT `country_fk` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `country_user_fk` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`),
  ADD CONSTRAINT `major_fk` FOREIGN KEY (`major_id`) REFERENCES `major` (`id`),
  ADD CONSTRAINT `school_user_fk` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`),
  ADD CONSTRAINT `state_user_fk` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
