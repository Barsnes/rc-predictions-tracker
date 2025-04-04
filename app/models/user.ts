import { BaseModel, column } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare email: string;

  @column()
  declare username: string | null;

  @column()
  declare avatar: string | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
