class BaseModule {
    constructor(options) {
        this.io = options.io;
        this.db = options.db;
        this.mediator = options.mediator;
        this.TRIGGERS = this.mediator.getTriggers();
        this.EVENTS = this.mediator.getEvents();
    }
}
module.exports = BaseModule;
