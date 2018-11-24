<?php

require_once '..\application\db\DB.php';
require_once '..\application\game\Game.php';
require_once '..\application\user\User.php';
require_once '..\application\offer\Offer.php';

class Router {

    private $user;
    private $offer;
    private $game;
    private $db;

    public function __construct() {
        $this->db = new DB();
        $this->game  = new Game ($this->db);
        $this->user  = new User ($this->db);
        $this->offer = new Offer($this->db);
    }

    private function bad($text) {
        return array(
            'result' => false,
            'error' => $text
        );
    }
    private function good($data) {
        return array(
            'result' => true,
            'data' => $data
        );
    }

    private function login($params) {
        $token = $this->user->login($params);
        return ($token) ?
            $this->good($token) :
            $this->bad('authorization fail');
    }

    private function logout($params) {
        return ($this->user->logout($params)) ?
            $this->good(true) :
            $this->bad('logout fail');
    }

    /*private function getGame($params) {
        $game = $this->game->getGame($params);
        return ($game) ?
            $this->good($game) :
            $this->bad('game not found');
    }*/

    private function findGame($params) {
        $user = $this->user->checkToken($params);
        if ($user) {
            $gameId = $this->offer->findGame($user->id);
            return ($gameId) ?
                $this->good($gameId) :
                $this->bad('game not found');
        }
        return $this->bad('user not found');
    }

    public function answer($params) {
        if ($params && isset($params->method)) {
            $method = $params->method;
            unset($params->method);
            // вызвать методы АПИ
            switch ($method) {
                case 'login'  : return $this->login  ($params); break;
                case 'logout' : return $this->logout ($params); break;
                case 'findGame': return $this->findGame($params); break;
                //...
            }
            // вызвать команду игры
            $user = $this->user->checkToken($params);
            if ($user) {
                if ($this->game->init($params->gameId)) { // данные забираем из БД
                    $commands = $this->game->getCommands();
                    if ($method == $commands->GET_STRUCT) {
                        return $this->good($this->game->getStruct());
                    }
                    foreach ($commands as $command) {
                        if ($command === $method) {
                            $params->id = $user->id;
                            $result = $this->game->executeCommand($method, $params);
                            if ($result) {
                                $this->game->updateData($params->gameId); // записать измененные данные в БД
                            }
                            return ($result) ?
                                $this->good($this->game->getStruct()) :
                                $this->bad('game method return false');
                        }
                    }
                }
                return $this->bad('game does not exist');
            }
            return $this->bad('invalid token');
        }
        return $this->bad('method does not exist');
    }
}