<?php

class Resources {

    /* Типы ресурсов */
    private $gold;   // золото
    private $wood;   // дерево
    private $ore;    // руда

    /* Конструктор класса */
    public function __construct($gold, $wood, $ore) {
        $this->gold = $gold;
        $this->wood = $wood;
        $this->ore = $ore;
    }
}