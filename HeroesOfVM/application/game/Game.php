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
                $this->struct->fillHeroes($heroes);
                // заполнить предметы
                // заполнить строения
                // заполнить города
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
                // записать предметы
                // записать строения
                // записать города
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