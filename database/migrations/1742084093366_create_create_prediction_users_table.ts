import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'prediction_users';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('username').notNullable().unique();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
