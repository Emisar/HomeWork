<?php

require_once 'Stat.php';

class Artifact {

    /* Свойства предмета */
    protected $id;              // уникальный номер
    protected $name;            // имя
    protected $description;     // описание
    protected $type;            // тип (шлем/нагрудная броня/сапоги/перчатки/аксессуар)
    protected $owner;           // владелец
    protected $stats;       // характеристики

    /* Конструктор класса */
    public function __construct($id, $name, $description, $type, $owner) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->type = $type;
        $this->owner = $owner;
        $this->stats = new Stat(0,0,0,0);
    }
}