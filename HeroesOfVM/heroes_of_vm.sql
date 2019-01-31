-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Янв 31 2019 г., 18:55
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
  `clothes_type` varchar(45) CHARACTER SET utf8 NOT NULL,
  `in_backpack` int(1) NOT NULL,
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

INSERT INTO `artifact` (`id`, `game_id`, `user_id`, `clothes_type`, `in_backpack`, `x`, `y`, `type`, `owner`, `name`, `description`) VALUES
(1, 1, 0, 'rightHand', 0, 0, 3, 0, NULL, 'Sword Of Bastard', 'Kill me, I won`t do anything to you...'),
(2, 1, 0, 'leftHand', 0, 1, 3, 1, NULL, 'Shield Of Homeless', 'Kill me, I am anyway homeless...'),
(3, 1, 0, 'body', 0, 2, 3, 2, NULL, 'Cuirass Of Aristocrat', 'I`ll make you pay for everything!!!'),
(4, 1, 0, 'cloak', 0, 3, 3, 3, NULL, 'Cloak of Warior', 'I\'ll hide you from mom'),
(5, 1, 0, 'ringOne', 0, 4, 3, 4, NULL, 'Wedding ring', 'Well all bro, this is the end....'),
(6, 1, 0, 'neck', 0, 5, 3, 5, NULL, 'Necklace of Nigggggga', 'SWAAAAAG!!!!'),
(7, 1, 0, 'gloves', 0, 6, 3, 6, NULL, 'Gloves of Theif', 'I\'ll steal everything from you'),
(8, 1, 0, 'head', 0, 7, 3, 7, NULL, 'Helmet of Builder', 'I will build a house of your bones'),
(9, 1, 0, 'feet', 0, 8, 3, 8, NULL, 'Shoes of Runner', 'Run Forrest, Run!!!!!'),
(10, 1, 0, 'ringTwo', 0, 9, 3, 9, NULL, 'Bandit Ring', 'It was popular in the 90s');

-- --------------------------------------------------------

--
-- Структура таблицы `battle`
--

CREATE TABLE `battle` (
  `id` int(11) NOT NULL,
  `id_attack_hero` int(11) NOT NULL,
  `id_defence_hero` int(11) NOT NULL,
  `current_move` int(11) NOT NULL,
  `turn` int(11) NOT NULL,
  `status` varchar(45) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `battle_map`
--

CREATE TABLE `battle_map` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `size_x` int(11) NOT NULL,
  `size_y` int(11) NOT NULL,
  `biom` varchar(45) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `battle_map`
--

INSERT INTO `battle_map` (`id`, `game_id`, `size_x`, `size_y`, `biom`) VALUES
(1, 1, 2, 2, 'snow'),
(2, 1, 2, 2, 'dirt');

-- --------------------------------------------------------

--
-- Структура таблицы `battle_tile`
--

CREATE TABLE `battle_tile` (
  `id` int(11) NOT NULL,
  `map_id` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `sprite` int(11) NOT NULL,
  `passability` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `battle_tile`
--

INSERT INTO `battle_tile` (`id`, `map_id`, `x`, `y`, `name`, `type`, `sprite`, `passability`) VALUES
(1, 1, 0, 0, 'Tundra', 'snow', 2, 1),
(2, 1, 0, 1, 'Tundra', 'snow', 2, 1),
(3, 1, 1, 0, 'Tundra', 'snow', 2, 1),
(4, 1, 1, 1, 'Tundra', 'snow', 2, 1),
(5, 2, 0, 0, 'Dirt', 'dirt', 4, 1),
(6, 2, 0, 1, 'Dirt', 'dirt', 4, 1),
(7, 2, 1, 0, 'Dirt', 'dirt', 4, 1),
(8, 2, 1, 1, 'Dirt', 'dirt', 4, 1);

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
  `name` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

--
-- Дамп данных таблицы `hero`
--

INSERT INTO `hero` (`id`, `game_id`, `user_id`, `x`, `y`, `type`, `owner`, `name`, `description`) VALUES
(1, 1, 1, 0, 1, 0, 1, 'Молодой человек из Гилнеаса', 'Просто бард'),
(2, 1, 2, 6, 0, 0, 2, 'VJlLink_Hero', 'Петя, твой герой, ты и расскажи');

-- --------------------------------------------------------

--
-- Структура таблицы `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `hero_id` int(11) NOT NULL,
  `head` int(11) DEFAULT NULL,
  `body` int(11) DEFAULT NULL,
  `feet` int(11) DEFAULT NULL,
  `gloves` int(11) DEFAULT NULL,
  `rightHand` int(11) DEFAULT NULL,
  `leftHand` int(11) DEFAULT NULL,
  `cloak` int(11) DEFAULT NULL,
  `neck` int(11) DEFAULT NULL,
  `ringOne` int(11) DEFAULT NULL,
  `ringTwo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `inventory`
--

INSERT INTO `inventory` (`id`, `game_id`, `hero_id`, `head`, `body`, `feet`, `gloves`, `rightHand`, `leftHand`, `cloak`, `neck`, `ringOne`, `ringTwo`) VALUES
(1, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 1, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `item`
--

INSERT INTO `item` (`id`, `game_id`, `user_id`, `x`, `y`, `type`, `name`, `description`) VALUES
(1, 1, 0, -1, -1, 0, 'wqe', 'wqewqe');

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
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `map_building`
--

INSERT INTO `map_building` (`id`, `game_id`, `user_id`, `x`, `y`, `type`, `owner`, `name`, `description`) VALUES
(1, 1, 1, 9, 1, 0, 1, 'Шахта', 'Шахата - где ты батрачишь, лол');

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
(1, 1, 'hero', 4, 4, 12, 80, 0, 8, NULL, 1, 809, 0),
(2, 1, 'hero_default', 1, 1, 12, 5, 0, 8, NULL, 1, 950, 0),
(3, 2, 'hero', 2, 2, 10, 2, 1, 3, NULL, 2, 950, 0),
(4, 2, 'hero_default', 2, 2, 5, 1, 1, 3, NULL, 2, 950, 0),
(5, 1, 'artifact', 5, 1, 0, 0, 0, 0, 0, 0, 0, 1),
(6, 2, 'artifact', 0, 5, 0, 0, 0, 0, 0, 0, 0, 0),
(7, 3, 'artifact', 0, 50, 20, 100, 0, 0, 0, 0, 55, 120),
(8, 4, 'artifact', 0, 5, 10, 0, 0, 0, 15, 0, 100, 0),
(9, 5, 'artifact', 0, 5, 7, 6, 0, 0, 5, 0, 0, 90),
(10, 6, 'artifact', 10, 50, 3, 0, 0, 0, 5, 0, 0, 0),
(11, 7, 'artifact', 0, 20, 0, 0, 0, 0, 30, 0, 0, 0),
(12, 8, 'artifact', 0, 10, 0, 0, 0, 0, 5, 0, 0, 0),
(13, 9, 'artifact', 0, 2, 40, 25, 0, 0, 16, 0, 0, 50),
(14, 10, 'artifact', 100, 5, 5, 0, 0, 0, 0, 0, 0, 0);

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
(1, 1, 'gamer', 2980, 4600, 2800),
(2, 2, 'gamer', 300, 300, 300),
(3, 1, 'item', 300, 300, 300),
(4, 1, 'map_building', 10, 100, 0);

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
(1, 1, 0, 1, 'Lands', 'lands', 4, 1),
(2, 1, 0, 2, 'Lands', 'lands', 0, 1),
(3, 1, 0, 3, 'Lands', 'lands', 9, 1),
(4, 1, 0, 4, 'Lands', 'lands', 8, 1),
(5, 1, 0, 5, 'Lands', 'lands', 4, 1),
(6, 1, 0, 6, 'Lands', 'lands', 3, 1),
(7, 1, 0, 7, 'Lands', 'lands', 9, 1),
(8, 1, 0, 8, 'Lands', 'lands', 3, 1),
(9, 1, 0, 9, 'Lands', 'lands', 0, 1),
(10, 1, 0, 10, 'DarkDesert', 'darkSand', 4, 1),
(11, 1, 0, 11, 'DarkDesert', 'darkSand', 1, 1),
(12, 1, 0, 12, 'DarkDesert', 'darkSand', 5, 1),
(13, 1, 0, 13, 'DarkDesert', 'darkSand', 4, 1),
(14, 1, 0, 14, 'DarkDesert', 'darkSand', 4, 0),
(15, 1, 0, 15, 'DarkDesert', 'darkSand', 5, 0),
(16, 1, 0, 16, 'DarkDesert', 'darkSand', 0, 0),
(17, 1, 0, 17, 'DarkDesert', 'darkSand', 2, 0),
(18, 1, 1, 0, 'Lands', 'lands', 9, 1),
(19, 1, 1, 1, 'Lands', 'lands', 7, 1),
(20, 1, 1, 2, 'Lands', 'lands', 1, 1),
(21, 1, 1, 3, 'Lands', 'lands', 8, 1),
(22, 1, 1, 4, 'Lands', 'lands', 0, 1),
(23, 1, 1, 5, 'Lands', 'lands', 7, 1),
(24, 1, 1, 6, 'Lands', 'lands', 7, 1),
(25, 1, 1, 7, 'Lands', 'lands', 5, 1),
(26, 1, 1, 8, 'Lands', 'lands', 2, 1),
(27, 1, 1, 9, 'Lands', 'lands', 5, 1),
(28, 1, 1, 10, 'DarkDesert', 'darkSand', 3, 1),
(29, 1, 1, 11, 'DarkDesert', 'darkSand', 1, 1),
(30, 1, 1, 12, 'DarkDesert', 'darkSand', 2, 1),
(31, 1, 1, 13, 'DarkDesert', 'darkSand', 5, 1),
(32, 1, 1, 14, 'DarkDesert', 'darkSand', 2, 0),
(33, 1, 1, 15, 'DarkDesert', 'darkSand', 4, 0),
(34, 1, 1, 16, 'DarkDesert', 'darkSand', 1, 0),
(35, 1, 1, 17, 'DarkDesert', 'darkSand', 4, 1),
(36, 1, 2, 0, 'Lands', 'lands', 1, 1),
(37, 1, 2, 1, 'Lands', 'lands', 9, 1),
(38, 1, 2, 2, 'Lands', 'lands', 6, 1),
(39, 1, 2, 3, 'Lands', 'lands', 9, 1),
(40, 1, 2, 4, 'Lands', 'lands', 5, 1),
(41, 1, 2, 5, 'Lands', 'lands', 2, 1),
(42, 1, 2, 6, 'Lands', 'lands', 6, 1),
(43, 1, 2, 7, 'Lands', 'lands', 7, 1),
(44, 1, 2, 8, 'Lands', 'lands', 6, 1),
(45, 1, 2, 9, 'Lands', 'lands', 9, 1),
(46, 1, 2, 10, 'DarkDesert', 'darkSand', 1, 1),
(47, 1, 2, 11, 'DarkDesert', 'darkSand', 4, 1),
(48, 1, 2, 12, 'DarkDesert', 'darkSand', 0, 1),
(49, 1, 2, 13, 'DarkDesert', 'darkSand', 1, 1),
(50, 1, 2, 14, 'DarkDesert', 'darkSand', 0, 0),
(51, 1, 2, 15, 'DarkDesert', 'darkSand', 4, 0),
(52, 1, 2, 16, 'DarkDesert', 'darkSand', 4, 0),
(53, 1, 2, 17, 'DarkDesert', 'darkSand', 0, 0),
(54, 1, 3, 0, 'Lands', 'lands', 3, 1),
(55, 1, 3, 1, 'Lands', 'lands', 4, 1),
(56, 1, 3, 2, 'Lands', 'lands', 7, 1),
(57, 1, 3, 3, 'Lands', 'lands', 9, 1),
(58, 1, 3, 4, 'Lands', 'lands', 5, 1),
(59, 1, 3, 5, 'Lands', 'lands', 2, 1),
(60, 1, 3, 6, 'Lands', 'lands', 1, 1),
(61, 1, 3, 7, 'Lands', 'lands', 9, 1),
(62, 1, 3, 8, 'Lands', 'lands', 4, 1),
(63, 1, 3, 9, 'Lands', 'lands', 3, 1),
(64, 1, 3, 10, 'Lands', 'lands', 5, 1),
(65, 1, 3, 11, 'DarkDesert', 'darkSand', 5, 1),
(66, 1, 3, 12, 'DarkDesert', 'darkSand', 2, 1),
(67, 1, 3, 13, 'DarkDesert', 'darkSand', 2, 1),
(68, 1, 3, 14, 'DarkDesert', 'darkSand', 2, 0),
(69, 1, 3, 15, 'DarkDesert', 'darkSand', 2, 0),
(70, 1, 3, 16, 'DarkDesert', 'darkSand', 5, 0),
(71, 1, 3, 17, 'DarkDesert', 'darkSand', 3, 0),
(72, 1, 4, 0, 'Lands', 'lands', 3, 1),
(73, 1, 4, 1, 'Lands', 'lands', 7, 1),
(74, 1, 4, 2, 'Lands', 'lands', 4, 1),
(75, 1, 4, 3, 'Lands', 'lands', 5, 1),
(76, 1, 4, 4, 'Lands', 'lands', 2, 1),
(77, 1, 4, 5, 'Lands', 'lands', 9, 1),
(78, 1, 4, 6, 'Lands', 'lands', 0, 1),
(79, 1, 4, 7, 'Lands', 'lands', 5, 1),
(80, 1, 4, 8, 'Lands', 'lands', 7, 1),
(81, 1, 4, 9, 'Lands', 'lands', 3, 1),
(82, 1, 4, 10, 'Lands', 'lands', 4, 1),
(83, 1, 4, 11, 'DarkDesert', 'darkSand', 2, 1),
(84, 1, 4, 12, 'DarkDesert', 'darkSand', 4, 1),
(85, 1, 4, 13, 'DarkDesert', 'darkSand', 4, 1),
(86, 1, 4, 14, 'DarkDesert', 'darkSand', 0, 1),
(87, 1, 4, 15, 'DarkDesert', 'darkSand', 3, 1),
(88, 1, 4, 16, 'DarkDesert', 'darkSand', 5, 1),
(89, 1, 4, 17, 'DarkDesert', 'darkSand', 4, 1),
(90, 1, 5, 0, 'Lands', 'lands', 0, 1),
(91, 1, 5, 1, 'Lands', 'lands', 9, 1),
(92, 1, 5, 2, 'Lands', 'lands', 6, 1),
(93, 1, 5, 3, 'Lands', 'lands', 8, 1),
(94, 1, 5, 4, 'Lands', 'lands', 4, 1),
(95, 1, 5, 5, 'Lands', 'lands', 7, 1),
(96, 1, 5, 6, 'Lands', 'lands', 4, 1),
(97, 1, 5, 7, 'Lands', 'lands', 1, 1),
(98, 1, 5, 8, 'Lands', 'lands', 4, 1),
(99, 1, 5, 9, 'Lands', 'lands', 8, 1),
(100, 1, 5, 10, 'Lands', 'lands', 8, 1),
(101, 1, 5, 11, 'DarkDesert', 'darkSand', 4, 1),
(102, 1, 5, 12, 'DarkDesert', 'darkSand', 2, 1),
(103, 1, 5, 13, 'DarkDesert', 'darkSand', 5, 1),
(104, 1, 5, 14, 'DarkDesert', 'darkSand', 0, 1),
(105, 1, 5, 15, 'DarkDesert', 'darkSand', 2, 1),
(106, 1, 5, 16, 'DarkDesert', 'darkSand', 0, 1),
(107, 1, 5, 17, 'DarkDesert', 'darkSand', 2, 1),
(108, 1, 6, 0, 'Lands', 'lands', 6, 1),
(109, 1, 6, 1, 'Lands', 'lands', 2, 1),
(110, 1, 6, 2, 'Lands', 'lands', 2, 1),
(111, 1, 6, 3, 'Lands', 'lands', 5, 1),
(112, 1, 6, 4, 'Lands', 'lands', 5, 1),
(113, 1, 6, 5, 'Lands', 'lands', 5, 1),
(114, 1, 6, 6, 'Lands', 'lands', 3, 1),
(115, 1, 6, 7, 'Lands', 'lands', 2, 1),
(116, 1, 6, 8, 'Lands', 'lands', 9, 1),
(117, 1, 6, 9, 'Lands', 'lands', 2, 1),
(118, 1, 6, 10, 'Lands', 'lands', 6, 1),
(119, 1, 6, 11, 'Lands', 'lands', 6, 1),
(120, 1, 6, 12, 'DarkDesert', 'darkSand', 0, 1),
(121, 1, 6, 13, 'DarkDesert', 'darkSand', 4, 1),
(122, 1, 6, 14, 'DarkDesert', 'darkSand', 5, 1),
(123, 1, 6, 15, 'DarkDesert', 'darkSand', 1, 1),
(124, 1, 6, 16, 'DarkDesert', 'darkSand', 1, 1),
(125, 1, 6, 17, 'DarkDesert', 'darkSand', 1, 1),
(126, 1, 7, 0, 'Lands', 'lands', 3, 1),
(127, 1, 7, 1, 'Lands', 'lands', 6, 1),
(128, 1, 7, 2, 'Lands', 'lands', 6, 1),
(129, 1, 7, 3, 'Lands', 'lands', 2, 1),
(130, 1, 7, 4, 'Lands', 'lands', 6, 1),
(131, 1, 7, 5, 'Lands', 'lands', 5, 1),
(132, 1, 7, 6, 'Lands', 'lands', 2, 1),
(133, 1, 7, 7, 'Lands', 'lands', 6, 1),
(134, 1, 7, 8, 'Lands', 'lands', 1, 1),
(135, 1, 7, 9, 'Lands', 'lands', 9, 1),
(136, 1, 7, 10, 'Lands', 'lands', 6, 1),
(137, 1, 7, 11, 'Lands', 'lands', 6, 1),
(138, 1, 7, 12, 'DarkDesert', 'darkSand', 4, 1),
(139, 1, 7, 13, 'DarkDesert', 'darkSand', 3, 1),
(140, 1, 7, 14, 'DarkDesert', 'darkSand', 5, 1),
(141, 1, 7, 15, 'DarkDesert', 'darkSand', 1, 1),
(142, 1, 7, 16, 'DarkDesert', 'darkSand', 4, 1),
(143, 1, 7, 17, 'DarkDesert', 'darkSand', 5, 1),
(144, 1, 8, 0, 'Lands', 'lands', 6, 1),
(145, 1, 8, 1, 'Lands', 'lands', 3, 1),
(146, 1, 8, 2, 'Lands', 'lands', 8, 1),
(147, 1, 8, 3, 'Lands', 'lands', 7, 1),
(148, 1, 8, 4, 'Lands', 'lands', 3, 1),
(149, 1, 8, 5, 'Lands', 'lands', 1, 1),
(150, 1, 8, 6, 'Lands', 'lands', 1, 1),
(151, 1, 8, 7, 'Lands', 'lands', 2, 1),
(152, 1, 8, 8, 'Lands', 'lands', 7, 1),
(153, 1, 8, 9, 'Lands', 'lands', 6, 1),
(154, 1, 8, 10, 'Lands', 'lands', 0, 1),
(155, 1, 8, 11, 'Lands', 'lands', 1, 1),
(156, 1, 8, 12, 'DarkDesert', 'darkSand', 2, 1),
(157, 1, 8, 13, 'DarkDesert', 'darkSand', 0, 1),
(158, 1, 8, 14, 'DarkDesert', 'darkSand', 2, 1),
(159, 1, 8, 15, 'DarkDesert', 'darkSand', 4, 1),
(160, 1, 8, 16, 'DarkDesert', 'darkSand', 2, 1),
(161, 1, 8, 17, 'DarkDesert', 'darkSand', 1, 1),
(162, 1, 9, 0, 'Lands', 'lands', 2, 1),
(163, 1, 9, 1, 'Lands', 'lands', 2, 1),
(164, 1, 9, 2, 'Lands', 'lands', 2, 1),
(165, 1, 9, 3, 'Lands', 'lands', 7, 1),
(166, 1, 9, 4, 'Lands', 'lands', 9, 1),
(167, 1, 9, 5, 'Lands', 'lands', 4, 1),
(168, 1, 9, 6, 'Lands', 'lands', 9, 1),
(169, 1, 9, 7, 'Lands', 'lands', 4, 1),
(170, 1, 9, 8, 'Lands', 'lands', 3, 1),
(171, 1, 9, 9, 'Lands', 'lands', 0, 1),
(172, 1, 9, 10, 'Lands', 'lands', 8, 1),
(173, 1, 9, 11, 'Lands', 'lands', 0, 1),
(174, 1, 9, 12, 'Lands', 'lands', 9, 1),
(175, 1, 9, 13, 'DarkDesert', 'darkSand', 0, 1),
(176, 1, 9, 14, 'DarkDesert', 'darkSand', 0, 1),
(177, 1, 9, 15, 'DarkDesert', 'darkSand', 1, 1),
(178, 1, 9, 16, 'DarkDesert', 'darkSand', 3, 1),
(179, 1, 9, 17, 'DarkDesert', 'darkSand', 4, 1),
(180, 1, 10, 0, 'Lands', 'lands', 2, 1),
(181, 1, 10, 1, 'Lands', 'lands', 5, 1),
(182, 1, 10, 2, 'Lands', 'lands', 6, 1),
(183, 1, 10, 3, 'Lands', 'lands', 1, 1),
(184, 1, 10, 4, 'Lands', 'lands', 7, 1),
(185, 1, 10, 5, 'Lands', 'lands', 3, 1),
(186, 1, 10, 6, 'Lands', 'lands', 7, 1),
(187, 1, 10, 7, 'Lands', 'lands', 9, 1),
(188, 1, 10, 8, 'Lands', 'lands', 7, 1),
(189, 1, 10, 9, 'Lands', 'lands', 3, 1),
(190, 1, 10, 10, 'Lands', 'lands', 9, 1),
(191, 1, 10, 11, 'Lands', 'lands', 1, 1),
(192, 1, 10, 12, 'Lands', 'lands', 1, 1),
(193, 1, 10, 13, 'DarkDesert', 'darkSand', 3, 1),
(194, 1, 10, 14, 'DarkDesert', 'darkSand', 1, 1),
(195, 1, 10, 15, 'DarkDesert', 'darkSand', 1, 1),
(196, 1, 10, 16, 'DarkDesert', 'darkSand', 0, 1),
(197, 1, 10, 17, 'DarkDesert', 'darkSand', 0, 1),
(198, 1, 11, 0, 'Lands', 'lands', 3, 1),
(199, 1, 11, 1, 'Lands', 'lands', 8, 1),
(200, 1, 11, 2, 'Lands', 'lands', 1, 1),
(201, 1, 11, 3, 'Lands', 'lands', 3, 1),
(202, 1, 11, 4, 'Lands', 'lands', 6, 1),
(203, 1, 11, 5, 'Lands', 'lands', 0, 1),
(204, 1, 11, 6, 'Lands', 'lands', 5, 1),
(205, 1, 11, 7, 'Lands', 'lands', 4, 1),
(206, 1, 11, 8, 'Lands', 'lands', 1, 1),
(207, 1, 11, 9, 'Lands', 'lands', 5, 1),
(208, 1, 11, 10, 'Lands', 'lands', 3, 1),
(209, 1, 11, 11, 'Lands', 'lands', 2, 1),
(210, 1, 11, 12, 'Lands', 'lands', 4, 1),
(211, 1, 11, 13, 'DarkDesert', 'darkSand', 5, 1),
(212, 1, 11, 14, 'DarkDesert', 'darkSand', 5, 1),
(213, 1, 11, 15, 'DarkDesert', 'darkSand', 0, 1),
(214, 1, 11, 16, 'DarkDesert', 'darkSand', 0, 1),
(215, 1, 11, 17, 'DarkDesert', 'darkSand', 3, 1),
(216, 1, 12, 0, 'Lands', 'lands', 3, 1),
(217, 1, 12, 1, 'Lands', 'lands', 0, 1),
(218, 1, 12, 2, 'Lands', 'lands', 2, 1),
(219, 1, 12, 3, 'Lands', 'lands', 6, 1),
(220, 1, 12, 4, 'Lands', 'lands', 9, 1),
(221, 1, 12, 5, 'Lands', 'lands', 3, 1),
(222, 1, 12, 6, 'Lands', 'lands', 6, 1),
(223, 1, 12, 7, 'Lands', 'lands', 3, 1),
(224, 1, 12, 8, 'Lands', 'lands', 3, 1),
(225, 1, 12, 9, 'Lands', 'lands', 8, 1),
(226, 1, 12, 10, 'Lands', 'lands', 4, 1),
(227, 1, 12, 11, 'Lands', 'lands', 7, 1),
(228, 1, 12, 12, 'Lands', 'lands', 3, 1),
(229, 1, 12, 13, 'Desert', 'sand', 8, 1),
(230, 1, 12, 14, 'Desert', 'sand', 3, 1),
(231, 1, 12, 15, 'DarkDesert', 'darkSand', 4, 1),
(232, 1, 12, 16, 'DarkDesert', 'darkSand', 3, 1),
(233, 1, 12, 17, 'DarkDesert', 'darkSand', 0, 1),
(234, 1, 13, 0, 'Lands', 'lands', 0, 1),
(235, 1, 13, 1, 'Lands', 'lands', 3, 1),
(236, 1, 13, 2, 'Lands', 'lands', 5, 1),
(237, 1, 13, 3, 'Lands', 'lands', 0, 1),
(238, 1, 13, 4, 'Lands', 'lands', 6, 1),
(239, 1, 13, 5, 'Lands', 'lands', 0, 1),
(240, 1, 13, 6, 'Lands', 'lands', 6, 1),
(241, 1, 13, 7, 'Lands', 'lands', 7, 1),
(242, 1, 13, 8, 'Lands', 'lands', 5, 1),
(243, 1, 13, 9, 'Lands', 'lands', 4, 0),
(244, 1, 13, 10, 'Lands', 'lands', 5, 0),
(245, 1, 13, 11, 'Lands', 'lands', 5, 0),
(246, 1, 13, 12, 'Desert', 'sand', 1, 0),
(247, 1, 13, 13, 'Desert', 'sand', 0, 1),
(248, 1, 13, 14, 'Desert', 'sand', 2, 1),
(249, 1, 13, 15, 'Desert', 'sand', 1, 1),
(250, 1, 13, 16, 'Desert', 'sand', 5, 1),
(251, 1, 13, 17, 'Desert', 'sand', 7, 1),
(252, 1, 14, 0, 'Lands', 'lands', 4, 1),
(253, 1, 14, 1, 'Lands', 'lands', 7, 1),
(254, 1, 14, 2, 'Lands', 'lands', 6, 1),
(255, 1, 14, 3, 'Lands', 'lands', 1, 1),
(256, 1, 14, 4, 'Lands', 'lands', 7, 1),
(257, 1, 14, 5, 'Lands', 'lands', 3, 1),
(258, 1, 14, 6, 'Lands', 'lands', 6, 1),
(259, 1, 14, 7, 'Lands', 'lands', 6, 1),
(260, 1, 14, 8, 'Lands', 'lands', 0, 1),
(261, 1, 14, 9, 'Lands', 'lands', 9, 0),
(262, 1, 14, 10, 'Lands', 'lands', 3, 0),
(263, 1, 14, 11, 'Desert', 'sand', 3, 0),
(264, 1, 14, 12, 'Desert', 'sand', 5, 0),
(265, 1, 14, 13, 'Desert', 'sand', 3, 1),
(266, 1, 14, 14, 'Desert', 'sand', 1, 1),
(267, 1, 14, 15, 'Desert', 'sand', 1, 1),
(268, 1, 14, 16, 'Desert', 'sand', 7, 1),
(269, 1, 14, 17, 'Desert', 'sand', 5, 1),
(270, 1, 15, 0, 'Lands', 'lands', 2, 1),
(271, 1, 15, 1, 'Lands', 'lands', 2, 1),
(272, 1, 15, 2, 'Lands', 'lands', 3, 1),
(273, 1, 15, 3, 'Lands', 'lands', 3, 1),
(274, 1, 15, 4, 'Lands', 'lands', 0, 1),
(275, 1, 15, 5, 'Lands', 'lands', 4, 1),
(276, 1, 15, 6, 'Lands', 'lands', 7, 1),
(277, 1, 15, 7, 'Lands', 'lands', 3, 1),
(278, 1, 15, 8, 'Lands', 'lands', 5, 1),
(279, 1, 15, 9, 'Desert', 'sand', 3, 0),
(280, 1, 15, 10, 'Desert', 'sand', 4, 0),
(281, 1, 15, 11, 'Desert', 'sand', 3, 0),
(282, 1, 15, 12, 'Desert', 'sand', 4, 1),
(283, 1, 15, 13, 'Desert', 'sand', 3, 1),
(284, 1, 15, 14, 'Desert', 'sand', 5, 1),
(285, 1, 15, 15, 'Desert', 'sand', 4, 1),
(286, 1, 15, 16, 'Desert', 'sand', 6, 1),
(287, 1, 15, 17, 'Desert', 'sand', 0, 1),
(288, 1, 16, 0, 'Lands', 'lands', 5, 1),
(289, 1, 16, 1, 'Lands', 'lands', 7, 1),
(290, 1, 16, 2, 'Lands', 'lands', 7, 1),
(291, 1, 16, 3, 'Lands', 'lands', 5, 1),
(292, 1, 16, 4, 'Lands', 'lands', 9, 1),
(293, 1, 16, 5, 'Lands', 'lands', 7, 1),
(294, 1, 16, 6, 'Lands', 'lands', 5, 1),
(295, 1, 16, 7, 'Lands', 'lands', 4, 1),
(296, 1, 16, 8, 'Desert', 'sand', 2, 1),
(297, 1, 16, 9, 'Desert', 'sand', 4, 0),
(298, 1, 16, 10, 'Desert', 'sand', 1, 0),
(299, 1, 16, 11, 'Desert', 'sand', 5, 0),
(300, 1, 16, 12, 'Desert', 'sand', 6, 0),
(301, 1, 16, 13, 'Desert', 'sand', 3, 1),
(302, 1, 16, 14, 'Desert', 'sand', 0, 1),
(303, 1, 16, 15, 'Desert', 'sand', 4, 1),
(304, 1, 16, 16, 'Desert', 'sand', 6, 1),
(305, 1, 16, 17, 'Desert', 'sand', 3, 1),
(306, 1, 17, 0, 'Lands', 'lands', 1, 1),
(307, 1, 17, 1, 'Lands', 'lands', 7, 1),
(308, 1, 17, 2, 'Lands', 'lands', 7, 1),
(309, 1, 17, 3, 'Lands', 'lands', 9, 1),
(310, 1, 17, 4, 'Lands', 'lands', 7, 1),
(311, 1, 17, 5, 'Lands', 'lands', 5, 1),
(312, 1, 17, 6, 'Lands', 'lands', 6, 1),
(313, 1, 17, 7, 'Desert', 'sand', 1, 1),
(314, 1, 17, 8, 'Desert', 'sand', 1, 1),
(315, 1, 17, 9, 'Desert', 'sand', 7, 0),
(316, 1, 17, 10, 'Desert', 'sand', 8, 0),
(317, 1, 17, 11, 'Desert', 'sand', 6, 0),
(318, 1, 17, 12, 'Desert', 'sand', 5, 0),
(319, 1, 17, 13, 'Desert', 'sand', 6, 1),
(320, 1, 17, 14, 'Desert', 'sand', 4, 1),
(321, 1, 17, 15, 'Desert', 'sand', 6, 1),
(322, 1, 17, 16, 'Desert', 'sand', 9, 1),
(323, 1, 17, 17, 'Desert', 'sand', 8, 1),
(324, 1, 18, 0, 'Lands', 'lands', 2, 1),
(325, 1, 18, 1, 'Lands', 'lands', 6, 1),
(326, 1, 18, 2, 'Lands', 'lands', 7, 1),
(327, 1, 18, 3, 'Lands', 'lands', 7, 1),
(328, 1, 18, 4, 'Lands', 'lands', 6, 1),
(329, 1, 18, 5, 'Lands', 'lands', 8, 1),
(330, 1, 18, 6, 'Desert', 'sand', 2, 1),
(331, 1, 18, 7, 'Desert', 'sand', 3, 1),
(332, 1, 18, 8, 'Desert', 'sand', 4, 1),
(333, 1, 18, 9, 'Desert', 'sand', 3, 1),
(334, 1, 18, 10, 'Desert', 'sand', 8, 1),
(335, 1, 18, 11, 'Desert', 'sand', 8, 1),
(336, 1, 18, 12, 'Desert', 'sand', 9, 1),
(337, 1, 18, 13, 'Desert', 'sand', 9, 1),
(338, 1, 18, 14, 'Desert', 'sand', 9, 1),
(339, 1, 18, 15, 'Desert', 'sand', 4, 1),
(340, 1, 18, 16, 'Desert', 'sand', 5, 1),
(341, 1, 18, 17, 'Desert', 'sand', 9, 1),
(342, 1, 19, 0, 'Lands', 'lands', 1, 1),
(343, 1, 19, 1, 'Lands', 'lands', 2, 1),
(344, 1, 19, 2, 'Lands', 'lands', 0, 1),
(345, 1, 19, 3, 'Lands', 'lands', 1, 1),
(346, 1, 19, 4, 'Desert', 'sand', 5, 1),
(347, 1, 19, 5, 'Desert', 'sand', 0, 1),
(348, 1, 19, 6, 'Desert', 'sand', 7, 1),
(349, 1, 19, 7, 'Desert', 'sand', 7, 1),
(350, 1, 19, 8, 'Desert', 'sand', 5, 1),
(351, 1, 19, 9, 'Desert', 'sand', 3, 1),
(352, 1, 19, 10, 'Desert', 'sand', 6, 0),
(353, 1, 19, 11, 'Desert', 'sand', 7, 0),
(354, 1, 19, 12, 'Desert', 'sand', 7, 0),
(355, 1, 19, 13, 'Desert', 'sand', 2, 0),
(356, 1, 19, 14, 'Desert', 'sand', 9, 1),
(357, 1, 19, 15, 'Desert', 'sand', 2, 1),
(358, 1, 19, 16, 'Desert', 'sand', 1, 1),
(359, 1, 19, 17, 'Desert', 'sand', 0, 1),
(360, 1, 20, 0, 'Lands', 'lands', 7, 1),
(361, 1, 20, 1, 'Lands', 'lands', 0, 1),
(362, 1, 20, 2, 'Lands', 'lands', 4, 1),
(363, 1, 20, 3, 'Desert', 'sand', 9, 1),
(364, 1, 20, 4, 'Desert', 'sand', 6, 1),
(365, 1, 20, 5, 'Desert', 'sand', 1, 1),
(366, 1, 20, 6, 'Desert', 'sand', 3, 1),
(367, 1, 20, 7, 'Desert', 'sand', 8, 1),
(368, 1, 20, 8, 'Desert', 'sand', 7, 1),
(369, 1, 20, 9, 'Desert', 'sand', 1, 1),
(370, 1, 20, 10, 'Desert', 'sand', 0, 0),
(371, 1, 20, 11, 'Desert', 'sand', 9, 0),
(372, 1, 20, 12, 'Desert', 'sand', 9, 0),
(373, 1, 20, 13, 'Desert', 'sand', 0, 0),
(374, 1, 20, 14, 'Desert', 'sand', 0, 1),
(375, 1, 20, 15, 'Desert', 'sand', 5, 1),
(376, 1, 20, 16, 'Desert', 'sand', 1, 1),
(377, 1, 20, 17, 'Desert', 'sand', 4, 1),
(378, 1, 21, 0, 'Lands', 'lands', 8, 1),
(379, 1, 21, 1, 'Lands', 'lands', 4, 1),
(380, 1, 21, 2, 'Desert', 'sand', 5, 1),
(381, 1, 21, 3, 'Desert', 'sand', 2, 1),
(382, 1, 21, 4, 'Desert', 'sand', 1, 1),
(383, 1, 21, 5, 'Desert', 'sand', 0, 1),
(384, 1, 21, 6, 'Desert', 'sand', 7, 1),
(385, 1, 21, 7, 'Desert', 'sand', 8, 1),
(386, 1, 21, 8, 'Desert', 'sand', 6, 1),
(387, 1, 21, 9, 'Desert', 'sand', 4, 1),
(388, 1, 21, 10, 'Desert', 'sand', 7, 0),
(389, 1, 21, 11, 'Desert', 'sand', 4, 0),
(390, 1, 21, 12, 'Desert', 'sand', 3, 0),
(391, 1, 21, 13, 'Desert', 'sand', 0, 1),
(392, 1, 21, 14, 'Desert', 'sand', 7, 1),
(393, 1, 21, 15, 'Desert', 'sand', 4, 1),
(394, 1, 21, 16, 'Desert', 'sand', 0, 1),
(395, 1, 21, 17, 'Desert', 'sand', 1, 1),
(396, 1, 22, 0, 'Lands', 'lands', 4, 1),
(397, 1, 22, 1, 'Desert', 'sand', 5, 1),
(398, 1, 22, 2, 'Desert', 'sand', 3, 1),
(399, 1, 22, 3, 'Desert', 'sand', 0, 1),
(400, 1, 22, 4, 'Desert', 'sand', 0, 1),
(401, 1, 22, 5, 'Desert', 'sand', 7, 1),
(402, 1, 22, 6, 'Desert', 'sand', 4, 1),
(403, 1, 22, 7, 'Desert', 'sand', 0, 1),
(404, 1, 22, 8, 'Desert', 'sand', 4, 1),
(405, 1, 22, 9, 'Desert', 'sand', 2, 1),
(406, 1, 22, 10, 'Desert', 'sand', 1, 0),
(407, 1, 22, 11, 'Desert', 'sand', 1, 0),
(408, 1, 22, 12, 'Desert', 'sand', 2, 0),
(409, 1, 22, 13, 'Desert', 'sand', 2, 0),
(410, 1, 22, 14, 'Desert', 'sand', 8, 1),
(411, 1, 22, 15, 'Desert', 'sand', 6, 1),
(412, 1, 22, 16, 'Desert', 'sand', 6, 1),
(413, 1, 22, 17, 'Desert', 'sand', 6, 1),
(414, 1, 23, 0, 'Desert', 'sand', 9, 1),
(415, 1, 23, 1, 'Desert', 'sand', 2, 1),
(416, 1, 23, 2, 'Desert', 'sand', 0, 1),
(417, 1, 23, 3, 'Desert', 'sand', 1, 1),
(418, 1, 23, 4, 'Desert', 'sand', 8, 1),
(419, 1, 23, 5, 'Desert', 'sand', 7, 1),
(420, 1, 23, 6, 'Desert', 'sand', 4, 1),
(421, 1, 23, 7, 'Desert', 'sand', 0, 1),
(422, 1, 23, 8, 'Desert', 'sand', 6, 1),
(423, 1, 23, 9, 'Desert', 'sand', 3, 1),
(424, 1, 23, 10, 'Desert', 'sand', 7, 0),
(425, 1, 23, 11, 'Desert', 'sand', 1, 0),
(426, 1, 23, 12, 'Desert', 'sand', 3, 0),
(427, 1, 23, 13, 'Desert', 'sand', 0, 0),
(428, 1, 23, 14, 'Desert', 'sand', 6, 1),
(429, 1, 23, 15, 'Desert', 'sand', 6, 1),
(430, 1, 23, 16, 'Desert', 'sand', 2, 1),
(431, 1, 23, 17, 'Desert', 'sand', 4, 1),
(432, 1, 24, 0, 'Desert', 'sand', 3, 1),
(433, 1, 24, 1, 'Desert', 'sand', 2, 1),
(434, 1, 24, 2, 'Desert', 'sand', 1, 1),
(435, 1, 24, 3, 'Desert', 'sand', 3, 1),
(436, 1, 24, 4, 'Desert', 'sand', 1, 1),
(437, 1, 24, 5, 'Desert', 'sand', 1, 1),
(438, 1, 24, 6, 'Desert', 'sand', 9, 1),
(439, 1, 24, 7, 'Desert', 'sand', 7, 1),
(440, 1, 24, 8, 'Desert', 'sand', 6, 1),
(441, 1, 24, 9, 'Desert', 'sand', 7, 1),
(442, 1, 24, 10, 'Desert', 'sand', 2, 1),
(443, 1, 24, 11, 'Desert', 'sand', 1, 1),
(444, 1, 24, 12, 'Desert', 'sand', 4, 1),
(445, 1, 24, 13, 'Desert', 'sand', 5, 1),
(446, 1, 24, 14, 'Desert', 'sand', 2, 1),
(447, 1, 24, 15, 'Desert', 'sand', 7, 1),
(448, 1, 24, 16, 'Desert', 'sand', 7, 1),
(449, 1, 24, 17, 'Desert', 'sand', 8, 1),
(453, 1, 0, 0, 'Lands', 'lands', 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `town`
--

CREATE TABLE `town` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `used_id` int(11) DEFAULT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `owner` int(11) DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `town`
--

INSERT INTO `town` (`id`, `game_id`, `used_id`, `x`, `y`, `type`, `owner`, `name`, `description`) VALUES
(2, 1, NULL, 1, 17, 3, NULL, NULL, NULL),
(1, 1, NULL, 15, 12, 1, NULL, NULL, NULL);

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
(1, 'Вася', 'vasya', '123', 'b3c3dccfcc6b813a2797e765fe0a3a72'),
(2, 'Петя', 'petya', '321', '2820ca9e3fd9a9a71ae70c46e95e1992');

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
  `is_active` int(11) NOT NULL,
  `mode` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users_games`
--

INSERT INTO `users_games` (`id`, `user_id`, `game_id`, `color`, `order`, `is_active`, `mode`) VALUES
(1, 1, 1, 'red', 0, 1, 'world'),
(2, 2, 1, 'blue', 1, 0, 'world');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `artifact`
--
ALTER TABLE `artifact`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `battle`
--
ALTER TABLE `battle`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `battle_map`
--
ALTER TABLE `battle_map`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `battle_tile`
--
ALTER TABLE `battle_tile`
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
-- Индексы таблицы `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT для таблицы `battle`
--
ALTER TABLE `battle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `battle_map`
--
ALTER TABLE `battle_map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `battle_tile`
--
ALTER TABLE `battle_tile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
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
-- AUTO_INCREMENT для таблицы `inventory`
--
ALTER TABLE `inventory`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT для таблицы `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `tile`
--
ALTER TABLE `tile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=454;
--
-- AUTO_INCREMENT для таблицы `town`
--
ALTER TABLE `town`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
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
