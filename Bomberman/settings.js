SETTINGS = {

    PORT: 5000,

    DB: {
        USERNAME: '',
        PASSWORD: '',
        HOST: '',
        NAME: 'bomberman.db'
    },

    MEDIATOR: {
        TRIGGERS: {
            START_GAME_AGAIN: 'START_GAME_AGAIN',
            USER_LOGIN: 'USER_LOGIN',
            USER_LOGOUT: 'USER_LOGOUT',
            GET_USERS: 'GET_USERS',
            GET_USER: 'GET_USER',
            GET_USER_BY_TOKEN: 'GET_USER_BY_TOKEN'
        },
        EVENTS: {
            ADD_PLAYER: 'ADD_PLAYER',
            DEL_PLAYER: 'DEL_PLAYER',
            ADD_BOMB: 'ADD_BOMB',
            DEL_BOMB: 'DEL_BOMB'
        }
    },

    SOCKET: {
        UPDATE_SCENE: 'UPDATE_SCENE',
        GAMER_ACTION: 'GAMER_ACTION',
        GAMER_OVER: 'GAMER_OVER', // игрок помер
        START_GAME: 'START_GAME',
        SEND_MESSAGE: 'SEND_MESSAGE', //сообщение с клиента на сервер
        SEND_MESSAGE_TO_ALL: 'SEND_MESSAGE_TO_ALL' //послать сообщение с сервера на все клиенты
    },

    GAME: {
        GAMER_ACTION: {
            MOVE_HERO: 'MOVE_HERO',
            SET_BOMB: 'SET_BOMB',
        },
        MAP: [
            [ 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11],
            [ 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11],
            [ 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11 ],
            [ 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11],
            [ 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11 ],
            [ 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11],
            [ 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11 ],
            [ 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11],
            [ 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11 ],
            [ 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11],
            [ 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11 ],
            [ 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11],
            [ 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11 ],
            [ 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11, 100, 1, 100, 11],
            [ 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11, 1, 11 ],
                    
        ],
        BOMB_TIMESTAMP: 3000,
        GRASS_GROW_TIMESTAMP: 20 * 5,
    }
};
module.exports = SETTINGS;