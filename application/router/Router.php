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
        $token = $this->user->login((object) $params);
        return ($token) ?
            $this->good($token) :
            $this->bad('authorization fail');
    }

    public function answer($params) {
        $method = $params['method'];
        if ($method) {
            unset($params['method']);
            // вызвать методы АПИ
            switch ($method) {
                case 'login': return $this->login($params); break;
                //...
            }
            // вызвать команду игры
            $commands = $this->game->getCommands();
            if ($method == $commands->GET_STRUCT) {
                return $this->good($this->game->getStruct());
            }
            foreach ($commands as $command) {
                if ($command === $method) {
                    $result = $this->game->executeCommand($method, (object) $params);
                    return ($result) ?
                        $this->good($this->game->getStruct()) :
                        $this->bad('game method return false');
                }
            }
            // вызвать другие команды
            //...
        }
        return $this->bad('method does not exist');
    }
}