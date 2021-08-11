import {NgModule, NgModuleRef, Inject, Optional, InjectionToken} from '@angular/core';
import {PluginModuleBootstrapperService} from './plugin-module-bootstrapper.service';
import {PluginModuleLoaderService} from './plugin-module-loader.service';
import {PluginModuleConfig} from './interfaces';

export const PLUGIN_ROOT_MODULE_CONFIG = new InjectionToken<PluginModuleConfig>(
  'PLUGIN_ROOT_MODULE_CONFIG',
);

const DEFAULT_CONFIG: PluginModuleConfig = {
  bootstrapImmediately: true,
  lazyLoadImmediately: true,
};

@NgModule()
export class PluginRootModule {
  config: PluginModuleConfig;

  constructor(
    @Optional() @Inject(PLUGIN_ROOT_MODULE_CONFIG) config: PluginModuleConfig,
    private bootstrapper: PluginModuleBootstrapperService,
    private loader: PluginModuleLoaderService,
  ) {
    config = config || {};
    this.config = {...DEFAULT_CONFIG, ...config};

    this.lazyLoadIfNeeded();
  }

  private lazyLoadIfNeeded() {
    if (this.config.lazyLoadImmediately) {
      this.loader.loadLazyPluginModules().subscribe();
    }
  }

  registerFeature(moduleRef: NgModuleRef<unknown>) {
    if (this.config.bootstrapImmediately) {
      this.bootstrapper.bootstrap(moduleRef).subscribe();
    } else {
      this.bootstrapper.save(moduleRef);
    }
  }
}
