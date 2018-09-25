<?php

require_once 'commands.php';

class Input {
    private $COMMAND;

    public function __construct() {
        $this->COMMAND = (object) COMMAND;
    }

    public function getCommands() {
        return $this->COMMAND;
    }

    public function setCommands($commands) {
        foreach ($commands as $key => $value) {
            $this->COMMAND->{$key} = $value;
        }
    }

    public function callCommand($name, $params = null) {
        if (isset($name) &&
            isset($this->COMMAND->{$name}) &&
            is_callable($this->COMMAND->{$name})) {
            $this->COMMAND->{$name}($params);
        }
    }
}