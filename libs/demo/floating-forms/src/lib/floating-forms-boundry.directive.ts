import { Directive, ViewContainerRef } from '@angular/core';
import { FloatingContainersService } from './floating-containers.service';

@Directive({
  selector: '[appFloatingFormsBoundry]',
})
export class FloatingFormsBoundryDirective {
  constructor(
    container: ViewContainerRef,
    floatingForms: FloatingContainersService,
  ) {
    floatingForms.setBoundingView(container);
  }
}
