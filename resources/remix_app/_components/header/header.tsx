import { Avatar, Dropdown, Heading } from '@digdir/designsystemet-react';
import { Form } from 'react-router';
import styles from './header.module.css';

export default function Header({
  user,
}: {
  user: {
    username: string;
    avatar: string;
    email: string;
    id: number;
  };
}) {
  return (
    <header className={styles.header} data-color='aqua'>
      <Heading level={1}>Welcome, {user.username}</Heading>
      <Dropdown.TriggerContext>
        <Dropdown.Trigger>
          <Avatar aria-label='User avatar' data-size='xs'>
            <img src={user.avatar} alt='user avatar' />
          </Avatar>
        </Dropdown.Trigger>
        <Dropdown>
          <Dropdown.List>
            <Dropdown.Item>
              <Form method='POST' action='/logout'>
                <input type='hidden' name='intent' value={'log_out'} />
                <Dropdown.Button type={'submit'}>Log out</Dropdown.Button>
              </Form>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>
    </header>
  );
}
