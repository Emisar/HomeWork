<?php

require_once 'Gamer.php';
require_once 'Tile.php';
require_once 'Item.php';
require_once 'Artifact.php';
require_once 'Army.php';
require_once 'Town.php';

class Struct {
    public $gamers; // список игроков в игре
    public $map; // карта
    public $items; // список предметов на карте
    public $artifacts; // список артефактов на карте
    public $armies; // нейтральные армии

    public function __construct($options) {
        // список игроков
        $this->gamers = [];
        foreach ($options->gamers as $value) {
            $this->gamers[] = new Gamer($value);
        }
        // карта
        /*$this->map = [
            [new Tile(1, 'grass', 'трава'), new Tile(1, 'grass', 'трава')],
            [new Tile(1, 'grass', 'трава'), new Tile(2, 'forest', 'лес')]
        ];
        // предметы (НЕ артефакты) на карте
        $this->items = [new Item(1, 'wood', 5)];
        $this->artifacts = [new Artifact(new stdClass())];*/
    }
}