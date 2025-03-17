import { Card, Heading, Paragraph } from '@digdir/designsystemet-react';
import { DateTime, type DateTime as DateTimeType } from 'luxon';
import { type LoaderFunctionArgs, useLoaderData } from 'react-router';

export async function loader({ context }: LoaderFunctionArgs) {
  const { make } = context;

  const predictionsService = await make('prediction_service');

  const allPredictions: {
    id: number;
    name: string;
    proof: string;
    rating: string;
    notes: string;
    predictedAt: DateTimeType<boolean>;
    createdAt: DateTimeType<boolean>;
    updatedAt: DateTimeType<boolean>;
  }[] = await predictionsService.get_all_predictions();

  /* format dates to yyyy MM dd */
  const formattedPredictions = [];
  for (const prediction of allPredictions) {
    formattedPredictions.push({
      ...prediction,
      predictedAt: DateTime.fromJSDate(
        prediction.predictedAt.toJSDate(),
      ).toFormat('dd MMMM yyyy'),
      createdAt: DateTime.fromJSDate(prediction.createdAt.toJSDate()).toFormat(
        'yyyy-mm-dd',
      ),
      updatedAt: DateTime.fromJSDate(prediction.updatedAt.toJSDate()).toFormat(
        'yyyy-mm-dd',
      ),
    });
  }

  return formattedPredictions;
}

export default function Page() {
  const data = useLoaderData<typeof loader>();

  console.log('in app predictions', { data });

  return (
    <div>
      {data.map(
        (prediction: {
          id: number;
          name: string;
          proof: string;
          rating: string;
          notes: string;
          predictedAt: string;
        }) => (
          <Card key={prediction.id} data-color='aqua'>
            <Card.Block>
              <Heading>{prediction.name}</Heading>
            </Card.Block>
            <Card.Block>
              <Heading data-size='xs'>Notes</Heading>
              <Paragraph>{prediction.notes}</Paragraph>
            </Card.Block>
            <Card.Block>
              <Heading data-size='xs'>Proof</Heading>
              <Paragraph>{prediction.proof}</Paragraph>
            </Card.Block>
            <Card.Block>
              <Heading data-size='xs'>Rating</Heading>
              <Paragraph>{prediction.rating}</Paragraph>
            </Card.Block>
            <Card.Block>
              <Heading data-size='xs'>Predicted at</Heading>
              <Paragraph>{prediction.predictedAt}</Paragraph>
            </Card.Block>
          </Card>
        ),
      )}
    </div>
  );
}
