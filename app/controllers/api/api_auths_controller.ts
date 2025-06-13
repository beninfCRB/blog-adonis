import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class ApiAuthsController {
  async register({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await registerValidator.validate(data)
      const user = await User.create(payload)

      return await response.json({
        message: 'Pengguna berhasil didaftarkan',
        data: user,
      })
    } catch (error) {
      return response.badRequest({
        message: error.message,
        data: null,
      })
    }
  }

  async login({ auth, request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await loginValidator.validate(data)
      const user = await User.verifyCredentials(payload.email, payload.password)
      const { token } = await auth.use('jwt').generate(user)

      return await response.json({
        message: 'Pengguna berhasil login',
        data: {
          fullName: user.fullName,
          email: user.email,
          roleId: user.roleId,
          token,
        },
      })
    } catch (error) {
      return response.badRequest({
        message: error.message,
        data: null,
      })
    }
  }

  async me({ auth }: HttpContext) {
    await auth.use('jwt').authenticate()
    return auth.user
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('jwt').clear()
    return response.json({
      message: 'Pengguna berhasil logout',
      data: null,
    })
  }
}
