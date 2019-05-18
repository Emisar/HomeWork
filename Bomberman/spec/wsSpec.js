var io = require('socket.io-client');
var request = require('request');

const SETTINGS = require('../settings.js');
const SOCKET = SETTINGS.SOCKET;
const ADDRESS = 'http://localhost:5000';

function checkStartGame(login, hash) {
    it(`check start game user ${login}`, done => {
        var socket = io.connect(ADDRESS);
        socket.on('connect', () => {
            // сначала залогиниться
            request(ADDRESS + `/login/${login}/${hash}`, (error, response, body) => { // посылает запрос
                // послать запрос
                //socket.emit(SOCKET.START_GAME, { nickname: login });
            });
        });

        // слушать ответ
        socket.on(SOCKET.UPDATE_SCENE, data => {
            const { players, bombs, map } = data;
            expect(players[login]).toBeDefined();
            expect(bombs).toBeDefined();
            expect(map.length).toBeGreaterThan(0);
            expect(map[0].length).toBeGreaterThan(0);
            socket.close();
            done();
        });
    });
}

describe('basic socket.io example', () => {
    checkStartGame('bezbabnik', '7c4d3e6e46003006872ac04cef0c8c44');
    checkStartGame('vasya', '4a2d247d0c05a4f798b0b03839d94cf0');
});