import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import fs from 'fs'

import bodyParser from 'koa-bodyparser'
import api from './middleware/api'
import { errorHandler } from './middleware/auth'

const app = new Koa()
app.use(bodyParser())
const router = new Router()

router.use('/api', api.routes())

const nonAPIRegex = /^(?!\/api).*/
router.get(nonAPIRegex, async (ctx) => {
  const html = await fs.promises.readFile('./src/client/index.html', 'utf-8')
  ctx.body = html
})

app.use(errorHandler())
app.use(serve('./src/client'))
app.use(serve('./build'))
app.use(router.routes())
app.listen(3000)
