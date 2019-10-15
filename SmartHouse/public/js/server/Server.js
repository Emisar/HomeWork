class Server {

    token = null;

    async send(method, data) {
        const arr = [];
        for (let key in data) {
            arr.push(data[key]);
        }
        const response = await fetch(`/api/${method}/${arr.join('/')}`);
        const answer = await response.json();
        return answer && answer.result === 'ok' ? answer.data : false;
    }

    async login(login, password) {
        const hash = md5(login + password);
        const token = await this.send('login', { login, hash });
        if (token) {
            this.token = token;
        }
        return token;
    }

    logout() {
        return this.send('logout', { token: this.token })
    }

}