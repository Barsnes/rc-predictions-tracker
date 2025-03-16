import type { LazyService } from '#providers/service_provider';

// Register services that should be available in the container here
export const ServiceProviders = {
  discord_service: () => import('./discord_service.js'),
  user_service: () => import('./user_service.js'),
  prediction_user_service: () => import('./prediction_user_service.js'),
} satisfies Record<string, LazyService>;
