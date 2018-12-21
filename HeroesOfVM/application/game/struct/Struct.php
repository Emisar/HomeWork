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
require_once 'Battle.php';

class Struct {
    public $gamers; // список игроков в игре
    public $map; // карта
    public $items; // список предметов на карте
    public $artifacts; // список артефактов на карте
    public $armies; // нейтральные армии
    public $towns;
    public $buildings;
    public $heroes;
    public $battleMaps;
    public $battles;

    public $propertiesHero;
    public $backpackHero;



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

    public function fillBattleMaps($maps) {
        $this->battleMaps = [];
        for ($k = 0; $k < count($maps); $k++) {
            $this->battleMaps[$k] = [];
            for ($i = 0; $i < count($maps[$k]); $i++) {
                $this->battleMaps[$k][$i] = [];
                for ($j = 0; $j < count($maps[$k][$i]); $j++) {
                    $this->battleMaps[$k][$i][$j] = new Tile($maps[$k][$i][$j]);
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

    public function fillHeroes($heroes, $defaultProperties, $inventoryes, $artifacts) {
        // список героев
        $this->heroes = [];
        $this->artifacts = $artifacts;
        foreach ($heroes as $value) {
            $inventory = (object)(['head' => null, 'body' => null, 'feet' => null, 'gloves' => null, 'rightHand' => null, 'leftHand' => null, 'cloak' => null, 'neck' => null, 'ringOne' => null, 'ringTwo' => null]);
            $properties = (object)array();
            $backpack = array();
            foreach ($defaultProperties as $default) {
                if ($default->id == $value->id) {
                    $properties = $default;
                    break;
                }
            }
            foreach ($this->artifacts as $artifact) {
                if ($artifact->owner == $value->id && $artifact->inBackpack == 1) {
                    $backpack[] = $artifact;
                    $artifact->x = -1;
                    $artifact->y = -1;
                }
            }
            foreach ($inventoryes as $inv) {
                if ($inv->hero_id == $value->id) {
                    foreach ($this->artifacts as $artifact) {
                        if ($inv->{$artifact->clothesType} == $artifact->id) {
                            $inventory->{$artifact->clothesType} = $artifact;
                        }
                    }
                }
            }
            $this->heroes[] = new Hero($value, $properties, $inventory, $backpack);
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

    public function fillMapBuildings($mapBuildings, $mapBuildingsResources) {
        // список зданий
        $this->buildings = [];
        foreach ($mapBuildings as $value) {
            foreach ($mapBuildingsResources as $resources) {
                if ($value->id == $resources->id) {
                    $this->buildings[] = new MapBuilding($value, $resources);
                    // изменить проходимость на ноль
                    break;
                }
            }
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