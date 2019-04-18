const BaseModule = require('../BaseModule');

class ChatManager extends BaseModule {

    constructor(options) {
        super(options);
        const SOCKET = options.SOCKET;
        if (!this.io) { return; }
        this.io.on('connection', socket => { 
            
            socket.on(SOCKET.SEND_MESSAGE, (data) => {
                
                if (data && data.message && data.token) {
                    const user = this.mediator.get(this.TRIGGERS.GET_USER_BY_TOKEN, data.token);
                    if (user) {
                        const message = data.message;
                        const nickname = user.nickname
                        this.io.emit(SOCKET.SEND_MESSAGE_TO_ALL, { message, nickname });
                    }
                }
            });

            socket.on('disconnect', async () => {
				
            });
        });

    }
    
    
}
module.exports = ChatManager;