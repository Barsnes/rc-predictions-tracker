import { Avatar, Button, Paragraph } from '@digdir/designsystemet-react';
import {
  type ActionFunctionArgs,
  Form,
  type LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from 'react-router';

export function meta() {
  return [
    { title: 'rc-predictions-tracker' },
    { name: 'description', content: 'Webapp to track RC predictions.' },
  ];
}

export const action = async ({ context }: ActionFunctionArgs) => {
  const { http } = context;
  const { intent } = http.request.only(['intent']);

  if (intent === 'log_out') {
    await http.auth.use('web').logout();
    throw redirect('/login');
  }
  return null;
};

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const user = context.http.auth.user?.$attributes;

  return {
    user,
  };
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  console.log({ user });

  return (
    <div>
      <Avatar aria-label='User avatar'>
        <img src={user.avatar} alt='user avatar' />
      </Avatar>
      <Paragraph>
        Logged in as {user.username}, with email {user.email}
      </Paragraph>
      <Form method='POST'>
        <input type='hidden' name='intent' value={'log_out'} />
        <Button type={'submit'}>Log out</Button>
      </Form>
    </div>
  );
}
