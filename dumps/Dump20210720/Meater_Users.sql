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
  `password` varchar(100) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `mail_verified` tinyint DEFAULT '0',
  `verification_code` varchar(45) DEFAULT NULL,
  `reset_code` varchar(45) DEFAULT NULL,
  `dateOfCreation` varchar(45) DEFAULT NULL,
  `lastConnection` varchar(45) DEFAULT NULL,
  `number_of_likes` int DEFAULT '0',
  `orientation` varchar(45) DEFAULT NULL,
  `size` int DEFAULT NULL,
  `inspiration` varchar(45) DEFAULT NULL,
  `technique` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `htags` varchar(45) DEFAULT NULL,
  `image1` varchar(45) DEFAULT NULL,
  `image2` varchar(45) DEFAULT NULL,
  `image3` varchar(45) DEFAULT NULL,
  `image4` varchar(45) DEFAULT NULL,
  `image5` varchar(45) DEFAULT NULL,
  `description` varchar(400) DEFAULT 'No description',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idUsers_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=508 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (450,'Marceau@gmail.com','madimanche','$2b$10$Cux28t/GZe0iPKkda1CG7eX42g5Qlz0veWcA6nI3zdLN0108Yiwri','Marceau',NULL,20,'Male',17.9421,57.9897,'Dimanche',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(451,'Romain@gmail.com','rosamedi','$2b$10$Iko7lXZxzq.Wy3ihdl6WeeFlBDl3A1eE.lJLvRBRG8isQaMfOV3.i','Romain',NULL,24,'Male',37.0346,-73.6357,'Samedi',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(452,'Gabin@gmail.com','gajeudi','$2b$10$SQYGWlu5swVCc2Baq9jPyu9oees8OhDT6vWBxxJcXfty8GsVPBw0W','Gabin',NULL,24,'Male',-32.3859,-163.192,'Jeudi',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(453,'Théophile@gmail.com','thlundi','$2b$10$1t0QFiKbInJxq8OpZlJ1FO8046XdnOxXM7BkkkZC7SMVyMBkUf/Xy','Théophile',NULL,26,'Male',-24.7656,-141.247,'Lundi',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(454,'Sandro@gmail.com','savendredi','$2b$10$uPlT1bDD1Kfb9wERpjJmbugYD/mbSejMsmiHpHM6D6TJ7ogOSBJsa','Sandro',NULL,26,'Male',-32.764,53.5544,'Vendredi',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(455,'Adam@gmail.com','addimanche','$2b$10$MYETlD2P/Lcw7JFneryFWeG2e14LKY.geKMHKxpFGnIDWN0H3wjCm','Adam',NULL,28,'Male',-24.7927,-28.1364,'Dimanche',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(456,'Axel@gmail.com','axjeudi','$2b$10$fs1H2Q5wCkmF/3360XCjkO3B7va/CxijJO/Hj3RvqMWU8w5.Hh3Ge','Axel',NULL,29,'Male',-30.8753,-177.697,'Jeudi',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(457,'Charles@gmail.com','chmardi','$2b$10$GZrvuY3BB52hxJNhsducXeYKATENLqITQWNCnKhNsKATuZY59qxXe','Charles',NULL,21,'Male',13.3778,-174.661,'Mardi',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(458,'Thibault@gmail.com','thdimanche','$2b$10$J0V7XiHg5U8zFM/fHkrVI.2TuIWaLhyqpRs4K.NBFHhyU4Vnqw4a6','Thibault',NULL,25,'Male',64.2373,-117.894,'Dimanche',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(459,'Côme@gmail.com','côdimanche','$2b$10$vJgzNDVY/KIfEGaEyEBmUeuM/ryCL0/9etdWWLHaEAv.0dnC9PqZi','Côme',NULL,25,'Male',55.8263,38.9505,'Dimanche',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(460,'Armand@gmail.com','armercredi','$2b$10$NySkovOi.mvNq7LYDHhZKOVPqfMrmJC8HXP4Ln3J8OaoKF6WmtGjG','Armand',NULL,24,'Male',-14.5679,-169.146,'Mercredi',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(461,'Rayan@gmail.com','ravendredi','$2b$10$UweH1PwM11IQtPywW28BJeU.Wl6JoX4KqtOJ3i101m5tuyZMPT7l.','Rayan',NULL,28,'Male',-2.30401,-68.4603,'Vendredi',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(462,'Ibrahim@gmail.com','ibsamedi','$2b$10$d1mkjqHeDEDHlJjzgsTZkuSOqjbGg2xr1bTCUvHrqYNbJWuyHAkMe','Ibrahim',NULL,22,'Male',-35.9533,107.053,'Samedi',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(463,'Ilyan@gmail.com','ilmercredi','$2b$10$O2J0/pmXShiwaEzleKD4re92nq9xKpmmc8WGHelwyVhR9d.xjauB6','Ilyan',NULL,23,'Male',-11.8151,-130.493,'Mercredi',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(464,'César@gmail.com','céjeudi','$2b$10$PuCZgwXxY6dN1Xfz7b9NB.2leMO3oRmhFFUlw7JRJGA7etfKdvnfS','César',NULL,24,'Male',5.46777,-120.11,'Jeudi',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(465,'Ahmed@gmail.com','ahsamedi','$2b$10$.rKofLX7vpQzzxjrtNJcnOADmo9E5wvAgEG8ozadEP5J5IAFKu026','Ahmed',NULL,28,'Male',29.4249,-113.144,'Samedi',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(466,'Naël@gmail.com','nalundi','$2b$10$yGT8bu/GHHDVbxYN2fgYeuQPY2K55F8C9JtGX8Ipm6XKbjHtkfvO2','Naël',NULL,29,'Male',43.098,-143.584,'Lundi',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(467,'Ayoub@gmail.com','aymercredi','$2b$10$4WB.BZalKqHmsRHOKCtOz.yKM/DRowpkrl9gxRQYsR0uyQzPiHR/6','Ayoub',NULL,23,'Male',24.7294,112.522,'Mercredi',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(468,'Charles@gmail.com','chvendredi','$2b$10$9F84aYDwnvGccKvp4wGFXOXizczqtQjvzX7XzdSruf.ZwWo67bX0O','Charles',NULL,18,'Male',-1.94339,76.3218,'Vendredi',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(469,'Ahmed@gmail.com','ahdimanche','$2b$10$opS4Vr4nC0ojH13o1zuh1Ootd81MnihjicwqcW2fQ7gr6gtmiiVG.','Ahmed',NULL,20,'Male',33.5348,100.674,'Dimanche',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(470,'root','root','root','root','',25,'male',-24,11,'root',0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description'),(507,'linx.le.vru@gmail.com','test','$2b$10$.bPEOcJKbXYn0DBBVXpQtOwXcitHkM3NTgTkTGJZFPwQ05S96VeRS','test',NULL,NULL,NULL,48.8835,2.3219,'test',1,'2301',NULL,'2021-07-20 00:05:51','2021-07-20 01:22:16',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No description');
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

-- Dump completed on 2021-07-20  2:10:54
