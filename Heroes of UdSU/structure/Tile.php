<?php

class Tile {
    public $id;
    public $name;
    public $type;
    public $sprite;
    public $passability;        // проходимость

    public function __construct($id, $name, $type, $sprite, $passability) {
        $this->id = $id;
        $this->name = $name;
        $this->type = $type;
        $this->sprite = $sprite;
        $this->passability = $passability;
    }
}