const Human = require('./application/human');
const Woman = require('./application/woman');
const express = require('express');
var app = express();

let a = 0;

var people = [];

app.get('/sex', (req, res) => {
    const human1 = people[ Math.round(Math.random() * (people.length - 1))];
    const human2 = people[ Math.round(Math.random() * (people.length - 1))];

    var sex = Human.sex(human1, human2);
    if (sex) {
        res.send('Есть пробитие!'); 
    } else if (sex === undefined) { 
        res.send('Трахание накалено.');
    } else {
        res.send('Трахание охлаждено.');
    }
});

app.get('/newHuman', (req, res) => {
    const beauty = req.query.beauty;
    const fullness = req.query.fullness;
    const happiness = req.query.happiness;
    if (beauty){
        var human = new Woman(fullness, happiness, beauty)
    } else {
        var human = new Human(fullness, happiness);
    }
    people.push(human);
    res.send( people );
});

  
app.get('/', (req, res) => {
  res.send('Hallo Welt!');
});
  
app.all('/*', (req, res) => {
    res.send('Wrong way!!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

