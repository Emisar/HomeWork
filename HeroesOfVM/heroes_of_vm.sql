-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 07 2018 г., 20:11
-- Версия сервера: 5.7.17
-- Версия PHP: 7.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `heroes_of_vm`
--

-- --------------------------------------------------------

--
-- Структура таблицы `artifact`
--

CREATE TABLE `artifact` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `owner` int(11) DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `artifact`
--

INSERT INTO `artifact` (`id`, `game_id`, `user_id`, `x`, `y`, `type`, `owner`, `name`, `description`) VALUES
(1, 1, 1, -1, -1, 0, 1, 'щит', 'щит 2'),
(2, 1, 1, -1, -1, 0, 1, 'щит', 'щит 3'),
(3, 1, 1, -1, -1, 0, 1, 'щит', '2323');

-- --------------------------------------------------------

--
-- Структура таблицы `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `map_id` int(11) NOT NULL,
  `status` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `games`
--

INSERT INTO `games` (`id`, `map_id`, `status`) VALUES
(1, 1, 'active');

-- --------------------------------------------------------

--
-- Структура таблицы `hero`
--

CREATE TABLE `hero` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `hero`
--

INSERT INTO `hero` (`id`, `game_id`, `user_id`, `x`, `y`, `type`, `owner`, `name`, `description`) VALUES
(1, 1, 1, 8, 4, 0, 1, 'супер герой', 'Это супер герой'),
(2, 1, 2, 12, 6, 0, 2, 'Петькин герой', 'Петя, твой герой, ты и расскажи');

-- --------------------------------------------------------

--
-- Структура таблицы `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `name` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `resources` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `item`
--

INSERT INTO `item` (`id`, `game_id`, `user_id`, `x`, `y`, `type`, `name`, `description`, `resources`) VALUES
(1, 1, 1, 11, 0, 0, 'Сундук', 'Бабушкин сундук, ну там, какое то барахло лежит', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `map`
--

CREATE TABLE `map` (
  `id` int(11) NOT NULL,
  `size_x` int(11) NOT NULL,
  `size_y` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `map`
--

INSERT INTO `map` (`id`, `size_x`, `size_y`) VALUES
(1, 25, 18);

-- --------------------------------------------------------

--
-- Структура таблицы `map_building`
--

CREATE TABLE `map_building` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `name` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `resources` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `map_building`
--

INSERT INTO `map_building` (`id`, `game_id`, `user_id`, `x`, `y`, `type`, `owner`, `name`, `description`, `resources`) VALUES
(1, 1, 1, 9, 4, 0, 1, 'Шахта', 'Шахата - где ты батрачишь, лол', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `elem_id` int(11) NOT NULL,
  `elem_type` varchar(45) NOT NULL,
  `attack` int(11) DEFAULT NULL,
  `defence` int(11) DEFAULT NULL,
  `spell_power` int(11) DEFAULT NULL,
  `knowledge` int(11) DEFAULT NULL,
  `min_damage` int(11) DEFAULT NULL,
  `max_damage` int(11) DEFAULT NULL,
  `health` int(11) DEFAULT NULL,
  `speed` int(11) DEFAULT NULL,
  `move_points` int(11) DEFAULT NULL,
  `mana_points` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `properties`
--

INSERT INTO `properties` (`id`, `elem_id`, `elem_type`, `attack`, `defence`, `spell_power`, `knowledge`, `min_damage`, `max_damage`, `health`, `speed`, `move_points`, `mana_points`) VALUES
(1, 1, 'hero', 1, 1, 12, 5, 0, 8, NULL, 1, 750, 0),
(2, 1, 'hero_default', 1, 1, 12, 5, 0, 8, NULL, 1, 950, 0),
(3, 2, 'hero', 2, 2, 5, 1, 1, 3, NULL, 2, 950, 0),
(4, 2, 'hero_default', 2, 2, 5, 1, 1, 3, NULL, 2, 950, 0),
(5, 1, 'artifact', 2, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `resources`
--

CREATE TABLE `resources` (
  `id` int(11) NOT NULL,
  `elem_id` int(11) NOT NULL,
  `elem_type` varchar(45) NOT NULL,
  `ore` int(11) DEFAULT NULL,
  `gold` int(11) DEFAULT NULL,
  `wood` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `resources`
--

INSERT INTO `resources` (`id`, `elem_id`, `elem_type`, `ore`, `gold`, `wood`) VALUES
(1, 1, 'gamer', 1000, 1000, 1000),
(2, 2, 'gamer', 300, 300, 300);

-- --------------------------------------------------------

--
-- Структура таблицы `tile`
--

CREATE TABLE `tile` (
  `id` int(11) NOT NULL,
  `map_id` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `type` varchar(45) NOT NULL,
  `sprite` int(11) NOT NULL,
  `passability` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tile`
--

INSERT INTO `tile` (`id`, `map_id`, `x`, `y`, `name`, `type`, `sprite`, `passability`) VALUES
(1, 1, 0, 1, 'Desert', 'sand', 0, 1),
(2, 1, 0, 2, 'Desert', 'sand', 6, 1),
(3, 1, 0, 3, 'Desert', 'sand', 6, 1),
(4, 1, 0, 4, 'Desert', 'sand', 3, 1),
(5, 1, 0, 5, 'Desert', 'sand', 5, 1),
(6, 1, 0, 6, 'Desert', 'sand', 4, 1),
(7, 1, 0, 7, 'Desert', 'sand', 2, 1),
(8, 1, 0, 8, 'Desert', 'sand', 0, 1),
(9, 1, 0, 9, 'Desert', 'sand', 3, 1),
(10, 1, 0, 10, 'Desert', 'sand', 4, 1),
(11, 1, 0, 11, 'Desert', 'sand', 7, 1),
(12, 1, 0, 12, 'Desert', 'sand', 9, 1),
(13, 1, 0, 13, 'Desert', 'sand', 3, 1),
(14, 1, 0, 14, 'Desert', 'sand', 9, 1),
(15, 1, 0, 15, 'Desert', 'sand', 4, 1),
(16, 1, 0, 16, 'Desert', 'sand', 2, 1),
(17, 1, 0, 17, 'Desert', 'sand', 6, 1),
(18, 1, 1, 0, 'Desert', 'sand', 2, 1),
(19, 1, 1, 1, 'Desert', 'sand', 9, 1),
(20, 1, 1, 2, 'Desert', 'sand', 9, 1),
(21, 1, 1, 3, 'Desert', 'sand', 9, 1),
(22, 1, 1, 4, 'Desert', 'sand', 2, 1),
(23, 1, 1, 5, 'Desert', 'sand', 9, 1),
(24, 1, 1, 6, 'Desert', 'sand', 5, 1),
(25, 1, 1, 7, 'Desert', 'sand', 8, 1),
(26, 1, 1, 8, 'Desert', 'sand', 6, 1),
(27, 1, 1, 9, 'Desert', 'sand', 3, 1),
(28, 1, 1, 10, 'Desert', 'sand', 7, 1),
(29, 1, 1, 11, 'Desert', 'sand', 5, 1),
(30, 1, 1, 12, 'Desert', 'sand', 4, 1),
(31, 1, 1, 13, 'Desert', 'sand', 6, 1),
(32, 1, 1, 14, 'Desert', 'sand', 8, 1),
(33, 1, 1, 15, 'Desert', 'sand', 1, 1),
(34, 1, 1, 16, 'Desert', 'sand', 7, 1),
(35, 1, 1, 17, 'Desert', 'sand', 5, 1),
(36, 1, 2, 0, 'Desert', 'sand', 5, 1),
(37, 1, 2, 1, 'Desert', 'sand', 6, 1),
(38, 1, 2, 2, 'Desert', 'sand', 1, 1),
(39, 1, 2, 3, 'Desert', 'sand', 4, 1),
(40, 1, 2, 4, 'Desert', 'sand', 7, 1),
(41, 1, 2, 5, 'Desert', 'sand', 4, 1),
(42, 1, 2, 6, 'Desert', 'sand', 5, 1),
(43, 1, 2, 7, 'Desert', 'sand', 6, 1),
(44, 1, 2, 8, 'Desert', 'sand', 1, 1),
(45, 1, 2, 9, 'Desert', 'sand', 5, 1),
(46, 1, 2, 10, 'Desert', 'sand', 8, 1),
(47, 1, 2, 11, 'Desert', 'sand', 5, 1),
(48, 1, 2, 12, 'Desert', 'sand', 4, 1),
(49, 1, 2, 13, 'Desert', 'sand', 1, 1),
(50, 1, 2, 14, 'Desert', 'sand', 6, 1),
(51, 1, 2, 15, 'Desert', 'sand', 7, 1),
(52, 1, 2, 16, 'Desert', 'sand', 2, 1),
(53, 1, 2, 17, 'Desert', 'sand', 5, 1),
(54, 1, 3, 0, 'Desert', 'sand', 5, 1),
(55, 1, 3, 1, 'Desert', 'sand', 4, 1),
(56, 1, 3, 2, 'Desert', 'sand', 3, 1),
(57, 1, 3, 3, 'Desert', 'sand', 9, 1),
(58, 1, 3, 4, 'Desert', 'sand', 6, 1),
(59, 1, 3, 5, 'Desert', 'sand', 2, 1),
(60, 1, 3, 6, 'Desert', 'sand', 8, 1),
(61, 1, 3, 7, 'Desert', 'sand', 5, 1),
(62, 1, 3, 8, 'Desert', 'sand', 8, 1),
(63, 1, 3, 9, 'Desert', 'sand', 8, 1),
(64, 1, 3, 10, 'Desert', 'sand', 4, 1),
(65, 1, 3, 11, 'Desert', 'sand', 5, 1),
(66, 1, 3, 12, 'Desert', 'sand', 2, 1),
(67, 1, 3, 13, 'Desert', 'sand', 4, 1),
(68, 1, 3, 14, 'Desert', 'sand', 1, 1),
(69, 1, 3, 15, 'Desert', 'sand', 0, 1),
(70, 1, 3, 16, 'Desert', 'sand', 6, 1),
(71, 1, 3, 17, 'Desert', 'sand', 7, 1),
(72, 1, 4, 0, 'Desert', 'sand', 9, 1),
(73, 1, 4, 1, 'Desert', 'sand', 1, 1),
(74, 1, 4, 2, 'Desert', 'sand', 5, 1),
(75, 1, 4, 3, 'Desert', 'sand', 6, 1),
(76, 1, 4, 4, 'Desert', 'sand', 4, 1),
(77, 1, 4, 5, 'Desert', 'sand', 2, 1),
(78, 1, 4, 6, 'Desert', 'sand', 4, 1),
(79, 1, 4, 7, 'Desert', 'sand', 5, 1),
(80, 1, 4, 8, 'Desert', 'sand', 2, 1),
(81, 1, 4, 9, 'Desert', 'sand', 3, 1),
(82, 1, 4, 10, 'Desert', 'sand', 2, 1),
(83, 1, 4, 11, 'Desert', 'sand', 3, 1),
(84, 1, 4, 12, 'Desert', 'sand', 5, 1),
(85, 1, 4, 13, 'Desert', 'sand', 9, 1),
(86, 1, 4, 14, 'Desert', 'sand', 7, 1),
(87, 1, 4, 15, 'Desert', 'sand', 7, 1),
(88, 1, 4, 16, 'Desert', 'sand', 6, 1),
(89, 1, 4, 17, 'Desert', 'sand', 7, 1),
(90, 1, 5, 0, 'Desert', 'sand', 1, 1),
(91, 1, 5, 1, 'Desert', 'sand', 1, 1),
(92, 1, 5, 2, 'Desert', 'sand', 4, 1),
(93, 1, 5, 3, 'Desert', 'sand', 0, 1),
(94, 1, 5, 4, 'Desert', 'sand', 8, 1),
(95, 1, 5, 5, 'Desert', 'sand', 4, 1),
(96, 1, 5, 6, 'Desert', 'sand', 4, 1),
(97, 1, 5, 7, 'Desert', 'sand', 1, 1),
(98, 1, 5, 8, 'Desert', 'sand', 0, 1),
(99, 1, 5, 9, 'Desert', 'sand', 8, 1),
(100, 1, 5, 10, 'Desert', 'sand', 6, 1),
(101, 1, 5, 11, 'Desert', 'sand', 3, 1),
(102, 1, 5, 12, 'Desert', 'sand', 8, 1),
(103, 1, 5, 13, 'Desert', 'sand', 6, 1),
(104, 1, 5, 14, 'Desert', 'sand', 5, 1),
(105, 1, 5, 15, 'Desert', 'sand', 6, 1),
(106, 1, 5, 16, 'Desert', 'sand', 2, 1),
(107, 1, 5, 17, 'Desert', 'sand', 2, 1),
(108, 1, 6, 0, 'Desert', 'sand', 7, 1),
(109, 1, 6, 1, 'Desert', 'sand', 7, 1),
(110, 1, 6, 2, 'Desert', 'sand', 1, 1),
(111, 1, 6, 3, 'Desert', 'sand', 5, 1),
(112, 1, 6, 4, 'Desert', 'sand', 8, 1),
(113, 1, 6, 5, 'Desert', 'sand', 9, 1),
(114, 1, 6, 6, 'Desert', 'sand', 0, 1),
(115, 1, 6, 7, 'Desert', 'sand', 2, 1),
(116, 1, 6, 8, 'Desert', 'sand', 2, 1),
(117, 1, 6, 9, 'Desert', 'sand', 5, 1),
(118, 1, 6, 10, 'Desert', 'sand', 6, 1),
(119, 1, 6, 11, 'Desert', 'sand', 9, 1),
(120, 1, 6, 12, 'Desert', 'sand', 9, 1),
(121, 1, 6, 13, 'Desert', 'sand', 9, 1),
(122, 1, 6, 14, 'Desert', 'sand', 0, 1),
(123, 1, 6, 15, 'Desert', 'sand', 7, 1),
(124, 1, 6, 16, 'Sea', 'water', 3, 0),
(125, 1, 6, 17, 'Sea', 'water', 0, 0),
(126, 1, 7, 0, 'Desert', 'sand', 0, 1),
(127, 1, 7, 1, 'Desert', 'sand', 7, 1),
(128, 1, 7, 2, 'Desert', 'sand', 2, 1),
(129, 1, 7, 3, 'Desert', 'sand', 0, 1),
(130, 1, 7, 4, 'Desert', 'sand', 5, 1),
(131, 1, 7, 5, 'Desert', 'sand', 6, 1),
(132, 1, 7, 6, 'Desert', 'sand', 8, 1),
(133, 1, 7, 7, 'Desert', 'sand', 4, 1),
(134, 1, 7, 8, 'Desert', 'sand', 3, 1),
(135, 1, 7, 9, 'Desert', 'sand', 0, 1),
(136, 1, 7, 10, 'Desert', 'sand', 7, 1),
(137, 1, 7, 11, 'Desert', 'sand', 7, 1),
(138, 1, 7, 12, 'Desert', 'sand', 1, 1),
(139, 1, 7, 13, 'Desert', 'sand', 3, 1),
(140, 1, 7, 14, 'Desert', 'sand', 2, 1),
(141, 1, 7, 15, 'Sea', 'water', 4, 0),
(142, 1, 7, 16, 'Sea', 'water', 1, 0),
(143, 1, 7, 17, 'Sea', 'water', 2, 0),
(144, 1, 8, 0, 'Desert', 'sand', 1, 1),
(145, 1, 8, 1, 'Desert', 'sand', 5, 1),
(146, 1, 8, 2, 'Desert', 'sand', 9, 1),
(147, 1, 8, 3, 'Desert', 'sand', 2, 1),
(148, 1, 8, 4, 'Desert', 'sand', 1, 1),
(149, 1, 8, 5, 'Desert', 'sand', 8, 1),
(150, 1, 8, 6, 'Desert', 'sand', 9, 1),
(151, 1, 8, 7, 'Desert', 'sand', 8, 1),
(152, 1, 8, 8, 'Desert', 'sand', 6, 1),
(153, 1, 8, 9, 'Desert', 'sand', 2, 1),
(154, 1, 8, 10, 'Desert', 'sand', 2, 1),
(155, 1, 8, 11, 'Desert', 'sand', 4, 1),
(156, 1, 8, 12, 'Desert', 'sand', 0, 1),
(157, 1, 8, 13, 'Sea', 'water', 9, 0),
(158, 1, 8, 14, 'Sea', 'water', 6, 0),
(159, 1, 8, 15, 'Sea', 'water', 0, 0),
(160, 1, 8, 16, 'Sea', 'water', 3, 0),
(161, 1, 8, 17, 'Sea', 'water', 9, 0),
(162, 1, 9, 0, 'Desert', 'sand', 0, 1),
(163, 1, 9, 1, 'Desert', 'sand', 5, 1),
(164, 1, 9, 2, 'Desert', 'sand', 0, 1),
(165, 1, 9, 3, 'Desert', 'sand', 7, 1),
(166, 1, 9, 4, 'Desert', 'sand', 2, 1),
(167, 1, 9, 5, 'Desert', 'sand', 9, 1),
(168, 1, 9, 6, 'Desert', 'sand', 1, 1),
(169, 1, 9, 7, 'Desert', 'sand', 3, 1),
(170, 1, 9, 8, 'Desert', 'sand', 1, 1),
(171, 1, 9, 9, 'Desert', 'sand', 2, 1),
(172, 1, 9, 10, 'Desert', 'sand', 3, 1),
(173, 1, 9, 11, 'Sea', 'water', 2, 0),
(174, 1, 9, 12, 'Sea', 'water', 4, 0),
(175, 1, 9, 13, 'Sea', 'water', 1, 0),
(176, 1, 9, 14, 'Sea', 'water', 7, 0),
(177, 1, 9, 15, 'Sea', 'water', 6, 0),
(178, 1, 9, 16, 'Sea', 'water', 0, 0),
(179, 1, 9, 17, 'Sea', 'water', 9, 0),
(180, 1, 10, 0, 'Desert', 'sand', 7, 1),
(181, 1, 10, 1, 'Desert', 'sand', 4, 1),
(182, 1, 10, 2, 'Desert', 'sand', 9, 1),
(183, 1, 10, 3, 'Desert', 'sand', 5, 1),
(184, 1, 10, 4, 'Desert', 'sand', 5, 1),
(185, 1, 10, 5, 'Desert', 'sand', 7, 1),
(186, 1, 10, 6, 'Desert', 'sand', 2, 1),
(187, 1, 10, 7, 'Desert', 'sand', 7, 1),
(188, 1, 10, 8, 'Desert', 'sand', 8, 1),
(189, 1, 10, 9, 'Desert', 'sand', 5, 1),
(190, 1, 10, 10, 'Sea', 'water', 5, 0),
(191, 1, 10, 11, 'Sea', 'water', 7, 0),
(192, 1, 10, 12, 'Sea', 'water', 1, 0),
(193, 1, 10, 13, 'Sea', 'water', 7, 0),
(194, 1, 10, 14, 'Sea', 'water', 0, 0),
(195, 1, 10, 15, 'Sea', 'water', 6, 0),
(196, 1, 10, 16, 'Sea', 'water', 0, 0),
(197, 1, 10, 17, 'Sea', 'water', 6, 0),
(198, 1, 11, 0, 'Desert', 'sand', 4, 1),
(199, 1, 11, 1, 'Desert', 'sand', 4, 1),
(200, 1, 11, 2, 'Desert', 'sand', 4, 1),
(201, 1, 11, 3, 'Desert', 'sand', 4, 1),
(202, 1, 11, 4, 'Desert', 'sand', 3, 1),
(203, 1, 11, 5, 'Desert', 'sand', 5, 1),
(204, 1, 11, 6, 'Desert', 'sand', 1, 1),
(205, 1, 11, 7, 'Desert', 'sand', 5, 1),
(206, 1, 11, 8, 'Sea', 'water', 6, 0),
(207, 1, 11, 9, 'Sea', 'water', 6, 0),
(208, 1, 11, 10, 'Sea', 'water', 6, 0),
(209, 1, 11, 11, 'Sea', 'water', 2, 0),
(210, 1, 11, 12, 'Sea', 'water', 4, 0),
(211, 1, 11, 13, 'Sea', 'water', 5, 0),
(212, 1, 11, 14, 'Sea', 'water', 0, 0),
(213, 1, 11, 15, 'Sea', 'water', 2, 0),
(214, 1, 11, 16, 'Sea', 'water', 0, 0),
(215, 1, 11, 17, 'Sea', 'water', 2, 0),
(216, 1, 12, 0, 'Desert', 'sand', 2, 1),
(217, 1, 12, 1, 'Desert', 'sand', 0, 1),
(218, 1, 12, 2, 'Desert', 'sand', 6, 1),
(219, 1, 12, 3, 'Desert', 'sand', 7, 1),
(220, 1, 12, 4, 'Desert', 'sand', 1, 1),
(221, 1, 12, 5, 'Desert', 'sand', 1, 1),
(222, 1, 12, 6, 'Sea', 'water', 0, 0),
(223, 1, 12, 7, 'Sea', 'water', 7, 0),
(224, 1, 12, 8, 'Sea', 'water', 6, 0),
(225, 1, 12, 9, 'Sea', 'water', 8, 0),
(226, 1, 12, 10, 'Sea', 'water', 5, 0),
(227, 1, 12, 11, 'Sea', 'water', 9, 0),
(228, 1, 12, 12, 'Sea', 'water', 5, 0),
(229, 1, 12, 13, 'Sea', 'water', 5, 0),
(230, 1, 12, 14, 'Sea', 'water', 9, 0),
(231, 1, 12, 15, 'Sea', 'water', 1, 0),
(232, 1, 12, 16, 'Sea', 'water', 5, 0),
(233, 1, 12, 17, 'Sea', 'water', 5, 0),
(234, 1, 13, 0, 'Desert', 'sand', 6, 1),
(235, 1, 13, 1, 'Desert', 'sand', 7, 1),
(236, 1, 13, 2, 'Desert', 'sand', 9, 1),
(237, 1, 13, 3, 'Desert', 'sand', 8, 1),
(238, 1, 13, 4, 'Desert', 'sand', 7, 1),
(239, 1, 13, 5, 'Sea', 'water', 3, 0),
(240, 1, 13, 6, 'Sea', 'water', 4, 0),
(241, 1, 13, 7, 'Sea', 'water', 6, 0),
(242, 1, 13, 8, 'Sea', 'water', 8, 0),
(243, 1, 13, 9, 'Sea', 'water', 0, 0),
(244, 1, 13, 10, 'Sea', 'water', 4, 0),
(245, 1, 13, 11, 'Sea', 'water', 9, 0),
(246, 1, 13, 12, 'Sea', 'water', 5, 0),
(247, 1, 13, 13, 'Sea', 'water', 0, 0),
(248, 1, 13, 14, 'Sea', 'water', 8, 0),
(249, 1, 13, 15, 'Sea', 'water', 5, 0),
(250, 1, 13, 16, 'Sea', 'water', 5, 0),
(251, 1, 13, 17, 'Sea', 'water', 5, 0),
(252, 1, 14, 0, 'Desert', 'sand', 8, 1),
(253, 1, 14, 1, 'Lava', 'lava', 5, 1),
(254, 1, 14, 2, 'Lava', 'lava', 7, 1),
(255, 1, 14, 3, 'Lava', 'lava', 8, 1),
(256, 1, 14, 4, 'Lava', 'lava', 0, 1),
(257, 1, 14, 5, 'Lava', 'lava', 0, 1),
(258, 1, 14, 6, 'Lava', 'lava', 1, 1),
(259, 1, 14, 7, 'Sea', 'water', 1, 0),
(260, 1, 14, 8, 'Sea', 'water', 0, 0),
(261, 1, 14, 9, 'Sea', 'water', 0, 0),
(262, 1, 14, 10, 'Sea', 'water', 7, 0),
(263, 1, 14, 11, 'Sea', 'water', 7, 0),
(264, 1, 14, 12, 'Sea', 'water', 5, 0),
(265, 1, 14, 13, 'Sea', 'water', 6, 0),
(266, 1, 14, 14, 'Sea', 'water', 9, 0),
(267, 1, 14, 15, 'Sea', 'water', 1, 0),
(268, 1, 14, 16, 'Sea', 'water', 5, 0),
(269, 1, 14, 17, 'Sea', 'water', 1, 0),
(270, 1, 15, 0, 'Lava', 'lava', 8, 1),
(271, 1, 15, 1, 'Lava', 'lava', 5, 1),
(272, 1, 15, 2, 'Lava', 'lava', 4, 1),
(273, 1, 15, 3, 'Lava', 'lava', 9, 1),
(274, 1, 15, 4, 'Lava', 'lava', 3, 1),
(275, 1, 15, 5, 'Lava', 'lava', 6, 1),
(276, 1, 15, 6, 'Lava', 'lava', 7, 1),
(277, 1, 15, 7, 'Lava', 'lava', 2, 1),
(278, 1, 15, 8, 'Lava', 'lava', 0, 1),
(279, 1, 15, 9, 'Sea', 'water', 6, 0),
(280, 1, 15, 10, 'Sea', 'water', 8, 0),
(281, 1, 15, 11, 'Sea', 'water', 6, 0),
(282, 1, 15, 12, 'Sea', 'water', 1, 0),
(283, 1, 15, 13, 'Sea', 'water', 1, 0),
(284, 1, 15, 14, 'Sea', 'water', 5, 0),
(285, 1, 15, 15, 'Sea', 'water', 2, 0),
(286, 1, 15, 16, 'Sea', 'water', 3, 0),
(287, 1, 15, 17, 'Sea', 'water', 4, 0),
(288, 1, 16, 0, 'Lava', 'lava', 6, 1),
(289, 1, 16, 1, 'Lava', 'lava', 6, 1),
(290, 1, 16, 2, 'Lava', 'lava', 2, 1),
(291, 1, 16, 3, 'Lava', 'lava', 4, 1),
(292, 1, 16, 4, 'Lava', 'lava', 1, 1),
(293, 1, 16, 5, 'Lava', 'lava', 6, 1),
(294, 1, 16, 6, 'Lava', 'lava', 2, 1),
(295, 1, 16, 7, 'Lava', 'lava', 2, 1),
(296, 1, 16, 8, 'Lava', 'lava', 8, 1),
(297, 1, 16, 9, 'Lava', 'lava', 4, 1),
(298, 1, 16, 10, 'Lava', 'lava', 6, 1),
(299, 1, 16, 11, 'Sea', 'water', 9, 0),
(300, 1, 16, 12, 'Sea', 'water', 9, 0),
(301, 1, 16, 13, 'Sea', 'water', 3, 0),
(302, 1, 16, 14, 'Sea', 'water', 2, 0),
(303, 1, 16, 15, 'Sea', 'water', 0, 0),
(304, 1, 16, 16, 'Sea', 'water', 1, 0),
(305, 1, 16, 17, 'Sea', 'water', 2, 0),
(306, 1, 17, 0, 'Lava', 'lava', 0, 1),
(307, 1, 17, 1, 'Lava', 'lava', 6, 1),
(308, 1, 17, 2, 'Lava', 'lava', 5, 1),
(309, 1, 17, 3, 'Lava', 'lava', 6, 1),
(310, 1, 17, 4, 'Lava', 'lava', 2, 1),
(311, 1, 17, 5, 'Lava', 'lava', 3, 1),
(312, 1, 17, 6, 'Lava', 'lava', 9, 1),
(313, 1, 17, 7, 'Lava', 'lava', 4, 1),
(314, 1, 17, 8, 'Lava', 'lava', 0, 1),
(315, 1, 17, 9, 'Lava', 'lava', 7, 1),
(316, 1, 17, 10, 'Lava', 'lava', 5, 1),
(317, 1, 17, 11, 'Lava', 'lava', 3, 1),
(318, 1, 17, 12, 'Lava', 'lava', 1, 1),
(319, 1, 17, 13, 'Lava', 'lava', 6, 1),
(320, 1, 17, 14, 'Sea', 'water', 7, 0),
(321, 1, 17, 15, 'Sea', 'water', 7, 0),
(322, 1, 17, 16, 'Sea', 'water', 1, 0),
(323, 1, 17, 17, 'Sea', 'water', 9, 0),
(324, 1, 18, 0, 'Lava', 'lava', 2, 1),
(325, 1, 18, 1, 'Lava', 'lava', 2, 1),
(326, 1, 18, 2, 'Lava', 'lava', 9, 1),
(327, 1, 18, 3, 'Lava', 'lava', 8, 1),
(328, 1, 18, 4, 'Lava', 'lava', 5, 1),
(329, 1, 18, 5, 'Lava', 'lava', 4, 1),
(330, 1, 18, 6, 'Lava', 'lava', 8, 1),
(331, 1, 18, 7, 'Lava', 'lava', 8, 1),
(332, 1, 18, 8, 'Lava', 'lava', 4, 1),
(333, 1, 18, 9, 'Lava', 'lava', 1, 1),
(334, 1, 18, 10, 'Lava', 'lava', 4, 1),
(335, 1, 18, 11, 'Lava', 'lava', 1, 1),
(336, 1, 18, 12, 'Lava', 'lava', 2, 1),
(337, 1, 18, 13, 'Lava', 'lava', 5, 1),
(338, 1, 18, 14, 'Lava', 'lava', 8, 1),
(339, 1, 18, 15, 'Lava', 'lava', 8, 1),
(340, 1, 18, 16, 'Sea', 'water', 4, 0),
(341, 1, 18, 17, 'Sea', 'water', 2, 0),
(342, 1, 19, 0, 'Lava', 'lava', 1, 1),
(343, 1, 19, 1, 'Lava', 'lava', 4, 1),
(344, 1, 19, 2, 'Lava', 'lava', 8, 1),
(345, 1, 19, 3, 'Lava', 'lava', 2, 1),
(346, 1, 19, 4, 'Lava', 'lava', 0, 1),
(347, 1, 19, 5, 'Lava', 'lava', 8, 1),
(348, 1, 19, 6, 'Lava', 'lava', 4, 1),
(349, 1, 19, 7, 'Lava', 'lava', 0, 1),
(350, 1, 19, 8, 'Lava', 'lava', 2, 1),
(351, 1, 19, 9, 'Lava', 'lava', 1, 1),
(352, 1, 19, 10, 'Lava', 'lava', 3, 1),
(353, 1, 19, 11, 'Lava', 'lava', 8, 1),
(354, 1, 19, 12, 'Lava', 'lava', 8, 1),
(355, 1, 19, 13, 'Lava', 'lava', 1, 1),
(356, 1, 19, 14, 'Lava', 'lava', 0, 1),
(357, 1, 19, 15, 'Lava', 'lava', 7, 1),
(358, 1, 19, 16, 'Lava', 'lava', 5, 1),
(359, 1, 19, 17, 'Lava', 'lava', 9, 1),
(360, 1, 20, 0, 'Lava', 'lava', 1, 1),
(361, 1, 20, 1, 'Lava', 'lava', 8, 1),
(362, 1, 20, 2, 'Lava', 'lava', 1, 1),
(363, 1, 20, 3, 'Lava', 'lava', 4, 1),
(364, 1, 20, 4, 'Lava', 'lava', 2, 1),
(365, 1, 20, 5, 'Lava', 'lava', 3, 1),
(366, 1, 20, 6, 'Lava', 'lava', 2, 1),
(367, 1, 20, 7, 'Lava', 'lava', 4, 1),
(368, 1, 20, 8, 'Lava', 'lava', 9, 1),
(369, 1, 20, 9, 'Lava', 'lava', 8, 1),
(370, 1, 20, 10, 'Lava', 'lava', 0, 1),
(371, 1, 20, 11, 'Lava', 'lava', 7, 1),
(372, 1, 20, 12, 'Lava', 'lava', 4, 1),
(373, 1, 20, 13, 'Lava', 'lava', 7, 1),
(374, 1, 20, 14, 'Lava', 'lava', 3, 1),
(375, 1, 20, 15, 'Lava', 'lava', 8, 1),
(376, 1, 20, 16, 'Lava', 'lava', 3, 1),
(377, 1, 20, 17, 'Lava', 'lava', 4, 1),
(378, 1, 21, 0, 'Lava', 'lava', 2, 1),
(379, 1, 21, 1, 'Lava', 'lava', 4, 1),
(380, 1, 21, 2, 'Lava', 'lava', 4, 1),
(381, 1, 21, 3, 'Lava', 'lava', 9, 1),
(382, 1, 21, 4, 'Lava', 'lava', 8, 1),
(383, 1, 21, 5, 'Lava', 'lava', 4, 1),
(384, 1, 21, 6, 'Lava', 'lava', 8, 1),
(385, 1, 21, 7, 'Lava', 'lava', 4, 1),
(386, 1, 21, 8, 'Lava', 'lava', 6, 1),
(387, 1, 21, 9, 'Lava', 'lava', 3, 1),
(388, 1, 21, 10, 'Lava', 'lava', 2, 1),
(389, 1, 21, 11, 'Lava', 'lava', 1, 1),
(390, 1, 21, 12, 'Lava', 'lava', 7, 1),
(391, 1, 21, 13, 'Lava', 'lava', 8, 1),
(392, 1, 21, 14, 'Lava', 'lava', 7, 1),
(393, 1, 21, 15, 'Lava', 'lava', 2, 1),
(394, 1, 21, 16, 'Lava', 'lava', 2, 1),
(395, 1, 21, 17, 'Lava', 'lava', 7, 1),
(396, 1, 22, 0, 'Lava', 'lava', 0, 1),
(397, 1, 22, 1, 'Lava', 'lava', 7, 1),
(398, 1, 22, 2, 'Lava', 'lava', 6, 1),
(399, 1, 22, 3, 'Lava', 'lava', 6, 1),
(400, 1, 22, 4, 'Lava', 'lava', 0, 1),
(401, 1, 22, 5, 'Lava', 'lava', 0, 1),
(402, 1, 22, 6, 'Lava', 'lava', 7, 1),
(403, 1, 22, 7, 'Lava', 'lava', 5, 1),
(404, 1, 22, 8, 'Lava', 'lava', 8, 1),
(405, 1, 22, 9, 'Lava', 'lava', 4, 1),
(406, 1, 22, 10, 'Lava', 'lava', 1, 1),
(407, 1, 22, 11, 'Lava', 'lava', 9, 1),
(408, 1, 22, 12, 'Lava', 'lava', 8, 1),
(409, 1, 22, 13, 'Lava', 'lava', 6, 1),
(410, 1, 22, 14, 'Lava', 'lava', 2, 1),
(411, 1, 22, 15, 'Lava', 'lava', 9, 1),
(412, 1, 22, 16, 'Lava', 'lava', 7, 1),
(413, 1, 22, 17, 'Lava', 'lava', 8, 1),
(414, 1, 23, 0, 'Lava', 'lava', 9, 1),
(415, 1, 23, 1, 'Lava', 'lava', 1, 1),
(416, 1, 23, 2, 'Lava', 'lava', 5, 1),
(417, 1, 23, 3, 'Lava', 'lava', 3, 1),
(418, 1, 23, 4, 'Lava', 'lava', 4, 1),
(419, 1, 23, 5, 'Lava', 'lava', 4, 1),
(420, 1, 23, 6, 'Lava', 'lava', 6, 1),
(421, 1, 23, 7, 'Lava', 'lava', 7, 1),
(422, 1, 23, 8, 'Lava', 'lava', 0, 1),
(423, 1, 23, 9, 'Lava', 'lava', 2, 1),
(424, 1, 23, 10, 'Lava', 'lava', 3, 1),
(425, 1, 23, 11, 'Lava', 'lava', 0, 1),
(426, 1, 23, 12, 'Lava', 'lava', 6, 1),
(427, 1, 23, 13, 'Lava', 'lava', 2, 1),
(428, 1, 23, 14, 'Lava', 'lava', 7, 1),
(429, 1, 23, 15, 'Lava', 'lava', 1, 1),
(430, 1, 23, 16, 'Lava', 'lava', 3, 1),
(431, 1, 23, 17, 'Lava', 'lava', 9, 1),
(432, 1, 24, 0, 'Lava', 'lava', 3, 1),
(433, 1, 24, 1, 'Lava', 'lava', 8, 1),
(434, 1, 24, 2, 'Lava', 'lava', 1, 1),
(435, 1, 24, 3, 'Lava', 'lava', 2, 1),
(436, 1, 24, 4, 'Lava', 'lava', 6, 1),
(437, 1, 24, 5, 'Lava', 'lava', 4, 1),
(438, 1, 24, 6, 'Lava', 'lava', 4, 1),
(439, 1, 24, 7, 'Lava', 'lava', 8, 1),
(440, 1, 24, 8, 'Lava', 'lava', 7, 1),
(441, 1, 24, 9, 'Lava', 'lava', 9, 1),
(442, 1, 24, 10, 'Lava', 'lava', 2, 1),
(443, 1, 24, 11, 'Lava', 'lava', 1, 1),
(444, 1, 24, 12, 'Lava', 'lava', 8, 1),
(445, 1, 24, 13, 'Lava', 'lava', 3, 1),
(446, 1, 24, 14, 'Lava', 'lava', 9, 1),
(447, 1, 24, 15, 'Lava', 'lava', 6, 1),
(448, 1, 24, 16, 'Lava', 'lava', 7, 1),
(449, 1, 24, 17, 'Lava', 'lava', 2, 1),
(481, 1, 0, 0, 'Desert', 'sand', 2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `town`
--

CREATE TABLE `town` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `used_id` int(11) NOT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `name` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `town`
--

INSERT INTO `town` (`id`, `game_id`, `used_id`, `x`, `y`, `type`, `owner`, `name`, `description`) VALUES
(1, 1, 1, 9, 8, 1, 1, 'Город', 'Ты здесь живешь, мда...');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `login` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `token` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `login`, `password`, `token`) VALUES
(1, 'Вася', 'vasya', '123', ''),
(2, 'Петя', 'petya', '321', 'b755ba7209a830c7547cfa62d642414d');

-- --------------------------------------------------------

--
-- Структура таблицы `users_games`
--

CREATE TABLE `users_games` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `color` varchar(45) NOT NULL,
  `order` int(11) NOT NULL,
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users_games`
--

INSERT INTO `users_games` (`id`, `user_id`, `game_id`, `color`, `order`, `is_active`) VALUES
(1, 1, 1, 'red', 0, 1),
(2, 2, 1, 'blue', 1, 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `artifact`
--
ALTER TABLE `artifact`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`,`map_id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `map_id_UNIQUE` (`map_id`);

--
-- Индексы таблицы `hero`
--
ALTER TABLE `hero`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Индексы таблицы `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `map`
--
ALTER TABLE `map`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Индексы таблицы `map_building`
--
ALTER TABLE `map_building`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Индексы таблицы `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tile`
--
ALTER TABLE `tile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Индексы таблицы `town`
--
ALTER TABLE `town`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Индексы таблицы `users_games`
--
ALTER TABLE `users_games`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `artifact`
--
ALTER TABLE `artifact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `hero`
--
ALTER TABLE `hero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `map`
--
ALTER TABLE `map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `map_building`
--
ALTER TABLE `map_building`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT для таблицы `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `tile`
--
ALTER TABLE `tile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=482;
--
-- AUTO_INCREMENT для таблицы `town`
--
ALTER TABLE `town`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `users_games`
--
ALTER TABLE `users_games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
