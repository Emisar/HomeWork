<?php

require_once 'BaseElement.php';

class Artifact extends BaseElement {

    public $clothesType;
    public $inBackpack;

    public function __construct($options, $properties) {
        parent::__construct($options);
        $this->inBackpack = $options->in_backpack;
        $this->clothesType = $options->clothes_type;
        $this->properties = new Properties($properties);
    }
}