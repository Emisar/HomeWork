var Human = require('./Human');

class Man extends Human {
    constructor(fullness, energy) {
        super(fullness, energy);
        this.sex = 'male';
    }

    // Кодить
    codding(hours) {
        if (hours * 20 > this.energy || hours * 10 > this.fullness) {
            console.log('Error! You can die!');
        } else {
            this.energy -= hours * 20;
            this.fullness -= hours * 10;
            console.log('You codding by ' + hours + ' hours');
        }
    }
}

module.exports = Man;