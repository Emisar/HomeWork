function lesson3() {
	//Загаловки заданий
	const exercisesName = ['Sum 1', 'Sum 2', 'Sum 3', 'Product 1', 'Product 2', 'Product 3'];
	//Добавляем урок
    addLesson("Cycle");
	//Добавляем задания
	for (var i = 0; i < 6; i++) {
		addExercise(3, exercisesName[i], 1);
	}
	//Добавляем поля ответов
	for (var i = 1; i <= 6; i++) {addAnswer(3, i);}

    var contents = document.getElementsByClassName('content-elem');
	var exercises = contents[2].getElementsByClassName('exercise');

    exercises[0].getElementsByClassName('enter-button')[0].onclick = function () {		//Сумма 1
        var input = exercises[0].getElementsByClassName('input-field')[0].value - 0;
        var output = exercises[0].getElementsByClassName('output-field')[0];
		var answerField = exercises[0].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
        var S = 0;

        for (var i = input; i < input + 100; i++) {
            S += 1 / i / i;
        }
        output.value = S;
    }

    exercises[1].getElementsByClassName('enter-button')[0].onclick = function () {		//Сумма 2
        var input = exercises[1].getElementsByClassName('input-field')[0].value - 0;
        var output = exercises[1].getElementsByClassName('output-field')[0];
		var answerField = exercises[1].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
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
		var answerField = exercises[2].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
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
		var answerField = exercises[3].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
        var P = 1;

        for (var i = input; i < input + 100; i++) {
            P *= 1 - 1 / i / i;
        }
        output.value = P;
    }

    exercises[4].getElementsByClassName('enter-button')[0].onclick = function () {		//Произведение 2
        var input = exercises[4].getElementsByClassName('input-field')[0].value - 0;
        var output = exercises[4].getElementsByClassName('output-field')[0];
		var answerField = exercises[4].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
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
		var answerField = exercises[5].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
        var S = 0, P = 1;

        for (var i = input; i < input + 50; i++) {
            P *= 2 * i - 1;
            S += 2 * i / P;
        }
        output.value = S;
    }
}