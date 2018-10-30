<?php

require_once 'struct\Struct.php';
require_once 'logic\Logic.php';
require_once 'input\Input.php';

class Game {
    private $struct;
    private $logic;
    private $input;

    public function __construct($db) {

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
        $params->map = $db->getMap();

        $this->struct = new Struct($params);
        $this->logic  = new Logic($this->struct);
        $this->input  = new Input($this->logic);
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