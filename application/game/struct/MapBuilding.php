<?php

require_once 'BaseElement.php';
require_once 'Resources.php';

class MapBuilding extends BaseElement {
    public $resources;
    public $width; // ширина строения
    public $height; // высота строения

    public function __construct($options) {
        parent::__construct($options);
        $this->resources = new Resources($options->resources);
        $this->width  = $options->width;
        $this->height = $options->height;
    }
}