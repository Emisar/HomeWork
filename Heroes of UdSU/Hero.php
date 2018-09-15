<?php

class Inventory {

    /* Типы слотов */
    private $helmet;         // шлем
    private $bodyArmor;      // броня
    private $gloves;         // перчатки
    private $boots;          // сапоги
    private $accessory;      // аксессуар

    /* Конструктор класса */
    public function __construct() {
        //...
    }

    /* Функции для редактирования свойств класса */
    // Задать шлем
    public function setHelmet($helmet) {$this->helmet = $helmet;}
    // Задать броню
    public function setBodyArmor($bodyArmor) {$this->bodyArmor = $bodyArmor;}
    // Задать перчатки
    public function setGloves($gloves) {$this->gloves = $gloves;}
    // Задать сапоги
    public function setBoots($boots) {$this->boots = $boots;}
    // Задать аксессуар
    public function setAccessory($accessory) {$this->accessory = $accessory;}

    /* Функции для возврата значений свойств класса */
    // Получить шлем
    public function getHelmet() {return $this->helmet;}
    // Получить броню
    public function getBodyArmor() {return $this->bodyArmor;}
    // Получить перчатки
    public function getGloves() {return $this->gloves;}
    // Получить сапоги
    public function getBoots() {return $this->boots;}
    // Получить аксессуар
    public function getAccessory() {return $this->accessory;}
}

class HeroAttributes {

    /* Типы атрибутов */
    private $attack;            // атака
    private $defence;           // защита
    private $intelligence;      // интеллект
    private $experience;        // количество опыта
    private $level;             // уровень
    private $movePoints;        // очки передвижения
    private $manaPoints;        // очки маны

    /* Конструктор класса */
    public function __construct($attack, $defence, $intelligence) {
        $this->attack = $attack;
        $this->defence = $defence;
        $this->intelligence = $intelligence;
    }

    /* Функции для редактирования свойств класса */
    // Задать атаку
    public function setAttack($attack) {$this->attack = $attack;}
    // Задать защиту
    public function setDefence($defence) {$this->defence = $defence;}
    // Задать интеллект
    public function setIntelligence($intelligence) {$this->intelligence = $intelligence;}
    // Задать опыт
    public function setExperience($experience) {$this->experience = $experience;}
    // Задать уровень
    public function setLevel($level) {$this->level = $level;}
    // Задать очки передвижения
    public function setMovePoints($movePoints) {$this->movePoints = $movePoints;}
    // Задать очки маны
    public function setManaPoints($manaPoints) {$this->manaPoints = $manaPoints;}
    // Задать атаку

    /* Функции для возврата значений свойств класса */
    // Получить атаку
    public function getAttack() {return $this->attack;}
    // Получить защиту
    public function getDefence() {return $this->defence;}
    // Получить интеллект
    public function getIntelligence() {return $this->intelligence;}
    // Получить опыт
    public function getExperience() {return $this->experience;}
    // Получить уровень
    public function getLevel() {return $this->level;}
    // Получить очки передвижения
    public function getMovePoints() {return $this->movePoints;}
    // Получить очки маны
    public function getManaPoints() {return $this->manaPoints;}
}

class Hero {

    /* Свойства героя */
    protected $id;              // уникальный номер
    protected $name;            // имя
    protected $positionX;       // положение по оси X
    protected $positionY;       // положение по оси Y
    protected $owner;           // владелец
    protected $skills;          // способности
    protected $attributes;      // характеристики
    protected $army;            // войска
    protected $inventory;       // инвентарь

    /* Конструктор класса*/
    public function __construct() {
        $this->attributes = new HeroAttributes(0, 0, 0);
        $this->inventory = new Inventory();
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
    // Задать опыт
    public function setExperience($experience) {$this->attributes->setExperience($experience);}
    // Задать уровень
    public function setLevel($level) {$this->attributes->setLevel($level);}
    // Задать очки передвижения
    public function setMovePoints($movePoints) {$this->attributes->setMovePoints($movePoints);}
    // Задать очки маны
    public function setManaPoints($manaPoints) {$this->attributes->setManaPoints($manaPoints);}
    // Задать атаку
    public function setAttack($attack) {$this->attributes->setAttack($attack);}
    // Задать защиту
    public function setDefence($defence) {$this->attributes->setDefence($defence);}
    // Задать интеллект
    public function setIntelligence($intelligence) {$this->attributes->setIntelligence($intelligence);}
    // Задать атрибуты
    public function setAttributes($attack, $defence, $intelligence) {
        $this->setAttack($attack);
        $this->setDefence($defence);
        $this->setIntelligence($intelligence);
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
    // Получить опыт
    public function getExperience() {return $this->attributes->getExperience();}
    // Получить уровень
    public function getLevel() {return $this->attributes->getLevel();}
    // Получить очки передвижения
    public function getMovePoints() {return $this->attributes->getMovePoints();}
    // Получить очки маны
    public function getManaPoints() {return $this->attributes->getManaPoints();}
    // Получить атаку
    public function getAttack() {return $this->attributes->getAttack();}
    // Получить защиту
    public function getDefence() {return $this->attributes->getDefence();}
    // Получить интеллект
    public function getIntellegence() {return $this->attributes->getIntelligence();}
}