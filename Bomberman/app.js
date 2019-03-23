var express = require('express');
var app = express();

const SETTINGS = require('./settings');
const DB = require('./application/modules/db/db');
const Mediator = require('./application/modules/Mediator');
const UserManager = require('./application/modules/user/UserManager');
const GameManager = require('./application/modules/game/GameManager');

const db = new DB(SETTINGS.DB);
const mediator = new Mediator(SETTINGS.MEDIATOR);
new UserManager({ mediator, db });
new GameManager({ mediator, db });

// router
const Router = require('./application/router/Router');
const router = new Router({ mediator });
app.use(express.static(__dirname + '/public'));
app.use('/', router);

app.listen(SETTINGS.PORT, () => console.log('Example app listening on port ' + SETTINGS.PORT + '!'));