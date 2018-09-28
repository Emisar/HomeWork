<?php

error_reporting(1);

require_once 'Game.php';

$options = new stdClass();
$options->gamers = [
    (object) [id => 1, name => 'Vasya', order => 0],
    (object) [id => 2, name => 'Petya', order => 1]
];

$game = new Game($options);

//print_r($game);