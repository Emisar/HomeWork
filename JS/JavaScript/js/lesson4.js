function lesson4() {
	//Заголовки заданий
	const exercisesName = ['Exp "for"', 'Cos "for"', 'Sin "for"', 'Exp "while"', 'Cos "while"', 'Sin "while"'];
	//Добавляем урок
    addLesson("Sin, Cos, Exp");
	//Добавляем задания
	for (var i = 0; i < 6; i++) {
        addExercise(4, exercisesName[i], 1);
	}
	//Добавляем поля ответов
    for (var i = 1; i <= 6; i++) {addAnswer(4, i);}

    var contents = document.getElementsByClassName('content-elem');
	var exercises = contents[3].getElementsByClassName('exercise');

    exercises[0].getElementsByClassName('enter-button')[0].onclick = function () {		//Вычисление exp числа через цикл for
        var input = exercises[0].getElementsByClassName('input-field')[0].value - 0;
        var output = exercises[0].getElementsByClassName('output-field')[0];
		var answerField = exercises[0].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
        var S = 1, P = 1;

        for (var i = 1; i < 100; i++) {
            P *= input / i;
            S += P;
        }
        output.value = S;
        alert('exp(' + input + ') = ' + Math.exp(input));
    }

    exercises[1].getElementsByClassName('enter-button')[0].onclick = function () {		//Вычисление cos числа через цикл for
        var input = exercises[1].getElementsByClassName('input-field')[0].value - 0;
        var output = exercises[1].getElementsByClassName('output-field')[0];
		var answerField = exercises[1].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
        var S = 1, P = 1;
        var k, t = Math.pow(input, 2);

        for (var i = 1; i < 100; i++) {
            k = 2 * i;
            P = -P * t / k / (k - 1);
            S += P;
        }
        output.value = S;
        alert('cos(' + input + ') = ' + Math.cos(input));
    }

    exercises[2].getElementsByClassName('enter-button')[0].onclick = function () {		//Вычисление sin числа через цикл for
        var input = exercises[2].getElementsByClassName('input-field')[0].value - 0;
        var output = exercises[2].getElementsByClassName('output-field')[0];
		var answerField = exercises[2].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
        var S = input;
        var P = input;
        var k, t = input * input;

        for (var i = 1; i < 100; i++) {
            k = 2 * i + 1;
            P = -P * t / k / (k - 1);
            S += P;
        }
        output.value = S;
        alert('sin(' + input + ') = ' + Math.sin(input));
    }

    exercises[3].getElementsByClassName('enter-button')[0].onclick = function () {		//Вычисление exp числа через цикл while
        const EPS = 0.000001;
        var input = exercises[3].getElementsByClassName('input-field')[0].value - 0;
        var output = exercises[3].getElementsByClassName('output-field')[0];
		var answerField = exercises[3].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
        var S = 1, P = 1, i = 0;

        while (Math.abs(P) >= EPS) {
            i++;
            P *= input / i;
            S += P;
        }
        output.value = S;
        alert('exp(' + input + ') = ' + Math.exp(input));
    }

    exercises[4].getElementsByClassName('enter-button')[0].onclick = function () {		//Вычисление cos числа через цикл while
        const EPS = 0.000001;
        var input = exercises[4].getElementsByClassName('input-field')[0].value - 0;
        var output = exercises[4].getElementsByClassName('output-field')[0];
		var answerField = exercises[4].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
        var S = 1, P = 1, i = 0;
        var k, t = Math.pow(input, 2);

        while (Math.abs(P) >= EPS) {
            i++;
            k = 2 * i;
            P = -P * t / k / (k - 1);
            S += P;
        }
        output.value = S;
        alert('cos(' + input + ') = ' + Math.cos(input));
    }

    exercises[5].getElementsByClassName('enter-button')[0].onclick = function () {		//Вычисление sin числа через цикл while
        const EPS = 0.000001;
        var input = exercises[5].getElementsByClassName('input-field')[0].value - 0;
        var output = exercises[5].getElementsByClassName('output-field')[0];
		var answerField = exercises[5].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
        var S = input;
        var P = input;
        var i = 1;
        var t = input * input;

        while (Math.abs(P) >= EPS) {
            i += 2;
            P = -P * t / i / (i - 1);
            S += P;
        }
        output.value = S;
        alert('sin(' + input + ') = ' + Math.sin(input));
    }
}