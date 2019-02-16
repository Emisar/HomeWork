var express = require('express');
var app = express();

let a = 0;

app.get('/square', (req, res) => {
    const a = req.query.a;
    const result = a ? a * a : 'something broke!';
    res.send({result});
});

app.get('/inc', (req, res) => {
    a++;
    res.send({a});
})
  
app.get('/', (req, res) => {
  res.send('Hello World!');
});
  
app.all('/*', (req, res) => {
    res.send('Wrong way!!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

