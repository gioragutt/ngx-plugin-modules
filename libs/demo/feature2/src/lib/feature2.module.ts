import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Feature2PageComponent} from './feature2-page/feature2-page.component';
import {FormEntries, FormsRegistryModule} from '@ngx-plugin-modules/demo/forms-registry';
import {PluginsModule} from 'ngx-plugin-modules';

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
  declarations: [Feature2PageComponent],
  imports: [CommonModule, FormsRegistryModule.forFeature(forms), PluginsModule.forFeature()],
})
export class Feature2Module {}
