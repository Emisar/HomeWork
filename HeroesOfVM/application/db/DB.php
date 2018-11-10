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

    private function getMapSize($mapId) {
        $query = 'SELECT * FROM map WHERE id=' . $mapId;
        return $this->connection->query($query)->fetchObject('stdClass');
    }

    public function getMap($mapId) {
        $size = $this->getMapSize($mapId);
        $map = [];
        for ($i = 0; $i < $size->size_x; $i++) {
            $map[] = [];
            for ($j = 0; $j < $size->size_y; $j++) {
                $map[$i][$j] = null;
            }
        }
        $query = 'SELECT * FROM tile WHERE map_id=' . $mapId;
        $result = $this->connection->query($query);
        while($row = $result->fetchObject('stdClass')) {
            $map[$row->x][$row->y] = $row;
        }
        return $map;
    }

    public function getUser($login, $password) {
        $query = 'SELECT * FROM users WHERE login="' . $login . '" AND password="' . $password . '"';
        return $this->connection->query($query)->fetchObject('stdClass');
    }

    public function getUserByToken($token) {
        if ($token){
            $query = 'SELECT * FROM users WHERE token="' . $token . '"';
            $result = $this->connection->query($query);
            while ($row = $result->fetchObject('stdClass')) {
                return $row;
            }
        }
        return null;
    }

    public function updateUserToken($id, $token) {
        $query = 'UPDATE users SET token="' . $token . '" WHERE id=' . $id;
        $sth = $this->connection->query($query);
        return $sth->execute();
    }

    /*public function getUserGameById($id) {
        $query = 'SELECT * FROM users_games WHERE user_id="' . $id .'"';
        return $this->connection->query($query)->fetchObject('stdClass');
    }*/

    public function getGame($id) {
        $query = 'SELECT * FROM games WHERE id='. $id;
        return $this->connection->query($query)->fetchObject('stdClass');
    }

    public function findGame($userId) {
        $query = 'SELECT g.id AS id 
                  FROM 
                    users_games AS ug, 
                    games AS g 
                  WHERE 
                    ug.user_id='.$userId.' AND 
                    g.status="active" AND 
                    ug.game_id=g.id;';
        return $this->connection->query($query)->fetchObject('stdClass');
    }

    public function getGamers($gameId) {
        $query = 'SELECT u.id, u.name, ug.color, ug.order, ug.is_active AS isActive 
                  FROM 
                    heroes_of_vm.users_games AS ug, 
                    heroes_of_vm.users AS u 
                  WHERE ug.game_id=' . $gameId . ' AND u.id=ug.user_id';
        return $this->connection->query($query)->fetchAll(PDO::FETCH_CLASS);
    }

    public function getHeroes($gameId) {
        $query = 'SELECT * FROM hero WHERE game_id=' . $gameId;
        return $this->connection->query($query)->fetchAll(PDO::FETCH_CLASS);
    }
	
    public function getArtifacts($gameId) {
        $query = 'SELECT * FROM artifact WHERE game_id=' . $gameId;
        return $this->connection->query($query)->fetchAll(PDO::FETCH_CLASS);
    }

    public function getMapBuildings($gameId) {
        $query = 'SELECT * FROM map_building WHERE game_id=' . $gameId;
        return $this->connection->query($query)->fetchAll(PDO::FETCH_CLASS);
    }

    public function getTowns($gameId) {
        $query = 'SELECT * FROM town WHERE game_id=' . $gameId;
        return $this->connection->query($query)->fetchAll(PDO::FETCH_CLASS);
    }

    public function getItems($gameId) {
        $query = 'SELECT * FROM item WHERE game_id=' . $gameId;
        return $this->connection->query($query)->fetchAll(PDO::FETCH_CLASS);
    }

    /***************/
    /* UPDATE DATA */
    /***************/
    public function updateGamers($gameId, $gamers) {
        $query = '';
        foreach ($gamers as $gamer) {
            $query .= 'UPDATE users_games 
                       SET is_active=' . $gamer->isActive . ' 
                       WHERE user_id=' . $gamer->id . ' AND game_id=' . $gameId . ';';
        }
        return $this->connection->query($query)->execute();
    }

    public function updateHeroes($gameId, $heroes) {
        $query = '';
        foreach ($heroes as $hero) {
            $query .= 'UPDATE hero 
                       SET x=' . $hero->x . ', y=' . $hero->y . '  
                       WHERE id=' . $hero->id . ';';
        }
        return $this->connection->query($query)->execute();
    }

    public function updateArtifacts($gameId, $artifacts) {
        $query = '';
        foreach ($artifacts as $artifact) {
            $query .= 'UPDATE artifact 
                       SET x=' . $artifact->x . ', y=' . $artifact->y . '  
                       WHERE id=' . $artifact->id . ';';
        }
        return ($query) ? $this->connection->query($query)->execute() : false;
    }

    public function updateMapBuildings($mapBuildings) {
        $query = '';
        foreach ($mapBuildings as $mapBuilding) {
            $query .= 'UPDATE mapBuilding 
                       SET x=' . $mapBuilding->x . ', y=' . $mapBuilding->y . '  
                       WHERE id=' . $mapBuilding->id . ';';
        }
        return ($query) ? $this->connection->query($query)->execute() : false;
    }

    public function updateTowns($towns) {
        $query = '';
        foreach ($towns as $town) {
            $query .= 'UPDATE town
                       SET x=' . $town->x . ', y=' . $town->y . '
                       WHERE id=' . $town->id . ';';
        }
        return ($query) ? $this->connection->query($query)->execute() : false;
    }

    public function updateItems($items) {
        $query = '';
        foreach ($items as $item) {
            $query .= 'UPDATE item
                       SET x=' . $item->x . ', y=' . $item->y . '
                       WHERE id=' . $item->id . ';';
        }
        return ($query) ? $this->connection->query($query)->execute() : false;
    }
}