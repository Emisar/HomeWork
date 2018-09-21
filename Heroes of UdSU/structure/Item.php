<?php

// Предметы (НЕ артефакты!!!)
class Item {
    public $id;
    public $type;
    public $value;

    public function __construct($id = null, $type = null, $value = null) {
        $this->id = $id;
        $this->type = $type;
        $this->value = $value;
    }
}