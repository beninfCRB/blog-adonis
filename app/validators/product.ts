import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().nullable(),
    sku: vine.string().nullable(),
    price: vine.number(),
    stock: vine.number(),
    image: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'pdf'],
    }),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().nullable(),
    sku: vine.string().nullable(),
    price: vine.number(),
    stock: vine.number(),
    image: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'pdf'],
    }),
  })
)
