import Product from '#models/product'
import { createProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ApiProductsController {
  /**
   * Handle form submission for the get action
   */
  async showAll({ response }: HttpContext) {
    try {
      const data = await Product.all()
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
      const data = request.all()
      const payload = await createProductValidator.validate(data)
      await Product.create(payload)
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
      const data = request.all()
      const payload = await createProductValidator.validate(data)

      const product = await Product.findOrFail(params.id)
      product.merge(payload)
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
