import {
  Button,
  Card,
  ErrorSummary,
  Textfield,
} from '@digdir/designsystemet-react';
import { type ActionFunctionArgs, data, useFetcher } from 'react-router';

export async function action({ context }: ActionFunctionArgs) {
  const { make, http } = context;
  const predictionService = await make('prediction_service');

  const { name, proof, rating, notes, predictedAt } = http.request.only([
    'name',
    'proof',
    'rating',
    'notes',
    'predictedAt',
  ]);

  const errors: string[] = [];

  await predictionService
    .create_prediction({
      name,
      proof,
      rating,
      notes,
      predictedAt,
    })
    .catch(
      (e: {
        code: string;
      }) => {
        console.log('error', e);
        errors.push('Failed to create prediction');
      },
    );

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  return null;
}

export default function Page() {
  const fetcher = useFetcher();
  const { errors }: { errors: string[] } = fetcher.data || [];

  console.log(errors);

  return (
    <fetcher.Form method='post'>
      <Card data-color='aqua'>
        <Card.Block>Create prediction</Card.Block>
        <Card.Block>
          <Textfield label='Name' name='name' required />
          <Textfield label='Proof' name='proof' required />
          <Textfield label='Rating' name='rating' required />
          <Textfield
            label='Notes'
            name='notes'
            description='Markdown will be supported in the future'
            required
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
