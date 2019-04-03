class Bomb {
    constructor(options) {
        this.owner = options.owner;
        this.x = options.x;
        this.y = options.y;
        this.timer = options.timer;
        this.power = options.power;
    }
}

module.exports = Bomb;