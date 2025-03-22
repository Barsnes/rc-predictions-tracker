import { DateTime } from 'luxon';
import Prediction from '#models/prediction';
import PredictionUser from '#models/prediction_user';

export default class PredictionService {
  async create_prediction(props: {
    name: string;
    user_id: number;
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
    const predictions = await Prediction.query()
      .preload('predictionUser')
      .then((predictions) => {
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
            predictionUser: {
              id: prediction.predictionUser?.id,
              username: prediction.predictionUser?.username,
              createdAt: prediction.predictionUser?.createdAt,
              updatedAt: prediction.predictionUser?.updatedAt,
            },
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

  async delete_prediction_user(id: number) {
    const user = await PredictionUser.find(id);

    if (!user) {
      console.log('user not found');
      throw new Error('User not found');
    }

    await user.delete();
    return null;
  }

  async get_all_prediction_users() {
    const users = await PredictionUser.query()
      .preload('predictions')
      .then((users) => {
        return users.map((user) => {
          return {
            id: user.id,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            predictions: user.predictions.map((prediction) => {
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
            }),
          };
        });
      });
    return users;
  }
}
