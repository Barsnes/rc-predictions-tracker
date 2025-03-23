import {
  Button,
  Card,
  ErrorSummary,
  Field,
  Label,
  Select,
  EXPERIMENTAL_Suggestion as Suggestion,
  Textfield,
} from '@digdir/designsystemet-react';
import type { DateTime } from 'luxon';
import { useState } from 'react';
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  data,
  redirect,
  useFetcher,
  useLoaderData,
} from 'react-router';

export async function action({ context }: ActionFunctionArgs) {
  const { make, http } = context;
  const predictionService = await make('prediction_service');

  const { name, proof, rating, notes, predictedAt, user_id } =
    http.request.only([
      'name',
      'proof',
      'rating',
      'notes',
      'predictedAt',
      'user_id',
    ]);

  const errors: string[] = [];

  await predictionService
    .create_prediction({
      name,
      proof,
      rating,
      notes,
      predictedAt,
      user_id: Number(user_id),
    })
    .catch(
      (e: {
        code: string;
      }) => {
        console.error(e);
        if (e.code === 'ER_NO_REFERENCED_ROW_2') {
          errors.push('User not found');
        } else {
          errors.push('Failed to create prediction');
        }
      },
    );

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  return redirect('/app/predictions');
}

export async function loader({ context }: LoaderFunctionArgs) {
  const { make } = context;

  const predictionUserService = await make('prediction_service');

  const allPredictionUsers: {
    id: number;
    username: string;
    createdAt: DateTime<boolean>;
    updatedAt: DateTime<boolean>;
  }[] = await predictionUserService.get_all_prediction_users();

  return allPredictionUsers;
}

export default function Page() {
  const prediction_users = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const { errors }: { errors: string[] } = fetcher.data || [];

  const [userId, setUserId] = useState<number | null>(null);

  const handleUserSuggestionChange = (value: string) => {
    const selectedUser = prediction_users.find(
      (user) => user.username === value,
    );
    if (selectedUser) {
      setUserId(selectedUser.id);
    } else {
      setUserId(null);
    }
  };

  return (
    <fetcher.Form method='post'>
      <Card data-color='aqua'>
        <Card.Block>Create prediction</Card.Block>
        <Card.Block>
          <Textfield label='Name' name='name' required />
          <input type='hidden' name='user_id' value={userId ?? ''} required />
          <Field>
            <Label>Prediction user</Label>
            <Field.Description>Does not do anything yet</Field.Description>
            <Suggestion>
              <Suggestion.Input
                name='prediction_user_username'
                required
                suppressHydrationWarning
                onChange={(e) => handleUserSuggestionChange(e.target.value)}
              />
              <Suggestion.Clear />
              <Suggestion.List suppressHydrationWarning>
                {prediction_users.map((user) => (
                  <Suggestion.Option
                    key={user.id}
                    value={user.username}
                    suppressHydrationWarning
                  >
                    {user.username}
                  </Suggestion.Option>
                ))}
              </Suggestion.List>
            </Suggestion>
          </Field>
          <Textfield label='Proof' name='proof' required />
          <Field>
            <Label>Rating</Label>
            <Select name='rating' required>
              <Select.Option value='Very soft'>Very soft</Select.Option>
              <Select.Option value='Soft'>Soft</Select.Option>
              <Select.Option value='Medium soft'>Medium soft</Select.Option>
              <Select.Option value='Medium'>Medium</Select.Option>
              <Select.Option value='Medium Hard'>Medium Hard</Select.Option>
              <Select.Option value='Hard'>Hard</Select.Option>
              <Select.Option value='Very Hard'>Very Hard</Select.Option>
              <Select.Option value='Mental Sickness'>
                Mental Sickness
              </Select.Option>
            </Select>
          </Field>
          <Textfield
            label='Notes'
            name='notes'
            description='Markdown will be supported in the future'
            required
            multiline
          />
          <Textfield
            label='Predicted at'
            name='predictedAt'
            type='date'
            required
          />
          {errors?.length > 0 ? (
            <ErrorSummary>
              <ErrorSummary.Heading>
                Something went wrong while creating the prediction
              </ErrorSummary.Heading>
              <ErrorSummary.List>
                {errors?.length > 0 &&
                  errors.map((error, index) => (
                    <ErrorSummary.Item key={index}>{error}</ErrorSummary.Item>
                  ))}
              </ErrorSummary.List>
            </ErrorSummary>
          ) : null}
          <Button type='submit' data-color='neutral'>
            Create prediction
          </Button>
        </Card.Block>
      </Card>
    </fetcher.Form>
  );
}
