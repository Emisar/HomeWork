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

function checkUserLogout(nickname, hash) {
    it(`logout ${nickname}`, function(done){
        request(ADDRESS + `/login/${nickname}/${hash}`, function(error, response, body) { // посылает запрос
            const { result, data } = JSON.parse(body);
            expect(result).toBe('ok');
            expect(data).toBeDefined();
            expect(data.token).toBeDefined();
            const token = data.token;

            request(ADDRESS + `/logout/${token}`, function(error, response, body) { // посылает запрос
                const {result} = JSON.parse(body);
                expect(result).toBe('ok');
                done(); // завершить исполнение этого теста
            });
        });
    });
}

describe('REST full API logout', function() {
    checkUserLogout("vasya", "4a2d247d0c05a4f798b0b03839d94cf0");
    checkUserLogout('bezbabnik', '7c4d3e6e46003006872ac04cef0c8c44');
});