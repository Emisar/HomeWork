function lesson8() {
	//Заголовки заданий
	const exercisesName = ['Sum of Matrix', 'Difference of Matrix', 'Product of Matrix', 'Modul of Matrix'];
	//Добавляем урок
    addLesson("Math Matrix");
	//Добавляем задания
    for (var i = 0; i < 4; i++) {((i == 2) ? addExercise(8, exercisesName[i], 1) : addExercise(8, exercisesName[i], 2));}
	//Добавляем поля ответов
	for (var i = 1; i <= 3; i++) {addMatrixAnswer(8, i, 3);}
	addMatrixAnswer(8, 4, 1);
	addAnswer(8, 4);

    var contents = document.getElementsByClassName('content-elem');
	var exercises = contents[7].getElementsByClassName('exercise');

    exercises[0].getElementsByClassName('enter-button')[0].onclick = function () {		//Сумма матриц
        var input1 = exercises[0].getElementsByClassName('input-field')[0].value - 0;
        var input2 = exercises[0].getElementsByClassName('input-field')[1].value - 0;
		var answerField = exercises[0].getElementsByClassName('answer')[0];
		var matrixFields = [answerField.getElementsByClassName('matrix-field')[0], 
							answerField.getElementsByClassName('matrix-field')[1], 
							answerField.getElementsByClassName('matrix-field')[2]];

        if (input1 && input1 >= 1 && input2 && input2 >= 1) {
            var sizeX = input1;
            var sizeY = input2;
			
			removeClass(answerField, 'hide');
			addClass(answerField, 'show');

			for (var i = 0; i < 3; i++) {
				genMatrixInputs(matrixFields[i], sizeX, sizeY);
			}

            for (var i = 0; i < 2; i++) {
				for (var j = 0; j < matrixFields[i].getElementsByClassName('matrix-elem').length; j++) {
					matrixFields[i].getElementsByClassName('matrix-elem')[j].addEventListener('keyup', function (event) {
						if (event.keyCode - 48 >= 0 && event.keyCode - 48 <= 9 || event.keyCode == 13) {
							var a = getMatrix(matrixFields[0], sizeX, sizeY);
							var b = getMatrix(matrixFields[1], sizeX, sizeY);
							
							printMatrix(matrixFields[2], plusMatrix(a, b));
						} else {
							this.value = '';
						}
					});
				}
			}
        }
    }

    exercises[1].getElementsByClassName('enter-button')[0].onclick = function () {		//Разность матриц
        var input1 = exercises[1].getElementsByClassName('input-field')[0].value - 0;
        var input2 = exercises[1].getElementsByClassName('input-field')[1].value - 0;
		var answerField = exercises[1].getElementsByClassName('answer')[0];
		var matrixFields = [answerField.getElementsByClassName('matrix-field')[0], 
							answerField.getElementsByClassName('matrix-field')[1], 
							answerField.getElementsByClassName('matrix-field')[2]];

        if (input1 && input1 >= 1 && input2 && input2 >= 1) {
            var sizeX = input1;
            var sizeY = input2;
			
			removeClass(answerField, 'hide');
			addClass(answerField, 'show');

			for (var i = 0; i < 3; i++) {
				genMatrixInputs(matrixFields[i], sizeX, sizeY);
			}

            for (var i = 0; i < 2; i++) {
				for (var j = 0; j < matrixFields[i].getElementsByClassName('matrix-elem').length; j++) {
					matrixFields[i].getElementsByClassName('matrix-elem')[j].addEventListener('keyup', function (event) {
						if (event.keyCode - 48 >= 0 && event.keyCode - 48 <= 9 || event.keyCode == 13) {
							var a = getMatrix(matrixFields[0], sizeX, sizeY);
							var b = getMatrix(matrixFields[1], sizeX, sizeY);
							
							printMatrix(matrixFields[2], minusMatrix(a, b));
						} else {
							this.value = '';
						}
					});
				}
			}
        }
    }

    exercises[2].getElementsByClassName('enter-button')[0].onclick = function () {		//Произведение матриц
        var input = exercises[2].getElementsByClassName('input-field')[0].value - 0;
		var answerField = exercises[2].getElementsByClassName('answer')[0];
		var matrixFields = [answerField.getElementsByClassName('matrix-field')[0], 
							answerField.getElementsByClassName('matrix-field')[1], 
							answerField.getElementsByClassName('matrix-field')[2]];

        if (input && input >= 1) {
            var size = input;
			removeClass(answerField, 'hide');
			addClass(answerField, 'show');

			for (var i = 0; i < 3; i++) {
				genMatrixInputs(matrixFields[i], size, size);
			}

            for (var i = 0; i < 2; i++) {
				for (var j = 0; j < matrixFields[i].getElementsByClassName('matrix-elem').length; j++) {
					matrixFields[i].getElementsByClassName('matrix-elem')[j].addEventListener('keyup', function (event) {
						if (event.keyCode - 48 >= 0 && event.keyCode - 48 <= 9 || event.keyCode == 13) {
							var a = getMatrix(matrixFields[0], size, size);
							var b = getMatrix(matrixFields[1], size, size);
							
							printMatrix(matrixFields[2], multMatrix(a, b));
						} else {
							this.value = '';
						}
					});
				}
			}
        }
    }

    exercises[3].getElementsByClassName('enter-button')[0].onclick = function () {		//Модуль матрицы
        var input1 = exercises[3].getElementsByClassName('input-field')[0].value - 0;
        var input2 = exercises[3].getElementsByClassName('input-field')[1].value - 0;
		var output = exercises[3].getElementsByClassName('output-field')[0];
		var answerField = exercises[3].getElementsByClassName('answer')[0];
		var matrixField = answerField.getElementsByClassName('matrix-field')[0];

        if (input1 && input1 >= 1 && input2 && input2 >= 1) {
            var sizeX = input1;
            var sizeY = input2;
			removeClass(answerField, 'hide');
			addClass(answerField, 'show');

            genMatrixInputs(matrixField, sizeX, sizeY);

            for (var i = 0; i < matrixField.getElementsByClassName('matrix-elem').length; i++) {
				matrixField.getElementsByClassName('matrix-elem')[i].addEventListener('keyup', function (event) {
					if (event.keyCode - 48 >= 0 && event.keyCode - 48 <= 9 || event.keyCode == 13) {
						var a = getMatrix(matrixField, sizeX, sizeY);
						
						output.value = modulMatrix(a);
					} else {
						this.value = '';
					}
				});
			}
        }
    }
}