<?php

class Logic {

    private $struct;

    public function __construct($struct) {
        $this->struct = $struct;
    }

    // задать владельца элемента
    public function setElementOwner($elemChild, $elemOwner) {
        if (($elemChild instanceof BaseElement) && ($elemOwner instanceof BaseElement)) {
            $elemOwner->owner = $elemChild->id;
            return true;
        }
        return false;
    }

    // закончить ход игрока
    public function endTurn($id) {
        if ($id) {
            $gamers = $this->struct->gamers;
            // получить текущего игрока
            $key = array_search($id, array_column($gamers, 'id'));
            $curGamer = $gamers[$key];
            if ($curGamer) {
                $order = $curGamer->order; // порядковый номер текущего
                // потушить всех игроков
                foreach($gamers as $gamer) {
                    $gamer->isActive = false;
                }
                // выбрать следующего активного игрока
                $order = ($order < count($gamers) - 1) ? $order + 1 : 0;
                $key = array_search($order, array_column($gamers, 'order'));
                $gamers[$key]->isActive = true;
                return true;
            }
        }
        return false;
    }

    /* Про игру */
    // прекратить игру за игрока
    // проиграть игрока
    public function loseGamer($id) {
        if ($id) {
            $gamers = $this->struct->gamers;
            $buildings = $this->struct->buildings;
            $key = array_search($id, array_column($gamers, 'id'));
            $gamer = $gamers[$key];
            $order = $gamer->order;
            // потушить строения
            foreach ($buildings as $building) {
                if ($building->owner == $gamer->id) {
                    $building->owner = null;
                }
            }
            // завершить ход за этого игрока
            if ($gamer->isActive) {
                $this->endTurn($gamer->id);
            }
            // удалить игрока
            unset($gamers[$key]);
            // пересчитать очередность хода
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

    /* Про героев */
    // подвинуть героя игрока (на 1 клетку)
    public function moveHero($id, $direction) {
        if ($id && $direction) {
            $heroes = $this->struct->heroes;
            $key = array_search($id, array_column($heroes, 'id'));
            $hero = $heroes[$key];
            switch ($direction) {
                case 'UP':
                    $hero->y--;
                    $hero->properties->movePoints -= 100;
                    break;
                case 'DOWN':
                    $hero->y++;
                    $hero->properties->movePoints -= 100;
                    break;
                case 'RIGHT':
                    $hero->x++;
                    $hero->properties->movePoints -= 100;
                    break;
                case 'LEFT':
                    $hero->x--;
                    $hero->properties->movePoints -= 100;
                    break;
                case 'UP-RIGHT':
                    $hero->y--;
                    $hero->x++;
                    $hero->properties->movePoints -= 150;
                    break;
                case 'UP-LEFT':
                    $hero->y--;
                    $hero->x--;
                    $hero->properties->movePoints -= 150;
                    break;
                case 'DOWN-RIGHT':
                    $hero->y++;
                    $hero->x++;
                    $hero->properties->movePoints -= 150;
                    break;
                case 'DOWN-LEFT':
                    $hero->y++;
                    $hero->x--;
                    $hero->properties->movePoints -= 150;
                    break;
            }
            return true;
        }
        return false;
    }
    // подвинуть героя игрока (на много клеток) - пока не делаем

    // передать предметы между героями
    public function passItemHeroes ($idSet, $idGet, $idItem) {
        if ($idSet && $idGet && $idItem) {
            $heroes = $this->struct->heroes;
            // Найти дающего героя
            $keySet = array_search($idSet, array_column($heroes, 'id'));
            // Найти принимающего героя
            $keyGet = array_search($idGet, array_column($heroes, 'id'));
            $backpack = $this->struct->heroes[$keySet]->backpack;
            // Найти передающийся предмет
            $keyItem = array_search($idItem, array_column($backpack, 'id'));
            // Задать дающего героя
            $heroSet = $heroes[$keySet];
            // Задать принимающего героя
            $heroGet = $heroes[$keyGet];
            // Задать передающийся предмет
            $item = $backpack[$keyItem];
            // Дать предмет принимающему герою
            $heroGet->backpack[] = $item;
            // Удалить предмет у дающего героя
            unset($heroSet->backpack[$keyItem]);
        }
    }
    // передать войска между героями
    public function passUnitHeroes ($idSet, $idGet, $idUnit) {
        if ($idSet && $idGet && $idUnit) {
            $heroes = $this->struct->heroes;
            // Найти дающего героя
            $keySet = array_search($idSet, array_column($heroes, 'id'));
            // Найти принимающего героя
            $keyGet = array_search($idGet, array_column($heroes, 'id'));
            $units = $this->struct->heroes[$keySet]->army->units;
            // Найти передающийся юнит
            $keyUnit = array_search($idUnit, array_column($units, 'id'));
            // Задать дающего героя
            $heroSet = $heroes[$keySet];
            // Задать принимающего героя
            $heroGet = $heroes[$keyGet];
            // Задать передающийся юнит
            $unit = $units[$keyUnit];
            // Дать юнита принимающему герою
            $heroGet->units[] = $unit;
            // Удалить юнита у дающего героя
            unset($heroSet->units[$keyUnit]);
        }
    }
    // передать войска между героем и городом
    public function passUnitTown ($idHero, $idTown, $idUnit, $boolean) {
        if ($idHero && $idTown && $idUnit && $boolean) {
            $heroes = $this->struct->heroes;
            $towns = $this->struct->towns;
            // Найти героя
            $keyHero = array_search($idHero, array_column($heroes, 'id'));
            // Найти город
            $keyTown = array_search($idTown, array_column($towns, 'id'));
            // Задаем героя
            $hero = $heroes[$keyHero];
            // Задаем город
            $town = $towns[$keyTown];
            // Если true то юнит из героя в город
            if ($boolean == true) {
                $units = $this->struct->heroes[$keyHero]->army->units;
                // Находим юнита
                $keyUnit = array_search($idUnit, array_column($units, 'id'));
                // Задаем юнита
                $unit = $units[$keyUnit];
                // Удалить юнита у героя
                unset($hero->units[$keyUnit]);
                // Дать городу юнит
                $town->army->units[] = $unit;
            } else {
                $units = $this->struct->towns[$keyTown]->army->units;
                // Находим юнита
                $keyUnit = array_search($idUnit, array_column($units, 'id'));
                // Задать юнита
                $unit = $units[$keyUnit];
                // Удалить юнита из города
                unset($town->units[$keyUnit]);
                // Дать герою юнит
                $hero->army->units[] = $unit;
            }
        }
    }
    // захватить строение
    public function captureBuilding($gamerId, $buildingId) {
        if ($gamerId && $buildingId) {
            $buildings = $this->struct->buildings;
            $key = array_search($buildingId, array_column($buildings, 'id'));
            $buildings[$key]->owner = $gamerId;
            return true;
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
        } elseif ($item instanceof Artifact){
            //...
        }
        //removeItemFromMap();
    }
    // умереть героя
    public function dieHero ($id) {
        if ($id) {
            $heroes = $this->struct->heroes;
            $key = array_search($id, array_column($heroes, 'id'));
            $hero = $heroes[$key];
            $army = $hero->army;
            $inventory = $hero->inventory;
            $backpack = $hero->backpack;
            foreach ($army as $value) {
                $value = null;
            }

            foreach ($backpack as $value) {
                $value = null;
            }

            foreach ($inventory as $value) {
                $value = null;
            }
            return true;

        }
        return false;
    }
    // выгнать героя
    public function expelHero ($id) {
        if ($id) {
            $heroes = $this->struct->heroes;
            $key = array_search($id, array_column($heroes, 'id'));
            $hero = $heroes[$key];
            unset($hero);
            /*$army = $hero->army;
            $inventory = $hero->inventory;
            $backpack = $hero->backpack;
            foreach ($army as $value) {
                $value = null;
            }

            foreach ($backpack as $value) {
                $value = null;
            }

            foreach ($inventory as $value) {
                $value = null;
            }
            return true; */


        }
        return false;
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
    public function splitArmy ($id) {

    }
    // зайти в город

    /* Про города */
    // купить героя
    // посторить здание
    // купить армию

    /* Про сражения */
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