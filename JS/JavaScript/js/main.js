function mainMenu() {
	var heads = document.getElementsByClassName('head-elem');
	var contents = document.getElementsByClassName('content-elem');
	
	for (var i = 0; i < heads.length; i++) {
		//Добавляем замыкание для передачи переменной i
		(function(i) {
			heads[i].addEventListener('click', function() {
				//Убираем выделение со всех кнопок
				for (var j = 0; j < heads.length; j++) {
					removeClass(heads[j], 'head-elem-selected');
                }
                //Добавляем выделение на нужную кнопку
				addClass(this, 'head-elem-selected');
				//Скрываем весь контент
				for (var j = 0; j < contents.length; j++) {
					removeClass(contents[j], 'show');
					addClass(contents[j], 'hide');
				}
				//Показываем нужный контент
				removeClass(contents[i], 'hide');
				addClass(contents[i], 'show');
			});
		})(i);
	}
}

window.onload = function() {
	lesson1();
	lesson2();
	lesson3();
	lesson4();
	lesson5();
	lesson6();
	lesson7();
	lesson8();
    lesson9();
    lesson10();
	mainMenu();
}