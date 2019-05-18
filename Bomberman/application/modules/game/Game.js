const Player = require('./struct/Player');
const Bomb = require('./struct/Bomb');

class Game {

    constructor(options, callbacks) {
        this.GAMER_ACTION = options.GAMER_ACTION;
        this.BOMB_TIMESTAMP = options.BOMB_TIMESTAMP;
        this.GRASS_GROW_TIMESTAMP = options.GRASS_GROW_TIMESTAMP;
        this.MAP = options.MAP;
        this.players = {}; // массив игорьков
        this.bombs = {};   // Array of bombs
        this.map = this.genMap();
        let tick = 0;
        setInterval(() => {
            this.updateGame(++tick);
        }, 50);
        // коллбеки
        this.boomCallback = (callbacks && callbacks.boom instanceof Function) ? callbacks.boom : () => {};
        this.growCallback = (callbacks && callbacks.grow instanceof Function) ? callbacks.grow : () => {};
    }

    updateGame(tick) {
        // про рост травки
        if (tick % this.GRASS_GROW_TIMESTAMP === 0) {

            // вырасти всю травку на 1, кроме той, на которой стоит игрок
            for (let i = 0; i < this.map.length; i++) {
                for (let j = 0; j < this.map[i].length; j++) {
                    if (this.map[i][j] < 10) {
                        let isGrow = true;
                        for (let key in this.players) {
                            if (this.players[key].x === i &&
                                this.players[key].y === j) {
                                    isGrow = false;
                                    break;
                                }
                        }
                        for (let key in this.bombs) {
                            if (this.bombs[key].x === i &&
                                this.bombs[key].y === j) {
                                    isGrow = false;
                                    break;
                                }
                        }
                        if (isGrow) {
                            this.map[i][j]++;
                            if (this.map[i][j] === 10) {
                                this.growCallback();
                            }
                        }
                    }
                }
            }
            console.log(tick);

        }
        // про взрыв бомб
        const currentTime = (new Date()).getTime();
        for (let key in this.bombs) {
            let bomb = this.bombs[key];
            if (Math.abs(currentTime - bomb.timestamp) >= this.BOMB_TIMESTAMP){
                this.bombBoom(bomb);
                this.boomCallback();
            }
        }
    }

    genMap() {
        return this.MAP;
    }

    genCoord() {
        let count = 0;
        while (1) {
            const x = Math.round(Math.random() * (this.map[0].length - 1));
            const y = Math.round(Math.random() * (this.map.length - 1));
            if (this.map[y][x] < 10) {
                let flag = true;
                for (let key in this.players) {
                    const player = this.players[key];
                    if (x === player.x - 1 && y === player.y - 1) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    return { x, y };
                }
            }
            count++;
            if (count > 10000)  {
                return { x: 0, y: 0 };
            }
        }
    }

    getPlayer(nickname) {
        if (nickname) {
            return this.players[nickname];
        }
        return null;
    }

    getBomb(x, y) {
        if (x, y) {
            const key = "" + x + "and" + y + "";
            return this.struct.bombs[key];
        }
        return null;
    }

    addPlayer(nickname) {
        if (nickname) {
            const { x, y } = this.genCoord();
            if (x && y) {
                this.players[nickname] = new Player({ nickname, x: x, y: y });
                return true;
            }
        }
        return false;
    }

    delPlayer(nickname) {
        if (nickname && this.players[nickname]) {
            
            delete this.players[nickname];
            return true;
        }
        return false;
    }

    addBomb(player) {
        if (player) {
            const key = "" + player.x + player.y + "";
            this.bombs[key] = new Bomb({ owner: player.nickname, x: player.x, y: player.y, power: player.power});
            return true;
        }
        return false;
    }

    delBomb(x, y) {
        const key = ""+ x + y +"";
        if (this.bombs[key]) {
            delete this.bombs[key];
        }
    }

    isPassable(x, y) {
        const map = this.map;
        if (map[y - 1][x - 1] < 10) {
            return true;
        }
        return false;
    }

    isEmpty(x, y) {
        for (let key in this.players) {
            if (x === this.players[key].x && y === this.players[key].y) {
                return false;
            }
        }
        for (let key in this.bombs) {
            if (x === this.bombs[key].x && y === this.bombs[key].y) {
                return false;
            }
        }
        return true;
    }

    bombBoom(bomb) {
        const { x, y, power } = bomb;
        let isDeadPlayers = {};
        const mapWidth = this.map[0].length;
        const mapHeight = this.map.length;
        if (this.players[bomb.owner]) {
            this.players[bomb.owner].count += 1;
        }
        for (let i = 0; i <= power; i++) {
            for (let nickname in this.players) {
                let player = this.players[nickname];
                if ((player.x === x && player.y === y + i) || (player.x === x && player.y === y - i) ||
                    (player.x === x + i && player.y === y) || (player.x === x - i && player.y === y)) {
                    let key = "" + player.x + player.y + "";
                    isDeadPlayers[key] = player;    
                }
            }
        }
        // Взрыв в точке бомбы
        this.map[y - 1][x - 1] = 0;
        if (isDeadPlayers['' + x + y + '']) {
            this.delPlayer(isDeadPlayers['' + x + y + ''].nickname);
        }
        // Взрыв вниз от бомбы
        for (let i = 1; i <= power; i++) {
            if (y + i <= mapHeight) {
                if (this.map[y + i - 1][x - 1] < 10) {
                    this.map[y + i - 1][x - 1] = 0;
                } else if (this.map[y + i - 1][x - 1] === 10) {
                    this.map[y + i - 1][x - 1] = 0;
                    break;
                } else if (this.map[y + i - 1][x - 1] === 100) {
                    break;
                }
                const Y = y + i;
                const key = "" + x + Y + "";
                if (isDeadPlayers[key]) {
                    this.delPlayer(isDeadPlayers[key].nickname);
                }
                if (this.bombs[key]) {
                    this.bombs[key].isBoom = true;
                }
            }  else { break; } 
        }
        // Взрыв вверх от бомбы
        for (let i = 1; i <= power; i++) {
            if (y - i >= 1) {
                if (this.map[y - i - 1][x - 1] < 10) {
                    this.map[y - i - 1][x - 1] = 0;
                } else if (this.map[y - i - 1][x - 1] === 10) {
                    this.map[y - i - 1][x - 1] = 0;
                    break;
                } else {
                    break;
                }
                const Y = y - i;
                const key = "" + x + Y + "";
                if (isDeadPlayers[key]) {
                    this.delPlayer(isDeadPlayers[key].nickname);
                }
                if (this.bombs[key]) {
                    this.bombs[key].isBoom = true;
                }
            } else { break; } 
        }
        // Взрыв вправо от бомбы
        for (let i = 1; i <= power; i++) {
            if (x + i <= mapWidth) {
                if (this.map[y - 1][x + i - 1] < 10) {
                    this.map[y - 1][x + i - 1] = 0;
                } else if (this.map[y - 1][x + i - 1] === 10) {
                    this.map[y - 1][x + i - 1] = 0;
                    break;
                } else {
                    break;
                }
                const X = x + i;
                const key = "" + X + y + "";
                if (isDeadPlayers[key]) {
                    this.delPlayer(isDeadPlayers[key].nickname);
                }
                if (this.bombs[key]) {
                    this.bombs[key].isBoom = true;
                }
            } else { break; } 
        }
        // Взрыв влево от бомбы
        for (let i = 1; i <= power; i++) {
            if (x - i >= 1) {
                if (this.map[y - 1][x - i - 1] < 10) {
                    this.map[y - 1][x - i - 1] = 0;
                } else if (this.map[y - 1][x - i - 1] === 10) {
                    this.map[y - 1][x - i - 1] = 0;
                    break;
                } else {
                    break;
                }
                const X = x - i;
                const key = "" + X + y + "";
                if (isDeadPlayers[key]) {
                    this.delPlayer(isDeadPlayers[key].nickname);
                }
            } else { break; } 
        }
        this.delBomb(x, y);
    }

    action(nickname, action) {
        if (nickname && action) {
            this[action.method]({ nickname, action });
            return true;
        }
        return false;
    }

    moveHero(options) {
        const nickname = options.nickname;
        const direction = options.action.move;
        if (nickname && direction) {
            let player = this.getPlayer(nickname);
            if (player) {
                const mapWidth = this.map[0].length;
                const mapHeight = this.map.length;
                const x = player.x;
                const y = player.y;
                player.fov = direction;
                switch (direction) {
                    case 'DOWN': {
                        if (y + 1 <= mapHeight) {
                            if (this.isPassable(x, y + 1) && this.isEmpty(x, y + 1)) {
                                player.y++;
                                return true;           
                            }
                            return false;
                        }
                        return false;
                    }
                    case 'UP': {
                        if (y - 1 >= 1) {
                            if (this.isPassable(x, y - 1) && this.isEmpty(x, y - 1)) {
                                player.y--;
                                return true;           
                            }
                            return false;
                        }
                        return false;
                    }
                    case 'RIGHT': {
                        if (x + 1 <= mapWidth) {
                            if (this.isPassable(x + 1, y) && this.isEmpty(x + 1, y)) {
                                player.x++;
                                return true;           
                            }
                            return false;
                        }
                        return false;
                    }
                    case 'LEFT': {
                        if (x - 1 >= 1) {
                            if (this.isPassable(x - 1, y) && this.isEmpty(x - 1, y)) {
                                player.x--;
                                return true;           
                            }
                            return false;
                        }
                        return false;
                    }
                }
            }
            return false;
        }
        return false;
    }

    setBomb(options) {
        const nickname = options.nickname;
        if (nickname) {
            let player = this.getPlayer(nickname);
            if (player && player.count !== 0) {
                this.addBomb(player);
                player.count--;
                return true;
            }
            return false;
        }
        return false;
    }

    getScene() {
        return {
            players: this.players,
            bombs: this.bombs,
            map: this.map
        };
    }
}
module.exports = Game;