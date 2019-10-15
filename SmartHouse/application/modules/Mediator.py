class Mediator:
    EVENT_TYPES = {} # типы событий
    events = {} # списки событий
    TRIGGER_TYPES = {} # типы триггеров
    triggers = {} # список триггеров по их типам

    def __init__(self, options):
        self.EVENT_TYPES = options['EVENTS']
        self.TRIGGER_TYPES = options['TRIGGERS']
        for key in self.EVENT_TYPES.keys():
            self.events.update({ self.EVENT_TYPES[key]: [] })
        for key in self.TRIGGER_TYPES.keys():
            self.triggers.update({ self.TRIGGER_TYPES[key]: lambda x = None: x })

    def __del__(self):
        self.events.clear()
        self.triggers.clear()

    def getEventTypes(self):
        return self.EVENT_TYPES

    def getTriggerTypes(self):
        return self.TRIGGER_TYPES

    def subscribe(self, name, func):
        if name and callable(func):
            self.events.get(name).append(func)

    def call(self, name, data = None):
        if (name):
            cbs = self.events.get(name)
            if cbs:
                for cb in cbs:
                    if callable(cb):
                        if data:
                            cb(data)
                        else:
                            cb()
    
    def set(self, name, func):
        if name and callable(func):
            self.triggers.update({ name: func })

    def get(self, name, data = None):
        if (name):
            cb = self.triggers.get(name)
            if cb and callable(cb):
                if data:
                    return cb(data)
                return cb()
        return None
