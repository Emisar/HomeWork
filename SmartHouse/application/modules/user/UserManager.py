import hashlib
import random

from ..BaseModule import BaseModule

class UserManager(BaseModule):
    def __init__(self, db, mediator):
        super().__init__(mediator)
        self.mediator.set('LOGIN', self.login)
        self.mediator.set('LOGOUT', self.logout)
        self.mediator.set('REGISTRATION', self.registration)
        self.db = db
        self.hashlib = hashlib


    def login(self, options):
        md5 = hashlib.md5
        login = options['login']
        hash = options['hash']
        if login and hash:
            user = self.db.getUserByLogin(login)
            if user and user['hash'] == hash:
                token = md5((hash + str(random.uniform(0, 10000))).encode('utf-8')).hexdigest()
                self.db.setToken(user['id'], token)
                return token
        return None

    def logout(self, options):
        token = options['token']
        if token:
            user = self.db.getUserByToken(token)
            if user:
                self.db.setToken(user['id'], None)
                return True
        return None

    def registration(self, options):
        login = options['login']
        hash = options['hash']
        if login and hash:
            user = self.db.getUserByLogin(login)
            if not user:
                self.db.registration(login, hash)
                return True
        return False