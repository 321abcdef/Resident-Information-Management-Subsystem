-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 15, 2026 at 01:01 PM
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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employment_data`
--
ALTER TABLE `employment_data`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resident_accounts`
--
ALTER TABLE `resident_accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
