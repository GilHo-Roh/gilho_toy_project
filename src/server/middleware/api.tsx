import bcrypt = require('bcryptjs')
import { generateToken, checkToken } from '../utility/jwt'
import {
  loadAllArticle,
  loadArticle,
  saveArticle,
  getAccount,
  saveAccount,
  removeArticle,
} from '../utility/database'
import Router = require('koa-router')

const api = new Router()

api.post('/signin', async (ctx, next) => {
  const { email, pw } = ctx.request.body

  const result = await getAccount(email)

  const isValid = await bcrypt.compare(pw, result.res.password as string)
  if (isValid) {
    const token = generateToken(email)
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

api.post('/signup', async (ctx, next) => {
  const { email, pw } = ctx.request.body
  const saltRounds = 10

  const res = await getAccount(email)

  if (!res.ok) {
    const cryptedPassword = await bcrypt.hash(pw, saltRounds)
    await saveAccount(email, cryptedPassword)
  }
  ctx.body = { ok: res }
  await next()
})

api.post('/submit', async (ctx, next) => {
  const { title, contents } = ctx.request.body
  console.log(title)
  const id = checkToken(ctx.cookies.get('jwt'))
  const res = await getAccount(id)
  console.log(contents)
  if (res.ok) await saveArticle(id, title, contents)

  ctx.body = { ok: true }

  await next()
})

api.post('/read', async (ctx, next) => {
  const { title } = ctx.request.body
  console.log(title)
  try {
    const res = await loadArticle(title)
    ctx.body = { ok: true, result: res }
  } catch {
    ctx.body = { ok: false, result: null }
  }

  await next()
})

api.post('/remove', async (ctx, next) => {
  const { title } = ctx.request.body
  const token = ctx.cookies.get('jwt')
  const user = checkToken(token)

  const result = await loadArticle(title)

  if (result.email == user) {
    removeArticle(title)
    ctx.body = { ok: true }
  } else {
    ctx.body = { ok: false }
  }

  await next()
})

api.get('/articles', async (ctx, next) => {
  const result = await loadAllArticle()

  ctx.body = { ok: true, res: result }

  await next()
})

api.get('/auth', async (ctx, next) => {
  const token = ctx.cookies.get('jwt')

  if (token != undefined) {
    const decode = checkToken(token)
    ctx.body = { ok: true, res: decode }
  } else {
    ctx.body = { ok: false, res: undefined }
  }
  await next()
})

api.get('/logout', async (ctx, next) => {
  ctx.cookies.set('jwt', undefined)
  ctx.body = { ok: true }
  await next()
})

export default api
