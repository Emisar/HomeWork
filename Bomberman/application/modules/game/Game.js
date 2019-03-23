const Player = require('./struct/Player');

class Game {

    constructor() {
        this.players = {}; // массив игорьков
        this.map = this.genMap();;
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
      const OK=false;
        while (OK==false){
            const x = Math.round(Math.random * 5);
            const y = Math.round(Math.random * 5);
            if(map[x,y]<10) {
                players.forEach(player => {
                    if(player.x!=x && player.y!=y ){
                        OK=true;
                        return { x: x, y: y };
                    }
                });
            }   
        }

    }

    addPlayer(nickname) {
        const { x, y } = this.genCoord();
        this.players[nickname] = new Player({ nickname, x, y });

        console.log(this.players);

        return this.players[nickname];
    }

    delPlayer(nickname) {
        if (nickname && this.players[nickname]) {
            delete this.players[nickname];

            console.log(this.players);
        }
    }

}
module.exports = Game;