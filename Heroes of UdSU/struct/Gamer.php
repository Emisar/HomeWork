<?php

require_once 'BaseElement.php';
require_once 'Resources.php';

class Gamer extends BaseElement {
    public $color;       // цвет
    public $order;       // очередность хода
    public $resources;   // ресурсы
    public $isActive;

    public function __construct($options) {
        parent::__construct($options);
        $this->resources = new Resources($options->resources);
    }
}