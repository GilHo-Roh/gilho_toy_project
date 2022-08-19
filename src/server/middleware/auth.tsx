import type { Middleware } from 'koa'

export const errorHandler = (): Middleware => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = 200
      ctx.body = { ok: false }
    }
  }
}
