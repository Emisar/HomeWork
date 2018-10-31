<?php

require_once 'Properties.php';

class BaseElement {
    public $id;          // уникальный номер
    public $name;        // имя
    public $type;        // тип
    public $x;           // положение по оси X
    public $y;           // положение по оси Y
    public $owner;       // владелец
    public $properties;  // характеристики
    public $description; // описание
    public $cost;

    public function __construct($options) {
        $this->id = $options->id;
        $this->x = $options->x;
        $this->y = $options->y;
        $this->type = $options->type;
        $this->owner = $options->owner;
        $this->name = $options->name;
        $this->cost = $options->cost;
        $this->description = $options->description;
        $this->properties = new Properties($options->properties);
    }
}