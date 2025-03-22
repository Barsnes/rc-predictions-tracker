import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import Prediction from '#models/prediction';

export default class PredictionUser extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare username: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @hasMany(() => Prediction, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  declare predictions: HasMany<typeof Prediction>;
}
