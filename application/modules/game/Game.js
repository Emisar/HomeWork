const Player = require('./struct/Player');

class Game {

    constructor() {
        this.players = {}; // массив игорьков
        this.map = this.genMap();
    }

    genMap() {
        return [
            [ 1,   2, 1,   3, 1],
            [10, 100, 1, 100, 1],
            [10,   3,10,   1, 5],
            [10, 100, 1, 100,10],
            [ 1,   2, 2,  10, 1]
        ];
    }

    genCoord() {
        const ok = false;
        while (ok == false) {
            const x = Math.round(Math.random() * this.map[0].length);
            const y = Math.round(Math.random() * this.map.length);
            console.log(x, y);
            if (10 > this.map[y - 1][x - 1]) {
                if (this.players.length > 0) {
                    this.players.forEach(player => {
                        if (x != player.x && y != player.y) {
                            return { x, y };
                        }
                    });
                } else {
                    return { x, y };
                }
            }
        }

    }

    addPlayer(nickname) {
        const { x, y } = this.genCoord();
        this.players[nickname] = new Player({ nickname, x, y });
        return this.players[nickname];
    }

    delPlayer(nickname) {
        if (nickname && this.players[nickname]) {
            delete this.players[nickname];
        }
    }

}
module.exports = Game;