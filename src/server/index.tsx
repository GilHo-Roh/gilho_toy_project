import Koa = require('koa')
import Router = require('koa-router')
import serve = require('koa-static')
import fs = require('fs')
import bcrypt = require('bcryptjs')
import { generateToken, checkToken } from './jwt'
import {
  loadAllArticle,
  loadArticle,
  saveArticle,
  getAccount,
  saveAccount,
  removeArticle,
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

router.post('/api/signin', async (ctx, next) => {
  const { user_id, user_pw } = ctx.request.body
  console.log(user_id, user_pw)
  const res = await getAccount(user_id)

  const isValid = await bcrypt.compare(user_pw, res.password as string)
  if (isValid) {
    const token = generateToken(user_id)
    ctx.cookies.set('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      secureProxy: true,
    })
  }

  ctx.body = { ok: isValid }

  await next()
})

router.post('/api/signup', async (ctx, next) => {
  const { user_id, user_pw } = ctx.request.body
  const saltRounds = 10
  const res = await getAccount(user_id)
    .then((result) => false)
    .catch((err) => true)

  if (res) {
    bcrypt.hash(user_pw, saltRounds, async function (err, cryptedPassword) {
      if (err) {
        ctx.body = { ok: false }
      } else {
        console.log(cryptedPassword)
        await saveAccount(user_id, cryptedPassword)
      }
    })
  }

  ctx.body = { ok: res }

  await next()
})

router.post('/api/submit', async (ctx, next) => {
  const { user_id, title, article } = ctx.request.body

  var res = false
  await getAccount(user_id)
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
  await loadAllArticle().then((result) => {
    ctx.body = { ok: true, res: result }
  })
  await next()
})

router.post('/api/remove', async (ctx, next) => {
  const { title } = ctx.request.body
  const token = ctx.cookies.get('jwt')
  const user = checkToken(token)

  await loadArticle(title).then((result) => {
    if (result.email == user) {
      removeArticle(title)
      ctx.body = { ok: true }
    } else {
      ctx.body = { ok: false }
    }
  })
  await next()
})

router.get('/api/auth', async (ctx, next) => {
  const token = ctx.cookies.get('jwt')
  //console.log(token)
  if (token != undefined) {
    const decode = checkToken(token)
    //console.log(decode)
    ctx.body = { ok: true, res: decode }
  } else {
    ctx.body = { ok: false, res: undefined }
  }
  await next()
})

router.get('/api/logout', async (ctx, next) => {
  ctx.cookies.set('jwt', undefined)
  ctx.body = { ok: true }
  await next()
})

app.use(serve('./src/client'))
app.use(serve('./build'))
app.use(router.routes())
app.listen(3000)
