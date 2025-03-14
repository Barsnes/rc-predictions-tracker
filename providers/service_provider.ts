import type { ApplicationService } from '@adonisjs/core/types';
import { ServiceProviders } from '../app/services/_index.js';

export default class ServiceProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    for (const [key, provider] of Object.entries(ServiceProviders)) {
      /* @ts-ignore */
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      this.app.container.singleton(key as string, async (resolver: any) => {
        const result = await (typeof provider === 'function'
          ? provider()
          : provider);

        const getService = async (value: unknown): Promise<unknown> => {
          if (typeof value === 'function') {
            if (value.prototype) {
              return resolver.make(value);
            }
            return value();
          }

          if (value && typeof value === 'object' && 'default' in value) {
            return getService((value as { default: unknown }).default);
          }

          return value;
        };

        return getService(result);
      });
    }
  }
}

export type UnwrappedDefault<T> = T | { default: T };
export type MaybePromise<T> = T | Promise<T>;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type LazyService<Service = any> = () =>
  | MaybePromise<UnwrappedDefault<Service>>
  | never;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type UnwrapReturnType<T> = T extends (...args: any[]) => any
  ? ReturnType<T>
  : T;

type UnwrapProvider<T> = T extends { default: infer U }
  ? UnwrapReturnType<U>
  : UnwrapReturnType<T>;

type ProvidedServices = {
  [K in keyof typeof ServiceProviders]: UnwrapProvider<
    Awaited<ReturnType<(typeof ServiceProviders)[K]>>
  > extends new (
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ...args: any[]
  ) => infer R
    ? R
    : UnwrapProvider<Awaited<ReturnType<(typeof ServiceProviders)[K]>>>;
};

declare module '@adonisjs/core/types' {
  export interface ContainerBindings extends ProvidedServices {}
}
