import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormEntries, FormsRegistryModule} from '@ngx-plugin-modules/demo/forms-registry';
import {PluginsModule} from 'ngx-plugin-modules';
import {Feature1FormComponent} from './feature1-form/feature1-form.component';

const forms: FormEntries = [
  {
    category: 'Category 1',
    component: Feature1FormComponent,
    name: 'Feature1FormComponent',
  },
];

@NgModule({
  declarations: [Feature1FormComponent],
  imports: [CommonModule, FormsRegistryModule.forFeature(forms), PluginsModule.forFeature()],
})
export class Feature1Module {}
