<?php

require_once 'BaseElement.php';
require_once 'Army.php';
require_once 'Building.php';

class Town extends BaseElement {
    public $army;
    public $buildings;

    public function __construct($options) {
        parent::__construct($options);
        $this->army = new Army();
        $this->buildings = [Building(), Building(), Building()];
    }
}