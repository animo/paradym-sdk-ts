export type BoundService<Service> = Omit<Service, 'prototype'>

/**
 * Returns the static methods of a generated service, with every call using the given client
 * instead of the global client the generated code falls back to. A `client` passed to a call still wins.
 */
export function bindClient<Service extends object>(service: Service, client: unknown): BoundService<Service> {
  const bound: Record<string, unknown> = {}

  for (const name of Object.getOwnPropertyNames(service)) {
    const method = (service as Record<string, unknown>)[name]
    if (typeof method !== 'function') continue

    bound[name] = (options?: { client?: unknown }) =>
      method.call(service, { ...options, client: options?.client ?? client })
  }

  return bound as BoundService<Service>
}
