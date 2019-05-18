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
        this.mediator.set(this.TRIGGERS.GET_USER, nickname => this.getUser(nickname));
        this.mediator.set(this.TRIGGERS.GET_USER_BY_TOKEN, token => this.getUserByToken(token));
    }
    
    getUser(nickname) {
        return (nickname && this.users[nickname]) ? this.users[nickname] : null;
    }

    getUserByToken(token) {
        if (token) {
            for (let key in this.users) {             
                if (this.users[key].token === token) {
                    return this.users[key];
                }
            }
        }
        return null;
    }

    async login(options) {
        const { nickname, hash } = options;
        const user = await this.db.getUserByNickname(nickname);
        if (user) {
            if (user.password === hash) {
                const token = md5(Math.random() * 1000000);
                this.users[nickname] = user;
                this.users[nickname].token = token;
                this.db.setUserToken(nickname, this.users[nickname].token);
                this.mediator.call(this.EVENTS.ADD_PLAYER, nickname);
                return { token };
            }
            return null
        } else {
            this.db.userRegistration(options.nickname, options.hash);
            return true;
        }
    }

    async logout(token) {
        const user = await this.db.getUserByToken(token);
        if (token && user) {
            this.db.setUserToken(user.nickname, null);
            delete this.users[user.nickname];
            this.mediator.call(this.EVENTS.DEL_PLAYER, user.nickname);
            return true;
        }
        return null;
    }
}
module.exports = UserManager;