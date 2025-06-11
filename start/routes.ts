/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import BooksController from '#controllers/books_controller'
import PostsController from '#controllers/posts_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.on('/').render('pages/home.edge')
router
  .group(() => {
    router.resource('posts', PostsController)
  })
  .use(middleware.csrf())

router
  .group(() => {
    router.get('books', [BooksController, 'get'])
    router.get('books/:id', [BooksController, 'show'])
    router.post('books', [BooksController, 'store'])
    router.put('books/:id', [BooksController, 'update'])
    router.delete('books/:id', [BooksController, 'destroy'])
  })
  .prefix('api/admin')
  .use(middleware.api())
