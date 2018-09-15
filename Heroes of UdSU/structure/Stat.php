<?php

class Stat {

    /* Типы атрибутов */
    public $attack;            // урон
    public $defence;           // защита
    public $knowledge;         // знания
    public $spellPower;        // сила заклинания
    public $maxDamage;         // максимальный урон
    public $minDamage;         // минимальный урон
    public $health;            // здоровье
    public $speed;             // скорость

    public function __construct() {
        $this->attack = null;
        $this->defence = null;
        $this->knowledge = null;
        $this->spellPower = null;
        $this->maxDamage = null;
        $this->minDamage = null;
        $this->health = null;
        $this->speed = null;
    }
}