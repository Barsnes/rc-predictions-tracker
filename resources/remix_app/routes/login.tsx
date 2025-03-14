import { Button, Card, Heading, Link } from '@digdir/designsystemet-react';
import { isRouteErrorResponse, useRouteError } from 'react-router';

export default function Page() {
  return (
    <Card data-color='lilla'>
      <Card.Block>
        <Heading level={1}>Log in</Heading>
        <Button variant='secondary' type='button' asChild>
          <Link href={'/auth/discord/redirect'}>Log in with Discord</Link>
        </Button>
      </Card.Block>
    </Card>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }

  return <h1>Unknown Error</h1>;
}
