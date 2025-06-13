import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

type role = 'admin' | 'user'
export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn, options: { role: role }) {
    /**
     * Middleware logic goes here (before the next call)
     */

    if (options.role == 'admin') {
      if (ctx.auth.user?.roleId != 1) {
        return ctx.response.forbidden({
          message: `You must be ${options.role} to access this route`,
        })
      }
    }

    if (options.role == 'user') {
      if (ctx.auth.user?.roleId != 2) {
        return ctx.response.forbidden({
          message: `You must be ${options.role} to access this route`,
        })
      }
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
