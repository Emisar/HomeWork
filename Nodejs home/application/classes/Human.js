class Human {
    constructor(fullness, energy) {
        this.fullness = fullness ? fullness : 100;
        this.energy = energy ? energy : 100;
    }

    eat(value) {
        this.fullness += value;
    }

    sleep(hours) {
        this.energy += hours * 5;
    }

    status() {
        return {
            Energy: this.energy, 
            Fullness: this.fullness
        };
    }

    static pare(man, woman) {
        return {
            Man: man,
            Woman: woman
        };
    }
}

module.exports = Human;