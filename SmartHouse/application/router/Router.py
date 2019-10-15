import random
'''
from application.game.Game import Game
from application.db.DB import DB
from application.user.UserManager import UserManager
'''

class Router:
    def __init__(self, app, web, mediator):
        self.web = web
        self.mediator = mediator
        
        routers = [
            ('GET', '/api/registration/{login}/{hash}', self.registrationHandler),
            ('GET', '/api/login/{login}/{hash}', self.loginHandler),
            ('GET', '/api/logout/{token}', self.logoutHandler),
            ('*', '/', self.staticHandler)
        ]
        app.router.add_static('/js/', path=str('./public/js/'))
        for route in routers:
            app.router.add_route(route[0], route[1], route[2])

    def staticHandler(self, request):
        return self.web.FileResponse('./public/index.html')

    """ Войти в систему """
    def loginHandler(self, request):
        login = request.match_info.get('login')
        hash = request.match_info.get('hash')
        result = self.mediator.get(self.mediator.getTriggerTypes()['LOGIN'], { 'login': login, 'hash': hash })
        return self.answer(result, 'Вы не авторизовались!')
    
    """ Выйти из системы """
    def logoutHandler(self, request):
        token = request.match_info.get('token')
        result = self.mediator.get(self.mediator.getTriggerTypes()['LOGOUT'], { 'token': token })
        return self.answer(result, 'Ошибка деавторизации!')

    """ Регистрация в системе """
    def registrationHandler(self, request):
        login = request.match_info.get('login')
        hash = request.match_info.get('hash')
        result = self.mediator.get(self.mediator.getTriggerTypes()['REGISTRATION'], { 'login': login, 'hash': hash })
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