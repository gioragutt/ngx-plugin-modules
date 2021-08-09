import {NgModuleRef, Type, InjectionToken} from '@angular/core';
import {LoadChildrenCallback} from '@angular/router';
import {Observable} from 'rxjs';
import {MaybeAsync} from './utils/collections';

export interface PluginModuleConfig {
  lazyLoadImmediately?: boolean;
  bootstrapImmediately?: boolean;
}

export interface LazyPluginModule {
  loadChildren: LoadChildrenCallback;
  canLoad?: (Type<unknown> | InjectionToken<unknown>)[];
  name: string;
  data?: unknown;
}

export type LazyPluginModules = LazyPluginModule[];

export interface CanLoad {
  canLoad(module: LazyPluginModule): boolean | Promise<boolean> | Observable<boolean>;
}

export interface PluginProcessor {
  process(moduleRef: NgModuleRef<unknown>): MaybeAsync<void>;
}
