import { HttpContext } from '@adonisjs/core/http';

export default class DiscordService {
  async getUser() {
    const ctx = HttpContext.getOrFail();
    const { ally } = ctx;
    const discord = ally.use('discord');

    /**
     * User has denied access by canceling
     * the login flow
     */
    if (discord.accessDenied()) {
      return 'You have cancelled the login process';
    }

    /**
     * OAuth state verification failed. This happens when the
     * CSRF cookie gets expired.
     */
    if (discord.stateMisMatch()) {
      return 'We are unable to verify the request. Please try again';
    }

    /**
     * GitHub responded with some error
     */
    if (discord.hasError()) {
      return discord.getError();
    }

    /**
     * Access user info
     */
    const user = await discord.user();
    return user;
  }
}
