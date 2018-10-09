<?php

require_once 'Unit.php';

class Army {
    public $units;

    public function __construct() {
        $this->units = [null, null, null, null, null, null, null];
    }
}