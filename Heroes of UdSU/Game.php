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

        $commands = $this->input->getCommands();
        $commands->END_TURN = function ($params) {
            $cnt = 0;
            foreach($this->struct->gamers as $gamer) {
                if ($gamer->isActive) {
                    $gamer->isActive = false;
                    if ($cnt = 7) {
                        $this->struct->gamers[0]->isActive = true;
                    } else {
                        $this->struct->gamers[$cnt + 1]->isActive = true;
                    }
                }
                ($cnt > 7) ? $cnt = 1 : $cnt++;
            }
        };

        $this->input->callCommand('END_TURN');
    }
}