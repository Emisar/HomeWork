<?php

require_once 'BaseElement.php';

class Building extends BaseElement {
    public $resources;

    public function __construct($options) {
        parent::__construct($options);
        $this->resource = new Resources($options->resources);
    }
}