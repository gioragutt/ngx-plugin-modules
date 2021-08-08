import { Injectable } from '@angular/core';
import { FormEntry } from 'projects/forms-registry';
import { FloatingContainersService } from './floating-containers.service';

@Injectable({
  providedIn: 'root'
})
export class FloatingFormsService {
  constructor(private floatingContainers: FloatingContainersService) {
  }

  open(formEntry: FormEntry): void {
    this.floatingContainers.getContainer().instance.addNewTab(formEntry);
  }
}
