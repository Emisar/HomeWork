<?php

class Logic {


    private $MOVE_POINTS_LINE = 100;
    private $MOVE_POINTS_DIAG = 141;

    
    private $struct;

    public function __construct($struct) {
        $this->struct = $struct;
    }
    // дать элемент по id
    private function getElemById($arrName, $id) {
        if (isset($this->struct->{$arrName}) && $id) {
            $arr = $this->struct->{$arrName};
            foreach ($arr as $elem) {
                if ($elem && $elem->id == $id) {
                    return $elem;
                }
            }
        }
        return null;
    }
    // дать key элемента (1 уровневый поиск)
    private function getKeyElem($arrName, $whereSearch, $toSearch) {
        if (isset($this->struct->{$arrName})) {
            $arr = $this->struct->{$arrName};
            for ($i = 0; $i < count($arr); $i++) {
                if ($arr[$i]->{$whereSearch} == $toSearch) {
                    return $i;
                }
            }
        }
        return null;
    }
    // дать key элемента внутри объекта (2-х уровневый поиск)
    private function getKeyElemInObj($obj, $arrName, $whereSearch, $toSearch) {
        if (isset($obj->{$arrName}) &&  $toSearch) {
            $arr = $obj->{$arrName};
            for ($i = 0; $i < count($arr); $i++) {
                if ($arr[$i]->{$whereSearch} === $toSearch) {
                    return $i;
                }
            }
        }
        return null;
    }

    private function getGamer      ($id) { return $this->getElemById('gamers',    $id); }
    private function getHero       ($id) { return $this->getElemById('heroes',    $id); }
    private function getMapBuilding($id) { return $this->getElemById('buildings', $id); }
    private function getMapArtifact($id) { return $this->getElemById('artifacts', $id); }
    private function getMapItem    ($id) { return $this->getElemById('items',     $id); }

    // вернуть юнита из армии
    private function getUnit($from, $idUnit) {
        if ($from && $idUnit) {
            $army = $from->army;
            for ($i = 0; $i < count($army); $i++) {
                if ($army[$i]->id === $idUnit) {
                    return clone($army[$i]);
                }
            }
        }
        return null;
    }
    // удалить юнита из армии
    public function remUnit($from, $idUnit) {
        if ($from && $idUnit) {
            $army = $from->army;
            for ($i = 0; $i < count($army); $i++) {
                if ($army[$i]->id === $idUnit) {
                    $army[$i] = null;
                    $from->army = $army;
                    return true;
                }
            }
        }
        return false;
    }
    // вернуть предмет из рюкзака героя var: hero, idItem
    private function getArtifact($hero, $idArtifact) {
        if ($hero && $idArtifact) {
            $backpack = $hero->backpack;
            for ($i = 0; $i < count($backpack); $i++) {
                if ($backpack[$i]->id === $idArtifact) {
                    return clone($backpack[$i]);
                }
            }
        }
        return null;
    }
    // выкинуть предмет из сумки
    public function remArtifact($hero, $idArtifact) {
        if ($hero && $idArtifact) {
            $backpack = $hero->backpack;
            for ($i = 0; $i < count($backpack); $i++) {
                if ($backpack[$i]->id === $idArtifact) {
                    $backpack[$i] = null;
                    $hero->backpack = $backpack;
                    return true;
                }
            }
        }
        return false;
    }
    // изменить характеристики героя
    public function changeProperties($hero, $artifact, $sign) {
        if ($hero && $artifact) {
            foreach ($hero->properties as $keyHero => $valueHero) {
                foreach ($artifact->properties as $keyArt => $valueArt) {
                    if ($hero->properties->{$keyHero} && $artifact->properties->{$keyArt} && $hero->properties->{$keyHero} == $artifact->properties->{$keyArt}) {
                        $hero->properties->{$keyHero} = $valueHero + $valueArt * $sign;
                    }
                }
            }
            return $hero;
        }
        return null;
    }
    // задать владельца элемента
    public function setElemOwner($gamerOwner, $elemChild) {
        if ($gamerOwner && $elemChild) {
            $elemChild->owner = $gamerOwner->owner;
            return true;
        }
        return false;
    }

    /*
    // вернуть предмет из рюкзака героя var: hero, idItem
    private function getItemFromBackpack($hero, $idItem) {
        if ($hero && $idItem) {
            $backpack = $hero->backpack;
            $key = array_search($idItem, array_column($backpack, 'id'));
            return $backpack[$key];
        }
        return null;
    }

    // положить предмет в сумку
    public function addArtifactToBackpack($idHero, $artifact) {
        $hero = $this->getHero($idHero);
        if ($hero && $artifact) {
            $hero->backpack[] = $artifact;
            return true;
        }
        return false;
    }
    */

    // закончить ход игрока
    public function endTurn($options) {
        $id = intval($options->id);
        // получить текущего игрока
        $curGamer = $this->getGamer($id);
        if ($curGamer) {
            $order = intval($curGamer->order); // порядковый номер текущего
            // потушить всех игроков
            $gamers = $this->struct->gamers;
            foreach($gamers as $gamer) {
                $gamer->isActive = 0;
            }
            // выбрать следующего активного игрока
            $order = ($order < count($gamers) - 1) ? $order + 1 : 0;
            $key = $this->getKeyElem('gamers','order', $order);
            $gamers[$key]->isActive = 1;
            return true;
        }
        return false;
    }
    // проиграть игрока (ПОЧИНИТЬ)
    public function loseGamer($options) {
        $id = intval($options->id);
        $gamer = $this->getGamer($id);
        if ($gamer) {
            // завершить ход за этого игрока
            if ($gamer->isActive) {
                $this->endTurn($id);
            }
            // потушить строения
            $buildings = $this->struct->buildings;
            foreach ($buildings as $building) {
                if ($building->owner === $gamer->id) {
                    $building->owner = null;
                }
            }
            // удалить игрока
            $gamers = $this->struct->gamers;
            $key = $this->getKeyElem('gamers', 'id', $id);
            unset($gamers[$key]);
            $this->struct->gamers = $gamers;
            // пересчитать очередность хода
            $order = $gamer->order;
            foreach ($gamers as $temp) {
                if ($temp->order > $order) {
                    $temp->order--;
                }
            }
            return true;
        }
        return false;
    }

	// можно ли ходить
    public function isPassable($x, $y)
    {
        $map = $this->struct->map;
        if ($map[$x][$y]->passability) {
            return true;
        }
        return false;
    }
	
    // Передвинуть героя
    public function moveHero($options) {
		$map = $this->struct->map;
        $mapWidth = count($this->struct->map[0])-1;
        $mapHeight  = count($this->struct->map)-1;
        $id = intval($options->heroId);
        $direction = $options->direction;
        if ($id && $direction) {
            $hero = $this->getHero(intval($id));
            if ($hero) {
                switch ($direction) {
                    case 'RIGHT':
                        if ($hero->x+1 <= $mapWidth){
							if ($this->isPassable($hero->x+1, $hero->y)){
								$hero->x++;
								return true;
							}
                        } break;
                        
                    case 'LEFT':
                        if ($hero->x-1 >= 0){
							if ($this->isPassable($hero->x-1, $hero->y)){
								$hero->x--;
								return true;
							}
                        } break;
                        
                    case 'UP':
                        if ($hero->y-1 >= 0){
							if ($this->isPassable($hero->x, $hero->y-1)){
								$hero->y--;
								return true;
							}
                        } break;
                         
                    case 'DOWN':
                        if ($hero->y+1 <= $mapHeight){
							if ($this->isPassable($hero->x, $hero->y+1)){
								$hero->y++;
								return true;
							}
                        } break;
					case 'UP-RIGHT':
                        if ($hero->y-1 >= 0 && $hero->x+1 <= $mapWidth){
							if ($this->isPassable($hero->x+1, $hero->y-1)){
								$hero->x++;
								return true;
							}
                        } break;
                        
                    case 'UP-LEFT':
                        if ($hero->y-1 >= 0 && $hero->x-1 >= 0){
							if ($this->isPassable($hero->x-1, $hero->y-1)){
								$hero->x--;
								return true;
							}
                        } break;
                        
                    case 'DOWN-RIGHT':
                        if ($hero->y+1 <= $mapHeight && $hero->x+1 <= $mapWidth){
							if ($this->isPassable($hero->x+1, $hero->y+1)){
								$hero->y--;
								return true;
							}
                        } break;
                         
                    case 'DOWN-LEFT':
                        if ($hero->y+1 <= $mapHeight && $hero->x-1 >= 0){
							if ($this->isPassable($hero->x-1, $hero->y+1)){
								$hero->y++;
								return true;
							}
                        } break;
                }
            }
        }
        return false;
    }

    // передать предметы между героями
    public function passArtifact($options) {
        $idGive = intval($options->idGive);
        $idTake = intval($options->idTake);
        $idArtifact = intval($options->idArtifact);
        $position = intval($options->position) - 1;
        $heroGive = $this->getHero($idGive);
        $heroTake = $this->getHero($idTake);
        if ($heroGive && $heroTake) {
            $artifact = $this->getArtifact($heroGive, $idArtifact);
            if ($artifact) { // если слот пустой
                if (is_null($heroTake->backpack[$position])) {
                    $heroTake->backpack[$position] = $artifact;
                    $this->remArtifact($heroGive, $idArtifact);
                } else { // если слот занят, меняем местами
                    $takeArtifact = $heroTake->backpack[$position];
                    $key = $this->getKeyElemInObj($heroGive, 'backpack', 'id', $idArtifact);
                    $heroGive->backpack[$key] = $takeArtifact;
                    $heroTake->backpack[$position] = $artifact;
                }
                return true;
            }
        }
        return false;
    }
    // передача юнита                                                             (доделать количество)
    public function passUnit($options) {
        $idGive = intval($options->idGive);
        $idTake = intval($options->idTake);
        $idUnit = intval($options->idUnit);
        $amount = intval($options->amount);
        $typeGive = $options->typeGive;
        $typeTake = $options->typeTake;
        $position = intval($options->position) - 1;
        $give = $this->getElemById($typeGive, $idGive);
        $take = $this->getElemById($typeTake, $idTake);
        if ($give && $take) {
            $key = $this->getKeyElemInObj($give, 'army', 'id', $idUnit);
            $giveUnit = $this->getUnit($give, $idUnit);
            if ($giveUnit) {
                if (is_null($take->army[$position])) { // если слот пустой
                    $take->army[$position] = $giveUnit;
                    $take->army[$position]->amount = $amount;
                    $give->army[$key]->amount = $give->army[$key]->amount - $amount;
                    if ($give->army[$key]->amount == 0) {
                        $this->remUnit($give, $idUnit);
                    }
                } else { // если слот занят
                    if ($give->army[$key]->type == $take->army[$position]->type) { // если передаваемый юнит такой же как и принимающий
                        $take->army[$position]->amount = $take->army[$position]->amount + $amount;
                        $give->army[$key]->amount = $give->army[$key]->amount - $amount;
                        if ($give->army[$key]->amount == 0) {
                            $this->remUnit($give, $idUnit);
                        }
                    } else {
                        $copyTakeUnit = clone($take->army[$position]);
                        $give->army[$key] = $copyTakeUnit;
                        $take->army[$position] = $giveUnit;
                    }
                }
                return true;
            }
        }
        return false;
    }
    // захватить строение
    public function captureBuilding($options) {
        $idHero = intval($options->idHero);
        $idBuilding = intval($options->idBuilding);
        $hero = $this->getHero($idHero);
        $building = $this->getMapBuilding($idBuilding);
        if ($hero && $building) {
            $this->setElemOwner($hero, $building);
            return true;
        }
        return false;
    }
    // подобрать ресуры
    public function pickupItem($options) {
        $idHero = intval($options->idHero);
        $idItem = intval($options->idItem);
        $hero = $this->getHero($idHero);
        $item = $this->getMapItem($idItem);
        if ($hero && $item) {
            $gamer = $this->getGamer($hero->owner);
            $gamer->resources->gold += $item->resources->gold;
            $gamer->resources->wood += $item->resources->wood;
            $gamer->resources->ore += $item->resources->ore;
            //removeItemFromMap();
            return true;
        }
        return false;
    }
    // подобрать артефакт
    public function pickupArtifact($options) {
        $idHero = intval($options->idHero);
        $idArtifact = intval($options->idArtifact);
        $hero = $this->getHero($idHero);
        $artifact = $this->getMapArtifact($idArtifact);
        if ($hero && $artifact) {
            for ($i = 0; $i < count($hero->backpack); $i++) {
                if (is_null($hero->backpack[$i])) {
                    $hero->backpack[$i] = $artifact;
                    return true;
                }
            }
            $hero->backack[] = $artifact;
            //removeArtifactMap();
            return true;
        }
        return false;
    }
    // умереть героя
    public function dieHero($options) {
        $idHero = intval($options->idHero);
        if ($idHero) {
            $heroes = $this->struct->heroes;
            for ($i = 0; $i < count($heroes); $i++) {
                if ($heroes[$i]->id === $idHero) {
                    unset($heroes[$i]);
                    $this->struct->heroes = $heroes;
                    return true;
                }
            }
        }
        return false;
    }
    // надеть предмет
    public function equipArtifact($options) {
        $idArtifact = intval($options->idArtifact);
        $idHero = intval($options->idHero);
        if ($idArtifact && $idHero) {
            // инициализируем объекты
            $hero = $this->getHero($idHero);
            $artifact = $this->getArtifact($hero, $idArtifact);
            $equipedArtifact = clone($hero->inventory->{$artifact->type});
            // надеваем артефакт
            if (is_null($hero->inventory->{$artifact->type})) {     // если слот свободен
                $hero->inventory->{$artifact->type} = $artifact;
                $this->remArtifact($hero, $idArtifact);
            } else {        // если слот занят, то меняем предметы местами
                $key = $this->getKeyElemInObj($hero, 'backpack', 'id', $idArtifact);
                $hero->inventory->{$artifact->type} = $artifact;
                $this->remArtifact($hero, $idArtifact);
                $hero->backpack[$key] = $equipedArtifact;
            }

            $this->changeProperties($hero, $equipedArtifact, -1);
            $this->changeProperties($hero, $artifact, 1);
            return true;
        }
        return false;
    }
    // изменить армию героя
    public function changeArmy($options) {
        $idHero = intval($options->idHero);
        $idUnit = intval($options->idUnit);
        $amount = intval($options->amount);
        $position = intval($options->position) - 1;
        $hero = $this->getHero($idHero);
        $unit = $this->getUnit($hero, $idUnit);
        $key = $this->getKeyElemInObj($hero, 'army', 'id', $idUnit);
        if ($hero && $unit) {
            if (is_null($hero->army[$position])) {
                $hero->army[$position] = $unit;
                $hero->army[$position]->amount = $amount;
                $hero->army[$key]->amount = $hero->army[$key]->amount - $amount;
                if ($hero->army[$key]->amount == 0) {
                    $this->remUnit($hero, $idUnit);
                }
            } else if ($hero->army[$key]->type == $hero->army[$position]->type) {
                $hero->army[$position]->amount = $hero->army[$position]->amount + $amount;
                $hero->army[$key]->amount = $hero->army[$key]->amount - $amount;
                if ($hero->army[$key]->amount == 0) {
                    $this->remUnit($hero, $idUnit);
                }
            } else {
                $hero->army[$key] = clone($hero->army[$position]);
                $hero->army[$position] = $unit;
            }
            return true;
        }
        return false;
    }
    // купить героя, юнита, здание (доделать количество)
    public function buyObj($options) {

        $idHero = intval($options->idHero);
        $idGamer = intval($options->idGamer);
        $idTown = intval($options->idTown);
        $amount = intval($options->amount);
        $typeObj = $options->idObj;
        $type = $options->array;
        $name = $options->name;

        if ($typeObj) {
            if ($idGamer && $idHero && $idTown && $type == 'unit') {
                $ListOfUnits = new ListOfUnits($amount);
                $buyUnit = $ListOfUnits->{$name};
                print_r($buyUnit);
            }
            /*if ($idGamer && $idTown && $array == 'hero') {

            }
            if ($idGamer && $idTown && $array == 'build') {

            }*/
        }
        return false;

    }

    // Про сражения
    // вступить в сражение (герой с нейтралом)
    // вступить в сражение (герой с героем)
    // вступить в сражение (герой с городом)
    // подвинуть юнита
    // атаковать
    // обороняться
    // ждать
    // применить заклинание
    // сбежать
    // завершить бой
}