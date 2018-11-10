-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 07 2018 г., 07:51
-- Версия сервера: 5.6.38
-- Версия PHP: 7.2.0

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
-- Структура таблицы `Hero`
--

CREATE TABLE `Hero` (
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
-- Дамп данных таблицы `Hero`
--

INSERT INTO `Hero` (`id`, `game_id`, `user_id`, `x`, `y`, `type`, `owner`, `name`, `description`) VALUES
(1, 1, 1, 2, 1, 0, 1, 'супер герой', 'Это супер герой');

-- --------------------------------------------------------

--
-- Структура таблицы `map`
--

CREATE TABLE `map` (
  `id` int(11) NOT NULL,
  `size_x` int(11) NOT NULL,
  `sixe_y` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `map`
--

INSERT INTO `map` (`id`, `size_x`, `sixe_y`) VALUES
(1, 8, 8);

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
(1, 1, 0, 0, 'трава', 'grass', 1, 1),
(2, 1, 0, 1, 'трава', 'grass', 1, 1),
(3, 1, 0, 2, 'трава', 'grass', 1, 1),
(4, 1, 0, 3, 'трава', 'grass', 1, 1),
(5, 1, 0, 4, 'трава', 'grass', 1, 1),
(6, 1, 0, 5, 'трава', 'grass', 1, 1),
(7, 1, 0, 6, 'трава', 'grass', 1, 1),
(8, 1, 0, 7, 'трава', 'grass', 1, 1),
(9, 1, 0, 8, 'трава', 'grass', 1, 1),
(10, 1, 1, 1, 'трава', 'grass', 1, 1),
(11, 1, 1, 2, 'трава', 'grass', 1, 1),
(12, 1, 1, 3, 'трава', 'grass', 1, 1),
(13, 1, 1, 4, 'трава', 'grass', 1, 1),
(14, 1, 1, 5, 'трава', 'grass', 1, 1),
(15, 1, 1, 6, 'трава', 'grass', 1, 1),
(16, 1, 1, 7, 'трава', 'grass', 1, 1),
(17, 1, 1, 8, 'трава', 'grass', 1, 1),
(18, 1, 2, 1, 'трава', 'grass', 1, 1),
(19, 1, 2, 2, 'трава', 'grass', 1, 1),
(20, 1, 2, 3, 'трава', 'grass', 1, 1),
(21, 1, 2, 4, 'трава', 'grass', 1, 1),
(22, 1, 2, 5, 'трава', 'grass', 1, 1),
(23, 1, 2, 6, 'трава', 'grass', 1, 1),
(25, 1, 2, 7, 'трава', 'grass', 1, 1),
(26, 1, 2, 8, 'трава', 'grass', 1, 1),
(28, 1, 3, 1, 'трава', 'grass', 1, 1),
(29, 1, 3, 2, 'трава', 'grass', 1, 1),
(30, 1, 3, 3, 'трава', 'grass', 1, 1),
(31, 1, 3, 4, 'трава', 'grass', 1, 1),
(32, 1, 3, 5, 'трава', 'grass', 1, 1),
(33, 1, 3, 6, 'трава', 'grass', 1, 1),
(34, 1, 3, 7, 'трава', 'grass', 1, 1),
(35, 1, 3, 8, 'трава', 'grass', 1, 1),
(36, 1, 4, 1, 'трава', 'grass', 1, 1),
(37, 1, 4, 2, 'трава', 'grass', 1, 1),
(38, 1, 4, 3, 'трава', 'grass', 1, 1),
(39, 1, 4, 4, 'трава', 'grass', 1, 1),
(40, 1, 4, 5, 'трава', 'grass', 1, 1),
(41, 1, 4, 6, 'трава', 'grass', 1, 1),
(42, 1, 4, 7, 'трава', 'grass', 1, 1),
(43, 1, 4, 8, 'трава', 'grass', 1, 1),
(44, 1, 5, 1, 'трава', 'grass', 1, 1),
(45, 1, 5, 2, 'трава', 'grass', 1, 1),
(46, 1, 5, 3, 'трава', 'grass', 1, 1),
(47, 1, 5, 4, 'трава', 'grass', 1, 1),
(48, 1, 5, 5, 'трава', 'grass', 1, 1),
(49, 1, 5, 6, 'трава', 'grass', 1, 1),
(50, 1, 5, 7, 'трава', 'grass', 1, 1),
(51, 1, 5, 8, 'трава', 'grass', 1, 1),
(52, 1, 6, 1, 'трава', 'grass', 1, 1),
(53, 1, 6, 2, 'трава', 'grass', 1, 1),
(54, 1, 6, 3, 'трава', 'grass', 1, 1),
(55, 1, 6, 4, 'трава', 'grass', 1, 1),
(56, 1, 6, 5, 'трава', 'grass', 1, 1),
(57, 1, 6, 6, 'трава', 'grass', 1, 1),
(58, 1, 6, 7, 'трава', 'grass', 1, 1),
(59, 1, 6, 8, 'трава', 'grass', 1, 1),
(60, 1, 7, 1, 'трава', 'grass', 1, 1),
(61, 1, 7, 2, 'трава', 'grass', 1, 1),
(62, 1, 7, 3, 'трава', 'grass', 1, 1),
(63, 1, 7, 4, 'трава', 'grass', 1, 1),
(64, 1, 7, 5, 'трава', 'grass', 1, 1),
(65, 1, 7, 6, 'трава', 'grass', 1, 1),
(66, 1, 7, 7, 'трава', 'grass', 1, 1),
(67, 1, 7, 8, 'трава', 'grass', 1, 1),
(68, 1, 8, 1, 'трава', 'grass', 1, 1),
(69, 1, 8, 2, 'вода', 'water', 2, 0),
(70, 1, 8, 3, 'трава', 'grass', 1, 1),
(71, 1, 8, 4, 'трава', 'grass', 1, 1),
(72, 1, 8, 5, 'трава', 'grass', 1, 1),
(73, 1, 8, 6, 'трава', 'grass', 1, 1),
(74, 1, 8, 7, 'трава', 'grass', 1, 1),
(75, 1, 8, 8, 'трава', 'grass', 1, 1),
(76, 1, 1, 0, 'трава', 'grass', 1, 1),
(77, 1, 2, 0, 'трава', 'grass', 1, 1),
(78, 1, 3, 0, 'трава', 'grass', 1, 1),
(79, 1, 4, 0, 'трава', 'grass', 1, 1),
(80, 1, 5, 0, 'трава', 'grass', 1, 1),
(81, 1, 6, 0, 'трава', 'grass', 1, 1),
(82, 1, 7, 0, 'трава', 'grass', 1, 1),
(83, 1, 8, 0, 'трава', 'grass', 1, 1);

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
(1, 'Вася', 'vasya', '123', '702f5c792fc825f4081811c3079abdc2'),
(2, 'Петя', 'petya', '321', 'ee8af6b5653cd628174012ba156db7e7');

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
(1, 1, 1, 'red', 0, 0),
(4, 2, 1, 'blue', 1, 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`,`map_id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `map_id_UNIQUE` (`map_id`);

--
-- Индексы таблицы `Hero`
--
ALTER TABLE `Hero`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Индексы таблицы `map`
--
ALTER TABLE `map`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Индексы таблицы `tile`
--
ALTER TABLE `tile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

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
-- AUTO_INCREMENT для таблицы `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `Hero`
--
ALTER TABLE `Hero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `map`
--
ALTER TABLE `map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `tile`
--
ALTER TABLE `tile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users_games`
--
ALTER TABLE `users_games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
