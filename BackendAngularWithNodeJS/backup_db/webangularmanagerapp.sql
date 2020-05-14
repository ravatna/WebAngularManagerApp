-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2020 at 10:36 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webangularmanagerapp`
--
CREATE DATABASE IF NOT EXISTS `webangularmanagerapp` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `webangularmanagerapp`;

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `personId` int(11) NOT NULL,
  `uname` varchar(32) DEFAULT NULL,
  `pword` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`personId`, `uname`, `pword`) VALUES
(4, 'admin5', 'admin3');

-- --------------------------------------------------------

--
-- Table structure for table `addresss`
--

DROP TABLE IF EXISTS `addresss`;
CREATE TABLE `addresss` (
  `personId` int(11) NOT NULL,
  `address` varchar(50) DEFAULT '',
  `address2` varchar(50) DEFAULT '',
  `city` varchar(50) DEFAULT '',
  `state_province` varchar(20) DEFAULT '',
  `zip_postal` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `event` varchar(250) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `event_logs`
--

DROP TABLE IF EXISTS `event_logs`;
CREATE TABLE `event_logs` (
  `id` int(15) UNSIGNED ZEROFILL NOT NULL,
  `module_name` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `log_name` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `log_type` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `log_desp` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `log_reg` datetime DEFAULT NULL,
  `log_by` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loginlogs`
--

DROP TABLE IF EXISTS `loginlogs`;
CREATE TABLE `loginlogs` (
  `personId` int(11) NOT NULL,
  `loginTime` datetime NOT NULL,
  `logoutTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `personal`
--

DROP TABLE IF EXISTS `personal`;
CREATE TABLE `personal` (
  `id` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL DEFAULT '',
  `lastName` varchar(20) NOT NULL DEFAULT '',
  `passport` varchar(15) DEFAULT '',
  `idcard` varchar(13) DEFAULT '',
  `gender` varchar(1) DEFAULT '' COMMENT 'Default [F,M]',
  `email` varchar(32) NOT NULL,
  `email2` varchar(100) DEFAULT NULL,
  `saltKey` varchar(50) DEFAULT NULL,
  `phone` varchar(15) NOT NULL,
  `phone2` varchar(15) DEFAULT NULL,
  `phone3` varchar(15) DEFAULT NULL,
  `imageCard13` varchar(100) DEFAULT NULL,
  `whatApp` varchar(50) DEFAULT NULL,
  `line1` varchar(100) DEFAULT NULL,
  `line2` varchar(100) DEFAULT NULL,
  `line3` varchar(100) DEFAULT NULL,
  `typeMember` varchar(10) DEFAULT NULL,
  `typeDealer` varchar(10) DEFAULT NULL,
  `profileDocument` varchar(150) DEFAULT NULL,
  `imageProfile` varchar(150) DEFAULT NULL,
  `imageProfileIcon` varchar(150) DEFAULT NULL,
  `fromOnline` enum('FACEBOOK','GOOGLE','WEB','APP','NONE') DEFAULT NULL,
  `fromOnlineKey` varchar(200) DEFAULT NULL,
  `otp` varchar(15) DEFAULT NULL,
  `otpUpdate` datetime DEFAULT NULL,
  `regDate` datetime DEFAULT NULL,
  `confirmDate` datetime DEFAULT NULL,
  `confirmBy` varchar(50) DEFAULT NULL,
  `lastUpdate` datetime DEFAULT NULL,
  `expDate` datetime DEFAULT NULL,
  `statusPersonal` enum('Enable','Disable') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table Personal ';

--
-- Dumping data for table `personal`
--

INSERT INTO `personal` (`id`, `firstName`, `lastName`, `passport`, `idcard`, `gender`, `email`, `email2`, `saltKey`, `phone`, `phone2`, `phone3`, `imageCard13`, `whatApp`, `line1`, `line2`, `line3`, `typeMember`, `typeDealer`, `profileDocument`, `imageProfile`, `imageProfileIcon`, `fromOnline`, `fromOnlineKey`, `otp`, `otpUpdate`, `regDate`, `confirmDate`, `confirmBy`, `lastUpdate`, `expDate`, `statusPersonal`) VALUES
(4, 'wuttichai', 'ratanapron', '1234567890', '1234567890', 'M', 'admin.wuttichai1@clexpert.net', NULL, NULL, '0999999991', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`personId`);

--
-- Indexes for table `addresss`
--
ALTER TABLE `addresss`
  ADD PRIMARY KEY (`personId`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_logs`
--
ALTER TABLE `event_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loginlogs`
--
ALTER TABLE `loginlogs`
  ADD PRIMARY KEY (`personId`,`loginTime`);

--
-- Indexes for table `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `phone_UNIQUE` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_logs`
--
ALTER TABLE `event_logs`
  MODIFY `id` int(15) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal`
--
ALTER TABLE `personal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
