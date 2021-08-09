import {ComponentFactoryResolver, Injectable, NgModuleRef} from '@angular/core';
import {MaybeAsync, PluginProcessor, getFlattened} from 'ngx-plugin-modules';
import {FORM_ENTRIES} from './config';
import {FormsRegistryService} from './forms-registry.service';
import {FormEntries} from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class FormsRegistryProcessorService implements PluginProcessor {
  constructor(private formsRegistry: FormsRegistryService) {}

  process(moduleRef: NgModuleRef<unknown>): MaybeAsync<void> {
    const formEntries = getFlattened(moduleRef.injector, FORM_ENTRIES);
    if (!formEntries) {
      return;
    }

    this.loadFormsIntoRegistry(moduleRef.componentFactoryResolver, formEntries);
  }

  private loadFormsIntoRegistry(
    componentFactoryResolver: ComponentFactoryResolver,
    forms: FormEntries,
  ) {
    for (const form of forms) {
      const componentFactory = componentFactoryResolver.resolveComponentFactory(form.component);
      this.formsRegistry.add(form, componentFactory);
    }
  }
}
