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

    getUsers(data) {
        return this.users;
    }

    registration(nickname) {
        if (!localStorage.getItem(nickname)) {
            this.users[nickname] = new User({nickname: nickname, token: null});
            localStorage.setItem(nickname, JSON.stringify(this.users[nickname]));
            return this.users[nickname];
        }
        return null;
    }

    login(nickname) {
        if (JSON.parse(localStorage.getItem(nickname))) {
            this.users[nickname].token = md5(nickname);
            localStorage.setItem(nickname, JSON.stringify(this.users[nickname]));
            return this.users[nickname];
        }
        return null;
    }

    logout(nickname) {
        if (JSON.parse(localStorage.getItem(nickname)) && JSON.parse(localStorage.getItem(nickname)).token == this.users[nickname].token) {
            this.users[nickname].token = md5(nickname);
            localStorage.setItem(nickname, JSON.stringify(this.users[nickname]));
            return this.users[nickname];
        }
        return null;
    }
}
module.exports = UserManager;