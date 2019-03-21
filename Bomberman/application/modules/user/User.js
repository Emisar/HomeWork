class User {
    constructor(options) {
        this.id = options.id;
        this.nickname = options.nickname;
        this.password = options.password;
        this.token = options.token;
    }
}
module.exports = User;