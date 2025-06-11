import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().nullable(),
    price: vine.number(),
    stock: vine.number(),
  })
)

export const updatePostValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().nullable(),
    price: vine.number(),
    stock: vine.number(),
  })
)
