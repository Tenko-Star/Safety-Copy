import koa from 'koa'
import koaRouter from 'koa-router'
import koaWebsocket from 'koa-websocket'

const app = koaWebsocket(new koa())
const router = new koaRouter()

router.all('/websocket/:id', ctx => {
    const room = ctx.params.id

    console.log(ctx.params)

    ctx.websocket.on('message', msg => {
        console.log(`msg from front end: ${room} msg: ${msg}`)

        ctx.websocket.send(`msg from front end: ${room} msg: ${msg}`)
    })

    ctx.websocket.on('close', () => {
        console.log("connect closed.")
    })
})

app.ws
.use(router.routes())
.use(router.allowedMethods())

app.listen(8088, () => {
    console.log("Server start on port 8088.")
})