export const errorHandler = () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = 200
      ctx.body = { ok: false }
    }
  }
}
