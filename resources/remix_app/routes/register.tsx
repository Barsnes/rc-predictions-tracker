import {
  Button,
  Card,
  Fieldset,
  Heading,
  Link,
  Paragraph,
  Textfield,
  ValidationMessage,
} from '@digdir/designsystemet-react';
import {
  type ActionFunctionArgs,
  Form,
  Link as RemixLink,
  isRouteErrorResponse,
  redirect,
  useRouteError,
} from 'react-router';
import type { Route } from './+types/register';

export const action = async ({ context }: ActionFunctionArgs) => {
  const { http, make } = context;
  // get email and password from form data
  const { email, password } = http.request.only(['email', 'password']);

  // check if the user already exists
  const userService = await make('user_service');
  const existingUser = await userService.getUser(email);
  if (existingUser) {
    return { error: 'Error creating user' };
  }

  // create user
  const user = await userService.createUser({
    email,
    password,
  });

  // log in the user after successful registration
  await http.auth.use('web').login(user);

  return redirect('/');
};

export default function Page({ actionData }: Route.ComponentProps) {
  return (
    <Card data-color='lilla'>
      <Card.Block>
        <Heading level={1}>Register</Heading>
      </Card.Block>
      <Card.Block>
        <Form
          method='post'
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-size-4)',
          }}
        >
          <Fieldset>
            <Textfield type='email' name='email' label='Email' required />
            <Textfield
              type='password'
              name='password'
              label='Password'
              required
            />
            {actionData?.error && (
              <ValidationMessage>
                {actionData?.error && <>{actionData.error}</>}
              </ValidationMessage>
            )}
          </Fieldset>
          <Button type='submit'>Login</Button>
        </Form>
      </Card.Block>
      <Card.Block>
        <Paragraph>
          Don't have an account yet?{' '}
          <Link asChild>
            <RemixLink to={'/register'}>Click here to sign up</RemixLink>
          </Link>
        </Paragraph>
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
