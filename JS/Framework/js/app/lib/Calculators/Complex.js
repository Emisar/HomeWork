function Complex(re, im) {
    this.re = re || 0;
    this.im = im || 0;
}

function ComplexCalculator(a, b) {
    BaseCalculator.call(this);
    var self = this;

    //Сумма
    this.add = function (a, b) {
        return new Complex(self.plus(a.re, b.re), self.plus(a.im, b.im));
    }
    //Вычитание
    this.sub = function (a, b) {
        return new Complex(self.minus(a.re, b.re), self.minus(a.im, b.im));
    }
    //Произведение
    this.mult = function (a, b) {
        return new Complex(self.minus(self.star(a.re, b.re), self.star(a.im, b.im)),
            self.plus(self.star(a.re, b.im), self.star(a.im, b.re)));
    }
    //Частное
    this.div = function (a, b) {
        return new Complex(self.slash(self.plus(self.star(a.re, b.re), self.star(a.im, b.im)), (self.plus(self.star(b.im, b.im), self.star(b.re, b.re)))),
            self.slash(self.minus(self.star(a.im, b.re), self.star(a.re, b.im)), self.plus(self.star(b.im, b.im), self.star(b.re, b.re))));
    }
    //Модуль
    this.modul = function (a) {
        return Math.sqrt(self.plus(self.star(a.re, a.re), self.star(a.im, a.im)));
    }
    //Ноль
    this.zero = function () {
        return new Complex();
    }
    //Единица
    this.one = function () {
        return new Complex(1, 0);
    }
}