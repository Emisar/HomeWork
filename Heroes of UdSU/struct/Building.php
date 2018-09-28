<?php

require_once 'BaseElement.php';

class Building extends BaseElement {
    public $growType;
    public $growValue;

    public function __construct($options) {
        parent::__construct($options);
        $this->growType = $options->growType;
        $this->growValue = $options->growValue;
    }
}