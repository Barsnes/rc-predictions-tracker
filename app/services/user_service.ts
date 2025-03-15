import User from '#models/user';

export default class UserService {
  async createUser(props: {
    email: string;
    nickName: string;
    id: string;
    avatarUrl?: string;
  }) {
    return await User.create({
      id: parseInt(props.id),
      email: props.email,
      username: props.nickName,
      avatar: props.avatarUrl,
    });
  }

  async getUser(email: string) {
    console.log('getting user with email', email);
    return await User.findBy('email', email);
  }
}
