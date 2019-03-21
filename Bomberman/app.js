var express = require('express');
var app = express();

const SETTINGS = require('./settings');
const Mediator = require('./application/modules/Mediator');
const UserManager = require('./application/modules/user/UserManager');
const DB = require('./application/db/db');

const db = new DB(SETTINGS.DB);
const mediator = new Mediator(SETTINGS.MEDIATOR);
new UserManager({ mediator, db });

// router
const Router = require('./application/router/Router');
const router = new Router({ mediator });
app.use(express.static(__dirname + '/public'));
app.use('/', router);

app.listen(5000, () => console.log('Example app listening on port 5000!'));