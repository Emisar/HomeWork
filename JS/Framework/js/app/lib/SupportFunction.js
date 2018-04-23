function SupportFunction() {
    this.LessonTemplate = {
        template: {
            common: function (data) {
                var lesson = '<H2>' + data.name + '</H2>';
                if (data.exercises) {
                    for (var i = 0; i < data.exercises.length; i++) {
                        lesson += '<div class="exercise">';
                        lesson += '<h3>' + data.exercises[i].name + '</h3>';
                        if (data.exercises[i].input) {
                            for (var j = 0; j < data.exercises[i].input.length; j++) {
                                lesson += '<input type="text" class="' + data.exercises[i].input[j].class + '" placeholder="' + data.exercises[i].input[j].placeholder + '">';
                                ((j + 1 == data.exercises[i].input.length) ? lesson += '' : lesson += '</br>');
                            }
                        }
                        if (data.exercises[i].button) {
                            for (var j = 0; j < data.exercises[i].button.length; j++) {
                                lesson += '<input type="button" class="' + data.exercises[i].button[j].class + '" value="' + data.exercises[i].button[j].value + '"></br>';
                            }
                        }
                        lesson += '<span>Answer: </span>';
                        if (data.exercises[i].output) {
                            for (var j = 0; j < data.exercises[i].output.length; j++) {
                                lesson += '<input type="text" class="' + data.exercises[i].output[j].class + '" readonly placeholder="' + data.exercises[i].output[j].placeholder + '"></br>';
                            }
                        }
                        lesson += '</div>';
                    }
                }
                return lesson;
            },
        },
        eventHandler: {
            lesson1: function () {
                var exercises = document.getElementsByClassName('exercise');

                exercises[0].getElementsByClassName('enter-button')[0].onclick = function () {		//Первый график
                    var input = exercises[0].getElementsByClassName('input-field')[0].value - 0;
                    var output = exercises[0].getElementsByClassName('output-field')[0];

                    if (isNaN(input) || !input) {
                        alert("Enter the number");
                        return;
                    }

                    output.value = ((input <= -1) ? -1 : (input <= 1) ? input : 1);
                }

                exercises[1].getElementsByClassName('enter-button')[0].onclick = function () {		//Второй график
                    var input = exercises[1].getElementsByClassName('input-field')[0].value - 0;
                    var output = exercises[1].getElementsByClassName('output-field')[0];

                    if (isNaN(input) || !input) {
                        alert("Enter the number");
                        return;
                    }

                    output.value = ((Math.abs(input) >= 0, 5) ? (1 / input) : (4 * input));
                }

                exercises[2].getElementsByClassName('enter-button')[0].onclick = function () {		//Квадратная мишень
                    var inputX = exercises[2].getElementsByClassName('input-field')[0].value - 0;
                    var inputY = exercises[2].getElementsByClassName('input-field')[1].value - 0;
                    var output = exercises[2].getElementsByClassName('output-field')[0];

                    if (isNaN(inputX) || !inputX || isNaN(inputY) || !inputY) {
                        alert("Enter the number");
                        return;
                    }

                    output.value = ((Math.abs(inputX) <= 1) && (Math.abs(inputY) <= 1) ? 1 : 0);
                }

                exercises[3].getElementsByClassName('enter-button')[0].onclick = function () {		//Круглая мишень
                    var inputX = exercises[3].getElementsByClassName('input-field')[0].value - 0;
                    var inputY = exercises[3].getElementsByClassName('input-field')[1].value - 0;
                    var output = exercises[3].getElementsByClassName('output-field')[0];

                    if (isNaN(inputX) || !inputX || isNaN(inputY) || !inputY) {
                        alert("Enter the number");
                        return;
                    }

                    output.value = ((Math.pow(inputX, 2) + Math.pow(inputY, 2) <= 1) && (inputY < 0) ? 2 : (Math.pow(inputX, 2) + Math.pow(inputY, 2) <= 1) && (inputY > 0) ? 1 : 0);
                }

                exercises[4].getElementsByClassName('enter-button')[0].onclick = function () {		//Сломаная круглая мишень
                    var inputX = exercises[4].getElementsByClassName('input-field')[0].value - 0;
                    var inputY = exercises[4].getElementsByClassName('input-field')[1].value - 0;
                    var output = exercises[4].getElementsByClassName('output-field')[0];

                    if (isNaN(inputX) || !inputX || isNaN(inputY) || !inputY) {
                        alert("Enter the number");
                        return;
                    }

                    output.value = ((Math.pow(inputX, 2) + Math.pow(inputY, 2) <= 1) && (inputX >= 0) && (inputY >= 0) ? 2 : (Math.pow(inputX, 2) + Math.pow(inputY, 2) <= 1) && (inputX <= 0) && (inputY <= 0) ? 1 : 0);
                }

                exercises[5].getElementsByClassName('enter-button')[0].onclick = function () {		//Сломанная круглая и квадратная мишень
                    var inputX = exercises[5].getElementsByClassName('input-field')[0].value - 0;
                    var inputY = exercises[5].getElementsByClassName('input-field')[1].value - 0;
                    var output = exercises[5].getElementsByClassName('output-field')[0];

                    if (isNaN(inputX) || !inputX || isNaN(inputY) || !inputY) {
                        alert("Enter the number");
                        return;
                    }

                    output.value = ((Math.pow(inputX, 2) + Math.pow(inputY, 2) <= 1) && (inputX >= 0) && (inputY >= 0) ? 2 : (inputX >= -1) && (inputY >= -1) && (inputX <= 0) && (inputY <= 0) ? 1 : 0);
                }
            },
            lesson2: function () {
                var exercises = document.getElementsByClassName('exercise');

                exercises[0].getElementsByClassName('enter-button')[0].onclick = function () {		//Вычисляем квадратный корень
                    var input = exercises[0].getElementsByClassName('input-field')[0].value - 0;
                    var output = exercises[0].getElementsByClassName('output-field')[0];

                    if (isNaN(input) || !input) {
                        alert("Enter the number");
                        return;
                    }

                    output.value = Math.sqrt(input);
                };

                exercises[1].getElementsByClassName('enter-button')[0].onclick = function () {		//Находим корни квадратного уравнения
                    var a = exercises[1].getElementsByClassName('input-field')[0].value - 0;
                    var b = exercises[1].getElementsByClassName('input-field')[1].value - 0;
                    var c = exercises[1].getElementsByClassName('input-field')[2].value - 0;
                    var output = exercises[1].getElementsByClassName('output-field')[0];

                    if (isNaN(a) || isNaN(b) || isNaN(c) || !a || !b || !c) {
                        alert("Enter the number!");
                        return;
                    };
                    if (a == 0) {
                        alert("The first factor shoudn't be equal to 0");
                        return;
                    };

                    var x = [];
                    //Вычисляем дискриминант
                    var dis = Math.pow(b, 2) - 4 * a * c;
                    //Если дискриминант больше нуля, то уравнение имеет два корня
                    if (dis > 0) {
                        x[0] = ((-b) + Math.sqrt(dis)) / (2 * a);
                        x[1] = ((-b) - Math.sqrt(dis)) / (2 * a);
                        output.value = "x1=" + x[0] + "; x2=" + x[1];
                    };
                    //Если дискриминант равен нулю, то уравнение имеет один корнь
                    if (dis == 0) {
                        x[0] = (-b) / (2 * a);
                        output.value = "x1 = " + x[0];
                    };
                    //Если дискриминант меньше нуля, то уравнение не имеет корней
                    if (dis < 0) {
                        alert("Discriminant less than zero!");
                    };
                };
            },
            lesson3: function () {
                var exercises = document.getElementsByClassName('exercise');

                exercises[0].getElementsByClassName('enter-button')[0].onclick = function () {		//Сумма 1
                    var input = exercises[0].getElementsByClassName('input-field')[0].value - 0;
                    var output = exercises[0].getElementsByClassName('output-field')[0];

                    var S = 0;

                    for (var i = input; i < input + 100; i++) {
                        S += 1 / i / i;
                    }
                    output.value = S;
                }

                exercises[1].getElementsByClassName('enter-button')[0].onclick = function () {		//Сумма 2
                    var input = exercises[1].getElementsByClassName('input-field')[0].value - 0;
                    var output = exercises[1].getElementsByClassName('output-field')[0];

                    var S = 0, k = 1;

                    for (var i = input; i < input + 50; i++) {
                        k = 2 * i;
                        S += k / (k - 1) / (k + 1) / (k + 1);
                    }
                    output.value = S;
                }

                exercises[2].getElementsByClassName('enter-button')[0].onclick = function () {		//Сумма 3
                    var input = exercises[2].getElementsByClassName('input-field')[0].value - 0;
                    var output = exercises[2].getElementsByClassName('output-field')[0];

                    var S = 0, k = 1;

                    for (var i = input; i < input + 33; i++) {
                        k = 3 * i;
                        S += 1 / (k + 2) / (k - 1);
                    }
                    output.value = S;
                }

                exercises[3].getElementsByClassName('enter-button')[0].onclick = function () {		//Произведение 1
                    var input = exercises[3].getElementsByClassName('input-field')[0].value - 0;
                    var output = exercises[3].getElementsByClassName('output-field')[0];

                    var P = 1;

                    for (var i = input; i < input + 100; i++) {
                        P *= 1 - 1 / i / i;
                    }
                    output.value = P;
                }

                exercises[4].getElementsByClassName('enter-button')[0].onclick = function () {		//Произведение 2
                    var input = exercises[4].getElementsByClassName('input-field')[0].value - 0;
                    var output = exercises[4].getElementsByClassName('output-field')[0];

                    var S = 0, P = 1;

                    for (var i = input; i < input + 14; i++) {
                        P /= i;
                        S += (i + 1) * P;
                    }
                    output.value = S;
                }

                exercises[5].getElementsByClassName('enter-button')[0].onclick = function () {		//Произведение 3
                    var input = exercises[5].getElementsByClassName('input-field')[0].value - 0;
                    var output = exercises[5].getElementsByClassName('output-field')[0];

                    var S = 0, P = 1;

                    for (var i = input; i < input + 50; i++) {
                        P *= 2 * i - 1;
                        S += 2 * i / P;
                    }
                    output.value = S;
                }
            }
        }
    }

    this.CalculatorTemplate = {
        classic: {
            template: function (data) {
                var calculator = '<h2>' + data.name + '</h2>';
                if (data.input && data.select) {
                    calculator += '<input type="text" class="' + data.input[0].class + '" placeholder="' + data.input[0].placeholder + '">';
                    calculator += '<select class="' + data.select.class + '">';
                    for (var i = 0; i < data.select.option.length; i++) {
                        calculator += '<option value="' + data.select.option[i] + '">' + data.select.option[i] + '</option>';
                    }
                    calculator += '</select>';
                    calculator += '<input type="text" class="' + data.input[1].class + '" placeholder="' + data.input[1].placeholder + '">';
                }
                if (data.button) {
                    calculator += '<input type="button" class="' + data.button.class + '" value="' + data.button.value + '">';
                }
                calculator += '</br><span>Answer: </span>';
                if (data.output) {
                    calculator += '<input type="text" class="' + data.output.class + '" placeholder="' + data.output.placeholder + '" readonly>';
                }
                return calculator;
            },
            eventHandler: function () {
                document.getElementsByClassName('enter-button')[0].onclick = function () {
                    var classicCalculator = new BaseCalculator();

                    var a = document.getElementsByClassName('input-field')[0].value - 0;
                    var b = document.getElementsByClassName('input-field')[1].value - 0;
                    var output = document.getElementsByClassName('output-field')[0];

                    for (var i = 0; i < document.getElementsByClassName('selector')[0].options.length; i++) {
                        if (document.getElementsByClassName('selector')[0].options[i].selected) {
                            var action = document.getElementsByClassName('selector')[0].options[i].value;
                            break;
                        }
                    }

                    switch (action) {
                        case '+':
                            output.value = classicCalculator.add(a, b);
                            break;
                        case '-':
                            output.value = classicCalculator.sub(a, b);
                            break;
                        case '*':
                            output.value = classicCalculator.mult(a, b);
                            break;
                        case '/':
                            output.value = classicCalculator.div(a, b);
                            break;
                    }
                }
            }
        },
        complex: {
            template: function (data) {
                var calculator = '<h2>' + data.name + '</h2>';
                if (data.input && data.select) {
                    calculator += '<span>Re: </span><input type="text" class="' + data.input[0][0].class + '" placeholder="' + data.input[0][0].placeholder + '" size=10>';
                    calculator += '<span>Im: </span><input type="text" class="' + data.input[0][1].class + '" placeholder="' + data.input[0][1].placeholder + '" size=10>';
                    calculator += '<select class="' + data.select.class + '">';
                    for (var i = 0; i < data.select.option.length; i++) {
                        calculator += '<option value="' + data.select.option[i] + '">' + data.select.option[i] + '</option>';
                    }
                    calculator += '</select>';
                    calculator += '<span>Re: </span><input type="text" class="' + data.input[1][0].class + '" placeholder="' + data.input[1][0].placeholder + '" size=10>';
                    calculator += '<span>Im: </span><input type="text" class="' + data.input[1][1].class + '" placeholder="' + data.input[1][1].placeholder + '" size=10>';
                }
                if (data.button) {
                    calculator += '<input type="button" class="' + data.button.class + '" value="' + data.button.value + '">';
                }
                calculator += '</br><span>Answer: </span>';
                if (data.output) {
                    calculator += '<input type="text" class="' + data.output[0].class + '" placeholder="' + data.output[0].placeholder + '" size=10 readonly>';
                    calculator += '<input type="text" class="' + data.output[1].class + '" placeholder="' + data.output[1].placeholder + '" size=10 readonly>';
                }
                return calculator;
            },
            eventHandler: function () {
                document.getElementsByClassName('enter-button')[0].onclick = function () {
                    var complexCalculator = new ComplexCalculator();

                    var a = new Complex(document.getElementsByClassName('input-field')[0].value - 0, document.getElementsByClassName('input-field')[1].value - 0);
                    var b = new Complex(document.getElementsByClassName('input-field')[2].value - 0, document.getElementsByClassName('input-field')[3].value - 0);
                    var output = { re: document.getElementsByClassName('output-field')[0], im: document.getElementsByClassName('output-field')[1] };

                    console.log(complexCalculator);

                    for (var i = 0; i < document.getElementsByClassName('selector')[0].options.length; i++) {
                        if (document.getElementsByClassName('selector')[0].options[i].selected) {
                            var action = document.getElementsByClassName('selector')[0].options[i].value;
                            break;
                        }
                    }

                    switch (action) {
                        case '+':
                            output.re.value = complexCalculator.add(a, b).re;
                            output.im.value = complexCalculator.add(a, b).im;
                            break;
                        case '-':
                            output.re.value = complexCalculator.sub(a, b).re;
                            output.im.value = complexCalculator.sub(a, b).im;
                            break;
                        case '*':
                            output.re.value = complexCalculator.mult(a, b).re;
                            output.im.value = complexCalculator.mult(a, b).im;
                            break;
                        case '/':
                            output.re.value = complexCalculator.div(a, b).re;
                            output.im.value = complexCalculator.div(a, b).im;
                            break;
                    }
                }
            }
        },
        matrix: {
            template: function (data) {
                var calculator = '<h2>' + data.name + '</h2>';
                if (data.input && data.select && data.button) {
                    calculator += '<input type="text" class="' + data.input[0].class + '" placeholder="' + data.input[0].placeholder + '">';
                    calculator += '<input type="button" class="' + data.button.class + '" value="' + data.button.value + '"></br>';
                    calculator += '<span>Matrix 1</span>';
                    calculator += '<div class="' + data.field.class + '"></div>';
                    calculator += '<span>Matrix 2</span>';
                    calculator += '<div class="' + data.field.class + '"></div>';
                    calculator += '<span>Select </span>';
                    calculator += '<select class="' + data.select.class + '">';
                    for (var i = 0; i < data.select.option.length; i++) {
                        calculator += '<option value="' + data.select.option[i] + '">' + data.select.option[i] + '</option>';
                    }
                    calculator += '</select>';
                    calculator += '<input type="button" class="' + data.button.class + '" value="' + data.button.value + '">';
                }
                if (data.output) {
                    calculator += '</br><span>Answer</span>';
                    calculator += '<div class="' + data.field.class + '"></div>';
                }
                return calculator;
            },
            eventHandler: function (data) {
                document.getElementsByClassName('enter-button')[0].onclick = function () {
                    var input = document.getElementsByClassName('input-field')[0].value - 0;
                    var matrixFileds = document.getElementsByClassName('matrix-field');
                    var inner = '';

                    for (var i = 0; i < input; i++) {
                        for (var j = 0; j < input; j++) {
                            inner += '<input type="text" class="' + data.input[1].class + '">';
                        }
                        inner += '</br>';
                    }

                    for (var i = 0; i < matrixFileds.length; i++) {
                        matrixFileds[i].innerHTML = inner;
                    }
                }

                document.getElementsByClassName('enter-button')[1].onclick = function () {
                    var matrixCalculator = new MatrixCalculator();
                    
                    var matrixFileds = document.getElementsByClassName('matrix-field');
                    var matrixlength = [Math.sqrt(matrixFileds[0].getElementsByClassName('matrix-elem').length),
                                        Math.sqrt(matrixFileds[1].getElementsByClassName('matrix-elem').length),
                                        Math.sqrt(matrixFileds[2].getElementsByClassName('matrix-elem').length)];

                    var matrix = [];

                    for (var i = 0; i < matrixlength[0]; i++) {
                        matrix[i] = [];
                        for (var j = 0; j < matrixlength[0]; j++) {
                            matrix[i][j] = matrixFileds[0].getElementsByClassName('matrix-elem')[i * matrixlength[0] + j].value - 0;
                        }
                    }
                    var a = new Matrix(matrix);

                    for (var i = 0; i < matrixlength[1]; i++) {
                        for (var j = 0; j < matrixlength[1]; j++) {
                            matrix[i][j] = matrixFileds[1].getElementsByClassName('matrix-elem')[i * matrixlength[1] + j].value - 0;
                        }
                    }
                    var b = new Matrix(matrix);

                    for (var i = 0; i < document.getElementsByClassName('selector')[0].options.length; i++) {
                        if (document.getElementsByClassName('selector')[0].options[i].selected) {
                            var action = document.getElementsByClassName('selector')[0].options[i].value;
                            break;
                        }
                    }

                    switch (action) {
                        case '+':
                            var c = new Matrix(matrixCalculator.add(a, b).arr);
                            break;
                        case '-':
                            var c = new Matrix(matrixCalculator.sub(a, b).arr);
                            break;
                        case '*':
                            var c = new Matrix(matrixCalculator.mult(a, b).arr);
                            break;
                    }

                    for (var i = 0; i < matrixlength[2]; i++) {
                        for (var j = 0; j < matrixlength[2]; j++) {
                            matrixFileds[2].getElementsByClassName('matrix-elem')[i * matrixlength[2] + j].value = c.arr[i][j];
                        }
                    }
                }
            }
        },
        matrixComplex: {
            template: function (data) {
                var calculator = '<h2>' + data.name + '</h2>';
                if (data.input && data.select && data.button) {
                    calculator += '<input type="text" class="' + data.input[0].class + '" placeholder="' + data.input[0].placeholder + '">';
                    calculator += '<input type="button" class="' + data.button.class + '" value="' + data.button.value + '"></br>';
                    calculator += '<span>Matrix 1</span>';
                    calculator += '<div class="' + data.field.class + '"></div>';
                    calculator += '<span>Matrix 2</span>';
                    calculator += '<div class="' + data.field.class + '"></div>';
                    calculator += '<span>Select </span>';
                    calculator += '<select class="' + data.select.class + '">';
                    for (var i = 0; i < data.select.option.length; i++) {
                        calculator += '<option value="' + data.select.option[i] + '">' + data.select.option[i] + '</option>';
                    }
                    calculator += '</select>';
                    calculator += '<input type="button" class="' + data.button.class + '" value="' + data.button.value + '">';
                }
                if (data.output) {
                    calculator += '</br><span>Answer</span>';
                    calculator += '<div class="' + data.field.class + '"></div>';
                }
                return calculator;
            },
            eventHandler: function (data) {
                document.getElementsByClassName('enter-button')[0].onclick = function () {
                    var input = document.getElementsByClassName('input-field')[0].value - 0;
                    var matrixFileds = document.getElementsByClassName('matrix-field');
                    var inner = '';

                    for (var i = 0; i < input; i++) {
                        for (var j = 0; j < input; j++) {
                            inner += '<span>(</span><input type="text" class="' + data.input[1].class + '">';
                            inner += '<input type="text" class="' + data.input[1].class + '"><span>)</span>';
                        }
                        inner += '</br>';
                    }

                    for (var i = 0; i < matrixFileds.length; i++) {
                        matrixFileds[i].innerHTML = inner;
                    }
                }

                document.getElementsByClassName('enter-button')[1].onclick = function () {
                    var matrixCalculator = new MatrixCalculator();

                    var matrixFileds = document.getElementsByClassName('matrix-field');
                    var matrixlength = [Math.sqrt(matrixFileds[0].getElementsByClassName('matrix-elem').length / 2),
                                        Math.sqrt(matrixFileds[1].getElementsByClassName('matrix-elem').length / 2),
                                        Math.sqrt(matrixFileds[2].getElementsByClassName('matrix-elem').length / 2)];

                    var matrix = [];

                    for (var i = 0; i < matrixlength[0]; i++) {
                        matrix[i] = [];
                        for (var j = 0; j < matrixlength[0]; j++) {
                            matrix[i][j] = new Complex(matrixFileds[0].getElementsByClassName('matrix-elem')[(i * matrixlength[0] + j) * 2].value - 0,
                                matrixFileds[0].getElementsByClassName('matrix-elem')[(i * matrixlength[0] + j) * 2 + 1].value - 0);
                        }
                    }
                    var a = new Matrix(matrix, Complex);

                    for (var i = 0; i < matrixlength[1]; i++) {
                        for (var j = 0; j < matrixlength[1]; j++) {
                            matrix[i][j] = new Complex(matrixFileds[1].getElementsByClassName('matrix-elem')[(i * matrixlength[0] + j) * 2].value - 0,
                                matrixFileds[1].getElementsByClassName('matrix-elem')[(i * matrixlength[0] + j) * 2 + 1].value - 0);
                        }
                    }
                    var b = new Matrix(matrix, Complex);

                    for (var i = 0; i < document.getElementsByClassName('selector')[0].options.length; i++) {
                        if (document.getElementsByClassName('selector')[0].options[i].selected) {
                            var action = document.getElementsByClassName('selector')[0].options[i].value;
                            break;
                        }
                    }

                    switch (action) {
                        case '+':
                            var c = new Matrix(matrixCalculator.add(a, b).arr, Complex);
                            break;
                        case '-':
                            var c = new Matrix(matrixCalculator.sub(a, b).arr, Complex);
                            break;
                        case '*':
                            var c = new Matrix(matrixCalculator.mult(a, b).arr, Complex);
                            break;
                    }

                    for (var i = 0; i < matrixlength[2]; i++) {
                        for (var j = 0; j < matrixlength[2]; j++) {
                            matrixFileds[2].getElementsByClassName('matrix-elem')[(i * matrixlength[2] + j) * 2].value = c.arr[i][j].re;
                            matrixFileds[2].getElementsByClassName('matrix-elem')[(i * matrixlength[2] + j) * 2 + 1].value = c.arr[i][j].im;
                        }
                    }
                }
            }
        }
    }

    this.MenuButton = {
        template: function (buttonName, data_action) {
            data_action = data_action || 'index';
            return '<input type="button" class="main_menu" data-action="' + data_action + '" value="' + buttonName + '">';
        },
        eventHandler: function (self) {
            var menuElems = document.getElementsByClassName('main_menu');
            for (var i = 0; i < menuElems.length; i++) {
                menuElems[i].addEventListener('click', function () {
                    BaseRouter.prototype.goTo(self, this.getAttribute('data-action'));
                });
            }
        },
        eventRemove: function () {
            var menuElems = document.getElementsByClassName('main_menu');
            for (var i = 0; i < menuElems.length; i++) {
                menuElems[i].removeEventListener('click', this, false);
            }
        }
    }
}

function timeFormat(currentTime) {
    var time = '';
    var h = Math.floor(currentTime / 3600);
    var m = Math.floor(currentTime % 3600 / 60);
    var s = Math.floor(currentTime % 3600 % 60);
    if (h) { time += h + ':' };
    if (m >= 10) { time += m + ':' } else { time += '0' + m + ':' };
    if (s >= 10) { time += s } else { time += '0' + s };
    return time;
}

function routerAnimate(cbHide) {
    var app = document.getElementById('application');
    var opacity = 1;
    var dt = 0.05;
    var interval = setInterval(function () {
        opacity -= dt;
        if (opacity <= 0) {
            clearInterval(interval);
            cbHide();
            interval = setInterval(function () {
                opacity += dt;
                if (opacity >= 1) {
                    clearInterval(interval);
                } else {
                    app.setAttribute('style', 'opacity:' + opacity);
                }
            }, 50);
        } else {
            app.setAttribute('style', 'opacity:' + opacity);
        }
    }, 50);
    // скрыть старый роутер
    // показать новый роутер
}