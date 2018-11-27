<?php

require_once 'struct\Struct.php';
require_once 'logic\Logic.php';
require_once 'input\Input.php';
require_once 'MapGenerator.php';

class Game {
    private $struct;
    private $logic;
    private $input;

    //test
    private $gen;
    private $map;

    private $db;

    public function __construct($db) {
        $this->db = $db;
        $params = new stdClass();
        //$params->map = $this->db->getMap();

        $this->struct = new Struct();
        $this->logic  = new Logic($this->struct);
        $this->input  = new Input($this->logic);

        //test
        $this->gen = new MapGenerator();
        $this->map = $this->gen->createMap(25, 20, 2);
    }

    public function init($gameId) {
        if ($gameId) {
            $game = $this->db->getGame($gameId);
            if ($game) {
                // заполнить игроков
                $gamers = $this->db->getGamers($gameId);

                $resources = $this->db->getGamersResources($gamers);
                $this->struct->fillGamers($gamers, $resources);
                // заполнить карту
                //test
                //$map = $this->db->getMap($game->map_id);
                $this->struct->fillMap($this->map);
                // заполнить героев
                $heroes = $this->db->getHeroes($gameId);
                $defaultProperties = $this->db->getHeroesDefaultProperties($heroes);
                $this->struct->fillHeroes($heroes, $defaultProperties);
                $this->struct->fillHeroes($heroes, $defaultProperties);
                // заполнить все артефакты
                $artifacts = $this->db->getArtifacts($gameId);
                $this->struct->fillArtifacts($artifacts);
                // заполнить артефакты в сумках героев
                /*foreach ($this->struct->artifacts as $artifact) {
                    foreach ($this->struct->heroes as $hero) {
                        if ($artifact->owner == $hero->id) {
                            $hero->backpack[] = $artifact;
                            $artifact->x = null;
                            $artifact->y = null;
                        }
                    }
                }*/
                for ($j = 0; $j < count($this->struct->heroes); $j++) {
                    $this->struct->heroes[$j]->backpack = array();
                    for ($i = 0; $i < count($this->struct->artifacts); $i++) {
                        if ($this->struct->heroes[$j]->id == $this->struct->artifacts[$i]->owner) {
                            $this->struct->artifacts[$i]->x = -1;
                            $this->struct->artifacts[$i]->y = -1;
                            $this->struct->heroes[$j]->backpack[] = $this->struct->artifacts[$i];
                        }
                    }
                }
                // заполнить строения
                $mapBuildings = $this->db->getMapBuildings($gameId);
                $this->struct->fillMapBuildings($mapBuildings);
                // заполнить города
                $towns = $this->db->getTowns($gameId);
                $this->struct->fillTowns($towns);
                // заполнить предметы
                $items = $this->db->getItems($gameId);
                $this->struct->fillItems($items);
                return true;
            }
        }
        return false;
    }

    // записать измененные данные в БД
    public function updateData($gameId) {
        if ($gameId) {
            $game = $this->db->getGame($gameId);
            if ($game) {
                // записать игроков
                $this->db->updateGamers($gameId, $this->struct->gamers);
                // записать героев
                $this->db->updateHeroes($gameId, $this->struct->heroes);
                // записать артефакты
                $this->db->updateArtifacts($gameId, $this->struct->artifacts);
                // записать строения
                $this->db->updateMapBuildings($gameId, $this->struct->mapBuildings);
                // записать города
                $this->db->updateTowns($gameId, $this->struct->towns);
                // записать предметы
                $this->db->updateItems($gameId, $this->struct->items);
                return true;
            }
        }
        return false;
    }

    public function getCommands() {
        return (object) $this->input->getCommands();
    }

    public function executeCommand($name = null, $options = null) {
        return $this->input->executeCommand($name, $options);
    }

    public function getStruct() {
        return $this->struct;
    }
}