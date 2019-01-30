<?php

require_once 'BaseElement.php';
require_once 'Properties.php';
require_once 'Inventory.php';

class Hero extends BaseElement {

    public $army;              // войска
    public $inventory;         // инвентарь (что надето)
    public $backpack;          // мешок (карманы)

    public function __construct($options, $defaultProperties, $inventory, $backpack) {
        parent::__construct($options);
        $this->backpack = $backpack;
        $this->army = $options->army;
        $this->inventory = new Inventory($inventory);
        $this->defaultProperties = new Properties($defaultProperties);
    }
}