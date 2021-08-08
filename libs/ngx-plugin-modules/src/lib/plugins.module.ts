import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { LAZY_PLUGIN_MODULES } from './config';
import { LazyPluginModules, PluginModuleConfig } from './interfaces';
import { PluginFeatureModule } from './plugin-feature.module';
import { PluginRootModule, PLUGIN_ROOT_MODULE_CONFIG } from './plugin-root.module';

@NgModule()
export class PluginsModule {
  static forFeature(): Type<any> {
    return PluginFeatureModule;
  }

  static forRoot(
    lazyPluginModules: LazyPluginModules,
    config?: PluginModuleConfig
  ): ModuleWithProviders<PluginRootModule> {
    return {
      ngModule: PluginRootModule,
      providers: [
        { provide: LAZY_PLUGIN_MODULES, useValue: lazyPluginModules },
        { provide: PLUGIN_ROOT_MODULE_CONFIG, useValue: config }
      ]
    };
  }
}
