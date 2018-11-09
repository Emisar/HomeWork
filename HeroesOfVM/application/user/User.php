<?php

class User {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function login($options) {
        if ($options && isset($options->login) && isset($options->password)) {
            $user = $this->db->getUser($options->login, $options->password);
            if ($user) {
                $token = md5($user->login . rand(0, 50000));
                if ($this->db->updateUserToken($user->id, $token)) {
                    return (object) ['name' => $user->name, 'token' => $token];
                }
            }
        }
        return null;
    }

    public function logout($options = null) {
        if ($options && isset($options->token)){
            $user = $this->db->getUserByToken($options->token);
            if ($user){
                if ($this->db->updateUserToken($user->id, '')){
                    return true;
                }
            }
        }
        return null;
    }

    public function checkToken($options = null) {
        if ($options && isset($options->token)) {
            return $this->db->getUserByToken($options->token);
        }
        return null;
    }
}