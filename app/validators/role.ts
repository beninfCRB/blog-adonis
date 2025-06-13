import vine from '@vinejs/vine'

export const createRoleValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().nullable(),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().nullable(),
  })
)
