from aiohttp import web

from settings import SETTINGS
from application.modules.Mediator import Mediator
from application.modules.db.DB import DB
from application.modules.user.UserManager import UserManager
from application.router.Router import Router


mediator = Mediator(SETTINGS['MEDIATOR'])
db = DB(SETTINGS['DB'])
UserManager(db, mediator)
app = web.Application()

Router(app, web, mediator)

async def on_startup(app):
    print('Запустился!!')

async def on_shutdown(app):
    print('Умер')

async def on_cleanup(app):
    print('Очистился')

app.on_startup.append(on_startup)
app.on_shutdown.append(on_shutdown)
app.on_cleanup.append(on_cleanup)

web.run_app(app)