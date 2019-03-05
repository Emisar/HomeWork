const BaseModule = require('../BaseModule');
const User = require('./User');

class UserManager extends BaseModule {

    constructor(options) {
        super(options);
        this.users = {};

        this.mediator.set(this.TRIGGERS.USER_REGISTER, data => this.registration(data));
        this.mediator.set(this.TRIGGERS.USER_LOGIN, data => this.login(data));
        this.mediator.set(this.TRIGGERS.USER_LOGOUT, data => this.logout(data));
        this.mediator.set(this.TRIGGERS.GET_USERS, data => this.getUsers(data));
    }

    getUsers(data) {
        return this.users;
    }

    registration(nickname) {
        if (!this.users[nickname]) {
            this.users[nickname] = new User({nickname: nickname, token: null});
            return this.users[nickname];
        }
        return null;
    }

    login(nickname) {
        if (this.users[nickname]) {
            this.users[nickname].token = Math.random(0, 50000);
            return this.users[nickname].token;
        }
        return null;
    }

    logout(nickname) {
        if (this.users[nickname]) {
            this.users[nickname].token = null;
            return this.users[nickname];
        }
        return null;
    }
}
module.exports = UserManager;