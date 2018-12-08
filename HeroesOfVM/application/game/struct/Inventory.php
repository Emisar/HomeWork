<?php

class Inventory {
    public $head;
    public $body;
    public $feet;
    public $gloves;
    public $rightHand;
    public $leftHand;
    public $cloak;
    public $ringOne;
    public $ringTwo;

    public function __construct($options)
    {
        if (isset($options)) {
            $this->head = $options->head;
            $this->body = $options->body;
            $this->feet = $options->feet;
            $this->gloves = $options->gloves;
            $this->rightHand = $options->rightHand;
            $this->leftHand = $options->leftHand;
            $this->cloak = $options->cloak;
            $this->neck = $options->neck;
            $this->ringOne = $options->ringOne;
            $this->ringTwo = $options->ringTwo;
        }
    }
}