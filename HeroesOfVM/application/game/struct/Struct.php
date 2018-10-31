<?php

require_once 'Gamer.php';
require_once 'Unit.php';
require_once 'Tile.php';
require_once 'Item.php';
require_once 'Artifact.php';
require_once 'MapBuilding.php';
require_once 'Town.php';
require_once 'Hero.php';
require_once 'Properties.php';

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
        // список городов
        $this->towns = [];
        foreach ($options->towns as $value) {
            $this->towns[] = new Town($value);
        }
        // список зданий на карте
        $this->buildings = [];
        foreach ($options->buildings as $value) {
            $this->buildings[] = new MapBuilding($value);
        }
        // список ресурсов на карте
        $this->items = [];
        foreach ($options->items as $value) {
            $this->items[] = new Item($value);
        }
        // список артефактов на карте
        $this->artifacts = [];
        foreach ($options->artifacts as $value) {
            $this->artifacts[] = new Artifact($value);
        }
        // карта
        /*$this->map = [];
        foreach ($options->map as $line) {
            $this->map[] = [];
            foreach ($line as $tile) {
                $this->map[count($this->map) - 1][] = new Tile($tile);
            }
        }*/
    }
}