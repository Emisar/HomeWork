import sqlite3

class DB:
    def __init__(self, options):
        self.conn = sqlite3.connect(options['PATH'])
        self.db = self.conn.cursor()

    def __del__(self):
        self.conn.close()

    """ Из массива в объект """
    def getObject(self, array):
        return dict(zip([c[0] for c in self.db.description], array))

    """ Из массива массивов в массив объектов """
    def getArrayObject(self, array):
        result = []
        for _array in array:
            result.append(self.getObject(_array))
        return result

    """ Дать игрока по токену """
    def getUserByToken(self, token):
        query = 'SELECT * FROM user WHERE token = ?'
        request = self.db.execute(query, [token]).fetchone()
        if request:
            result = self.getObject(request)
            return result
        return None

    """ Дать игрока по нику"""
    def getUserByLogin(self, login):
        query = 'SELECT * FROM user WHERE login = ?'
        request = self.db.execute(query, [login]).fetchone()
        if request:
            result = self.getObject(request)
            return result
        return None

    """ Задать токен """
    def setToken(self, id, token):
        query = 'UPDATE user SET token = ? WHERE id = ?'
        self.db.execute(query, [token, id])
        self.conn.commit()

    """ Регистрация """
    def registration(self, login, hash):
        query = 'INSERT INTO user (login, hash) VALUES (?, ?)'
        self.db.execute(query, [login, hash])
        self.conn.commit()
