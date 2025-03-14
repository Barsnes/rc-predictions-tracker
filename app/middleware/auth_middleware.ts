import type { Authenticators } from '@adonisjs/auth/types';
import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';

// #middleware/auth_middleware.ts
export default class AuthMiddleware {
  redirectTo = '/login';

  openRoutes = [this.redirectTo, '/register', '__manifest', '/__manifest'];

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[];
    } = {},
  ) {
    if (
      this.openRoutes.some((r) =>
        (ctx.request.parsedUrl.pathname ?? '').startsWith(r),
      )
    ) {
      return next();
    }
    await ctx.auth.authenticateUsing(options.guards, {
      loginRoute: this.redirectTo,
    });
    return next();
  }
}
