import { Button } from '@digdir/designsystemet-react';
import { useFetcher } from 'react-router';
import classes from './user.module.css';

export type UserProps = {
  id: number;
  username: string;
};

export const User = ({ id, username }: UserProps) => {
  const fetcher = useFetcher();

  return (
    <div className={classes.user}>
      {username}
      <fetcher.Form method='post' action='/app/predictions/users/delete'>
        <input type='hidden' name='id' value={id} />
        {/* @ts-ignore */}
        <Button type='submit' data-color='danger' data-size='2xs'>
          Delete
        </Button>
      </fetcher.Form>
    </div>
  );
};
