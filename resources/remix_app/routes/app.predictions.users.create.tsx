import { type ActionFunctionArgs, data, redirect } from 'react-router';

export async function action({ context }: ActionFunctionArgs) {
  const { make, http } = context;
  const predictionUserService = await make('prediction_service');

  const { username } = http.request.only(['username']);

  const errors: string[] = [];

  await predictionUserService
    .create_prediction_user({
      username,
    })
    .catch(
      (e: {
        code: string;
      }) => {
        if (e.code === 'ER_DUP_ENTRY') {
          errors.push('Username already exists');
        } else {
          errors.push('Failed to create user');
        }
      },
    );

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  return null;
}

export default function Page() {
  return redirect('/app/predictions/users');
}
