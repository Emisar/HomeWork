<?php

class Logic {

    private $MOVE_POINTS_LINE = 100;
    private $MOVE_POINTS_DIAG = 141;

    private $struct;

    public function __construct($struct) {
        $this->struct = $struct;
    }

    private function getElemById($arrName, $id) {
        if (isset($this->struct->{$arrName}) &&  $id) {
            $arr = $this->struct->{$arrName};
            print_r($arr);
            foreach ($arr as $elem) {
                if ($elem && $elem->id === $id) {
                    return $elem;
                }
            }
        }
        return null;
    }
	
	private function getKeyElem($arrName, $whereSearch, $toSearch) {
        if (isset($this->struct->{$arrName}) &&  $toSearch) {
            $arr = $this->struct->{$arrName};
            for ($i = 0; $i < count($arr); $i++) {
                if ($arr[$i]->{$whereSearch} === $toSearch) {
                    return $i;
                }
            }
        }
        return null;
    }

    private function getGamer($id) { return $this->getElemById('gamers', $id); }
    private function getHero ($id) { return $this->getElemById('heroes', $id); }
	private function getTown ($id) { return $this->getElemById('towns',  $id); }

    /*
    private function getArray($id, $arrayName) {
        return $this->getElemById(''.$arrayName.'', $id);
    }

    // вернуть предмет из рюкзака героя var: hero, idItem
    private function getItemFromBackpack($hero, $idItem) {
        if ($hero && $idItem) {
            $backpack = $hero->backpack;
            $key = array_search($idItem, array_column($backpack, 'id'));
            return $backpack[$key];
        }
        return null;
    }

    // вернуть юнита из армии героя
    private function getUnitFromArmy($array, $idUnit) {
        if ($array && $idUnit) {
            $army = $array->army;
            $key = array_search($idUnit, array_column($army, 'id'));
            return $army[$key];
        }
        return null;
    }

    // добавить юнита в армию
    private function addUnitToArmy($idArray, $unit, $arrayName) {
        $array = $this->getArray($idArray, $arrayName);
        if ($array && $unit) {
            $array->army[] = $unit;
            return true;
        }
        return false;
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

    // удалить юнита из армии
    public function remUnitFromArmy($idArray, $idUnit, $arrayName) {
        $array = $this->getArray($idArray, $arrayName);
        if ($array && $idUnit) {
            $key = array_search($idUnit, array_column($array->army, 'id'));
            unset($array->army[$key]);
            return true;
        }
        return false;
    }

    // выкинуть предмет из сумки
    public function remArtifactFromBackpack($idHero, $idArtifact) {
        $hero = $this->getHero($idHero);
        if ($hero && $idArtifact) {
            $key = array_search($idArtifact, array_column($hero->backpack, 'id'));
            unset($hero->backpack[$key]);
            return true;
        }
        return false;
    }


    // задать владельца элемента
    public function setElementOwner($elemOwner, $elemChild) {
        if (($elemChild instanceof BaseElement) && ($elemOwner instanceof BaseElement)) {
            $elemOwner->owner = $elemChild->id;
            return true;
        }
        return false;
    }
    */

    // вернуть юнита из армии героя
    private function getUnit($from, $idUnit) {
        if ($from && $idUnit) {
            $army = $from->army;
            for ($i = 0; $i < count($army); $i++) {
                if ($army[$i] === $idUnit) {
                    return $army[$i];
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
                    unset($army[$i]);
                    $from->army = $army;
                    return true;
                }
            }
        }
        return false;
    }



    // вернуть предмет из рюкзака героя var: hero, idItem
    private function getItemFromBackpack($hero, $idArtifact) {
        if ($hero && $idArtifact) {
            $backpack = $hero->backpack;
            for ($i = 0; $i < count($backpack); $i++) {
                if ($backpack[$i]->id === $idArtifact) {
                    return $backpack[$i];
                }
            }
        }
        return null;
    }

    // выкинуть предмет из сумки
    public function remArtifactFromBackpack($hero, $idArtifact) {
        if ($hero && $idArtifact) {
            $backpack = $hero->backpack;
            for ($i = 0; $i < count($backpack); $i++) {
                if ($backpack[$i]->id === $idArtifact) {
                    unset($backpack[$i]);
                    $hero->backpack = $backpack;
                    return true;
                }
            }
        }
        return false;
    }


    // закончить ход игрока
    public function endTurn($options) {
        $id = intval($options->id);
        // получить текущего игрока
        $curGamer = $this->getGamer($id);
        if ($curGamer) {
            $order = $curGamer->order; // порядковый номер текущего
            // потушить всех игроков
            $gamers = $this->struct->gamers;
            foreach($gamers as $gamer) {
                $gamer->isActive = false;
            }
            // выбрать следующего активного игрока
            $order = ($order < count($gamers) - 1) ? $order + 1 : 0;
            $key = $this->getKeyElem('gamers','order', $order);
            $gamers[$key]->isActive = true;
            return true;
        }
        return false;
    }

    // Про игру
    // прекратить игру за игрока
    //...

    // проиграть игрока
    public function loseGamer($id) {
        $gamer = $this->getGamer($id);
        if ($gamer) {
            // завершить ход за этого игрока
            if ($gamer->isActive) {
                $this->endTurn($gamer->id);
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
            $key = array_search($id, array_column($gamers, 'id'));
            unset($gamers[$key]);
            $this->struct->gamers = $gamers; // потому что НЕ JS!!!
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

    // завершить игру (целиком)
    //...

    // Про героев
    // подвинуть героя игрока (на 1 клетку)
    // !!!!!!!!!!!!!!!
    // все переписать
    // !!!!!!!!!!!!!!!
    public function moveHero($id, $direction) {
        $hero = $this->getHero($id);
        if ($hero && $direction) {
            switch ($direction) {
                case 'UP':
                    $hero->y--;
                    $hero->properties->movePoints -= $this->MOVE_POINTS_LINE;
                    break;
                case 'DOWN':
                    $hero->y++;
                    $hero->properties->movePoints -= $this->MOVE_POINTS_LINE;
                    break;
                case 'RIGHT':
                    $hero->x++;
                    $hero->properties->movePoints -= $this->MOVE_POINTS_LINE;
                    break;
                case 'LEFT':
                    $hero->x--;
                    $hero->properties->movePoints -= $this->MOVE_POINTS_LINE;
                    break;
                case 'UP-RIGHT':
                    $hero->y--;
                    $hero->x++;
                    $hero->properties->movePoints -= $this->MOVE_POINTS_DIAG;
                    break;
                case 'UP-LEFT':
                    $hero->y--;
                    $hero->x--;
                    $hero->properties->movePoints -= $this->MOVE_POINTS_DIAG;
                    break;
                case 'DOWN-RIGHT':
                    $hero->y++;
                    $hero->x++;
                    $hero->properties->movePoints -= $this->MOVE_POINTS_DIAG;
                    break;
                case 'DOWN-LEFT':
                    $hero->y++;
                    $hero->x--;
                    $hero->properties->movePoints -= $this->MOVE_POINTS_DIAG;
                    break;
            }
            //...
            return true;
        }
        return false;
    }
    // подвинуть героя игрока (на много клеток) - пока не делаем

    // передать предметы между героями
    public function passItemHeroes ($options) {
        $idGive = intval($options->idGive);
        $idTake = intval($options->idTake);
        $idItem = intval($options->idItem);
        $heroGive = $this->getHero($idGive);
        $heroTake = $this->getHero($idTake);
        if ($heroGive && $heroTake) {
            $item = $this->getItemFromBackpack($heroGive, $idItem);
            if ($item) {
                // Дать предмет принимающему герою
                $heroTake->backpack[] = $item;
                // Удалить предмет у дающего героя
                $this->remArtifactFromBackpack($heroGive, $idItem);
                return true;
            }
        }
        return false;
    }


    // передача юнита                                                             (доделать количество)
    public function passUnit($options) {
        $idGive = intval($options->idGive);
        $idTake = intval($options->idTake);
        $idUnit = intval($options->idItem);
        $typeGive = $options->typeGive;
        $typeTake = $options->typeTake;
        print_r($typeGive);
        if ($typeGive === 'heroes') {
            print_r('111');
        }
        $give = $this->getElemById($typeGive, $idGive);
        $take = $this->getElemById($typeTake, $idTake);
        if ($give && $take) {
            $unit = $this->getUnit($give, $idUnit);
            if ($unit) {
                $take->army[] = $unit;
                $this->remUnit($give, $idUnit);
                print_r($give);
                print_r($take);
                return true;
            }
        }
        return false;
    }

    // захватить строение
    public function captureBuilding($gamerId, $buildingId) {
        $gamer = $this->getGamer($gamerId);
        $building = $this->getBuilding($buildingId);
        if ($gamer && $building) {
            return $this->setElementOwner($gamer, $building);
        }
        return false;
    }

    // подобрать что-нибудь (ресурсы или артефакты)
    public function pickupItem($id, $item){
        $gamers = $this->struct->gamers;
        $key = array_search($id, array_column($gamers, 'id'));
        $gamer = $gamers[$key];
        if ($item instanceof Item){
            $gamer->resouces->gold += $item->resouces->gold;
            $gamer->resouces->wood += $item->resouces->wood;
            $gamer->resouces->ore  += $item->resouces->ore;
        } else if ($item instanceof Artifact){
            //...
        }
        //removeItemFromMap();
    }

    // умереть героя
    public function dieHero ($id) {
        $hero = $this->getHero($id);
        if ($hero) {
            $key = array_search($id, array_column($this->struct->heroes, 'id'));
            unset($this->struct->heroes[$key]);
            return true;
        }
        return false;
    }

    // выгнать героя
    public function expelHero ($id) {
        return $this->dieHero($id);
    }


    // снять/надеть предмет
    public function equipArtifact($artifactId, $heroId, $action) {
        if ($artifactId && $heroId && $action) {
            // инициализируем массивы
            $artifacts = $this->struct->artifacts;
            $heroes = $this->struct->heroes;
            // находим ключи
            $heroKey = array_search($heroId, array_column($heroes, 'id'));
            $artifactKey = array_search($artifactId, array_column($artifacts, 'id'));
            // инициализируем объекты
            $hero = $heroes[$heroKey];
            $artifact = $artifacts[$artifactKey];
            // надеваем артефакт
            if ($action) {
                if (is_null($hero->inventory->{$artifact->type})) {     // если слот свободен
                    $hero->inventory->{$artifact->type} = $artifactId;
                    unset($artifactId);
                } else {        // если слот занят, то меняем предметы местами
                    $equipedArtifactId = $hero->inventory->{$artifact->type};
                    array_push($hero->backpack, $equipedArtifactId);
                    $hero->inventory->{$artifact->type} = $artifactId;
                    unset($artifactId);
                }
            } else {    // снимаем артефакт
                array_push($hero->backpack, $artifactId);
                $hero->inventory->{$artifact->type} = null;
            }
            return true;
        }
        return false;
    }
    // изменить армию героя
    // зайти в город

    // Про города

    public function buy($id, $value) {
        if ($id && $value) {
            $obj = $this->getArray($id, $value);
            return $obj;
        }
    }

    // купить героя, юнита, здание (доделать количество)
    public function buyObj($idObj, $idGamer, $idTown, $array, $idHero)
    {
        if ($idObj && $idGamer && $idTown && $array) {
            $obj = $this->getArray($idObj, $array);
            $gamer = $this->getArray($idGamer, 'gamers');
            $town = $this->getArray($idTown, 'towns');
            if ($array == 'heroes') {
                $obj->owner = $idGamer;
                $obj->x = $town->x;
                $obj->y = $town->y;
            }
            if ($array == 'units' && $idHero) {
                $hero = $this->getArray($idHero, 'heroes');
                $hero->army[] = $obj;
            }
            if ($array == 'buildings' && !$town[$obj]) {
                $town->buildings[] = $obj;
            }
            $gamer->resources->gold = $gamer->resources->gold - $obj->cost;
            return true;
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