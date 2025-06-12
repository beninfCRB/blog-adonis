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
import ProductsController from '#controllers/products_controller'
import ApiProductsController from '#controllers/api/api_products_controller'
import ApiAuthsController from '#controllers/api/api_auths_controller'

router.on('/').render('pages/home.edge')
router
  .group(() => {
    router.resource('posts', PostsController)
    router.resource('products', ProductsController)
  })
  .prefix('web')
  .use(middleware.csrf())

router
  .group(() => {
    router.get('/', async () => ({ message: 'Halaman Admin' }))
    router.get('/users', async () => ({ users: ['Admin 1', 'Admin 2'] }))
  })
  .prefix('admin')
  .middleware(async (ctx, next) => {
    console.log('Middleware admin dijalankan')
    await next()
  })

router
  .group(() => {
    router.post('login', [ApiAuthsController, 'login'])
    router.post('register', [ApiAuthsController, 'register'])
    router
      .group(() => {
        router.post('me', [ApiAuthsController, 'me'])
        router.get('books', [BooksController, 'showAll'])
        router.get('books/:id', [BooksController, 'show'])
        router.post('books', [BooksController, 'store'])
        router.put('books/:id', [BooksController, 'update'])
        router.delete('books/:id', [BooksController, 'destroy'])

        router.get('products', [ApiProductsController, 'showAll'])
        router.get('products/:id', [ApiProductsController, 'show'])
        router.post('products', [ApiProductsController, 'store'])
        router.put('products/:id', [ApiProductsController, 'update'])
        router.delete('products/:id', [ApiProductsController, 'destroy'])
      })
      .use(middleware.auth())
  })
  .prefix('api/admin')
  .use([middleware.api()])
