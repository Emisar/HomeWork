<?php

require_once '..\application\game\Game.php';

class Router {

    private $game;

    public function __construct() {
        $params = new stdClass();
        $params->gamers = [
            (object) array ('id'=>1, 'order' => 1),
            (object) array ('id'=>2, 'order' => 0)
        ];
        $this->game = new Game($params);
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