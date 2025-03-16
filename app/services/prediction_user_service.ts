import PredictionUser from '#models/prediction_user';

export default class PredictionUserService {
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
