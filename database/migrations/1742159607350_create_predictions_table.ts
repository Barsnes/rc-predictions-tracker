import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'predictions';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name');
      table.string('proof');
      table.string('rating');
      table.text('notes').nullable();
      table.timestamp('predicted_at');
      table.timestamp('finished').nullable();
      table
        .timestamp('created_at', { useTz: true })
        .notNullable()
        .defaultTo(this.now());
      table
        .timestamp('updated_at', { useTz: true })
        .notNullable()
        .defaultTo(this.now());
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
