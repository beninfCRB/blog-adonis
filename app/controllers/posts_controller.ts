import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const posts = await Post.all()
    return view.render('posts/index.edge', { posts })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('posts/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['judul', 'konten'])
    await Post.create(data)
    return response.redirect('/posts')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    return view.render('posts/edit', { post })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    return view.render('posts/edit', { post })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    post.merge(request.only(['judul', 'konten']))
    await post.save()
    return response.redirect('/posts')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
    return response.redirect('/posts')
  }
}
