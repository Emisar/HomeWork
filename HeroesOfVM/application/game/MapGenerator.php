<?php
require_once 'struct\Tile.php';
const GENERATE_SAME_BIOMES = false;
const GENERATE_SAME_TOWNS = false;
const TOWNS_TYPES_COUNT = 4;
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
	public $segmentWidth;
	public $segmentHeight;
	
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
    public $map; //Мапа
    public $biomes; //Массив биомов
    public $segments; //Разделение на сегменты
    public function __construct(){
		$this->map = []; //Мапа
		$this->biomes = []; //Массив биомов
		$this->segments = []; //Разделение на сегменты
        //Init map
        for ($i = 0; $i < $width-1; $i++){
            $this->map[$i] = [];
        }
    }
    public function generateTowns(){
        if (!$this->map){
            return null;
        }
        $count = TOWNS_TYPES_COUNT;
        $townTypes = [];
        $towns = [];
        for ($i = 0; $i < $count; $i++){
            $townTypes[$i] = $i;
        }
        // Спавним по городу на сегмент
        for ($i = 0; $i < count($this->segments); $i++){
            for ($j = 0; $j < $this->segments[$i]; $j++){
                $townId = rand(0, count($townTypes)-1);
                $x = rand($this->segmentWidth*$j, $this->segmentWidth*($j+1));
                $y = rand($this->segmentHeight*$i, $this->segmentHeight*($i+1));
				print_r($x);
				print_r($y);
                if ($this->map[$x][$y]->passability == 0){
                    $spawn = false;
                } else {
                    $spawn = true;
                }
                if ($spawn){
                    //Првоеряем тайлы вокруг входа в город на пересечение с другими городами
                    for ($k = $x-2; $k <= $x+2; $k++){
                        for ($p = $y-3; $p <= $y; $p++){
                            for ($t = 0; $t < count($towns)-1; $t++){
                                if (($towns[$t]->x-2 >= $k && $towns[$t]->x+2 <= $k) && ($towns[$t]->y-3 >= $p && $towns[$t]->y <= $p)){
                                    $spawn = false;
                                    break 3;
                                }
                            }
                        }
                    }
                    if ($spawn){
                        $towns[] = new Biome($x, $y, $townTypes[$townId]);
                    }
                    if (!GENERATE_SAME_TOWNS) {
                        unset($townTypes[$townId]);
                        $townTypes = array_values($townTypes);
                    }
                }
            }
        }
        return $towns;
    }
    public function createMap($width, $height, $biomesCount){
        global $BIOME_TYPES;
        //Виды биомов
        $biomeTypes = $BIOME_TYPES;
        $count = $biomesCount;
        $i = 0;
        while (true){
            if ($count==2 || $count==3 || $count ==1){
                $this->segments[$i] = $count;
                break;
            }
            $k = round(sqrt($count));
            $this->segments[$i] = $k;
            $count -= $k;
            $i++;
        }
        $this->segmentHeight = (int)($height / count($this->segments));
        for ($i = 0; $i < count($this->segments); $i++){
            $this->segmentWidth = (int)($width / $this->segments[$i]);
            for ($j = 0; $j < $this->segments[$i]; $j++){
                $biomeId = rand(0, count($biomeTypes)-1);
                $this->biomes[] = new Biome(rand($this->segmentWidth*$j, $this->segmentWidth*($j+1)),
                    rand($this->segmentHeight*$i, $this->segmentHeight*($i+1)),
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
                for ($z = 0; $z < count($this->biomes); $z++) {
                    // Вычисляем разность в аправлении x и y
                    $xdiff = $this->biomes[$z]->x - $i;
                    $ydiff = $this->biomes[$z]->y - $j;
                    // Вычисляем евклидово расстояние(корень не нужен),
                    // потому что мы проводим сравнение и реальное значение не требуется
                    $cdist = $xdiff*$xdiff + $ydiff*$ydiff;
                    // Новая дистанция меньше старой?
                    // Если да, берём этот биом
                    if ($cdist <= $dist) {
                        $nearest = $this->biomes[$z];
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
                $this->map[$i][$j] = new Tile($tileArgs);
                $tileArgs->id +=1;
            }
        }
		return $this->map;
    }
}