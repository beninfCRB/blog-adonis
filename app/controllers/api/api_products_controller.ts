import Product from '#models/product'
import { createProductValidator, updateProductValidator } from '#validators/product'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'

export default class ApiProductsController {
  /**
   * Handle form submission for the get action
   */
  async showAll({ response, request }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)
      const search = request.input('search')
      const query = db.query()
      query.from('products')

      if (search) {
        query.where('name', 'like', `%${search}%`)
      }

      const data = (await query.paginate(page, limit)).all()

      return response.json({
        message: 'Produk berhasil diambil',
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
      const payload = await createProductValidator.validate(request.all())
      if (payload.image) {
        await payload.image.move(app.makePath('storage/uploads'), {
          name: `${cuid()}.${payload.image.extname}`,
        })
      }
      const imagePath = payload.image ? `storage/uploads/${payload.image.fileName}` : null

      const data = await Product.create({ ...payload, imagePath })
      return response.json({
        message: 'Produk berhasil ditambahkan',
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
      const data = await Product.findOrFail(params.id)
      return response.json({
        message: 'Produk berhasil diambil',
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
      const product = await Product.findOrFail(params.id)

      if (payload.image) {
        await payload.image.move(app.makePath('storage/uploads'), {
          name: `${cuid()}.${payload.image.extname}`,
        })
      }
      const imagePath = payload.image ? `storage/uploads/${payload.image.fileName}` : null

      product.merge({ ...payload, imagePath })
      await product.save()

      return response.json({
        message: `Produk dengan ID ${params.id} berhasil diupdate`,
        data: product,
      })
    } catch (error) {
      if (error === 'E_RECORD_NOT_FOUND') {
        return response.notFound({
          message: `Produk dengan ID ${params.id} tidak ditemukan`,
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
      const product = await Product.findOrFail(params.id)
      await product.delete()
      return response.json({
        message: `Produk dengan ID ${params.id} berhasil dihapus`,
        data: null,
      })
    } catch (error) {
      if (error === 'E_RECORD_NOT_FOUND') {
        return response.notFound({
          message: `Produk dengan ID ${params.id} tidak ditemukan`,
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
