import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsRegistryModule} from '@ngx-plugin-modules/demo/forms-registry';
import {MaterialModule} from '@ngx-plugin-modules/demo/material';
import {FloatingFormContainerComponent} from './floating-form-container/floating-form-container.component';
import {FloatingFormsBoundaryDirective} from './floating-forms-boundary.directive';
import {FloatingFormsService} from './floating-forms.service';

@NgModule({
  declarations: [FloatingFormContainerComponent, FloatingFormsBoundaryDirective],
  imports: [MaterialModule, FormsRegistryModule, CommonModule],
  exports: [FloatingFormsBoundaryDirective],
})
export class FloatingFormsModule {
  static forRoot(): ModuleWithProviders<FloatingFormsModule> {
    return {
      ngModule: FloatingFormsModule,
      providers: [FloatingFormsService],
    };
  }
}
