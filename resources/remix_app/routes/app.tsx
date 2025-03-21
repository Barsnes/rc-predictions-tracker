import { type LoaderFunctionArgs, Outlet, useLoaderData } from 'react-router';
import Sidebar from '~/_components/sidebar/sidebar';

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const user = context.http.auth.user?.$attributes;

  return user;
};

export default function Layout() {
  const user = useLoaderData<typeof loader>();

  return (
    <div className='layout-sidebar'>
      <Sidebar user={user} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
