const BaseModule = require('../BaseModule');
const Game = require('./Game');

class GameManager extends BaseModule {
    constructor(options) {
        super(options);
        this.game = new Game();
        this.mediator.subscribe(this.EVENTS.ADD_PLAYER, (nickname) => this.game.addPlayer(nickname));
        this.mediator.subscribe(this.EVENTS.DEL_PLAYER, (nickname) => this.game.delPlayer(nickname));
    }

    async starGameAgain(options) {
        if (options.token && options.answer) {
            const { token, answer } = options;
            if (answer == true) {
                const user = await this.db.getUserByToken(token);
                this.game.addPlayer(user.nickname);
            } else {
                //Exit from game
            }    
        }
    }
}
module.exports = GameManager;