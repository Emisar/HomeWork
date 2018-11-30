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

    public function __construct() {
    /*  // список городов
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
        }*/
        // карта
        /*$this->map = [];
        foreach ($options->map as $line) {
            $this->map[] = [];
            foreach ($line as $tile) {
                $this->map[count($this->map) - 1][] = new Tile($tile);
            }
        }*/
    }

    public function fillGamers($gamers, $resources) {
        // список игроков
        $this->gamers = [];
        foreach ($gamers as $value) {
            foreach ($resources as $resource) {
                if ($resource->id == $value->id) {

                    $this->gamers[] = new Gamer($value, $resource);

                    break;
                }
            }
        }
    }

    public function fillItems($items, $resources) {
        $this->items = [];
        foreach ($items as $value) {
            foreach ($resources as $resource) {
                if ($resource->id == $value->id) {

                    $this->items[] = new Item($value, $resource);

                    break;
                }
            }
        }
    }

    public function fillMap($map) {
        // карта
        $this->map = [];
        foreach ($map as $line) {
            $this->map[] = [];
            foreach ($line as $tile) {
                $this->map[count($this->map) - 1][] = new Tile($tile);
            }
        }
    }

    public function fillHeroes($heroes, $defaultProperties) {
        // список героев
        $this->heroes = [];
        foreach ($heroes as $value) {
            foreach ($defaultProperties as $default) {
                if ($default->id == $value->id) {
                    $this->heroes[] = new Hero($value, $default);
                    break;
                }
            }
        }
    }

    public function fillArtifacts($artifacts, $properties) {
        // список артефактов
        $this->artifacts = [];
        foreach ($artifacts as $value) {
            foreach ($properties as $properie) {
                if ($properie->id == $value->id) {
                    $this->artifacts[] = new Artifact($value, $properie);
                    break;
                }
            }
        }
    }

    public function fillMapBuildings($mapBuildings) {
        // список зданий
        $this->mapBuildings = [];
        foreach ($mapBuildings as $value) {
            $this->mapBuildings[] = new MapBuilding($value);
        }
    }

    public function fillTowns($towns) {
        // список городов
        $this->towns = [];
        foreach ($towns as $value) {
            $this->towns[] = new Town($value);
        }
    }


}