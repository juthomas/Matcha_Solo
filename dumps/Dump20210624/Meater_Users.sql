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
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `picture` varchar(45) DEFAULT NULL,
  `old` int DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `mail_verified` tinyint DEFAULT '0',
  `verification_code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idUsers_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=427 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (393,'Léon@gmail.com','lévendredi','LéonMDP','Léon',NULL,NULL,27,'Male',-8.35717,99.4996,'Vendredi',0,NULL),(394,'Mathys@gmail.com','mamercredi','MathysMDP','Mathys',NULL,NULL,19,'Male',38.9267,-53.1396,'Mercredi',0,NULL),(395,'Timéo@gmail.com','tidimanche','TiméoMDP','Timéo',NULL,NULL,20,'Male',63.3021,108.028,'Dimanche',0,NULL),(396,'Mathieu@gmail.com','mamardi','MathieuMDP','Mathieu',NULL,NULL,29,'Male',44.0441,23.6085,'Mardi',0,NULL),(397,'Côme@gmail.com','côsamedi','CômeMDP','Côme',NULL,NULL,18,'Male',11.7591,49.1292,'Samedi',0,NULL),(398,'Lucas@gmail.com','lusamedi','LucasMDP','Lucas',NULL,NULL,18,'Male',0.213388,167.645,'Samedi',0,NULL),(399,'Naël@gmail.com','nalundi','NaëlMDP','Naël',NULL,NULL,27,'Male',56.6195,-57.431,'Lundi',0,NULL),(400,'Mathys@gmail.com','mamercredi','MathysMDP','Mathys',NULL,NULL,26,'Male',-10.7735,-63.521,'Mercredi',0,NULL),(401,'Mehdi@gmail.com','mejeudi','MehdiMDP','Mehdi',NULL,NULL,27,'Male',67.5577,-55.8744,'Jeudi',0,NULL),(402,'Malo@gmail.com','mamardi','MaloMDP','Malo',NULL,NULL,21,'Male',6.37499,-125.438,'Mardi',0,NULL),(403,'Jad@gmail.com','jajeudi','JadMDP','Jad',NULL,NULL,22,'Male',47.8594,13.8865,'Jeudi',0,NULL),(404,'Axel@gmail.com','axlundi','AxelMDP','Axel',NULL,NULL,21,'Male',-8.09951,121.577,'Lundi',0,NULL),(405,'Yanis@gmail.com','yalundi','YanisMDP','Yanis',NULL,NULL,24,'Male',15.8242,-95.9089,'Lundi',0,NULL),(406,'Mehdi@gmail.com','melundi','MehdiMDP','Mehdi',NULL,NULL,25,'Male',-37.2823,99.5841,'Lundi',0,NULL),(407,'Aylan@gmail.com','ayjeudi','AylanMDP','Aylan',NULL,NULL,26,'Male',51.0283,105.284,'Jeudi',0,NULL),(408,'Thibault@gmail.com','thsamedi','ThibaultMDP','Thibault',NULL,NULL,27,'Male',-4.90208,134.054,'Samedi',0,NULL),(409,'Roméo@gmail.com','rodimanche','RoméoMDP','Roméo',NULL,NULL,27,'Male',34.7673,-102.581,'Dimanche',0,NULL),(410,'Selim@gmail.com','semercredi','SelimMDP','Selim',NULL,NULL,19,'Male',24.1617,29.6781,'Mercredi',0,NULL),(411,'Alban@gmail.com','allundi','AlbanMDP','Alban',NULL,NULL,18,'Male',79.292,-17.8985,'Lundi',0,NULL),(412,'Florian@gmail.com','fljeudi','FlorianMDP','Florian',NULL,NULL,22,'Male',27.6461,126.817,'Jeudi',0,NULL),(413,'root','root','root','root','','',25,'male',-24,11,'root',1,'3131'),(426,'linx.le.vru@gmail.com','test','test','test',NULL,NULL,NULL,NULL,NULL,NULL,'test',1,'4025');
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

-- Dump completed on 2021-06-24  4:46:19
