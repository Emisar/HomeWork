var request = require('request');

const BaseRouter = require('../application/router/BaseRouter');
const answer = new BaseRouter();
const ADDRESS = 'http://localhost:5000';

function requestToAPIMethod(name, method, resp) {
    it(name, function(done) { // название теста
        request(ADDRESS + method, function(error, response, body) { // посылает запрос
            expect(JSON.parse(body)).toEqual(resp); // сравнивает на прямое совпадение
            done(); // завершить исполнение этого теста
        });
    });
}

// все тесты должны находиться внутри блока
describe('REST full API unexist path', function() {
    requestToAPIMethod("should respond JSON with 404", '/hello', answer.error(404));
    requestToAPIMethod("should respond JSON with 404", '/sdfg', answer.error(404));
    requestToAPIMethod("should respond JSON with 404", '/sdfg/sdfg/sdfg/dsfg/fgh', answer.error(404));
});

describe('REST full API login', function() {
    requestToAPIMethod("should respond JSON with 404", '/login/vasya/', answer.error(404));
    //requestToAPIMethod("should respond JSON with 323", '/login/sss/123', answer.error(323));
    requestToAPIMethod("should respond JSON with 323", '/login/vasya/123', answer.error(323));
});
