var Man     = require('./application/classes/Man');
var Woman   = require('./application/classes/Woman');
var MathPlus= require('./application/logic/mathPlus');
var express = require('express');

var app     = express();
var humans  = [];

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Проверка населения
app.get('/population', (req, res) => {
  res.send({ humans });
});

// Создать мужчину (Помещается в начало массива)
app.get('/cman', (req, res) => {
  humans.unshift(new Man(MathPlus.getRandomInt(0, 100)));
  res.send('Man created!');
});

// Создать женщину (Помещается в конец массива)
app.get('/cwoman', (req, res) => {
  humans.push(new Woman(MathPlus.getRandomInt(0, 100)));
  res.send('Woman created!');
});

// Выбрать пару
app.get('/pare', (req, res) => {
  if (humans.length < 2) {
    res.send('You can not choose a pare! Not enough people!');
  } 
  else if (humans[0].sex == 'female' || humans[humans.length - 1].sex == 'male') {
    res.send('You can not choose a pare! You have only one type of people!');
  }
  else {
    var man = humans[0];
    var woman = humans[humans.length - 1];
    var manCheck = true, womanCheck = true;
    for (i = 0; i < humans.length - 1; i++) {
      if (humans[i].sex == 'female' && manCheck) {
        man = humans[MathPlus.getRandomInt(0, i)];
        manCheck = false;
      }
      if (humans[humans.length - 1 - i].sex == 'male' && womanCheck) {
        woman = humans[MathPlus.getRandomInt(humans.length - i, humans.length)]
        womanCheck = false;
      }
    }
    res.send({
      Man: man,
      Woman: woman
    });
  }
});

app.get('/eat', (req, res) => {
  var num = req.query.num;
  var value = req.query.value;
  humans[num].eat(value);
  res.send(humans[num]);
});

app.get('/sleep', (req, res) => {
  var num = req.query.num;
  var value = req.query.value;
  humans[num].sleep(value);
  res.send(humans[num]);
});

// Ошибочный api
app.all('/*', (req, res) => {
  res.send('Error 404! Page not found!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});