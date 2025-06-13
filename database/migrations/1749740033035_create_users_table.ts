import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.boolean('is_verified').defaultTo(false)
      table.string('verification_token').nullable()
      table.string('reset_password_token').nullable()
      table.timestamp('reset_token_expires_at').nullable()
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')

      table.timestamps(true)
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
