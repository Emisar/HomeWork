<?php

error_reporting(1);

require_once 'Game.php';

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

$commands = (object) $game->getCommands();
$game->executeCommand($commands->END_TURN, 1);

//print_r($game);