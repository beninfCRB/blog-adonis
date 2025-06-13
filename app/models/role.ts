import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import * as relations from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => User)
  declare users: relations.HasMany<typeof User>
}
