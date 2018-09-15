<?php

require_once 'Resources.php';

class Gamer {

    /* Свойства игрока */
    protected $id;          // уникальный номер
    protected $name;        // имя
    protected $color;       // цвет
    protected $order;       // очередность хода
    protected $resources;   // ресурсы

    /* Конструктор класса */
    public function __construct() {
        $this->resources = new Resources(0, 0, 0);
    }
}