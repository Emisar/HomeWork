<?php

class Battle {
    public $id;          // уникальный номер
    public $idAttackHero;        // имя
    public $idDefenceHero;        // тип
    public $currentMove;           // положение по оси X
    public $turn;
    public $map;


    public function __construct($options, $map) {
        $this->id = $options->id;
        $this->idAttackHero = $options->idAttackHero;
        $this->idDefenceHero = $options->idDefenceHero;
        $this->currentMove = $options->currentMove;
        $this->turn = $options->turn;
        $this->map = new Map($map);
    }
}