var express = require('express');
const http = require('http');
var app = express();
const server = http.createServer(app);
// append sockets
const io = require('socket.io').listen(server);

const SETTINGS = require('./settings');
const DB = require('./application/modules/db/db');
const Mediator = require('./application/modules/Mediator');
const UserManager = require('./application/modules/user/UserManager');
const GameManager = require('./application/modules/game/GameManager');

const db = new DB(SETTINGS.DB);
const mediator = new Mediator(SETTINGS.MEDIATOR);
new UserManager({ mediator, db });
new GameManager({ mediator, db, io, SOCKET: SETTINGS.SOCKET });

// router
const Router = require('./application/router/Router');
const router = new Router({ mediator });
app.use(express.static(__dirname + '/public'));
app.use('/', router);

//app.listen(SETTINGS.PORT, () => console.log('Example app listening on port ' + SETTINGS.PORT + '!'));
server.listen(SETTINGS.PORT, () => {
	console.log(`Example app listening on port ${SETTINGS.PORT}!`);
});