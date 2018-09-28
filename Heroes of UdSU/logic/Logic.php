<?php

class Logic {

    private $struct;

    public function __construct($struct) {
        $this->struct = $struct;
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
    // передать войска между героями
    // передать войска между героем и городом
    
    // задать владельца элемента
    public function setElementOwner($elemChild, $elemOwner) {
        if (($elemChild instanceof BaseElement) && ($elemOwner instanceof BaseElement)) {
            $elemOwner->owner = $elemChild->id;
            return true;
        }
        return false;
    }

    // захватить строение
    public function captBuilding($gamerId, $buildingId) {
        if ($gamerId && $buildingId) {
            $buildings = $this->struct->buildings;
            $key = array_search($buildingId, array_column($buildings, 'id'));
            $buildings[$key]->owner = $gamerId;
            return true;
        }
        return false;
    }

    // дать игроку предмет
    public function givePlayerItem($id, $item){
       
        $gamers = $this->struct->gamers;
        $key = array_search($id, array_column($gamers, 'id'));
        $gamer = $gamers[$key];

        if ($item instanceof Item){
            $gamer->resouces->gold += $item->gold;
            $gamer->resouces->wood += $item->wood;
            $gamer->resouces->ore  += $item->ore;
        } elseif ($item instanceof Artifact){
            //...
        }
    }

    // подобрать что-нибудь (ресурсы или артефакты)
    public function pickupItem($id, $item){
        givePlayerItem($item);
        //removeItemFromMap();
    }
    
    // умереть героя
    // выгнать героя
    // снять/надеть предмет
    public function equipArtifact($artifactId, $heroId, $action) {
        if ($artifactId && $heroId && $action) {
            $artifacts = $this->struct->artifacts;
            $heroes = $this->struct->heroes;
            $heroKey = array_search($heroId, array_column($heroes, 'id'));
            $artifactKey = array_search($artifactId, array_column($artifacts, 'id'));
            $hero = $heroes[$heroKey];
            $artifact = $artifacts[$artifactKey];
            if ($action) {  // надеваем артефакт
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
