<?php

require_once '..\application\db\DB.php';
require_once '..\application\game\Game.php';
require_once '..\application\user\User.php';

class Router {

    private $user;
    private $game;
    private $db;

    public function __construct() {
        $this->db = new DB();
        $this->game = new Game($this->db);
        $this->user = new User($this->db);
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

    public function answer($params) {
        $method = $params['method'];
        if ($method) {
            unset($params['method']);
            // вызвать методы АПИ
            if ($this->{$method} && is_callable($this->{$method})) {
                return $this->{$method}((object) $params);
            }
            // вызвать команду игры
            $commands = $this->game->getCommands();
            if ($method == $commands->GET_STRUCT) {
                return $this->good($this->game->getStruct());
            }
            foreach ($commands as $command) {
                if ($command === $method) {
                    if ($this->user->checkToken($params)) {
                        $result = $this->game->executeCommand($method, (object) $params);
                        return ($result) ?
                            $this->good($this->game->getStruct()) :
                            $this->bad('game method return false');
                    }
                    return $this->bad('invalid token');
                }
            }
        }
        return $this->bad('method does not exist');
    }
}