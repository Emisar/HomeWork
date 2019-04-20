 const SETTINGS = {

    PORT: 5000, // номер порта сервера

    SOCKET: {
        UPDATE_SCENE: 'UPDATE_SCENE',
        GAMER_ACTION: 'GAMER_ACTION',
        GAMER_OVER: 'GAMER_OVER', // игрок помер
        START_GAME: 'START_GAME',
        SEND_MESSAGE: 'SEND_MESSAGE', //сообщение с клиента на сервер
        SEND_MESSAGE_TO_ALL: 'SEND_MESSAGE_TO_ALL' //послать сообщение с сервера на все клиенты
    }
};
export default SETTINGS;