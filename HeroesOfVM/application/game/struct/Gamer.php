<?php

require_once 'BaseElement.php';
require_once 'Resources.php';

class Gamer extends BaseElement {
    public $color;       // цвет
    public $order;       // очередность хода
    public $resources;   // ресурсы
    public $isActive;    // ходит ли сейчас

    public function __construct($options, $resources) {
        parent::__construct($options);
        $this->resources = new Resources($resources);
        $this->color = $options->color;
        $this->order = $options->order;
        $this->isActive = $options->isActive;
    }
}