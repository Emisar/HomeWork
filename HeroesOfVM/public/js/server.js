function Server() {

    let token;

    this.login = async (login, password) => {
        const result = await $.get('api', { method: 'login', login, password });
        if (result && result.result) {
            token = result.data.token;
            return result.data.name;
        }
        return null;
    }

    this.getStruct = () => { return $.get('api', { method: 'getStruct', token }) };

    this.endTurn = function (id) {
        return $.get('api', { method: 'endTurn', id, token });
    };
}