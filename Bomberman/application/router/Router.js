const express = require('express');
const router = express.Router();
const BaseRouter = require('./BaseRouter');

function Router(options) {
    const mediator = options.mediator;
    const TRIGGERS = mediator.getTriggers();
    const answer = new BaseRouter();



    router.get('/startGameAgain', (req, res) => {
        var token = req.params.token;
        var answer = req.param.aswer;
        const result = await mediator.get(TRIGGERS.START_GAME_AGAIN, { token, answer });
        res.send(result ? answer.good(result) : answer.error(325));
    });

    router.get('/login/:nickname/:hash', async (req, res) => {
        var nickname = req.params.nickname;
        var hash = req.params.hash;
        const result = await mediator.get(TRIGGERS.USER_LOGIN, { nickname, hash });
        res.send(result ? answer.good(result) : answer.error(323));
    });
    
    router.get('/logout/:token', (req, res) => {
        var token = req.params.token;
        const result = mediator.get(TRIGGERS.USER_LOGOUT, token);
        res.send(result ? answer.good(result) : answer.error(324));
    });
    
    // Ошибочный api
    router.all('/*', (req, res) => res.send(answer.error(404)));
	return router;
}
module.exports = Router;