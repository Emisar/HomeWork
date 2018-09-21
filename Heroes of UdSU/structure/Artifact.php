<?php

require_once 'BaseElement.php';

class Artifact extends BaseElement {

    public function __construct($options) {
        parent::__construct($options);
        // удалить лишние свойства
        unset($this->owner);
    }
}