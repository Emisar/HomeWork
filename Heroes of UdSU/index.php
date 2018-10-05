<?php

error_reporting(1);
header('Content-Type: text/html; charset=utf-8');

require_once 'Game.php';

// Удобный вывод данных
function vardump($var) {
    echo '<pre>';
    var_dump($var);
    echo '</pre>';
  }

$options = new stdClass();
$options->gamers = [
    (object) [id => 1, name => 'Vasya', order => 0],
    (object) [id => 2, name => 'Petya', order => 1]
];
$options->heroes = [
    (object) [id => 1, name => 'Vasilitch', owner => 1],
    (object) [id => 2, name => 'Petrovitch', owner => 1]
];

$game = new Game($options);

//vardump($game);
