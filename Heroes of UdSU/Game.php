<?php

require_once 'struct\Struct.php';
require_once 'input\Input.php';
require_once 'logic\Logic.php';

class Game {
    private $struct;
    private $logic;
    private $input;

    public function __construct($options) {
        $this->struct = new Struct($options);
        $this->logic = new Logic($this->struct);

        $this->logic->addArtifactToBackpack(1, $this->struct->artifacts[0]);

        $this->logic->passItemHeroes(1, 2, 1);

        print_r($this->struct->heroes);

    }
}