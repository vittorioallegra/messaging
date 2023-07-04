import { Context, useContext } from 'react';

type ReactContext<T> = Context<T> | Context<T | null> | Context<T | undefined> | Context<T | null | undefined>;

export function createUseContext<T>(context: ReactContext<T>): () => NonNullable<T> {
  return (): NonNullable<T> => {
    const value: T | null | undefined = useContext<T>(context as Context<T>);
    if (!value) {
      throw new Error(`Tried to access ${context.displayName ?? ''}, but it has not been initialized yet!`);
    }
    return value as NonNullable<T>;
  };
}
