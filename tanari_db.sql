-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Jan 07. 19:46
-- Kiszolgáló verziója: 10.4.22-MariaDB
-- PHP verzió: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `tanari_db`
--
CREATE DATABASE IF NOT EXISTS `tanari_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `tanari_db`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `file`
--

CREATE TABLE IF NOT EXISTS `file` (
  `FileId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `Extension` varchar(10) COLLATE utf8_hungarian_ci NOT NULL,
  `Content` longblob NOT NULL,
  `NavId` int(11) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`FileId`),
  KEY `Index_FileNavId` (`NavId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `link`
--

CREATE TABLE IF NOT EXISTS `link` (
  `LinkId` int(11) NOT NULL AUTO_INCREMENT,
  `Url` varchar(500) COLLATE utf8_hungarian_ci NOT NULL,
  `Title` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `NavId` int(11) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`LinkId`),
  KEY `Index_LinkNavId` (`NavId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `nav`
--

CREATE TABLE IF NOT EXISTS `nav` (
  `NavId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `Url` varchar(500) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `ParentNavId` int(11) DEFAULT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`NavId`),
  KEY `Index_ParentNavId` (`ParentNavId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `FK_FileNavId_Nav` FOREIGN KEY (`NavId`) REFERENCES `nav` (`NavId`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Megkötések a táblához `link`
--
ALTER TABLE `link`
  ADD CONSTRAINT `FK_LinkNavId_Nav` FOREIGN KEY (`NavId`) REFERENCES `nav` (`NavId`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Megkötések a táblához `nav`
--
ALTER TABLE `nav`
  ADD CONSTRAINT `FK_ParentNavId_NavId` FOREIGN KEY (`ParentNavId`) REFERENCES `nav` (`NavId`) ON DELETE SET NULL ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
