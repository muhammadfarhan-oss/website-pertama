-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: absensi_halaqoh
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `attendance_date` date NOT NULL,
  `check_in` time DEFAULT NULL,
  `status` varchar(30) NOT NULL,
  `note` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,1,'2026-05-13','07:23:00','Hadir','Hadir tepat waktu','2026-06-09 05:16:08'),(2,2,'2026-05-13','08:12:00','Terlambat','Datang setelah muraja\'ah dimulai','2026-06-09 05:16:08'),(3,3,'2026-05-13','07:12:00','Hadir','Kehadiran paling awal','2026-06-09 05:16:08'),(4,4,'2026-05-13',NULL,'Sakit','Tidak hadir karena sakit','2026-06-09 05:16:08'),(5,5,'2026-05-13',NULL,'Izin','Izin karena sakit','2026-06-09 05:16:08'),(6,6,'2026-05-13','07:51:00','Hadir','Siap mengikuti setoran hafalan','2026-06-09 05:16:08'),(7,1,'2026-04-12','07:27:00','Hadir','Arsip bulan lalu','2026-06-09 05:16:08'),(8,2,'2026-03-12','07:58:00','Hadir','Arsip Maret','2026-06-09 05:16:08'),(9,3,'2026-02-15','07:35:00','Hadir','Arsip Februari','2026-06-09 05:16:08'),(10,4,'2026-01-18',NULL,'Sakit','Arsip Januari','2026-06-09 05:16:08');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `report_format` varchar(20) NOT NULL DEFAULT 'DOC',
  `note` text DEFAULT NULL,
  `period_type` varchar(20) NOT NULL,
  `reference_date` date NOT NULL,
  `letter_number` varchar(100) DEFAULT '',
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,1,'Rekap kehadiran halaqoh tahfizh','PDF','Laporan rutin pekanan santri','weekly','2026-05-12','REP-001',1,'2026-06-09 05:19:48'),(2,1,'Evaluasi ketepatan hadir bulanan','XLS','Ditinjau musyrif halaqoh','monthly','2026-05-11','REP-002',1,'2026-06-09 05:19:48'),(3,1,'Daftar izin dan berhalangan aktif','DOC','Monitoring kehadiran santri berjalan','weekly','2026-05-10','REP-003',1,'2026-06-09 05:19:48');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_code` varchar(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  `division` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `father_name` varchar(100) DEFAULT '',
  `mother_name` varchar(100) DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_code` (`student_code`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'EMP-001','Rina Putri','Halaqoh Tahsin Akhwat','Santri Tahsin','','','2026-06-09 05:16:08'),(2,'EMP-002','Bima Saputra','Halaqoh Tahfizh Putra','Santri Tahfizh','','','2026-06-09 05:16:08'),(3,'EMP-003','Dina Maharani','Halaqoh Tahsin Akhwat','Santri Tahsin','','','2026-06-09 05:16:08'),(4,'EMP-004','Yoga Pratama','Halaqoh Tahfizh Putra','Santri Tahfizh','','','2026-06-09 05:16:08'),(5,'EMP-005','Siska Lestari','Halaqoh Adab Akhwat','Santri Pembinaan','','','2026-06-09 05:16:08'),(6,'EMP-006','Adi Nugroho','Halaqoh Tahfizh Putra','Santri Tahfizh','','','2026-06-09 05:16:08');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(30) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'guruhalaqoh01','$2y$10$V4FlxyJKMMGZPUfLe3tTCePtJWeH9GvbHmw56svq9F8tcaP1.MVL.','Muhammad Farhan','admin',1,'2026-06-09 04:59:51'),(12,'ustadalfattah','$2y$10$9eHMN/HC9zVluHtHRLWq5e3NTWWx1xpIyHU5Ap2IjStudFNpN3Lt2','Ustadz Alfattah','guru',1,'2026-06-24 07:42:46'),(13,'ustadmahyuddin','$2y$10$Cth/lkJ6UanqdQGY755iG.WkVK4k64dNAI.9tzn5ASoj7ZLrRgi0q','Ustadz Mahyuddin','guru',1,'2026-06-24 07:42:46'),(14,'ustadzakaria','$2y$10$Cq9SDxARiVsmOJh92GXUOeeJ7Tp8ljj39r2.r8HA7A8yinR2RZ9Iu','Ustadz Zakaria Rusli','guru',1,'2026-06-24 07:42:46');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-25 11:32:58
