-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Янв 30 2019 г., 15:33
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
(1, 1, 0, 'rightHand', 1, -1, -1, 0, 1, 'Sword Of Bastard', 'Kill me, I won`t do anything to you...'),
(2, 1, 0, 'leftHand', 1, -1, -1, 1, 1, 'Shield Of Homeless', 'Kill me, I am anyway homeless...'),
(3, 1, 0, 'body', 1, -1, -1, 2, 1, 'Cuirass Of Aristocrat', 'I`ll make you pay for everything!!!'),
(4, 1, 0, 'cloak', 1, -1, -1, 3, 1, 'Cloak of Warior', 'I\'ll hide you from mom'),
(5, 1, 0, 'ringOne', 1, -1, -1, 4, 1, 'Wedding ring', 'Well all bro, this is the end....'),
(6, 1, 0, 'neck', 1, -1, -1, 5, 1, 'Necklace of Nigggggga', 'SWAAAAAG!!!!'),
(7, 1, 0, 'gloves', 1, -1, -1, 6, 1, 'Gloves of Theif', 'I\'ll steal everything from you'),
(8, 1, 0, 'head', 0, -1, -1, 7, 1, 'Helmet of Builder', 'I will build a house of your bones'),
(9, 1, 0, 'feet', 1, -1, -1, 8, 1, 'Shoes of Runner', 'Run Forrest, Run!!!!!'),
(10, 1, 0, 'ringTwo', 0, -1, -1, 9, 1, 'Bandit Ring', 'It was popular in the 90s');

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
(1, 1, 1, 6, 6, 0, 1, 'Молодой человек из Гилнеаса', 'Просто бард'),
(2, 1, 2, 8, 5, 0, 2, 'VJlLink_Hero', 'Петя, твой герой, ты и расскажи');

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
(1, 1, 1, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 10);

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
(1, 1, 'hero', 4, 4, 12, 80, 0, 8, NULL, 1, 950, 0),
(2, 1, 'hero_default', 1, 1, 12, 5, 0, 8, NULL, 1, 950, 0),
(3, 2, 'hero', 2, 2, 5, 1, 1, 3, NULL, 2, 709, 0),
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
(1, 1, 'gamer', 2890, 3700, 2800),
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
(1, 1, 0, 1, 'Desert', 'sand', 5, 1),
(2, 1, 0, 2, 'Desert', 'sand', 7, 1),
(3, 1, 0, 3, 'Desert', 'sand', 7, 1),
(4, 1, 0, 4, 'Desert', 'sand', 6, 1),
(5, 1, 0, 5, 'Desert', 'sand', 5, 1),
(6, 1, 0, 6, 'Desert', 'sand', 2, 1),
(7, 1, 0, 7, 'Desert', 'sand', 1, 1),
(8, 1, 0, 8, 'Desert', 'sand', 5, 1),
(9, 1, 0, 9, 'Desert', 'sand', 3, 1),
(10, 1, 0, 10, 'Desert', 'sand', 7, 1),
(11, 1, 0, 11, 'Desert', 'sand', 3, 1),
(12, 1, 0, 12, 'Desert', 'sand', 5, 1),
(13, 1, 0, 13, 'Desert', 'sand', 9, 1),
(14, 1, 0, 14, 'Desert', 'sand', 7, 1),
(15, 1, 0, 15, 'Desert', 'sand', 9, 1),
(16, 1, 0, 16, 'Desert', 'sand', 2, 1),
(17, 1, 0, 17, 'Desert', 'sand', 3, 1),
(18, 1, 1, 0, 'Desert', 'sand', 6, 1),
(19, 1, 1, 1, 'Desert', 'sand', 6, 1),
(20, 1, 1, 2, 'Desert', 'sand', 4, 1),
(21, 1, 1, 3, 'Desert', 'sand', 2, 1),
(22, 1, 1, 4, 'Desert', 'sand', 5, 1),
(23, 1, 1, 5, 'Desert', 'sand', 3, 1),
(24, 1, 1, 6, 'Desert', 'sand', 0, 1),
(25, 1, 1, 7, 'Desert', 'sand', 0, 1),
(26, 1, 1, 8, 'Desert', 'sand', 5, 1),
(27, 1, 1, 9, 'Desert', 'sand', 8, 1),
(28, 1, 1, 10, 'Desert', 'sand', 2, 1),
(29, 1, 1, 11, 'Desert', 'sand', 5, 1),
(30, 1, 1, 12, 'Desert', 'sand', 5, 1),
(31, 1, 1, 13, 'Desert', 'sand', 0, 1),
(32, 1, 1, 14, 'Desert', 'sand', 4, 1),
(33, 1, 1, 15, 'Desert', 'sand', 7, 1),
(34, 1, 1, 16, 'Desert', 'sand', 7, 1),
(35, 1, 1, 17, 'Desert', 'sand', 5, 1),
(36, 1, 2, 0, 'Desert', 'sand', 8, 1),
(37, 1, 2, 1, 'Desert', 'sand', 3, 1),
(38, 1, 2, 2, 'Desert', 'sand', 7, 1),
(39, 1, 2, 3, 'Desert', 'sand', 5, 1),
(40, 1, 2, 4, 'Desert', 'sand', 6, 1),
(41, 1, 2, 5, 'Desert', 'sand', 9, 1),
(42, 1, 2, 6, 'Desert', 'sand', 2, 1),
(43, 1, 2, 7, 'Desert', 'sand', 1, 1),
(44, 1, 2, 8, 'Desert', 'sand', 4, 1),
(45, 1, 2, 9, 'Desert', 'sand', 8, 1),
(46, 1, 2, 10, 'Desert', 'sand', 8, 1),
(47, 1, 2, 11, 'Desert', 'sand', 3, 1),
(48, 1, 2, 12, 'Desert', 'sand', 8, 1),
(49, 1, 2, 13, 'Desert', 'sand', 3, 1),
(50, 1, 2, 14, 'Desert', 'sand', 7, 1),
(51, 1, 2, 15, 'Desert', 'sand', 8, 1),
(52, 1, 2, 16, 'Desert', 'sand', 0, 1),
(53, 1, 2, 17, 'Desert', 'sand', 7, 1),
(54, 1, 3, 0, 'Plains', 'grass', 8, 1),
(55, 1, 3, 1, 'Desert', 'sand', 0, 1),
(56, 1, 3, 2, 'Desert', 'sand', 7, 0),
(57, 1, 3, 3, 'Desert', 'sand', 6, 0),
(58, 1, 3, 4, 'Desert', 'sand', 1, 0),
(59, 1, 3, 5, 'Desert', 'sand', 4, 0),
(60, 1, 3, 6, 'Desert', 'sand', 1, 1),
(61, 1, 3, 7, 'Desert', 'sand', 1, 1),
(62, 1, 3, 8, 'Desert', 'sand', 2, 1),
(63, 1, 3, 9, 'Desert', 'sand', 2, 1),
(64, 1, 3, 10, 'Desert', 'sand', 5, 1),
(65, 1, 3, 11, 'Desert', 'sand', 3, 1),
(66, 1, 3, 12, 'Desert', 'sand', 0, 1),
(67, 1, 3, 13, 'Desert', 'sand', 8, 1),
(68, 1, 3, 14, 'Desert', 'sand', 8, 1),
(69, 1, 3, 15, 'Desert', 'sand', 3, 1),
(70, 1, 3, 16, 'Desert', 'sand', 3, 1),
(71, 1, 3, 17, 'Desert', 'sand', 9, 1),
(72, 1, 4, 0, 'Plains', 'grass', 3, 1),
(73, 1, 4, 1, 'Plains', 'grass', 3, 1),
(74, 1, 4, 2, 'Desert', 'sand', 9, 0),
(75, 1, 4, 3, 'Desert', 'sand', 9, 0),
(76, 1, 4, 4, 'Desert', 'sand', 9, 0),
(77, 1, 4, 5, 'Desert', 'sand', 2, 0),
(78, 1, 4, 6, 'Desert', 'sand', 5, 1),
(79, 1, 4, 7, 'Desert', 'sand', 3, 1),
(80, 1, 4, 8, 'Desert', 'sand', 8, 1),
(81, 1, 4, 9, 'Desert', 'sand', 3, 1),
(82, 1, 4, 10, 'Desert', 'sand', 7, 1),
(83, 1, 4, 11, 'Desert', 'sand', 4, 1),
(84, 1, 4, 12, 'Desert', 'sand', 2, 1),
(85, 1, 4, 13, 'Desert', 'sand', 2, 1),
(86, 1, 4, 14, 'Desert', 'sand', 5, 1),
(87, 1, 4, 15, 'Desert', 'sand', 9, 1),
(88, 1, 4, 16, 'Desert', 'sand', 2, 1),
(89, 1, 4, 17, 'Desert', 'sand', 4, 1),
(90, 1, 5, 0, 'Plains', 'grass', 9, 1),
(91, 1, 5, 1, 'Plains', 'grass', 2, 1),
(92, 1, 5, 2, 'Plains', 'grass', 5, 0),
(93, 1, 5, 3, 'Plains', 'grass', 4, 0),
(94, 1, 5, 4, 'Desert', 'sand', 6, 0),
(95, 1, 5, 5, 'Desert', 'sand', 3, 1),
(96, 1, 5, 6, 'Desert', 'sand', 5, 1),
(97, 1, 5, 7, 'Desert', 'sand', 4, 1),
(98, 1, 5, 8, 'Desert', 'sand', 9, 1),
(99, 1, 5, 9, 'Desert', 'sand', 1, 1),
(100, 1, 5, 10, 'Desert', 'sand', 2, 1),
(101, 1, 5, 11, 'Desert', 'sand', 1, 1),
(102, 1, 5, 12, 'Desert', 'sand', 1, 1),
(103, 1, 5, 13, 'Desert', 'sand', 0, 1),
(104, 1, 5, 14, 'Desert', 'sand', 2, 1),
(105, 1, 5, 15, 'Desert', 'sand', 9, 1),
(106, 1, 5, 16, 'Desert', 'sand', 5, 1),
(107, 1, 5, 17, 'Desert', 'sand', 3, 1),
(108, 1, 6, 0, 'Plains', 'grass', 6, 1),
(109, 1, 6, 1, 'Plains', 'grass', 8, 1),
(110, 1, 6, 2, 'Plains', 'grass', 2, 0),
(111, 1, 6, 3, 'Plains', 'grass', 2, 0),
(112, 1, 6, 4, 'Plains', 'grass', 7, 0),
(113, 1, 6, 5, 'Plains', 'grass', 0, 0),
(114, 1, 6, 6, 'Desert', 'sand', 7, 1),
(115, 1, 6, 7, 'Desert', 'sand', 7, 1),
(116, 1, 6, 8, 'Desert', 'sand', 7, 1),
(117, 1, 6, 9, 'Desert', 'sand', 9, 1),
(118, 1, 6, 10, 'Desert', 'sand', 2, 1),
(119, 1, 6, 11, 'Desert', 'sand', 6, 1),
(120, 1, 6, 12, 'Desert', 'sand', 7, 1),
(121, 1, 6, 13, 'Desert', 'sand', 7, 1),
(122, 1, 6, 14, 'Desert', 'sand', 7, 1),
(123, 1, 6, 15, 'Desert', 'sand', 2, 1),
(124, 1, 6, 16, 'Desert', 'sand', 8, 1),
(125, 1, 6, 17, 'Desert', 'sand', 6, 1),
(126, 1, 7, 0, 'Plains', 'grass', 2, 1),
(127, 1, 7, 1, 'Plains', 'grass', 3, 1),
(128, 1, 7, 2, 'Plains', 'grass', 3, 0),
(129, 1, 7, 3, 'Plains', 'grass', 0, 0),
(130, 1, 7, 4, 'Plains', 'grass', 1, 0),
(131, 1, 7, 5, 'Plains', 'grass', 9, 0),
(132, 1, 7, 6, 'Plains', 'grass', 7, 1),
(133, 1, 7, 7, 'Desert', 'sand', 5, 1),
(134, 1, 7, 8, 'Desert', 'sand', 1, 1),
(135, 1, 7, 9, 'Desert', 'sand', 9, 1),
(136, 1, 7, 10, 'Desert', 'sand', 7, 1),
(137, 1, 7, 11, 'Desert', 'sand', 0, 1),
(138, 1, 7, 12, 'Desert', 'sand', 6, 1),
(139, 1, 7, 13, 'Desert', 'sand', 8, 1),
(140, 1, 7, 14, 'Desert', 'sand', 1, 1),
(141, 1, 7, 15, 'Desert', 'sand', 6, 1),
(142, 1, 7, 16, 'Desert', 'sand', 5, 1),
(143, 1, 7, 17, 'Desert', 'sand', 7, 1),
(144, 1, 8, 0, 'Plains', 'grass', 7, 1),
(145, 1, 8, 1, 'Plains', 'grass', 3, 1),
(146, 1, 8, 2, 'Plains', 'grass', 4, 1),
(147, 1, 8, 3, 'Plains', 'grass', 2, 1),
(148, 1, 8, 4, 'Plains', 'grass', 6, 1),
(149, 1, 8, 5, 'Plains', 'grass', 7, 1),
(150, 1, 8, 6, 'Plains', 'grass', 4, 1),
(151, 1, 8, 7, 'Plains', 'grass', 3, 1),
(152, 1, 8, 8, 'Plains', 'grass', 5, 1),
(153, 1, 8, 9, 'Desert', 'sand', 1, 1),
(154, 1, 8, 10, 'Desert', 'sand', 0, 1),
(155, 1, 8, 11, 'Desert', 'sand', 5, 1),
(156, 1, 8, 12, 'Desert', 'sand', 8, 1),
(157, 1, 8, 13, 'Desert', 'sand', 4, 1),
(158, 1, 8, 14, 'Desert', 'sand', 9, 1),
(159, 1, 8, 15, 'Desert', 'sand', 9, 1),
(160, 1, 8, 16, 'Desert', 'sand', 3, 1),
(161, 1, 8, 17, 'Desert', 'sand', 4, 1),
(162, 1, 9, 0, 'Plains', 'grass', 9, 1),
(163, 1, 9, 1, 'Plains', 'grass', 8, 1),
(164, 1, 9, 2, 'Plains', 'grass', 8, 1),
(165, 1, 9, 3, 'Plains', 'grass', 6, 1),
(166, 1, 9, 4, 'Plains', 'grass', 8, 1),
(167, 1, 9, 5, 'Plains', 'grass', 0, 1),
(168, 1, 9, 6, 'Plains', 'grass', 5, 1),
(169, 1, 9, 7, 'Plains', 'grass', 2, 1),
(170, 1, 9, 8, 'Plains', 'grass', 3, 0),
(171, 1, 9, 9, 'Plains', 'grass', 1, 0),
(172, 1, 9, 10, 'Plains', 'grass', 3, 0),
(173, 1, 9, 11, 'Desert', 'sand', 2, 0),
(174, 1, 9, 12, 'Desert', 'sand', 9, 1),
(175, 1, 9, 13, 'Desert', 'sand', 5, 1),
(176, 1, 9, 14, 'Desert', 'sand', 8, 1),
(177, 1, 9, 15, 'Desert', 'sand', 3, 1),
(178, 1, 9, 16, 'Desert', 'sand', 0, 1),
(179, 1, 9, 17, 'Desert', 'sand', 1, 1),
(180, 1, 10, 0, 'Plains', 'grass', 5, 1),
(181, 1, 10, 1, 'Plains', 'grass', 8, 1),
(182, 1, 10, 2, 'Plains', 'grass', 8, 1),
(183, 1, 10, 3, 'Plains', 'grass', 8, 1),
(184, 1, 10, 4, 'Plains', 'grass', 4, 1),
(185, 1, 10, 5, 'Plains', 'grass', 7, 1),
(186, 1, 10, 6, 'Plains', 'grass', 2, 1),
(187, 1, 10, 7, 'Plains', 'grass', 7, 1),
(188, 1, 10, 8, 'Plains', 'grass', 9, 0),
(189, 1, 10, 9, 'Plains', 'grass', 2, 0),
(190, 1, 10, 10, 'Plains', 'grass', 3, 0),
(191, 1, 10, 11, 'Plains', 'grass', 8, 0),
(192, 1, 10, 12, 'Desert', 'sand', 6, 1),
(193, 1, 10, 13, 'Desert', 'sand', 5, 1),
(194, 1, 10, 14, 'Desert', 'sand', 3, 1),
(195, 1, 10, 15, 'Desert', 'sand', 4, 1),
(196, 1, 10, 16, 'Desert', 'sand', 8, 1),
(197, 1, 10, 17, 'Desert', 'sand', 8, 1),
(198, 1, 11, 0, 'Plains', 'grass', 6, 1),
(199, 1, 11, 1, 'Plains', 'grass', 1, 1),
(200, 1, 11, 2, 'Plains', 'grass', 5, 1),
(201, 1, 11, 3, 'Plains', 'grass', 2, 1),
(202, 1, 11, 4, 'Plains', 'grass', 3, 1),
(203, 1, 11, 5, 'Plains', 'grass', 3, 1),
(204, 1, 11, 6, 'Plains', 'grass', 7, 1),
(205, 1, 11, 7, 'Plains', 'grass', 1, 1),
(206, 1, 11, 8, 'Plains', 'grass', 8, 0),
(207, 1, 11, 9, 'Plains', 'grass', 1, 0),
(208, 1, 11, 10, 'Plains', 'grass', 4, 0),
(209, 1, 11, 11, 'Plains', 'grass', 5, 1),
(210, 1, 11, 12, 'Plains', 'grass', 6, 1),
(211, 1, 11, 13, 'Plains', 'grass', 6, 1),
(212, 1, 11, 14, 'Desert', 'sand', 9, 1),
(213, 1, 11, 15, 'Desert', 'sand', 5, 1),
(214, 1, 11, 16, 'Desert', 'sand', 2, 1),
(215, 1, 11, 17, 'Desert', 'sand', 0, 1),
(216, 1, 12, 0, 'Plains', 'grass', 5, 1),
(217, 1, 12, 1, 'Plains', 'grass', 7, 1),
(218, 1, 12, 2, 'Plains', 'grass', 3, 1),
(219, 1, 12, 3, 'Plains', 'grass', 5, 1),
(220, 1, 12, 4, 'Plains', 'grass', 3, 1),
(221, 1, 12, 5, 'Plains', 'grass', 4, 1),
(222, 1, 12, 6, 'Plains', 'grass', 2, 1),
(223, 1, 12, 7, 'Plains', 'grass', 8, 1),
(224, 1, 12, 8, 'Plains', 'grass', 7, 0),
(225, 1, 12, 9, 'Plains', 'grass', 5, 0),
(226, 1, 12, 10, 'Plains', 'grass', 7, 0),
(227, 1, 12, 11, 'Plains', 'grass', 4, 0),
(228, 1, 12, 12, 'Plains', 'grass', 0, 1),
(229, 1, 12, 13, 'Swamp', 'swamp', 1, 1),
(230, 1, 12, 14, 'Swamp', 'swamp', 1, 1),
(231, 1, 12, 15, 'Swamp', 'swamp', 5, 1),
(232, 1, 12, 16, 'Swamp', 'swamp', 5, 1),
(233, 1, 12, 17, 'Swamp', 'swamp', 2, 1),
(234, 1, 13, 0, 'Plains', 'grass', 3, 1),
(235, 1, 13, 1, 'Plains', 'grass', 1, 1),
(236, 1, 13, 2, 'Plains', 'grass', 6, 1),
(237, 1, 13, 3, 'Plains', 'grass', 0, 1),
(238, 1, 13, 4, 'Plains', 'grass', 4, 1),
(239, 1, 13, 5, 'Plains', 'grass', 1, 1),
(240, 1, 13, 6, 'Plains', 'grass', 8, 1),
(241, 1, 13, 7, 'Plains', 'grass', 0, 1),
(242, 1, 13, 8, 'Plains', 'grass', 8, 0),
(243, 1, 13, 9, 'Swamp', 'swamp', 2, 0),
(244, 1, 13, 10, 'Swamp', 'swamp', 3, 0),
(245, 1, 13, 11, 'Swamp', 'swamp', 0, 0),
(246, 1, 13, 12, 'Swamp', 'swamp', 3, 1),
(247, 1, 13, 13, 'Swamp', 'swamp', 9, 1),
(248, 1, 13, 14, 'Swamp', 'swamp', 1, 1),
(249, 1, 13, 15, 'Swamp', 'swamp', 0, 1),
(250, 1, 13, 16, 'Swamp', 'swamp', 8, 1),
(251, 1, 13, 17, 'Swamp', 'swamp', 8, 1),
(252, 1, 14, 0, 'Plains', 'grass', 4, 1),
(253, 1, 14, 1, 'Plains', 'grass', 9, 1),
(254, 1, 14, 2, 'Plains', 'grass', 6, 1),
(255, 1, 14, 3, 'Plains', 'grass', 6, 1),
(256, 1, 14, 4, 'Plains', 'grass', 6, 1),
(257, 1, 14, 5, 'Plains', 'grass', 8, 1),
(258, 1, 14, 6, 'Swamp', 'swamp', 5, 1),
(259, 1, 14, 7, 'Swamp', 'swamp', 4, 1),
(260, 1, 14, 8, 'Swamp', 'swamp', 8, 1),
(261, 1, 14, 9, 'Swamp', 'swamp', 8, 1),
(262, 1, 14, 10, 'Swamp', 'swamp', 2, 1),
(263, 1, 14, 11, 'Swamp', 'swamp', 8, 1),
(264, 1, 14, 12, 'Swamp', 'swamp', 1, 1),
(265, 1, 14, 13, 'Swamp', 'swamp', 7, 1),
(266, 1, 14, 14, 'Swamp', 'swamp', 6, 1),
(267, 1, 14, 15, 'Swamp', 'swamp', 5, 1),
(268, 1, 14, 16, 'Swamp', 'swamp', 8, 1),
(269, 1, 14, 17, 'Swamp', 'swamp', 6, 1),
(270, 1, 15, 0, 'Plains', 'grass', 0, 1),
(271, 1, 15, 1, 'Plains', 'grass', 7, 1),
(272, 1, 15, 2, 'Swamp', 'swamp', 0, 1),
(273, 1, 15, 3, 'Swamp', 'swamp', 7, 1),
(274, 1, 15, 4, 'Swamp', 'swamp', 8, 1),
(275, 1, 15, 5, 'Swamp', 'swamp', 4, 1),
(276, 1, 15, 6, 'Swamp', 'swamp', 9, 1),
(277, 1, 15, 7, 'Swamp', 'swamp', 3, 1),
(278, 1, 15, 8, 'Swamp', 'swamp', 7, 1),
(279, 1, 15, 9, 'Swamp', 'swamp', 9, 1),
(280, 1, 15, 10, 'Swamp', 'swamp', 0, 1),
(281, 1, 15, 11, 'Swamp', 'swamp', 4, 1),
(282, 1, 15, 12, 'Swamp', 'swamp', 8, 1),
(283, 1, 15, 13, 'Swamp', 'swamp', 7, 1),
(284, 1, 15, 14, 'Swamp', 'swamp', 0, 1),
(285, 1, 15, 15, 'Swamp', 'swamp', 0, 1),
(286, 1, 15, 16, 'Swamp', 'swamp', 4, 1),
(287, 1, 15, 17, 'Swamp', 'swamp', 1, 1),
(288, 1, 16, 0, 'Swamp', 'swamp', 7, 1),
(289, 1, 16, 1, 'Swamp', 'swamp', 9, 1),
(290, 1, 16, 2, 'Swamp', 'swamp', 7, 1),
(291, 1, 16, 3, 'Swamp', 'swamp', 0, 1),
(292, 1, 16, 4, 'Swamp', 'swamp', 5, 1),
(293, 1, 16, 5, 'Swamp', 'swamp', 9, 1),
(294, 1, 16, 6, 'Swamp', 'swamp', 3, 1),
(295, 1, 16, 7, 'Swamp', 'swamp', 5, 1),
(296, 1, 16, 8, 'Swamp', 'swamp', 4, 1),
(297, 1, 16, 9, 'Swamp', 'swamp', 1, 1),
(298, 1, 16, 10, 'Swamp', 'swamp', 1, 1),
(299, 1, 16, 11, 'Swamp', 'swamp', 5, 1),
(300, 1, 16, 12, 'Swamp', 'swamp', 0, 1),
(301, 1, 16, 13, 'Swamp', 'swamp', 7, 1),
(302, 1, 16, 14, 'Swamp', 'swamp', 5, 1),
(303, 1, 16, 15, 'Swamp', 'swamp', 7, 1),
(304, 1, 16, 16, 'Swamp', 'swamp', 5, 1),
(305, 1, 16, 17, 'Swamp', 'swamp', 5, 1),
(306, 1, 17, 0, 'Swamp', 'swamp', 3, 1),
(307, 1, 17, 1, 'Swamp', 'swamp', 5, 1),
(308, 1, 17, 2, 'Swamp', 'swamp', 9, 1),
(309, 1, 17, 3, 'Swamp', 'swamp', 3, 1),
(310, 1, 17, 4, 'Swamp', 'swamp', 0, 1),
(311, 1, 17, 5, 'Swamp', 'swamp', 2, 1),
(312, 1, 17, 6, 'Swamp', 'swamp', 7, 1),
(313, 1, 17, 7, 'Swamp', 'swamp', 5, 1),
(314, 1, 17, 8, 'Swamp', 'swamp', 4, 1),
(315, 1, 17, 9, 'Swamp', 'swamp', 8, 1),
(316, 1, 17, 10, 'Swamp', 'swamp', 3, 1),
(317, 1, 17, 11, 'Swamp', 'swamp', 2, 1),
(318, 1, 17, 12, 'Swamp', 'swamp', 2, 1),
(319, 1, 17, 13, 'Swamp', 'swamp', 5, 1),
(320, 1, 17, 14, 'Swamp', 'swamp', 6, 1),
(321, 1, 17, 15, 'Swamp', 'swamp', 6, 1),
(322, 1, 17, 16, 'Swamp', 'swamp', 3, 1),
(323, 1, 17, 17, 'Swamp', 'swamp', 9, 1),
(324, 1, 18, 0, 'Swamp', 'swamp', 1, 1),
(325, 1, 18, 1, 'Swamp', 'swamp', 6, 1),
(326, 1, 18, 2, 'Swamp', 'swamp', 6, 1),
(327, 1, 18, 3, 'Swamp', 'swamp', 0, 1),
(328, 1, 18, 4, 'Swamp', 'swamp', 9, 1),
(329, 1, 18, 5, 'Swamp', 'swamp', 8, 1),
(330, 1, 18, 6, 'Swamp', 'swamp', 4, 1),
(331, 1, 18, 7, 'Swamp', 'swamp', 5, 1),
(332, 1, 18, 8, 'Swamp', 'swamp', 1, 1),
(333, 1, 18, 9, 'Swamp', 'swamp', 7, 1),
(334, 1, 18, 10, 'Swamp', 'swamp', 4, 1),
(335, 1, 18, 11, 'Swamp', 'swamp', 2, 1),
(336, 1, 18, 12, 'Swamp', 'swamp', 9, 1),
(337, 1, 18, 13, 'Swamp', 'swamp', 7, 1),
(338, 1, 18, 14, 'Swamp', 'swamp', 7, 1),
(339, 1, 18, 15, 'Swamp', 'swamp', 7, 1),
(340, 1, 18, 16, 'Swamp', 'swamp', 9, 1),
(341, 1, 18, 17, 'Swamp', 'swamp', 9, 1),
(342, 1, 19, 0, 'Swamp', 'swamp', 3, 1),
(343, 1, 19, 1, 'Swamp', 'swamp', 0, 1),
(344, 1, 19, 2, 'Swamp', 'swamp', 8, 1),
(345, 1, 19, 3, 'Swamp', 'swamp', 1, 1),
(346, 1, 19, 4, 'Swamp', 'swamp', 2, 1),
(347, 1, 19, 5, 'Swamp', 'swamp', 5, 1),
(348, 1, 19, 6, 'Swamp', 'swamp', 8, 1),
(349, 1, 19, 7, 'Swamp', 'swamp', 8, 1),
(350, 1, 19, 8, 'Swamp', 'swamp', 5, 1),
(351, 1, 19, 9, 'Swamp', 'swamp', 0, 1),
(352, 1, 19, 10, 'Swamp', 'swamp', 4, 1),
(353, 1, 19, 11, 'Swamp', 'swamp', 6, 1),
(354, 1, 19, 12, 'Swamp', 'swamp', 3, 1),
(355, 1, 19, 13, 'Swamp', 'swamp', 2, 1),
(356, 1, 19, 14, 'Swamp', 'swamp', 6, 1),
(357, 1, 19, 15, 'Swamp', 'swamp', 4, 1),
(358, 1, 19, 16, 'Swamp', 'swamp', 5, 1),
(359, 1, 19, 17, 'Swamp', 'swamp', 0, 1),
(360, 1, 20, 0, 'Swamp', 'swamp', 6, 1),
(361, 1, 20, 1, 'Swamp', 'swamp', 2, 1),
(362, 1, 20, 2, 'Swamp', 'swamp', 4, 1),
(363, 1, 20, 3, 'Swamp', 'swamp', 5, 1),
(364, 1, 20, 4, 'Swamp', 'swamp', 7, 1),
(365, 1, 20, 5, 'Swamp', 'swamp', 8, 1),
(366, 1, 20, 6, 'Swamp', 'swamp', 7, 1),
(367, 1, 20, 7, 'Swamp', 'swamp', 9, 1),
(368, 1, 20, 8, 'Swamp', 'swamp', 0, 1),
(369, 1, 20, 9, 'Swamp', 'swamp', 4, 1),
(370, 1, 20, 10, 'Swamp', 'swamp', 7, 1),
(371, 1, 20, 11, 'Swamp', 'swamp', 9, 1),
(372, 1, 20, 12, 'Swamp', 'swamp', 7, 0),
(373, 1, 20, 13, 'Swamp', 'swamp', 6, 0),
(374, 1, 20, 14, 'Swamp', 'swamp', 2, 0),
(375, 1, 20, 15, 'Swamp', 'swamp', 2, 0),
(376, 1, 20, 16, 'Swamp', 'swamp', 6, 1),
(377, 1, 20, 17, 'Swamp', 'swamp', 4, 1),
(378, 1, 21, 0, 'Swamp', 'swamp', 4, 1),
(379, 1, 21, 1, 'Swamp', 'swamp', 9, 1),
(380, 1, 21, 2, 'Swamp', 'swamp', 5, 1),
(381, 1, 21, 3, 'Swamp', 'swamp', 9, 1),
(382, 1, 21, 4, 'Swamp', 'swamp', 4, 1),
(383, 1, 21, 5, 'Swamp', 'swamp', 0, 1),
(384, 1, 21, 6, 'Swamp', 'swamp', 7, 1),
(385, 1, 21, 7, 'Swamp', 'swamp', 2, 1),
(386, 1, 21, 8, 'Swamp', 'swamp', 6, 1),
(387, 1, 21, 9, 'Swamp', 'swamp', 1, 1),
(388, 1, 21, 10, 'Swamp', 'swamp', 7, 1),
(389, 1, 21, 11, 'Swamp', 'swamp', 3, 1),
(390, 1, 21, 12, 'Swamp', 'swamp', 2, 0),
(391, 1, 21, 13, 'Swamp', 'swamp', 1, 0),
(392, 1, 21, 14, 'Swamp', 'swamp', 2, 0),
(393, 1, 21, 15, 'Swamp', 'swamp', 1, 0),
(394, 1, 21, 16, 'Swamp', 'swamp', 6, 1),
(395, 1, 21, 17, 'Swamp', 'swamp', 3, 1),
(396, 1, 22, 0, 'Swamp', 'swamp', 2, 1),
(397, 1, 22, 1, 'Swamp', 'swamp', 3, 1),
(398, 1, 22, 2, 'Swamp', 'swamp', 7, 1),
(399, 1, 22, 3, 'Swamp', 'swamp', 4, 1),
(400, 1, 22, 4, 'Swamp', 'swamp', 0, 1),
(401, 1, 22, 5, 'Swamp', 'swamp', 7, 1),
(402, 1, 22, 6, 'Swamp', 'swamp', 8, 1),
(403, 1, 22, 7, 'Swamp', 'swamp', 8, 1),
(404, 1, 22, 8, 'Swamp', 'swamp', 6, 1),
(405, 1, 22, 9, 'Swamp', 'swamp', 6, 1),
(406, 1, 22, 10, 'Swamp', 'swamp', 1, 1),
(407, 1, 22, 11, 'Swamp', 'swamp', 4, 1),
(408, 1, 22, 12, 'Swamp', 'swamp', 9, 0),
(409, 1, 22, 13, 'Swamp', 'swamp', 6, 0),
(410, 1, 22, 14, 'Swamp', 'swamp', 9, 0),
(411, 1, 22, 15, 'Swamp', 'swamp', 9, 1),
(412, 1, 22, 16, 'Swamp', 'swamp', 2, 1),
(413, 1, 22, 17, 'Swamp', 'swamp', 0, 1),
(414, 1, 23, 0, 'Swamp', 'swamp', 1, 1),
(415, 1, 23, 1, 'Swamp', 'swamp', 8, 1),
(416, 1, 23, 2, 'Swamp', 'swamp', 4, 1),
(417, 1, 23, 3, 'Swamp', 'swamp', 1, 1),
(418, 1, 23, 4, 'Swamp', 'swamp', 6, 1),
(419, 1, 23, 5, 'Swamp', 'swamp', 9, 1),
(420, 1, 23, 6, 'Swamp', 'swamp', 4, 1),
(421, 1, 23, 7, 'Swamp', 'swamp', 6, 1),
(422, 1, 23, 8, 'Swamp', 'swamp', 7, 1),
(423, 1, 23, 9, 'Swamp', 'swamp', 4, 1),
(424, 1, 23, 10, 'Swamp', 'swamp', 6, 1),
(425, 1, 23, 11, 'Swamp', 'swamp', 7, 1),
(426, 1, 23, 12, 'Swamp', 'swamp', 4, 0),
(427, 1, 23, 13, 'Swamp', 'swamp', 4, 0),
(428, 1, 23, 14, 'Swamp', 'swamp', 1, 0),
(429, 1, 23, 15, 'Swamp', 'swamp', 8, 0),
(430, 1, 23, 16, 'Swamp', 'swamp', 8, 1),
(431, 1, 23, 17, 'Swamp', 'swamp', 8, 1),
(432, 1, 24, 0, 'Swamp', 'swamp', 4, 1),
(433, 1, 24, 1, 'Swamp', 'swamp', 3, 1),
(434, 1, 24, 2, 'Swamp', 'swamp', 8, 1),
(435, 1, 24, 3, 'Swamp', 'swamp', 7, 1),
(436, 1, 24, 4, 'Swamp', 'swamp', 7, 1),
(437, 1, 24, 5, 'Swamp', 'swamp', 8, 1),
(438, 1, 24, 6, 'Swamp', 'swamp', 2, 1),
(439, 1, 24, 7, 'Swamp', 'swamp', 2, 1),
(440, 1, 24, 8, 'Swamp', 'swamp', 9, 1),
(441, 1, 24, 9, 'Swamp', 'swamp', 7, 1),
(442, 1, 24, 10, 'Swamp', 'swamp', 8, 1),
(443, 1, 24, 11, 'Swamp', 'swamp', 5, 1),
(444, 1, 24, 12, 'Swamp', 'swamp', 5, 0),
(445, 1, 24, 13, 'Swamp', 'swamp', 9, 0),
(446, 1, 24, 14, 'Swamp', 'swamp', 2, 0),
(447, 1, 24, 15, 'Swamp', 'swamp', 1, 0),
(448, 1, 24, 16, 'Swamp', 'swamp', 4, 1),
(449, 1, 24, 17, 'Swamp', 'swamp', 0, 1),
(468, 1, 0, 0, 'Desert', 'sand', 3, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `town`
--

CREATE TABLE `town` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `owner` int(11) DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `town`
--

INSERT INTO `town` (`id`, `game_id`, `x`, `y`, `type`, `owner`, `name`, `description`) VALUES
(2, 1, 22, 15, 1, NULL, NULL, NULL),
(1, 1, 11, 11, 2, NULL, NULL, NULL),
(12, 1, 5, 5, 0, NULL, NULL, NULL);

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
(2, 'Петя', 'petya', '321', '');

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
(1, 1, 1, 'red', 0, 0, 'world'),
(2, 2, 1, 'blue', 1, 1, 'world');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=469;
--
-- AUTO_INCREMENT для таблицы `town`
--
ALTER TABLE `town`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
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
