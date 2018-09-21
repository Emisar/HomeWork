<?php

class Resources {
    public $gold;   // золото
    public $wood;   // дерево
    public $ore;    // руда
    public function __construct($gold, $wood, $ore) {
        $this->gold = $gold;
        $this->wood = $wood;
        $this->ore = $ore;
    }
}