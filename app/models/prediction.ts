import { BaseModel, column } from '@adonisjs/lucid/orm';
import type { DateTime } from 'luxon';

export default class Prediction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare proof: string;

  @column()
  declare rating: string;

  @column()
  declare notes: string;

  @column.dateTime()
  declare predictedAt: DateTime;

  @column.dateTime()
  declare finished?: DateTime;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
