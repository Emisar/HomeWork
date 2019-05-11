const SETTINGS = require('../settings.js');
const SOCKET = SETTINGS.SOCKET;

var io = require('socket.io-client');
//  , io_server = require('socket.io').listen(SETTINGS.PORT);

describe('basic socket.io example', function() {

    var socket;
  
    beforeEach(done => {
        // Setup
        socket = io.connect('http://localhost:' + SETTINGS.PORT, {
            'reconnection delay': 0,
            'reopen delay': 0, 
            'force new connection': true, 
            transports: ['websocket']
        });
        socket.on('connect', () => done());
        socket.on('disconnect', () => {});
    });
  
    afterEach(done => {
        if(socket.connected) {
            socket.disconnect();
        }
        done();
    });
  
    it('some test', done => {
        // сначала авторизоваться под Васей
        //...
        // послать запрос на старт игры
        socket.emit(SOCKET.START_GAME, { nickname: 'vasya' });
        // ожидать ответа с сервера на изменение сцены
        socket.once(SOCKET.UPDATE_SCENE, message => {
            expect(message).to.equal('Hello World');
            done();
        });
    });
});