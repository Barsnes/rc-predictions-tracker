import {
  Button,
  Card,
  Divider,
  Heading,
  Textfield,
} from '@digdir/designsystemet-react';
import type { DateTime } from 'luxon';
import {
  type ActionFunctionArgs,
  Form,
  type LoaderFunctionArgs,
  data,
  useFetcher,
  useLoaderData,
} from 'react-router';

export async function loader({ context }: LoaderFunctionArgs) {
  const { make } = context;

  const predictionUserService = await make('prediction_user_service');

  const allPredictionUsers: {
    id: number;
    username: string;
    createdAt: DateTime<boolean>;
    updatedAt: DateTime<boolean>;
  }[] = await predictionUserService.get_all_prediction_users();

  return allPredictionUsers;
}

export async function action({ context }: ActionFunctionArgs) {
  const { make, http } = context;
  const predictionUserService = await make('prediction_user_service');

  const { username } = http.request.only(['username']);

  const errors: { [key: string]: string } = {};

  await predictionUserService
    .create_prediction_user({
      username,
    })
    .catch(() => {
      errors.create = 'Failed to create user';
    });

  if (Object.keys(errors).length > 0) {
    console.log('errors', errors);
    return data({ errors }, { status: 400 });
  }

  return null;
}

export default function Page() {
  const fetcher = useFetcher();
  const prediction_users = useLoaderData<typeof loader>();
  const errors = fetcher.data;

  console.log(errors);

  return (
    <div>
      <Heading level={1} data-size='xs'>
        Prediction Users
      </Heading>

      <Card data-color='aqua'>
        <Card.Block>Create user</Card.Block>
        <Card.Block>
          <Form method='post'>
            <Textfield
              label='Username'
              name='username'
              description='This will be the name associated with a prediction user'
            />
            <Button type='submit' data-color='neutral'>
              Create user
            </Button>
          </Form>
        </Card.Block>
      </Card>

      <Divider />

      <div>
        <Heading level={2} data-size='xs'>
          Prediction Users
        </Heading>
        <ul>
          {prediction_users.map((user) => (
            <li key={user.id}>
              {user.username} (id: {user.id})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
