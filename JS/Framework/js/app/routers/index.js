function IndexRouter() {
    BaseRouter.call(this);

    var supportFunction = new SupportFunction();

    var self = this;

    this.eventHandler = function () {
        supportFunction.MenuButton.eventHandler(self);
    };

    this.eventRemove = function () {
        supportFunction.MenuButton.eventRemove();
    };

    this.render = function (data) {
        return '<H2>Main Menu</H2>' + '</br>' +
            supportFunction.MenuButton.template('Lessons', 'lessons') + '</br>' +
            supportFunction.MenuButton.template('Calculators', 'calculators') + '</br>' +
            supportFunction.MenuButton.template('MyTube', 'video') + '</br>' +
            supportFunction.MenuButton.template('Twitch', 'twitch');
    };
}