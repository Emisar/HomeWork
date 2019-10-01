import random

class Game: 
    def __init__(self, db):
        self.isCheat = False
        self.values = ['rock', 'scissors', 'paper']
        self.db = db

    def actionTurn(self, value, token):
        if token:
            user = self.db.getUserByToken(token)
            if user:
                compValue = random.choice(self.values)
                if self.isCheat == True:
                    self.db.updateLoseCount(user['id'], int(user['lose_score']) + 1)
                    return 'Проиграл!'
                elif value == compValue: 
                    return 'Ничья!'
                elif (value == self.values[0] and compValue == self.values[2]) or (value == self.values[1] and compValue == self.values[0]) or (value == self.values[2] and compValue == self.values[1]):
                    self.db.updateLoseScore(user['id'], int(user['lose_score']) + 1)
                    return 'Проиграл!'
                else:
                    self.db.updateWinScore(user['id'], int(user['win_score']) + 1)
                    return 'Победил!'

    def cheat(self, token):
        if token:
            user = self.db.getUserByToken(token)
            if user:
                self.isCheat = not self.isCheat
                if self.isCheat:
                    return 'Ты выбрал смерть'
                else:
                    return 'Так у тебя хотя бы есть шансы'

    def getScore(self, token):
        if token:
            user = self.db.getUserByToken(token)
            if user:
                return {
                    'winScore': user['win_score'],
                    'loseScore': user['lose_score']
                }
        return None
        
