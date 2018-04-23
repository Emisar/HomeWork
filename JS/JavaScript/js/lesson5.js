function lesson5() {
	//Заголовки заданий
	const exercisesName = ['Sum Nu 1', 'Sum Nu 2', 'Sum Nu 3'];
	//Добавляем урок
    addLesson("Cycle agane!");
	//Добавляем задания
	for (var i = 0; i < 3; i++) {addExercise(5, exercisesName[i], 2);}
	//Добавляем поля ответов
    for (var i = 1; i <= 3; i++) {addAnswer(5, i);}

    var contents = document.getElementsByClassName('content-elem');
	var exercises = contents[4].getElementsByClassName('exercise');

    exercises[0].getElementsByClassName('enter-button')[0].onclick = function () {
        const EPS = 0.000001;
        var input1 = exercises[0].getElementsByClassName('input-field')[0].value - 0;
        var input2 = exercises[0].getElementsByClassName('input-field')[1].value - 0;
        var output = exercises[0].getElementsByClassName('output-field')[0];
		var answerField = exercises[0].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
        var S = 1, P = 1, q = 1 / input2, k = 0;

        if (Math.abs(input2) > 1) {
            alert("!!! abs(nu) <= 1 !!!");
            return;
        }

        while (Math.abs(P) >= EPS) {
            k++;
            q *= input2;
            P *= input1 * q / k;
            S += P;
        }
        output.value = S;
    }

    exercises[1].getElementsByClassName('enter-button')[0].onclick = function () {
        const EPS = 0.000001;
        var input1 = exercises[1].getElementsByClassName('input-field')[0].value - 0;
        var input2 = exercises[1].getElementsByClassName('input-field')[1].value - 0;
        var output = exercises[1].getElementsByClassName('output-field')[0];
		var answerField = exercises[1].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
        var S = 1, P = 1, q = input2, k = 0;
        var t2 = Math.pow(input1, 2), nu4 = Math.pow(Math.pow(input1, 2), 2);

        if (Math.abs(input2) > 1) {
            alert("!!! abs(nu) <= 1 !!!");
            return;
        }

        while (Math.abs(P) >= EPS) {
            k+=2;
            P *= t2 * q / k / (k - 1);
            q *= nu4;
            S += P;
        }
        output.value = S;
    }

    exercises[2].getElementsByClassName('enter-button')[0].onclick = function () {
        const EPS = 0.000001;
        var input1 = exercises[2].getElementsByClassName('input-field')[0].value - 0;
        var input2 = exercises[2].getElementsByClassName('input-field')[1].value - 0;
        var output = exercises[2].getElementsByClassName('output-field')[0];
		var answerField = exercises[2].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
        var S = input1, P = input1, q = Math.pow(input2, 3), k = 0;
        var t2 = Math.pow(input1, 2), nu4 = Math.pow(Math.pow(input1, 2), 2);

        if (Math.abs(input2) > 1) {
            alert("!!! abs(nu) <= 1 !!!");
            return;
        }

        while (Math.abs(P) >= EPS) {
            k += 2;
            P *= -1 * t2 * q / k / (k + 1);
            q *= nu4;
            S += P;
        }
        output.value = S;
    }
}