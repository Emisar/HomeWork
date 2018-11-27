<?php

require_once 'struct\Tile.php';
const GENERATE_SAME_BIOMES = false;

/*const*/ $BIOME_TYPES =  [
    0 => new BiomeType('Plains', 'grass', 10),
    1 => new BiomeType('Dirt', 'dirt', 10),
    2 => new BiomeType('Lands', 'lands', 10),
    3 => new BiomeType('Lava', 'lava', 10),
    4 => new BiomeType('Rockiness', 'rough', 10),
    5 => new BiomeType('Desert', 'sand', 10),
    6 => new BiomeType('DarkDesert', 'darkSand', 6),
    7 => new BiomeType('Tundra', 'snow', 10),
    8 => new BiomeType('Swamp', 'swamp', 10),
    9 => new BiomeType('Sea', 'water', 10, 0)
];

class BiomeType {
    public $name;
    public $groundType;
    public $variants;
    public $passability;

    public function __construct($name, $ground, $variants, $pass = 1){
        $this->name = $name;
        $this->groundType = $ground;
        $this->variants = $variants;
        $this->passability = $pass;
    }
}

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

class MapGenerator {

    public function createMap($width, $height, $biomesCount){
        
        global $BIOME_TYPES;
        
        //Мапа
        $map = [];
        for ($i = 0; $i < $width-1; $i++){
            $map[$i] = [];
        }
        //Массив биомов
        $biomes = [];
        //Виды биомов
        $biomeTypes = $BIOME_TYPES;
        //Разделение на сегменты
        $segments = [];
        $count = $biomesCount;
        $i = 0;
        while (true){
            if ($count==2 || $count==3 || $count ==1){
                $segments[$i] = $count;
                break;
            }
            $k = round(sqrt($count));
            $segments[$i] = $k;
            $count -= $k;
            $i++;
        }
        unset($i);     //Удаляем счётчики
        unset($count);
        $segmentHeight = (int)($height / count($segments));
        for ($i = 0; $i < count($segments); $i++){
            $segmentWidth = (int)($width / $segments[$i]);
            for ($j = 0; $j < $segments[$i]; $j++){
                $biomeId = rand(0, count($biomeTypes)-1);
                $biomes[] = new Biome(rand($segmentWidth*$j, $segmentWidth*($j+1)),
                    rand($segmentHeight*$i, $segmentHeight*($i+1)),
                    $biomeTypes[$biomeId]->name
                );
                if (!GENERATE_SAME_BIOMES) {
                    unset($biomeTypes[$biomeId]);
                    $biomeTypes = array_values($biomeTypes);
                }
            }
        }
        $tileArgs = new stdClass();
        $tileArgs->id = 0;
        for ($i = 0; $i < $width; $i++) {
            for ($j = 0; $j < $height; $j++) {
                $nearest = '__';
                $dist = PHP_INT_MAX; // Большое число
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
                        $nearest = $biomes[$z];
                        $dist = $cdist;
                    }
                }

                $tileArgs->name = $nearest->type;
                foreach($BIOME_TYPES as $value){
                    if ($value->name == $nearest->type){
                        $tileArgs->type = $value->groundType;
                        $tileArgs->sprite = rand(0, $value->variants-1);
                        $tileArgs->passability = $value->passability;
                    }
                }
                $map[$i][$j] = new Tile($tileArgs);
                $tileArgs->id +=1;
            }
        }
        return $map;
    }
    
}