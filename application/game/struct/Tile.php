<?php

class Tile {
    public $id;
    public $name;
    public $type;
    public $sprite;
    public $passability; // проходимость тайла

    public function __construct($options) {
        $this->id = $options->id;
        $this->type = $options->type;
        $this->name = $options->name;
        $this->sprite = $options->sprite;
        $this->passability = $options->passability;
    }
}