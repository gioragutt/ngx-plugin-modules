import { Compiler, Injectable, Injector, NgModuleFactory } from '@angular/core';
import { EMPTY, from, Observable, of } from 'rxjs';
import { finalize, map, mergeMap } from 'rxjs/operators';
import { LAZY_PLUGIN_MODULES, LoadedLazyPluginModule } from './config';
import { LazyPluginModule } from './interfaces';
import { checkGuards } from './operators';
import { wrapIntoObservable } from './utils/collections';

@Injectable({
  providedIn: 'root'
})
export class PluginModuleLoaderService {
  private didLazyLoad = false;

  constructor(
    private injector: Injector,
    private compiler: Compiler,
  ) { }

  loadLazyPluginModules(): Observable<LoadedLazyPluginModule> {
    if (this.didLazyLoad) {
      return EMPTY;
    }

    const lazyPluginModules = this.injector.get(LAZY_PLUGIN_MODULES);
    return from(lazyPluginModules).pipe(
      mergeMap(m => this.loadModule(m)),
      finalize(() => this.didLazyLoad = true));
  }

  loadModule(lazyModule: LazyPluginModule): Observable<LoadedLazyPluginModule> {
    return of(lazyModule).pipe(
      checkGuards(this.injector),
      mergeMap(f => this.loadLazyPluginModule(f)),
    );
  }

  private loadLazyPluginModule(lazyModule: LazyPluginModule): Observable<LoadedLazyPluginModule> {
    return this.loadModuleFactory(lazyModule).pipe(map((factory: NgModuleFactory<any>) => {
      const module = factory.create(this.injector);
      return new LoadedLazyPluginModule(lazyModule, module);
    }));
  }

  private loadModuleFactory({ loadChildren: module, name }: LazyPluginModule): Observable<NgModuleFactory<any>> {
    return wrapIntoObservable(module()).pipe(
      mergeMap(t => {
        if (t instanceof NgModuleFactory) {
          // AOT
          return of(t);
        }

        try {
          // JIT
          return from(this.compiler.compileModuleAsync(t));
        } catch (e) {
          throw new Error(`Module ${name} exported incorrectly. An NgModule or NgModuleFactory should be exported`);
        }
      }),
    );
  }
}
