import Koa = require('koa');
import Router = require('koa-router')
import serve = require('koa-static')
import fs = require('fs')

const bodyParser = require('koa-bodyparser')

const app = new Koa();
const router = new Router()

let userInfo = [
	{ id: 101, email: 'kim@test.com', password: '1234' },
	{ id: 102, email: 'lee@test.com', password: '5678' },
	{ id: 103, email: 'choi@test.com', password: '1357' },
	{ id: 101, email: 'park@test.com', password: '2468' }
];


const regex = /^(\/)(\w*)(\/?)$/
router.get(regex, async (ctx) => {
  const html = await fs.promises.readFile('./src/client/index.html', 'utf-8')
  ctx.body = html
})

router.get('/api/hello', async(ctx,next)=>{
  ctx.body = 'Hello world!'
  await next()
})

//make server api
router.post('/api/signin', async(ctx,next)=>{
  var res = false
  const { user_id, user_pw } = ctx.request.body
  const user = userInfo.filter(data => data.email == user_id && data.password == user_pw);
  console.log(user)
  ctx.body = {ok: true, user:user}
  await next()
})

app.use(serve('./src/client'));
app.use(serve('./build'));
app.use(router.routes())
app.listen(3000);