import random

from application.game.Game import Game
from application.db.DB import DB
from application.user.UserManager import UserManager

class Router:
    def __init__(self, app, web):
        self.web = web
        self.db = DB()
        self.userManager = UserManager(self.db)
        self.game = Game(self.db)
        routers = [
            ('GET', '/api/test', self.testHandler),
            ('GET', '/api/login/{nickname}/{hash}', self.loginHandler),
            ('GET', '/api/game/actionTurn/{token}/{value}', self.actionTurnHandler),
            ('GET', '/api/game/getCounts/{token}', self.getScoreHandler),
            ('GET', '/api/game/cheat/{token}', self.cheatHandler),
            
            ('*', '/', self.staticHandler)
        ]
        app.router.add_static('/js/', path=str('./public/js/'))
        for route in routers:
            app.router.add_route(route[0], route[1], route[2])

    def testHandler(self, request):
        self.db.setToken(1, '222')        
    def staticHandler(self, request):
        return self.web.FileResponse('./public/index.html')

    """ Сделать ход """
    def actionTurnHandler(self, request):
        value = request.match_info.get('value')
        token = request.match_info.get('token')
        print(token)
        result = self.game.actionTurn(value, token)
        return self.answer(result, 'Что-то пошло не так. Попробуйте ещё раз!')
    """ Непобедимая машина """
    def cheatHandler(self, request):
        token = request.match_info.get('token')
        result = self.game.cheat(token)
        return self.answer(result, 'Что-то пошло не так. Попробуйте ещё раз!')
    """ Получить счёт игрока """
    def getScoreHandler(self, request):
        token = request.match_info.get('token')
        result = self.game.getScore(token)
        return self.answer(result, 'Что-то пошло не так. Попробуйте ещё раз!')
    """ Войти в систему """
    def loginHandler(self, request):
        nickname = request.match_info.get('nickname')
        hash = request.match_info.get('hash')
        result = self.userManager.login(nickname, hash)
        print(result)
        return self.answer(result, 'Вы не авторизовались!')
    """ Регистрация в системе """
    def registrationHandler(self, request):
        nickname = request.match_info.get('nickname')
        hash = request.match_info.get('hash')
        result = self.userManager.registration(nickname, hash)
        return self.answer(result, 'Вы не зарегистрировались!')

    def answer(self, data, error):
        if data:
            return self.good(data)
        else:
            return self.bad(error)
    def good(self, data):
        return self.web.json_response({
            'result': 'ok',
            'data': data
        })
    def bad(self, error):
        return self.web.json_response({
            'result': 'error',
            'data': error
        })