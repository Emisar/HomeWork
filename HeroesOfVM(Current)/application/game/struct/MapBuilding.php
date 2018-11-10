<?php

require_once 'BaseElement.php';
require_once 'Resources.php';

class MapBuilding extends BaseElement {
    public $resources;

    public function __construct($options) {
        parent::__construct($options);
        $this->resources = new Resources($options->resources);
    }
}