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

    public function createGame($userId) {
        if ($userId) {
            return $this->db->createGame($userId, 25, 18, 3);
        }
        return false;
    }
}