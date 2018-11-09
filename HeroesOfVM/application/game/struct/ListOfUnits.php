<?php

require_once 'Unit.php';


class ListOfUnits {
    public $amount;

    public function __construct($options) {
        $this->amount = $options->amount;
    }

    public function newSwordsman() {
        $unit = new Unit((object)array(
            'cost' => 50,
            'amount' => $amount
        ));
        return $unit;
    }
}
