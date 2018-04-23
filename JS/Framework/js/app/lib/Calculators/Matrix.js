function Matrix(value, type) {
    if (value instanceof Array) {
        var arr = [];
        for (var i = 0; i < value.length; i++) {
            if (value[i] instanceof Vector) {
                arr[i] = value[i];
            } else {
                arr[i] = [];
                for (var j = 0; j < value[i].length; j++) {
                    arr[i][j] = value[i][j];
                }
            }
        }
        this.arr = arr;
    } else if (!isNaN(value) && value > 0) {
        var arr = [];
        for (var i = 0; i < value; i++) {
            arr[i] = [];
            for (var j = 0; j < value; j++) {
                arr[i][j] = (type instanceof Function) ? new type() : 0;
            }
        }
        this.arr = arr;
    } else {
        this.arr = [[(type instanceof Function) ? new type() : 0]];
    }
}

function MatrixCalculator(a, b) {
    BaseCalculator.call(this);
    var self = this;

    //Сумма
    this.add = function (a, b) {
        var result = new Matrix(a.arr.length);
        for (var i = 0; i < result.arr.length; i++) {
            for (var j = 0; j < result.arr[i].length; j++) {
                var calc = self.getCalculator(a.arr[i][j]);
                result.arr[i][j] = calc.add(a.arr[i][j], b.arr[i][j]);
            }
        }
        return result;
    }
    //Вычитание
    this.sub = function (a, b) {
        var result = new Matrix(a.arr.length);
        for (var i = 0; i < result.arr.length; i++) {
            for (var j = 0; j < result.arr[i].length; j++) {
                var calc = self.getCalculator(a.arr[i][j]);
                result.arr[i][j] = calc.sub(a.arr[i][j], b.arr[i][j]);
            }
        }
        return result;
    }
    //Произведение
    this.mult = function (a, b) {
        var result = new Matrix(a.arr.length);
        var calc = self.getCalculator(a.arr[0][0]);
        var sum = calc.zero();
        for (var i = 0; i < result.arr.length; i++) {
            for (var j = 0; j < result.arr[i].length; j++) {
                sum = calc.zero();
                for (var k = 0; k < result.arr.length; k++) {
                    var calc = self.getCalculator(a.arr[i][j]);
                    sum = calc.add(sum, calc.mult(a.arr[i][k], b.arr[k][j]));
                }
                result.arr[i][j] = sum;
            }
        }
        return result;
    }
    //Модуль
    this.modul = function (a) {
        var result = 0;
        var sum = 0;
        for (var i = 0; i < a.arr.length; i++) {
            sum = 0;
            for (var j = 0; j < a.arr[i].length; j++) {
                var calc = self.getCalculator(a.arr[i][j]);
                sum += calc.modul(a.arr[i][j]);
            }
            if (sum > result) {
                result = sum;
            }
        }
        return result;
    }
    //Ноль
    this.zero = function (size, type) {
        var result = new Matrix(size, type);
        return result;
    }
    //Единица
    this.one = function (size, type) {
        var result = self.zero(size, type);
        for (var i = 0; i < result.arr.length; i++) {
            var calc = self.getCalculator(result.arr[i][i]);
            result.arr[i][i] = calc.one();
        }
        return result;
    }
}