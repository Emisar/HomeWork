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
        }
    },

    SOCKET: {
        UPDATE_SCENE: 'UPDATE_SCENE',
        GAMER_ACTION: 'GAMER_ACTION',
        GAMER_OVER: 'GAMER_OVER', // игрок помер
        START_GAME: 'START_GAME',
        SEND_MESSAGE: 'SEND_MESSAGE', //сообщение с клиента на сервер
        SEND_MESSAGE_TO_ALL: 'SEND_MESSAGE_TO_ALL' //послать сообщение с сервера на все клиенты
    }
};
module.exports = SETTINGS;