import Router = require('koa-router')

const auth = new Router()

auth.get('/test', (ctx) => {
  ctx.body = 'test'
})
/*
auth.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      message: err.message,
    }
  }
})
*/
export default auth

//200으로 보내고 ok를 false 날려준다.
