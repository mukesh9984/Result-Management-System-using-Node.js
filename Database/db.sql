CREATE DATABASE  IF NOT EXISTS `nodejsassignment` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `nodejsassignment`;
-- MySQL dump 10.13  Distrib 8.0.14, for Win64 (x86_64)
--
-- Host: localhost    Database: nodejsassignment
-- ------------------------------------------------------
-- Server version	8.0.14

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
-- Table structure for table `add_student_data`
--

DROP TABLE IF EXISTS `add_student_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `add_student_data` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `rollNumber` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `dateOfBirth` varchar(50) DEFAULT NULL,
  `score` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `add_student_data`
--

LOCK TABLES `add_student_data` WRITE;
/*!40000 ALTER TABLE `add_student_data` DISABLE KEYS */;
INSERT INTO `add_student_data` VALUES (3,'25','prabhash sharma','2023-08-21','33'),(24,'220','ankush','2023-08-15','45');
/*!40000 ALTER TABLE `add_student_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachersignup`
--

DROP TABLE IF EXISTS `teachersignup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `teachersignup` (
  `Teacher_id` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Teacher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachersignup`
--

LOCK TABLES `teachersignup` WRITE;
/*!40000 ALTER TABLE `teachersignup` DISABLE KEYS */;
INSERT INTO `teachersignup` VALUES (1,'Prabhash','prabhashkaushik123@gmail.com','123'),(2,'Prabhash','jitendrasharma1021989@gmail.com','123'),(3,'vikas','vikas@gmail.com','1234'),(4,'ankush','ankush@gmail','1111'),(5,'bittu','bittu@gmail.com','12345'),(6,'ajit','ajit@gmail.com','123');
/*!40000 ALTER TABLE `teachersignup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-29 12:43:39
