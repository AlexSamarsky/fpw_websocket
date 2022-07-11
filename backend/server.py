from aiohttp import web
import aiohttp

PORT = 3003


def init():
    app = web.Application()
    app["sockets"] = []
    app.router.add_get("/", get_news)
    app.router.add_post("/news", new_post)
    app.router.add_get("/check", check_connection)
    app.on_shutdown.append(on_shutdown)
    return app


async def get_news(request: web.Request):
    resp: web.WebSocketResponse = web.WebSocketResponse()
    available = resp.can_prepare(request)
    if not available:
        return web.Response(body="error", status=web.HTTPBadGateway)

    await resp.prepare(request)

    await resp.send_str('Вы подписались на канал новостей')

    request.app["sockets"].append(resp)

    try:
        async for msg in resp:
            if msg.type == web.WSMsgType.TEXT:
                for ws in request.app["sockets"]:
                    if ws is not resp:
                        print(msg)
                        await ws.send_str(msg.data)
            else:
                return resp
        return resp
    finally:
        request.app["sockets"].remove(resp)


async def new_post(request: web.Request):
    ws: web.WebSocketResponse
    for ws in request.app["sockets"]:
        ob = await request.json()
        await ws.send_json(ob)
    return web.Response(status=200)


async def check_connection(request: web.Request):
    async with aiohttp.ClientSession() as session:
        pass


async def on_shutdown(app: web.Application):
    for ws in app["sockets"]:
        await ws.close()

if __name__ == "__main__":
    web.run_app(init(), port=PORT)
