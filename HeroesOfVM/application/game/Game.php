<?php

require_once 'struct\Struct.php';
require_once 'logic\Logic.php';
require_once 'input\Input.php';

class Game {
    private $struct;
    private $logic;
    private $input;

    private $db;

    public function __construct($db) {
        $this->db = $db;
        /*
              $params->heroes = [
                    (object) array ('id'=> 1, 'backpack' => [new Artifact((object)array('id' => 1))], 'army' => [new Unit((object)array('id' => 2))]),
                    (object) array ('id' => 2, 'backpack' => [])
                ];
                $params->gamers = [
                    (object) array ('id' => 1, 'order' => 1),
                    (object) array ('id' => 2, 'order' => 0)
                ];
                $params->towns = [
                    (object) array ('id' => 3, 'army' => [])
                ];*/

        $params = new stdClass();
        //$params->map = $this->db->getMap();

        $this->struct = new Struct();
        $this->logic  = new Logic($this->struct);
        $this->input  = new Input($this->logic);
    }

    public function init($gameId) {
        if ($gameId) {
            $game = $this->db->getGame($gameId);
            if ($game) {
                // заполнить игроков
                $gamers = $this->db->getGamers($gameId);
                $this->struct->fillGamers($gamers);
                // заполнить карту
                $map = $this->db->getMap($game->map_id);
                $this->struct->fillMap($map);
                // заполнить героев
                $heroes = $this->db->getHeroes($gameId);
                $defaultProperties = $this->db->getHeroesDefaultProperties($heroes);
                $this->struct->fillHeroes($heroes, $defaultProperties);
                // заполнить артефакты
                $artifacts = $this->db->getArtifacts($gameId);
                $this->struct->fillArtifacts($artifacts);
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
                //$this->db->updateArtifacts($gameId, $this->struct->artifacts);
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