import { NgModule, NgModuleRef, Inject, Optional, InjectionToken } from '@angular/core';
import { PluginModuleBootstrapperService } from './plugin-module-bootstrapper.service';
import { PluginModuleLoaderService } from './plugin-module-loader.service';
import { PluginModuleConfig } from './interfaces';

export const PLUGIN_ROOT_MODULE_CONFIG =
  new InjectionToken<PluginModuleConfig>('PLUGIN_ROOT_MODULE_CONFIG');

const DEFAULT_CONFIG: PluginModuleConfig = {
  boostrapImmediately: true,
  lazyLoadImmediately: true,
};

@NgModule()
export class PluginRootModule {
  config: PluginModuleConfig;

  constructor(
    @Optional() @Inject(PLUGIN_ROOT_MODULE_CONFIG) config: PluginModuleConfig,
    private boostrapper: PluginModuleBootstrapperService,
    private loader: PluginModuleLoaderService,
  ) {
    config = config || {};
    this.config = { ...DEFAULT_CONFIG, ...config };

    this.lazyLoadIfNeeded();
  }

  private lazyLoadIfNeeded() {
    if (this.config.lazyLoadImmediately) {
      this.loader.loadLazyPluginModules().subscribe();
    }
  }

  registerFeature(moduleRef: NgModuleRef<any>) {
    if (this.config.boostrapImmediately) {
      this.boostrapper.bootstrap(moduleRef).subscribe();
    } else {
      this.boostrapper.save(moduleRef);
    }
  }
}
