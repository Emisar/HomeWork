<?php

class Map {
    public $id;
    public $mode;
    public $tiles;

    public function __construct($options, $tiles) {
        $this->id = $options->id;
        $this->mode = $options->mode;
        $this->tiles = $tiles;
    }

}