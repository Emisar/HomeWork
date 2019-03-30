class Player {
    constructor(options) {
        this.nickname = options.nickname;
        this.x = options.x;
        this.y = options.y;
        this.fov = 'down', // front of view
        this.power = 1; // boom power
        this.count = 1; // bomb max count to can placed
    }
}

module.exports = Player;