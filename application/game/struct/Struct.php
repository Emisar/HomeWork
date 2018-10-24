<?php

require_once 'Gamer.php';
require_once 'Tile.php';
require_once 'Item.php';
require_once 'Artifact.php';
require_once 'Army.php';
require_once 'Town.php';
require_once 'Hero.php';

class Struct {
    public $gamers; // список игроков в игре
    public $map; // карта
    public $items; // список предметов на карте
    public $artifacts; // список артефактов на карте
    public $armies; // нейтральные армии
    public $towns;
    public $buildings;
    public $heroes;

    public function __construct($options) {
        // список игроков
        $this->gamers = [];
        foreach ($options->gamers as $value) {
            $this->gamers[] = new Gamer($value);
        }
        // список героев
        $this->heroes = [];
        foreach ($options->heroes as $value) {
            $this->heroes[] = new Hero($value);
        }
        // карта
        $this->map = [];
        foreach ($options->map as $line) {
            $this->map[] = [];
            foreach ($line as $tile) {
                $this->map[count($this->map) - 1][] = new Tile($tile);
            }
        }
        /*
        // предметы (НЕ артефакты) на карте
        $this->items = [new Item(1, 'wood', 5)];*/
        $this->artifacts = [
            //new Artifact((object) [id => 1, name => 'Сапоги'])
        ];
    }
}