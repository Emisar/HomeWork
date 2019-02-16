class Human {
    constructor(fullness, happiness) {
        this.happiness = happiness ?  happiness : 6;
        this.fullness = fullness ? fullness : 10;
    }

    static sex(boy, girl) {
        if (boy.happiness >= 5 && girl.happiness > 5) {
            boy.happiness += 2;
            boy.fullness -= 10;
            girl.happiness += 10;
            girl.fullness -= 1;
            return Math.random() > 0.5;
        } 
    }

    eat(value) {
        this.fullness += value;
        this.happiness = value ? this.happiness++ : this.happiness--;
    }
}

module.exports = Human;