const BaseModule = require('../BaseModule');
const User = require('./User');
const md5 = require('md5');

class UserManager extends BaseModule {

    constructor(options) {
        super(options);
        this.users = {};
        this.mediator.set(this.TRIGGERS.USER_LOGIN, data => this.login(data));
        this.mediator.set(this.TRIGGERS.USER_LOGOUT, data => this.logout(data));
        this.mediator.set(this.TRIGGERS.GET_USERS, data => this.getUsers(data));
    }

    getUsers() {
        return this.users;
    }
    
    async login(options) {
        const { nickname, password } = options;
        const user = await this.db.getUser(nickname);
        if (user) {
            if (user.password === password) {
                const token = md5(Math.random() * 1000000);
                this.users[nickname] = user;
                this.users[nickname].token = token;
                this.db.setUserToken(nickname, this.users[nickname].token);
                this.mediator.call(this.EVENTS.ADD_PLAYER, nickname);
                return { token };
            }
            return null
        } else {
            this.db.userRegistration(options.nickname, options.password);
            return true;
        }
    }

    async logout(nickname) {
        if (nickname && this.users[nickname]) {
            this.db.setUserToken(nickname, null);
            delete this.users[nickname];
            this.mediator.call(this.EVENTS.DEL_PLAYER, nickname);
            return true;
        }
        return null;
    }
}
module.exports = UserManager;