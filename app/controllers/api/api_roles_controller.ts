import Role from '#models/role'
import { updateProductValidator } from '#validators/product'
import { createRoleValidator } from '#validators/role'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class ApiRolesController {
  /**
   * Handle form submission for the get action
   */
  async showAll({ response, request }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)
      const search = request.input('search')
      const query = db.query()
      query.from('roles')

      if (search) {
        query.where('name', 'like', `%${search}%`)
      }

      const data = (await query.paginate(page, limit)).all()

      return response.json({
        message: 'Role berhasil diambil',
        data,
      })
    } catch (error) {
      return response.notFound({
        message: error.message,
        data: null,
      })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await createRoleValidator.validate(request.all())
      const data = await Role.create(payload)
      return response.json({
        message: 'Role berhasil ditambahkan',
        data,
      })
    } catch (error) {
      return response.badRequest({
        message: error.message,
        data: null,
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const data = await Role.findOrFail(params.id)
      return response.json({
        message: 'Role berhasil diambil',
        data,
      })
    } catch (error) {
      return response.notFound({
        message: error.message,
        data: null,
      })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const payload = await updateProductValidator.validate(request.all())
      const role = await Role.findOrFail(params.id)
      role.merge(payload)
      await role.save()

      return response.json({
        message: `Role dengan ID ${params.id} berhasil diupdate`,
        data: role,
      })
    } catch (error) {
      if (error === 'E_RECORD_NOT_FOUND') {
        return response.notFound({
          message: `Role dengan ID ${params.id} tidak ditemukan`,
          data: null,
        })
      }
      return response.badRequest({
        message: error.message,
        data: null,
      })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const role = await Role.findOrFail(params.id)
      await role.delete()
      return response.json({
        message: `Role dengan ID ${params.id} berhasil dihapus`,
        data: null,
      })
    } catch (error) {
      if (error === 'E_RECORD_NOT_FOUND') {
        return response.notFound({
          message: `Role dengan ID ${params.id} tidak ditemukan`,
          data: null,
        })
      }
      return response.badRequest({
        message: error.message,
        data: null,
      })
    }
  }
}
