import { Button, Card, Heading } from '@digdir/designsystemet-react';
import {
  type LoaderFunctionArgs,
  isRouteErrorResponse,
  redirect,
  useRouteError,
} from 'react-router';

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const user = context.http.auth.user?.$attributes;

  /**
   * If user is logged in, redirect to app
   */
  if (user) throw redirect('/app');
};

export default function Page() {
  return (
    <div
      style={{
        display: 'flex',
        height: '80svh',
      }}
    >
      <Card
        data-color='lilla'
        style={{
          maxWidth: '400px',
          margin: 'auto',
        }}
      >
        <Card.Block>
          <Heading level={1}>Log in</Heading>
          <Button type='button' data-fullwidth data-size='lg' asChild>
            <a href={'/auth/discord/redirect'}>Log in with Discord</a>
          </Button>
        </Card.Block>
      </Card>
    </div>
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
