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
        if ($name /*&& isset($this->logic->{$name}) && is_callable($this->logic->{$name})*/) {
            return $this->logic->{$name}($options);
        }
        return false;
    }
}