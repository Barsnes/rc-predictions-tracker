import {
  useActionData,
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
  Form,
  ActionFunctionArgs,
  redirect,
} from 'react-router'
import { Route } from './+types/register'

export async function loader({ context }: Route.LoaderArgs) {
  const { http, make } = context
  return {
    message: 'Hello from ' + http.request.completeUrl(),
  }
}
export const action = async ({ context }: ActionFunctionArgs) => {
  const { http, make } = context
  // get email and password from form data
  const { email, password } = http.request.only(['email', 'password'])

  // get the UserService from the app container and create user
  const userService = await make('user_service')
  const user = await userService.createUser({
    email,
    password,
  })

  // log in the user after successful registration
  await http.auth.use('web').login(user)

  return redirect('/')
}

export default function Page() {
  return (
    <div className="container">
      <h1>Register</h1>
      <article>
        <Form method="post">
          <label>
            Email
            <input type="email" name="email" />
          </label>
          <label>
            Password
            <input type="password" name="password" />
          </label>
          <button type="submit">Register</button>
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
