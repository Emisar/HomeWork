const express = require('express');
const router = express.Router();
const BaseRouter = require('./BaseRouter');

function Router(options) {
    const mediator = options.mediator;
    const TRIGGERS = mediator.getTriggers();
    const answer = new BaseRouter();

    router.get('/getUsers', (req, res) => {
        const result = mediator.get(TRIGGERS.GET_USERS, null);
        res.send(result ? answer.good(result) : answer.error(101));
    });

    router.get('/login/:nickname/:password', (req, res) => {
        var nickname = req.params.nickname;
        var password = req.params.password;
        const result = mediator.get(TRIGGERS.USER_LOGIN, { nickname, password });
        res.send(result ? answer.good(result) : answer.error(323));
    });
    
    router.get('/logout/:nickname', (req, res) => {
        var nickname = req.params.nickname;
        const result = mediator.get(TRIGGERS.USER_LOGOUT, nickname);
        res.send(result ? answer.good(result) : answer.error(324));
    });
    
    // Ошибочный api
    router.all('/*', (req, res) => res.send(answer.error(404)));
	return router;
}
module.exports = Router;