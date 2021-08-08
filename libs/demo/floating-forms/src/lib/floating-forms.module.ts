import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsRegistryModule } from 'projects/forms-registry';
import { MaterialModule } from '../material/material.module';
import { FloatingFormContainerComponent } from './floating-form-container/floating-form-container.component';
import { FloatingFormsBoundryDirective } from './floating-forms-boundry.directive';
import { FloatingFormsService } from './floating-forms.service';

@NgModule({
  declarations: [FloatingFormContainerComponent, FloatingFormsBoundryDirective],
  imports: [MaterialModule, FormsRegistryModule, CommonModule],
  exports: [FloatingFormsBoundryDirective],
})
export class FloatingFormsModule {
  static forRoot(): ModuleWithProviders<FloatingFormsModule> {
    return {
      ngModule: FloatingFormsModule,
      providers: [
        FloatingFormsService,
      ],
    };
  }
}
