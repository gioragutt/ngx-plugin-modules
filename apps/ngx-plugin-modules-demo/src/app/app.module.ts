import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FloatingFormsModule} from '@ngx-plugin-modules/demo/floating-forms';
import {FormsRegistryModule} from '@ngx-plugin-modules/demo/forms-registry';
import {MaterialModule} from '@ngx-plugin-modules/demo/material';
import {AppComponent} from './app.component';
import {ShellComponent} from './shell/shell.component';
import {Feature3Module} from '@ngx-plugin-modules/demo/feature3';
import {LazyPluginModules, PluginsModule} from 'ngx-plugin-modules';

export const features: LazyPluginModules = [
  {
    loadChildren: () => import('@ngx-plugin-modules/demo/feature1').then(m => m.Feature1Module),
    name: 'feature1',
  },
  {
    loadChildren: () => import('@ngx-plugin-modules/demo/feature2').then(m => m.Feature2Module),
    name: 'feature2',
  },
];

@NgModule({
  declarations: [AppComponent, ShellComponent],
  imports: [
    BrowserModule,
    FormsRegistryModule.forRoot(),
    FloatingFormsModule.forRoot(),
    PluginsModule.forRoot(features, {lazyLoadImmediately: false}),
    MaterialModule,
    Feature3Module,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
