class BaseModule:
    def __init__(self, mediator):
        self.mediator = mediator
        self.EVENTS = mediator.getEventTypes()
        self.TRIGGERS = mediator.getTriggerTypes()