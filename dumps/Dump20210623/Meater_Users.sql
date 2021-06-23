-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: Meater
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mail` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `picture` varchar(45) DEFAULT NULL,
  `old` int DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idUsers_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=292 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (252,'Achille@gmail.com','AchilleMDP','Achille',NULL,NULL,20,'Male',62.9796,113.655),(253,'Ilyes@gmail.com','IlyesMDP','Ilyes',NULL,NULL,22,'Male',50.1344,-116.391),(254,'Matéo@gmail.com','MatéoMDP','Matéo',NULL,NULL,19,'Male',-23.4027,-45.0445),(255,'Timéo@gmail.com','TiméoMDP','Timéo',NULL,NULL,29,'Male',72.1864,110.724),(256,'Kaïs@gmail.com','KaïsMDP','Kaïs',NULL,NULL,23,'Male',2.26537,156.004),(257,'Aurélien@gmail.com','AurélienMDP','Aurélien',NULL,NULL,26,'Male',65.3193,-95.9868),(258,'Marwan@gmail.com','MarwanMDP','Marwan',NULL,NULL,23,'Male',62.097,122.767),(259,'Auguste@gmail.com','AugusteMDP','Auguste',NULL,NULL,23,'Male',49.7498,29.5008),(260,'Armand@gmail.com','ArmandMDP','Armand',NULL,NULL,26,'Male',32.9142,56.5474),(261,'Daniel@gmail.com','DanielMDP','Daniel',NULL,NULL,27,'Male',-37.4472,52.9046),(262,'Thibault@gmail.com','ThibaultMDP','Thibault',NULL,NULL,27,'Male',21.8906,-141.42),(263,'Antoine@gmail.com','AntoineMDP','Antoine',NULL,NULL,29,'Male',-16.4055,96.93),(264,'Naïm@gmail.com','NaïmMDP','Naïm',NULL,NULL,21,'Male',10.877,77.6979),(265,'Mehdi@gmail.com','MehdiMDP','Mehdi',NULL,NULL,18,'Male',32.5747,88.6026),(266,'Gabriel@gmail.com','GabrielMDP','Gabriel',NULL,NULL,24,'Male',73.0386,169.949),(267,'Esteban@gmail.com','EstebanMDP','Esteban',NULL,NULL,27,'Male',46.1573,103.788),(268,'Selim@gmail.com','SelimMDP','Selim',NULL,NULL,27,'Male',72.1603,49.4987),(269,'Esteban@gmail.com','EstebanMDP','Esteban',NULL,NULL,20,'Male',57.696,130.44),(270,'Pierre@gmail.com','PierreMDP','Pierre',NULL,NULL,29,'Male',-30.0464,88.8201),(271,'Nael@gmail.com','NaelMDP','Nael',NULL,NULL,18,'Male',17.7849,90.9398),(272,'Auguste@gmail.com','AugusteMDP','Auguste',NULL,NULL,28,'Male',-8.20044,-81.7432),(273,'Gabriel@gmail.com','GabrielMDP','Gabriel',NULL,NULL,25,'Male',-39.7517,-90.7913),(274,'Auguste@gmail.com','AugusteMDP','Auguste',NULL,NULL,19,'Male',76.2092,47.4251),(275,'Mathéo@gmail.com','MathéoMDP','Mathéo',NULL,NULL,19,'Male',60.1063,73.9605),(276,'David@gmail.com','DavidMDP','David',NULL,NULL,19,'Male',-36.8408,7.83911),(277,'Noham@gmail.com','NohamMDP','Noham',NULL,NULL,25,'Male',59.7715,-35.8479),(278,'Naël@gmail.com','NaëlMDP','Naël',NULL,NULL,21,'Male',26.9743,-95.9598),(279,'Ilian@gmail.com','IlianMDP','Ilian',NULL,NULL,24,'Male',48.2739,173.893),(280,'Haroun@gmail.com','HarounMDP','Haroun',NULL,NULL,24,'Male',52.447,-32.0859),(281,'Ismaël@gmail.com','IsmaëlMDP','Ismaël',NULL,NULL,21,'Male',7.22075,-127.183),(282,'Louis@gmail.com','LouisMDP','Louis',NULL,NULL,26,'Male',-36.9649,176.038),(283,'Arthur@gmail.com','ArthurMDP','Arthur',NULL,NULL,29,'Male',-31.1595,-1.45043),(284,'Maël@gmail.com','MaëlMDP','Maël',NULL,NULL,25,'Male',5.07866,-6.19742),(285,'Luca@gmail.com','LucaMDP','Luca',NULL,NULL,20,'Male',56.7883,-120.873),(286,'Amine@gmail.com','AmineMDP','Amine',NULL,NULL,19,'Male',17.8097,162.113),(287,'Adrien@gmail.com','AdrienMDP','Adrien',NULL,NULL,24,'Male',-29.1982,-113.514),(288,'Eliott@gmail.com','EliottMDP','Eliott',NULL,NULL,22,'Male',25.5251,94.3505),(289,'Kamil@gmail.com','KamilMDP','Kamil',NULL,NULL,25,'Male',-17.8859,133.028),(290,'Oscar@gmail.com','OscarMDP','Oscar',NULL,NULL,23,'Male',50.3189,109.107),(291,'César@gmail.com','CésarMDP','César',NULL,NULL,18,'Male',7.30958,18.2907);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-23 18:25:54
