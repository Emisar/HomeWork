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
            $key = array_search($id, array_column($arr, 'id'));
            if (is_numeric($key)) {
                return $arr[$key];
            }
        }
        return null;
    }

    private function getGamer($id) { return $this->getElemById('gamers', $id); }
    private function getHero ($id) { return $this->getElemById('heroes', $id); }

<<<<<<< HEAD:Heroes of UdSU/logic/Logic.php
=======
    /*
>>>>>>> dcf3fe2f675b74797d659fa188c8ecc21629efad:HeroesOfVM/application/game/logic/Logic.php
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

    // закончить ход игрока
    public function endTurn($options) {
        $id = $options->id;
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
            $key = array_search($order, array_column($gamers, 'order'));
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
    public function passItemHeroes ($idGive, $idTake, $idItem) {
        $heroGive = $this->getHero($idGive);
        $heroTake = $this->getHero($idTake);
        if ($heroGive && $heroTake) {
            $item = $this->getItemFromBackpack($heroGive, $idItem);
            if ($item) {
                // Дать предмет принимающему герою
                $heroTake->backpack[] = $item;
                // Удалить предмет у дающего героя
                $this->remArtifactFromBackpack($idGive, $idItem);
                return true;
            }
        }
        return false;
    }


    // передача юнита                                                             (доделать количество)
    public function passUnit ($idGive, $idTake, $idUnit, $typeGive, $typeTake) {
        $give = $this->getArray($idGive, $typeGive);
        $take = $this->getArray($idTake, $typeTake);
        if ($give && $take) {
            $unit = $this->getUnitFromArmy($give, $idUnit);
            if ($unit) {
                $take->army[] = $unit;
                $this->remUnitFromArmy($idGive, $idUnit, $typeGive);
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

<<<<<<< HEAD:Heroes of UdSU/logic/Logic.php
    /* Про города */
=======
    // Про города
>>>>>>> dcf3fe2f675b74797d659fa188c8ecc21629efad:HeroesOfVM/application/game/logic/Logic.php

    public function buy($id, $value) {
        if ($id && $value) {
            $obj = $this->getArray($id, $value);
            return $obj;
        }
    }

<<<<<<< HEAD:Heroes of UdSU/logic/Logic.php
    // купить героя, юнита, здание                                                (доделать количество)
=======
    // купить героя, юнита, здание (доделать количество)
>>>>>>> dcf3fe2f675b74797d659fa188c8ecc21629efad:HeroesOfVM/application/game/logic/Logic.php
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