<?php

require_once 'structure\Sturct.php';

class Game {
    private $struct;

    public function __construct() {
        $this->struct = new Struct();
    }
}