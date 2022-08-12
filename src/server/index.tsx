import Koa = require('koa')
import Router = require('koa-router')
import serve = require('koa-static')
import fs = require('fs')
import { signinDB, signupDB } from './database'

const bodyParser = require('koa-bodyparser')

const app = new Koa()
app.use(bodyParser())
const router = new Router()

let userInfo = [
  { email: 'kim@test.com', password: '1234' },
  { email: 'lee@test.com', password: '5678' },
  { email: 'choi@test.com', password: '1357' },
  { email: 'park@test.com', password: '2468' },
]

const regex = /^(\/)(\w*)(\/?)$/
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
  var res = false
  await signinDB(user_id)
    .then((result) => {
      console.log(result)
      if (result.password === user_pw) {
        res = true
      }
    })
    .catch((err) => (res = false))
  console.log(res)
  ctx.body = { ok: res }

  await next()
})

router.post('/api/signup', async (ctx, next) => {
  const { user_id, user_pw } = ctx.request.body

  var res = true
  await signinDB(user_id)
    .then((result) => (res = false))
    .catch((err) => (res = true))

  if (res) {
    await signupDB(user_id, user_pw)
  }

  ctx.body = { ok: res }

  await next()
})

app.use(serve('./src/client'))
app.use(serve('./build'))
app.use(router.routes())
app.listen(3000)
