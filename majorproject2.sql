-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: majorproject
-- ------------------------------------------------------
-- Server version	5.7.28-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appliedjobs`
--

DROP TABLE IF EXISTS `appliedjobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appliedjobs` (
  `PersonalId` int(11) NOT NULL AUTO_INCREMENT,
  `CompanyName` varchar(20) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  `JobId` int(11) NOT NULL,
  `Status` varchar(10) NOT NULL,
  `DateofApplication` varchar(20) NOT NULL,
  PRIMARY KEY (`PersonalId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appliedjobs`
--

LOCK TABLES `appliedjobs` WRITE;
/*!40000 ALTER TABLE `appliedjobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `appliedjobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logintable`
--

DROP TABLE IF EXISTS `logintable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logintable` (
  `SrNo` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Username` varchar(25) NOT NULL,
  `companyname` varchar(25) DEFAULT NULL,
  `EmailId` varchar(25) NOT NULL,
  `PhoneNo` varchar(10) NOT NULL,
  `Address` varchar(25) NOT NULL,
  `Password` varchar(25) NOT NULL,
  `Type` varchar(25) NOT NULL,
  PRIMARY KEY (`SrNo`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logintable`
--

LOCK TABLES `logintable` WRITE;
/*!40000 ALTER TABLE `logintable` DISABLE KEYS */;
INSERT INTO `logintable` VALUES (1,'sharmamayank','','sharmamayank@gmail.com','9977223760','Bairagarh, Bhopal','sharmamayank','user'),(3,'geetika','','geetika@gmail.com','9340341873','Biaora','geetika','user');
/*!40000 ALTER TABLE `logintable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useracademicseducation`
--

DROP TABLE IF EXISTS `useracademicseducation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `useracademicseducation` (
  `PersonalId` int(11) NOT NULL,
  `InstituteName` varchar(20) NOT NULL,
  `Program` varchar(10) NOT NULL,
  `StartDate` varchar(10) NOT NULL,
  `EndDate` varchar(10) NOT NULL,
  `GradeScale` varchar(20) NOT NULL,
  `GradeObtained` varchar(5) NOT NULL,
  `MajorSubjectI` varchar(20) NOT NULL,
  `MajorSubjectII` varchar(20) NOT NULL,
  PRIMARY KEY (`PersonalId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useracademicseducation`
--

LOCK TABLES `useracademicseducation` WRITE;
/*!40000 ALTER TABLE `useracademicseducation` DISABLE KEYS */;
/*!40000 ALTER TABLE `useracademicseducation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useracademicsexperience`
--

DROP TABLE IF EXISTS `useracademicsexperience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `useracademicsexperience` (
  `PersonalId` int(11) NOT NULL,
  `CompanyName` varchar(20) NOT NULL,
  `StartDate` varchar(10) NOT NULL,
  `EndDate` varchar(10) NOT NULL,
  `Description` varchar(20) NOT NULL,
  PRIMARY KEY (`PersonalId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useracademicsexperience`
--

LOCK TABLES `useracademicsexperience` WRITE;
/*!40000 ALTER TABLE `useracademicsexperience` DISABLE KEYS */;
/*!40000 ALTER TABLE `useracademicsexperience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userdetails`
--

DROP TABLE IF EXISTS `userdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userdetails` (
  `SrNo` int(11) NOT NULL,
  `PersonalId` int(11) NOT NULL AUTO_INCREMENT,
  `EmailId` varchar(20) NOT NULL,
  `DOB` varchar(10) NOT NULL,
  `Address` varchar(20) NOT NULL,
  `About` varchar(10) NOT NULL,
  PRIMARY KEY (`PersonalId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdetails`
--

LOCK TABLES `userdetails` WRITE;
/*!40000 ALTER TABLE `userdetails` DISABLE KEYS */;
INSERT INTO `userdetails` VALUES (1,1,'sharma@gmail.com','27-05-1998','Bairagarh','chess');
/*!40000 ALTER TABLE `userdetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-17 14:26:55
