<?php

class Biome {
    public $type;
    public $x;
    public $y;

    public function __construct($x, $y, $type) {
        $this->type = $type;
        $this->x = $x;
        $this->y = $y;
    }
}

function createMap($width, $height, $biomesCount){
    
    //Мапа
    $map = [];
    for ($i = 0; $i < $width-1; $i++){
        $map[$i] = [];
    }

    //Массив биомов
    $biomes = [];
    for ($i = 0; $i < $biomesCount-1; $i++){
        $biomes[$i] = new Biome();
    }

    $biomes[0]->type = 'desert';
    $biomes[0]->x = 5;
    $biomes[0]->y = 5;

    $biomes[1]->type = 'plains';
    $biomes[1]->x = 10;
    $biomes[1]->y = 5;

    $biomes[2]->type = 'tundra';
    $biomes[2]->x = 13;
    $biomes[2]->y = 18;

    $biomes[3]->type = 'swamp';
    $biomes[3]->x = 26;
    $biomes[3]->y = 26;

    for ($i = 0; $i < $width-1; $i++) {
        for ($j = 0; $j < $height-1; $j++) {
            $nearest = '.'; // value here doesn't matter
            $dist = 1000000; // select a big number

            // walk over each biomes
            for ($z = 0; $z < count($biomes); $z++) {

                // calculate the difference in x and y direction
                $xdiff = $biomes[$z]->x - $i;
                $ydiff = $biomes[$z]->y - $j;

                // calculate euclidean distance, sqrt is not needed
                // because we only compare and do not need the real value
                $cdist = $xdiff*$xdiff + $ydiff*$ydiff;

                // is the current distance smaller than the old distance?
                // if yes, take this biome
                if ($cdist < $dist) {
                    $nearest = $biomes[$z]->type;
                    $dist = $cdist;
                }
            }

            // set the map to the nearest biome       
            $map[$i][$j] = $nearest;

            // you can mark the biome point with this code
            // if (dist == 0) {
            //    map[i][j] = 'X';
            // }
        }
    }
}