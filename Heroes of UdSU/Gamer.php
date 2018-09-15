<?php

class Resourses {

    /* Типы ресурсов */
    private $gold;   // золото
    private $wood;   // дерево
    private $ore;    // руда

    /* Конструктор класса */
    public function __construct($gold, $wood, $ore) {
        $this->gold = $gold;
        $this->wood = $wood;
        $this->ore = $ore;
    }

    /* Функции для редактирования свойств класса */
    // Задать золото
    public function setGold($gold) {$this->gold = $gold;}
    // Задать дерево
    public function setWood($wood) {$this->wood = $wood;}
    // Задать руду
    public function setOre($ore) {$this->ore = $ore;}

    /* Функции для возврата значений свойств класса */
    // Получить золото
    public function getGold() {return $this->gold;}
    // Получить дерево
    public function getWood() {return $this->wood;}
    // Получить руду
    public function getOre() {return $this->ore;}
}

class Gamer {

    /* Свойства игрока */
    protected $id;          // уникальный номер
    protected $name;        // имя
    protected $color;       // цвет
    protected $order;       // очередность хода
    protected $resourses;   // ресурсы

    /* Конструктор класса */
    public function __construct() {
        $this->resourses = new Resourses(0, 0, 0);
    }

    /* Функции для редактирования свойств класса */
    // Задать уникальный номер
    public function setId($id) {$this->id = $id;}
    // Задать имя
    public function setName($name) {$this->name = $name;}
    // Задать цвет
    public function setColor($color) {$this->color = $color;}
    //Задать очередность хода
    public function setOrder($order) {$this->order = $order;}
    // Задать золото
    public function setGold($gold) {$this->resourses->setGold($gold);}
    // Задать дерево
    public function setWood($wood) {$this->resourses->setWood($wood);}
    // Задать руду
    public function setOre($ore) {$this->resourses->setOre($ore);}
    // Задать ресурсы
    public function setResourses($gold, $wood, $ore) {
        $this->setGold($gold);
        $this->setWood($wood);
        $this->setOre($ore);
    }

    /* Функции для возврата значений свойств класса */
    // Получить id
    public function getId() {return $this->id;}
    // Получить имя
    public function getName() {return $this->name;}
    // Получить цвет
    public function getColor() {return $this->color;}
    // Получить очередность хода
    public function getOrder() {return $this->order;}
    // Получить золото
    public function getGold() {return $this->resourses->getGold();}
    // Получить дерево
    public function getWood() {return $this->resourses->getWood();}
    // Получить руду
    public function getOre() {return $this->resourses->getOre();}
}