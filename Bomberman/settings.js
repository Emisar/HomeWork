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
            GET_USERS: 'GET_USERS'
        },
        EVENTS: {
            ADD_PLAYER: 'ADD_PLAYER',
            DEL_PLAYER: 'DEL_PLAYER',
        }
    }

};
module.exports = SETTINGS;