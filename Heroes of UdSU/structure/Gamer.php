<?php

require_once 'Resources.php';

class Gamer {
    /* Свойства игрока */
    public $id;          // уникальный номер
    public $name;        // имя
    public $color;       // цвет
    public $order;       // очередность хода
    public $resources;   // ресурсы
    /* Конструктор класса */
    public function __construct() {
        $this->resources = new Resources(0, 0, 0);
    }
}