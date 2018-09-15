<?php

class UnitAttributes {

    /* Типы атрибутов */
    private $attack;            // атака
    private $defence;           // защита
    private $damage;            // урон
    private $dice;              // разброс урона
    private $maxHealth;         // максимальное здоровье
    private $currentHealth;     // текущее здоровье
    private $initiative;        // инициатива (отвечает за очередность хода)
    private $actionPoints;      // очки действия

    /* Конструктор класса */
    public function __construct($attack, $defence, $damage, $dice, $maxHealth, $initiative, $actionPoints) {
        $this->attack = $attack;
        $this->defence = $defence;
        $this->damage = $damage;
        $this->dice = $dice;
        $this->maxHealth = $maxHealth;
        $this->currentHealth = $maxHealth;
        $this->initiative = $initiative;
        $this->actionPoints = $actionPoints;
    }

    /* Функции для редактирования свойств класса */
    // Задать атаку
    public function setAttack($attack) {$this->attack = $attack;}
    // Задать защиту
    public function setDefence($defence) {$this->defence = $defence;}
    // Задать урон
    public function setDamage($damage) {$this->damage = $damage;}
    // Задать разброс урона
    public function setDice($dice) {$this->dice = $dice;}
    // Задать максимальное здоровье
    public function setMaxHealth($maxHealth) {$this->maxHealth = $maxHealth;}
    // Задать текущее здоровье
    public function setCurrentHealth($currentHealth) {$this->currentHealth = $currentHealth;}
    // Задать инициативу
    public function setInitiative($initiative) {$this->initiative = $initiative;}
    // Задать очки действия
    public function setActionPoints($actionPoints) {$this->actionPoints = $actionPoints;}

    /* Функции для возврата значений свойств класса */
    // Получить атаку
    public function getAttack() {return $this->attack;}
    // Получить защиту
    public function getDefence() {return $this->defence;}
    // Получить урон
    public function getDamage() {return $this->damage;}
    // Получить разброс урона
    public function getDice() {return $this->dice;}
    // Получить максимальное здоровье
    public function getMaxHealth() {return $this->maxHealth;}
    // Получить текущее здоровье
    public function getCurrentHealth() {return $this->currentHealth;}
    // Получить инициативу
    public function getInitiative() {return $this->initiative;}
    // Получить очки действия
    public function getActionPoints() {return $this->actionPoints;}
}

class Unit {

    /* Свойства юнита */
    protected $id;          // уникальный номер
    protected $name;        // имя
    protected $positionX;   // положение по оси X
    protected $positionY;   // положение по оси Y
    protected $owner;       // владелец
    protected $attackType;  // тип атаки (ближняя/дистанционная)
    protected $attributes;  // характеристики

    /* Конструктор класса */
    public function __construct() {
        $this->attributes = new UnitAttributes(0,0,0,0,0,0,0);
    }

    /* Функции для редактирования свойств класса */
    // Задать уникальный номер
    public function setId($id) {$this->id = $id;}
    // Задать имя
    public function setName($name) {$this->name = $name;}
    // Задать положение по оси X
    public function setPositionX($positionX) {$this->positionX = $positionX;}
    // Задать положение по оси Y
    public function setPositionY($positionY) {$this->positionY = $positionY;}
    // Задать владельца
    public function setOwner($owner) {$this->owner = $owner;}
    // Задать тип атаки
    public function setAttackType($attackType) {$this->attackType = $attackType;}
    // Задать атаку
    public function setAttack($attack) {$this->attributes->setAttack($attack);}
    // Задать защиту
    public function setDefence($defence) {$this->attributes->setDefence($defence);}
    // Задать урон
    public function setDamage($damage) {$this->attributes->setDamage($damage);}
    // Задать разброс урона
    public function setDice($dice) {$this->attributes->setDice($dice);}
    // Задать максимальное здоровье
    public function setMaxHealth($maxHealth) {$this->attributes->setMaxHealth($maxHealth);}
    // Задать текущее здоровье
    public function setCurrentHealth($currentHealth) {$this->attributes->setCurrentHealth($currentHealth);}
    // Задать инициативу
    public function setInitiative($initiative) {$this->attributes->setInitiative($initiative);}
    // Задать очки действия
    public function setActionPoints($actionPoints) {$this->attributes->setActionPoints($actionPoints);}
    // Задать атрибуты
    public function setAttributes($attack, $defence, $damage, $dice, $maxHealth, $currentHealth, $initiative, $actionPoints) {
        $this->setAttack($attack);
        $this->setDefence($defence);
        $this->setDamage($damage);
        $this->setDice($dice);
        $this->setMaxHealth($maxHealth);
        $this->setCurrentHealth($currentHealth);
        $this->setInitiative($initiative);
        $this->setActionPoints($actionPoints);
    }

    /* Функции для возврата значений свойств класса */
    // Получить id
    public function getId() {return $this->id;}
    // Получить имя
    public function getName() {return $this->name;}
    // Получить положение по оси X
    public function getPositionX() {return $this->positionX;}
    // Получить положение по оси Y
    public function getPositionY() {return $this->positionY;}
    // Получить владельца
    public function getOwner() {return $this->owner;}
    // Получить тип атаки
    public function getAttackType() {return $this->attackType;}
    // Получить атаку
    public function getAttack() {return $this->attributes->getAttack();}
    // Получить защиту
    public function getDefence() {return $this->attributes->getDefence();}
    // Получить урон
    public function getDamage() {return $this->attributes->getDamage();}
    // Получить разброс урона
    public function getDice() {return $this->attributes->getDice();}
    // Получить максимальное здоровье
    public function getMaxHealth() {return $this->attributes->getMaxHealth();}
    // Получить текущее здоровье
    public function getCurrentHealth() {return $this->attributes->getCurrentHealth();}
    // Получить инициативу
    public function getInitiative() {return $this->attributes->getInitiative();}
    // Получить очки действия
    public function getActionPoints() {return $this->attributes->getActionPoints();}
}