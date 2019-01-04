<?php

class Properties {
    public $attack;     // атака
    public $defence;    // защита
    public $spellPower; // сила заклинания
    public $knowledge;  // интеллект
    public $minDamage;  // урон
    public $maxDamage;  // разброс урона
    public $health;     // здоровье
    public $speed;      // скорость юнита
    public $movePoints; // очки действия
    public $manaPoints; // очки маны

    public function __construct($options) {
        if (isset($options)) {
            $this->attack     = $options->attack;
            $this->defence    = $options->defence;
            $this->spellPower = $options->spellPower;
            $this->knowledge  = $options->knowledge;
            $this->minDamage  = $options->minDamage;
            $this->maxDamage  = $options->maxDamage;
            $this->health     = $options->health;
            $this->speed      = $options->speed;
            $this->movePoints = $options->movePoints;
            $this->manaPoints = $options->manaPoints;
        }
    }
}