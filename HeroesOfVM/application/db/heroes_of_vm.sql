-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Окт 20 2018 г., 12:55
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
  `default_properties` varchar(45) DEFAULT NULL,
  `army` varchar(45) DEFAULT NULL,
  `inventory` varchar(45) DEFAULT NULL,
  `backpack` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `map`
--

CREATE TABLE `map` (
  `id` int(11) NOT NULL,
  `items` varchar(45) DEFAULT NULL,
  `units` varchar(45) DEFAULT NULL,
  `buildings` varchar(45) DEFAULT NULL,
  `size_x` int(11) NOT NULL,
  `sixe_y` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `map`
--

INSERT INTO `map` (`id`, `items`, `units`, `buildings`, `size_x`, `sixe_y`) VALUES
(1, 'null', 'null', 'null', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `tile`
--

CREATE TABLE `tile` (
  `id` int(11) NOT NULL,
  `map_id` varchar(45) NOT NULL,
  `x` varchar(45) DEFAULT NULL,
  `y` varchar(45) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `sprite` int(11) NOT NULL,
  `passability` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tile`
--

INSERT INTO `tile` (`id`, `map_id`, `x`, `y`, `name`, `type`, `sprite`, `passability`) VALUES
(1, '1', '0', '0', 'трава', 'grass', 1, 1);

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
(1, 'Вася', 'vasya', '123', NULL),
(2, 'Петя', 'petya', '321', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `users_games`
--

CREATE TABLE `users_games` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `color` varchar(45) DEFAULT NULL,
  `order` varchar(45) DEFAULT NULL,
  `is_active` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  ADD PRIMARY KEY (`id`,`game_id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `game_id_UNIQUE` (`game_id`);

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
  ADD PRIMARY KEY (`id`,`map_id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `map_id_UNIQUE` (`map_id`);

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
  ADD PRIMARY KEY (`id`,`user_id`,`game_id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  ADD UNIQUE KEY `game_id_UNIQUE` (`game_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `map`
--
ALTER TABLE `map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `tile`
--
ALTER TABLE `tile`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
