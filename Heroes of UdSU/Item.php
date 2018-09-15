<?php

class ItemAttribute {

    /* Типы атрибутов */
    private $damage;            // урон
    private $defence;           // защита
    /* Далее идут аттрибуты предметов которые можно дополнительно реальзовать */
    private $strength;          // сила
    private $intelligence;      // интеллект



    /* Конструктор класса */
    public function __construct($damage, $defence, $strength, $knowledge) {
        $this->damage = $damage;
        $this->defence = $defence;
        $this->strength = $strength;
        $this->intelligence = $knowledge;
    }

    /* Функции для редактирования свойств классов. Сеттеры */
    // Задать урон
    public function setDamage($damage) {$this->damage = $damage;}
    // Задать защиту
    public function setDefence($defence) {$this->defence = $defence;}
    // Задать силу
    public function setStrength($strength) {$this->strength = $strength;}
    // Задать интеллект
    public function setIntelligence($knowledge) {$this->intelligence = $knowledge;}

    /* Функции для возврата значений свойств классов. Геттеры */
    // Возвращение значения урона предмета
    public function getDamage() {return $this->damage;}
    // Возвращение значеиня защиты предмета
    public function getDefence() {return $this->defence;}
    // Возвращение значения силы предмета
    public function getStrength(){return $this->strength;}
    // Возвращение значения интеллекта
    public function getIntelligence() {return $this->intelligence;}



}

class Item {


    /* Свойства предмета */
    protected $id;              // уникальный номер
    protected $name;            // имя
    protected $description;     // описание
    protected $positionX;       // положение по оси X
    protected $positionY;       // положение по оси Y
    protected $type;            // тип (шлем/нагрудная броня/сапоги/перчатки/аксессуар)
    protected $owner;           // владелец
    protected $attribute;       // характеристики

    /* Конструктор класса */
    public function __construct($id, $name, $description, $positionX, $positionY, $type, $owner) {
        $this->attribute = new ItemAttribute(0,0,0,0);
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->positionX = $positionX;
        $this->positionY = $positionY;
        $this->type = $type;
        $this->owner = $owner;
    }

    /* Функции редактирования. Сеттеры */
    // Задать id
    public function setId($id) {$this->id = $id;}
    // Задать имя
    public function setName($name) {$this->name = $name;}
    // Задать описание
    public function setDescription($description) {$this->description = $description;}
    // Задать положение по оси X
    public function setPositionX($positionX) {$this->positionX = $positionX;}
    // Задать положение по оси Y
    public function setPositionY($positionY) {$this->positionY = $positionY;}
    // Задать тип
    public function setType($type) {$this->type = $type;}
    // Задать владельца
    public function setOwner($owner) {$this->owner = $owner;}
    // Задать атрибут предмета 'Урон'
    public  function setDamage($damage) {$this->attribute->setDamage($damage);}
    // Задать атрибут предмета 'Защита'
    public function setDefence($defence) {$this->attribute->setDefence($defence);}
    // Задать атрибут предмета 'Бонус к силе'
    public function setStrength($strength) {$this->attribute->setStrength($strength);}
    // Задать атрибут предмета 'Интеллект'
    public function setIntelligence($intelligence) {$this->attribute->setIntelligence($intelligence);}
    // Задать атрибуты предмета
    public function setAttribute($damage, $defence, $strength, $intelligence) {
        $this->setDamage($damage);
        $this->setDefence($defence);
        $this->setStrength($strength);
        $this->setIntelligence($intelligence);
    }

    /* Функции для возврата значений свойств классов. Геттеры */
    // Вернуть id
    public function getId() {return $this->id;}
    // Вернуть имя
    public function getName() {return $this->name;}
    // Вернуть описание
    public function getDescription() {return $this->description;}
    // Вернуть положение по оси X
    public function getPositionX() {return $this->positionX;}
    // Вернуть положение по оси Y
    public function getPositionY() {return $this->positionY;}
    // Вернуть тип
    public function getType() {return $this->type;}
    // Вернуть владельца
    public function getOwner() {return $this->owner;}
    // Вернуть атрибут предмета 'урон'
    public function getDamage() {return $this->attribute->getDamage();}
    // Вернуть атрибут предмета 'защита'
    public function getDefence() {return $this->attribute->getDefence();}
    // Вернуть атрибут предмета 'сила'
    public function getStrenth() {return $this->attribute->getStrength();}
    // Вернуть атрибут предмета 'интеллект'
    public function getIntelligence() {return $this->attribute->getIntelligence();}

}