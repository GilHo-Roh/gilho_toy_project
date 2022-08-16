import Koa = require('koa')
import Router = require('koa-router')
import serve = require('koa-static')
import fs = require('fs')
import {
  loadAll,
  loadArticle,
  saveArticle,
  signinDB,
  signupDB,
} from './database'

const bodyParser = require('koa-bodyparser')

const app = new Koa()
app.use(bodyParser())
const router = new Router()

// const regex = /^(\/)(\w*)(\/?)$/
const regex = /^(?!\/api).*/
router.get(regex, async (ctx) => {
  const html = await fs.promises.readFile('./src/client/index.html', 'utf-8')
  ctx.body = html
})

router.get('/api/hello', async (ctx, next) => {
  ctx.body = 'Hello world!'
  await next()
})

//make server api
router.post('/api/signin', async (ctx, next) => {
  const { user_id, user_pw } = ctx.request.body

  const res = await signinDB(user_id)
    .then((result) => result.password === user_pw)
    .catch((err) => false)

  ctx.cookies.set('jwt', 'token', {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    secureProxy: true,
  })

  ctx.body = { ok: res }

  await next()
})

router.post('/api/signup', async (ctx, next) => {
  const { user_id, user_pw } = ctx.request.body

  const res = await signinDB(user_id)
    .then((result) => false)
    .catch((err) => true)

  if (res) {
    await signupDB(user_id, user_pw)
  }

  ctx.body = { ok: res }

  await next()
})

router.post('/api/submit', async (ctx, next) => {
  const { user_id, title, article } = ctx.request.body

  var res = false
  await signinDB(user_id)
    .then((result) => (res = true))
    .catch((err) => (res = false))

  if (res) {
    await saveArticle(user_id, title, article)
  }

  ctx.body = { ok: true }

  await next()
})

router.post('/api/read', async (ctx, next) => {
  const { title } = ctx.request.body

  console.log(ctx.cookies.get('jwt'))

  await loadArticle(title)
    .then((res) => {
      ctx.body = { ok: true, result: res }
    })
    .catch((err) => {
      ctx.body = { ok: false, result: null }
    })
  await next()
})

router.get('/api/articles', async (ctx, next) => {
  await loadAll().then((result) => {
    ctx.body = { ok: true, res: result }
  })
  await next()
})

app.use(serve('./src/client'))
app.use(serve('./build'))
app.use(router.routes())
app.listen(3000)
