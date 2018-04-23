function lesson6() {
	//Заголовки заданий
	const exercisesName = ['Common Matrix', 'Sort Row Matrix (1, 2, 3, ...)', 'Sort Row Matrix (... , 3, 2, 1)', 
										'Sort Colums Matrix (1, 2, 3, ...)', 'Sort Colums Matrix (... , 3, 2, 1)'];
	//Добавляем урок
    addLesson("Matrix!");
	//Добавляем задания
	for (var i = 0; i < 5; i++) {addExercise(6, exercisesName[i], 2);}
	//Добавляем поля вывода
	for (var i = 1; i <= 5; i++) {addMatrixAnswer(6, i, 1);}

    var contents = document.getElementsByClassName('content-elem');
	var exercises = contents[5].getElementsByClassName('exercise');

    exercises[0].getElementsByClassName('enter-button')[0].onclick = function () {		//Создание обычной матрицы
        var input1 = exercises[0].getElementsByClassName('input-field')[0].value - 0;
        var input2 = exercises[0].getElementsByClassName('input-field')[1].value - 0;
		var answerField = exercises[0].getElementsByClassName('answer')[0];
		var matrixField = answerField.getElementsByClassName('matrix-field')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
		
		genMatrixInputs(matrixField, input1, input2);

        var arr = [];
        for (var i = 0; i < input1; i++) {
            arr[i] = [];
            for (var j = 0; j < input2; j++) {
                arr[i][j] = randomNumber(1, 9);
            }
        }

        printMatrix(matrixField, arr);
    }

    exercises[1].getElementsByClassName('enter-button')[0].onclick = function () {		//Сортированная по строкам матрица (1, 2, 3, ...)
        var input1 = exercises[1].getElementsByClassName('input-field')[0].value - 0;
        var input2 = exercises[1].getElementsByClassName('input-field')[1].value - 0;
		var answerField = exercises[1].getElementsByClassName('answer')[0];
		var matrixField = answerField.getElementsByClassName('matrix-field')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
		
		genMatrixInputs(matrixField, input1, input2);

        var x = 1;
        var arr = [];
        for (var i = 0; i < input1; i++) {
            arr[i] = [];
            for (var j = 0; j < input2; j++) {
                arr[i][j] = x;
                x++;
            }
        }

        printMatrix(matrixField, arr);
    }

    exercises[2].getElementsByClassName('enter-button')[0].onclick = function () {		//Сортированная по строкам матрица (... , 3, 2, 1)
        var input1 = exercises[2].getElementsByClassName('input-field')[0].value - 0;
        var input2 = exercises[2].getElementsByClassName('input-field')[1].value - 0;
		var answerField = exercises[2].getElementsByClassName('answer')[0];
		var matrixField = answerField.getElementsByClassName('matrix-field')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
		
		genMatrixInputs(matrixField, input1, input2);

        var x = input1 * input2;
        var arr = [];
        for (var i = 0; i < input1; i++) {
            arr[i] = [];
            for (var j = 0; j < input2; j++) {
                arr[i][j] = x;
                x--;
            }
        }

        printMatrix(matrixField, arr);
    }

    exercises[3].getElementsByClassName('enter-button')[0].onclick = function () {		//Сортированная по столбцам матрица (1, 2, 3, ...)
        var input1 = exercises[3].getElementsByClassName('input-field')[0].value - 0;
        var input2 = exercises[3].getElementsByClassName('input-field')[1].value - 0;
		var answerField = exercises[3].getElementsByClassName('answer')[0];
		var matrixField = answerField.getElementsByClassName('matrix-field')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
		
		genMatrixInputs(matrixField, input1, input2);

        var arr = [];
        for (var i = 0; i < input1; i++) {
            arr[i] = [];
            for (var j = 0; j < input2; j++) {
                arr[i][j] = 0;
            }
        }

        var x = 1;

        for (var j = 0; j < input2; j++) {
            for (var i = 0; i < input1; i++) {
                arr[i][j] = x;
                x++;
            }
        }
        
        printMatrix(matrixField, arr);
    }

    exercises[4].getElementsByClassName('enter-button')[0].onclick = function () {		//Сортированная по столбцам матрица (... , 3, 2, 1)
        var input1 = exercises[4].getElementsByClassName('input-field')[0].value - 0;
        var input2 = exercises[4].getElementsByClassName('input-field')[1].value - 0;
		var answerField = exercises[4].getElementsByClassName('answer')[0];
		var matrixField = answerField.getElementsByClassName('matrix-field')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
		
		genMatrixInputs(matrixField, input1, input2);

        var arr = [];
        for (var i = 0; i < input1; i++) {
            arr[i] = [];
            for (var j = 0; j < input2; j++) {
                arr[i][j] = 0;
            }
        }

        var x = input1 * input2;

        for (var j = 0; j < input2; j++) {
            for (var i = 0; i < input1; i++) {
                arr[i][j] = x;
                x--;
            }
        }

        printMatrix(matrixField, arr);
    }
}