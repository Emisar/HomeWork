<?php

class Building {
    public $name;
    public $type;
    public $buildAbility;
    public $requirements;

    public function __construct($name = null, $type = null, $buildAbility = null, $requirements = null) {
        $this->name = $name;
        $this->type = $type;
        $this->buildAbility = $buildAbility;
        $this->requirements = $requirements;
    }
}