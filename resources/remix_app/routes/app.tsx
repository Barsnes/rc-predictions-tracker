import { type LoaderFunctionArgs, Outlet, useLoaderData } from 'react-router';
import Header from '~/_components/header/header';

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const user = context.http.auth.user?.$attributes;

  console.log('in app layout loader', { user });

  return user;
};

export default function Layout() {
  const user = useLoaderData<typeof loader>();

  return (
    <div>
      <Header user={user} />
      <div
        style={{
          padding: 'var(--ds-size-4)',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
