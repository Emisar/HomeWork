<?php

require_once 'BaseElement.php';

class Artifact extends BaseElement {

    public function __construct($options, $properties) {
        parent::__construct($options);
        $this->properties = new Properties($properties);
    }
}