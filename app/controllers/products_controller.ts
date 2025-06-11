import Product from '#models/product'
import { createPostValidator, updatePostValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const products = await Product.all()
    return view.render('products/index.edge', { products })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('products/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createPostValidator.validate(data)
    await Product.create(payload)
    return response.redirect('/web/products')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    return view.render('products/edit', { product })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    return view.render('products/edit', { product })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    const payload = await updatePostValidator.validate(data)
    const product = await Product.findOrFail(params.id)
    product.merge(payload)
    await product.save()
    return response.redirect('/web/products')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.delete()
    return response.redirect('/web/products')
  }
}
