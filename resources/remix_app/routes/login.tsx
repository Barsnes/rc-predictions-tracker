import {
  useActionData,
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
  Form,
  Link,
  ActionFunctionArgs,
  redirect,
} from 'react-router'
import { Route } from './+types/login'

export async function loader({ context }: Route.LoaderArgs) {
  const { http, make } = context
  return {
    message: 'Hello from ' + http.request.completeUrl(),
  }
}
export const action = async ({ context }: ActionFunctionArgs) => {
  const { http, make } = context
  // get the form email and password
  const { email, password } = http.request.only(['email', 'password'])

  const userService = await make('user_service')
  // look up the user by email
  const user = await userService.getUser(email)

  // check if the password is correct
  await userService.verifyPassword(user, password)

  // log in user since they passed the check
  await http.auth.use('web').login(user)

  return redirect('/')
}

export default function Page() {
  return (
    <div className="container">
      <article>
        <h1>Log in</h1>
        <Form method="post">
          <label>
            Email
            <input type="email" name="email" />
          </label>
          <label>
            Password
            <input type="password" name="password" />
          </label>
          <button type="submit">Login</button>
          <p>
            Don't have an account yet? <Link to={'/register'}>Click here to sign up</Link>
          </p>
        </Form>
      </article>
    </div>
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
