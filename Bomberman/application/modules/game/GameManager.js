const BaseModule = require('../BaseModule');
const Game = require('./Game');
const Logic = require('./logic/Logic');

class GameManager extends BaseModule {
    constructor(options) {
        super(options);
        this.game = new Game();
        this.mediator.subscribe(this.EVENTS.ADD_BOMB, (options) => this.game.addBomb(options));
        this.mediator.subscribe(this.EVENTS.DEL_BOMB, (options) => this.game.delBomb(options));
        this.mediator.subscribe(this.EVENTS.ADD_PLAYER, (nickname) => { 
            this.game.addPlayer(nickname);
            this.logic.setBomb(nickname); 
            this.io.emit(SOCKET.UPDATE_SCENE, this.game.getScene());
        });
        this.mediator.subscribe(this.EVENTS.DEL_PLAYER, (nickname) => this.game.delPlayer(nickname));

        this.logic = new Logic(this.game.getScene(), {
            addBomb: this.game.addBomb,
            delBomb: this.game.delBomb
        });

        const sockets = {};
        const SOCKET = options.SOCKET;
        const LOGIC = options.LOGIC;
        
        setInterval(() => {
            console.log(this.game.bombs);
            if (this.game.isSceneChanged) {
                this.game.isSceneChanged = false;
                console.log('Обновить');
                this.io.emit(SOCKET.UPDATE_SCENE, this.game.getScene());
            }
        }, 1000);

        if (!this.io) { return; }
        this.io.on('connection', socket => { 
            console.log('client connect', socket.id);
            socket.on(SOCKET.START_GAME, (data) => {
                if (data && data.nickname) {
                    const user = this.mediator.get(this.TRIGGERS.GET_USER, nickname);
                    if (user) {
                        sockets[socket.id] = user;
                        socket.emit(SOCKET.UPDATE_SCENE, this.game.getScene());
                        socket.on(SOCKET.GAMER_ACTION, (data) => {
                            if (data) {
                                const token = data.token;
                                if (token) {
                                    switch (data.action) {
                                        case LOGIC.MOVE_HERO: {
                                            this.logic.moveHero(data); //Отправлять никнейм
                                            break;
                                        }
                                        case LOGIC.SET_BOMB: {
                                            this.logic.setBomb(data); // Отправлять никнейм
                                            break;
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            });

            socket.on('disconnect', async () => {
                delete sockets[socket.id];
				console.log('disconnect', socket.id);
            });
        });
    }
     
    // addBombCallBack(options) {
    //     this.mediator.call(this.EVENTS.ADD_BOMB, options);
    // }
    // delBombCallBack(options) {
    //     this.mediator.call(this.EVENTS.DEL_BOMB, options);
    // }

}
module.exports = GameManager;