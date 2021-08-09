import {InjectionToken, Injector} from '@angular/core';

function flatten<T>(arr: T[][]): T[] {
  return Array.prototype.concat.apply([], arr);
}

export function getFlattened<T>(injector: Injector, token: InjectionToken<T[][]>): T[] | null {
  const all = injector.get(token);

  if (!all) {
    return null;
  }

  return flatten(all);
}
