function Application() {

    var routers = {
        index: new IndexRouter(),
        lessons: new Lessons(),
        calculators: new Calculators(),
        video: new MyTube(),
        twitch: new Twitch()
    }

    BaseRouter.prototype.goTo = function (currentRouter, name) {
        if (currentRouter) {
            if (routers[name]) {
                currentRouter.go(routers[name]);
            }
        }
    };

    routers.index.init();

}