import {InjectionToken, NgModuleRef, Type, Provider} from '@angular/core';
import {LazyPluginModule, PluginProcessor} from './interfaces';

export class LoadedLazyPluginModule {
  constructor(public module: LazyPluginModule, public moduleRef: NgModuleRef<unknown>) {}
}

export const LAZY_PLUGIN_MODULES = new InjectionToken<LazyPluginModule[]>('LAZY_PLUGIN_MODULES');

export const PLUGIN_PROCESSORS = new InjectionToken<PluginProcessor[]>('PLUGIN_PROCESSORS');

export function providePluginProcessor<P extends PluginProcessor>(t: Type<P>): Provider {
  return {
    provide: PLUGIN_PROCESSORS,
    useClass: t,
    multi: true,
  };
}
