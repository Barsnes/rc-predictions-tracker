import { type ActionFunctionArgs, data, redirect } from 'react-router';

export async function action({ context }: ActionFunctionArgs) {
  const { make, http } = context;
  const predictionUserService = await make('prediction_service');
  console.log('deleting prediction user');

  const { id } = http.request.only(['id']);

  const errors: string[] = [];

  await predictionUserService.delete_prediction_user(parseInt(id)).catch(() => {
    errors.push('Failed to delete user');
  });

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  return null;
}

export default function Page() {
  return redirect('/app/predictions/users');
}
