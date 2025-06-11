import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  /**
   * Display a list of resource
   */

  /**
   * Handle form submission for the get action
   */
  async get({ response }: HttpContext) {
    const data = await Book.all()
    return response.json({
      message: 'Buku berhasil diambil',
      data,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'author'])
    await Book.create(data)
    return response.json({
      message: 'Buku berhasil ditambahkan',
      data,
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const data = await Book.findOrFail(params.id)
    if (!data) {
      return response.json({
        message: `Buku dengan ID ${params.id} tidak ditemukan`,
        data: null,
      })
    }
    return response.json({
      message: 'Buku berhasil diambil',
      data,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const book = await Book.findOrFail(params.id)
    if (!book) {
      return response.json({
        message: `Buku dengan ID ${params.id} tidak ditemukan`,
        data: null,
      })
    }
    book.title = request.input('title')
    book.author = request.input('author')
    await book.save()
    const data = await Book.findOrFail(params.id)
    return response.json({
      message: `Buku dengan ID ${params.id} berhasil diupdate`,
      data,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const post = await Book.findOrFail(params.id)
    if (!post) {
      return response.json({
        message: `Buku dengan ID ${params.id} tidak ditemukan`,
        data: null,
      })
    }
    await post.delete()
    return response.json({
      message: `Buku dengan ID ${params.id} berhasil dihapus`,
      data: null,
    })
  }
}
