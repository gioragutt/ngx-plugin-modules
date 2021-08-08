import {Directive, ViewContainerRef} from '@angular/core';
import {FloatingContainersService} from './floating-containers.service';

@Directive({
  selector: '[libFloatingFormsBoundary]',
})
export class FloatingFormsBoundaryDirective {
  constructor(container: ViewContainerRef, floatingForms: FloatingContainersService) {
    floatingForms.setBoundingView(container);
  }
}
