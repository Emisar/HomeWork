<?php

class Logic {

    private $struct;

    public function __construct($struct) {
        $this->struct = $struct;
    }

    public function endTurn($id) {
        $gamers = $this->struct->gamers;

    }
}