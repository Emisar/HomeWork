<?php

require_once 'struct\Struct.php';
require_once 'input\Input.php';
require_once 'logic\Logic.php';

class Game {
    private $struct;
    private $logic;
    private $input;

    public function __construct($options) {
        $this->struct = new Struct($options);
        $this->logic = new Logic($this->struct);

        $this->logic->loseGamer(1);
        //print_r($this->logic->endTurn(2));

    }
}