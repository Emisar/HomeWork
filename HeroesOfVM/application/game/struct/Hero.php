<?php

require_once 'BaseElement.php';
require_once 'Properties.php';

class Hero extends BaseElement {

    public $defaultProperties; // характеристики
    public $army;              // войска
    public $inventory;         // инвентарь (что надето)
    public $backpack;          // мешок (карманы)

    public function __construct($options) {
        parent::__construct($options);
        $this->defaultProperties = new Properties($options->properties);
        $this->backpack = [];
        $this->inventory = new stdClass();
        $this->inventory->head = null;
        $this->inventory->body = null;
        $this->inventory->shoes = null;
        $this->inventory->leftHand = null;
        $this->inventory->rightHand = null;
        $this->inventory->neck = null; // ожерелье
        $this->inventory->cloak = null; // плащ
        $this->inventory->leftFinger = null;
        $this->inventory->rightFinger = null;
    }
}