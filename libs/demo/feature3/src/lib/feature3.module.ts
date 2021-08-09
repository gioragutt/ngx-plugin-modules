import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormEntries, FormsRegistryModule} from '@ngx-plugin-modules/demo/forms-registry';
import {MaterialModule} from '@ngx-plugin-modules/demo/material';
import {SearchModule} from '@ngx-plugin-modules/demo/search';
import {PluginsModule} from 'ngx-plugin-modules';
import {Feature3PageComponent} from './feature3-page/feature3-page.component';
import {SearchProvider3Service, SearchResult3Component} from './search-provider3.service';

const forms: FormEntries = [
  {
    category: 'Comm',
    component: Feature3PageComponent,
    name: 'Kapara',
  },
];

@NgModule({
  declarations: [Feature3PageComponent, SearchResult3Component],
  imports: [
    CommonModule,
    MaterialModule,
    FormsRegistryModule.forFeature(forms),
    SearchModule.forFeature([SearchProvider3Service]),
    PluginsModule.forFeature(),
  ],
})
export class Feature3Module {}
