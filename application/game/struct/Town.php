<?php

require_once 'BaseElement.php';
require_once 'Army.php';
require_once 'Building.php';

class Town extends BaseElement {
    public $army;
    public $buildings;
    public $width; // ширина строения
    public $height; // высота строения

    public function __construct($options) {
        parent::__construct($options);
        $this->army = new Army();
        $this->buildings = $options->buildings;
        $this->width  = $options->width;
        $this->height = $options->height;
    }
}