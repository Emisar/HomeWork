function Server() {
    var idUser;
    this.getUserId = function() {
        return idUser;
    };
    var token;
    var gameId;
    // User API
    this.login = async (login, password) => {
        const result = await $.get('api/', { method: 'login', login, password });
        if (result && result.result) {
            token = result.data.token;
            idUser = result.data.id;
            return result.data.name;
        }
        return null;
    };

    this.logout = () => {
        return $.get('api/', { method: 'logout', token });
    };

    // Offer API
    this.findGame = async () => {
        const result = await $.get('api/', { method: 'findGame', token });
        if (result && result.result) {
            gameId = result.data.id - 0;
            return true;
        }
        return null;

    };

    this.createGame = async () => {
        const result = await $.get('api/', { method: 'createGame', token });
        if (result && result.result) {
            gameId = result.data.id - 0;
            return true;
        }
        return null;
    };

    // Game API
    this.getStruct = () => { return $.get('api/', { method: 'getStruct', token, gameId }); };
    this.endTurn   = () => { return $.get('api/', { method: 'endTurn'  , token, gameId }); };
    this.moveHero = (heroId, direction) => { return $.get('api/', { method: 'moveHero', heroId, direction, token, gameId }); };
    this.equipArtifact = (idHero, idArtifact) => { return $.get('api/', { method: 'equipArtifact', idArtifact, idHero, token, gameId }); };
}