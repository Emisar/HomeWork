<?php

require_once '..\application\game\Game.php';
require_once '..\application\db\DB.php';

class Router {

    private $game;
    private $db;

    public function __construct() {
        $this->db = new DB();
        $this->game = new Game($this->db);
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

    public function answer($params) {
        $method = $params['method'];
        if ($method) {
            // вызвать команду игры
            $commands = $this->game->getCommands();
            if ($method == $commands->GET_STRUCT) {
                return $this->good($this->game->getStruct());
            }
            foreach ($commands as $command) {
                if ($command === $method) {
                    unset($params['method']);
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