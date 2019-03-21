const BaseModule = require('../BaseModule');
const User = require('./User');
const md5 = require('md5');
const LocalStorage = require('node-localstorage').LocalStorage;

localStorage = new LocalStorage('./localStorage');

class UserManager extends BaseModule {

    constructor(options) {
        super(options);
        this.users = {};
        this.mediator.set(this.TRIGGERS.USER_REGISTER, data => this.registration(data));
        this.mediator.set(this.TRIGGERS.USER_LOGIN, data => this.login(data));
        this.mediator.set(this.TRIGGERS.USER_LOGOUT, data => this.logout(data));
        this.mediator.set(this.TRIGGERS.GET_USERS, data => this.getUsers(data));
    }

    async setUsers() {
        this.users = await this.db.getUsers();
        return this.users;
    }

    getUsers() {
        return this.users;
    }
    
    async login(options) {
        const user = await this.db.getUser(options.nickname);
        if (user) {
            if (user.password == options.password && user.token == null) {
                this.users[options.nickname] = user; 
                this.users[options.nickname].token = md5(options.nickname + options.password);
                this.db.setUserToken(options.nickname, this.users[options.nickname].token);
                return true;
            }
            return null
        } else {
            this.db.userRegistration(options.nickname, options.password);
            return true;
        }
    }

    async logout(nickname) {
        if (nickname) {
            this.db.setUserToken(nickname, null);
            delete this.users[nickname];
            return true;
        }
        return null;
    }
}
module.exports = UserManager;