import { DateTime } from 'luxon';
import Prediction from '#models/prediction';
import PredictionUser from '#models/prediction_user';

export default class PredictionService {
  async create_prediction(props: {
    name: string;
    proof: string;
    rating: string;
    notes: string;
    predictedAt: string;
    finished?: string;
  }) {
    const formattedAtDate = DateTime.fromFormat(
      props.predictedAt,
      'yyyy-MM-dd',
    );
    let formattedFinishedDate: DateTime | undefined = undefined;
    if (props.finished) {
      formattedFinishedDate = DateTime.fromFormat(props.finished, 'yyyy-MM-dd');
    }

    return await Prediction.create({
      ...props,
      predictedAt: formattedAtDate,
      finished: formattedFinishedDate ?? undefined,
    });
  }

  async get_all_predictions() {
    console.log('getting all predictions');
    const predictions = await Prediction.all().then((predictions) => {
      return predictions.map((prediction) => {
        return {
          id: prediction.id,
          name: prediction.name,
          proof: prediction.proof,
          rating: prediction.rating,
          notes: prediction.notes,
          predictedAt: prediction.predictedAt,
          finished: prediction.finished,
          createdAt: prediction.createdAt,
          updatedAt: prediction.updatedAt,
        };
      });
    });
    return predictions;
  }

  async create_prediction_user(props: {
    username: string;
  }) {
    return await PredictionUser.create({
      username: props.username,
    });
  }

  async get_all_prediction_users() {
    console.log('getting all prediction users');
    const users = await PredictionUser.all().then((users) => {
      return users.map((user) => {
        return {
          id: user.id,
          username: user.username,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      });
    });
    return users;
  }
}
