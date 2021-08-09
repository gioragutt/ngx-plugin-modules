import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormEntries, FormsRegistryModule} from '@ngx-plugin-modules/demo/forms-registry';
import {PluginsModule} from 'ngx-plugin-modules';
import {Feature1FormComponent} from './feature1-form/feature1-form.component';
import {SearchProvider1Service, SearchResult1Component} from './search-provider1.service';
import {MaterialModule} from '@ngx-plugin-modules/demo/material';
import {SearchModule} from '@ngx-plugin-modules/demo/search';

const forms: FormEntries = [
  {
    category: 'Category 1',
    component: Feature1FormComponent,
    name: 'Feature1FormComponent',
  },
];

@NgModule({
  declarations: [Feature1FormComponent, SearchResult1Component],
  imports: [
    CommonModule,
    MaterialModule,
    FormsRegistryModule.forFeature(forms),
    SearchModule.forFeature([SearchProvider1Service]),
    PluginsModule.forFeature(),
  ],
})
export class Feature1Module {}
