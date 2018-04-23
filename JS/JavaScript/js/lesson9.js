//===== ===== ===== Ресурсная часть ===== ===== =====

const PARTS_OF_LINE = 3;		//Кол-во элементов в линии для победы
const MARKS = {X: 1, O: 0, EMPTY: null}     //Отметки на поле
var xoField = [];       //Матрица игрового поля
var fieldSize = 0;      //Размер игрового поля
var moveCounter = 1;        //Счетчик ходов
var users = {};
var gamer_1, gamer_2;

//===== ===== ===== Вспомогательные функции ===== ===== =====

function createXOGameField (elem, size) {
	//Удаляем предыдущее поле
	elem.innerHTML = '';
	//Запоминаем размер поля
	fieldSize = size;
	//Заполняем матрицу в памяти
	xoField = [];
	for (var i = 0; i < fieldSize; i++) {
		xoField[i] = [];
        for (var j = 0; j < fieldSize; j++) {
            xoField[i][j] = MARKS.EMPTY;
		}
	}
	//Создаем матрицу на странице
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			var matrixElem = document.createElement('input');
			matrixElem.setAttribute('type', 'text');
			matrixElem.setAttribute('class', 'matrix-elem');
			matrixElem.setAttribute('maxlength', 1);
			elem.appendChild(matrixElem);
		}
		elem.innerHTML += '</br>';
	}
}

function gamersRegistration (gamer1, gamer2) {
	var gamers = [gamer1, gamer2];
	
	for (var i = 0; i < gamers.length; i++) {
		//Проверка на ИИ
		if (!gamers[i]) {gamers[i] = 'Hard_AI';}
		//Проверка на наличее игрока в памяти
		if (!users[gamers[i]]) {
			users[gamers[i]] = {name: gamers[i], gameCount: 0, winCount: 0};
		}
	}
	//Сохраняем имена игроков
	gamer_1 = gamers[0];
	gamer_2 = gamers[1];
	//Засчитываем участие в игре
	users[gamer_1].gameCount++;
	users[gamer_2].gameCount++;
}

function gameLogic (xoField) {
	var xCounter = 0;
	var oCounter = 0;
    //Проверка по горизонталям
    xCounter = 0;
    oCounter = 0;
	for (var i = 0; i < fieldSize; i++) {
        for (var j = 0; j < fieldSize; j++) {
            if (xoField[i][j] == MARKS.X) {
				xCounter++;
				oCounter = 0;
			}
            if (xoField[i][j] == MARKS.O) {
				xCounter = 0;
				oCounter++;
            }
            if (xoField[i][j] === MARKS.EMPTY) {
				xCounter = 0;
				oCounter = 0;
			}
            if (xCounter == PARTS_OF_LINE) {
                return MARKS.X;
			} 
            if (oCounter == PARTS_OF_LINE) {
                return MARKS.O;
			} 
        }
        xCounter = 0;
        oCounter = 0;
	}
    //Проверка по вертикалям
    xCounter = 0;
    oCounter = 0;
	for (var i = 0; i < fieldSize; i++) {
		for (var j = 0; j < fieldSize; j++) {
            if (xoField[j][i] == MARKS.X) {
				xCounter++;
				oCounter = 0;
			}
            if (xoField[j][i] == MARKS.O) {
				xCounter = 0;
				oCounter++;
            }
            if (xoField[j][i] === MARKS.EMPTY) {
				xCounter = 0;
				oCounter = 0;
			}
			if (xCounter == PARTS_OF_LINE) {
                return MARKS.X;
			} 
			if (oCounter == PARTS_OF_LINE) {
                return MARKS.O;
			} 
        }
        xCounter = 0;
        oCounter = 0;
	}
    //Проверка по главной диагонали
    //По оси Y
    xCounter = 0;
    oCounter = 0;
    for (var i = 0; i < fieldSize; i++) {
        for (var j = 0; j < fieldSize; j++) {
            if (xoField[j + i] === undefined ||
                xoField[j + i][j] === undefined) {
                break;
            }
            if (xoField[j + i][j] == MARKS.X) {
				xCounter++;
				oCounter = 0;
            }
            if (xoField[j + i][j] == MARKS.O) {
				xCounter = 0;
				oCounter++;
            }
            if (xoField[j + i][j] === MARKS.EMPTY) {
				xCounter = 0;
				oCounter = 0;
			}
			if (xCounter == PARTS_OF_LINE) {
                return MARKS.X;
			} 
			if (oCounter == PARTS_OF_LINE) {
                return MARKS.O;
			} 
        }
        xCounter = 0;
        oCounter = 0;
    }
    //По оси X
    xCounter = 0;
    oCounter = 0;
    for (var i = 0; i < fieldSize; i++) {
        for (var j = 0; j < fieldSize; j++) {
            if (xoField[j][j + i] === undefined) {
                break;
            }
            if (xoField[j][j + i] == MARKS.X) {
                xCounter++;
                oCounter = 0;
            }
            if (xoField[j][j + i] == MARKS.O) {
                xCounter = 0;
                oCounter++;
            }
            if (xoField[j][j + i] === MARKS.EMPTY) {
                xCounter = 0;
                oCounter = 0;
            }
            if (xCounter >= PARTS_OF_LINE) {
                return MARKS.X;
            }
            if (oCounter >= PARTS_OF_LINE) {
                return MARKS.Y;
            }
        }
        xCounter = 0;
        oCounter = 0;
    }
    //Проверка по побочной диагонали
    //По оси Y
    xCounter = 0;
    oCounter = 0;
    for (var i = 0; i < fieldSize; i++) {
        for (var j = 0; j < fieldSize; j++) {
            if (xoField[j + i] === undefined ||
                xoField[j + i][fieldSize - 1 - j] === undefined) {
                break;
            }
            if (xoField[j + i][fieldSize - 1 - j] == MARKS.X) {
                xCounter++;
                oCounter = 0;
            }
            if (xoField[j + i][fieldSize - 1 - j] == MARKS.O) {
                xCounter = 0;
                oCounter++;
            }
            if (xoField[j + i][fieldSize - 1 - j] === MARKS.EMPTY) {
                xCounter = 0;
                oCounter = 0;
            }
            if (xCounter == PARTS_OF_LINE) {
                return MARKS.X;
            }
            if (oCounter == PARTS_OF_LINE) {
                return MARKS.O;
            }
        }
        xCounter = 0;
        oCounter = 0;
    }
    //По оси X
    xCounter = 0;
    oCounter = 0;
    for (var i = 0; i < fieldSize; i++) {
        for (var j = 0; j < fieldSize; j++) {
            if (xoField[j][fieldSize - 1 - j - i] === undefined) {
                break;
            }
            if (xoField[j][fieldSize - 1 - j - i] == MARKS.X) {
                xCounter++;
                oCounter = 0;
            }
            if (xoField[j][fieldSize - 1 - j - i] == MARKS.O) {
                xCounter = 0;
                oCounter++;
            }
            if (xoField[j][fieldSize - 1 - j - i] === MARKS.EMPTY) {
                xCounter = 0;
                oCounter = 0;
            }
            if (xCounter >= PARTS_OF_LINE) {
                return MARKS.X;
            }
            if (oCounter >= PARTS_OF_LINE) {
                return MARKS.O;
            }
        }
        xCounter = 0;
        oCounter = 0;
    }
	//Проверка на ничью
	if (moveCounter > fieldSize * fieldSize) {return 2;}
	//Ничего не произошло
	return 3;
}

function checkingMove (fieldElem, output, moveResult) {
    switch (moveResult) {
        case MARKS.O:		//Победа второго игрока
			for (var i = 0; i < fieldElem.length; i++) {
				fieldElem[i].setAttribute('disabled', true);
			}
			alert(users[gamer_2].name + ' is a winner!');
            users[gamer_2].winCount++;
            output.value = users[gamer_2].name + ': ' + 'Games: ' + users[gamer_2].gameCount + ', Wins: ' + users[gamer_2].winCount;
            console.log(users);
            break;
        case MARKS.X:		//Победа первого игрока
			for (var i = 0; i < fieldElem.length; i++) {
				fieldElem[i].setAttribute('disabled', true);
			}
			alert(users[gamer_1].name + ' is a winner!');
			users[gamer_1].winCount++;
            output.value = users[gamer_1].name + ': ' + 'Games: ' + users[gamer_1].gameCount + ', Wins: ' + users[gamer_1].winCount;
            console.log(users);
			break;
		case 2:		//Ничья
			for (var i = 0; i < fieldElem.length; i++) {
				fieldElem[i].setAttribute('disabled', true);
			}
			alert('Draw!');
            output.value = 'Draw!';
            console.log(users);
			break;
		default:
			break;
	}
}

function secondTurn(x, y, mark) {
    if (fieldSize >= 5) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (xoField[x - 1 + i] === undefined ||
                    xoField[x - 1 + i][y - 1 + j] === undefined) {
                    continue;
                }
                if (i === 1 && j === 1) {
                    continue;
                } else {
                    if (xoField[x - 1 + i][y - 1 + j] === mark) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function ai(xoField, mark) {
    //Создаем копию поля
    var xo = [];
    for (var i = 0; i < fieldSize; i++) {
        xo[i] = [];
        for (var j = 0; j < fieldSize; j++) {
            xo[i][j] = xoField[i][j];
        }
    }
    /* 
    |ZZZZZ| Проверка победы |ZZZZZ|
    */
    for (var i = 0; i < fieldSize; i++) {
        for (var j = 0; j < fieldSize; j++) {
            if (xo[i][j] === MARKS.EMPTY) {
                xo[i][j] = mark;
                if (gameLogic(xo) === mark) {
                    return i * fieldSize + j;
                }
                xo[i][j] = MARKS.EMPTY;
            }
        }
    }
    /* 
    |ZZZZZ| Проверка победы противника |ZZZZZ|
    */
    var antiMark = (mark === MARKS.X) ? MARKS.O : MARKS.X;
    for (var i = 0; i < fieldSize; i++) {
        for (var j = 0; j < fieldSize; j++) {
            if (xo[i][j] === MARKS.EMPTY) {
                xo[i][j] = antiMark;
                if (gameLogic(xo) === antiMark) {
                    return i * fieldSize + j;
                }
                xo[i][j] = MARKS.EMPTY;
            }
        }
    }
    /* 
    |ZZZZZ| Проверка победы через ход |ZZZZZ|
    */
    for (var i = 0; i < fieldSize; i++) {
        for (var j = 0; j < fieldSize; j++) {
            if (xo[i][j] === MARKS.EMPTY) {
                xo[i][j] = mark;
                for (var i1 = 0; i1 < fieldSize; i1++) {
                    for (var j1 = 0; j1 < fieldSize; j1++) {
                        if (xo[i1][j1] === MARKS.EMPTY) {
                            xo[i1][j1] = mark;
                            if (gameLogic(xo) === mark) {
                                return i * fieldSize + j;
                            }
                            xo[i1][j1] = MARKS.EMPTY;
                        }
                    }
                }
                xo[i][j] = MARKS.EMPTY;
            }
        }
    }
    /* 
    |ZZZZZ| Случайный ход |ZZZZZ|
    */
    while (true) {
        var i = Math.floor(Math.random() * fieldSize);
        var j = Math.floor(Math.random() * fieldSize);
        if (xo[i][j] === MARKS.EMPTY) {
            return i * fieldSize + j;
            break;
        }
    }
    return false;
}

function triggerEvent(el, type, keyCode) {
    if ('createEvent' in document) {
        var e = document.createEvent('HTMLEvents');
        e.keyCode = keyCode;
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    }
}

//===== ===== ===== Главная функция ===== ===== =====

function lesson9() {
	//Заголовок задания
	const exerciseName = 'XO - Game';
	//Добавляем урок
	addLesson('XO - Game');
	//Добавляем задание
	addExercise(9, 1, 3);
	//Добавляем поле ответа
	addMatrixAnswer(9, 1, 1);
	addAnswer(9, 1);
	
	var contents = document.getElementsByClassName('content-elem');
	var exercises = contents[8].getElementsByClassName('exercise')[0];
	var answerField = exercises.getElementsByClassName('answer')[0];
	var matrixField = answerField.getElementsByClassName('matrix-field')[0];
	
	exercises.getElementsByClassName('enter-button')[0].onclick = function () {
		var output = answerField.getElementsByClassName('output-field')[0];
		//Считываем данные
		var size = exercises.getElementsByClassName('input-field')[0].value - 0;
		var gamer1 = exercises.getElementsByClassName('input-field')[1].value + '';
		var gamer2 = exercises.getElementsByClassName('input-field')[2].value + '';
		//Сбрасываем счетчик ходов
		moveCounter = 1;
		//Создаем игровое поле
		if (size >= 3 && size <= 15) {
			createXOGameField(matrixField, size);
		} else {
			alert("Game field can't be less 3 and more 15!");
			return;
		}
		//Регистрируем игроков
		if (gamer1 !== gamer2) {
			gamersRegistration(gamer1, gamer2);
		} else {
			alert("Gamer's nicknames must be different!");
			return;
		}
		
		//Назначаем "слушателей" на ячейки игрового поля
		var xoFieldElems = matrixField.getElementsByClassName('matrix-elem');
		
		for (var i = 0; i < xoFieldElems.length; i++) {
			(function(i, output) {
				xoFieldElems[i].addEventListener('keyup', function(event) {
					//Проверка нажатой клавиши
					switch(event.keyCode) {
                        case 88: 		//Нажатие "Х"
                            if ((moveCounter % 2 !== 0 && moveCounter !== 3) ||
                                (moveCounter === 3 && !secondTurn(Math.floor(i / fieldSize), Math.floor(i % fieldSize), MARKS.X))) {
								this.value = 'X';
                                this.setAttribute('disabled', true);
                                xoField[Math.floor(i / fieldSize)][Math.floor(i % fieldSize)] = MARKS.X;
                                moveCounter++;
                                if (gameLogic(xoField) !== 3) {
                                    checkingMove(xoFieldElems, output, gameLogic(xoField));
                                } else if (gamer_2 === 'Hard_AI') {
                                    var step = ai(xoField, MARKS.O);
                                    if (step !== false) {
                                        triggerEvent(xoFieldElems[step], 'keyup', 79);
                                    }
                                }
							} else {
                                this.value = '';
                                if (gamer_1 === 'Hard_AI') {
                                    var step = ai(xoField, MARKS.X);
                                    if (step !== false) {
                                        triggerEvent(xoFieldElems[step], 'keyup', 88);
                                    }
                                }
							}
							break;
						case 79:		//Нажатие "О"
                            if (moveCounter % 2 === 0) {
								this.value = 'O';
                                this.setAttribute('disabled', true);
                                xoField[Math.floor(i / fieldSize)][Math.floor(i % fieldSize)] = MARKS.O;
								moveCounter++;
                                if (gameLogic(xoField) !== 3) {
                                    checkingMove(xoFieldElems, output, gameLogic(xoField));
                                } else if (gamer_1 === 'Hard_AI') {
                                    var step = ai(xoField, MARKS.X);
                                    if (step !== false) {
                                        triggerEvent(xoFieldElems[step], 'keyup', 88);
                                    }
                                }
							} else {
                                this.value = '';
							}
							break;
						default:
							this.value = '';
							console.log(xoFieldElems);
					}
				});
			})(i, output);
        }

        //Проявляем игровое поле
        removeClass(answerField, 'hide');
        addClass(answerField, 'show');

        //Запускаем ход компьютера
        if (gamer_1 === 'Hard_AI') {
            var step = ai(xoField, MARKS.X);
            if (step !== false) {
                xoFieldElems[step].value = 'X';
                triggerEvent(xoFieldElems[step], 'keyup', 88);
            }
        }
	}
}