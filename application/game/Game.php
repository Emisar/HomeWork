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
                $resourcesGamers = $this->db->getGamersResources($gamers);
                $this->struct->fillGamers($gamers, $resourcesGamers);
                // заполнить карту
                $map = $this->db->getMap($game->map_id);
                $this->struct->fillMap($map);
                $battleMaps = $this->db->getBattleMaps($gameId);
                $this->struct->fillBattleMaps($battleMaps);
                // заполнить все артефакты
                $artifacts = $this->db->getArtifacts($gameId);
                // заполнить свойства артефактов
                $artifactsProperties = $this->db->getArtifactsProperties($artifacts);
                $this->struct->fillArtifacts($artifacts, $artifactsProperties);
                // заполнить инвентари
                $inventory = $this->db->getInventory($gameId);
                // заполнить героев
                $heroes = $this->db->getHeroes($gameId);
                $defaultProperties = $this->db->getHeroesDefaultProperties($heroes);
                $this->struct->fillHeroes($heroes, $defaultProperties, $inventory, $this->struct->artifacts);
                // заполнить строения
                $mapBuildings = $this->db->getMapBuildings($gameId);
                $mapBuildingsResources = $this->db->getMapBuildingsResources($mapBuildings);
                $this->struct->fillMapBuildings($mapBuildings, $mapBuildingsResources);
                // заполнить города
                $towns = $this->db->getTowns($gameId);
                $this->struct->fillTowns($towns);
                // заполнить предметы
                $items = $this->db->getItems($gameId);
                $resourcesItems = $this->db->getItemsResources($items);
                $this->struct->fillItems($items, $resourcesItems);
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
                $this->db->updateMapBuildings($this->struct->buildings);
                // записать города
                $this->db->updateTowns($this->struct->towns);
                // записать предметы
                $this->db->updateItems($this->struct->items);
                // удалить артефакты из карты
                //$this->db->deleteArtifacts($this->struct->artifacts);
                //удалить предметы из карты
                //$this->db->deleteItems($this->struct->items);
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