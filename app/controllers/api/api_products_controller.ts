import Product from '#models/product'
import { createPostValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ApiProductsController {
  /**
   * Handle form submission for the get action
   */
  async showAll({ response }: HttpContext) {
    const data = await Product.all()
    return response.json({
      message: 'Produk berhasil diambil',
      data,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createPostValidator.validate(data)
    await Product.create(payload)
    return response.json({
      message: 'Produk berhasil ditambahkan',
      data,
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const data = await Product.findOrFail(params.id)
    if (!data) {
      return response.json({
        message: `Produk dengan ID ${params.id} tidak ditemukan`,
        data: null,
      })
    }
    return response.json({
      message: 'Produk berhasil diambil',
      data,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    const payload = await createPostValidator.validate(data)

    const product = await Product.findOrFail(params.id)
    if (!product) {
      return response.json({
        message: `Produk dengan ID ${params.id} tidak ditemukan`,
        data: null,
      })
    }

    product.merge(payload)
    await product.save()

    return response.json({
      message: `Produk dengan ID ${params.id} berhasil diupdate`,
      data: product,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const post = await Product.findOrFail(params.id)
    if (!post) {
      return response.json({
        message: `Produk dengan ID ${params.id} tidak ditemukan`,
        data: null,
      })
    }
    await post.delete()
    return response.json({
      message: `Produk dengan ID ${params.id} berhasil dihapus`,
      data: null,
    })
  }
}
