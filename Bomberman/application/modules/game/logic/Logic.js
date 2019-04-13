
class Logic {

    constructor(struct, callbacks) {
        this.struct = struct;
        this.addBombCallBack = (callbacks.addBomb instanceof Function) ? callbacks.addBomb : () => {};
        this.delBombCallBack = (callbacks.delBomb instanceof Function) ? callbacks.delBomb : () => {};
    }

    //Вспомогательные методы 

    getBomb(x, y) {
        const key = "" + x + y + "";
        return this.struct.bombs[key];
    }

    getPlayer(nickname) {
        return this.struct.players[nickname];
    }

    isPassable(x, y) {
        let map = this.struct.map;
        if (map[y - 1][x - 1] < 10) {
            return true;
        }
        return false;
    }

    isEmpty(x, y) {
        for (key in struct.players) {
            if (x === this.struct.players[key].x && y === this.struct.players[key].y) {
                return false;
            }
        }
        for (key in struct.bombs) {
            if (x === this.struct.bombs[key].x && y === this.struct.bombs.y) {
                return false;
            }
        }
        return true;
    }

    isBooms() {
        if (this.struct.bombs) {
            for (const key in this.struct.bombs) {
                let bomb = this.struct.bombs[key];
                if (bomb.isBoom) {
                    //this.delBombCallBack({ x: bomb.x, y: bomb.y });
                } 
            }
        }
    }

    // Основные методы

    moveHero(options) {
        const { nickname, direction } = options;
        if (nickname && direction) {
            let player = this.getPlayer(nickname);
            if (player) {
                const mapWidth = struct.map[0].length;
                const mapHeight = struct.map.length;
                player.fow = direction;
                switch (direction) {
                    case 'UP': {
                        if (this.isPassable(player.x, player.y + 1) && player.y + 1 <= mapHeight && this.isEmpty(x, y + 1)) {
                            player.y++;
                            return true;           
                        }
                        return false;
                    }
                    case 'DOWN': {
                        if (this.isPassable(player.x, player.y - 1) && player.y - 1 >= 1 && this.isEmpty(x, y - 1)) {
                            player.y--;
                            return true;           
                        }
                        return false;
                    }
                    case 'RIGHT': {
                        if (this.isPassable(player.x + 1, player.y) && player.x + 1 <= mapWidth && this.isEmpty(x + 1, y)) {
                            player.x++;
                            return true;           
                        }
                        return false;
                    }
                    case 'LEFT': {
                        if (this.isPassable(player.x - 1, player.y) && player.x - 1 >= 1 && this.isEmpty(x - 1, y)) {
                            player.x--;
                            return true;           
                        }
                        return false;
                    }
                }
            }
            return false;
        }
        return false;
    }

    setBomb(nickname) {
        if (nickname) {
            console.log('222');
            let player = this.getPlayer(nickname);
            console.log(this.struct);
            if (player && player.count !== 0) {
                const x = player.x;
                const y = player.y;
                this.addBombCallBack({ owner: player.nickname, x: player.x, y: player.y, power: player.power, timer: 5000 });
                this.boomBomb(getBomb(x, y));
                return true;
            }
            return false;
        }
        return false;
    }

}
module.exports = Logic;