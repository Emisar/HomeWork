from aiohttp import web

from application.router.Router import Router

app = web.Application()

Router(app, web)

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