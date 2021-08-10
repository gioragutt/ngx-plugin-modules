import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Feature1Module} from '@ngx-plugin-modules/demo/feature1';
import {FloatingFormsModule} from '@ngx-plugin-modules/demo/floating-forms';
import {FormsRegistryModule} from '@ngx-plugin-modules/demo/forms-registry';
import {MaterialModule} from '@ngx-plugin-modules/demo/material';
import {SearchModule} from '@ngx-plugin-modules/demo/search';
import {LazyPluginModules, PluginsModule} from 'ngx-plugin-modules';
import {AppComponent} from './app.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {ShellComponent} from './shell/shell.component';

export const features: LazyPluginModules = [
  {
    loadChildren: () => import('@ngx-plugin-modules/demo/feature2').then(m => m.Feature2Module),
    name: 'feature2',
  },
  {
    loadChildren: () => import('@ngx-plugin-modules/demo/feature3').then(m => m.Feature3Module),
    name: 'feature3',
  },
];

@NgModule({
  declarations: [AppComponent, ShellComponent, SearchBarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsRegistryModule.forRoot(),
    FloatingFormsModule.forRoot(),
    PluginsModule.forRoot(features, {lazyLoadImmediately: false}),
    SearchModule.forRoot(),
    MaterialModule,
    Feature1Module,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
