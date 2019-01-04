<?php

class Resources {
    public $gold;   // золото
    public $wood;   // дерево
    public $ore;    // руда

    public function __construct($options)
    {
        if (isset($options)) {
            $this->gold = $options->gold;
            $this->wood = $options->wood;
            $this->ore = $options->ore;
        }
    }
}