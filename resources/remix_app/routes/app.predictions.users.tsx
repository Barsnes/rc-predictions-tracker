import {
  Button,
  Dialog,
  Divider,
  Heading,
  Search,
  Textfield,
} from '@digdir/designsystemet-react';
import type { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import {
  type LoaderFunctionArgs,
  useFetcher,
  useLoaderData,
} from 'react-router';
import { User } from '~/_components/users/user';

export async function loader({ context }: LoaderFunctionArgs) {
  const { make } = context;

  const predictionUserService = await make('prediction_service');

  const allPredictionUsers: {
    id: number;
    username: string;
    createdAt: DateTime<boolean>;
    updatedAt: DateTime<boolean>;
    predictions: {
      id: number;
      name: string;
      proof: string;
      rating: string;
      notes: string;
      predictedAt: DateTime<boolean>;
      createdAt: DateTime<boolean>;
      updatedAt: DateTime<boolean>;
    }[];
  }[] = await predictionUserService.get_all_prediction_users();

  return allPredictionUsers;
}

export default function Page() {
  const fetcher = useFetcher();
  const prediction_users = useLoaderData<typeof loader>();
  const { errors }: { errors: string[] } = fetcher.data || [];

  const [users, setUsers] = useState<typeof prediction_users>([]);
  const [search, setSearch] = useState<string>('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filteredUsers = prediction_users.filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase()),
    );
    setUsers(filteredUsers);
  }, [search, prediction_users]);

  console.log(users);

  return (
    <div>
      <Heading level={1} data-size='xs'>
        Prediction Users
      </Heading>

      <Dialog.TriggerContext>
        <Dialog.Trigger>Create user</Dialog.Trigger>
        <Dialog closedby='any'>
          <Dialog.Block>
            <Heading>Create user</Heading>
          </Dialog.Block>
          <fetcher.Form method='post' action='/app/predictions/users/create'>
            <Dialog.Block
              style={{
                borderTop:
                  'var(--dsc-dialog-divider-border-width) var(--dsc-dialog-divider-border-style) var(--dsc-dialog-divider-border-color)',
              }}
            >
              <Textfield
                label='Username'
                name='username'
                description='This will be the name associated with a prediction user'
                error={errors?.length > 0 ? errors[0] : undefined}
              />
            </Dialog.Block>
            <Dialog.Block>
              <Button type='submit' data-color='neutral'>
                Create user
              </Button>
            </Dialog.Block>
          </fetcher.Form>
        </Dialog>
      </Dialog.TriggerContext>

      <Divider />

      <Search
        style={{
          marginBottom: 'var(--ds-size-4)',
        }}
      >
        <Search.Input onChange={handleSearch} value={search} />
        <Search.Clear />
      </Search>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, 200px)',
          gap: 'var(--ds-size-4)',
        }}
      >
        {users.map((user) => (
          <User
            key={user.id}
            username={user.username}
            /* @ts-ignore TODO: fix type */
            predictions={user.predictions || []}
            id={user.id}
          />
        ))}
      </div>
    </div>
  );
}
