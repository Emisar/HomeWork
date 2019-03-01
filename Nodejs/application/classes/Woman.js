var Human = require('./Human');

class Woman extends Human {
    constructor(fullness, energy) {
        super(fullness, energy);
        this.sex = 'female';
    }

    // Прихорашиваться
    prink(hours) {
        if (hours * 10 > this.energy || hours * 10 > this.fullness) {
            console.log('Error! You can die!');
        } else {
            this.energy -= hours * 10;
            this.fullness -= hours * 10;
            console.log('You prinking by ' + hours + ' hours');
        }
    }
}

module.exports = Woman;