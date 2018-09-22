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
        $this->input = new Input();

        /*$commands = $this->input->getCommands();
        $commands->END_TURN = function ($params) {
            print_r($params);
        };

        $this->input->callCommand('END_TURN');*/
    }
}