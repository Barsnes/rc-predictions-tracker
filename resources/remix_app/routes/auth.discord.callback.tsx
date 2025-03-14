import { type LoaderFunctionArgs, redirect } from 'react-router';

export async function loader({ context }: LoaderFunctionArgs) {
  console.log('in discord callback!');
  const { make, http } = context;
  const service = await make('discord_service');

  const queryParams: string = http.request.parsedUrl.query;
  const code = queryParams.split('=')[1];

  const discordUser = await service.getUser(code);
  console.log({ discordUser });

  const userService = await make('user_service');
  const existingUser = await userService.getUser(discordUser.email);

  /* If the user exists, log them in */
  if (existingUser) {
    await http.auth.use('web').login(existingUser);
    return redirect('/');
  }

  /* If the user does not exist, create them */
  const user = await userService.createUser(discordUser);
  await http.auth.use('web').login(user);
  /* Redirect to the home page */
  return redirect('/');
}

export default function Page() {
  return <div>Discord callback</div>;
}
