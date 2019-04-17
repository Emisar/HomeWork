class Mediator {

    constructor(options) {
        // triggers
        this.TRIGGERS = options.TRIGGERS;
        this.triggers = {};
        for (let key in this.TRIGGERS) {
            this.triggers[key] = function () { return null; };
        }
        // events
        this.EVENTS = options.EVENTS;
        this.events = {};
        for (let key in this.EVENTS) {
            this.events[key] = [];
        }
    }

    // вернуть типы триггеров
    getTriggers() {
        return this.TRIGGERS;
    }
    // установить триггер
    set(name, func) {
        if (name && func instanceof Function) {
            this.triggers[name] = func;
        }
    }
    // вызвать триггер
    get(name, data) {
        if (this.triggers[name] instanceof Function) {
            return this.triggers[name](data);
        }
        return null;
    }

    // вернуть типы событий
    getEvents() {
        return this.EVENTS;
    }
    // подписаться на событие
    subscribe(name, func) {
        if (name && func instanceof Function) {
            this.events[name].push(func);
        }
    }
    // вызвать событие
    call(name, data) {
        if (this.events[name] && this.events[name].length) {
            for (let i = 0; i < this.events[name].length; i++) {
                if (this.events[name][i] instanceof Function) {
                    this.events[name][i](data);
                }
            }
        }
    }
}
module.exports = Mediator;