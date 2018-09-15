<?php

require_once 'Stat.php';

class Unit {

    /* Свойства юнита */
    public $id;          // уникальный номер
    public $name;        // имя
    public $x;           // положение по оси X
    public $y;           // положение по оси Y
    public $owner;       // владелец
    public $attackType;  // тип атаки (ближняя/дистанционная)
    public $stats;       // характеристики

    /* Конструктор класса */
    public function __construct() {
        $this->stats = new Stat(0,0,0,0,0,0,0);
    }
}