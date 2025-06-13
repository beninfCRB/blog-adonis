import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, scope, beforeFetch, beforeFind } from '@adonisjs/lucid/orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare sku: string | null

  @column()
  declare description?: string | null

  @column()
  declare price: number

  @column()
  declare stock: number

  @column()
  declare imagePath: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static inStock = scope((query) => {
    query.where('stock', '>', 0)
  })
}
