const BaseModule = require('../BaseModule');
const Game = require('./Game');

class GameManager extends BaseModule {
    constructor(options) {
        super(options);
        this.game = new Game();
        this.mediator.subscribe(this.EVENTS.ADD_PLAYER, (nickname) => this.game.addPlayer(nickname));
        this.mediator.subscribe(this.EVENTS.DEL_PLAYER, (nickname) => this.game.delPlayer(nickname));
    }
}
module.exports = GameManager;