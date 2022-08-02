import Koa = require('koa');
import Router = require('koa-router')
import serve = require('koa-static');

const app = new Koa();
const router = new Router();

router.get('/hello', async(ctx,next)=>{
  ctx.body = 'Hello world!';
  await next();
})

app.use(serve('./build'));
app.use(router.routes());
app.listen(3000);