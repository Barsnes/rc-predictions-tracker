import { Button } from '@digdir/designsystemet-react';
import { useFetcher } from 'react-router';
import classes from './user.module.css';

export type UserProps = {
  id: number;
  username: string;
  predictions?: {
    id: number;
    name: string;
    proof: string;
    rating: string;
    notes: string;
    predictedAt: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export const User = ({ id, username, predictions }: UserProps) => {
  const fetcher = useFetcher();

  return (
    <div className={classes.user}>
      {username} - Predictions: {predictions?.length || 0}
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
