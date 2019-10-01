import hashlib
import random

class UserManager:
    def __init__(self, db):
        self.db = db
        self.hashlib = hashlib

    def login(self, nickname, hash):
        if nickname and hash:  
            user = self.db.getUserByNickname(nickname)
            if user and user['hash'] == hash:
                rand = random.random();
                token = hashlib.md5().hexdigest()
                self.db.setToken(user['id'], token)
                return token
        return None

    def registration(self, nickname, hash):
        if nickname and hash:  
            user = self.db.getUserByNickname(nickname)
            if not user:
                self.db.registration(nickname, hash)
                return True
        return False