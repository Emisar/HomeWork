<?php

const GENERATE_SAME_BIOMES = false;

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
    $map = []; //80*50
    for ($i = 0; $i < $width-1; $i++){
        $map[$i] = [];
    }

    //Массив биомов
    $biomes = [];

    //Виды биомов
    $biomesTypes = [];
    $biomesTypes[0] = '=';
    $biomesTypes[1] = '+';
    $biomesTypes[2] = '-';
    $biomesTypes[3] = '*';
    $biomesTypes[4] = '/';
    $biomesTypes[5] = '0';
    $biomesTypes[6] = '1';
    $biomesTypes[7] = '3';
    $biomesTypes[8] = '4';
    $biomesTypes[9] = '5';
    $biomesTypes[10] = '6';
    $biomesTypes[11] = '7';
    $biomesTypes[12] = '8';

    //Разделение на сегменты
    $segments = [];
    $count = $biomesCount; //10
    $i = 0;
    while (true){
        $k = round(sqrt($count)); //3, 3, 2
        $segments[$i] = $k;
        $count -= $k; //7, 4, 2
        $i++; //1, 2, 3
        if ($count==2 || $count==3){
            $segments[$i] = $count;
            break;
        }
    }
    //Удаляем счётчики
    unset($i);
    unset($count);
    $segmentHeight = $height % count($segments); //12
    for ($i = 0; $i < count($segments)-1; $i++){ //0-4
        $segmentWidth = $width % $segments[$i]; //сегмент[0] 26*12
        for ($j = 0; $j < $segments[$i]-1; $j++){
            print_r($i);
            print_r($j);
            $biomeId = rand(0, 12);
            $biomes[] = new Biome(rand($segmentWidth*$j, $segmentWidth*($j+1)),
                rand($segmentHeight*$i, $segmentHeight*($i+1)),
                $biomesTypes[$biomeId]
            );
            if (!GENERATE_SAME_BIOMES) {
                unset($biomesTypes[$biomeId]);
                array_values($biomesTypes);
            }
        }
    }


    for ($i = 0; $i < $width; $i++) {
        for ($j = 0; $j < $height; $j++) {
            $nearest = '__';
            $dist = 65535; // Большое число

            // Проходимся по каждому биому
            for ($z = 0; $z < count($biomes); $z++) {

                // Вычисляем разность в аправлении x и y
                $xdiff = $biomes[$z]->x - $i;
                $ydiff = $biomes[$z]->y - $j;

                // Вычисляем евклидово расстояние(корень не нужен),
                // потому что мы проводим сравнение и реальное значение не требуется
                $cdist = $xdiff*$xdiff + $ydiff*$ydiff;

                // Новая дистанция меньше старой?
                // Если да, берём этот биом
                if ($cdist <= $dist) {
                    $nearest = $biomes[$z]->type;
                    $dist = $cdist;
                }
            }

            // Присваиваем тайлу тип биома
            $map[$i][$j] = $nearest;

        }
    }
    print_r($biomes);
    return $map;
}

$mapa = createMap(10, 10, 4);


//var_dump($mapa);

