<?php

require_once 'BaseElement.php';

class Unit extends BaseElement {

    public $attackType;  // тип атаки (ближняя/дистанционная)

    public function __construct($options) {
        parent::__construct($options);
        $this->attackType = $options->attackType;
    }
}