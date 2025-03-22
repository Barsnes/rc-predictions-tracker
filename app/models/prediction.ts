import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm';
import type { HasOne } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import PredictionUser from '#models/prediction_user';

export default class Prediction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare userId: number;

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

  @hasOne(() => PredictionUser, {
    foreignKey: 'id',
    localKey: 'userId',
  })
  declare predictionUser: HasOne<typeof PredictionUser>;
}
