-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
<<<<<<< HEAD
-- Время создания: Ноя 07 2018 г., 07:51
=======
-- Время создания: Ноя 03 2018 г., 12:39
>>>>>>> 902057eec6ed81af815787194765c3b7346308b6
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
<<<<<<< HEAD
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

=======
  `default_properties` varchar(45) DEFAULT NULL,
  `army` varchar(45) DEFAULT NULL,
  `inventory` varchar(45) DEFAULT NULL,
  `backpack` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

>>>>>>> 902057eec6ed81af815787194765c3b7346308b6
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
(1, 3, 3);

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
(4, 1, 1, 0, 'трава', 'grass', 1, 1),
(5, 1, 2, 0, 'трава', 'grass', 1, 1),
(6, 1, 0, 1, 'трава', 'grass', 1, 1),
(7, 1, 1, 1, 'вода', 'water', 2, 1),
(8, 1, 2, 1, 'трава', 'grass', 1, 1),
(9, 1, 0, 2, 'трава', 'grass', 1, 1),
(10, 1, 1, 2, 'вода', 'water', 2, 1),
(11, 1, 2, 2, 'трава', 'grass', 1, 1);

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
<<<<<<< HEAD
(1, 'Вася', 'vasya', '123', '702f5c792fc825f4081811c3079abdc2'),
(2, 'Петя', 'petya', '321', 'ee8af6b5653cd628174012ba156db7e7');
=======
(1, 'Вася', 'vasya', '123', '067b6b39f878556f57e024a1e8014e62'),
(2, 'Петя', 'petya', '321', '');
>>>>>>> 902057eec6ed81af815787194765c3b7346308b6

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
<<<<<<< HEAD
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);
=======
  ADD PRIMARY KEY (`id`,`game_id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `game_id_UNIQUE` (`game_id`);
>>>>>>> 902057eec6ed81af815787194765c3b7346308b6

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
<<<<<<< HEAD
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
>>>>>>> 902057eec6ed81af815787194765c3b7346308b6

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
<<<<<<< HEAD
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
>>>>>>> 902057eec6ed81af815787194765c3b7346308b6
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
