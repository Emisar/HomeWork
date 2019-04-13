class Bomb {
    constructor(options) {
        this.owner = options.owner;
        this.x = options.x;
        this.y = options.y;
        this.timer = options.timer;
        this.power = options.power;
        this.isBoom = false;

        setTimeout(() => {
            this.isBoom = true;
        }, 5000);
    }
}

module.exports = Bomb;