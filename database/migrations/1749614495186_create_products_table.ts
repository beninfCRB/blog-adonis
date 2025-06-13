import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('sku').unique()
      table.text('description').nullable()
      table.decimal('price', 10, 2).notNullable()
      table.integer('stock').unsigned().notNullable()

      table.string('image_path').nullable()

      table.timestamps(true)
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
