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
    $biomesTypes[0] = '==';
    $biomesTypes[1] = '++';
    $biomesTypes[2] = '--';
    $biomesTypes[3] = '**';
    $biomesTypes[4] = '//';
    $biomesTypes[5] = '00';
    $biomesTypes[6] = '11';
    $biomesTypes[7] = '33';
    $biomesTypes[8] = '44';
    $biomesTypes[9] = '55';
    $biomesTypes[10] = '66';
    $biomesTypes[11] = '77';
    $biomesTypes[12] = '88';
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
    $segmentHeight = (int)($height / count($segments)); //12
    for ($i = 0; $i < count($segments); $i++){ //0-4
        $segmentWidth = (int)($width / $segments[$i]); //сегмент[0] 26*12
        for ($j = 0; $j < $segments[$i]; $j++){
            $biomeId = rand(0, count($biomesTypes)-1);
            $biomes[] = new Biome(rand($segmentWidth*$j, $segmentWidth*($j+1)),
                rand($segmentHeight*$i, $segmentHeight*($i+1)),
                $biomesTypes[$biomeId]
            );
            if (!GENERATE_SAME_BIOMES) {
                unset($biomesTypes[$biomeId]);
                $biomesTypes = array_values($biomesTypes);
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
    
    
    return $map;
}
//$mapa = createMap(50, 50, 7);

/*Это просто вывод, чтобы посмотреть, че получилось
for ($i = 0; $i < 50; $i++) {
    for ($j = 0; $j < 50; $j++) {
        print_r($mapa[$i][$j]);
    }
    print_r('<br>');
}*/
