class Bomb {
    constructor(options) {
        this.owner = options.owner;
        this.x = options.x;
        this.y = options.y;
        this.power = options.power;
        this.timestamp = (new Date()).getTime();
    }
}

module.exports = Bomb;