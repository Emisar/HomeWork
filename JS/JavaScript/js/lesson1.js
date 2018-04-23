function getY1(x) {
    return ((x <= -1) ? -1 : (x <= 1) ? x : 1);
}

function getY2(x) {
    return ((Math.abs(x) >= 0, 5) ? (1 / x) : (4 * x));
}

function sqrAim(x, y) {
    return ((Math.abs(x) <= 1) && (Math.abs(y) <= 1) ? 1 : 0);
}

function cirAim(x, y) {
    return ((Math.pow(x, 2) + Math.pow(y, 2) <= 1) && (y < 0) ? 2 : (Math.pow(x, 2) + Math.pow(y, 2) <= 1) && (y > 0) ? 1 : 0);
}

function brkCirAim(x, y) {
    return ((Math.pow(x, 2) + Math.pow(y, 2) <= 1) && (x >= 0) && (y >= 0) ? 2 : (Math.pow(x, 2) + Math.pow(y, 2) <= 1) && (x <= 0) && (y <= 0) ? 1 : 0);
}

function cirSqrAim(x, y) {
    return ((Math.pow(x, 2) + Math.pow(y, 2) <= 1) && (x >= 0) && (y >= 0) ? 2 : (x >= -1) && (y >= -1) && (x <= 0) && (y <= 0) ? 1 : 0);
}

function lesson1() {
	const exercisesName = ['Graph 1', 'Graph 2', 'Sqr Aim', 'Round Aim', 'Broken Round Aim', 'Sqr & Round Broken Aim'];
	//Добавляем урок
    addLesson("Target");
	//Добавляем задания
	for (var i = 0; i < 6; i++) {
		((i < 2) ? addExercise(1, exercisesName[i], 1) : addExercise(1, exercisesName[i], 2));
	}
	//Добавляем поля для ответов
	for (var i = 1; i <= 6; i++) {addAnswer(1, i);}
	
    var contents = document.getElementsByClassName('content-elem');
	var exercises = contents[0].getElementsByClassName('exercise');

    exercises[0].getElementsByClassName('enter-button')[0].onclick = function () {		//Первый график
        var input = exercises[0].getElementsByClassName('input-field')[0].value - 0;
        var output = exercises[0].getElementsByClassName('output-field')[0];
		var answerField = exercises[0].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
		
		if (isNaN(input) || !input) {
            alert("Enter the number");
            return;
        }

        output.value = getY1(input);
    }

    exercises[1].getElementsByClassName('enter-button')[0].onclick = function () {		//Второй график
        var input = exercises[1].getElementsByClassName('input-field')[0].value - 0;
        var output = exercises[1].getElementsByClassName('output-field')[0];
		var answerField = exercises[1].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
		
		if (isNaN(input) || !input) {
            alert("Enter the number");
            return;
        }

        output.value = getY2(input);
    }

    exercises[2].getElementsByClassName('enter-button')[0].onclick = function () {		//Квадратная мишень
        var inputX = exercises[2].getElementsByClassName('input-field')[0].value - 0;
        var inputY = exercises[2].getElementsByClassName('input-field')[1].value - 0;
        var output = exercises[2].getElementsByClassName('output-field')[0];
		var answerField = exercises[2].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
		
		if (isNaN(inputX) || !inputX || isNaN(inputY) || !inputY) {
            alert("Enter the number");
            return;
        }

        output.value = sqrAim(inputX, inputY);
    }

    exercises[3].getElementsByClassName('enter-button')[0].onclick = function () {		//Круглая мишень
        var inputX = exercises[3].getElementsByClassName('input-field')[0].value - 0;
        var inputY = exercises[3].getElementsByClassName('input-field')[1].value - 0;
        var output = exercises[3].getElementsByClassName('output-field')[0];
		var answerField = exercises[3].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
		
		if (isNaN(inputX) || !inputX || isNaN(inputY) || !inputY) {
            alert("Enter the number");
            return;
        }

        output.value = cirAim(inputX, inputY);
    }

    exercises[4].getElementsByClassName('enter-button')[0].onclick = function () {		//Сломаная круглая мишень
        var inputX = exercises[4].getElementsByClassName('input-field')[0].value - 0;
        var inputY = exercises[4].getElementsByClassName('input-field')[1].value - 0;
        var output = exercises[4].getElementsByClassName('output-field')[0];
		var answerField = exercises[4].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
		
		if (isNaN(inputX) || !inputX || isNaN(inputY) || !inputY) {
            alert("Enter the number");
            return;
        }

        output.value = brkCirAim(inputX, inputY);
    }

    exercises[5].getElementsByClassName('enter-button')[0].onclick = function () {		//Сломанная круглая и квадратная мишень
        var inputX = exercises[5].getElementsByClassName('input-field')[0].value - 0;
        var inputY = exercises[5].getElementsByClassName('input-field')[1].value - 0;
        var output = exercises[5].getElementsByClassName('output-field')[0];
		var answerField = exercises[5].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
		
		if (isNaN(inputX) || !inputX || isNaN(inputY) || !inputY) {
            alert("Enter the number");
            return;
        }

        output.value = cirSqrAim(inputX, inputY);
    }
}