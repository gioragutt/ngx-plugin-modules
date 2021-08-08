import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormEntries, FormsRegistryModule} from '@ngx-plugin-modules/demo/forms-registry';
import {PluginsModule} from 'ngx-plugin-modules';
import {Feature3PageComponent} from './feature3-page/feature3-page.component';

const forms: FormEntries = [
  {
    category: 'Comm',
    component: Feature3PageComponent,
    name: 'Kapara',
  },
];

@NgModule({
  declarations: [Feature3PageComponent],
  imports: [CommonModule, FormsRegistryModule.forFeature(forms), PluginsModule.forFeature()],
})
export class Feature3Module {}
