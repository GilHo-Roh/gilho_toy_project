import Koa = require('koa');
import Router = require('koa-router')
import serve = require('koa-static')
import fs = require('fs')

const bodyParser = require('koa-bodyparser')

const app = new Koa();
app.use(bodyParser())
const router = new Router()

let userInfo = [
	{ email: 'kim@test.com', password: '1234' },
	{ email: 'lee@test.com', password: '5678' },
	{ email: 'choi@test.com', password: '1357' },
	{ email: 'park@test.com', password: '2468' }
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

  const { user_id, user_pw } = ctx.request.body
  const user = userInfo.filter(data => data.email == user_id && data.password == user_pw)
  ctx.body = {ok: true, user:user}

  await next()
})

router.post('/api/signup', async(ctx,next)=>{
  const { user_id, user_pw } = ctx.request.body

  const user = userInfo.filter(data => data.email == user_id)
  if (user.length == 0){
    userInfo.push({email:user_id, password:user_pw})
    ctx.body = {ok: true}
  }
  else{
    ctx.body = {ok: false}
  }
  await next()
})

app.use(serve('./src/client'));
app.use(serve('./build'));
app.use(router.routes())
app.listen(3000);