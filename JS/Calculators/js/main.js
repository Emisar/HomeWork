
var complexCalculator = new ComplexCalculator();

var c1 = new Complex(1, 2);
var c2 = new Complex(3, 12);

console.log('Complex numbers: ');
console.log('Complex A: ', c1);
console.log('Complex B: ', c2);
console.log('Add: ', complexCalculator.add(c1, c2));        //Сумма
console.log('Sub: ', complexCalculator.sub(c1, c2));        //Вычитание
console.log('Mult: ', complexCalculator.mult(c1, c2));       //Произведение
console.log('Div: ', complexCalculator.div(c1, c2));        //Частное
console.log('Modul(a): ', complexCalculator.modul(c1));         //Модуль a
console.log('Modul(b): ', complexCalculator.modul(c2));         //Модуль b
console.log('Zero: ', complexCalculator.zero());           //Комплексный ноль
console.log('One: ', complexCalculator.one());            //Комплексная единица

var matrixCalculator = new MatrixCalculator();

var m1 = new Matrix([[new Complex(1, 2), new Complex(3, 4)], [new Complex(5, 6), new Complex(7, 8)]]);
var m2 = new Matrix([[new Complex(10, 20), new Complex(30, 40)], [new Complex(50, 60), new Complex(70, 80)]]);

console.log('Matrix: ');
console.log('Matrix A: ', m1);
console.log('Matrix B: ', m2);
console.log('Add: ', matrixCalculator.add(m1, m2));        //Сумма
console.log('Sub: ', matrixCalculator.sub(m1, m2));        //Вычитание
console.log('Mult: ', matrixCalculator.mult(m1, m2));       //Произведение
console.log('Modul(a): ', matrixCalculator.modul(m1));         //Модуль a
console.log('Modul(b): ', matrixCalculator.modul(m2));         //Модуль b
console.log('Zero: ', matrixCalculator.zero(5, Complex));          //Нулевая матрица
console.log('One: ', matrixCalculator.one(5, Complex));           //Единичная матрица

var vectorCalculator = new VectorCalculator();

var v1 = new Vector(1, 2, 3);
var v2 = new Vector(4, 5, 6);

console.log('Vectors: ');
console.log('Vector A: ', v1);
console.log('Vector B: ', v2);
console.log('Add: ', vectorCalculator.add(v1, v2));
console.log('Sub: ', vectorCalculator.sub(v1, v2));
console.log('Mult: ', vectorCalculator.mult(v1, v2));
console.log('ScalMult: ', vectorCalculator.scalMult(v1, v2));
console.log('Modul(a): ', vectorCalculator.modul(v1));
console.log('Modul(b): ', vectorCalculator.modul(v2));
console.log('Zero: ', vectorCalculator.zero());
console.log('One: ', vectorCalculator.one());