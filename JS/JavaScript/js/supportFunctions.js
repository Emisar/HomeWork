/*
===== ===== ===== Функции для создания элементов меню ===== ===== =====
*/

function addLesson(lessonName) {
	var head = document.getElementById('head');
	var content = document.getElementById('content');
	//Добавляем кнопку урока
	var headElem = document.createElement('div');
	headElem.setAttribute('class', 'head-elem');
	headElem.innerHTML = "L" + (document.getElementsByClassName('head-elem').length + 1) + ". " + lessonName;
	head.appendChild(headElem);
	//Добавляем контент урока
	var contentElem = document.createElement('div')
	contentElem.setAttribute('class', 'content-elem hide');
	content.appendChild(contentElem);
}

function addExercise(lessonNumber, exerciseName, inputFieldsNumber) {
	var contents = document.getElementsByClassName('content-elem');
	//Добавляем поле упражнения
	var exercise = document.createElement("div");
    exercise.setAttribute("class", "exercise");
    contents[lessonNumber - 1].appendChild(exercise);
	//Добавляем заголовок задания
	var exeTitle = document.createElement("h3");
    exeTitle.innerHTML = "Ex" + (contents[lessonNumber - 1].getElementsByClassName('exercise').length) + ". "  + exerciseName;
    exercise.appendChild(exeTitle);
	//Добавляем поля ввода
	for (var i = 1; i <= inputFieldsNumber; i++) {
		//Добавляем текст-подсказку
		var supText = document.createElement("span");
        supText.innerHTML = "Input the number: ";
        exercise.appendChild(supText);
		//Добавляем поле ввода
        var input = document.createElement("input");
        input.setAttribute("type", "text");
		input.setAttribute("class", "input-field");
		input.setAttribute("maxlength", 6);
        exercise.appendChild(input);
		//Переносим строку
		if (i != inputFieldsNumber) {
			exercise.innerHTML += '</br>';
		}
	}
	//Добавляем кнопку
	var button = document.createElement("input");
	button.setAttribute("type", "button");
	button.setAttribute("class", "enter-button");
	button.setAttribute("value", "Enter");
	exercise.appendChild(button);
	//Добавляем поле для ответа
	var answerBlock = document.createElement("div");
    answerBlock.setAttribute("class", "answer hide");
    exercise.appendChild(answerBlock);
}

function addAnswer(lessonNumber, exerciseNumber) {
	var contents = document.getElementsByClassName('content-elem');
	var exercises = contents[lessonNumber - 1].getElementsByClassName('exercise');
	var answerBlock = exercises[exerciseNumber - 1].getElementsByClassName('answer')[0];
	//Добавляем текст-подсказку
	var outText = document.createElement("span");
    outText.innerHTML = "Answer: ";
    answerBlock.appendChild(outText);
	//Добавляем поле вывода
	var output = document.createElement("input");
    output.setAttribute("class", "output-field");
    output.setAttribute("type", "text");
    output.setAttribute("readonly", true);
    answerBlock.appendChild(output);
}

function addMatrixAnswer(lessonNumber, exerciseNumber, matrixNumber) {
	var contents = document.getElementsByClassName('content-elem');
	var exercises = contents[lessonNumber - 1].getElementsByClassName('exercise');
	var answerBlock = exercises[exerciseNumber - 1].getElementsByClassName('answer')[0];
	//Добавляем поля для матриц
	for (var i = 0; i < matrixNumber; i++) {
		var matrixField = document.createElement('div');
		matrixField.setAttribute('class', 'matrix-field');
		answerBlock.appendChild(matrixField);
	}
}

/*
===== ===== ===== Вспомогательные функции ===== ===== =====
*/

function addClass(elem, _class) {
    var arr = elem.className.split(" ");
    if (!(arr.indexOf(_class) > -1)) {
        arr.push(_class);
        elem.className = arr.join(" ");
    }
};

function removeClass(elem, _class) {
    var arr = elem.className.split(" ");
    if (arr.indexOf(_class) > -1) {
        arr.splice(arr.indexOf(_class), 1);
        elem.className = arr.join(" ");
    }
};

function randomNumber(min, max) {
    var num = min - 0.5 + Math.random() * (max - min + 1);
    num = Math.round(num);
    return num;
}

/*
===== ===== ===== Функции матриц ===== ===== =====	
*/

function printMatrix(elem, arr) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			var matrixElem = elem.getElementsByClassName('matrix-elem')[i * arr[i].length + j];
			matrixElem.setAttribute('disabled', true);
			matrixElem.value = arr[i][j];
		}
	}
}

function genMatrixInputs(matrixField, sizeX, sizeY) {
	var fieldValue = [];
	for (var i = 0; i < sizeX; i++) {
		fieldValue[i] = []
		for (var j = 0; j < sizeY; j++) {
			fieldValue[i][j] = null;
			if (matrixField.getElementsByClassName('matrix-elem')[i * sizeY + j]) {
				fieldValue[i][j] = matrixField.getElementsByClassName('matrix-elem')[i * sizeY + j].value - 0;
			}
		}
	}
	matrixField.innerHTML = '';
	for (var i = 0; i < sizeX; i++) {
		for (var j = 0; j < sizeY; j++) {
			var matrixElem = document.createElement('input');
			matrixElem.setAttribute('type', 'text');
			matrixElem.setAttribute('class', 'matrix-elem');
			matrixElem.setAttribute('maxlength', 2);
			matrixElem.value = fieldValue[i][j];
			matrixField.appendChild(matrixElem);
		}
		matrixField.innerHTML += '</br>';
	}
}

function getMatrix(elem, sizeX, sizeY) {
    var arr = [];
    for (var i = 0; i < sizeX; i++) {
        arr[i] = [];
        for (var j = 0; j < sizeY; j++) {
            arr[i][j] = elem.getElementsByClassName('matrix-elem')[i * sizeY + j].value - 0;
        }
    }
    return arr;
}

function plusMatrix(a, b) {
    var arr = [];
    for (var i = 0; i < a.length; i++) {
        arr[i] = [];
        for (var j = 0; j < a[i].length; j++) {
            arr[i][j] = a[i][j] + b[i][j];
        }
    }
    return arr;
}

function minusMatrix(a, b) {
    var arr = [];
    for (var i = 0; i < a.length; i++) {
        arr[i] = [];
        for (var j = 0; j < a[i].length; j++) {
            arr[i][j] = a[i][j] - b[i][j];
        }
    }
    return arr;
}

function multMatrix(a, b) {
    var arr = [];
	var s = 0;
    for (var i = 0; i < a.length; i++) {
        arr[i] = [];
        for (var j = 0; j < a[i].length; j++) {
			s = 0;
            for (var k = 0; k < a[i].length; k++) {
				s += a[i][k] * b[k][j];
			};
			arr[i][j] = s;
        }
    }
    return arr;
}

function modulMatrix(a) {
    var modul = 0, sum;
    for (var i = 0; i < a.length; i++) {
        sum = 0;
        for (var j = 0; j < a[i].length; j++) {
            sum += a[i][j];
        }
        if (sum > modul) {
            modul = sum;
        }
    }
    return modul;
}

