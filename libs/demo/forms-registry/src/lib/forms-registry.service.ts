import {ComponentFactory, Injectable, Type, ComponentFactoryResolver} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormEntry} from './interfaces';

export interface RepositoryEntry<T = unknown> {
  formEntry: FormEntry<T>;
  componentFactory: ComponentFactory<T>;
}

@Injectable({
  providedIn: 'root',
})
export class FormsRegistryService implements ComponentFactoryResolver {
  private repositoryEntries = new BehaviorSubject<RepositoryEntry[]>([]);

  formEntries$(): Observable<FormEntry[]> {
    return this.repositoryEntries.pipe(map(entries => entries.map(e => e.formEntry)));
  }

  add<T = undefined>(formEntry: FormEntry<T>, componentFactory: ComponentFactory<T>) {
    const next = [...this.repositoryEntries.value, {formEntry, componentFactory}];
    this.repositoryEntries.next(next);
  }

  getEntry<T>(component: Type<T>): RepositoryEntry<T> {
    return this.repositoryEntries.value.find(
      e => e.formEntry.component === component,
    ) as RepositoryEntry<T>;
  }

  resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T> {
    const entry = this.getEntry<T>(component);
    if (entry.componentFactory) {
      return entry.componentFactory;
    }

    throw new Error(`cannot find component factory for ${component.name}`);
  }
}
