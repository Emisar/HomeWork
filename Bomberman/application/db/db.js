const sqlite3 = require("sqlite3").verbose();

class db {
    constructor(options) {
        this.db = new sqlite3.Database(__dirname + '\\' + options.NAME);
    } 
    // Устанавливает токен 
    setUserToken(nickname, token) {
        return new Promise(resolve => {
            const query = 'UPDATE users SET token = ? WHERE nickname = ?';
            this.db.run(query, [token, nickname], err => { resolve(!(err)); });
        });
    }
    // Регистрирует пользователя 
    userRegistration(nickname, password) {
        return new Promise(resolve => {
            if (nickname && password) {
                const query = 'INSERT INTO users (nickname, password) VALUES ("' + nickname + '", "' + password + '")';
                this.db.get(query, err => { resolve(!(err)); });
            } else {
                resolve(null);
            }
        });
    }
    // Дает пользователя 
    getUser(nickname) {
        return new Promise(resolve => {
            if (nickname) {
                this.db.serialize(() => {
                    const query = 'SELECT * FROM users WHERE nickname = ?';
                    this.db.get(query, [nickname], (err, rows) => { resolve((err) ? null : rows); });
                });
            } else {
                resolve(null);
            }
        })
    }

}
module.exports = db;