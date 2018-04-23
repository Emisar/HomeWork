function lesson2() {
	//Добавляем урок
    addLesson("Quadratic equation");
	//Добавляем задания
    addExercise(2, 'Sqrt of number', 1);
    addExercise(2, 'Sqr equtation', 3);
	//Добавляем поля для ответов
    for (var i = 1; i <= 2; i++) { addAnswer(2, i); }
    
    var contents = document.getElementsByClassName('content-elem');
	var exercises = contents[1].getElementsByClassName('exercise');
    
    exercises[0].getElementsByClassName('enter-button')[0].onclick = function () {		//Вычисляем квадратный корень
        var input = exercises[0].getElementsByClassName('input-field')[0].value - 0;
        var output = exercises[0].getElementsByClassName('output-field')[0];
		var answerField = exercises[0].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
		
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
		var answerField = exercises[1].getElementsByClassName('answer')[0];
		
		removeClass(answerField, 'hide');
		addClass(answerField, 'show');
		
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
};