const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')
const auth = require('./server/auth')

const RedisSessionStore = require('./server/session-store')

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

// 创建redis client
const redis = new Redis()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  server.keys = ['Jever develop GitHub App']

  const SESSION_CONFIG = {
    key: 'jid',
    store: new RedisSessionStore(redis)
  }

  server.use(session(SESSION_CONFIG, server))

  server.use(async (ctx, next) => {
    console.log('session is:', ctx.session)

    await next()
  })

  // 配置处理github oauth 登录
  auth(router)

  router.get('/a/:id', async ctx => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    })

    ctx.respond = false
  })

  router.get('/set/user', async ctx => {
    ctx.session.user = {
      name: 'jever',
      age: '18'
    }
    ctx.body = 'set session success'
  })

  router.get('/delete/user', async ctx => {
    ctx.session = null
    ctx.body = 'delete session success'
  })

  server.use(router.routes())

  server.use(async (ctx, next) => {
    // ctx.cookies.set('id', 'userid:xxxx')
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })
})
