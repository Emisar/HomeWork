const BaseModule = require('../BaseModule');
const Game = require('./Game');

class GameManager extends BaseModule {
    constructor(options) {
        super(options);
        this.game = new Game();
        this.mediator.subscribe(this.EVENTS.ADD_PLAYER, (nickname) => { 
            this.game.addPlayer(nickname); 
            this.io.emit(SOCKET.UPDATE_SCENE, this.game.getScene());
        });
        this.mediator.subscribe(this.EVENTS.DEL_PLAYER, (nickname) => this.game.delPlayer(nickname));

        const sockets = {};
        const SOCKET = options.SOCKET;
        if (!this.io) { return; }
        this.io.on('connection', socket => { 

            console.log('client connect', socket.id);

            socket.on(SOCKET.START_GAME, (data) => {
                if (data && data.nickname) {
                    const user = this.mediator.get(this.TRIGGERS.GET_USER, nickname);
                    if (user) {
                        sockets[socket.id] = user;
                    }
                }
            });

            socket.on('priv', (text) => {
                console.log(text);
                socket.emit('answer', ('ВАМ ПЕРСОНАЛЬНЫЙ ПРИВЕТ ОТ СЕРВЕРА! КАК ВЫ ТАМ, В 2К19?? ' + text))
            })

            socket.on('disconnect', async () => {
                delete sockets[socket.id];
				console.log('disconnect', socket.id);
			});            
        });
    }

    async starGameAgain(options) {
        if (options.token && options.answer) {
            const { token, answer } = options;
            if (answer == 'true') {
                const user = await this.db.getUserByToken(token);
                this.game.addPlayer(user.nickname);
                console.log(this.game.players[user.nickname]);
            } else if (answer == 'false') {
                //Exit from game
                console.log('exit');
            }    
        }
    }
}
module.exports = GameManager;