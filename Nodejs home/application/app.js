var Man     = require('./classes/Man');
var Woman   = require('./classes/Woman');
var MathPlus= require('./logic/mathPlus');
var express = require('express');

var app     = express();
var humans  = [];
var manCounter = 0;
var womanCounter = 0;

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
  manCounter++;
  res.send({Massage: 'Man created!'});
});

// Создать женщину (Помещается в конец массива)
app.get('/cwoman', (req, res) => {
  humans.push(new Woman(MathPlus.getRandomInt(0, 100)));
  womanCounter++;
  res.send('Woman created!');
});

// Выбрать пару
app.get('/pare', (req, res) => {
  if (humans.length < 2) {
    res.send('You can not choose a pare! Not enough people!');
  } 
  else if (manCounter == 0 || womanCounter == 0) {
    res.send('You can not choose a pare! You have only one type of people!');
  }
  else {
    res.send({
      Man: humans[MathPlus.getRandomInt(0, manCounter - 1)],
      Woman: humans[MathPlus.getRandomInt(womanCounter - 1, humans.length)]
    });
  }
});

// Ошибочный api
app.all('/*', (req, res) => {
  res.send('Error 404! Page not found!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});