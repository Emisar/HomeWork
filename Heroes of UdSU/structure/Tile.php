<?php

class Tile {
    public $id;
    public $name;
    public $type;
    public $sprite;
    public $passability; // проходимость тайла

    public function __construct($id = null, $type = null, $name = null, $sprite = null, $passability = null) {
        $this->id = $id;
        $this->type = $type;
        $this->name = $name;
        $this->sprite = $sprite;
        $this->passability = $passability;
    }
}