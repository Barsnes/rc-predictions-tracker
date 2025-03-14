/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

router.get('/auth/discord/redirect', async ({ ally }) => {
  // Discord driver instance
  return ally.use('discord').redirect();
});

router.get('/auth/discord/callback', async ({ remixHandler }) => {
  return remixHandler();
});

router
  .any('*', async ({ remixHandler }) => {
    return remixHandler();
  })
  .use(
    middleware.auth({
      guards: ['web'],
    }),
  );
