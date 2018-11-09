<<<<<<< HEAD
<?php

class Offer {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function findGame($userId) {
        if ($userId) {
            return $this->db->findGame($userId);
        }
        return false;
    }
=======
<?php

class Offer {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function findGame($userId) {
        if ($userId) {
            return $this->db->findGame($userId);
        }
        return false;
    }
>>>>>>> 902057eec6ed81af815787194765c3b7346308b6
}