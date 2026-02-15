-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 15, 2026 at 01:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `barangay_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `education_data`
--

CREATE TABLE `education_data` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `resident_id` bigint(20) UNSIGNED NOT NULL,
  `educational_status` enum('Currently Studying','Graduated','Not Studying','N/A') NOT NULL DEFAULT 'N/A',
  `school_type` enum('Public','Private','N/A') NOT NULL DEFAULT 'N/A',
  `school_level` enum('Pre-School','Elementary','Junior High School','Senior High School','College','Vocational','Masteral','N/A') NOT NULL DEFAULT 'N/A',
  `school_name` varchar(200) DEFAULT NULL,
  `course_program` varchar(200) DEFAULT NULL,
  `highest_grade_completed` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `education_data`
--

INSERT INTO `education_data` (`id`, `resident_id`, `educational_status`, `school_type`, `school_level`, `school_name`, `course_program`, `highest_grade_completed`, `created_at`, `updated_at`) VALUES
(1, 1, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-09 19:53:54', '2026-02-09 19:53:54'),
(2, 2, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-09 19:55:55', '2026-02-09 19:55:55'),
(3, 3, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-10 06:21:39', '2026-02-10 06:21:39'),
(4, 4, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-10 06:22:48', '2026-02-10 06:22:48'),
(5, 5, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-10 07:05:44', '2026-02-10 07:05:44'),
(6, 6, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-10 07:19:35', '2026-02-10 07:19:35'),
(7, 7, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-10 07:20:49', '2026-02-10 07:20:49'),
(8, 8, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-10 07:39:27', '2026-02-10 07:39:27'),
(9, 9, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-10 10:00:50', '2026-02-10 10:00:50'),
(10, 10, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-10 17:29:30', '2026-02-10 17:29:30'),
(11, 11, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-10 17:31:20', '2026-02-10 17:31:20'),
(12, 12, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-10 17:43:13', '2026-02-10 17:43:13'),
(13, 13, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-10 20:22:54', '2026-02-10 20:22:54'),
(14, 14, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-12 03:10:23', '2026-02-12 03:10:23'),
(15, 15, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-12 03:22:08', '2026-02-12 03:22:08'),
(16, 16, 'Currently Studying', 'Public', 'College', NULL, NULL, 'Post Graduate', '2026-02-12 03:59:29', '2026-02-12 03:59:29'),
(17, 17, 'Currently Studying', 'Public', 'College', NULL, NULL, 'Post Graduate', '2026-02-12 03:59:44', '2026-02-12 03:59:44'),
(18, 18, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-12 05:09:22', '2026-02-12 05:09:22'),
(19, 19, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-12 05:13:00', '2026-02-12 05:13:00'),
(20, 20, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-12 05:21:10', '2026-02-12 05:21:10'),
(21, 21, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-12 05:22:39', '2026-02-12 05:22:39'),
(22, 22, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-12 05:24:10', '2026-02-12 05:24:10'),
(23, 23, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-12 05:24:38', '2026-02-12 05:24:38'),
(24, 27, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-12 06:35:03', '2026-02-12 06:35:03'),
(25, 28, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-13 05:39:10', '2026-02-13 05:39:10'),
(26, 29, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-13 23:25:01', '2026-02-13 23:25:01'),
(27, 30, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-13 23:29:04', '2026-02-13 23:29:04'),
(28, 31, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-13 23:35:22', '2026-02-13 23:35:22'),
(29, 32, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-13 23:37:05', '2026-02-13 23:37:05'),
(30, 33, 'Currently Studying', 'Public', 'College', NULL, NULL, 'High School Graduate', '2026-02-13 23:39:56', '2026-02-13 23:39:56'),
(31, 36, 'Graduated', 'Private', 'Vocational', NULL, NULL, 'Elementary Undergraduate', '2026-02-14 04:23:11', '2026-02-14 04:23:11'),
(32, 37, 'Graduated', 'Private', 'Vocational', NULL, NULL, 'Elementary Undergraduate', '2026-02-14 04:29:04', '2026-02-14 04:29:04'),
(33, 38, 'Graduated', 'Private', 'Vocational', NULL, NULL, 'Elementary Undergraduate', '2026-02-14 04:36:38', '2026-02-14 04:36:38'),
(34, 39, 'N/A', 'N/A', 'N/A', NULL, NULL, 'Elementary Graduate', '2026-02-14 06:06:25', '2026-02-14 06:06:25'),
(35, 40, 'N/A', 'N/A', 'N/A', NULL, NULL, 'Elementary Graduate', '2026-02-14 06:07:24', '2026-02-14 06:07:24'),
(36, 41, 'N/A', 'N/A', 'N/A', NULL, NULL, 'Elementary Graduate', '2026-02-14 06:13:05', '2026-02-14 06:13:05'),
(37, 42, 'Currently Studying', 'Private', 'Junior High School', NULL, NULL, 'Post Graduate', '2026-02-14 06:26:14', '2026-02-14 06:26:14'),
(38, 43, 'Currently Studying', 'Public', 'Junior High School', NULL, NULL, 'Elementary Undergraduate', '2026-02-14 09:27:47', '2026-02-14 09:27:47'),
(39, 44, 'Currently Studying', 'Public', 'Junior High School', NULL, NULL, 'Elementary Undergraduate', '2026-02-14 09:34:29', '2026-02-14 09:34:29'),
(40, 45, 'Currently Studying', 'Private', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-14 09:35:32', '2026-02-14 09:35:32'),
(41, 46, 'Currently Studying', 'Private', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-14 09:36:27', '2026-02-14 09:36:27'),
(42, 47, 'Currently Studying', 'Private', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-14 09:38:46', '2026-02-14 09:38:46'),
(43, 48, 'Currently Studying', 'Private', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-14 09:39:40', '2026-02-14 09:39:40'),
(44, 49, 'Currently Studying', 'Private', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-14 09:43:36', '2026-02-14 09:43:36'),
(45, 50, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-14 09:45:38', '2026-02-14 09:45:38'),
(46, 51, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-14 09:50:35', '2026-02-14 09:50:35'),
(47, 52, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-14 09:51:33', '2026-02-14 09:51:33'),
(48, 53, 'Currently Studying', 'Public', 'Junior High School', NULL, NULL, 'Elementary Graduate', '2026-02-14 09:52:30', '2026-02-14 09:52:30'),
(49, 54, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-14 09:53:56', '2026-02-14 09:53:56'),
(50, 55, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-14 10:02:05', '2026-02-14 10:02:05'),
(51, 56, 'Not Studying', 'Private', 'Elementary', NULL, NULL, 'Elementary Undergraduate', '2026-02-14 10:05:43', '2026-02-14 10:05:43'),
(52, 57, 'Not Studying', 'Private', 'Elementary', NULL, NULL, 'Elementary Undergraduate', '2026-02-14 10:06:38', '2026-02-14 10:06:38'),
(53, 58, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-14 10:31:07', '2026-02-14 10:31:07'),
(54, 59, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-14 10:56:05', '2026-02-14 10:56:05'),
(55, 60, 'Currently Studying', 'Public', 'Junior High School', NULL, NULL, 'Elementary Undergraduate', '2026-02-14 11:00:31', '2026-02-14 11:00:31'),
(56, 61, 'Currently Studying', 'Public', 'Junior High School', NULL, NULL, 'Elementary Undergraduate', '2026-02-14 11:02:16', '2026-02-14 11:02:16'),
(57, 62, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'Elementary Undergraduate', '2026-02-14 11:03:27', '2026-02-14 11:03:27'),
(58, 63, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-14 11:59:06', '2026-02-14 11:59:06'),
(59, 64, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 13:53:39', '2026-02-14 13:53:39'),
(60, 65, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 13:55:47', '2026-02-14 13:55:47'),
(61, 66, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 13:56:13', '2026-02-14 13:56:13'),
(62, 67, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:00:30', '2026-02-14 14:00:30'),
(63, 68, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:00:46', '2026-02-14 14:00:46'),
(64, 69, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:01:06', '2026-02-14 14:01:06'),
(65, 70, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:01:20', '2026-02-14 14:01:20'),
(66, 71, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:03:10', '2026-02-14 14:03:10'),
(67, 72, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:04:19', '2026-02-14 14:04:19'),
(68, 73, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:04:31', '2026-02-14 14:04:31'),
(69, 74, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:06:23', '2026-02-14 14:06:23'),
(70, 75, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:06:33', '2026-02-14 14:06:33'),
(71, 76, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:14:18', '2026-02-14 14:14:18'),
(72, 77, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:18:20', '2026-02-14 14:18:20'),
(73, 78, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:34:49', '2026-02-14 14:34:49'),
(74, 79, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:34:55', '2026-02-14 14:34:55'),
(75, 80, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:38:54', '2026-02-14 14:38:54'),
(76, 81, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:39:18', '2026-02-14 14:39:18'),
(77, 82, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:39:49', '2026-02-14 14:39:49'),
(78, 83, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:42:07', '2026-02-14 14:42:07'),
(79, 84, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:42:32', '2026-02-14 14:42:32'),
(80, 85, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:43:01', '2026-02-14 14:43:01'),
(81, 86, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:43:08', '2026-02-14 14:43:08'),
(82, 87, 'Graduated', 'Public', 'Elementary', NULL, NULL, 'No Formal Education', '2026-02-14 14:43:13', '2026-02-14 14:43:13'),
(83, 88, 'Currently Studying', 'Private', 'Junior High School', NULL, NULL, 'Elementary Undergraduate', '2026-02-14 14:44:31', '2026-02-14 14:44:31'),
(84, 89, 'Currently Studying', 'Private', 'Junior High School', NULL, NULL, 'Elementary Undergraduate', '2026-02-14 14:46:08', '2026-02-14 14:46:08'),
(85, 95, 'Graduated', 'Private', 'Junior High School', NULL, NULL, 'Elementary Undergraduate', '2026-02-15 01:33:23', '2026-02-15 01:33:23'),
(86, 96, 'Graduated', 'Private', 'Junior High School', NULL, NULL, 'Elementary Undergraduate', '2026-02-15 01:35:49', '2026-02-15 01:35:49'),
(87, 97, 'Graduated', 'Private', 'Junior High School', NULL, NULL, 'Elementary Undergraduate', '2026-02-15 01:36:16', '2026-02-15 01:36:16'),
(88, 98, 'Graduated', 'Private', 'Junior High School', NULL, NULL, 'Elementary Undergraduate', '2026-02-15 01:37:14', '2026-02-15 01:37:14'),
(89, 99, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-15 01:56:15', '2026-02-15 01:56:15'),
(90, 100, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-15 01:57:50', '2026-02-15 01:57:50'),
(91, 101, 'Currently Studying', 'Public', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-15 02:00:35', '2026-02-15 02:00:35'),
(92, 102, 'Currently Studying', 'Public', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-15 02:03:27', '2026-02-15 02:03:27'),
(93, 103, 'Currently Studying', 'Public', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-15 02:06:19', '2026-02-15 02:06:19'),
(94, 104, 'Currently Studying', 'Public', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-15 02:07:32', '2026-02-15 02:07:32'),
(95, 105, 'Currently Studying', 'Public', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-15 02:08:17', '2026-02-15 02:08:17'),
(96, 106, 'Currently Studying', 'Public', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-15 02:08:38', '2026-02-15 02:08:38'),
(97, 107, 'Currently Studying', 'Public', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-15 02:16:37', '2026-02-15 02:16:37'),
(98, 108, 'Currently Studying', 'Public', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-15 02:16:58', '2026-02-15 02:16:58'),
(99, 109, 'Currently Studying', 'Public', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-15 02:17:07', '2026-02-15 02:17:07'),
(100, 110, 'Currently Studying', 'Public', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-15 02:17:18', '2026-02-15 02:17:18'),
(101, 111, 'Graduated', 'Public', 'Senior High School', NULL, NULL, 'College Undergraduate', '2026-02-15 02:19:14', '2026-02-15 02:19:14'),
(102, 112, 'Currently Studying', 'Public', 'Senior High School', NULL, NULL, 'Elementary Graduate', '2026-02-15 02:19:41', '2026-02-15 02:19:41'),
(103, 113, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-15 02:24:49', '2026-02-15 02:24:49'),
(104, 114, 'Graduated', 'Public', 'Senior High School', NULL, NULL, 'College Undergraduate', '2026-02-15 02:29:42', '2026-02-15 02:29:42'),
(105, 115, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-15 02:35:19', '2026-02-15 02:35:19'),
(106, 116, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-15 02:59:34', '2026-02-15 02:59:34'),
(107, 117, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-15 02:59:45', '2026-02-15 02:59:45'),
(108, 118, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-15 02:59:54', '2026-02-15 02:59:54'),
(109, 119, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', '2026-02-15 03:12:11', '2026-02-15 03:12:11'),
(110, 120, 'Currently Studying', 'Private', 'Elementary', NULL, NULL, 'Elementary Undergraduate', '2026-02-15 03:30:03', '2026-02-15 03:30:03'),
(111, 121, 'Currently Studying', 'Private', 'Elementary', NULL, NULL, 'Elementary Undergraduate', '2026-02-15 03:33:24', '2026-02-15 03:33:24');

-- --------------------------------------------------------

--
-- Table structure for table `employment_data`
--

CREATE TABLE `employment_data` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `resident_id` bigint(20) UNSIGNED NOT NULL,
  `employment_status` varchar(50) DEFAULT NULL,
  `occupation` varchar(100) DEFAULT NULL,
  `employer_name` varchar(200) DEFAULT NULL,
  `work_address` varchar(255) DEFAULT NULL,
  `business_name` varchar(200) DEFAULT NULL,
  `business_type` varchar(100) DEFAULT NULL,
  `business_status` enum('Permanent','Contractual','Business Owner','Shared','Corporate','N/A') DEFAULT NULL,
  `income_source` enum('Employment','Business','Remittance','Investments','Others','N/A') DEFAULT NULL,
  `monthly_income` varchar(50) DEFAULT NULL,
  `income_bracket` enum('Below 10,000','10,000 - 20,000','20,001 - 30,000','30,001 - 50,000','Above 50,000','N/A') NOT NULL DEFAULT 'N/A',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employment_data`
--

INSERT INTO `employment_data` (`id`, `resident_id`, `employment_status`, `occupation`, `employer_name`, `work_address`, `business_name`, `business_type`, `business_status`, `income_source`, `monthly_income`, `income_bracket`, `created_at`, `updated_at`) VALUES
(1, 1, 'N/A', 'N/A', NULL, NULL, NULL, NULL, 'Permanent', 'Investments', 'No Income', 'N/A', '2026-02-09 19:53:54', '2026-02-09 19:53:54'),
(2, 2, 'N/A', 'N/A', NULL, NULL, NULL, NULL, 'Contractual', 'Business', NULL, 'N/A', '2026-02-09 19:55:55', '2026-02-09 19:55:55'),
(3, 3, 'N/A', 'N/A', NULL, NULL, NULL, NULL, 'Contractual', 'Employment', '30,001-40,000', 'N/A', '2026-02-10 06:21:39', '2026-02-10 06:21:39'),
(4, 4, 'N/A', 'N/A', NULL, NULL, NULL, NULL, 'Corporate', 'Employment', 'Above 100,000', 'N/A', '2026-02-10 06:22:48', '2026-02-10 06:22:48'),
(5, 5, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Business Owner', 'Employment', '40,001-50,000', 'N/A', '2026-02-10 07:05:44', '2026-02-10 07:05:44'),
(6, 6, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Corporate', 'Others', '40,001-50,000', 'N/A', '2026-02-10 07:19:35', '2026-02-10 07:19:35'),
(7, 7, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Shared', 'Investments', 'Below 5,000', 'N/A', '2026-02-10 07:20:49', '2026-02-10 07:20:49'),
(8, 8, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'Employment', 'Below 5,000', 'N/A', '2026-02-10 07:39:27', '2026-02-10 07:39:27'),
(9, 9, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Business Owner', 'Others', 'Below 5,000', 'N/A', '2026-02-10 10:00:50', '2026-02-10 10:00:50'),
(10, 10, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Contractual', 'Business', 'Below 5,000', 'N/A', '2026-02-10 17:29:30', '2026-02-10 17:29:30'),
(11, 11, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'Investments', '20,001-30,000', 'N/A', '2026-02-10 17:31:20', '2026-02-10 17:31:20'),
(12, 12, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Permanent', 'Investments', 'Above 100,000', 'N/A', '2026-02-10 17:43:13', '2026-02-10 17:43:13'),
(13, 13, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Contractual', 'Remittance', 'Above 100,000', 'N/A', '2026-02-10 20:22:54', '2026-02-10 20:22:54'),
(14, 14, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Shared', 'Employment', 'Above 100,000', 'N/A', '2026-02-12 03:10:23', '2026-02-12 03:10:23'),
(15, 15, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Corporate', 'Employment', '20,001-30,000', 'N/A', '2026-02-12 03:22:08', '2026-02-12 03:22:08'),
(16, 16, 'Self-Employed', 'Engineer', NULL, NULL, NULL, NULL, 'Business Owner', 'Remittance', '40,001-50,000', 'N/A', '2026-02-12 03:59:29', '2026-02-12 03:59:29'),
(17, 17, 'Self-Employed', 'Engineer', NULL, NULL, NULL, NULL, 'Shared', 'Employment', 'Below 5,000', 'N/A', '2026-02-12 03:59:44', '2026-02-12 03:59:44'),
(18, 18, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Corporate', 'Business', '40,001-50,000', 'N/A', '2026-02-12 05:09:22', '2026-02-12 05:09:22'),
(19, 19, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Corporate', 'Remittance', '50,001-100,000', 'N/A', '2026-02-12 05:13:00', '2026-02-12 05:13:00'),
(20, 20, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Shared', 'Employment', 'No Income', 'N/A', '2026-02-12 05:21:10', '2026-02-12 05:21:10'),
(21, 21, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Shared', 'Employment', '50,001-100,000', 'N/A', '2026-02-12 05:22:39', '2026-02-12 05:22:39'),
(22, 22, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Contractual', 'Others', '40,001-50,000', 'N/A', '2026-02-12 05:24:10', '2026-02-12 05:24:10'),
(23, 23, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Contractual', 'Business', 'No Income', 'N/A', '2026-02-12 05:24:38', '2026-02-12 05:24:38'),
(24, 27, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'Remittance', '10,001-20,000', 'N/A', '2026-02-12 06:35:03', '2026-02-12 06:35:03'),
(25, 28, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Contractual', 'Others', '10,001-20,000', 'N/A', '2026-02-13 05:39:10', '2026-02-13 05:39:10'),
(26, 29, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Permanent', 'Remittance', 'No Income', 'N/A', '2026-02-13 23:25:01', '2026-02-13 23:25:01'),
(27, 30, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Shared', 'Business', 'Above 100,000', 'N/A', '2026-02-13 23:29:04', '2026-02-13 23:29:04'),
(28, 31, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Contractual', 'Remittance', '20,001-30,000', 'N/A', '2026-02-13 23:35:22', '2026-02-13 23:35:22'),
(29, 32, 'N/A', NULL, NULL, NULL, NULL, NULL, 'Corporate', 'Others', '10,001-20,000', 'N/A', '2026-02-13 23:37:05', '2026-02-13 23:37:05'),
(30, 33, 'Self-Employed', 'Clothing', NULL, NULL, NULL, NULL, 'Corporate', 'Business', '40,001-50,000', 'N/A', '2026-02-13 23:39:56', '2026-02-13 23:39:56'),
(32, 36, 'Business Owner', 'Engineer', NULL, NULL, NULL, NULL, NULL, 'Remittance', '40,001-50,000', 'N/A', '2026-02-14 04:23:11', '2026-02-14 04:23:11'),
(33, 37, 'Business Owner', 'Engineer', NULL, NULL, NULL, NULL, NULL, 'Remittance', '40,001-50,000', 'N/A', '2026-02-14 04:29:04', '2026-02-14 04:29:04'),
(34, 38, 'Permanent', 'Engineer', NULL, NULL, NULL, NULL, NULL, 'Remittance', '40,001-50,000', 'N/A', '2026-02-14 04:36:38', '2026-02-14 04:36:38'),
(35, 39, 'Permanent', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', 'Below 5,000', 'N/A', '2026-02-14 06:06:25', '2026-02-14 06:06:25'),
(36, 40, 'Permanent', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', 'Below 5,000', 'N/A', '2026-02-14 06:07:24', '2026-02-14 06:07:24'),
(37, 41, 'Permanent', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', 'Below 5,000', 'N/A', '2026-02-14 06:13:05', '2026-02-14 06:13:05'),
(38, 42, 'Contractual', 'Engineer', NULL, NULL, NULL, NULL, NULL, 'Business', 'Above 100,000', 'N/A', '2026-02-14 06:26:14', '2026-02-14 06:26:14'),
(39, 43, 'Shared', 'Engineer', NULL, NULL, NULL, NULL, NULL, 'Business', '20,001-40,000', 'N/A', '2026-02-14 09:27:47', '2026-02-14 09:27:47'),
(40, 44, 'Shared', 'Engineer', NULL, NULL, NULL, NULL, NULL, 'Business', '20,001-40,000', 'N/A', '2026-02-14 09:34:29', '2026-02-14 09:34:29'),
(41, 45, 'Contractual', 'Retired', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-14 09:35:32', '2026-02-14 09:35:32'),
(42, 46, 'Contractual', 'Retired', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-14 09:36:27', '2026-02-14 09:36:27'),
(43, 47, 'Contractual', 'Retired', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-14 09:38:46', '2026-02-14 09:38:46'),
(44, 48, 'Contractual', 'Retired', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-14 09:39:40', '2026-02-14 09:39:40'),
(45, 49, 'Contractual', 'Retired', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-14 09:43:36', '2026-02-14 09:43:36'),
(46, 50, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-14 09:45:38', '2026-02-14 09:45:38'),
(47, 51, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-14 09:50:35', '2026-02-14 09:50:35'),
(48, 52, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-14 09:51:33', '2026-02-14 09:51:33'),
(49, 53, 'Shared', 'Engineer', NULL, NULL, NULL, NULL, NULL, 'Remittance', 'No Income', 'N/A', '2026-02-14 09:52:30', '2026-02-14 09:52:30'),
(50, 54, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-14 09:53:56', '2026-02-14 09:53:56'),
(51, 55, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-14 10:02:05', '2026-02-14 10:02:05'),
(52, 56, 'Contractual', 'Retired', NULL, NULL, NULL, NULL, NULL, 'Business', 'Below 5,000', 'N/A', '2026-02-14 10:05:43', '2026-02-14 10:05:43'),
(53, 57, 'Contractual', 'Retired', NULL, NULL, NULL, NULL, NULL, 'Business', 'Below 5,000', 'N/A', '2026-02-14 10:06:38', '2026-02-14 10:06:38'),
(54, 58, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-14 10:31:07', '2026-02-14 10:31:07'),
(55, 59, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-14 10:56:05', '2026-02-14 10:56:05'),
(56, 60, 'Contractual', 'Retired', NULL, NULL, NULL, NULL, NULL, 'Remittance', '10,001-20,000', 'N/A', '2026-02-14 11:00:31', '2026-02-14 11:00:31'),
(57, 61, 'Contractual', 'Retired', NULL, NULL, NULL, NULL, NULL, 'Remittance', '10,001-20,000', 'N/A', '2026-02-14 11:02:16', '2026-02-14 11:02:16'),
(58, 62, 'Permanent', 'Clothing', NULL, NULL, NULL, NULL, NULL, 'Business', '20,001-40,000', 'N/A', '2026-02-14 11:03:27', '2026-02-14 11:03:27'),
(59, 63, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-14 11:59:06', '2026-02-14 11:59:06'),
(60, 64, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 13:53:39', '2026-02-14 13:53:39'),
(61, 65, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 13:55:47', '2026-02-14 13:55:47'),
(62, 66, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 13:56:13', '2026-02-14 13:56:13'),
(63, 67, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:00:30', '2026-02-14 14:00:30'),
(64, 68, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:00:46', '2026-02-14 14:00:46'),
(65, 69, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:01:06', '2026-02-14 14:01:06'),
(66, 70, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:01:20', '2026-02-14 14:01:20'),
(67, 71, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:03:10', '2026-02-14 14:03:10'),
(68, 72, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:04:19', '2026-02-14 14:04:19'),
(69, 73, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:04:31', '2026-02-14 14:04:31'),
(70, 74, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:06:23', '2026-02-14 14:06:23'),
(71, 75, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:06:33', '2026-02-14 14:06:33'),
(72, 76, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:14:18', '2026-02-14 14:14:18'),
(73, 77, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:18:20', '2026-02-14 14:18:20'),
(74, 78, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:34:49', '2026-02-14 14:34:49'),
(75, 79, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:34:55', '2026-02-14 14:34:55'),
(76, 80, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:38:54', '2026-02-14 14:38:54'),
(77, 81, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:39:18', '2026-02-14 14:39:18'),
(78, 82, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:39:49', '2026-02-14 14:39:49'),
(79, 83, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:42:07', '2026-02-14 14:42:07'),
(80, 84, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:42:32', '2026-02-14 14:42:32'),
(81, 85, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:43:01', '2026-02-14 14:43:01'),
(82, 86, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:43:08', '2026-02-14 14:43:08'),
(83, 87, 'Contractual', NULL, NULL, NULL, NULL, NULL, NULL, 'Business', '5,001-10,000', 'N/A', '2026-02-14 14:43:13', '2026-02-14 14:43:13'),
(84, 88, 'Contractual', 'Teacher', NULL, NULL, NULL, NULL, NULL, 'Remittance', '5,001-10,000', 'N/A', '2026-02-14 14:44:31', '2026-02-14 14:44:31'),
(85, 89, 'Contractual', 'Teacher', NULL, NULL, NULL, NULL, NULL, 'Remittance', '5,001-10,000', 'N/A', '2026-02-14 14:46:08', '2026-02-14 14:46:08'),
(86, 95, 'Contractual', 'Retired', NULL, NULL, NULL, NULL, NULL, 'Business', '10,001-20,000', 'N/A', '2026-02-15 01:33:23', '2026-02-15 01:33:23'),
(87, 96, 'Contractual', 'Retired', NULL, NULL, NULL, NULL, NULL, 'Business', 'Below 5,000', 'N/A', '2026-02-15 01:35:49', '2026-02-15 01:35:49'),
(88, 97, 'Contractual', 'Retired', NULL, NULL, NULL, NULL, NULL, 'Business', 'Below 5,000', 'N/A', '2026-02-15 01:36:16', '2026-02-15 01:36:16'),
(89, 98, 'Contractual', 'Retired', NULL, NULL, NULL, NULL, NULL, 'Business', 'Below 5,000', 'N/A', '2026-02-15 01:37:14', '2026-02-15 01:37:14'),
(90, 99, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-15 01:56:15', '2026-02-15 01:56:15'),
(91, 100, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-15 01:57:50', '2026-02-15 01:57:50'),
(92, 101, 'Permanent', 'Teacher', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-15 02:00:35', '2026-02-15 02:00:35'),
(93, 102, 'Permanent', 'Teacher', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-15 02:03:27', '2026-02-15 02:03:27'),
(94, 103, 'Permanent', 'Teacher', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-15 02:06:19', '2026-02-15 02:06:19'),
(95, 104, 'Permanent', 'Teacher', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-15 02:07:32', '2026-02-15 02:07:32'),
(96, 105, 'Permanent', 'Teacher', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-15 02:08:17', '2026-02-15 02:08:17'),
(97, 106, 'Permanent', 'Teacher', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-15 02:08:38', '2026-02-15 02:08:38'),
(98, 107, 'Permanent', 'Teacher', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-15 02:16:37', '2026-02-15 02:16:37'),
(99, 108, 'Permanent', 'Teacher', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-15 02:16:58', '2026-02-15 02:16:58'),
(100, 109, 'Permanent', 'Teacher', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-15 02:17:07', '2026-02-15 02:17:07'),
(101, 110, 'Permanent', 'Teacher', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-15 02:17:18', '2026-02-15 02:17:18'),
(102, 111, 'Business Owner', 'Janitor', NULL, NULL, NULL, NULL, NULL, 'Investments', 'Below 5,000', 'N/A', '2026-02-15 02:19:14', '2026-02-15 02:19:14'),
(103, 112, 'Permanent', 'Teacher', NULL, NULL, NULL, NULL, NULL, 'Business', '40,001-70,000', 'N/A', '2026-02-15 02:19:41', '2026-02-15 02:19:41'),
(104, 113, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-15 02:24:49', '2026-02-15 02:24:49'),
(105, 114, 'Business Owner', 'Janitor', NULL, NULL, NULL, NULL, NULL, 'Investments', 'Below 5,000', 'N/A', '2026-02-15 02:29:42', '2026-02-15 02:29:42'),
(106, 115, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-15 02:35:19', '2026-02-15 02:35:19'),
(107, 116, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-15 02:59:34', '2026-02-15 02:59:34'),
(108, 117, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-15 02:59:45', '2026-02-15 02:59:45'),
(109, 118, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-15 02:59:54', '2026-02-15 02:59:54'),
(110, 119, 'N/A', NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '0', 'N/A', '2026-02-15 03:12:11', '2026-02-15 03:12:11'),
(111, 120, 'Contractual', 'Retired', NULL, NULL, NULL, NULL, NULL, 'Employment', 'Below 5,000', 'N/A', '2026-02-15 03:30:03', '2026-02-15 03:30:03'),
(112, 121, 'Contractual', 'Retired', NULL, NULL, NULL, NULL, NULL, 'Employment', 'Below 5,000', 'N/A', '2026-02-15 03:33:24', '2026-02-15 03:33:24');

-- --------------------------------------------------------

--
-- Table structure for table `households`
--

CREATE TABLE `households` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `household_id` varchar(50) NOT NULL,
  `house_number` varchar(50) NOT NULL,
  `purok_id` bigint(20) UNSIGNED NOT NULL,
  `street_id` bigint(20) UNSIGNED NOT NULL,
  `head_resident_id` bigint(20) UNSIGNED DEFAULT NULL,
  `established_date` date DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `households`
--

INSERT INTO `households` (`id`, `household_id`, `house_number`, `purok_id`, `street_id`, `head_resident_id`, `established_date`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'HH-00001', '123-A', 2, 3, 20, '2026-02-10', 1, '2026-02-09 19:53:54', '2026-02-12 05:21:59'),
(2, 'HH-00002', '123-B', 2, 3, NULL, '2026-02-10', 1, '2026-02-10 06:22:48', '2026-02-10 06:22:48'),
(3, 'HH-00003', '123-A', 3, 5, NULL, '2026-02-10', 1, '2026-02-10 07:05:44', '2026-02-10 07:05:44'),
(4, 'HH-00004', '123-A', 4, 7, NULL, '2026-02-10', 1, '2026-02-10 07:19:35', '2026-02-10 07:19:35'),
(6, 'HH-00005', '123-B', 4, 7, NULL, '2026-02-10', 1, '2026-02-10 07:20:49', '2026-02-10 07:20:49'),
(7, 'HH-00006', '123-A', 1, 1, 23, '2026-02-11', 1, '2026-02-10 17:29:30', '2026-02-12 05:25:02'),
(10, 'HH-00007', '321-Z', 4, 8, NULL, '2026-02-12', 1, '2026-02-12 04:00:44', '2026-02-12 04:00:44'),
(11, 'HH-00008', '123-A', 2, 4, 18, '2026-02-12', 1, '2026-02-12 05:10:28', '2026-02-12 05:10:28'),
(12, 'HH-RUFHCZ', '123', 2, 3, 10, '2026-02-14', 1, '2026-02-14 12:51:32', '2026-02-14 12:51:32'),
(13, 'HH-5QDXEJ', '213', 3, 5, NULL, '2026-02-14', 1, '2026-02-14 14:45:38', '2026-02-14 14:45:38'),
(14, 'HH-00011', '321-A', 1, 1, NULL, '2026-02-15', 1, '2026-02-15 03:33:53', '2026-02-15 03:33:53');

-- --------------------------------------------------------

--
-- Table structure for table `marital_statuses`
--

CREATE TABLE `marital_statuses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `marital_statuses`
--

INSERT INTO `marital_statuses` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Single', '2026-02-14 10:51:10', '2026-02-14 10:51:10'),
(2, 'Married', '2026-02-14 10:51:10', '2026-02-14 10:51:10'),
(3, 'Living-in', '2026-02-14 10:51:10', '2026-02-14 10:51:10'),
(4, 'Widowed', '2026-02-14 10:51:10', '2026-02-14 10:51:10'),
(5, 'Separated', '2026-02-14 10:51:10', '2026-02-14 10:51:10'),
(6, 'Divorced', '2026-02-14 10:51:10', '2026-02-14 10:51:10'),
(7, 'Unknown', '2026-02-14 10:51:10', '2026-02-14 10:51:10');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_02_08_131554_create_residents_table', 1),
(5, '2026_02_08_132539_create_personal_access_tokens_table', 1),
(6, '2026_02_08_175247_add_verification_fields_to_residents_table', 1),
(7, '2026_02_10_022240_create_puroks_table', 1),
(8, '2026_02_10_022241_create_marital_statuses_table', 1),
(9, '2026_02_10_022241_create_nationalities_table', 1),
(10, '2026_02_10_022241_create_sectors_table', 1),
(11, '2026_02_10_022241_create_streets_table', 1),
(12, '2026_02_10_022242_create_education_data_table', 1),
(13, '2026_02_10_022242_create_employment_data_table', 1),
(14, '2026_02_10_022242_create_households_table', 1),
(15, '2026_02_10_022242_create_residents_table', 2),
(16, '2026_02_10_022243_create_resident_accounts_table', 2),
(17, '2026_02_10_024549_drop_residents_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `nationalities`
--

CREATE TABLE `nationalities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nationalities`
--

INSERT INTO `nationalities` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Filipino', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(2, 'American', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(3, 'Chinese', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(4, 'Japanese', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(5, 'Korean', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(6, 'Taiwanese', '2026-02-10 17:31:20', '2026-02-10 17:31:20'),
(7, 'Indian', '2026-02-15 02:06:19', '2026-02-15 02:06:19'),
(8, 'Indonesian', '2026-02-15 02:08:17', '2026-02-15 02:08:17'),
(9, 'Brazilian', '2026-02-15 02:19:14', '2026-02-15 02:19:14');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `puroks`
--

CREATE TABLE `puroks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `number` varchar(10) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `puroks`
--

INSERT INTO `puroks` (`id`, `number`, `name`, `created_at`, `updated_at`) VALUES
(1, '1', 'Purok 1', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(2, '2', 'Purok 2', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(3, '3', 'Purok 3', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(4, '4', 'Purok 4', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(5, '5', 'Purok 5', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(6, '6', 'Purok 6', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(7, '7', 'Purok 7', '2026-02-09 19:46:35', '2026-02-09 19:46:35');

-- --------------------------------------------------------

--
-- Table structure for table `residents`
--

CREATE TABLE `residents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `barangay_id` varchar(50) DEFAULT NULL,
  `tracking_number` varchar(50) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `suffix` varchar(10) DEFAULT NULL,
  `birthdate` date NOT NULL,
  `birth_registration` enum('Registered','Not Registered') DEFAULT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `contact_number` varchar(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `temp_house_number` varchar(50) DEFAULT NULL,
  `temp_purok_id` bigint(20) UNSIGNED DEFAULT NULL,
  `temp_street_id` bigint(20) UNSIGNED DEFAULT NULL,
  `household_id` bigint(20) UNSIGNED DEFAULT NULL,
  `household_position` enum('Head of Family','Spouse','Son','Daughter','Relative','Househelp','Others') NOT NULL,
  `marital_status_id` bigint(20) UNSIGNED DEFAULT NULL,
  `nationality_id` bigint(20) UNSIGNED NOT NULL DEFAULT 1,
  `sector_id` bigint(20) UNSIGNED DEFAULT NULL,
  `residency_status` enum('Old Resident','New Resident') DEFAULT NULL,
  `residency_start_date` date DEFAULT NULL,
  `is_voter` tinyint(1) DEFAULT 0,
  `id_type` varchar(50) DEFAULT NULL,
  `id_front_path` varchar(255) NOT NULL,
  `id_back_path` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `temp_password` varchar(255) DEFAULT NULL,
  `verified_at` timestamp NULL DEFAULT NULL,
  `verified_by` bigint(20) UNSIGNED DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `residents`
--

INSERT INTO `residents` (`id`, `barangay_id`, `tracking_number`, `first_name`, `middle_name`, `last_name`, `suffix`, `birthdate`, `birth_registration`, `gender`, `contact_number`, `email`, `temp_house_number`, `temp_purok_id`, `temp_street_id`, `household_id`, `household_position`, `marital_status_id`, `nationality_id`, `sector_id`, `residency_status`, `residency_start_date`, `is_voter`, `id_type`, `id_front_path`, `id_back_path`, `status`, `temp_password`, `verified_at`, `verified_by`, `rejection_reason`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'BGN-00010', 'BGN-6642', 'a', 'a', 'a', NULL, '2002-12-12', 'Registered', 'Male', '09655259387', NULL, '123-A', 2, 3, 1, 'Relative', 6, 1, 3, 'New Resident', '2026-02-10', 1, 'Government ID', 'resident_ids/front/0kXHCQcymtrjVrdMikSi6MVXWMfKXrOHk2pssRsC.png', 'resident_ids/back/2xv5luYytOQ4Mfcl8tnTmIfdRt5ll8lIcx8mgclA.png', 'Verified', NULL, '2026-02-12 05:56:44', NULL, NULL, '2026-02-09 19:53:54', '2026-02-12 05:56:44', NULL),
(2, 'BGN-00011', 'BGN-2476', 'ads', 'a', 'a', NULL, '2002-12-12', 'Not Registered', 'Male', '09753657345', NULL, '123-A', 2, 3, 1, 'Spouse', 2, 1, 5, 'New Resident', '2026-02-10', 0, 'Government ID', 'resident_ids/front/7IZ3yMIcms49PncVuY0FQQIDhNyKitKoGPHTjx16.png', 'resident_ids/back/pVk6b0WoNp5wf98ExQpsyAT8pB8STmiPvNL3PcyL.png', 'Verified', NULL, '2026-02-12 06:26:24', NULL, NULL, '2026-02-09 19:55:55', '2026-02-12 06:26:24', NULL),
(3, NULL, 'BGN-2486', 'asd', 'asd', 'asd', NULL, '2002-12-12', 'Not Registered', 'Male', '09655259387', NULL, '123-A', 2, 3, 1, 'Daughter', 4, 1, 1, 'New Resident', '2026-02-10', 1, 'Government ID', 'resident_ids/front/emqbdYai9Qm5qeB1IhtXkOWefWbTovherdZ9P9yQ.png', 'resident_ids/back/WieYosobJnlizJiRmGQSz09kkxT9HyQ6ZTJtqeir.png', 'Rejected', NULL, NULL, NULL, NULL, '2026-02-10 06:21:39', '2026-02-14 12:35:28', NULL),
(4, NULL, 'BGN-2318', 'asd', 'asd', 'asd', NULL, '2002-12-12', 'Not Registered', 'Male', '09655259387', NULL, '123-A', 2, 3, 2, 'Head of Family', 4, 1, 3, 'New Resident', '2026-02-10', 1, 'Government ID', 'resident_ids/front/65tfZKtqgcZfETzGRM4kjukIw7gPSUBk0EIvjx7x.png', 'resident_ids/back/9gxCvlHVX2OyrDY0vVUNrdptiNI2UGf1VoGVqpbX.png', 'Rejected', NULL, NULL, NULL, NULL, '2026-02-10 06:22:48', '2026-02-15 03:01:31', NULL),
(5, NULL, 'BGN-3048', 'a', 'a', 'a', NULL, '0012-02-21', 'Registered', 'Male', '09141391637', NULL, '123-A', 2, 3, 3, 'Head of Family', 5, 1, 3, 'New Resident', '2026-02-10', 1, 'Government ID', 'resident_ids/front/GJiFQapMTE76HZA0seTLPO4GjLplt5wpfn83Oyim.png', 'resident_ids/back/SeLMT0iBj19mFIeHQB4bqv6D4WJZykZ994VKHj2W.png', 'For Verification', NULL, NULL, NULL, NULL, '2026-02-10 07:05:44', '2026-02-15 03:03:24', NULL),
(6, NULL, 'BGN-7060', 'aasa', 'asa', 'asa', 'Jr.', '2002-12-21', 'Registered', 'Female', '09141391637', NULL, '123-A', 2, 3, 4, 'Head of Family', 3, 1, 2, 'New Resident', '2026-02-10', 1, 'Government ID', 'resident_ids/front/dI9ctqOlnt0xudfDDORF4h3XSm4J2cuAaw01yrS2.png', 'resident_ids/back/ytdTpC5Q52z3meuuAO30DY6gP6zci4ZwuGRw2WbK.png', 'Rejected', NULL, NULL, NULL, NULL, '2026-02-10 07:19:35', '2026-02-15 03:12:37', NULL),
(7, NULL, 'BGN-1744', 'aasa', 'asa', 'asa', 'Jr.', '2002-12-21', 'Registered', 'Female', '09141391637', NULL, '123-A', 2, 3, 6, 'Head of Family', 3, 1, 7, 'New Resident', '2026-02-10', 1, 'Government ID', 'resident_ids/front/WGnfIf088EhDIPXvIEcwjH3z56AvUlOMIdvmJG4z.png', 'resident_ids/back/bevbGMXJH7IkerDHcnrIaMqCTdmtJxk4E6fR5pZ1.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-10 07:20:49', '2026-02-10 07:20:49', NULL),
(8, 'BGN-00026', 'BGN-5210', 'a', 'a', 'a', NULL, '2002-02-21', 'Registered', 'Male', '09655259387', NULL, '123-A', 2, 3, 1, 'Spouse', 6, 1, 6, 'New Resident', '2026-02-10', 1, 'Government ID', 'resident_ids/front/sEzO3Sk9HWbbmhupcVNR6uj2Z51z5DyyjdG6viYs.png', 'resident_ids/back/HZiseqs9LhccRuH3dSN96WqCOtp1YGqrtinjJ0gN.png', 'Verified', NULL, '2026-02-15 03:03:27', NULL, NULL, '2026-02-10 07:39:27', '2026-02-15 03:03:27', NULL),
(9, 'BGN-00013', 'BGN-1407', 'ewqewq', 'ewq', 'ewqew', 'Jr.', '0012-12-12', 'Registered', 'Male', '09655259387', NULL, '123-A', 2, 3, 1, 'Son', 1, 1, 7, 'New Resident', '2026-02-10', 1, 'Government ID', 'resident_ids/front/Hh6z3PoOOfsncHsFeDnwTbQvAEV7vlbaClpxbkRV.png', 'resident_ids/back/GId9kMkCcABtyoJsLPjlFCdIYyn7q7Ol0zkwob7D.png', 'Verified', NULL, '2026-02-12 08:38:39', NULL, NULL, '2026-02-10 10:00:50', '2026-02-12 08:38:39', NULL),
(10, 'BGN-00016', 'BGN-3435', 'sdadsadsa', 'a', 'a', NULL, '0001-12-12', 'Registered', 'Male', '09655259387', NULL, '123', 2, 3, 12, 'Head of Family', 4, 1, 5, 'New Resident', '2026-02-11', 1, 'Government ID', 'resident_ids/front/ut7RdwHySinGOnzuKD7CZYNIDvybGUKYDiwWs8wF.png', 'resident_ids/back/mpfnJ2K551A2aYTIwduWYFcy7PzE4Kj6DZuiOR0b.png', 'Verified', NULL, '2026-02-14 12:51:32', NULL, NULL, '2026-02-10 17:29:30', '2026-02-14 12:51:32', NULL),
(11, 'BGN-00014', 'BGN-5481', 'sdadsadsa', 'a', 'a', NULL, '0001-12-12', 'Registered', 'Male', '09655259387', NULL, '123-A', 2, 3, 1, 'Son', 4, 6, 3, 'New Resident', '2026-02-11', 1, 'Government ID', 'resident_ids/front/vNKsjK7Ez8G2gu6vY4OpryHLTsQx0ye0p7Ns5tzo.png', 'resident_ids/back/bLu7SS2U117f0D34aHtgEp39e9cnkQCmAGUWLgmn.png', 'Verified', NULL, '2026-02-12 08:41:24', NULL, NULL, '2026-02-10 17:31:20', '2026-02-12 08:41:24', NULL),
(12, NULL, 'BGN-5196', 'sdadsadsa', 'a', 'a', NULL, '0001-12-12', 'Registered', 'Male', '09655259387', NULL, '123-A', 2, 3, NULL, 'Son', 3, 6, 6, 'New Resident', '2026-02-11', 1, 'Government ID', 'resident_ids/front/y3Bg0qXqo982wa7OfvIEAqOaM0OFLESBu55N0DGG.png', 'resident_ids/back/uglprYNyoc5Tf1yZdYydFYZEli7D7jxtGxvGPZp8.png', 'Rejected', NULL, NULL, NULL, NULL, '2026-02-10 17:43:13', '2026-02-10 19:52:58', NULL),
(13, 'BGN-00008', 'BGN-8866', 'a', 'a', 'sa', 'Jr.', '0011-03-21', 'Not Registered', 'Male', '09141391637', NULL, '123-A', 2, 3, 1, 'Son', 3, 1, 6, 'New Resident', '2026-02-11', 1, 'Government ID', 'resident_ids/front/VtPUCUH8IvNWJJvW8jCxl0dJd77qvdmnYwXseKUH.png', 'resident_ids/back/fT7bg8ZJgBHBxFJahIMaqwUeH3DPdGh4PpvS11Qe.png', 'Verified', NULL, '2026-02-12 05:47:33', NULL, NULL, '2026-02-10 20:22:54', '2026-02-12 05:47:33', NULL),
(14, 'BGN-00001', 'BGN-2448', 'a', 'a', 'a', NULL, '2002-02-21', 'Registered', 'Male', '09931996212', NULL, '123-A', 2, 3, 1, 'Son', 1, 1, 5, 'New Resident', '2026-02-12', 1, 'Government ID', 'resident_ids/front/K3r550pCesqY83BgBW7VtUoWWcexeU1GzqOFvVto.png', 'resident_ids/back/7Cz1097CuA7MglDJX06knWQ5lBPPnZqsiLQ3xwg8.png', 'Verified', NULL, '2026-02-12 03:24:06', NULL, NULL, '2026-02-12 03:10:23', '2026-02-12 03:24:06', NULL),
(15, 'BGN-00002', 'BGN-6499', 'aaaaaaaaaa', 'a', 'a', NULL, '2002-02-21', 'Not Registered', 'Male', '09931996212', NULL, '123-A', 2, 3, 1, 'Son', 1, 1, 6, 'New Resident', '2026-02-12', 1, 'Government ID', 'resident_ids/front/PCKCHaLsELbhxjVk8XrMtxGtmoxGk7ob2g2YgS3h.png', 'resident_ids/back/sBYfyBvZSOFf0WCehjsn1gxEHMTcTtV2PMHvxeGS.png', 'Verified', NULL, '2026-02-12 03:54:23', NULL, NULL, '2026-02-12 03:22:08', '2026-02-12 03:54:23', NULL),
(16, NULL, 'BGN-9139', 'a', 'a', 'a', NULL, '2002-02-12', 'Not Registered', 'Male', '09655259387', NULL, '321-Z', 4, 8, NULL, 'Spouse', 1, 1, 1, 'New Resident', '2026-02-12', 1, 'Government ID', 'resident_ids/front/8t82Oy3gkFyV1VC5fRckN8qUCZ7jkhEn8YhgCKql.png', 'resident_ids/back/SWPql31ObbTxmeB250R6BgZYieiDr4RJar4voL6o.png', 'Rejected', NULL, NULL, NULL, NULL, '2026-02-12 03:59:29', '2026-02-12 05:12:12', NULL),
(17, 'BGN-00003', 'BGN-3638', 'a', 'a', 'a', NULL, '2002-02-12', 'Not Registered', 'Male', '09655259387', NULL, '321-Z', 4, 8, 10, 'Spouse', 7, 1, 1, 'New Resident', '2026-02-12', 1, 'Government ID', 'resident_ids/front/qyTZoFTtROONw7apA32bqT0dvPmMlmn2kAfJumcI.png', 'resident_ids/back/7eHVJiKrP6dO6L6OVx9j1f0GgDjFFFrmUNIfPnHQ.png', 'Verified', NULL, '2026-02-12 04:00:44', NULL, NULL, '2026-02-12 03:59:44', '2026-02-12 04:00:44', NULL),
(18, 'BGN-00004', 'BGN-8351', 'ewqewqewq', NULL, 'a', NULL, '0202-02-12', 'Not Registered', 'Male', '09655259387', NULL, '123-A', 2, 4, 11, 'Head of Family', 6, 1, 3, 'New Resident', '2026-02-12', 0, 'Government ID', 'resident_ids/front/xR4Ir6Twzsa4HfQ38FblKjTHAHxOW8mq31wsdTRo.png', 'resident_ids/back/g19HMDcq7VWJ06IlHZa2HiZLRilBTr0cMXaFJxgS.png', 'Verified', NULL, '2026-02-12 05:10:28', NULL, NULL, '2026-02-12 05:09:22', '2026-02-12 05:10:28', NULL),
(19, NULL, 'BGN-6881', 'ewqewqewq', NULL, 'a', NULL, '0202-02-12', 'Not Registered', 'Male', '09655259387', NULL, '123-A', 2, 4, NULL, 'Head of Family', 7, 1, 3, 'New Resident', '2026-02-12', 0, 'Government ID', 'resident_ids/front/NzHW8RK7luKv53eEpCSMQD8siAiCpC1JUTWk0SXv.png', 'resident_ids/back/4H4BXoHrYMJkwGKhD8FTHzSxaYA0iYZ3mXRh9SJK.png', 'Rejected', NULL, NULL, NULL, NULL, '2026-02-12 05:13:00', '2026-02-12 05:45:56', NULL),
(20, 'BGN-00005', 'BGN-0256', 's', NULL, 'a', NULL, '0012-12-12', 'Not Registered', 'Male', '09213058032', NULL, '123-A', 2, 3, 1, 'Head of Family', 4, 1, 4, 'New Resident', '2026-02-12', 0, 'Government ID', 'resident_ids/front/57MBRQU7BAR3QthWUd0RWIiOS5dei8T7SKIW1Dfd.png', 'resident_ids/back/Z9vDQ9TvYJ0OfvdSBzGpbvJgPWIn5lfQyD9ImJsU.png', 'Verified', NULL, '2026-02-12 05:21:59', NULL, NULL, '2026-02-12 05:21:10', '2026-02-12 05:21:59', NULL),
(21, 'BGN-00007', 'BGN-2414', 's', NULL, 'a', NULL, '0012-12-12', 'Not Registered', 'Male', '09213058032', NULL, '123-A', 2, 3, 1, 'Spouse', 3, 1, 4, 'New Resident', '2026-02-12', 0, 'Government ID', 'resident_ids/front/VomXuQQfV0maVA0lb2rpOMcOLaWt8Famsn7ThHCl.png', 'resident_ids/back/mRuTUwFkOUEZvRGKPrxbEnEoHrkQ4unYvuN0DYJP.png', 'Verified', NULL, '2026-02-12 05:40:43', NULL, NULL, '2026-02-12 05:22:39', '2026-02-12 05:40:43', NULL),
(22, NULL, 'BGN-2921', 'a', NULL, 'a', NULL, '0021-12-12', 'Not Registered', 'Male', '09655259387', NULL, '123-A', 1, 1, NULL, 'Head of Family', 1, 1, 2, 'New Resident', '2026-02-12', 0, 'Government ID', 'resident_ids/front/8lS1LiB0ww9eEbGmG0fy6RzYAudzxF0LMy0qDgsd.png', 'resident_ids/back/s9C8na9up9gOqTwE4Fff7QH5cv9XaARv2zgS0iUu.png', 'Rejected', NULL, NULL, NULL, NULL, '2026-02-12 05:24:10', '2026-02-12 05:26:17', NULL),
(23, 'BGN-00006', 'BGN-0531', 'a', NULL, 'a', NULL, '0021-12-12', 'Not Registered', 'Male', '09655259387', NULL, '123-A', 1, 1, 7, 'Head of Family', 3, 1, 5, 'New Resident', '2026-02-12', 0, 'Government ID', 'resident_ids/front/F9TGlBTu4SywfbDv9hpLWh9kylVg1ue97BHwbj2h.png', 'resident_ids/back/YnySXHBhS0PncaRN0P8Nd2DNpxkleZQa4hb0h5c7.png', 'Verified', NULL, '2026-02-12 05:25:02', NULL, NULL, '2026-02-12 05:24:38', '2026-02-12 05:25:02', NULL),
(26, 'BGN-00009', 'BGN-2466', 'a', 'a', 'a', NULL, '2002-12-12', 'Registered', 'Male', '09655259387', NULL, '123-A', 2, 3, 1, 'Relative', 3, 1, 2, 'New Resident', '2026-02-10', 1, 'Government ID', 'resident_ids/front/0kXHCQcymtrjVrdMikSi6MVXWMfKXrOHk2pssRsC.png', 'resident_ids/back/2xv5luYytOQ4Mfcl8tnTmIfdRt5ll8lIcx8mgclA.png', 'Verified', NULL, '2026-02-12 05:50:16', NULL, NULL, '2026-02-09 19:53:54', '2026-02-12 05:50:16', NULL),
(27, 'BGN-00012', 'BGN-6139', 'Aja', NULL, 'Des', NULL, '2002-02-12', 'Registered', 'Male', '09736262781', NULL, '123-A', 2, 4, 11, 'Relative', 1, 1, 2, 'New Resident', '2026-02-12', 0, 'Government ID', 'resident_ids/front/qo8T7gKq8k40PV6GDOBFIZGIWb1n96MkuTi26yOU.jpg', 'resident_ids/back/PVlaC6MMZAUFmWyAfHuHtFKhbFTARo6U03XWIWxJ.jpg', 'Verified', NULL, '2026-02-12 06:35:48', NULL, NULL, '2026-02-12 06:35:03', '2026-02-12 06:35:48', NULL),
(28, 'BGN-00015', 'BGN-8536', 'a', NULL, 'a', NULL, '2002-12-12', 'Registered', 'Male', '09141391637', NULL, '123-A', 2, 3, 1, 'Spouse', 3, 1, 6, 'New Resident', '2026-02-13', 0, 'Government ID', 'resident_ids/front/UpB46AygKusc5oJuff1KYTCedZ0AZAhgLtJSeBzC.png', 'resident_ids/back/nNJw18am5D4HmJnKtL5NJ56PiaOf6HzMEqLkU7X5.png', 'Verified', NULL, '2026-02-13 05:39:33', NULL, NULL, '2026-02-13 05:39:10', '2026-02-13 05:39:33', NULL),
(29, NULL, 'BGN-4976', 'Juan', NULL, 'a', NULL, '0022-02-12', 'Not Registered', 'Male', '09213058032', NULL, '123-A', 1, 1, NULL, 'Son', 3, 1, 7, 'New Resident', '2026-02-14', 0, 'Government ID', 'resident_ids/front/LkxiOKFFIju3PqHCl12rgBKC4HY9lfkhX880JRm2.png', 'resident_ids/back/7Jesnc6ugPoPWSj5hgsZEtEsCgoyuvBEnGD9SLqb.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-13 23:25:01', '2026-02-13 23:25:01', NULL),
(30, NULL, 'BGN-0920', 'Nauj', NULL, 'a', NULL, '0022-02-12', 'Not Registered', 'Male', '09213058032', NULL, '123-A', 1, 1, NULL, 'Spouse', 6, 1, 5, 'New Resident', '2026-02-14', 0, 'Government ID', 'resident_ids/front/C7X1mDvzgGYUYTz76w0W4JA64rppggmEU9NbmzQl.png', 'resident_ids/back/Rpi6gVlRRWHsXpeHJCXtsKtHR9l5aZoDVA4817pL.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-13 23:29:04', '2026-02-13 23:29:04', NULL),
(31, NULL, 'BGN-0645', 'Kap', NULL, 'a', NULL, '0022-02-12', 'Registered', 'Male', '09213058032', NULL, '123-A', 1, 1, NULL, 'Spouse', 4, 1, 3, 'New Resident', '2026-02-14', 0, 'Government ID', 'resident_ids/front/J5KQ4pzMB0Hzhr4a65sVejrzFbuFpLoAEtA45CH7.png', 'resident_ids/back/cnvYB4AP3J97N8ldvTgDv38bvMLiCuKCxxVmQPQN.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-13 23:35:22', '2026-02-13 23:35:22', NULL),
(32, NULL, 'BGN-2509', 'Kape', NULL, 'a', NULL, '0022-02-12', 'Not Registered', 'Male', '09213058032', NULL, '123-A', 1, 1, NULL, 'Spouse', 4, 1, 6, 'New Resident', '2026-02-14', 0, 'Government ID', 'resident_ids/front/aNSgctZsIFkfYyKGkucpYYhDPksQyxmnAZsFDtju.png', 'resident_ids/back/JUYQEfEEiiiix1rtlHxzJUcObMn6IqlNerzm8q01.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-13 23:37:05', '2026-02-13 23:37:05', NULL),
(33, NULL, 'BGN-3096', 'Ped', NULL, 'a', NULL, '0022-02-12', 'Not Registered', 'Male', '09213058032', NULL, '123-A', 1, 1, NULL, 'Spouse', 4, 1, 7, 'New Resident', '2026-02-14', 1, 'Government ID', 'resident_ids/front/2NQdWgArLMPe1bswqru0gzWmOmyy6NLTCPpYuELj.png', 'resident_ids/back/AvCBoV2veSHOyTtMnrPn1J1wdHOTrt0f5hxFJHSb.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-13 23:39:56', '2026-02-13 23:39:56', NULL),
(36, NULL, 'BGN-3766', 'a', 'a', 'a', NULL, '2002-02-12', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', 2, 1, 3, 'New Resident', '2026-02-14', 0, 'Government ID', 'resident_ids/front/BxB366arLuuxnGRvuCoQQjxISSkIazgLI83l92qC.png', 'resident_ids/back/gYbMZ2daSsVpTQwLqe4Oyue5LfmklOWLrGtDYwaY.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 04:23:11', '2026-02-14 04:23:11', NULL),
(37, NULL, 'BGN-4745', 'z', 'a', 'a', NULL, '2002-02-12', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', 2, 1, 3, 'New Resident', '2026-02-14', 0, 'Government ID', 'resident_ids/front/6W5NHlVGLFGqC9y79CPJTdoEf8wozX43m4YLgwQd.png', 'resident_ids/back/Zxyf5LA8fR3Jf87D4Yuat1BXHZevZBWYox1vsvVS.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 04:29:04', '2026-02-14 04:29:04', NULL),
(38, NULL, 'BGN-9694', 'q', 'a', 'a', NULL, '2002-02-12', 'Registered', 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', 2, 1, 3, 'New Resident', '2026-02-14', 0, 'Government ID', 'resident_ids/front/fa2iRspSmR1nDGpRVRK8CBFF9MrNNSMF06WZ3Bgb.png', 'resident_ids/back/Lutd3dxy1dB5mYBSAyj4k95ThYqJIkuPlQJv8nI2.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 04:36:38', '2026-02-14 04:36:38', NULL),
(39, NULL, 'BGN-4233', 'a', 'a', 'a', NULL, '0022-02-12', 'Registered', 'Female', '09213058032', NULL, '123-A', 2, 3, NULL, 'Spouse', NULL, 1, 1, 'New Resident', '2026-02-14', 0, 'Barangay ID', 'resident_ids/front/KHdNeCHrErpl8Yhdfa1l9tfnUjG7S1m4JEc2dH15.png', 'resident_ids/back/qco5Fk6lhcLa9URazNte7amTMHbGbitHLZsQNwXP.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 06:06:25', '2026-02-14 06:06:25', NULL),
(40, NULL, 'BGN-2330', 'a', 'a', 'a', NULL, '0022-02-12', 'Registered', 'Female', '09213058032', NULL, '123-A', 2, 3, NULL, 'Spouse', NULL, 1, 3, 'New Resident', '2026-02-14', 0, 'Barangay ID', 'resident_ids/front/GhUyUKmERS9AvwGMRcK1IIuELrIg882bc3PDEGvH.png', 'resident_ids/back/TFhmfcMdgGEeh3N7a941OFi7yM6RYeGDjJoGjvPr.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 06:07:24', '2026-02-14 06:07:24', NULL),
(41, NULL, 'BGN-6457', 'a', 'a', 'a', NULL, '0022-12-12', 'Registered', 'Male', '09141391637', NULL, '123-A', 2, 4, NULL, 'Spouse', 1, 1, 3, 'New Resident', '2026-02-14', 0, 'Barangay ID', 'resident_ids/front/KoIXCaQzymBug48ZESNesy3RqkcGueDrDEY3jqZ1.png', 'resident_ids/back/zYITYF89SMOiBxcoUQH2YkBk1JJ7vwjIAA9E2pTt.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 06:13:05', '2026-02-14 06:13:05', NULL),
(42, NULL, 'BGN-9930', 'ewqewq', 'a', 'a', NULL, '2002-02-12', 'Registered', 'Male', '09213058032', NULL, '123-A', 2, 3, NULL, 'Relative', 2, 1, 1, 'New Resident', '2026-02-14', 0, 'Barangay ID', 'resident_ids/front/0E2FK3wagrHd4PDdmjNrcGvkt56RVEks3aiumOFq.png', 'resident_ids/back/jnkOdAWfYcP6WEsRb0JBKEvww09FnTC4lGjlV6rB.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 06:26:14', '2026-02-14 06:26:14', NULL),
(43, NULL, 'BGN-6743', 'a', 'a', 'a', NULL, '0012-02-21', 'Registered', 'Male', '09141391637', NULL, '123-A', 1, 1, NULL, 'Spouse', 1, 1, 1, 'Old Resident', '2026-02-14', 0, 'Barangay ID', 'resident_ids/front/5YFcZamUVg8xcqFxtVUzisNYhLsC1NtzqatZPWYG.png', 'resident_ids/back/iiPGyPdQWaY888FEEwQ02B5uGzmHzNLkVYfYhqyI.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 09:27:47', '2026-02-14 09:27:47', NULL),
(44, NULL, 'BGN-9015', 'a', 'a', 'a', NULL, '0012-02-21', 'Registered', 'Male', '09141391637', NULL, '123-A', 1, 1, NULL, 'Spouse', 1, 1, 3, 'Old Resident', '2000-01-01', 0, 'Barangay ID', 'resident_ids/front/BZAePBDPeol4uowIobHUTRMCPtBokcAYPQFXaEXP.png', 'resident_ids/back/SzS7u6x7y2L5hwLy2SvzRo4OH769u929tNA2g2rh.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 09:34:29', '2026-02-14 09:34:29', NULL),
(45, NULL, 'BGN-6283', 'a', 'a', 'a', NULL, '0001-02-12', 'Not Registered', 'Male', '09655259387', NULL, '123-A', 2, 4, NULL, 'Spouse', 1, 1, 7, 'Old Resident', '2000-01-01', 1, 'Barangay ID', 'resident_ids/front/ubYLMWwVE6mXKLyhAbrK5jn0REKWpX06WZClqFAj.png', 'resident_ids/back/6RpThfADvLyo96RxosRGb6fvR5FjawOhyCT45BZb.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 09:35:32', '2026-02-14 09:35:32', NULL),
(46, NULL, 'BGN-1304', 'a', 'a', 'a', NULL, '0001-02-12', 'Not Registered', 'Male', '09655259387', NULL, '123-A', 2, 4, NULL, 'Spouse', 1, 1, 3, 'Old Resident', '2000-01-01', 1, 'Barangay ID', 'resident_ids/front/D9g1G8hXfqdQUAGgrHVWXPtNEoBMZTv2JhWlIODm.png', 'resident_ids/back/60A6vwF0u75ORJByu5nwEda8MqitzQS8yJlU7dYN.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 09:36:27', '2026-02-14 09:36:27', NULL),
(47, NULL, 'BGN-3154', 'a', 'a', 'a', NULL, '0001-02-12', 'Not Registered', 'Male', '09655259387', NULL, '123-A', 2, 4, NULL, 'Spouse', 1, 1, 3, 'Old Resident', '2000-01-01', 1, 'Barangay ID', 'resident_ids/front/pfWVGXJup2fvh8aT2KIE44MtX8zzbxltamw1WWR4.png', 'resident_ids/back/TbcEDQn96EKKnkkD8SeE7MRKQykDcOLXc4L8HeGa.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 09:38:46', '2026-02-14 09:38:46', NULL),
(48, NULL, 'BGN-5585', 'a', 'a', 'a', NULL, '0001-02-12', 'Not Registered', 'Male', '09655259387', NULL, '123-A', 2, 4, NULL, 'Spouse', 1, 1, 3, 'Old Resident', '2000-01-01', 1, 'Barangay ID', 'resident_ids/front/X6lK3smd9jjKRcJbu7Ez9xPEHIogwmpO2uEjEZ1Y.png', 'resident_ids/back/qe4YvdTidaRCtyGZdZJrXHwpOyrB8BSowQZHCdAB.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 09:39:40', '2026-02-14 09:39:40', NULL),
(49, NULL, 'BGN-9841', 'a', 'a', 'a', NULL, '0001-02-12', 'Not Registered', 'Male', '09655259387', NULL, '123-A', 2, 4, NULL, 'Spouse', 1, 1, 3, 'Old Resident', '2000-01-01', 1, 'Barangay ID', 'resident_ids/front/TQHQxVyZ0d3hXfvqxM3Zz1bAS763y6J6WAlnmaAY.png', 'resident_ids/back/KXADlkiRKz8ANAhleFFXDDAK2ToCr0sgQYL965fT.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 09:43:36', '2026-02-14 09:43:36', NULL),
(50, NULL, 'BGN-6056', 'a', 'a', 'a', NULL, '0002-12-12', 'Registered', 'Female', '09141391637', NULL, '123-AD', 1, 1, NULL, 'Spouse', 2, 1, 2, 'Old Resident', '2000-01-01', 0, 'Barangay ID', 'resident_ids/front/2vWZlsnDf1ml1iTcz40CUbKfOuwJXs3sallznBNJ.png', 'resident_ids/back/qotXfJIcnXx0s06kzxqBfvj4GBDWvDU8nn9jQjIS.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 09:45:38', '2026-02-14 09:45:38', NULL),
(51, NULL, 'BGN-8333', 'a', 'a', 'a', NULL, '0002-12-12', 'Registered', 'Female', '09141391637', NULL, '123-AD', 1, 1, NULL, 'Spouse', 2, 1, 3, 'Old Resident', '2002-01-01', 0, 'Barangay ID', 'resident_ids/front/48KrwEIhQ4LMrBn2aw8XRPDcxkCCSfBkrTO7JbmM.png', 'resident_ids/back/9qeBwhxA6ObnTu0W9uY9KIgUl0zCl1FOlTle00gP.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 09:50:35', '2026-02-14 09:50:35', NULL),
(52, NULL, 'BGN-9185', 'zxc', 'a', 'a', NULL, '0002-12-12', 'Registered', 'Female', '09141391637', NULL, '123-AD', 1, 1, NULL, 'Spouse', 2, 1, 3, 'Old Resident', '2005-11-12', 0, 'Barangay ID', 'resident_ids/front/YkmZSHbLiZTqOuTZmKERT0iFei8O9RoxH4fDmJa0.png', 'resident_ids/back/30bpnjKWHHsOX6LghvdBsUBPl6oplhQ4ZSYHIE2c.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 09:51:33', '2026-02-14 09:51:33', NULL),
(53, NULL, 'BGN-9813', 'cxz', 'a', 'a', NULL, '0002-12-12', 'Registered', 'Female', '09141391637', NULL, '123-AD', 1, 1, NULL, 'Spouse', 2, 1, 3, 'Old Resident', '2005-12-11', 0, 'Barangay ID', 'resident_ids/front/qwCegsxq2FzoSAtRQWRPjWEdw2LGCO9aWSGQAS7A.png', 'resident_ids/back/YbIdR8PojgZX9nzuWgOEbRbYmHNdmdBc0bE5Wd0F.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 09:52:30', '2026-02-14 09:52:30', NULL),
(54, NULL, 'BGN-9308', 'a', 'a', 'dsa', NULL, '0121-02-21', 'Registered', 'Male', '09141391637', NULL, '123-A', 3, 5, NULL, 'Son', 3, 1, 3, 'New Resident', '2026-02-14', 1, 'Barangay ID', 'resident_ids/front/i6JoytSqBHquflEFOX18yYA0kStXmXG7km7IuVMt.png', 'resident_ids/back/e75lFskLVqheZhzLahsFOGvEbnMmXit9CYt5IP1p.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 09:53:56', '2026-02-14 09:53:56', NULL),
(55, NULL, 'BGN-3036', 'a', 'a', 'a', NULL, '1242-12-12', 'Registered', 'Male', '09213058032', NULL, '123-A', 3, 5, NULL, 'Spouse', 2, 1, 2, 'Old Resident', '2008-02-12', 0, 'Barangay ID', 'resident_ids/front/QxuqeUV7ZrWIZkAuH37XruM1LBKYrZKJLRKhB4Rr.png', 'resident_ids/back/qcQYX4pNsK0gnUTIBwv7UkoUS4pK5IawGlRvWMwd.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 10:02:05', '2026-02-14 10:02:05', NULL),
(56, NULL, 'BGN-0498', 'a', 'a', 'a', NULL, '0219-03-12', 'Registered', 'Female', '09655259387', NULL, '123-ADC', 2, 3, NULL, 'Head of Family', 1, 1, 4, 'Old Resident', '2009-01-01', 0, 'Barangay ID', 'resident_ids/front/aWEY8Bro9t6sph33zHVqTUV8Dgs5jHIhoNzepLIo.png', 'resident_ids/back/P5nDjYRGF3Cmu9JHligCRZTassDtKimhQFCrC530.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 10:05:43', '2026-02-14 10:05:43', NULL),
(57, NULL, 'BGN-7712', 'a', 'a', 'a', NULL, '0219-03-12', 'Registered', 'Female', '09655259387', NULL, '123-ADC', 2, 3, NULL, 'Head of Family', 1, 1, 3, 'New Resident', '2021-04-01', 0, 'Barangay ID', 'resident_ids/front/CrXr6e3BzbSyB5FBgzDXpMqwaXO8RyYEFd2l0Nes.png', 'resident_ids/back/kXOkSkBBhxzR1H55bKibXUqBLOI6J3r0C9RMeLgO.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 10:06:38', '2026-02-14 10:06:38', NULL),
(58, NULL, 'BGN-5933', 'a', 'a', 'a', NULL, '0001-02-12', 'Registered', 'Male', '09655259387', NULL, '123-A', 2, 4, NULL, 'Househelp', 2, 1, 1, 'Old Resident', '2004-01-01', 0, 'Barangay ID', 'resident_ids/front/mnnoOsMRLA2kNs41Mue5PY7bGc8mUHsyt3G1jFHe.png', 'resident_ids/back/4LxFQ0IFHoQnsboABSBvFAjmYZDloum6Rm75BYnj.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 10:31:07', '2026-02-14 10:31:07', NULL),
(59, NULL, 'BGN-8240', 'a', 'a', 'a', NULL, '0213-03-21', 'Registered', 'Male', '09931996212', NULL, '123-A', 5, 9, NULL, 'Spouse', 2, 1, 2, 'Old Resident', '2000-01-01', 0, 'Barangay ID', 'resident_ids/front/gMUzSJPzEv3O2ydtLT5juGMZPlggNSidK7fZkCRN.png', 'resident_ids/back/ETMXpbm2WYoZBpLJttVX8CT90Ijt0HFIbc3CjqSl.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 10:56:05', '2026-02-14 10:56:05', NULL),
(60, 'BGN-00019', 'BGN-0939', 'A', 'a', 'a', NULL, '0222-11-23', 'Registered', 'Female', '09655259387', NULL, '123-A', 2, 3, 1, 'Son', 3, 1, 2, 'Old Resident', '2007-11-21', 0, 'Barangay ID', 'resident_ids/front/v5IAZKNUPPyGVUrqEatGI737qWV8bCJ6nXVCQS1S.png', 'resident_ids/back/KdbbmGeG0LFkYEM6J0jWMLUki8nc0AzRYE2KMfg7.png', 'Verified', NULL, '2026-02-14 13:03:11', NULL, NULL, '2026-02-14 11:00:31', '2026-02-14 13:03:11', NULL),
(61, 'BRGY-2026-53220', 'BGN-3277', 'Q', 'a', 'a', NULL, '0222-11-23', 'Registered', 'Female', '09655259387', NULL, '123-B', 2, 3, 2, 'Son', 3, 1, 2, 'New Resident', '2004-12-11', 0, 'Barangay ID', 'resident_ids/front/LbH95TTr3zqAiYdwIMWZRrpWCe6qYlmmnxEmElZj.png', 'resident_ids/back/wBzk7SqREiUD0S8N8MklhAYV8iuAcndjTMcnHt4u.png', 'Verified', NULL, '2026-02-14 12:47:06', NULL, NULL, '2026-02-14 11:02:16', '2026-02-14 12:47:06', NULL),
(62, 'BGN-00018', 'BGN-7921', 'Z', 's', 'qq', NULL, '0212-03-21', 'Registered', 'Male', '09213058032', NULL, '123-A', 2, 4, 11, 'Spouse', 2, 1, 2, 'New Resident', '2005-11-12', 0, 'Barangay ID', 'resident_ids/front/gEfRGYjFTlIwy87SrpxZmtnyc4hXERG0DgJSTbwi.png', 'resident_ids/back/ko2K93VeKr8DtExBJHht2kAuwQLyocTQgxM8X07f.png', 'Verified', NULL, '2026-02-14 13:02:04', NULL, NULL, '2026-02-14 11:03:27', '2026-02-14 13:02:04', NULL),
(63, 'BGN-00017', 'BGN-5047', 'a', 'a', 'a', NULL, '0002-03-12', 'Registered', 'Male', '09655259387', NULL, '123-A', 2, 4, 11, 'Househelp', 2, 1, 1, 'Old Resident', '0001-02-12', 1, 'Barangay ID', 'resident_ids/front/WemvUJ7Sp6hMxe0eFqRYwL98pzLbV20UozNlyl72.png', 'resident_ids/back/S7arYLDln5lVDVldyQS80rycitf4EvOluDLCbJWL.png', 'Verified', NULL, '2026-02-14 13:01:07', NULL, NULL, '2026-02-14 11:59:06', '2026-02-14 13:01:07', NULL),
(64, 'BGN-00020', 'BGN-6192', 'a', 'a', 'a', NULL, '0021-03-21', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, 3, 'Househelp', NULL, 1, NULL, 'New Resident', NULL, 0, NULL, 'resident_ids/front/QHnLJV12oZeBylQMabNJdeThUEmel0Dlrg7eTMvo.png', 'resident_ids/back/V3nYhnABKg1ry8Q1Q2khslCoGXwYV5NhuFdtX9nd.png', 'Verified', NULL, '2026-02-14 13:54:01', NULL, NULL, '2026-02-14 13:53:39', '2026-02-14 13:54:01', NULL),
(65, NULL, 'BGN-3387', 'a', 'a', 'a', NULL, '0021-03-21', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'Old Resident', NULL, 0, NULL, 'resident_ids/front/FBEznfxnFLEzjSVOAuA2upfsnkU5bzsFHjYVKPCx.png', 'resident_ids/back/j1YZxpUyrdzxNUVqfadOf6cy02qmdWjMfVwynihG.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 13:55:47', '2026-02-14 13:55:47', NULL),
(66, NULL, 'BGN-9265', 'a', 'a', 'a', NULL, '2002-03-21', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'Old Resident', NULL, 0, NULL, 'resident_ids/front/rpflZK22nip0DB97qs3xbuY1NpIg2kp7dvfwr4xC.png', 'resident_ids/back/VcMZjEe2MsjtUsqEvLZaaFCFPvMdqIB6ZYiVmWtM.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 13:56:13', '2026-02-14 13:56:13', NULL),
(67, NULL, 'BGN-3713', 'a', 'a', 'a', NULL, '2002-03-21', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'Old Resident', NULL, 0, NULL, 'resident_ids/front/pQ029MC7nrpEA9DX087AKt1vwp8MNdE1VTc6Eq3J.png', 'resident_ids/back/n2hksSY9EJwNcvtLYjDvkex1RDVJvmQ4eGi1tDwZ.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:00:30', '2026-02-14 14:00:30', NULL),
(68, NULL, 'BGN-8658', 'asd', 'a', 'a', NULL, '2002-03-21', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'Old Resident', NULL, 0, NULL, 'resident_ids/front/TmV6Dx7ORoblGAadQA2yxIjZst8tRUGOthHXqSBm.png', 'resident_ids/back/w4YoQdl5nAwKYvE7P8EWQDJ8JqGgXqePGn1UYCmO.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:00:46', '2026-02-14 14:00:46', NULL),
(69, NULL, 'BGN-4067', 'asdd', 'a', 'a', NULL, '2002-03-21', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'Old Resident', NULL, 0, NULL, 'resident_ids/front/43SMQ0K3x5sXkQsaCX0XwpEjyQmmcfQqQRdvZTeS.png', 'resident_ids/back/FtKhqwRSRz1WcH1v0Hs9rv0x5t2NEv1o9BGTt5an.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:01:06', '2026-02-14 14:01:06', NULL),
(70, NULL, 'BGN-3478', 'asdd', 'a', 'a', NULL, '2002-03-21', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'Old Resident', NULL, 0, NULL, 'resident_ids/front/btnO5kHU4t4GTnL0xvqMcDJWt6P7CgqK5qJggcLF.png', 'resident_ids/back/lXekQI22sogHqIs2pe7Ou0PVT3k8hYUaFxudWNNE.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:01:20', '2026-02-14 14:01:20', NULL),
(71, NULL, 'BGN-9451', 'asdd', 'a', 'a', NULL, '2002-03-21', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'Old Resident', NULL, 0, NULL, 'resident_ids/front/YURZxfc4BZiE1fjf4NxZn7NwNkNOOlTjs9rXe7aU.png', 'resident_ids/back/Wi0pa9hleaRM5vwI71NPru22UZfmnnCyXNOBNehO.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:03:10', '2026-02-14 14:03:10', NULL),
(72, NULL, 'BGN-9598', 'asdd', 'a', 'a', NULL, '2002-03-21', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'Old Resident', NULL, 0, NULL, 'resident_ids/front/kir2Q58i8acgL6P6znju07Msue01Dyx0wYpAWqlE.png', 'resident_ids/back/xeyKSNks2tTyovCkmy6eczYePjrCfMKf2SyTlfws.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:04:19', '2026-02-14 14:04:19', NULL),
(73, NULL, 'BGN-9528', 'asdd', 'a', 'a', NULL, '2002-03-21', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'Old Resident', NULL, 0, NULL, 'resident_ids/front/m2U4QmMb1eRmSs1s3qXS6dbi9vj9YNtGJvMzLdp1.png', 'resident_ids/back/I9LmzMRoxumD91uSVW1zsWwKGkV47ALsIxmrYMuJ.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:04:31', '2026-02-14 14:04:31', NULL),
(74, NULL, 'BGN-3230', 'asdd', 'a', 'a', NULL, '2002-03-21', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'Old Resident', NULL, 0, NULL, 'resident_ids/front/TuYyedX1HgWbUriWRPaQnrFcWdUQ5ap8EM38fmVt.png', 'resident_ids/back/rP7rXfqipjhC2dkL7S79gU7F9F6e0RYh5sZUNqAm.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:06:23', '2026-02-14 14:06:23', NULL),
(75, NULL, 'BGN-4490', 'dsadas', 'a', 'a', NULL, '2002-03-21', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'Old Resident', NULL, 0, NULL, 'resident_ids/front/aD15D03GvLYl8YfbQfqDEt7fVMtPmICREtgU1wLd.png', 'resident_ids/back/AWEOKZcHzb4ewxHOelY8NrVEGtZnQJ8fVlN1UC7T.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:06:33', '2026-02-14 14:06:33', NULL),
(76, NULL, 'BGN-1441', 'dsadas', 'a', 'a', NULL, '2002-03-21', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'New Resident', '2001-01-01', 0, NULL, 'resident_ids/front/piJzpvFbhOR2AOVpMPYRUXXHC4M8ALMscPFaAAsS.png', 'resident_ids/back/WjxEiY5CHyWq4zVgpmxHiCA3piY9TE4zPuZnwspH.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:14:18', '2026-02-14 14:14:18', NULL),
(77, NULL, 'BGN-0965', 'dsadas', 'a', 'a', NULL, '2002-03-21', NULL, 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'New Resident', '2001-01-01', 0, NULL, 'resident_ids/front/JMpnCDPE2G44CQ9IJRhLmPebwwEnux7bOObjxDsQ.png', 'resident_ids/back/XSaABu5wD8XLGXzQYuU2y3wgCWWTRltcpaCSkhYb.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:18:20', '2026-02-14 14:18:20', NULL),
(78, NULL, 'BGN-7830', 'dsadas', 'a', 'a', NULL, '2002-03-21', 'Registered', 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'New Resident', '2015-05-21', 0, NULL, 'resident_ids/front/aqgBu6HwhQSt9J1EHU3ifEiSaEyHyTfXkMCPwgDW.png', 'resident_ids/back/joigHDqRwhBgkEqohYYqgBFmjvx19mz1PuqwyNdp.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:34:49', '2026-02-14 14:34:49', NULL),
(79, 'BGN-00021', 'BGN-7329', 'dsadas', 'a', 'a', NULL, '2002-03-21', 'Registered', 'Female', '09141391637', NULL, '123-A', 3, 5, 3, 'Househelp', NULL, 1, NULL, 'New Resident', '2015-05-21', 0, NULL, 'resident_ids/front/zYRdOS95sZU2XyNmoINiHKLEZqIjhufV1A4xH8mf.png', 'resident_ids/back/b9LT9AaFfgwLHgAf1QKGroBcaNsNvFv1LFTIdkjV.png', 'Verified', NULL, '2026-02-14 14:38:26', NULL, NULL, '2026-02-14 14:34:55', '2026-02-14 14:38:26', NULL),
(80, NULL, 'BGN-6594', 'dsadas', 'a', 'a', NULL, '2002-03-21', 'Registered', 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'New Resident', '2015-05-21', 0, NULL, 'resident_ids/front/lOQkqfIsokIpijhbQieRskqUXuOUtgizDQkHfyCw.png', 'resident_ids/back/0Lafnp19pPpx9UVlVbVe0OPbeHLjc0WYJCZB9ax8.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:38:54', '2026-02-14 14:38:54', NULL),
(81, NULL, 'BGN-7606', 'dsadas', 'a', 'a', NULL, '2002-03-21', 'Registered', 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'New Resident', '2015-05-21', 0, NULL, 'resident_ids/front/nTyxtwtZvgtFSsnOjPwIHbwt4DXLiOLLye2XtakI.png', 'resident_ids/back/GEgjQyWUttXL4irsgTfcFpSgLqIY0sSYk3FcdMnh.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:39:18', '2026-02-14 14:39:18', NULL),
(82, NULL, 'BGN-2199', 'saweq', 'a', 'a', NULL, '2002-03-21', 'Registered', 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', NULL, 1, NULL, 'New Resident', '2015-05-21', 0, NULL, 'resident_ids/front/HGcUkjOnAcHT5dVcXdzwH1QwJFjuvEq5FrNF9PXE.png', 'resident_ids/back/2XIqhlAlzVShkYkoUppEouZkrut2yJqGVlOqrm6m.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:39:49', '2026-02-14 14:39:49', NULL),
(83, NULL, 'BGN-3614', 'saweq', 'a', 'a', NULL, '2002-03-21', 'Registered', 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', 2, 1, NULL, 'New Resident', '2015-05-21', 0, NULL, 'resident_ids/front/Sw3cRiWvTY2NIi6y55zf2pS6pNPW2YQh8ppWol8d.png', 'resident_ids/back/IocequjAfI0OiiK3HGlUCognzvoWcG7ToWolIrVx.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:42:07', '2026-02-14 14:42:07', NULL),
(84, NULL, 'BGN-2013', 'saweq', 'a', 'a', NULL, '2002-03-21', 'Registered', 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', 2, 1, NULL, 'New Resident', '0312-09-21', 0, NULL, 'resident_ids/front/EzKrIrMxw3n5EETwAdN5MeQqE1mN64hJzBpkGFFO.png', 'resident_ids/back/Ct7QLgDjsUiixBRFKFO0RL6nlLzB2rZuom2zlps9.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:42:32', '2026-02-14 14:42:32', NULL),
(85, NULL, 'BGN-9738', 'saweq', 'a', 'a', NULL, '2002-03-21', 'Registered', 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', 2, 1, NULL, 'New Resident', '0312-09-21', 0, NULL, 'resident_ids/front/DTV9SyW2yisXhrzY7y9XfmK6yBpOFSSzwgfF7pnm.png', 'resident_ids/back/ivQkcmuqN5mJ17etveVmfGOmZ78edK2WQbxWKZzd.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:43:01', '2026-02-14 14:43:01', NULL),
(86, NULL, 'BGN-4314', 'wqsad', 'a', 'a', NULL, '2002-03-21', 'Registered', 'Female', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', 2, 1, NULL, 'New Resident', '0312-09-21', 0, NULL, 'resident_ids/front/Hj11jGsAOXdiQd0Akm82o68TtkW1OZB42LMK5Uhj.png', 'resident_ids/back/kihVI2YBXSNZhYh78oyX80Adb7yvYhSj9Ep1HlAz.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-14 14:43:08', '2026-02-14 14:43:08', NULL),
(87, 'BGN-00023', 'BGN-2956', 'wqsaz', 'a', 'a', NULL, '2002-03-21', 'Registered', 'Female', '09141391637', NULL, '123-A', 3, 5, 3, 'Househelp', 2, 1, NULL, 'New Resident', '0312-09-21', 0, NULL, 'resident_ids/front/XROWMvPgtFOoolU2ca2leJtDhKCVk55tkNCcK4Wp.png', 'resident_ids/back/19X6QgihZjkUPuYqmGF7vV1MlPHv81ANdmU3svPN.png', 'Verified', NULL, '2026-02-14 14:45:46', NULL, NULL, '2026-02-14 14:43:13', '2026-02-14 14:45:46', NULL),
(88, 'BGN-00022', 'BGN-0798', 'dsadq', 'q', 's', NULL, '0124-04-21', 'Registered', 'Male', '09655259387', NULL, '213', 3, 5, 13, 'Spouse', 4, 1, NULL, 'Old Resident', '2017-11-12', 0, NULL, 'resident_ids/front/qPXUjKmVfeY70QXPYgfjCOmeVnBbH1FyANG6jC1k.png', 'resident_ids/back/ofbCRy4Cc4vG6PW2i1ki3lP1bwcB64Vw5rIY6M2c.png', 'Verified', NULL, '2026-02-14 14:45:39', NULL, NULL, '2026-02-14 14:44:31', '2026-02-14 14:45:39', NULL),
(89, 'BGN-00024', 'BGN-3546', 'dsadq', 'q', 's', NULL, '0124-04-21', 'Registered', 'Male', '09655259387', NULL, '213', 3, 5, 13, 'Spouse', 4, 1, NULL, 'Old Resident', '2017-11-12', 0, NULL, 'resident_ids/front/bofwzMa0gLP028R6oL49dgpdIkt4wMzrmtyDab6e.png', 'resident_ids/back/W48XDdM952ZnW5U3DUvS0daR94upbULm6OODUkMY.png', 'Verified', NULL, '2026-02-14 14:46:13', NULL, NULL, '2026-02-14 14:46:08', '2026-02-14 14:46:13', NULL),
(95, NULL, 'BGN-4716', 'a', 'a', 'a', NULL, '0001-02-12', 'Not Registered', 'Male', '09931996212', NULL, '123-AD', 3, 6, NULL, 'Son', 4, 1, NULL, 'New Resident', '2002-12-12', 0, NULL, 'resident_ids/front/6VBghF9zmINwuG7wSBi41NFEhJZ9vDKvSlZmbJOF.png', 'resident_ids/back/MBd4RONsbqFKvVL7MvRljBOiz5ieQgHO4qc1184B.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 01:33:23', '2026-02-15 01:33:23', NULL),
(96, NULL, 'BGN-0115', 'a', 'a', 'a', 'Sr.', '0123-03-12', 'Not Registered', 'Male', '09655259387', NULL, '123-A', 2, 3, NULL, 'Son', 3, 1, NULL, 'Old Resident', '2002-12-12', 0, NULL, 'resident_ids/front/7btaS73Uk5hxlQfySTSLGOfKl3aAfGCAvDlMlDpT.png', 'resident_ids/back/k465bUt1X7B8e4iugFu3YjoQxwhGJb9W7uckztoc.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 01:35:49', '2026-02-15 01:35:49', NULL),
(97, NULL, 'BGN-5732', 'a', 'a', 'a', 'Sr.', '0123-03-12', 'Not Registered', 'Male', '09655259387', NULL, '123-A', 2, 3, NULL, 'Son', 3, 1, NULL, 'Old Resident', '2002-12-12', 0, NULL, 'resident_ids/front/XVrkQusyrjzAWtiPDo3k4nilhUmEatoWyN4Dax8P.png', 'resident_ids/back/OK7oVAhWNABWM01eBOpV7XeHw1sRCoHa2pfK1a2u.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 01:36:16', '2026-02-15 01:36:16', NULL),
(98, NULL, 'BGN-1994', 'as', 'a', 'a', 'Sr.', '0123-03-12', 'Not Registered', 'Male', '09655259387', NULL, '123-A', 2, 3, NULL, 'Son', 3, 1, NULL, 'Old Resident', '2002-12-12', 0, NULL, 'resident_ids/front/BEv7MQSotbSIU4P68LzmGLVje0noHWlpY49E3Bet.png', 'resident_ids/back/c3MjB54DT3TcFGILMTrgRt9lfs4KnBMgZ9I15qFI.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 01:37:14', '2026-02-15 01:37:14', NULL),
(99, NULL, 'BGN-0118', 'a', 'a', 'a', NULL, '0021-12-12', 'Registered', 'Male', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', 5, 1, 5, 'Old Resident', '0012-02-21', 0, NULL, 'resident_ids/front/IOU1io6UKEgsH6nmM0I0W66bLHmb9WW2sFsAuWKr.png', 'resident_ids/back/JpvO1ZNjdQlExYZWQwY4dC6a2astszUfOe5XTaaf.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 01:56:15', '2026-02-15 01:56:15', NULL),
(100, NULL, 'BGN-4204', 'a', 'a', 'a', NULL, '0021-12-12', 'Registered', 'Male', '09141391637', NULL, '123-A', 3, 5, NULL, 'Househelp', 4, 1, 4, 'Old Resident', '0012-02-21', 0, NULL, 'resident_ids/front/xUwDQTajVZBtC8nanXSgVWGWEhfmxMHQjW4QkmqC.png', 'resident_ids/back/tSztlHkMQsOcrbn02icoQHdRotop76uMBcn8ONB2.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 01:57:50', '2026-02-15 01:57:50', NULL),
(101, NULL, 'BGN-5555', 'b', 'b', 'b', 'Sr.', '2020-11-11', 'Not Registered', 'Male', '09421849218', NULL, '123-A', 4, 7, NULL, 'Relative', 4, 1, 4, 'New Resident', '2020-12-11', 0, NULL, 'resident_ids/front/lDAJB3eEoLoubRMorrxJR3vw9O6Kijjt0pugoHPp.png', 'resident_ids/back/ypZnKNtbVgCIfbjdmXbgPhmJ2egeCMyMlYe8oKTi.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:00:35', '2026-02-15 02:00:35', NULL),
(102, NULL, 'BGN-2686', 'b', 'b', 'b', 'Sr.', '2020-11-11', 'Not Registered', 'Male', '09421849218', NULL, '123-A', 4, 7, NULL, 'Relative', 4, 2, 4, 'New Resident', '2020-12-11', 0, NULL, 'resident_ids/front/SVK6zt8iy24y2QZP5jyhOiksKHtW9ZvNX3gd0Qt9.png', 'resident_ids/back/hvgml4yhX3ffrTnzjRPKrUCgZo71SVMIaItZ2v7A.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:03:27', '2026-02-15 02:03:27', NULL),
(103, NULL, 'BGN-9424', 'b', 'b', 'b', 'Sr.', '2020-11-11', 'Not Registered', 'Male', '09421849218', NULL, '123-A', 4, 7, NULL, 'Relative', 4, 7, 8, 'New Resident', '2020-12-11', 0, NULL, 'resident_ids/front/IsyPRxV0JWmkrvq6YnIMBd7FH6dQnsrS3PHpZVBs.png', 'resident_ids/back/vcaabH7lVZhslb1K3IiMQTvHzCiLlQWfi6e9VlD5.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:06:19', '2026-02-15 02:06:19', NULL),
(104, NULL, 'BGN-0905', 'b', 'b', 'b', 'Sr.', '2020-11-11', 'Not Registered', 'Male', '09421849218', NULL, '123-A', 4, 7, NULL, 'Relative', 4, 1, 1, 'New Resident', '2020-12-11', 0, NULL, 'resident_ids/front/RlTDlbSdx8BiBNNxCpJ1Zx754N9enR6W9zkdGM7W.png', 'resident_ids/back/T8lnoBrcXmYPhAcqTH2dABArZ3A6iHs6hP2H8fkk.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:07:32', '2026-02-15 02:07:32', NULL),
(105, NULL, 'BGN-8996', 'b', 'b', 'b', 'Sr.', '2020-11-11', 'Not Registered', 'Male', '09421849218', NULL, '123-A', 4, 7, NULL, 'Relative', 4, 8, 1, 'New Resident', '2020-12-11', 0, NULL, 'resident_ids/front/KhWvhInj0BxYS1UzqU3Twv5KgSMpCmgyS92lLRw9.png', 'resident_ids/back/VgfElciQfvKdwuZodurJmy0hZCf25aNqLwKCZAHO.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:08:17', '2026-02-15 02:08:17', NULL),
(106, NULL, 'BGN-7196', 'b', 'b', 'b', 'Sr.', '2020-11-11', 'Not Registered', 'Male', '09421849218', NULL, '123-A', 4, 7, NULL, 'Relative', 2, 8, 6, 'New Resident', '2020-12-11', 0, NULL, 'resident_ids/front/6tzxkCENuluQH3nleU1V3GRT2rT8sO1lEvW1TEQw.png', 'resident_ids/back/ggmoFawZUPKaa7BL7nv17H4GjM9DZbivEWWeDdnk.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:08:38', '2026-02-15 02:08:38', NULL),
(107, NULL, 'BGN-1601', 'b', 'b', 'b', 'Sr.', '2020-11-11', 'Not Registered', 'Male', '09421849218', NULL, '123-A', 4, 7, NULL, 'Relative', 2, 8, 6, 'New Resident', '2020-12-11', 0, NULL, 'resident_ids/front/pugkxtrtdLgkUyMMewuIpNJPko7FvgwLBPYwy3v7.png', 'resident_ids/back/uVHklBWjbgXoFtfVMfEFvuGcAZJoxUXWSAPcieaz.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:16:37', '2026-02-15 02:16:37', NULL),
(108, NULL, 'BGN-7481', 'b', 'b', 'b', 'Sr.', '2020-11-11', 'Not Registered', 'Male', '09421849218', NULL, '123-A', 4, 7, NULL, 'Relative', 2, 8, 6, 'New Resident', '2020-12-11', 0, NULL, 'resident_ids/front/Y1Tffanv4jJAQfTqcmAPe40dkznwjQjHlXU8Yvm8.png', 'resident_ids/back/ncrse8dKgSx76JZ89T5nyhSoSS4vGD4M231WQIrv.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:16:58', '2026-02-15 02:16:58', NULL),
(109, NULL, 'BGN-1968', 'b', 'b', 'b', 'Sr.', '2020-11-11', 'Not Registered', 'Male', '09421849218', NULL, '123-A', 4, 7, NULL, 'Relative', 2, 8, 6, 'New Resident', '2020-12-11', 0, NULL, 'resident_ids/front/lAGVVSnwoF9FJ7eFGpw0Ef7zWLkoz4Salmqoyyhu.png', 'resident_ids/back/4c0sMyYEyV93HhyXv7gLaepnrazJqpJQ5LJvzaYZ.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:17:07', '2026-02-15 02:17:07', NULL),
(110, NULL, 'BGN-1586', 'b', 'b', 'b', 'Sr.', '2020-11-11', 'Not Registered', 'Male', '09421849218', NULL, '123-A', 4, 7, NULL, 'Relative', 2, 8, 6, 'New Resident', '2020-12-11', 0, NULL, 'resident_ids/front/n9hc2fYyIuGiFPxNx6GCs49eeplWxXce3nUcv4gR.png', 'resident_ids/back/oCRLvISWQ8qnnX45jCBSgnqZRJ74yLhlZD89bR6j.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:17:18', '2026-02-15 02:17:18', NULL),
(111, NULL, 'BGN-2256', 'R', 'Hs', 'Hs', 'Sr.', '2022-02-13', 'Not Registered', 'Male', '09277272672', NULL, '12-E', 5, 9, NULL, 'Househelp', 5, 9, 4, 'Old Resident', '2007-02-15', 0, NULL, 'resident_ids/front/9IkuncWH5ZDoFLYxnMrMIc7hKkIScPMa9CYT5GKo.jpg', 'resident_ids/back/qj12N7fhGH9e0o8Z1CP9ae0wQzT4sluFwLgsGTi4.jpg', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:19:14', '2026-02-15 02:19:14', NULL),
(112, NULL, 'BGN-4744', 'b', 'b', 'b', 'Sr.', '2020-11-11', 'Not Registered', 'Male', '09421849218', NULL, '123-A', 4, 7, NULL, 'Relative', 2, 8, 6, 'New Resident', '2020-12-11', 0, NULL, 'resident_ids/front/oTuGgBx9zJG0ym1yo9eY2kQexswk6ozEgZ1iXTdV.png', 'resident_ids/back/K7YQsnb6blRe0Q1IpwZJFRzu9u6xvDxFsuI8u2FV.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:19:41', '2026-02-15 02:19:41', NULL),
(113, NULL, 'BGN-3745', 'a', 'a', 'a', NULL, '0021-03-21', 'Not Registered', 'Male', '09141391637', NULL, '123-A', 1, 1, NULL, 'Son', 1, 1, 1, 'Old Resident', '0121-02-12', 0, NULL, 'resident_ids/front/DyLajnGl198ceP6vKt3fTAwpOxtry0n5ZRIxcnOy.png', 'resident_ids/back/Bge6B1wnleWPnUrLwKJUozlZqdWHRg2zNNYQzGfs.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:24:49', '2026-02-15 02:24:49', NULL),
(114, NULL, 'BGN-0653', 'C', 'Hs', 'Hs', 'Sr.', '2022-02-13', 'Not Registered', 'Male', '09277272672', NULL, '12-E', 5, 9, NULL, 'Househelp', 5, 9, 4, 'Old Resident', '2007-02-15', 0, NULL, 'resident_ids/front/omxUq40rTonEIj1jyBXWGcIMmeVxcdyARQ5MDdli.jpg', 'resident_ids/back/AskOtTCJ9Htev4lJU8vHz26c8jCrjPsv61BTJdJu.jpg', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:29:42', '2026-02-15 02:29:42', NULL),
(115, NULL, 'BGN-4797', 'a', 'a', 'a', 'Jr.', '0021-03-21', 'Not Registered', 'Male', '09141391637', NULL, '123-A', 1, 1, NULL, 'Son', 1, 1, 1, 'Old Resident', '0121-02-12', 0, NULL, 'resident_ids/front/waQAsi2bbcChimc4ciaC5pj1zBo94V1RyCkjKDgo.png', 'resident_ids/back/SDZQTxsV3Q34VPxQa9clMHJGMjlyFkS3fyfRwVAf.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:35:19', '2026-02-15 02:35:19', NULL),
(116, NULL, 'BGN-4917', 'D', 'a', 'a', 'Jr.', '0021-03-21', 'Not Registered', 'Male', '09141391637', NULL, '123-A', 1, 1, NULL, 'Son', 1, 1, 1, 'Old Resident', '0121-02-12', 0, NULL, 'resident_ids/front/1cyPHhb4Kvo2KFkmZi2xHM60oJNHb98D8us1q24n.png', 'resident_ids/back/gsPZhKvjWwGtJ9YB0cIn6AvrdaaMttQScdo4xDF2.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:59:34', '2026-02-15 02:59:34', NULL),
(117, NULL, 'BGN-3597', 'D', 'a', 'a', 'Sr.', '0021-03-21', 'Not Registered', 'Male', '09141391637', NULL, '123-A', 1, 1, NULL, 'Son', 1, 1, 1, 'Old Resident', '0121-02-12', 0, NULL, 'resident_ids/front/KaVvWnhTOdZdDO6ktTGoEYewKrCFnrGhltR3SLUA.png', 'resident_ids/back/3iffCn9z71CKppLAhQmiMsUlfewEQmFovm256YEA.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 02:59:45', '2026-02-15 02:59:45', NULL),
(118, 'BGN-00025', 'BGN-5465', 'D', 'a', 'a', 'III', '0021-03-21', 'Not Registered', 'Male', '09141391637', NULL, '123-A', 1, 1, 7, 'Son', 1, 1, 1, 'Old Resident', '0121-02-12', 0, NULL, 'resident_ids/front/MRYsvkqRpW3f5U6YGMTfQ2GzKDmSSqrnhvNVaKAH.png', 'resident_ids/back/OxZRNbuc3fK4yQjIp5k00uFMjXrjJAjaoUuILpOD.png', 'Verified', NULL, '2026-02-15 03:00:34', NULL, NULL, '2026-02-15 02:59:54', '2026-02-15 03:00:34', NULL),
(119, 'BGN-00027', 'BGN-1722', 'D', 'a', 'a', 'III', '0021-03-21', 'Not Registered', 'Male', '09141391637', NULL, '123-A', 1, 1, 7, 'Son', 1, 1, 1, 'Old Resident', '0121-02-12', 0, NULL, 'resident_ids/front/qFjsqVKS2xk2BH8eQQXZpHMCoMkDldf9rBc7rOxE.png', 'resident_ids/back/YPAtAFUC0wXr3J0OpX2ifrccLq7okEtzF22VzoEh.png', 'Verified', NULL, '2026-02-15 03:12:25', NULL, NULL, '2026-02-15 03:12:11', '2026-02-15 03:12:25', NULL),
(120, NULL, 'BGN-7695', 'E', 'e', 'e', 'Sr.', '2002-12-12', 'Registered', 'Male', '09354898564', NULL, '123-A', 1, 1, NULL, 'Son', 4, 1, 2, 'Old Resident', '2002-02-11', 0, NULL, 'resident_ids/front/ZooryFCLIMOjbS7Zvw7cVm31szFF8iF6CQElByPW.png', 'resident_ids/back/KeNzKA3q5bU8Tmh3SSBp1LQPm3jOeyeYefUR8M5L.png', 'Pending', NULL, NULL, NULL, NULL, '2026-02-15 03:30:03', '2026-02-15 03:30:03', NULL),
(121, 'BGN-00028', 'BGN-4572', 'E', 'e', 'e', 'Sr.', '2002-12-12', 'Registered', 'Male', '09354898564', NULL, '321-A', 1, 1, 14, 'Son', 4, 1, 2, 'Old Resident', '2002-02-11', 0, NULL, 'resident_ids/front/q7s4KWGPzOjZZGWOkxPlgStC07OKvR6533RKyDr4.png', 'resident_ids/back/2xdW7WZKrCXcW84LfQ9mHplijV9AyBhbhWQaKWUS.png', 'Verified', NULL, '2026-02-15 03:33:53', NULL, NULL, '2026-02-15 03:33:24', '2026-02-15 03:33:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `resident_accounts`
--

CREATE TABLE `resident_accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `resident_id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `must_change_password` tinyint(1) NOT NULL DEFAULT 1,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `resident_accounts`
--

INSERT INTO `resident_accounts` (`id`, `resident_id`, `username`, `password`, `last_login_at`, `must_change_password`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 14, 'BGN-00001', '$2y$12$LfQXAMBBUh7J3ibmDdsCjenN/izZYMUK.qKr9zuNRejIQCHHXHZQO', NULL, 1, 1, '2026-02-12 03:24:06', '2026-02-12 03:24:06'),
(2, 15, 'BGN-00002', '$2y$12$lw/7IRUUJvYhj1srn4T5.OjfZkimee7yoV/ND7savl7VbNoJ37P.m', NULL, 1, 1, '2026-02-12 03:54:24', '2026-02-12 03:54:24'),
(3, 17, 'BGN-00003', '$2y$12$cjzFRiQ6evl4Txrfr/sHteaQGez7cPa4diPffG2.XA/yd02fZxXsO', NULL, 1, 1, '2026-02-12 04:00:44', '2026-02-12 04:00:44'),
(4, 18, 'BGN-00004', '$2y$12$tB6Ple4WYUxoWr9fErflUe7tJtOplHhaWT.CmhRaZc61A3xodmw/6', NULL, 1, 1, '2026-02-12 05:10:28', '2026-02-12 05:10:28'),
(5, 20, 'BGN-00005', '$2y$12$1o1wZj0ydwNcOyZePCLuFuRohwy66dkbOlS/nVmj2hP8UDRE0UBAe', NULL, 1, 1, '2026-02-12 05:21:59', '2026-02-12 05:21:59'),
(6, 23, 'BGN-00006', '$2y$12$rpGLxdPnQfqHgMtdWvZnX.tcXw5St78UdTghNhL6QylAXJMq6WdX6', NULL, 1, 1, '2026-02-12 05:25:02', '2026-02-12 05:25:02'),
(7, 21, 'BGN-00007', '$2y$12$kDqgqvDWGT4uMUy59vxyxO3oZyaguXfNfEEiA0eovAnD7VC06TLse', NULL, 1, 1, '2026-02-12 05:40:43', '2026-02-12 05:40:43'),
(8, 13, 'BGN-00008', '$2y$12$rG.sIIdDJLICZe6zZX7Fz.SsBOHES4E4kHmLWKjYbLQ7Ev5y9SYOC', NULL, 1, 1, '2026-02-12 05:47:33', '2026-02-12 05:47:33'),
(9, 26, 'BGN-00009', '$2y$12$6AeAMEH2HsoS0mw9aYO10O.Ab9DRH4B7Uv/PNTsJ6ATSKxOTkl/ES', NULL, 1, 1, '2026-02-12 05:50:16', '2026-02-12 05:50:16'),
(10, 1, 'BGN-00010', '$2y$12$RPMjoZaKoM9vphPHTgGyPO0pqSNE.WFKxUMW2Jt9GdLaWUafCm6pC', NULL, 1, 1, '2026-02-12 05:56:44', '2026-02-12 05:56:44'),
(11, 2, 'BGN-00011', '$2y$12$VJTLsD4Oh8ev5Q9DxtfOxuOuxiZlhtlOcxJTM1LguYFQXO6pawj1u', NULL, 1, 1, '2026-02-12 06:26:24', '2026-02-12 06:26:24'),
(12, 27, 'BGN-00012', '$2y$12$7cplowvn3qYd0tFbhr4XGevX/wnrKT7uDp5YGP8B4qe1aIGvBb4pq', NULL, 1, 1, '2026-02-12 06:35:48', '2026-02-12 06:35:48'),
(13, 9, 'BGN-00013', '$2y$12$BrvbX8lHGGYQqXslGRRJn.oMhVEUQLhGAzVZqyxh2ojIBgeMHI43K', NULL, 1, 1, '2026-02-12 08:38:39', '2026-02-12 08:38:39'),
(14, 11, 'BGN-00014', '$2y$12$FARZPE.2f1JJxDnIEgczwuY/GLgckHld6qAeDnz47ta52mrn6I4lO', NULL, 1, 1, '2026-02-12 08:41:24', '2026-02-12 08:41:24'),
(15, 28, 'BGN-00015', '$2y$12$AJtu7rzuE1VdUpw7mmzhIO5xDn55sUK2J69gDncF7v1jjDGhjGhze', NULL, 1, 1, '2026-02-13 05:39:33', '2026-02-13 05:39:33'),
(16, 61, 'BRGY-2026-53220', '$2y$12$MAM3IA3Waw7aRUpJ/vkpR.egh/uGBS3U6iPQNDpXjy8pRhGQcrKmK', NULL, 1, 1, '2026-02-14 12:47:06', '2026-02-14 12:47:06'),
(17, 10, 'BGN-00016', '$2y$12$1pSIPOYgnUiYEKTZXjm/rufHnUld0KYFL2NhSCjmsSx3kTqwtqP4i', NULL, 1, 1, '2026-02-14 12:51:32', '2026-02-14 12:51:32'),
(18, 63, 'BGN-00017', '$2y$12$l1Zd8rVlw.UoKtx8bRmkeuAM6RJMfKBV2SJjpaBAKjyGMSbvr9Tri', NULL, 1, 1, '2026-02-14 13:01:07', '2026-02-14 13:01:07'),
(19, 62, 'BGN-00018', '$2y$12$QVZObUDbpVh0Xt9t5kDhc.LEPtTpxJN3LPhLcKdY3stZmPYxeKHcm', NULL, 1, 1, '2026-02-14 13:02:04', '2026-02-14 13:02:04'),
(20, 60, 'BGN-00019', '$2y$12$0kJWbLV0UfpkDzRVSXARqOEWl9En9ssOuhNzajnlcp79X4QDgdMTy', NULL, 1, 1, '2026-02-14 13:03:11', '2026-02-14 13:03:11'),
(21, 64, 'BGN-00020', '$2y$12$jmQAvmaZYDfOEyXGJSLrP.0MVSvzvAskEYONo7LG1gpO6OiaHXSem', NULL, 1, 1, '2026-02-14 13:54:01', '2026-02-14 13:54:01'),
(22, 79, 'BGN-00021', '$2y$12$vs.y/GclMenh9yEocEHXTeQCUa48Og43ohNs0PpcvQ7gkroVBJRZO', NULL, 1, 1, '2026-02-14 14:38:26', '2026-02-14 14:38:26'),
(23, 88, 'BGN-00022', '$2y$12$oxHljVlKq3DIM5BwDQds9eeNrZS/mvz0mF8tZiJYzNePCV0osEu5q', NULL, 1, 1, '2026-02-14 14:45:39', '2026-02-14 14:45:39'),
(24, 87, 'BGN-00023', '$2y$12$u7Z0jOluZtMb7YRjMj9V7etHBEy1CPq8hLTHcHU7UEgo3wXRG0ukK', NULL, 1, 1, '2026-02-14 14:45:46', '2026-02-14 14:45:46'),
(25, 89, 'BGN-00024', '$2y$12$uYPy1H9LxGWYIMGuwnPIuetFI2TbabLH0vgVIGKlglGe67X7QH.CK', NULL, 1, 1, '2026-02-14 14:46:13', '2026-02-14 14:46:13'),
(26, 118, 'BGN-00025', '$2y$12$BO661XiGFGbCfzTcQtfIkOazluZPzzYOlSMYSy9ddQIgMlRfVvbFi', NULL, 1, 1, '2026-02-15 03:00:34', '2026-02-15 03:00:34'),
(27, 8, 'BGN-00026', '$2y$12$ssKcKMKgV0EZAp2FgBXDT.owR8MkLv2rXohC3uQbG2HlN.FBHbgsm', NULL, 1, 1, '2026-02-15 03:03:27', '2026-02-15 03:03:27'),
(28, 119, 'BGN-00027', '$2y$12$Tx.ZFkTCPGUSyxhx0RJ.eOixI9ZfSeMSO3/Fdwz2ddhBM2XZJFr.m', NULL, 1, 1, '2026-02-15 03:12:25', '2026-02-15 03:12:25'),
(29, 121, 'BGN-00028', '$2y$12$jTfussiiFOR/ydu5z5MHuOVwZwRu6QHgKliPgmtemL0GUt0sSGbPK', NULL, 1, 1, '2026-02-15 03:33:53', '2026-02-15 03:33:53');

-- --------------------------------------------------------

--
-- Table structure for table `sectors`
--

CREATE TABLE `sectors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sectors`
--

INSERT INTO `sectors` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Solo Parent', 'Single parents with custody of children', 1, '2026-02-14 11:33:59', '2026-02-14 11:33:59'),
(2, 'PWD', 'Persons with Disabilities', 1, '2026-02-14 11:33:59', '2026-02-14 11:33:59'),
(3, 'Senior Citizen', 'Residents aged 60 and above', 1, '2026-02-14 11:33:59', '2026-02-14 11:33:59'),
(4, 'LGBTQIA+', 'Inclusivity sector for diverse orientations', 1, '2026-02-14 11:33:59', '2026-02-14 11:33:59'),
(5, 'Kasambahay', 'Domestic workers within the barangay', 1, '2026-02-14 11:33:59', '2026-02-14 11:33:59'),
(6, 'OFW', 'Overseas Filipino Workers', 1, '2026-02-14 11:33:59', '2026-02-14 11:33:59'),
(7, 'General Population', 'Regular residents with no special sector classification', 1, '2026-02-14 11:36:39', '2026-02-14 11:36:39'),
(8, '4', NULL, 1, '2026-02-15 02:06:19', '2026-02-15 02:06:19');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('LiuaFs4jmroxF8Xn67IATopIeJsgDo1mt9nFCPYl', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZGJjVnI3NGVpYkY5YldxVHRkUW9jZ2tFb1lhb0ZrdlMybTA1ZEI0SCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770772849);

-- --------------------------------------------------------

--
-- Table structure for table `streets`
--

CREATE TABLE `streets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `purok_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `streets`
--

INSERT INTO `streets` (`id`, `purok_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sisa St.', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(2, 1, 'Crisostomo St.', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(3, 2, 'Ibarra St.', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(4, 2, 'Elias St.', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(5, 3, 'Maria Clara St.', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(6, 3, 'Basilio St.', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(7, 4, 'Salvi St.', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(8, 4, 'Victoria St.', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(9, 5, 'Tiago St.', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(10, 5, 'Tasio St.', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(11, 6, 'Guevarra St.', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(12, 6, 'Sinang St.', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(13, 7, 'Alfarez St.', '2026-02-09 19:46:35', '2026-02-09 19:46:35'),
(14, 7, 'Doña Victorina St.', '2026-02-09 19:46:35', '2026-02-09 19:46:35');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `education_data`
--
ALTER TABLE `education_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `education_data_resident_id_index` (`resident_id`);

--
-- Indexes for table `employment_data`
--
ALTER TABLE `employment_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employment_data_resident_id_index` (`resident_id`);

--
-- Indexes for table `households`
--
ALTER TABLE `households`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_address` (`house_number`,`street_id`,`purok_id`),
  ADD UNIQUE KEY `households_household_id_unique` (`household_id`),
  ADD KEY `households_purok_id_foreign` (`purok_id`),
  ADD KEY `households_street_id_foreign` (`street_id`),
  ADD KEY `households_head_resident_id_index` (`head_resident_id`);

--
-- Indexes for table `marital_statuses`
--
ALTER TABLE `marital_statuses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `marital_statuses_name_unique` (`name`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nationalities`
--
ALTER TABLE `nationalities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nationalities_name_unique` (`name`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `puroks`
--
ALTER TABLE `puroks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `puroks_number_unique` (`number`);

--
-- Indexes for table `residents`
--
ALTER TABLE `residents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `residents_tracking_number_unique` (`tracking_number`),
  ADD UNIQUE KEY `residents_barangay_id_unique` (`barangay_id`),
  ADD KEY `residents_marital_status_id_foreign` (`marital_status_id`),
  ADD KEY `residents_nationality_id_foreign` (`nationality_id`),
  ADD KEY `residents_sector_id_foreign` (`sector_id`),
  ADD KEY `residents_verified_by_foreign` (`verified_by`),
  ADD KEY `residents_barangay_id_index` (`barangay_id`),
  ADD KEY `residents_tracking_number_index` (`tracking_number`),
  ADD KEY `residents_status_index` (`status`),
  ADD KEY `residents_household_id_index` (`household_id`),
  ADD KEY `residents_last_name_first_name_index` (`last_name`,`first_name`);

--
-- Indexes for table `resident_accounts`
--
ALTER TABLE `resident_accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `resident_accounts_resident_id_unique` (`resident_id`),
  ADD UNIQUE KEY `resident_accounts_username_unique` (`username`),
  ADD KEY `resident_accounts_username_index` (`username`);

--
-- Indexes for table `sectors`
--
ALTER TABLE `sectors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sectors_name_unique` (`name`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `streets`
--
ALTER TABLE `streets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `streets_purok_id_index` (`purok_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `education_data`
--
ALTER TABLE `education_data`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `employment_data`
--
ALTER TABLE `employment_data`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `households`
--
ALTER TABLE `households`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `marital_statuses`
--
ALTER TABLE `marital_statuses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `nationalities`
--
ALTER TABLE `nationalities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `puroks`
--
ALTER TABLE `puroks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `residents`
--
ALTER TABLE `residents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT for table `resident_accounts`
--
ALTER TABLE `resident_accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `sectors`
--
ALTER TABLE `sectors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `streets`
--
ALTER TABLE `streets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `education_data`
--
ALTER TABLE `education_data`
  ADD CONSTRAINT `education_data_resident_id_foreign` FOREIGN KEY (`resident_id`) REFERENCES `residents` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `employment_data`
--
ALTER TABLE `employment_data`
  ADD CONSTRAINT `employment_data_resident_id_foreign` FOREIGN KEY (`resident_id`) REFERENCES `residents` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `households`
--
ALTER TABLE `households`
  ADD CONSTRAINT `households_head_resident_id_foreign` FOREIGN KEY (`head_resident_id`) REFERENCES `residents` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `households_purok_id_foreign` FOREIGN KEY (`purok_id`) REFERENCES `puroks` (`id`),
  ADD CONSTRAINT `households_street_id_foreign` FOREIGN KEY (`street_id`) REFERENCES `streets` (`id`);

--
-- Constraints for table `residents`
--
ALTER TABLE `residents`
  ADD CONSTRAINT `residents_household_id_foreign` FOREIGN KEY (`household_id`) REFERENCES `households` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `residents_marital_status_id_foreign` FOREIGN KEY (`marital_status_id`) REFERENCES `marital_statuses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `residents_nationality_id_foreign` FOREIGN KEY (`nationality_id`) REFERENCES `nationalities` (`id`),
  ADD CONSTRAINT `residents_sector_id_foreign` FOREIGN KEY (`sector_id`) REFERENCES `sectors` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `residents_verified_by_foreign` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `resident_accounts`
--
ALTER TABLE `resident_accounts`
  ADD CONSTRAINT `resident_accounts_resident_id_foreign` FOREIGN KEY (`resident_id`) REFERENCES `residents` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `streets`
--
ALTER TABLE `streets`
  ADD CONSTRAINT `streets_purok_id_foreign` FOREIGN KEY (`purok_id`) REFERENCES `puroks` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
