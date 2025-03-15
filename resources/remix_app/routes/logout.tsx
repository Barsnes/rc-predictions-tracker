import { type ActionFunctionArgs, redirect } from 'react-router';

export const action = async ({ context }: ActionFunctionArgs) => {
  const { http } = context;
  const { intent } = http.request.only(['intent']);

  if (intent === 'log_out') {
    await http.auth.use('web').logout();
    throw redirect('/login');
  }
  return null;
};

export default function Page() {
  return <div>Logout</div>;
}
