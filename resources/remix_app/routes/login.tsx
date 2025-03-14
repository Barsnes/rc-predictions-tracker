import {
  isRouteErrorResponse,
  useRouteError,
  Form,
  Link as RemixLink,
  ActionFunctionArgs,
  redirect,
} from 'react-router'
import { Route } from './+types/login'
import {
  Button,
  Card,
  Fieldset,
  Heading,
  Link,
  Paragraph,
  Textfield,
  ValidationMessage,
} from '@digdir/designsystemet-react'

export async function loader({ context }: Route.LoaderArgs) {
  const { http } = context
  return {
    message: 'Hello from ' + http.request.completeUrl(),
  }
}
export const action = async ({ context }: ActionFunctionArgs) => {
  const { http, make } = context
  const { email, password } = http.request.only(['email', 'password'])

  const userService = await make('user_service')
  const user = await userService.getUser(email)

  if (!user) {
    return { error: 'Invalid credentials' }
  }

  if (!(await userService.verifyPassword(user, password))) {
    return { error: 'Invalid credentials' }
  }

  await http.auth.use('web').login(user)
  return redirect('/')
}

export default function Page({ actionData }: Route.ComponentProps) {
  return (
    <Card data-color="lilla">
      <Card.Block>
        <Heading level={1}>Log in</Heading>
      </Card.Block>
      <Card.Block>
        <Form
          method="post"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-size-4)',
          }}
        >
          <Fieldset>
            <Textfield type="email" name="email" label="Email" required />
            <Textfield type="password" name="password" label="Password" required />
            {actionData?.error && (
              <ValidationMessage>{actionData?.error && <>{actionData.error}</>}</ValidationMessage>
            )}
          </Fieldset>
          <Button type="submit">Login</Button>
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
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    )
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    )
  } else {
    return <h1>Unknown Error</h1>
  }
}
