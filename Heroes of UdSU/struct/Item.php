<?php

require_once 'BaseElement.php';
require_once 'Resources.php';

// Предметы (НЕ артефакты!!!)
class Item extends BaseElement {
    public $resources;

    public function __construct($options) {
        parent::__construct($options);
        $this->resources = new Resources($options->resources);
    }
}