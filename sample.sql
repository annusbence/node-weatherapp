-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.31 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table weatherapp.weatherapp
CREATE TABLE IF NOT EXISTS `weatherapp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(256) NOT NULL,
  `city` varchar(256) NOT NULL,
  `latitude` varchar(256) NOT NULL,
  `longitude` varchar(256) NOT NULL,
  `temp` varchar(256) NOT NULL,
  `pressure` varchar(256) NOT NULL,
  `humidity` varchar(256) NOT NULL,
  `windpower` varchar(256) NOT NULL,
  `winddirect` varchar(256) NOT NULL,
  `cloud` varchar(256) NOT NULL,
  `backgroundIMG` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table weatherapp.weatherapp: ~8 rows (approximately)
/*!40000 ALTER TABLE `weatherapp` DISABLE KEYS */;
INSERT INTO `weatherapp` (`id`, `date`, `city`, `latitude`, `longitude`, `temp`, `pressure`, `humidity`, `windpower`, `winddirect`, `cloud`, `backgroundIMG`) VALUES
	(1, '2022-11-25 08:39:46', 'Szeged', '46.253', '20.1482', '5', '1021', '78', '1', 'WSW', 'http://openweathermap.org/img/wn/01d@2x.png', 'url(img/01d.jpg)'),
	(2, '2022-11-25 08:39:44', 'Sopron', '47.685', '16.5905', '6', '1020', '67', '1', 'S', 'http://openweathermap.org/img/wn/01d@2x.png', 'url(img/01d.jpg)'),
	(3, '2022-11-25 08:39:42', 'Pécs', '46.0833', '18.2333', '6', '1021', '100', '5', 'W', 'http://openweathermap.org/img/wn/01d@2x.png', 'url(img/01d.jpg)'),
	(4, '2022-11-25 08:39:38', 'Miskolc', '48.1', '20.7833', '5', '1021', '79', '1', 'S', 'http://openweathermap.org/img/wn/03d@2x.png', 'url(img/03d.jpg)'),
	(5, '2022-11-25 08:39:31', 'Győr', '47.6833', '17.6351', '8', '1019', '81', '0', 'N', 'http://openweathermap.org/img/wn/01d@2x.png', 'url(img/01d.jpg)'),
	(6, '2022-11-25 08:39:48', 'Gyékényes', '46.2372', '17.009', '5', '1022', '77', '3', 'SW', 'http://openweathermap.org/img/wn/01d@2x.png', 'url(img/01d.jpg)'),
	(7, '2022-11-25 08:39:36', 'Debrecen', '47.5333', '21.6333', '3', '1021', '81', '2', 'NE', 'http://openweathermap.org/img/wn/04d@2x.png', 'url(img/04d.jpg)'),
	(8, '2022-11-25 08:39:28', 'Budapest', '47.498', '19.0399', '6', '1020', '85', '1', 'SSW', 'http://openweathermap.org/img/wn/50d@2x.png', 'url(img/50d.jpg)');
/*!40000 ALTER TABLE `weatherapp` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
