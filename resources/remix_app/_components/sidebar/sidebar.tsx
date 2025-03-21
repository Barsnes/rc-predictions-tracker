import { Avatar, Button, Heading } from '@digdir/designsystemet-react';
import { Form, Link, useLocation } from 'react-router';
import styles from './sidebar.module.css';

const links = {
  home: { to: '/app', label: 'Home' },
  predictions: [
    { to: '/app/predictions', label: 'All Predictions' },
    { to: '/app/prediction/create', label: 'Create Prediction' },
    { to: '/app/predictions/users', label: 'Users' },
  ],
};

const NavLink = ({
  to,
  label,
  active = false,
}: {
  to: string;
  label: string;
  active?: boolean;
}) => (
  <li>
    <Button variant={active ? 'primary' : 'tertiary'} asChild>
      <Link to={to}>{label}</Link>
    </Button>
  </li>
);

export default function Sidebar({
  user,
}: {
  user: {
    username: string;
    avatar: string;
    email: string;
    id: number;
  };
}) {
  const location = useLocation();
  console.log({ location });

  return (
    <header className={styles.sidebar} data-color='lilla'>
      <div className={styles.user}>
        <Avatar aria-label='User avatar' data-size='xs'>
          <img src={user.avatar} alt='user avatar' />
        </Avatar>{' '}
        {user.username}
      </div>

      <nav className={styles.items}>
        <ul>
          {/* map links, if a key only has one item, give it no heading */}
          {Object.entries(links).map(([key, value]) => {
            if (Array.isArray(value)) {
              return (
                <li key={key}>
                  <Heading level={3} data-size='xs'>
                    {key}
                  </Heading>
                  <ul>
                    {value.map((link) => (
                      <NavLink
                        key={link.label}
                        to={link.to}
                        label={link.label}
                        active={location.pathname === link.to}
                      />
                    ))}
                  </ul>
                </li>
              );
            }
            return (
              <NavLink
                key={value.label}
                to={value.to}
                label={value.label}
                active={location.pathname === value.to}
              />
            );
          })}
        </ul>
      </nav>

      <Form method='POST' action='/logout'>
        <input type='hidden' name='intent' value={'log_out'} />
        <Button data-fullwidth type={'submit'}>
          Log out
        </Button>
      </Form>
    </header>
  );
}
