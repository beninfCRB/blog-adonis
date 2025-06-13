import env from '#start/env'
import { defineConfig } from '@adonisjs/auth'
import { sessionUserProvider } from '@adonisjs/auth/session'
import type { Authenticators, InferAuthEvents } from '@adonisjs/auth/types'
import { JwtGuard } from '../app/auth/guards/jwt.js'

const jwtConfig = {
  secret: env.get('JWT_SECRET') ?? 'secret',
  expiresIn: Number(env.get('JWT_EXPIRES_IN')) ?? 60,
}
const userProvider = sessionUserProvider({
  model: () => import('#models/user'),
})

const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    jwt: (ctx) => {
      return new JwtGuard(ctx, userProvider, jwtConfig)
    },
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  export interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
