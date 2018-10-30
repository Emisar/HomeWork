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
        $this->backpack = $options->backpack;
        $this->army = $options->army;
<<<<<<< HEAD
        $this->inventory = new stdClass();
=======
        $this->inventory = $options->inventory;
        /*$this->inventory = new stdClass();
>>>>>>> cbff924b7de175a5a6eb0d5a73496106be3a4519
        $this->inventory->head = $options->head;
        $this->inventory->body = $options->body;
        $this->inventory->shoes = $options->shoes;
        $this->inventory->leftHand = $options->leftHand;
        $this->inventory->rightHand = $options->rightHand;
        $this->inventory->neck = $options->neck; // ожерелье
        $this->inventory->cloak = $options->cloak; // плащ
        $this->inventory->leftFinger = $options->leftFinger;
<<<<<<< HEAD
        $this->inventory->rightFinger = $options->rightFinger;
=======
        $this->inventory->rightFinger = $options->rightFinger;*/
>>>>>>> cbff924b7de175a5a6eb0d5a73496106be3a4519
    }
}