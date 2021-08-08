import {Injector} from '@angular/core';
import {concat, MonoTypeOperatorFunction, Observable, of} from 'rxjs';
import {concatMap, defaultIfEmpty, filter, first, mapTo, skipWhile} from 'rxjs/operators';
import {LazyPluginModule} from './interfaces';
import {wrapIntoObservable} from './utils/collections';
import {isCanLoad, isFunction} from './utils/type_guard';

export function checkGuards(injector: Injector): MonoTypeOperatorFunction<LazyPluginModule> {
  return (source: Observable<LazyPluginModule>) => {
    return source.pipe(
      concatMap(lazyModule =>
        runCanActive(injector, lazyModule).pipe(
          first(),
          filter(result => !!result),
          mapTo(lazyModule),
        ),
      ),
    );
  };
}

function runCanActive(injector: Injector, lazyModule: LazyPluginModule): Observable<boolean> {
  if (!lazyModule.canLoad) {
    return of(true);
  }
  const canLoadGuards = lazyModule.canLoad.map(token => injector.get(token, null)).filter(g => !!g);

  const canLoadObservables = canLoadGuards.map(g => {
    if (isCanLoad(g)) {
      return wrapIntoObservable(g.canLoad(lazyModule));
    } else if (isFunction<() => boolean>(g)) {
      return wrapIntoObservable(g());
    } else {
      throw new Error(`Invalid CanLoad guard ${typeof g}`);
    }
  });

  return concat(...canLoadObservables).pipe(
    skipWhile(guardResult => !!guardResult),
    defaultIfEmpty(true),
  );
}
