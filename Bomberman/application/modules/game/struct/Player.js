class Player {
    constructor(options) {
        this.nickname = options.nickname;
        this.x = options.x;
        this.y = options.y;
        this.fov = 'DOWN', // front of view
        this.power = 4; // boom power
        this.count = 1; // bomb max count to can placed
    }
}

module.exports = Player;