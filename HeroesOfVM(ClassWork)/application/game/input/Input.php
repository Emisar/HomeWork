<?php

require_once 'commands.php';

class Input {
    private $COMMAND;
    private $logic;

    public function __construct($logic) {
        $this->COMMAND = COMMAND;
        $this->logic = $logic;
    }

    public function getCommands() {
        return $this->COMMAND;
    }

    public function executeCommand($name = null, $options = null) {
        if ($name) {
            return $this->logic->{$name}($options);
        }
        return false;
    }
}