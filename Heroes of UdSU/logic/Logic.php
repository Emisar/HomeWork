<?php

class Logic {

    private $struct;

    public function __construct($struct) {
        $this->struct = $struct;
    }

    public function endTurn($id) {
        if ($id) {
            $gamers = $this->struct->gamers;
            // 'Потушить' всех игроков
            foreach ($gamers as $gamer) {
                $gamers->asActive = false;
            }
            // Получить текущего игрока
            $key = array_search($id, array_column($gamers, 'id'));
            $curGamer = $gamers[$key];
            if ($curGamer) {
                // Порядок номера текущего игрока
                $order = $curGamer->order;
                // Выбрать текущего игрока
                $order = ($order < count($gamers)) ? $order + 1 : 0;
                $key = array_search($id, array_column($gamers, 'id'));
                // Дать ход игроку
                $gamers[$key]->isActive = true;
                return true;
            }
        }
        return false;
    }
    /* Про игру */
    //прекратить игру за игрока
    //проиграть игрока
    public function loseGamer ($id) {
        if ($id) {
            $gamers = $this->struct->gamers;
            $buildings = $this->struct->buildings;
            // Найти игрока
            $key = array_search($id, array_column($gamers, 'id'));
            $gamers = $gamers[$key];
            // Потушить строения
            foreach ($buildings as $building) {
                if ($building->owner == $gamers->id) {
                    $building->owner = null;
                }
            }
            // Найти игрока
            $key = array_search($id, array_column($gamers, 'id'));
            // Удалить игрока
            unset($gamers[$key]);
            // Пересчитать очередность хода
        }
    }
    //завершить (целиком)

    /* Про героя */
    //подвинуть героя игрока на одну клетку
    //подвинуть героя игрока на несколько клеток (не делать)
    //передать войска между героями
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
    //передать предметы между героями
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
    //передать войска между героям и городом
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
    //захватить город
    //захватить шахту
    //умереть героя
    //снять/надеть предмет
    //изменить армию героя
    //подобрать (ресурсы или артефакты)

    /* Про город */
    //купить героя
    //построить здание
    //купить армию

    /* Про сражения */
    //вступить в сражение (герой с нейтралом)
    //вступить в сражение (герой с героем)
    //вступить в сражение (герой с городом)
    //вступить в сражение (подвинуть юнита)
    //вступить в сражение (атаковать)
    //вступить в сражение (обороняться)
    //вступить в сражение (ждать)
    //применить заклинание
    //сбежать
    //завершить бой


}