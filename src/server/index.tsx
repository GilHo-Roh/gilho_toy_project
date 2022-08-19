import Koa = require('koa')
import Router = require('koa-router')
import serve = require('koa-static')
import fs = require('fs')

import bodyParser = require('koa-bodyparser')
import api from './middleware/api'
import { errorHandler } from './middleware/auth'

const app = new Koa()
app.use(bodyParser())
const router = new Router()

router.use('/api', api.routes())

const regex = /^(?!\/api).*/
router.get(regex, async (ctx) => {
  const html = await fs.promises.readFile('./src/client/index.html', 'utf-8')
  ctx.body = html
})

app.use(errorHandler())
app.use(serve('./src/client'))
app.use(serve('./build'))
app.use(router.routes())
app.listen(3000)
