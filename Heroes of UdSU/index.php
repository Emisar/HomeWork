<?php

error_reporting(1);

require_once 'game\Game.php';

$options = new stdClass();
$options->gamers = [
    (object) [id => 1, name => 'Vasya'],
    (object) [id => 2, name => 'Petya']
];

$game = new Game($options);

print_r($game);