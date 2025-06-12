import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().nullable(),
    price: vine.number(),
    stock: vine.number(),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().nullable(),
    price: vine.number(),
    stock: vine.number(),
  })
)
