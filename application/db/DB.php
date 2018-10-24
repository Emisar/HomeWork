<?php

class DB {

    const USERNAME = "root";
    const PASSWORD = "";
    const HOST = "localhost";
    const DB = "heroes_of_vm";

    private $connection;

    public function __construct() {
        $username = self::USERNAME;
        $password = self::PASSWORD;
        $host = self::HOST;
        $db = self::DB;
        $this->connection = new PDO("mysql:dbname=$db;host=$host", $username, $password);
    }

    private function getMapSize() {
        $query = 'SELECT * FROM map WHERE id=1';
        $result = $this->connection->query($query);
        while($row = $result->fetchObject('stdClass')) {
            return $row;
        }
    }

    public function getMap() {
        $size = $this->getMapSize();
        $map = [];
        for ($i = 0; $i < $size->size_x; $i++) {
            $map[] = [];
            for ($j = 0; $j < $size->size_y; $j++) {
                $map[$i][$j] = null;
            }
        }
        $query = 'SELECT * FROM tile WHERE map_id=1';
        $result = $this->connection->query($query);
        while($row = $result->fetchObject('stdClass')) {
            $map[$row->x][$row->y] = $row;
        }
        return $map;
    }

    public function getUser($login, $password) {
        $query = 'SELECT * FROM users WHERE login="' . $login . '" AND password="' . $password . '"';
        $result = $this->connection->query($query);
        while ($row = $result->fetchObject('stdClass')) {
            return $row;
        }
        return null;
    }

    public function updateUserToken($id, $token) {
        $query = 'UPDATE users SET token="' . $token . '" WHERE id=' . $id;
        $sth = $this->connection->query($query);
        return $sth->execute();
    }
}