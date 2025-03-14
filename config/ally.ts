import { defineConfig, services } from '@adonisjs/ally';
import env from '#start/env';

const allyConfig = defineConfig({
  discord: services.discord({
    clientId: env.get('DISCORD_CLIENT_ID'),
    clientSecret: env.get('DISCORD_CLIENT_SECRET'),
    callbackUrl: env.get('DOMAIN') + '/auth/discord/callback',
  }),
});

export default allyConfig;

declare module '@adonisjs/ally/types' {
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
