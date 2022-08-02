import Koa = require('koa');
import Router = require('koa-router')
import serve = require('koa-static');
import fs = require('fs')

const app = new Koa();
const router = new Router()

const regex = /^(\/)(\w*)(\/?)$/
router.get(regex, async (ctx) => {
  const html = await fs.promises.readFile('./src/client/index.html', 'utf-8')
  ctx.body = html
})

router.get('/api/hello', async(ctx,next)=>{
  ctx.body = 'Hello world!';
  await next();
})

app.use(serve('./src/client'));
app.use(serve('./build'));
app.use(router.routes());
app.listen(3000);