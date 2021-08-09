import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Feature2PageComponent} from './feature2-page/feature2-page.component';
import {FormEntries, FormsRegistryModule} from '@ngx-plugin-modules/demo/forms-registry';
import {PluginsModule} from 'ngx-plugin-modules';
import {SearchProvider2Service, SearchResult2Component} from './search-provider2.service';
import {MaterialModule} from '@ngx-plugin-modules/demo/material';
import {SearchModule} from '@ngx-plugin-modules/demo/search';

const forms: FormEntries = [
  {
    category: 'Category 1',
    component: Feature2PageComponent,
    name: 'Feature2PageComponent',
  },
  {
    category: 'Category 2',
    component: Feature2PageComponent,
    name: 'Feature2PageComponent Copy',
  },
];

@NgModule({
  declarations: [Feature2PageComponent, SearchResult2Component],
  imports: [
    CommonModule,
    MaterialModule,
    FormsRegistryModule.forFeature(forms),
    SearchModule.forFeature([SearchProvider2Service]),
    PluginsModule.forFeature(),
  ],
})
export class Feature2Module {}
