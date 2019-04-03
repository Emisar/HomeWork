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
            GET_USER: 'GET_USER'
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
        START_GAME: 'START_GAME'
    }
};
module.exports = SETTINGS;