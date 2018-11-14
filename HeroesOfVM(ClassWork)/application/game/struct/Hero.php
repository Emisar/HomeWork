<?php

require_once 'BaseElement.php';
require_once 'Properties.php';

class Hero extends BaseElement {

    public $army;              // войска
    public $inventory;         // инвентарь (что надето)
    public $backpack;          // мешок (карманы)

    public function __construct($options, $defaultProperties) {
        parent::__construct($options);
        $this->backpack = $options->backpack;
        $this->army = $options->army;
        $this->inventory = $options->inventory;
        $this->defaultProperties = new Properties($defaultProperties);
    }
}