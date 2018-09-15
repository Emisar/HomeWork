<?php

require_once 'Gamer.php';
require_once 'Tile.php';
require_once 'Item.php';
require_once 'Artifact.php';
require_once 'Army.php';
/*  */
require_once 'Hero.php';
require_once 'Town.php';
require_once 'Buildings';

class Struct {
    public $gamers;     // список героев в игре
    public $map;        // карта
    public $items;      // список предметов на карте
    public $artifact;   // список артифактов на карте
    public $armies;     // нейтральные армии

    public function __construct() {
        // список игроков
        $this->gamers = [
            new Gamer(),
            new Gamer()
        ];
        // карта
        $this->map = [[new Tile()], []];
        // предметы (не артефакты)
        $this->items = new Item(1, wood, 5);
        // артефакт
        $this->artifact = new Artifact(1, 12, null, 'сапоги', '+1 к уму');
    }
}