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
            // потушить строения
            foreach ($buildings as $building) {
                if ($building->owner == $gamer->id) {
                    $building->owner = null;
                }
            }
            if ($gamer->isActive) {
                $this->endTurn($gamer->id);
            }
            // удалить игрока
            unset($gamers[$key]);
        }
    }
    // завершить игру (целиком)

    /* Про героев */
    // подвинуть героя игрока (на 1 клетку)
    // подвинуть героя игрока (на много клеток) - пока не делаем
    // передать предметы между героями
    // передать войска между героями
    // передать войска между героем и городом
    // захватить город
    // захватить шахту
    // подобрать что-нибудь (ресурсы или артефакты)
    // умереть героя
    // выгнать героя
    // снять/надеть предмет
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