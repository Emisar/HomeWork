function BaseRouter(option) {

    var self = this;
    var appId = 'application';

    this.eventHandler = function () { };
    this.eventRemove = function () { };

    this.render = function () {
        return '';
    };

    function render(data) {
        document.getElementById(appId).innerHTML = self.render(data);
    }

    this.init = function (data) {
        render(data);
        self.eventHandler();
    }

    this.uninit = function () {
        self.eventRemove();
    }

    this.go = function (newRouter) {
        if (newRouter) {
            self.uninit();
            routerAnimate(function () {
                newRouter.init();
            });
        }
    }

}

BaseRouter.prototype.goTo = function () { };