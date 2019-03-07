class BaseModule {
    constructor(options) {
        this.mediator = options.mediator;
        this.TRIGGERS = this.mediator.getTriggers();
        this.EVENTS = this.mediator.getEvents();
    }
}
module.exports = BaseModule;