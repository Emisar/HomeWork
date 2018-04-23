function BaseCalculator() {
    this.getCalculator = function (value) {
        if (value instanceof Complex) return new ComplexCalculator();
        if (value instanceof Matrix) return new MatrixCalculator();
        //if (value instanceof Vector ) return new VectorCalculator();
        return new BaseCalculator();
    };

    this.plus = function (a, b) { return a + b; };
    this.minus = function (a, b) { return a - b; };
    this.star = function (a, b) { return a * b; };
    this.slash = function (a, b) { return a / b; };

    //Сумма
    this.add = function (a, b) { return this.plus(a, b); };
    //Вычитание
    this.sub = function (a, b) { return this.minus(a, b); }
    //Произведение
    this.mult = function (a, b) { return this.star(a, b); }
    //Частное
    this.div = function (a, b) { return (b) ? this.slash(a, b) : NaN; }
    //Ноль
    this.zero = function () { return 0; }
    //Единица
    this.one = function () { return 1; }
}