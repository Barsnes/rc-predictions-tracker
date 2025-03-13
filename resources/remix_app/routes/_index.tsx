import { ActionFunctionArgs, Form, LoaderFunctionArgs, redirect, useLoaderData } from 'react-router'
import { Welcome } from '../welcome/welcome'
import type { Route } from './+types/_index'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export const action = async ({ context }: ActionFunctionArgs) => {
  const { http } = context
  const { intent } = http.request.only(['intent'])

  if (intent === 'log_out') {
    await http.auth.use('web').logout()
    throw redirect('/login')
  }
  return null
}

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const email = context.http.auth.user?.email

  return {
    email,
  }
}

export default function Index() {
  const { email } = useLoaderData<typeof loader>()

  return (
    <div className="container">
      <p>Logged in as {email}</p>
      <Form method="POST">
        <input type="hidden" name="intent" value={'log_out'} />
        <button type={'submit'}>Log out</button>
      </Form>
    </div>
  )
}
