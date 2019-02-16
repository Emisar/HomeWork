const Human = require('./human');

class Woman extends Human {
    constructor(fullness, beauty) {
        super(fullness);
        this.beauty = beauty ? beauty : 10;
    }
    
    eat(value) {
        this.fullness += value / 2;
    }
}

module.exports = Woman;