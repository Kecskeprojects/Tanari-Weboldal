-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Jan 28. 14:41
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

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
-- Létrehozva: 2024. Jan 12. 21:39
-- Utolsó frissítés: 2024. Jan 28. 13:25
--

CREATE TABLE IF NOT EXISTS `file` (
  `FileId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) NOT NULL,
  `Extension` varchar(10) NOT NULL,
  `Content` longblob NOT NULL,
  `NavId` int(11) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`FileId`),
  KEY `Index_FileNavId` (`NavId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI `file`:
--   `NavId`
--       `nav` -> `NavId`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `link`
--
-- Létrehozva: 2024. Jan 28. 13:29
-- Utolsó frissítés: 2024. Jan 28. 13:29
--

CREATE TABLE IF NOT EXISTS `link` (
  `LinkId` int(11) NOT NULL AUTO_INCREMENT,
  `Url` varchar(500) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `OpenNewTab` bit(1) NOT NULL DEFAULT 0,
  `NavId` int(11) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`LinkId`),
  KEY `Index_LinkNavId` (`NavId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI `link`:
--   `NavId`
--       `nav` -> `NavId`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `nav`
--
-- Létrehozva: 2024. Jan 12. 21:39
--

CREATE TABLE IF NOT EXISTS `nav` (
  `NavId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Url` varchar(500) DEFAULT NULL,
  `ParentNavId` int(11) DEFAULT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`NavId`),
  KEY `Index_ParentNavId` (`ParentNavId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI `nav`:
--   `ParentNavId`
--       `nav` -> `NavId`
--

--
-- A tábla adatainak kiíratása `nav`
--

INSERT INTO `nav` (`NavId`,`Name`, `Url`, `ParentNavId`, `CreatedOn`) VALUES
(1, 'Test-nav', 'test-nav', NULL, CURRENT_TIMESTAMP),
(2, 'Test-nav 2', 'test2', 1, CURRENT_TIMESTAMP);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `visit`
--
-- Létrehozva: 2024. Jan 28. 13:38
--

CREATE TABLE IF NOT EXISTS `visit` (
  `VisitorId` int(11) NOT NULL AUTO_INCREMENT,
  `VisitCount` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `CreatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  `ModifiedOn` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`VisitorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI `visit`:
--

--
-- A tábla adatainak kiíratása `nav`
--

INSERT INTO `visit` (`VisitorId`, `VisitCount`, `CreatedOn`, `ModifiedOn`) VALUES
(1, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

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
