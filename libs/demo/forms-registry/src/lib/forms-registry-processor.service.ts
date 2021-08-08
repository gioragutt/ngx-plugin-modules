import {ComponentFactoryResolver, Injectable, NgModuleRef} from '@angular/core';
import {MaybeAsync, PluginProcessor} from 'ngx-plugin-modules';
import {FORM_ENTRIES} from './config';
import {FormsRegistryService} from './forms-registry.service';
import {FormEntries} from './interfaces';

function flatten<T>(arr: T[][]): T[] {
  return Array.prototype.concat.apply([], arr);
}

@Injectable({
  providedIn: 'root',
})
export class FormsRegistryProcessorService implements PluginProcessor {
  constructor(private formsRegistry: FormsRegistryService) {}

  process(moduleRef: NgModuleRef<unknown>): MaybeAsync<void> {
    const formEntries = moduleRef.injector.get(FORM_ENTRIES);
    this.loadFormsIntoRegistry(moduleRef.componentFactoryResolver, formEntries);
  }

  loadFormsIntoRegistry(componentFactoryResolver: ComponentFactoryResolver, forms: FormEntries[]) {
    if (!forms) {
      return;
    }

    flatten(forms).forEach(form => {
      const componentFactory = componentFactoryResolver.resolveComponentFactory(form.component);
      this.formsRegistry.add(form, componentFactory);
    });
  }
}
